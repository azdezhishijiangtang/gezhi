/**
 * AI 答疑服务：OpenAI 兼容接口的配置管理与流式对话。
 * 用户的 API Key 仅保存在浏览器 localStorage，不会上传到任何服务器。
 */
import { isEn } from '@/i18n/lang';

/** AI 服务配置 */
export interface AiConfig {
  /** @deprecated 兼容旧版二选一模式，新设置使用 reasoningEffort */
  thinkingMode?: 'quick' | 'deep';
  /** 用户手动选择的思考强度 */
  reasoningEffort?: ThinkingMode;
  /** 接口基础地址，如 https://api.deepseek.com/v1 */
  baseUrl: string;
  apiKey: string;
  /** 模型名，如 deepseek-flash / kimi-k3 / glm-5.3 */
  model: string;
}

/** 思考强度档位，不随智能模型路由自动改变 */
export type ThinkingMode = 'off' | 'low' | 'medium' | 'high';
export const THINKING_LEVELS = ['off', 'low', 'medium', 'high'] as const;
export const THINKING_LABELS: Record<ThinkingMode, string> = {
  off: '关闭', low: '低', medium: '中', high: '高',
};

/** 优先使用强度字段；旧版快速/深度分别迁移为关闭/高。 */
export const thinkingModePref = (cfg: AiConfig): ThinkingMode =>
  THINKING_LEVELS.includes(cfg.reasoningEffort as ThinkingMode)
    ? cfg.reasoningEffort!
    : cfg.thinkingMode === 'deep' ? 'high' : 'off';

/**
 * 按题目难度把「自动」偏好解析为具体模式——这是「在手动之上加智能」的核心：
 * - 简单题（概念 / 定义 / 是什么）→ 快速回答，省 token，把算力留给真正难的题
 * - 困难题（证明 / 计算 / 推导 / 为什么）→ 深度思考，给足推理空间
 * 纯本地启发式，不消耗任何 API 调用，毫秒级完成。
 */
export const classifyDifficulty = (query: string): 'easy' | 'hard' => {
  const q = query.toLowerCase();
  const hardKw = [
    '证明', '推导', '计算', '求值', '求解', '积分', '微分', '解方程', '解方程组',
    '为什么', '如何证明', '怎么证', '推导过程', '论证', '什么时候成立', '比较',
    '区别', '证明题', '综合题', '算一下', '详细', '一步步', '如何求', '怎么算',
    'prove', 'derive', 'calculate', 'compute', 'integral', 'differentiate', 'solve',
  ];
  const easyKw = [
    '是什么', '定义', '概念', '意思', '含义', '什么是', '名词解释', '理解',
    '通俗', '简单说', '一句话', '区别是什么', '什么叫', '怎么理解',
    'what is', 'define', 'meaning', 'concept',
  ];
  let score = 0;
  for (const k of hardKw) if (q.includes(k)) score += 1;
  for (const k of easyKw) if (q.includes(k)) score -= 1;
  // 含数学符号 / 公式，通常意味着需要计算或推导
  if (/[∫∑√∂△≈≠≤≥∈∀∃×÷]/.test(query)) score += 1;
  // 长问题通常更具体、更复合
  if (query.trim().length > 80) score += 1;
  return score > 0 ? 'hard' : 'easy';
};

/**
 * 解析真正生效的思考强度，由用户手动选择，不存在自动档；
 * 自动只用于「模型选择」（见 readAutoModel / pickAutoProfile）。
 */
export const resolveThinkingMode = (cfg: AiConfig): ThinkingMode => thinkingModePref(cfg);

/** 各模式的输出预算与采样温度：快速回答更短更聚焦，深度思考给足推理空间 */
const MODE_PLAN = {
  off: { maxTokens: 2048, temperature: 0.3, thinkingBudget: 0 },
  low: { maxTokens: 4096, temperature: 0.3, thinkingBudget: 1024 },
  medium: { maxTokens: 8192, temperature: 0.25, thinkingBudget: 4096 },
  high: { maxTokens: 16384, temperature: 0.2, thinkingBudget: 8192 },
} as const;

/**
 * 各模式追加到系统提示词的作答要求。
 *
 * 为什么需要它：各家「开启思考」的参数互不通用——OpenAI 用 reasoning_effort，
 * DeepSeek/GLM/Kimi 用 thinking，通义千问用 enable_thinking。只发参数时，
 * 遇到不支持的服务商会被静默忽略。因此把模式要求同时写进提示词，
 * 保证「快速 / 深度」的差异一定可感知。
 */
const MODE_GUIDANCE = {
  off: '思考强度：关闭。直接给出结论与必要的关键步骤，简洁准确，不展开冗长分析。',
  low: '思考强度：低。简要核对关键条件，给出结论和精炼的解题步骤，优先保证响应效率。',
  medium: '思考强度：中。认真核对条件和计算，提供清晰、适度详细的推导与结论，兼顾准确性和效率。',
  high: '思考强度：高。充分核验关键条件、计算和易错点，提供严谨的分步解答与必要的验证；复杂问题可比较解法，但避免冗余。',
} as const;

/** 取某模式应追加到系统提示词的作答要求 */
export const getModeGuidance = (mode: ThinkingMode): string => MODE_GUIDANCE[mode];

/**
 * 按服务商 / 模型决定「开启或关闭思考」的参数写法（各家并不统一）。
 * deep 开启思考；quick 显式关闭（否则部分模型默认就会思考，快不起来）。
 */
const thinkingParams = (
  baseUrl: string,
  model: string,
  mode: ThinkingMode,
): Record<string, unknown> => {
  const url = baseUrl.toLowerCase();
  const m = model.toLowerCase();
  const on = mode !== 'off';
  // 通义千问（阿里云百炼）：enable_thinking + thinking_budget
  if (url.includes('dashscope') || m.startsWith('qwen')) {
    return { enable_thinking: on, thinking_budget: MODE_PLAN[mode].thinkingBudget };
  }
  // DeepSeek / Kimi(Moonshot) / 智谱 GLM：thinking 开关
  if (
    url.includes('deepseek') ||
    url.includes('moonshot') ||
    url.includes('bigmodel') ||
    m.includes('deepseek') ||
    m.startsWith('kimi') ||
    m.includes('glm')
  ) {
    return { thinking: { type: on ? 'enabled' : 'disabled' } };
  }
  // SiliconFlow 等聚合平台：按模型名判断
  if (url.includes('siliconflow')) {
    if (m.includes('deepseek') || m.includes('glm') || m.includes('kimi')) {
      return { thinking: { type: on ? 'enabled' : 'disabled' } };
    }
    if (m.includes('qwen')) {
      return { enable_thinking: on, thinking_budget: MODE_PLAN[mode].thinkingBudget };
    }
  }
  // OpenAI 系：深度思考用 reasoning_effort=high；快速回答不发送该参数
  return on ? { reasoning_effort: mode } : {};
};

/** 常用服务商预设（均为 OpenAI 兼容协议） */
export interface AiPreset {
  name: string;
  baseUrl: string;
  /** 默认模型（该服务商当前主力型号） */
  model: string;
  hint: string;
  /**
   * 内置参考模型目录：实时拉取 GET /models 失败时使用。
   * 随站点版本更新；用户 Key 可用时始终以服务商实时列表为准。
   */
  fallbackModels?: string[];
}

/**
 * 服务商预设（模型名单更新于 2026-10，以各官网站点为准）。
 * 说明：模型目录由 modelCatalog 实时拉取 + 内置参考双保险，
 * 预设里的默认模型只作为「未拉取到列表时」的兜底。
 */
export const AI_PRESETS: AiPreset[] = [
  {
    name: 'DeepSeek',
    // 官方文档当前 base_url 为 https://api.deepseek.com（/v1 亦可兼容）
    baseUrl: 'https://api.deepseek.com',
    model: 'deepseek-flash',
    hint: 'V4.1-Flash 极速低价；V4-Pro 旗舰推理',
    fallbackModels: ['deepseek-flash', 'deepseek-v4-pro', 'deepseek-v4-flash', 'deepseek-chat（已退役）', 'deepseek-reasoner（已退役）'],
  },
  {
    name: 'Moonshot Kimi',
    baseUrl: 'https://api.moonshot.cn/v1',
    model: 'kimi-k3',
    hint: 'K3 旗舰；moonshot-v1 系列已全部下线',
    fallbackModels: ['kimi-k3', 'kimi-k2.6', 'kimi-k2.5', 'moonshot-v1-8k（已下线）'],
  },
  {
    name: '通义千问',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    model: 'qwen3-max',
    hint: '阿里云百炼，qwen3-max 旗舰',
    fallbackModels: ['qwen3-max', 'qwen-plus', 'qwen-flash', 'qwen-turbo', 'qwen3-coder-plus'],
  },
  {
    name: '智谱 AI',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    model: 'glm-5.3',
    hint: 'GLM-5.3 旗舰；glm-4.5-flash 免费',
    fallbackModels: ['glm-5.3', 'glm-5.3-flash', 'glm-5.2', 'glm-5.1', 'glm-4.7', 'glm-4.6', 'glm-4.5-flash'],
  },
  {
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-5.6-luna',
    hint: 'GPT-5.6 Luna 低成本；Astra 旗舰',
    fallbackModels: ['gpt-6-astra', 'gpt-6.1-sol', 'gpt-6-luna', 'gpt-5.6-sol', 'gpt-5.6-terra', 'gpt-5.6-luna', 'gpt-5.4-mini', 'gpt-5-mini'],
  },
  {
    name: 'SiliconFlow',
    baseUrl: 'https://api.siliconflow.cn/v1',
    model: 'deepseek-ai/DeepSeek-V4-Flash',
    hint: '聚合平台百款模型，按 厂商/模型 命名',
    fallbackModels: [
      'deepseek-ai/DeepSeek-V4-Pro',
      'deepseek-ai/DeepSeek-V4-Flash',
      'deepseek-ai/DeepSeek-V3.2',
      'Qwen/Qwen3-8B',
      'Qwen/Qwen3-Coder-Plus',
      'THUDM/GLM-5.3',
      'moonshotai/Kimi-K2.6',
      'Pro/deepseek-ai/DeepSeek-R1',
    ],
  },
];

const CONFIG_KEY = 'mathlens-ai-config';
const PROFILES_KEY = 'mathlens-ai-profiles';
const ACTIVE_KEY = 'mathlens-ai-active-profile';

/** 接口存档数量：三套独立配置，互不覆盖 */
export const AI_PROFILE_COUNT = 3;
export const AI_PROFILE_LABELS = ['存档 1', '存档 2', '存档 3'];

/** 单个存档：配置 + 用户备注名 */
export interface AiProfile extends AiConfig {
  /** 备注名，如「DeepSeek 主力」 */
  name?: string;
}

const isValid = (p: AiProfile | null | undefined): p is AiProfile =>
  Boolean(p && p.baseUrl && p.apiKey && p.model);

/** 读取三个存档（旧版单配置会自动迁移到存档 1） */
export const readAiProfiles = (): (AiProfile | null)[] => {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (raw) {
      const arr = JSON.parse(raw) as (AiProfile | null)[];
      return Array.from({ length: AI_PROFILE_COUNT }, (_, i) => (isValid(arr[i]) ? arr[i]! : null));
    }
    // 迁移：旧版单配置 → 存档 1
    const legacy = localStorage.getItem(CONFIG_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy) as AiProfile;
      const list: (AiProfile | null)[] = [isValid(parsed) ? parsed : null, null, null];
      localStorage.setItem(PROFILES_KEY, JSON.stringify(list));
      return list;
    }
  } catch {
    /* 忽略损坏数据 */
  }
  return [null, null, null];
};

export const saveAiProfile = (index: number, profile: AiProfile): void => {
  const list = readAiProfiles();
  list[index] = profile;
  localStorage.setItem(PROFILES_KEY, JSON.stringify(list));
  setActiveProfile(index);
};

export const clearAiProfile = (index: number): void => {
  const list = readAiProfiles();
  list[index] = null;
  localStorage.setItem(PROFILES_KEY, JSON.stringify(list));
  // 清掉的正好是当前生效的：切到另一个已配置的存档，否则清空生效配置
  if (getActiveProfile() === index) {
    const next = list.findIndex(isValid);
    if (next >= 0) setActiveProfile(next);
    else {
      localStorage.removeItem(CONFIG_KEY);
      localStorage.setItem(ACTIVE_KEY, String(index));
    }
  }
};

export const getActiveProfile = (): number => {
  const raw = Number(localStorage.getItem(ACTIVE_KEY));
  return Number.isInteger(raw) && raw >= 0 && raw < AI_PROFILE_COUNT ? raw : 0;
};

export const setActiveProfile = (index: number): void => {
  localStorage.setItem(ACTIVE_KEY, String(index));
  const p = readAiProfiles()[index];
  if (isValid(p)) localStorage.setItem(CONFIG_KEY, JSON.stringify(p));
  else localStorage.removeItem(CONFIG_KEY);
};

export const readAiConfig = (): AiConfig | null => {
  try {
    const p = readAiProfiles()[getActiveProfile()];
    if (isValid(p)) return { baseUrl: p.baseUrl, apiKey: p.apiKey, model: p.model, reasoningEffort: thinkingModePref(p) };
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AiConfig;
    if (!parsed?.baseUrl || !parsed?.apiKey || !parsed?.model) return null;
    return parsed;
  } catch {
    return null;
  }
};

/** 读取指定存档序号的配置（未配置或序号越界返回 null） */
export const readProfileConfig = (index: number): AiConfig | null => {
  const p = readAiProfiles()[index];
  if (isValid(p)) return { baseUrl: p.baseUrl, apiKey: p.apiKey, model: p.model, reasoningEffort: thinkingModePref(p) };
  return null;
};

/** 保存当前生效存档（兼容旧调用） */
export const saveAiConfig = (config: AiConfig): void => {
  const i = getActiveProfile();
  const prev = readAiProfiles()[i];
  saveAiProfile(i, { ...config, name: prev?.name });
};

export const clearAiConfig = (): void => {
  clearAiProfile(getActiveProfile());
};

/**
 * 全局「智能选模型」开关：开启后，发送时按题目难度在已配置存档中自动路由
 * ——简单题用便宜快的模型，困难题用旗舰推理模型。关闭则沿用当前手动激活存档。
 * 这是对「手动选模型」的增强，而非替换：手动永远可用。
 */
const AUTO_MODEL_KEY = 'mathlens-ai-auto-model';

export const readAutoModel = (): boolean => localStorage.getItem(AUTO_MODEL_KEY) === '1';

export const writeAutoModel = (on: boolean): void => {
  localStorage.setItem(AUTO_MODEL_KEY, on ? '1' : '0');
};

/**
 * 全局「智能自检」开关（默认开启）：每次回答生成完毕后，自动再发起一次复核，
 * 让模型审查自己的解答有无计算/逻辑错误、跳步或更优解法——把额外算力花在「纠错题」上，
 * 是「榨干算力」提升正确率的关键一招。手动可关。
 */
const SELF_CHECK_KEY = 'mathlens-ai-self-check';

export const readSelfCheck = (): boolean => localStorage.getItem(SELF_CHECK_KEY) !== '0';

export const writeSelfCheck = (on: boolean): void => {
  localStorage.setItem(SELF_CHECK_KEY, on ? '1' : '0');
};

/**
 * 全局「智能容错（失败自动切换模型）」开关（默认开启）：发送彻底失败（未产出任何内容，
 * 如网络/服务端错误）时，自动用下一个已配置存档的模型重试，最大化「一定能拿到答案」的概率。
 */
const FALLBACK_KEY = 'mathlens-ai-fallback';

export const readFallback = (): boolean => localStorage.getItem(FALLBACK_KEY) !== '0';

export const writeFallback = (on: boolean): void => {
  localStorage.setItem(FALLBACK_KEY, on ? '1' : '0');
};

/**
 * 全局「多路径自洽（Self-Consistency）」开关（默认关闭）：深度思考或难题时，
 * 并发生成多条独立思路，再由模型仲裁取最可靠答案。数学题正确率提升最明显的一招，
 * 但会成倍（K 倍）消耗算力。仅在深度思考模式或识别为难题时生效；快速回答/简单概念题自动跳过。
 */
const MULTI_PATH_KEY = 'mathlens-ai-multi-path';
const MULTI_PATH_COUNT_KEY = 'mathlens-ai-multi-path-count';

export const readMultiPath = (): boolean => localStorage.getItem(MULTI_PATH_KEY) === '1';
export const writeMultiPath = (on: boolean): void => {
  localStorage.setItem(MULTI_PATH_KEY, on ? '1' : '0');
};
/** 并发求解的路数：2/3/4，默认 3 */
export const readMultiPathCount = (): number => {
  const n = Number(localStorage.getItem(MULTI_PATH_COUNT_KEY));
  return [2, 3, 4].includes(n) ? n : 3;
};
export const writeMultiPathCount = (n: number): void => {
  localStorage.setItem(MULTI_PATH_COUNT_KEY, String(n));
};

/**
 * 全局「极致模式 / 双模型交叉验证」开关（默认关闭）：用第二个已配置模型独立重做同一题，
 * 再交叉比对、标注分歧，把「单一模型唯一答案」的偶然错误风险降到最低。需至少 2 个已配置存档。
 */
const CROSS_CHECK_KEY = 'mathlens-ai-cross-check';
export const readCrossCheck = (): boolean => localStorage.getItem(CROSS_CHECK_KEY) === '1';
export const writeCrossCheck = (on: boolean): void => {
  localStorage.setItem(CROSS_CHECK_KEY, on ? '1' : '0');
};

/**
 * 全局「多路径 + 交叉验证联动」开关（默认关闭）：在多路径自洽之上，
 * 让【第二个已配置模型】对多份独立解答做仲裁（而非主模型自己合成），
 * 兼得「多路采样的多样性」与「独立第三方的公正性」——把算力用在最该较真的地方。
 * 需同时开启「多路径自洽」且至少 2 个已配置存档；否则自动等同于普通多路径合成。
 */
const LINK_KEY = 'mathlens-ai-link';
export const readLink = (): boolean => localStorage.getItem(LINK_KEY) === '1';
export const writeLink = (on: boolean): void => {
  localStorage.setItem(LINK_KEY, on ? '1' : '0');
};

/**
 * 全局「RAG 检索增强 · 难题专精」开关（默认关闭）：开启后，对深度思考 / 难题
 * 额外加强文档检索（召回更多相关段落，topK 4 → 8）并强制模型依据资料作答、逐条注明出处，
 * 把检索到的权威资料用足，进一步降低幻觉与误答。仅深度思考 / 难题时生效；快速回答 / 简单题自动跳过，不额外费 token。
 */
const RAG_BOOST_KEY = 'mathlens-ai-rag-boost';
export const readRagBoost = (): boolean => localStorage.getItem(RAG_BOOST_KEY) === '1';
export const writeRagBoost = (on: boolean): void => {
  localStorage.setItem(RAG_BOOST_KEY, on ? '1' : '0');
};

/** RAG 难题专精模式下加强检索召回的段落数（默认 4） */
export const RAG_BOOST_TOPK = 8;

/** 多路径：单路求解的系统提示词附加要求（鼓励独立、完整地给出解法） */
export const MULTI_PATH_SOLVE_PROMPT = (): string =>
  isEn()
    ? `Solve the following problem independently and completely, giving key steps and the final conclusion. Reason carefully from your own approach; do not consult any other solution, and do not skip key steps.`
    : `请独立、完整地解答下面的问题，给出关键步骤与最终结论。从你自己的思路出发认真推导，不必参考任何他人解法，也不要省略关键步骤。`;

/** 多路径：仲裁合成的系统提示词附加要求 */
export const MULTI_PATH_SYNTH_PROMPT = (): string =>
  isEn()
    ? `You are a rigorous answer arbitrator. Several independent solutions to the same problem are given below. Please:
1) Verify each derivation and final result line by line;
2) If the majority/all agree, give the consensus final answer and present the clearest derivation in full;
3) If there is disagreement, judge which solution (or approach) is correct and explain where the others went wrong;
4) Finally output exactly one correct, complete authoritative solution (with key steps). Do not list all original solutions, and do not repeat the problem.`
    : `你是严谨的答卷仲裁者。下面给出了同一道题的多份独立解答。请：
1) 逐份核对每一条推导与最终结果；
2) 若多数/全部一致，给出共识的最终答案，并采用其中最清晰的一种推导完整呈现；
3) 若存在分歧，判定哪个（或哪种思路）正确，并说明其余错在哪里；
4) 最终只输出一份正确的、完整的权威解答（含关键步骤）。不要罗列全部原始解答，也不要复述原题。`;

/** 双模型交叉验证：第二模型独立求解的系统提示词附加要求 */
export const CROSS_CHECK_SOLVE_PROMPT = (): string =>
  isEn()
    ? `Solve the following problem independently and completely, giving key steps and the final conclusion. Do not consult any existing solution; rely on your own reasoning, and do not skip key steps.`
    : `请独立、完整地解答下面的问题，给出关键步骤与最终结论。不要参考任何已有解答，凭你自己的推理完成，也不要省略关键步骤。`;

/** 双模型交叉验证：比对仲裁的系统提示词附加要求 */
export const CROSS_CHECK_VERIFY_PROMPT = (): string =>
  isEn()
    ? `You are a rigorous cross-validation arbitrator. Two independent solutions to the same problem are given below (from different models). Please:
1) Verify the derivations and final results of each;
2) If they agree, confirm the conclusion and give the clearest complete derivation;
3) If they disagree, judge which is correct (or which approach is right) and explain where the other went wrong, providing your own correct derivation if needed;
4) Finally output one correct, complete authoritative solution, and begin with one or two sentences stating whether the two agree and which one is taken as the basis.`
    : `你是严谨的交叉验证仲裁者。下面给出同一道题的两份独立解答（分别来自不同模型）。请：
1) 逐份核对推导与最终结果；
2) 若两份一致，确认结论并给出最清晰的完整推导；
3) 若不一致，判定哪一份（或哪种思路）正确，并说明另一份错在哪里，必要时给出你自己的正确推导；
4) 最终输出一份正确的、完整的权威解答，并在开头用一两句话说明两份解答是否一致、以谁为准。`;

/** 智能自检的复核指令：追加在「问题 + 原回答」之后，要求模型批判性复核 */
export const SELF_CHECK_PROMPT = (): string =>
  isEn()
    ? `You are a rigorous answer reviewer. Based on the student's original problem, critically review the teaching assistant's answer above:
1) Check for computational or derivation errors, miscopied symbols/constants, or jumps that invalidate the conclusion;
2) Look for logical gaps, unverified hidden assumptions, or conclusions whose scope is wrongly widened/narrowed;
3) Note any clearly faster or safer method.
If you find errors, directly give the corrected complete solution (with key steps); if it is overall correct, confirm in 2-3 sentences and point out the most error-prone spot. Do not repeat the problem or the already-correct parts.`
    : `你是严谨的答卷复核员。请基于学生的原始问题，批判性审查上面助教的回答：
1) 计算或推导是否有误、符号/常数是否抄错、跳步是否导致结论不成立；
2) 是否存在逻辑漏洞、未被验证的隐含假设、或结论范围被错误扩大/缩小；
3) 是否有明显更快或更稳妥的解法。
若发现错误，直接给出修正后的完整正确解答（含关键步骤）；若整体无误，只用 2-3 句话简要确认并指出最易出错的地方。不要重复原题与已有且正确的部分。`;

/** 联动模式：由独立第二模型对多路径解答做仲裁的系统提示词附加要求 */
export const LINK_SYNTH_PROMPT = (): string =>
  isEn()
    ? `You are an independent, rigorous third-party arbitrator (different from the model that produced these solutions). Several independent solutions to the same problem are given below. Please:
1) Verify each derivation and final result, identifying common conclusions and disagreements;
2) Judge independently based on mathematical/physical correctness, selecting (or synthesizing) the most reliable answer rather than following the majority blindly;
3) If there is disagreement, clearly state which solution (or approach) is correct and where the others went wrong;
4) Finally output exactly one complete authoritative solution (with key steps), and begin with one or two sentences stating which solution (or approach) you take as the basis and whether it matches the majority. Do not list all original solutions, and do not repeat the problem.`
    : `你是独立、严谨的第三方仲裁者（不同于生成这些解答的模型）。下面给出同一道题的多份独立解答。请：
1) 逐份核对推导与最终结果，识别共性结论与分歧点；
2) 基于数学/物理正确性独立判断，选出（或综合出）最可靠的答案，不要盲从多数；
3) 若存在分歧，明确指出哪一份（或哪种思路）正确、其余错在哪里；
4) 最终只输出一份完整的权威解答（含关键步骤），并在开头用一两句话说明你以哪份（或哪种思路）为准、是否与多数一致。不要罗列全部原始解答，也不要复述原题。`;

/** RAG 难题专精：加强检索后的强约束作答要求（追加到资料上下文之后） */
export const RAG_BOOST_PROMPT = (): string =>
  isEn()
    ? `Note: this is a hard problem. Make full use of the retrieved material above:
- For key derivations and conclusions, give the source from the material and cite it item by item (e.g. "According to <XX>, paragraph N…");
- If multiple sources conflict or are inconsistent, point it out and choose the better one, explaining why with your knowledge if needed;
- Steps not covered by the material may be supplemented with your knowledge, but clearly distinguish "from the material" from "your supplement".`
    : `注意：这是一道较难的题，请【充分利用】上面检索到的资料作答：
- 对关键推导与结论务必给出资料依据，并逐条注明出处（如"根据《XX》第 N 段…"）；
- 若多份资料之间有冲突或表述不一致，明确指出并择优采用，必要时结合你的知识说明原因；
- 资料未覆盖的步骤可用你的知识补充，但必须清晰区分"来自资料"与"你的补充"。`;

/** 粗略评估模型「强度」：强模型得分高，快/廉价模型得分低。用于自动路由排序。 */
const STRONG_MODEL = /pro|max|ultra|astra|旗舰|plus|premium|5\.3|v4-pro|v4\.1-pro|gpt-6|gpt-5\.6-sol|gpt-5\.6-terra/i;
const FAST_MODEL = /flash|mini|turbo|lite|fast|air|free|glm-4\.5-flash|moonshot-v1/i;

export const rankModelStrength = (model: string): number => {
  const m = model.toLowerCase();
  let s = 0;
  if (STRONG_MODEL.test(m)) s += 2;
  if (FAST_MODEL.test(m)) s -= 2;
  return s;
};

/**
 * 按难度在已配置存档中选模型：困难题选最强，简单题选最快。
 * 返回选中的存档序号；无可用存档返回 -1。
 */
export const pickAutoProfile = (
  query: string,
  profiles: (AiProfile | null)[],
): number => {
  const valid = profiles
    .map((p, i) => ({ p, i }))
    .filter((x) => isValid(x.p));
  if (valid.length === 0) return -1;
  if (valid.length === 1) return valid[0].i;
  const hard = classifyDifficulty(query) === 'hard';
  valid.sort((a, b) => rankModelStrength(b.p!.model) - rankModelStrength(a.p!.model));
  return hard ? valid[0].i : valid[valid.length - 1].i;
};

/**
 * 用当前 API Key 拉取该服务商可用的模型列表（OpenAI 兼容的 GET /models）。
 * 返回模型 id 数组（已排序）；失败时抛出可读的中文错误。
 * signal 可由调用方传入，用于超时控制。
 */
export const fetchModels = async (
  baseUrl: string,
  apiKey: string,
  signal?: AbortSignal,
): Promise<string[]> => {
  const url = `${baseUrl.replace(/\/+$/, '')}/models`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    signal,
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(describeAiError(new Error(`${res.status} ${detail.slice(0, 200)}`)));
  }
  const json = (await res.json()) as { data?: { id?: string }[] };
  const ids = (json.data ?? [])
    .map((m) => m.id)
    .filter((id): id is string => typeof id === 'string' && id.length > 0);
  if (ids.length === 0) throw new Error('该接口没有返回可用模型，请手动填写模型名。');
  return Array.from(new Set(ids)).sort((a, b) => a.localeCompare(b));
};

/** 对话消息（与 OpenAI 接口对齐） */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/** 数学助教的系统提示词（按语言返回） */
export const MATH_TUTOR_SYSTEM_PROMPT = (): string =>
  isEn()
    ? `You are the undergraduate mathematics and physics teaching assistant of Principia, serving math and physics majors as well as graduate-entrance-exam students.

Answering guidelines:
1. Write in English with the patience of a teaching assistant: give the intuition first, then a step-by-step derivation, and finally highlight the key point.
2. Always use LaTeX for formulas: inline math with $...$ (e.g. $f'(x)$), and display math on its own line with $$...$$. Backslashes and braces must follow standard LaTeX.
3. When citing a theorem, give its name and conditions of applicability; analyze the problem type before choosing a method.
4. If the problem is under-specified or you are unsure, say so explicitly. Never fabricate theorems or data.
5. Keep answers to the necessary length: explain concepts thoroughly, show key steps fully for computations, and avoid filler.`
    : `你是 Principia 的本科数学与物理助教，服务对象是数学、物理专业本科生与考研学生。

回答规范：
1. 使用简体中文，语气像耐心的助教：先给直观思路，再分步推导，最后点明关键。
2. 公式一律使用 LaTeX：行内公式用 $...$ 包裹（如 $f'(x)$），独立公式用 $$...$$ 单独成行。公式中的反斜杠、花括号必须按标准 LaTeX 书写。
3. 引用定理时给出名称与适用条件；题目先分析题型再选择方法。
4. 如果题目条件不足或你有不确定的地方，明确说明，绝不编造定理或数据。
5. 回答控制在必要长度：概念问题讲透为止，计算问题完整呈现关键步骤，不要堆砌废话。`;

/** 把网络/接口错误翻译成用户看得懂的提示（按语言） */
export const describeAiError = (err: unknown): string => {
  const en = isEn();
  if (err instanceof DOMException && err.name === 'AbortError') {
    return en ? 'Generation stopped.' : '已停止生成。';
  }
  const msg = err instanceof Error ? err.message : String(err);
  if (/failed to fetch|networkerror|load failed/i.test(msg)) {
    return en
      ? 'Network request failed: the network may be down, or the provider may block browser cross-origin requests (CORS). Try another provider or check your proxy settings.'
      : '网络请求失败：可能是网络不通，或该服务商不允许浏览器跨域直连（CORS）。可尝试更换服务商，或检查网络代理设置。';
  }
  if (/401|invalid.*api key|unauthorized/i.test(msg)) {
    return en
      ? 'API Key is invalid or expired (401). Check that the key is correct and the account is not out of credit.'
      : 'API Key 无效或已过期（401），请检查密钥是否正确、账户是否欠费。';
  }
  if (/403|forbidden/i.test(msg)) {
    return en
      ? 'Access denied (403): the key may lack permission for this model, or the provider\'s access limit was triggered.'
      : '访问被拒绝（403）：密钥可能没有该模型的权限，或触发了服务商的访问限制。';
  }
  if (/429|rate limit/i.test(msg)) {
    return en
      ? 'Too many requests (429): you have been rate-limited by the provider. Please wait a moment and try again.'
      : '请求过于频繁（429），已被服务商限流。请稍等片刻再试。';
  }
  if (/404|model.*not/i.test(msg)) {
    return en
      ? 'Endpoint or model not found (404): check that the base URL and model name match (model names differ across providers).'
      : '接口或模型不存在（404）：请检查接口地址与模型名是否匹配（不同服务商的模型名不同）。';
  }
  if (/500|502|503/i.test(msg)) {
    return en
      ? 'Provider internal error (5xx): possibly a temporary outage. Retry later or switch provider.'
      : '服务商内部错误（5xx），可能是临时故障，稍后重试或更换服务商。';
  }
  return msg;
};

/**
 * 流式对话：通过 fetch + SSE 逐段产出回复文本。
 * 调用方可用 AbortController 中断。
 */
/** 接口返回的元信息：模型名与 token 用量 */
export interface ChatMeta {
  model?: string;
  usage?: { prompt: number; completion: number; total: number };
}

export async function* streamChat(
  config: AiConfig,
  messages: ChatMessage[],
  signal?: AbortSignal,
  onMeta?: (meta: ChatMeta) => void,
  /** 思考过程回调：推理模型的 reasoning_content 会逐段回传，供 UI 展示 */
  onReasoning?: (text: string) => void,
): AsyncGenerator<string, void, unknown> {
  const url = `${config.baseUrl.replace(/\/+$/, '')}/chat/completions`;

  /**
   * 组装请求体。withThinking=false 时不发送任何厂商推理参数，
   * 用于服务商不认识这些参数（400）时的降级重试。
   */
  const buildBody = (withThinkingParams: boolean): string => {
    const mode = resolveThinkingMode(config);
    const plan = MODE_PLAN[mode];
    const body: Record<string, unknown> = {
      model: config.model,
      messages,
      stream: true,
      stream_options: { include_usage: true },
      // 快速回答：输出更短更聚焦；深度思考：给足推理与作答空间
      temperature: plan.temperature,
      max_tokens: plan.maxTokens,
    };
    // withThinkingParams=false 用于服务商不认识这些参数（400）时的降级重试
    if (withThinkingParams) {
      Object.assign(body, thinkingParams(config.baseUrl, config.model, mode));
    }
    return JSON.stringify(body);
  };

  const post = (withThinking: boolean) =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: buildBody(withThinking),
      signal,
    });

  let res: Response;
  try {
    res = await post(true);
    // 服务商不认识思考参数（400）时自动降级重试，避免「选了深度思考就报错」
    if (!res.ok && res.status === 400) {
      res = await post(false);
    }
  } catch (err) {
    throw new Error(describeAiError(err));
  }

  if (!res.ok) {
    let detail = '';
    try {
      const data = await res.json();
      detail = data?.error?.message ?? data?.message ?? '';
    } catch {
      /* 忽略非 JSON 错误体 */
    }
    throw new Error(
      `接口返回 ${res.status}${detail ? `：${detail}` : ''}`,
    );
  }
  if (!res.body) throw new Error('接口未返回数据流');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE 数据以 \n\n 分隔
    const frames = buffer.split('\n\n');
    buffer = frames.pop() ?? '';

    for (const frame of frames) {
      const line = frame
        .split('\n')
        .find((l) => l.startsWith('data:'));
      if (!line) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      try {
        const json = JSON.parse(payload);
        if (json.model || json.usage) {
          onMeta?.({
            model: json.model,
            usage: json.usage
              ? {
                  prompt: json.usage.prompt_tokens ?? 0,
                  completion: json.usage.completion_tokens ?? 0,
                  total: json.usage.total_tokens ?? 0,
                }
              : undefined,
          });
        }
        const choice = json.choices?.[0];
        // 思考过程：多数推理模型在 delta.reasoning_content 中输出思维链
        const reasoningDelta: string | undefined =
          choice?.delta?.reasoning_content ??
          choice?.delta?.reasoning ??
          choice?.message?.reasoning_content;
        if (reasoningDelta) onReasoning?.(reasoningDelta);
        const delta: string | undefined =
          choice?.delta?.content ??
          choice?.message?.content;
        if (delta) yield delta;
      } catch {
        /* 忽略无法解析的行 */
      }
    }
  }
}

/**
 * 一次性对话（非流式），用于多路径求解、交叉验证第二解答等后台任务。
 * opts.temperature 用于多路径的多样性采样；深度思考模式下自动带上各服务商的思考参数，
 * 并在服务商不认识该参数（400）时自动降级，保证一定拿到答案。
 */
export const chatOnce = async (
  config: AiConfig,
  messages: ChatMessage[],
  signal?: AbortSignal,
  opts?: { temperature?: number },
): Promise<string> => {
  const url = `${config.baseUrl.replace(/\/+$/, '')}/chat/completions`;
  const mode = resolveThinkingMode(config);
  const plan = MODE_PLAN[mode];
  const buildBody = (withThinking: boolean): string =>
    JSON.stringify({
      model: config.model,
      messages,
      temperature: opts?.temperature ?? 0.3,
      max_tokens: plan.maxTokens,
      ...(withThinking ? thinkingParams(config.baseUrl, config.model, mode) : {}),
    });
  const post = (withThinking: boolean) =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: buildBody(withThinking),
      signal,
    });
  let res: Response;
  try {
    res = await post(true);
    if (!res.ok && res.status === 400) res = await post(false);
  } catch (err) {
    throw new Error(describeAiError(err));
  }
  if (!res.ok) {
    let detail = '';
    try {
      const data = await res.json();
      detail = data?.error?.message ?? data?.message ?? '';
    } catch {
      /* 忽略 */
    }
    throw new Error(`接口返回 ${res.status}${detail ? `：${detail}` : ''}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? '';
};

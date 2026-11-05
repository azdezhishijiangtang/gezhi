/**
 * 模型目录自动更新服务（Model Catalog Auto-Refresh）
 *
 * 目标：让「可选模型」随服务商自动更新，而不必每次发版本。
 *
 * 工作机制：
 * 1. 优先用当前 API Key 实时拉取服务商的 OpenAI 兼容 GET /models 列表；
 * 2. 拉取失败（无 Key / 网络不通 / CORS / 超时）时，回退到内置参考目录
 *    （AI_PRESETS.fallbackModels，随站点版本更新，标注「内置」来源）；
 * 3. 结果按「接口地址 + 密钥指纹」缓存进 localStorage，默认 24 小时过期：
 *    - 缓存新鲜：直接用，不打扰服务商；
 *    - 缓存过期：先返回旧数据，同时后台静默刷新，下次打开即为新列表；
 *    - 用户点「刷新」：强制拉取。
 *
 * 隐私：缓存键只存接口地址与密钥的短哈希指纹，不存密钥本身。
 */

import { AI_PRESETS, fetchModels } from './ai';

/** 目录缓存有效期：24 小时（过期后打开设置时自动后台刷新） */
export const CATALOG_TTL_MS = 24 * 60 * 60 * 1000;
/** 实时拉取超时：8 秒（避免弱网下卡住 UI） */
export const FETCH_TIMEOUT_MS = 8000;
/** 缓存保留上限：超过 7 天的条目清理掉 */
const CACHE_KEEP_MS = 7 * 24 * 60 * 60 * 1000;

const CACHE_KEY = 'mathlens-model-catalog';

/** 目录条目 */
export interface CatalogEntry {
  models: string[];
  /** 数据来源：remote=服务商实时列表；builtin=内置参考目录 */
  source: 'remote' | 'builtin';
  fetchedAt: number;
  /** remote 数据是否已超过 TTL（仍可用，但建议刷新） */
  stale?: boolean;
}

interface CacheShape {
  [cacheKey: string]: { models: string[]; source: 'remote' | 'builtin'; fetchedAt: number };
}

/** 规范化接口地址：去空白、去尾部斜杠，作为缓存键的一部分 */
export const normalizeBaseUrl = (baseUrl: string): string =>
  baseUrl.trim().replace(/\/+$/, '');

/** 密钥短指纹（djb2 哈希）：缓存键只存指纹，不存密钥本身 */
const fingerprint = (apiKey: string): string => {
  let h = 5381;
  for (let i = 0; i < apiKey.length; i += 1) h = (h * 33) ^ apiKey.charCodeAt(i);
  return (h >>> 0).toString(36);
};

/** 目录缓存键：接口地址 + 密钥指纹（同一地址不同 Key 的可用模型可能不同） */
export const catalogKeyOf = (baseUrl: string, apiKey: string): string =>
  `${normalizeBaseUrl(baseUrl)}::${fingerprint(apiKey)}`;

const readCache = (): CacheShape => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as CacheShape;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const writeCache = (cache: CacheShape): void => {
  try {
    // 顺手清理 7 天前的陈旧条目，避免无限增长
    const now = Date.now();
    const pruned: CacheShape = {};
    for (const [k, v] of Object.entries(cache)) {
      if (v?.fetchedAt && now - v.fetchedAt < CACHE_KEEP_MS) pruned[k] = v;
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(pruned));
  } catch {
    /* 忽略写入失败（隐私模式等） */
  }
};

/** 内置参考目录：按接口地址匹配预设；未匹配到时返回空数组 */
export const builtinModelsFor = (baseUrl: string): string[] => {
  const norm = normalizeBaseUrl(baseUrl).toLowerCase();
  const preset = AI_PRESETS.find((p) => normalizeBaseUrl(p.baseUrl).toLowerCase() === norm);
  return preset?.fallbackModels ?? [];
};

/** 人性化的目录年龄描述 */
export const describeCatalogAge = (fetchedAt: number, now = Date.now()): string => {
  const diff = Math.max(0, now - fetchedAt);
  const min = Math.floor(diff / 60000);
  if (min < 1) return '刚刚';
  if (min < 60) return `${min} 分钟前`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour} 小时前`;
  return `${Math.floor(hour / 24)} 天前`;
};

/**
 * 获取模型目录（优先缓存 → 实时拉取 → 内置回退）。
 * force=true 时跳过新鲜度检查，强制拉取。
 */
export const getCatalog = async (
  baseUrl: string,
  apiKey: string,
  opts: { force?: boolean; now?: number } = {},
): Promise<CatalogEntry> => {
  const force = opts.force ?? false;
  const now = opts.now ?? Date.now();
  if (!baseUrl.trim() || !apiKey.trim()) {
    return { models: [], source: 'builtin', fetchedAt: 0 };
  }
  const key = catalogKeyOf(baseUrl, apiKey);
  const cache = readCache();
  const hit = cache[key];
  const fresh = hit ? now - hit.fetchedAt < CATALOG_TTL_MS : false;

  // 1. 缓存新鲜且非强制 → 直接返回
  if (hit && fresh && !force) {
    return { ...hit, stale: false };
  }

  // 2. 实时拉取（带超时）
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let models: string[];
    try {
      models = await fetchModels(baseUrl, apiKey, controller.signal);
    } finally {
      clearTimeout(timer);
    }
    cache[key] = { models, source: 'remote', fetchedAt: now };
    writeCache(cache);
    return { models, source: 'remote', fetchedAt: now, stale: false };
  } catch {
    // 3. 拉取失败：有旧缓存（哪怕过期）也先用旧数据，标注过期
    if (hit) {
      return { ...hit, stale: true };
    }
    // 4. 完全没有缓存：内置参考目录兜底
    const builtin = builtinModelsFor(baseUrl);
    if (builtin.length > 0) {
      cache[key] = { models: builtin, source: 'builtin', fetchedAt: now };
      writeCache(cache);
      return { models: builtin, source: 'builtin', fetchedAt: now, stale: false };
    }
    return { models: [], source: 'builtin', fetchedAt: 0, stale: false };
  }
};

/**
 * 已退役/下线的旧模型 → 建议替代。
 * 命中这些名字时，UI 提示用户迁移（各服务商下线时间不同，以官方公告为准）。
 */
export const RETIRED_MODEL_SUGGESTIONS: Record<string, string> = {
  'deepseek-chat': 'deepseek-flash（deepseek-chat 已于 2026-07 退役）',
  'deepseek-reasoner': 'deepseek-v4-pro（deepseek-reasoner 已于 2026-07 退役）',
  'deepseek-v4-flash': 'deepseek-flash（V4-Flash 已升级为 V4.1-Flash，旧名仍可兼容）',
  'moonshot-v1-8k': 'kimi-k3（moonshot-v1 系列已于 2026-05 下线）',
  'moonshot-v1-32k': 'kimi-k3（moonshot-v1 系列已于 2026-05 下线）',
  'moonshot-v1-128k': 'kimi-k3（moonshot-v1 系列已于 2026-05 下线）',
  'moonshot-v1-auto': 'kimi-k3（moonshot-v1 系列已于 2026-05 下线）',
  'kimi-latest': 'kimi-k3（kimi-latest 已于 2026-01 下线）',
  'kimi-k2-0711-preview': 'kimi-k3（K2 系列已于 2026-05 下线）',
  'kimi-k2-0905-preview': 'kimi-k3（K2 系列已于 2026-05 下线）',
  'kimi-k2-turbo-preview': 'kimi-k3（K2 系列已于 2026-05 下线）',
  'gpt-4o-mini': 'gpt-5.6-luna 或 gpt-5.4-mini',
  'gpt-4o': 'gpt-5.6-luna 或 gpt-5.6-terra',
  'glm-4-flash': 'glm-5.3 或 glm-4.5-flash',
  'Qwen/Qwen2.5-7B-Instruct': 'Qwen/Qwen3-8B 或 deepseek-ai/DeepSeek-V4-Flash',
};

/** 当前模型是否已退役（返回迁移建议；未退役返回 null） */
export const retiredModelHint = (model: string): string | null =>
  RETIRED_MODEL_SUGGESTIONS[model.trim()] ?? null;

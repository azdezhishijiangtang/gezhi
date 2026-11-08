/**
 * 模型目录自动更新服务（Model Catalog Auto-Refresh）
 *
 * 目标：让「可选模型」随服务商自动更新，而不必每次发版本。
 *
 * 工作机制：
 * 1. 优先用当前已解锁的 API Key 实时拉取服务商的 OpenAI 兼容 GET /models 列表；
 * 2. 拉取失败（密钥锁定 / 网络不通 / CORS / 超时）时，把**具体原因**回传给 UI，
 *    并依次回退：本 Key 的旧实时列表 → 同地址其他 Key 的最近实时列表 → 内置参考目录；
 * 3. 只有实时拉取成功才写入 24 小时缓存；内置兜底结果不写缓存，
 *    避免「失败一次、一整天都不刷新」；
 * 4. 缓存键按「接口地址 + 保险库内明文密钥的不可逆短指纹」生成，不存密钥本身。
 *
 * 修复要点：零持久化下页面刷新后保险库是空的，磁盘上的句柄解不出明文。
 * 若直接拿句柄去请求，authHeaders 会抛「密钥已锁定」，而旧版把该异常吞掉
 * 只回退内置目录，导致「刷新模型列表」看起来永远无效。现在密钥锁定会
 * 明确提示用户重新粘贴 Key / 输入解锁口令，并展示上次拉到的实时列表。
 */

import { AI_PRESETS, fetchModels } from './ai';
import { vault } from './byokVault';

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
  /** 最近一次实时拉取失败 / 密钥锁定的原因，供 UI 明确提示 */
  error?: string;
}

interface CacheEntry {
  models: string[];
  source: 'remote' | 'builtin';
  fetchedAt: number;
}

interface CacheShape {
  [cacheKey: string]: CacheEntry;
}

/** 规范化接口地址：去空白、去尾部斜杠，作为缓存键的一部分 */
export const normalizeBaseUrl = (baseUrl: string): string =>
  baseUrl.trim().replace(/\/+$/, '');

/** 密钥短指纹（djb2 哈希）：保留供外部兼容调用，不存密钥本身 */
const fingerprint = (apiKey: string): string => {
  let h = 5381;
  for (let i = 0; i < apiKey.length; i += 1) h = (h * 33) ^ apiKey.charCodeAt(i);
  return (h >>> 0).toString(36);
};

/** 目录缓存键（兼容旧签名）：接口地址 + 密钥指纹 */
export const catalogKeyOf = (baseUrl: string, apiKey: string): string =>
  `${normalizeBaseUrl(baseUrl)}::${fingerprint(apiKey)}`;

/**
 * 实际缓存键：接口地址 + 保险库里明文密钥的 SHA-256 短指纹。
 * 明文与句柄指向同一把 Key 时得到同一个键，换 Key 后自动区分。
 */
const cacheKeyFor = async (baseUrl: string, keyHandle: string): Promise<string> => {
  let fp: string | null = null;
  try {
    fp = await vault.fingerprint(keyHandle);
  } catch {
    /* Web Crypto 不可用时退化为「仅按地址缓存」，不影响主流程 */
  }
  return `${normalizeBaseUrl(baseUrl).toLowerCase()}::${fp ?? 'locked'}`;
};

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

/** 去掉 /v1、/v4 之类的版本后缀，用于匹配服务商预设 */
const stripVersion = (url: string): string =>
  normalizeBaseUrl(url).toLowerCase().replace(/\/v\d+(?:beta)?$/i, '');

/**
 * 内置参考目录：按接口地址匹配预设（忽略版本后缀），
 * 并过滤掉「（已退役）/（已下线）」这类不能真正用于请求的展示项。
 */
export const builtinModelsFor = (baseUrl: string): string[] => {
  const norm = stripVersion(baseUrl);
  const preset = AI_PRESETS.find((p) => stripVersion(p.baseUrl) === norm);
  return (preset?.fallbackModels ?? []).filter(
    (m) => !/[（(](已退役|已下线)/.test(m),
  );
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

/** 按接口地址找出最近一次成功的实时列表（密钥锁定时仍可展示） */
const latestRemoteFor = (baseUrl: string, now: number): CacheEntry | null => {
  const prefix = `${normalizeBaseUrl(baseUrl).toLowerCase()}::`;
  let best: CacheEntry | null = null;
  for (const [k, v] of Object.entries(readCache())) {
    if (!k.startsWith(prefix) || !v || v.source !== 'remote') continue;
    if (!Array.isArray(v.models) || v.models.length === 0) continue;
    if (now - v.fetchedAt >= CACHE_KEEP_MS) continue;
    if (!best || v.fetchedAt > best.fetchedAt) best = v;
  }
  return best;
};

/** 把拉取异常翻译成用户看得懂的一句话 */
const describeCatalogError = (err: unknown): string => {
  const msg = err instanceof Error ? err.message : String(err);
  if (/failed to fetch|networkerror|load failed/i.test(msg)) {
    // 断网、DNS 失败、代理异常也会走到这里，附原始错误便于区分，不能只解释为 CORS
    return `无法访问 /models：可能是网络不通，或服务商未开放浏览器跨域（CORS）。（原始错误：${msg}）`;
  }
  if (/超时|timeout|abort/i.test(msg)) {
    return '获取模型列表超时（8 秒），请稍后重试或检查网络。';
  }
  return msg || '实时拉取失败';
};

/**
 * 获取模型目录：缓存新鲜 → 实时拉取 → 旧实时列表 → 内置参考目录。
 * force=true 时跳过新鲜度检查，强制实时拉取。
 * keyHandle 必须是保险库句柄；未解锁时返回明确原因 + 上次的实时列表。
 */
export const getCatalog = async (
  baseUrl: string,
  keyHandle: string,
  opts: { force?: boolean; now?: number } = {},
): Promise<CatalogEntry> => {
  const force = opts.force ?? false;
  const now = opts.now ?? Date.now();
  if (!baseUrl.trim()) {
    return { models: [], source: 'builtin', fetchedAt: 0 };
  }

  // 零持久化下刷新页面 / 自动锁定后内存里没有明文，句柄不可用。
  // 此时不再静默回退，而是给出明确提示，并展示上次拉到的实时列表。
  if (!keyHandle.trim() || !vault.has(keyHandle)) {
    const cached = latestRemoteFor(baseUrl, now);
    return {
      models: cached?.models ?? builtinModelsFor(baseUrl),
      source: cached ? 'remote' : 'builtin',
      fetchedAt: cached?.fetchedAt ?? 0,
      stale: Boolean(cached),
      error: '密钥已锁定：请重新粘贴 API Key，或在下方输入解锁口令后再刷新模型列表。',
    };
  }

  const key = await cacheKeyFor(baseUrl, keyHandle);
  const cache = readCache();
  const hit = cache[key];
  // 内置兜底数据不参与「新鲜」判定，避免一次失败挡住后续 24 小时的刷新
  const fresh = Boolean(hit && hit.source === 'remote' && now - hit.fetchedAt < CATALOG_TTL_MS);

  // 1. 缓存新鲜且非强制 → 直接返回
  if (hit && fresh && !force) {
    return { ...hit, stale: false };
  }

  // 2. 实时拉取（带超时）
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const models = await fetchModels(baseUrl, keyHandle, controller.signal);
    const entry: CacheEntry = { models, source: 'remote', fetchedAt: now };
    cache[key] = entry;
    writeCache(cache);
    return { ...entry, stale: false };
  } catch (err) {
    const error = describeCatalogError(err);
    // 3. 本 Key 有旧的实时列表 → 用它，并标注过期与失败原因
    if (hit && hit.source === 'remote') {
      return { ...hit, stale: true, error };
    }
    // 4. 同一地址其它 Key 的最近实时列表
    const other = latestRemoteFor(baseUrl, now);
    if (other) return { ...other, stale: true, error };
    // 5. 内置参考目录兜底：不写入缓存，下次仍会尝试实时拉取
    return { models: builtinModelsFor(baseUrl), source: 'builtin', fetchedAt: 0, error };
  } finally {
    clearTimeout(timer);
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

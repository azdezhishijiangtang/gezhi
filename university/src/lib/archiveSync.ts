/**
 * 学习档案跨设备同步。
 *
 * 本站是纯前端应用：学习总结 / 答疑历史 / 错题本都只存在浏览器 localStorage，
 * 没有任何服务器替用户保管，所以换设备登录同一账号看不到旧档案。
 * 这里提供「导出同步码 → 在另一台设备粘贴导入」的手动搬运方式。
 *
 * 导入时会把所有记录重新归属到当前登录账号：本机注册的账号 id 是随机生成的，
 * 同一手机号在两台设备上 id 不同，若沿用导出端的 id，导进来也查不到。
 */
import { loadSummaries, saveSummary, type StudySummary } from '@/lib/summaryArchive';
import { loadQaHistory, mergeQaEntries, type QaEntry } from '@/lib/qaHistory';
import { listMistakes, mergeMistakes, type MistakeEntry } from '@/lib/mistakeBook';

export interface ArchiveAccount {
  username?: string;
  phone?: string;
}

export interface ArchivePayload {
  source: 'principia-study-archive';
  version: 1;
  exportedAt: string;
  account: ArchiveAccount;
  summaries: StudySummary[];
  qa: QaEntry[];
  mistakes: MistakeEntry[];
}

export interface ImportResult {
  /** 本次新增的学习总结条数 */
  summaries: number;
  /** 本次新增的答疑记录条数 */
  qa: number;
  /** 本次新增的错题条数 */
  mistakes: number;
  /** 错题写入失败（通常是把 localStorage 配额挤爆了）时的提示 */
  error?: string;
}

/** 汇总当前账号的全部档案 */
export const buildArchive = (userId: string, account: ArchiveAccount): ArchivePayload => ({
  source: 'principia-study-archive',
  version: 1,
  exportedAt: new Date().toISOString(),
  account,
  summaries: loadSummaries(userId),
  qa: loadQaHistory(userId),
  mistakes: listMistakes(userId),
});

/** 档案里一共多少条记录 */
export const archiveEntryCount = (p: ArchivePayload): number =>
  p.summaries.length + p.qa.length + p.mistakes.length;

/* ───────── 编码／解码 ───────── */

const toBase64 = (text: string): string => {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  const chunk = 0x8000; // 分块，避免超长字符串把调用栈打爆
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
};

const fromBase64 = (code: string): string => {
  const bin = atob(code);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
};

/** 打包成可粘贴的同步码 */
export const encodeArchive = (payload: ArchivePayload): string => toBase64(JSON.stringify(payload));

/** 解析同步码；格式不对时给出可读的中文原因 */
export const decodeArchive = (
  code: string,
): { ok: true; payload: ArchivePayload } | { ok: false; error: string } => {
  const trimmed = code.trim();
  if (!trimmed) return { ok: false, error: '请先粘贴同步码' };
  let json: string;
  try {
    // 从聊天工具里复制常常带上换行，这里全部去掉再解码
    json = fromBase64(trimmed.replace(/\s+/g, ''));
  } catch {
    return { ok: false, error: '同步码格式不正确：请确认完整复制，没有缺字符' };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, error: '同步码内容损坏，无法解析' };
  }
  const p = parsed as Partial<ArchivePayload>;
  if (!p || p.source !== 'principia-study-archive') {
    return { ok: false, error: '这不是 Principia 的学习档案同步码' };
  }
  return {
    ok: true,
    payload: {
      source: 'principia-study-archive',
      version: 1,
      exportedAt: typeof p.exportedAt === 'string' ? p.exportedAt : new Date().toISOString(),
      account: p.account && typeof p.account === 'object' ? p.account : {},
      summaries: Array.isArray(p.summaries) ? p.summaries : [],
      qa: Array.isArray(p.qa) ? p.qa : [],
      mistakes: Array.isArray(p.mistakes) ? p.mistakes : [],
    },
  };
};

/**
 * 把档案并入当前账号。
 * 全部按 id 去重：本机已有的记录保持不动，只补进新记录，可安全地反复导入。
 */
export const importArchive = (payload: ArchivePayload, userId: string): ImportResult => {
  const existingSummaryIds = new Set(loadSummaries(userId).map((s) => s.id));
  let summaries = 0;
  for (const s of payload.summaries) {
    if (!s || typeof s.id !== 'string') continue;
    if (!existingSummaryIds.has(s.id)) summaries += 1;
    saveSummary({ ...s, userId });
  }

  const qa = mergeQaEntries(payload.qa.map((e) => ({ ...e, userId })));
  const mk = mergeMistakes(payload.mistakes.map((e) => ({ ...e, userId })));

  return {
    summaries,
    qa,
    mistakes: mk.added,
    ...(mk.ok ? {} : { error: mk.error }),
  };
};

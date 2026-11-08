/**
 * 学习档案跨设备搬运（导出 / 导入）。
 *
 * 本站是纯前端应用：学习总结 / 答疑历史 / 错题本都只存在浏览器 localStorage，
 * 没有任何服务器替用户保管。这里提供「导出同步码 → 在另一台设备粘贴导入」
 * 或「导出文件 → 导入文件」的手动搬运方式。
 *
 * 兼容旧版备份：解析时会忽略历史遗留的 account / userId 字段。
 */
import { encodeUtf8, decodeUtf8 } from '@/lib/compat';
import { loadSummaries, saveSummary, type StudySummary } from '@/lib/summaryArchive';
import { loadQaHistory, mergeQaEntries, type QaEntry } from '@/lib/qaHistory';
import { listMistakes, mergeMistakes, type MistakeEntry } from '@/lib/mistakeBook';

export interface ArchivePayload {
  source: 'principia-study-archive';
  version: 2;
  exportedAt: string;
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

/** 汇总本机全部档案 */
export const buildArchive = (): ArchivePayload => ({
  source: 'principia-study-archive',
  version: 2,
  exportedAt: new Date().toISOString(),
  summaries: loadSummaries(),
  qa: loadQaHistory(),
  mistakes: listMistakes(),
});

/** 档案里一共多少条记录 */
export const archiveEntryCount = (p: ArchivePayload): number =>
  p.summaries.length + p.qa.length + p.mistakes.length;

/* ───────── 编码／解码 ───────── */

const toBase64 = (text: string): string => {
  const bytes = encodeUtf8(text);
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
  return decodeUtf8(bytes);
};

/** 打包成可粘贴的同步码 */
export const encodeArchive = (payload: ArchivePayload): string => toBase64(JSON.stringify(payload));

/** 解析同步码；兼容 v1 / v2 档案，格式不对时给出可读的中文原因 */
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
      version: 2,
      exportedAt: typeof p.exportedAt === 'string' ? p.exportedAt : new Date().toISOString(),
      summaries: Array.isArray(p.summaries) ? p.summaries : [],
      qa: Array.isArray(p.qa) ? p.qa : [],
      mistakes: Array.isArray(p.mistakes) ? p.mistakes : [],
    },
  };
};

/**
 * 把档案并入本机。
 * 全部按 id 去重：本机已有的记录保持不动，只补进新记录，可安全地反复导入。
 */
export const importArchive = (payload: ArchivePayload): ImportResult => {
  const existingSummaryIds = new Set(loadSummaries().map((s) => s.id));
  let summaries = 0;
  for (const s of payload.summaries) {
    if (!s || typeof s.id !== 'string') continue;
    if (!existingSummaryIds.has(s.id)) summaries += 1;
    saveSummary(s);
  }

  const qa = mergeQaEntries(payload.qa);
  const mk = mergeMistakes(payload.mistakes);

  return {
    summaries,
    qa,
    mistakes: mk.added,
    ...(mk.ok ? {} : { error: mk.error }),
  };
};

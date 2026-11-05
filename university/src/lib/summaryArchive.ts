/**
 * 学习总结档案：AI 学习总结的持久化留存。
 * 每次生成的总结（含所用模型、生成时间、覆盖的问题数）都会按账户保存，
 * 方便回看不同时间段的学习诊断与进步轨迹。数据存于 localStorage。
 */

export interface StudySummary {
  id: string;
  userId: string;
  /** 生成时间戳 */
  createdAt: number;
  /** 生成所用的模型名 */
  model: string;
  /** 使用的接口存档序号（0/1/2） */
  profileIndex: number;
  /** 本次总结覆盖的答疑问题数 */
  questionCount: number;
  /** 总结正文（Markdown + LaTeX） */
  content: string;
}

const STORAGE_KEY = 'mathlens-study-summaries-v1';
const MAX_ENTRIES = 100;

const readAll = (): StudySummary[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StudySummary[]) : [];
  } catch {
    return [];
  }
};

const writeAll = (list: StudySummary[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_ENTRIES)));
  } catch {
    /* 配额超限等情况下静默降级 */
  }
  emitChange();
};

const listeners = new Set<() => void>();
const emitChange = () => listeners.forEach((l) => l());

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) emitChange();
  });
}

export const subscribeSummaries = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** 读取某账户的全部总结（最新在前） */
export const loadSummaries = (userId: string): StudySummary[] =>
  readAll()
    .filter((s) => s.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);

export const saveSummary = (summary: StudySummary): void => {
  writeAll([summary, ...readAll().filter((s) => s.id !== summary.id)]);
};

export const deleteSummary = (id: string): void => {
  writeAll(readAll().filter((s) => s.id !== id));
};

export const clearSummaries = (userId: string): void => {
  writeAll(readAll().filter((s) => s.userId !== userId));
};

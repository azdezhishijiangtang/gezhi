/**
 * 学习总结档案：AI 学习总结的持久化留存。
 * 每次生成的总结（含所用模型、生成时间、覆盖的问题数）都会保存在本机，
 * 方便回看不同时间段的学习诊断与进步轨迹。数据存于 localStorage。
 * 本站是纯前端应用，不设账号。
 */
import { safeLocal } from '@/lib/compat';

export interface StudySummary {
  id: string;
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

/** 兼容旧备份：剥离历史版本遗留的 userId 字段 */
const stripLegacy = <T>(entry: T): T => {
  const clean: Record<string, unknown> = { ...(entry as Record<string, unknown>) };
  delete clean.userId;
  return clean as T;
};

const readAll = (): StudySummary[] => {
  try {
    const raw = safeLocal.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StudySummary[]).map(stripLegacy) : [];
  } catch {
    return [];
  }
};

const writeAll = (list: StudySummary[]): void => {
  try {
    safeLocal.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_ENTRIES)));
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

/** 读取全部总结（最新在前） */
export const loadSummaries = (): StudySummary[] =>
  readAll().sort((a, b) => b.createdAt - a.createdAt);

export const saveSummary = (summary: StudySummary): void => {
  writeAll([stripLegacy(summary), ...readAll().filter((s) => s.id !== summary.id)]);
};

export const deleteSummary = (id: string): void => {
  writeAll(readAll().filter((s) => s.id !== id));
};

export const clearSummaries = (): void => {
  writeAll([]);
};

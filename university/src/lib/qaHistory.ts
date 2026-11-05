/**
 * 答疑记忆：按账户把每次 AI 答疑的问题与回答保存到 localStorage。
 * 演示登录体系下按用户 id 隔离；未登录时归入 guest 桶。
 */
import { useMemo, useSyncExternalStore } from 'react';

export interface QaEntry {
  id: string;
  /** 归属用户（user.id 或 'guest'） */
  userId: string;
  /** 提问时间戳 */
  ts: number;
  question: string;
  answer: string;
  /** 提问时携带的知识点上下文（可选） */
  courseId?: string;
  topicId?: string;
  topicTitle?: string;
  /** 回答引用的用户文档段落（可选，来自文档知识库检索） */
  sources?: QaSource[];
  /** 生成所用的模型名 */
  model?: string;
  /** token 用量 */
  usage?: { prompt: number; completion: number; total: number };
  /** 模型的思考过程（原始推理文本，可选） */
  thinking?: string;
}

/** 一次答疑引用到的文档段落 */
export interface QaSource {
  docId: string;
  docName: string;
  snippet: string;
}

const STORAGE_KEY = 'mathlens-qa-history';
const MAX_ENTRIES = 500;

const readAll = (): QaEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as QaEntry[]) : [];
  } catch {
    return [];
  }
};

const writeAll = (entries: QaEntry[]): void => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(entries.slice(-MAX_ENTRIES)),
    );
  } catch {
    /* 存储失败（如配额超限）时静默降级 */
  }
  emitChange();
};

/** 简易发布订阅：让 React 组件在存储变化时刷新 */
const listeners = new Set<() => void>();
const emitChange = () => listeners.forEach((l) => l());

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) emitChange();
  });
}

export const subscribeQa = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** 读取某用户的答疑记录（最新在前） */
export const loadQaHistory = (userId: string): QaEntry[] =>
  readAll()
    .filter((e) => e.userId === userId)
    .sort((a, b) => b.ts - a.ts);

/** 追加一条答疑记录 */
export const addQaEntry = (entry: Omit<QaEntry, 'id' | 'ts'>): QaEntry => {
  const full: QaEntry = {
    ...entry,
    id: `qa-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ts: Date.now(),
  };
  writeAll([...readAll(), full]);
  return full;
};

/** 删除一条记录 */
export const deleteQaEntry = (id: string): void => {
  writeAll(readAll().filter((e) => e.id !== id));
};

/** 清空某用户的全部记录 */
export const clearQaHistory = (userId: string): void => {
  writeAll(readAll().filter((e) => e.userId !== userId));
};

/**
 * 批量合并答疑记录（跨设备导入用）。
 * 按 id 去重：已存在的记录保留本机版本，只补进新记录。返回实际新增条数。
 */
export const mergeQaEntries = (entries: QaEntry[]): number => {
  const existing = readAll();
  const ids = new Set(existing.map((e) => e.id));
  const incoming = entries.filter(
    (e) => e && typeof e.id === 'string' && typeof e.ts === 'number' && !ids.has(e.id),
  );
  if (incoming.length === 0) return 0;
  writeAll([...existing, ...incoming]);
  return incoming.length;
};

/** 统计概览 */
export interface QaStats {
  total: number;
  /** 近 7 天提问数 */
  last7Days: number;
  /** 按课程计数（无上下文的归入 'free'） */
  byCourse: { courseId: string; count: number }[];
  /** 最近一次提问时间 */
  latestTs: number | null;
}

export const computeQaStats = (entries: QaEntry[]): QaStats => {
  const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
  const courseMap = new Map<string, number>();
  for (const e of entries) {
    const key = e.courseId ?? 'free';
    courseMap.set(key, (courseMap.get(key) ?? 0) + 1);
  }
  return {
    total: entries.length,
    last7Days: entries.filter((e) => e.ts >= weekAgo).length,
    byCourse: [...courseMap.entries()]
      .map(([courseId, count]) => ({ courseId, count }))
      .sort((a, b) => b.count - a.count),
    latestTs: entries.length > 0 ? entries[0].ts : null,
  };
};

/** React Hook：订阅某用户的答疑记录（JSON 快照相等判断，避免多余渲染） */
export const useQaEntries = (userId: string): QaEntry[] => {
  const snapshot = useSyncExternalStore(
    subscribeQa,
    () => JSON.stringify(loadQaHistory(userId)),
    () => '[]',
  );
  return useMemo(() => JSON.parse(snapshot) as QaEntry[], [snapshot]);
};

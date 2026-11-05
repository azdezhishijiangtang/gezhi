/**
 * 专题内容覆盖：开发者模式可对知识点的标题/摘要/正文做本地覆盖，
 * 覆盖数据存于 localStorage，并在数据模块加载时合并进 topics 数组。
 *
 * 说明：这是纯前端演示站，覆盖仅对当前浏览器生效；要让所有访客看到，
 * 需要把修改同步到源码后重新构建发布。
 */
import type { Topic } from '@/types';

export interface TopicOverride {
  title?: string;
  summary?: string;
  content?: string;
  updatedAt: number;
}

const STORAGE_KEY = 'mathlens-topic-overrides-v1';

export const loadOverrides = (): Record<string, TopicOverride> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, TopicOverride>) : {};
  } catch {
    return {};
  }
};

/** localStorage 写入结果：失败时 ok=false 并带中文原因，供调用方提示用户 */
export interface WriteResult {
  ok: boolean;
  error?: string;
}

const writeAll = (all: Record<string, TopicOverride>): WriteResult => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return { ok: true };
  } catch {
    return { ok: false, error: '存储空间不足，请清理旧数据' };
  }
};

/** 保存某专题的覆盖字段（只写传入的字段，其余保留） */
export const saveOverride = (
  topicId: string,
  patch: { title?: string; summary?: string; content?: string },
): WriteResult => {
  const all = loadOverrides();
  const prev = all[topicId] ?? { updatedAt: 0 };
  all[topicId] = { ...prev, ...patch, updatedAt: Date.now() };
  return writeAll(all);
};

/** 撤销某专题的覆盖 */
export const removeOverride = (topicId: string): WriteResult => {
  const all = loadOverrides();
  delete all[topicId];
  return writeAll(all);
};

/** 覆盖数量 */
export const countOverrides = (): number => Object.keys(loadOverrides()).length;

/**
 * 把覆盖合并进 topics 数组（原地修改对象，模块加载时调用一次）。
 * 返回被覆盖的专题数量。
 */
export const applyTopicOverrides = (topics: Topic[]): number => {
  const all = loadOverrides();
  let applied = 0;
  for (const topic of topics) {
    const ov = all[topic.id];
    if (!ov) continue;
    if (typeof ov.title === 'string' && ov.title.trim()) topic.title = ov.title;
    if (typeof ov.summary === 'string') topic.summary = ov.summary;
    if (typeof ov.content === 'string' && ov.content.trim()) topic.content = ov.content;
    applied++;
  }
  return applied;
};

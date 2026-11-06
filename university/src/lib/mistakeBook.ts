/**
 * 错题本：按课程分集合，两种来源——AI 练习一键收录 / 手动录入（文字、代码、图片）。
 * 图片以 dataURL 存入 localStorage（单张 ≤1.5MB，最多 4 张）。
 * 本站是纯前端应用，不设账号，所有记录都属于这台设备。
 */
import { useMemo, useSyncExternalStore } from 'react';

export interface MistakeImage {
  name: string;
  dataUrl: string;
}

export interface MistakeEntry {
  id: string;
  courseId: string;
  topicId?: string;
  title: string;
  /** Markdown + LaTeX，可含 ``` 代码块 */
  content: string;
  images?: MistakeImage[];
  source: 'ai' | 'manual';
  createdAt: number;
  mastered: boolean;
}

const STORAGE_KEY = 'mathlens-mistakes-v1';
export const MAX_MISTAKE_IMAGES = 4;
export const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;

/** 兼容旧备份：剥离历史版本遗留的 userId 字段 */
const stripLegacy = <T>(entry: T): T => {
  const clean: Record<string, unknown> = { ...(entry as Record<string, unknown>) };
  delete clean.userId;
  return clean as T;
};

const readAll = (): MistakeEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as MistakeEntry[]).map(stripLegacy) : [];
  } catch {
    return [];
  }
};

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) emit();
  });
}

const writeAll = (list: MistakeEntry[]): { ok: boolean; error?: string } => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    emit();
    return { ok: true };
  } catch {
    emit();
    return { ok: false, error: '保存失败：浏览器本地存储空间不足（图片过大或条目过多），请删减图片后重试。' };
  }
};

export const addMistake = (
  input: Omit<MistakeEntry, 'id' | 'createdAt' | 'mastered'>,
): { ok: boolean; error?: string } => {
  const entry: MistakeEntry = {
    ...input,
    id: `mk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    mastered: false,
  };
  return writeAll([...readAll(), entry]);
};

export const toggleMastered = (id: string): void => {
  writeAll(readAll().map((e) => (e.id === id ? { ...e, mastered: !e.mastered } : e)));
};

export const deleteMistake = (id: string): void => {
  writeAll(readAll().filter((e) => e.id !== id));
};

/**
 * 批量合并错题（跨设备导入用）。
 * 按 id 去重：已存在的保留本机版本，只补进新记录。返回实际新增条数。
 */
export const mergeMistakes = (entries: MistakeEntry[]): { added: number; ok: boolean; error?: string } => {
  const existing = readAll();
  const ids = new Set(existing.map((e) => e.id));
  const incoming = entries
    .filter(
      (e) => e && typeof e.id === 'string' && typeof e.createdAt === 'number' && !ids.has(e.id),
    )
    .map(stripLegacy);
  if (incoming.length === 0) return { added: 0, ok: true };
  const res = writeAll([...existing, ...incoming]);
  return { added: incoming.length, ...res };
};

export const listMistakes = (courseId?: string): MistakeEntry[] =>
  readAll()
    .filter((e) => !courseId || courseId === 'all' || e.courseId === courseId)
    .sort((a, b) => b.createdAt - a.createdAt);

export const countMistakesByCourse = (): Record<string, number> => {
  const map: Record<string, number> = {};
  for (const e of readAll()) map[e.courseId] = (map[e.courseId] ?? 0) + 1;
  return map;
};

/** 订阅错题数据变更：本地写操作或跨标签页 storage 事件时通知 */
export const subscribeMistakes = (l: () => void): (() => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

/** 订阅（可选按课程）的错题列表 */
export const useMistakes = (courseId?: string): MistakeEntry[] => {
  const snapshot = useSyncExternalStore(
    subscribeMistakes,
    () => JSON.stringify(listMistakes(courseId)),
    () => '[]',
  );
  return useMemo(() => JSON.parse(snapshot) as MistakeEntry[], [snapshot]);
};

/** 文件 → dataURL（超限返回错误） */
export const readImageFile = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('仅支持图片文件'));
    if (file.size > MAX_IMAGE_BYTES) {
      return reject(new Error(`图片「${file.name}」超过 1.5MB，请压缩后再上传`));
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('图片读取失败'));
    reader.readAsDataURL(file);
  });

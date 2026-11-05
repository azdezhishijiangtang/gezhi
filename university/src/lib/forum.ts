/**
 * 论坛：综合讨论区 + 按课程分区。支持发帖（Markdown/LaTeX）与文档/图片附件、回帖。
 * 纯前端演示：数据存 localStorage（附件单个 ≤2MB，每帖 ≤3 个）。
 */
import { useMemo, useSyncExternalStore } from 'react';
import { courses } from '@/data/courses';

export const GENERAL_SECTION = 'general';

export interface ForumAttachment {
  name: string;
  dataUrl: string;
}

export interface ForumReply {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: number;
}

export interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  sectionId: string;
  title: string;
  content: string;
  attachments?: ForumAttachment[];
  createdAt: number;
  replies: ForumReply[];
}

export const forumSections = (): { id: string; name: string }[] => [
  { id: GENERAL_SECTION, name: '综合讨论区' },
  ...courses.map((c) => ({ id: c.id, name: c.name })),
];

export const sectionName = (id: string): string =>
  id === GENERAL_SECTION ? '综合讨论区' : courses.find((c) => c.id === id)?.name ?? '未知分区';

export const MAX_ATTACHMENTS = 3;
export const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;

const STORAGE_KEY = 'mathlens-forum-v1';

const readAll = (): ForumPost[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as ForumPost[]) : [];
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

const writeAll = (list: ForumPost[]): { ok: boolean; error?: string } => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    emit();
    return { ok: true };
  } catch {
    emit();
    return { ok: false, error: '保存失败：本地存储空间不足（附件过大），请删减附件后重试。' };
  }
};

export const addPost = (
  input: Pick<ForumPost, 'userId' | 'userName' | 'sectionId' | 'title' | 'content' | 'attachments'>,
): { ok: boolean; error?: string; id?: string } => {
  const post: ForumPost = {
    ...input,
    id: `fp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    replies: [],
  };
  const res = writeAll([...readAll(), post]);
  return { ...res, id: post.id };
};

export const addReply = (
  postId: string,
  input: Pick<ForumReply, 'userId' | 'userName' | 'content'>,
): { ok: boolean; error?: string } => {
  const reply: ForumReply = {
    ...input,
    id: `fr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
  };
  return writeAll(
    readAll().map((p) => (p.id === postId ? { ...p, replies: [...p.replies, reply] } : p)),
  );
};

export const deletePost = (
  postId: string,
  userId: string,
): { ok: boolean; error?: string; deleted: boolean } => {
  const before = readAll();
  const after = before.filter((p) => !(p.id === postId && p.userId === userId));
  const deleted = after.length < before.length;
  const res = writeAll(after);
  return { ...res, deleted };
};

export const listPosts = (sectionId?: string): ForumPost[] =>
  readAll()
    .filter((p) => !sectionId || p.sectionId === sectionId)
    .sort((a, b) => b.createdAt - a.createdAt);

export const getPost = (postId: string): ForumPost | undefined =>
  readAll().find((p) => p.id === postId);

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useForumPosts = (sectionId?: string): ForumPost[] => {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => JSON.stringify(listPosts(sectionId)),
    () => '[]',
  );
  return useMemo(() => JSON.parse(snapshot) as ForumPost[], [snapshot]);
};

/** 文件 → dataURL（论坛附件） */
export const readAttachment = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return reject(new Error(`附件「${file.name}」超过 2MB，请压缩后再上传`));
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('附件读取失败'));
    reader.readAsDataURL(file);
  });

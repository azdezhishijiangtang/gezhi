/**
 * 文档知识库：上传文档 → 解析文本 → 段落分块 → IndexedDB 持久化 → TF-IDF 检索。
 *
 * - 按用户隔离（演示登录体系下按 user.id；未登录归入 'guest'）
 * - 支持 .txt / .md / .pdf / .docx；PDF 与 docx 解析库按需动态加载，不进主包
 * - 检索为中英文混合的分词 + TF-IDF 余弦相似度，纯本地计算、不依赖嵌入 API
 * - IndexedDB 不可用时静默降级（功能不可用但不报错）
 */
import { useEffect, useMemo, useSyncExternalStore } from 'react';

export interface DocMeta {
  id: string;
  userId: string;
  name: string;
  /** 文件字节数 */
  size: number;
  addedAt: number;
  /** 是否参与检索 */
  enabled: boolean;
  chunkCount: number;
  charCount: number;
}

export interface DocChunk {
  id: string;
  docId: string;
  docName: string;
  userId: string;
  index: number;
  text: string;
  /** 词频表（检索时避免重复分词） */
  tf: Record<string, number>;
}

export interface RetrievedChunk {
  chunk: DocChunk;
  score: number;
}

const DB_NAME = 'mathlens-docs';
const DB_VERSION = 1;
const MAX_FILE_BYTES = 500 * 1024 * 1024; // 500MB
const MAX_PDF_PAGES = 800;
const CHUNK_TARGET = 420; // 目标分块字符数
const CHUNK_OVERLAP = 90; // 块间重叠字符数

// ─────────────────────────── IndexedDB 封装 ───────────────────────────

let dbPromise: Promise<IDBDatabase | null> | null = null;

const openDb = (): Promise<IDBDatabase | null> => {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve) => {
    if (typeof indexedDB === 'undefined') {
      resolve(null);
      return;
    }
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('docs')) {
          const docs = db.createObjectStore('docs', { keyPath: 'id' });
          docs.createIndex('by-user', 'userId', { unique: false });
        }
        if (!db.objectStoreNames.contains('chunks')) {
          const chunks = db.createObjectStore('chunks', { keyPath: 'id' });
          chunks.createIndex('by-doc', 'docId', { unique: false });
          chunks.createIndex('by-user', 'userId', { unique: false });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return dbPromise;
};

const txRun = <T>(
  storeNames: string[],
  mode: IDBTransactionMode,
  fn: (stores: IDBObjectStore[]) => IDBRequest<T> | void,
): Promise<T | null> =>
  openDb().then(
    (db) =>
      new Promise<T | null>((resolve) => {
        if (!db) {
          resolve(null);
          return;
        }
        try {
          const tx = db.transaction(storeNames, mode);
          const stores = storeNames.map((n) => tx.objectStore(n));
          let result: T | null = null;
          const maybeReq = fn(stores);
          if (maybeReq) {
            maybeReq.onsuccess = () => {
              result = maybeReq.result;
            };
          }
          tx.oncomplete = () => resolve(result);
          tx.onerror = () => resolve(null);
          tx.onabort = () => resolve(null);
        } catch {
          resolve(null);
        }
      }),
  );

// ─────────────────────────── 文本解析 ───────────────────────────

export interface ParseProgress {
  done: number;
  total: number;
}

/** 按扩展名解析文件为纯文本 */
export const parseFile = async (
  file: File,
  onProgress?: (p: ParseProgress) => void,
): Promise<string> => {
  const ext = file.name.toLowerCase().split('.').pop() ?? '';
  if (ext === 'pdf') return parsePdf(file, onProgress);
  if (ext === 'docx') return parseDocx(file);
  if (ext === 'txt' || ext === 'md' || ext === 'markdown') {
    return file.text();
  }
  throw new Error(`暂不支持 .${ext} 格式，请上传 txt / md / pdf / docx`);
};

const parsePdf = async (
  file: File,
  onProgress?: (p: ParseProgress) => void,
): Promise<string> => {
  const pdfjs = await import('pdfjs-dist');
  const workerUrl = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  const data = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data }).promise;
  const pages: string[] = [];
  const total = Math.min(pdf.numPages, MAX_PDF_PAGES);
  for (let i = 1; i <= total; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    let line = '';
    const lines: string[] = [];
    for (const item of content.items) {
      if (!('str' in item)) continue; // 跳过 marked content 等非文本项
      // hasEOL 标记换行；否则同一视觉行内拼接
      if (item.hasEOL) {
        lines.push(line);
        line = '';
      } else {
        line += item.str + ' ';
      }
    }
    if (line.trim()) lines.push(line);
    pages.push(lines.join('\n'));
    onProgress?.({ done: i, total });
    page.cleanup();
  }
  return pages.join('\n\n');
};

const parseDocx = async (file: File): Promise<string> => {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const { value } = await mammoth.extractRawText({ arrayBuffer });
  return value;
};

// ─────────────────────────── 分块 ───────────────────────────

/** 段落感知分块：优先在空行处断开，块间保留少量重叠避免切断语义 */
export const chunkText = (text: string): string[] => {
  const cleaned = text
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (!cleaned) return [];

  const paras = cleaned.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const chunks: string[] = [];
  let buf = '';

  const flush = () => {
    if (buf.trim()) chunks.push(buf.trim());
    buf = '';
  };

  for (const p of paras) {
    // 超长单段：按 target 硬切
    if (p.length > CHUNK_TARGET * 2) {
      flush();
      for (let i = 0; i < p.length; i += CHUNK_TARGET) {
        chunks.push(p.slice(i, i + CHUNK_TARGET + CHUNK_OVERLAP).trim());
      }
      continue;
    }
    if (buf && buf.length + p.length + 2 > CHUNK_TARGET) {
      flush();
      // 重叠：携带上一块尾部，防止语义被拦腰切断
      buf = chunks.length > 0 ? chunks[chunks.length - 1].slice(-CHUNK_OVERLAP) : '';
    }
    buf = buf ? `${buf}\n\n${p}` : p;
  }
  flush();

  // 过滤噪声碎片（过短且无实质内容）
  return chunks.filter((c) => c.replace(/\s/g, '').length >= 20);
};

// ─────────────────────────── 分词与 TF-IDF ───────────────────────────

const CJK_RUN = /[\u3400-\u9FFF\uF900-\uFAFF]+/g;
const LATIN_WORD = /[a-z\u0370-\u03ff][a-z0-9\u0370-\u03ff]*/g;
const NUMBER = /\d+(?:\.\d+)?/g;

/** 中英文混合分词：CJK 二元组 + 拉丁词（小写）+ 数字 */
export const tokenize = (text: string): string[] => {
  const tokens: string[] = [];
  const lower = text.toLowerCase();
  tokens.push(...(lower.match(LATIN_WORD) ?? []));
  tokens.push(...(text.match(NUMBER) ?? []));
  for (const run of text.match(CJK_RUN) ?? []) {
    if (run.length === 1) {
      tokens.push(run);
    } else {
      for (let i = 0; i < run.length - 1; i++) tokens.push(run.slice(i, i + 2));
    }
  }
  return tokens;
};

const termFrequencies = (text: string): Record<string, number> => {
  const tf: Record<string, number> = {};
  for (const t of tokenize(text)) tf[t] = (tf[t] ?? 0) + 1;
  return tf;
};

/**
 * 检索与问题最相关的文档段落（TF-IDF 余弦相似度）。
 * 仅检索启用中的文档；分数过低的段落会被过滤。
 */
export const retrieveChunks = async (
  userId: string,
  query: string,
  topK = 4,
): Promise<RetrievedChunk[]> => {
  const all = await loadAllChunks(userId, true);
  if (all.length === 0 || !query.trim()) return [];

  // 文档频率 → IDF
  const df = new Map<string, number>();
  for (const c of all) {
    for (const term of Object.keys(c.tf)) df.set(term, (df.get(term) ?? 0) + 1);
  }
  const idf = (t: string) => Math.log(1 + all.length / (1 + (df.get(t) ?? 0)));

  const qTf = termFrequencies(query);
  if (Object.keys(qTf).length === 0) return [];

  const scored = all.map((chunk) => {
    let dot = 0;
    let qNorm = 0;
    let cNorm = 0;
    for (const [t, f] of Object.entries(qTf)) {
      const qw = f * idf(t);
      qNorm += qw * qw;
      const cw = (chunk.tf[t] ?? 0) * idf(t);
      dot += qw * cw;
    }
    for (const f of Object.values(chunk.tf)) {
      // 注意：此处近似——chunk 侧 IDF 权重已含在点积累加中，
      // 模长用未加权 tf 亦可（余弦对单调缩放不变）
      cNorm += f * f;
    }
    return { chunk, score: dot / (Math.sqrt(qNorm) * Math.sqrt(cNorm) + 1e-9) };
  });

  return scored
    .filter((s) => s.score > 0.015)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
};

// ─────────────────────────── 增删查 ───────────────────────────

const genId = () => `doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/** 保存文档：解析 → 分块 → 入库。返回文档元信息 */
export const saveDocument = async (
  userId: string,
  file: File,
  onProgress?: (p: ParseProgress) => void,
): Promise<DocMeta> => {
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(`文件超过 ${Math.round(MAX_FILE_BYTES / 1024 / 1024)}MB 上限`);
  }
  const text = await parseFile(file, onProgress);
  if (!text.trim()) throw new Error('未能从文件中提取到文字（可能是扫描版 PDF 或空文件）');

  const chunks = chunkText(text);
  const meta: DocMeta = {
    id: genId(),
    userId,
    name: file.name,
    size: file.size,
    addedAt: Date.now(),
    enabled: true,
    chunkCount: chunks.length,
    charCount: text.length,
  };

  const records: DocChunk[] = chunks.map((t, i) => ({
    id: `${meta.id}#${i}`,
    docId: meta.id,
    docName: meta.name,
    userId,
    index: i,
    text: t,
    tf: termFrequencies(t),
  }));

  const db = await openDb();
  if (!db) throw new Error('当前浏览器不支持 IndexedDB，无法使用文档知识库');
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(['docs', 'chunks'], 'readwrite');
    tx.objectStore('docs').put(meta);
    const chunkStore = tx.objectStore('chunks');
    for (const r of records) chunkStore.put(r);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(new Error('文档保存失败'));
    tx.onabort = () => reject(new Error('文档保存失败'));
  });

  await refreshDocsCache(userId);
  return meta;
};

/** 读取某用户的全部文档元信息（新的在前） */
export const listDocuments = async (userId: string): Promise<DocMeta[]> => {
  const rows = await txRun<DocMeta[]>(['docs'], 'readonly', ([store]) =>
    store.index('by-user').getAll(userId) as IDBRequest<DocMeta[]>,
  );
  return (rows ?? []).sort((a, b) => b.addedAt - a.addedAt);
};

/** 删除文档及其全部分块 */
export const deleteDocument = async (
  userId: string,
  docId: string,
): Promise<{ ok: boolean; error?: string }> => {
  const db = await openDb();
  if (!db) return { ok: false, error: '当前浏览器不支持 IndexedDB，无法删除文档' };
  const ok = await new Promise<boolean>((resolve) => {
    const tx = db.transaction(['docs', 'chunks'], 'readwrite');
    tx.objectStore('docs').delete(docId);
    const chunkStore = tx.objectStore('chunks');
    // 通过 by-doc 索引找出该文档全部分块并删除
    const idxReq = chunkStore.index('by-doc').getAllKeys(docId);
    idxReq.onsuccess = () => {
      for (const key of idxReq.result) chunkStore.delete(key);
    };
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => resolve(false);
    tx.onabort = () => resolve(false);
  });
  // 无论成败都刷新缓存，保证列表与存储实际状态一致
  await refreshDocsCache(userId);
  return ok ? { ok: true } : { ok: false, error: '删除失败，请重试' };
};

/** 启用/停用某文档（停用后不参与检索） */
export const toggleDocument = async (
  userId: string,
  docId: string,
  enabled: boolean,
): Promise<void> => {
  const db = await openDb();
  if (!db) return;
  await new Promise<void>((resolve) => {
    const tx = db.transaction(['docs'], 'readwrite');
    const store = tx.objectStore('docs');
    const getReq = store.get(docId);
    getReq.onsuccess = () => {
      const doc = getReq.result as DocMeta | undefined;
      if (doc) {
        doc.enabled = enabled;
        store.put(doc);
      }
    };
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
    tx.onabort = () => resolve();
  });
  await refreshDocsCache(userId);
};

/** 加载用户的全部分块（默认只含启用中的文档） */
export const loadAllChunks = async (
  userId: string,
  enabledOnly = false,
): Promise<DocChunk[]> => {
  const [docs, chunks] = await Promise.all([
    listDocuments(userId),
    txRun<DocChunk[]>(['chunks'], 'readonly', ([store]) =>
      store.index('by-user').getAll(userId) as IDBRequest<DocChunk[]>,
    ),
  ]);
  if (!chunks) return [];
  const allowed = new Set(docs.filter((d) => !enabledOnly || d.enabled).map((d) => d.id));
  return chunks.filter((c) => allowed.has(c.docId));
};

// ─────────────────────────── React 订阅 ───────────────────────────

const docsListeners = new Set<() => void>();
let docsCache: DocMeta[] = [];
let docsCacheUser = '';
const emitDocs = () => docsListeners.forEach((l) => l());

export const subscribeDocs = (listener: () => void): (() => void) => {
  docsListeners.add(listener);
  return () => docsListeners.delete(listener);
};

const refreshDocsCache = async (userId: string): Promise<void> => {
  docsCache = await listDocuments(userId);
  docsCacheUser = userId;
  emitDocs();
};

/** React Hook：订阅某用户的文档列表 */
export const useUserDocs = (userId: string): DocMeta[] => {
  useEffect(() => {
    if (docsCacheUser !== userId) {
      refreshDocsCache(userId);
    }
  }, [userId]);

  const snapshot = useSyncExternalStore(
    subscribeDocs,
    () => JSON.stringify(docsCacheUser === userId ? docsCache : []),
    () => '[]',
  );
  return useMemo(() => JSON.parse(snapshot) as DocMeta[], [snapshot]);
};

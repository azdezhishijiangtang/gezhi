/**
 * 学习档案云端同步（GitHub Gist 版）。
 *
 * 「同步码」搬运（archiveSync.ts）是离线方案；这里再加一条「云端通道」：
 * - 设备 A：填一次 GitHub PAT → 上传档案 → 得到一个「同步 ID」（Gist ID）
 *   之后数据更新了可以反复上传，永远写进同一个 Gist，同步 ID 保持不变；
 * - 设备 B：粘贴同步 ID → 拉取最新档案 → 合并导入（复用 archiveSync 的合并逻辑，
 *   导入时自动归属到本机登录的账号 id）。
 *
 * 为什么选 Gist：本站是纯静态站、没有服务器；secret Gist 不公开列出，
 * 不知道 ID 就读不到，学习档案敏感性低，够用。PAT 只存本机 localStorage，
 * 请求直连 api.github.com（官方允许跨域）。
 */
import type { ArchivePayload } from '@/lib/archiveSync';

const PAT_KEY = 'mathlens-gist-pat';
const GIST_ID_KEY = 'mathlens-gist-id';
const FILE_NAME = 'principia-archive.json';

/** PAT 只在本机使用与保存（上传/更新需要；拉取不需要） */
export const loadPat = (): string => localStorage.getItem(PAT_KEY) || '';
export const savePat = (pat: string): void => localStorage.setItem(PAT_KEY, pat.trim());

/** 本机最近一次上传得到的同步 ID，方便下次直接更新 */
export const loadGistId = (): string => localStorage.getItem(GIST_ID_KEY) || '';
export const saveGistId = (id: string): void => localStorage.setItem(GIST_ID_KEY, id.trim());

/** 从粘贴内容里提取 Gist ID：接受裸 ID，也接受 gist.github.com 分享链接 */
export const extractGistId = (raw: string): string => {
  const text = raw.trim();
  if (!text) return '';
  const fromLink = text.match(/gist\.github\.com\/(?:[^/\s]+\/)?([0-9a-f]{8,64})/i);
  if (fromLink) return fromLink[1];
  const bare = text.match(/^([0-9a-f]{8,64})$/i);
  if (bare) return bare[1];
  // 兜底：去掉所有空白再返回，交给服务端报错
  return text.replace(/\s+/g, '');
};

const GH = 'https://api.github.com';

/**
 * 上传档案到云端：没有 gistId 时创建新 Gist，有则原地更新（ID 永久不变）。
 * 返回同步 ID（Gist ID）。
 */
export async function uploadArchive(
  payload: ArchivePayload,
  pat: string,
  gistId: string,
): Promise<string> {
  const body = {
    description: `Principia 学习档案 · ${payload.account.username || payload.account.phone || ''}`,
    public: false,
    files: { [FILE_NAME]: { content: JSON.stringify(payload, null, 2) } },
  };
  const res = await fetch(gistId ? `${GH}/gists/${gistId}` : `${GH}/gists`, {
    method: gistId ? 'PATCH' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pat}`,
      Accept: 'application/vnd.github+json',
    },
    body: JSON.stringify(body),
  });
  if (res.status === 401) throw new Error('PAT 无效或已过期，请到 GitHub 重新生成并粘贴');
  if (res.status === 404 && gistId) throw new Error('本机保存的同步 ID 已失效（云端档案被删），清空 ID 后重新上传');
  if (res.status === 403) throw new Error('GitHub 拒绝了请求（令牌权限不足或触发限流）：确认 PAT 勾选了 gist 权限');
  if (!res.ok) throw new Error(`GitHub 返回 ${res.status}，稍后再试`);
  const j = (await res.json()) as { id?: string };
  if (!j.id) throw new Error('GitHub 没有返回同步 ID，稍后再试');
  return j.id;
}

/** 按 ID 拉取云端档案（无需 PAT；secret Gist 知道 ID 才能读） */
export async function fetchArchive(gistId: string): Promise<ArchivePayload> {
  const res = await fetch(`${GH}/gists/${gistId}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (res.status === 404) throw new Error('同步 ID 不存在：请确认完整复制（或链接没贴错）');
  if (res.status === 403) throw new Error('触发 GitHub 匿名限流，稍等几分钟再拉取');
  if (!res.ok) throw new Error(`GitHub 返回 ${res.status}`);
  const j = (await res.json()) as { files?: Record<string, { content?: string; truncated?: boolean }> };
  const file = j.files?.[FILE_NAME];
  if (!file) throw new Error('这个 Gist 里没有 Principia 档案文件');
  if (file.truncated) throw new Error('档案太大被 GitHub 截断，请改用「同步码文件」方式搬运');
  if (!file.content) throw new Error('云端档案内容为空');
  let payload: ArchivePayload;
  try {
    payload = JSON.parse(file.content) as ArchivePayload;
  } catch {
    throw new Error('云端档案内容损坏，无法解析');
  }
  if (payload.source !== 'principia-study-archive') throw new Error('云端内容不是 Principia 学习档案');
  return payload;
}

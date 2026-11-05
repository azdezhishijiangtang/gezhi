#!/usr/bin/env node
/**
 * 账号同步程序：把新注册的账号写入代码库（src/data/seedAccounts.ts）。
 *
 * 背景：网站的账号分两层存储 —— 内置登记表（随代码发布，全设备生效）
 * 和本机 localStorage。新用户注册后只存在于他自己的浏览器里，
 * 本程序把「待同步」账号合并进内置登记表，重新构建发布后即可全设备登录。
 *
 * 用法：
 *   # 1) 本地模式（默认）：更新 src/data/seedAccounts.ts，之后自行 git 提交
 *   node scripts/sync-accounts.mjs account-sync-2025-01-01.json
 *
 *   # 2) 直接提交到 GitHub（需要 repo 权限令牌）
 *   GITHUB_TOKEN=ghp_xxx node scripts/sync-accounts.mjs payload.json --repo azdezhishijiangtang/Principia
 *
 *   # 3) 试运行：只打印结果，不写文件
 *   node scripts/sync-accounts.mjs payload.json --dry-run
 *
 * 输入文件支持两种格式：
 *   - JSON：{ "accounts": [ { phone, username, passwordHash, createdAt, id }, ... ] }
 *   - Base64 同步码（网站「账号管理」页复制的那段）
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SEED_FILE = join(__dirname, '..', 'src', 'data', 'seedAccounts.ts');

/* ───────── 参数解析 ───────── */
const args = process.argv.slice(2);
const flags = {
  dryRun: args.includes('--dry-run'),
  repo: '',
  token: process.env.GITHUB_TOKEN || '',
  file: '',
};
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--repo') flags.repo = args[++i];
  else if (args[i] === '--token') flags.token = args[++i];
  else if (!args[i].startsWith('--')) flags.file = args[i];
}

if (!flags.file) {
  console.error('用法: node scripts/sync-accounts.mjs <payload.json|同步码> [--repo owner/name] [--dry-run]');
  process.exit(1);
}

/* ───────── 读取并解析输入 ───────── */
const raw = readFileSync(flags.file, 'utf8').trim();
let payload;
try {
  payload = JSON.parse(raw);
} catch {
  // 尝试 Base64 解码（网站复制的同步码）
  try {
    payload = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
  } catch {
    console.error('无法解析输入文件：既不是 JSON 也不是有效的 Base64 同步码');
    process.exit(1);
  }
}
const incoming = Array.isArray(payload) ? payload : payload.accounts;
if (!Array.isArray(incoming) || incoming.length === 0) {
  console.error('输入中没有任何账号');
  process.exit(1);
}

/* ───────── 读取现有登记表 ───────── */
const seedSrc = readFileSync(SEED_FILE, 'utf8');
const existingPhones = [...seedSrc.matchAll(/phone:\s*'([^']+)'/g)].map((m) => m[1]);
const existingNames = [...seedSrc.matchAll(/username:\s*'([^']+)'/g)].map((m) => m[1]);
const versionMatch = seedSrc.match(/SEED_ACCOUNTS_VERSION\s*=\s*(\d+)/);
const currentVersion = versionMatch ? Number(versionMatch[1]) : 1;

/* ───────── 合并去重 ───────── */
const seenPhones = new Set(existingPhones);
const seenNames = new Set(existingNames.map((n) => n.toLowerCase()));
const added = [];
const skipped = [];

for (const acc of incoming) {
  const phone = String(acc.phone || '').trim();
  const username = String(acc.username || '').trim();
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    skipped.push({ acc, reason: '手机号格式不正确' });
    continue;
  }
  if (!username) {
    skipped.push({ acc, reason: '缺少用户名' });
    continue;
  }
  if (seenPhones.has(phone)) {
    skipped.push({ acc, reason: '手机号已存在于登记表' });
    continue;
  }
  if (seenNames.has(username.toLowerCase())) {
    skipped.push({ acc, reason: '用户名已被占用' });
    continue;
  }
  seenPhones.add(phone);
  seenNames.add(username.toLowerCase());
  added.push({
    id: acc.id || `acc-seed-${phone}`,
    phone,
    username,
    passwordHash: acc.passwordHash,
    createdAt: Number(acc.createdAt) || Date.now(),
  });
}

console.log(`\n待同步账号: ${incoming.length} 个`);
console.log(`  新增: ${added.length} 个`);
console.log(`  跳过: ${skipped.length} 个`);
for (const s of skipped) {
  console.log(`    - ${s.acc.phone ?? '?'}（${s.acc.username ?? '?'}）: ${s.reason}`);
}

if (added.length === 0) {
  console.log('\n没有新账号需要写入，登记表未改动。');
  process.exit(0);
}

/* ───────── 生成新的登记表内容 ───────── */
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const entries = added
  .map(
    (a) => `  {
    id: '${esc(a.id)}',
    phone: '${esc(a.phone)}',
    username: '${esc(a.username)}',
    passwordHash: '${esc(a.passwordHash)}',
    createdAt: ${a.createdAt},
    lastLoginAt: undefined,
  },`,
  )
  .join('\n');

let newSrc = seedSrc;
// 在 SEED_ACCOUNTS 数组结尾（];）前插入新条目
const insertAt = seedSrc.lastIndexOf('];');
if (insertAt === -1) {
  console.error('未能在 seedAccounts.ts 中定位数组结尾（];）');
  process.exit(1);
}
newSrc =
  seedSrc.slice(0, insertAt).replace(/\s*$/, '') +
  '\n' +
  entries +
  '\n' +
  seedSrc.slice(insertAt);
// 版本号 +1
newSrc = newSrc.replace(
  /SEED_ACCOUNTS_VERSION\s*=\s*\d+/,
  `SEED_ACCOUNTS_VERSION = ${currentVersion + 1}`,
);

if (flags.dryRun) {
  console.log('\n─── 试运行：更新后的 seedAccounts.ts ───');
  console.log(newSrc);
  process.exit(0);
}

/* ───────── 输出：本地文件 ───────── */
writeFileSync(SEED_FILE, newSrc, 'utf8');
console.log(`\n已更新 ${SEED_FILE}（版本 ${currentVersion} → ${currentVersion + 1}）`);

/* ───────── 输出：提交到 GitHub（可选） ───────── */
if (flags.token && flags.repo) {
  const [owner, repo] = flags.repo.split('/');
  const path = 'frontend/src/data/seedAccounts.ts';
  const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const headers = {
    Authorization: `Bearer ${flags.token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // 取当前文件 sha（更新必需）
  const cur = await fetch(api, { headers });
  if (!cur.ok) {
    console.error(`获取远程文件失败: HTTP ${cur.status}`);
    process.exit(1);
  }
  const curJson = await cur.json();
  const body = {
    message: `chore: 同步 ${added.length} 个新注册账号进内置登记表`,
    content: Buffer.from(newSrc, 'utf8').toString('base64'),
    sha: curJson.sha,
    branch: 'main',
  };
  const put = await fetch(api, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!put.ok) {
    console.error(`提交失败: HTTP ${put.status} ${await put.text()}`);
    process.exit(1);
  }
  const putJson = await put.json();
  console.log(`已提交到 GitHub: ${putJson.commit?.html_url ?? ''}`);
} else {
  console.log('提示：未提供 GITHUB_TOKEN/--repo，仅更新了本地文件。');
  console.log('      重新构建并发布后，新账号即在所有设备生效。');
}

/**
 * 手机号账户注册表：
 * - 一个手机号只能注册一个账号；用户名全局唯一
 * - 密码只存 SHA-256 哈希，不存明文
 * - 支持手机号或用户名 + 密码登录
 *
 * 双层存储（解决「换设备/清缓存就登录不上去」）：
 * 1) 内置层 SEED_ACCOUNTS（src/data/seedAccounts.ts）：随网站代码发布，
 *    任何设备打开网站都自带这份登记表，里面的账号可直接登录；
 * 2) 本地层 localStorage：本机新注册的账号。
 *
 * 合并规则：内置层优先 —— 同一手机号/用户名以内置层为准，
 * 这样旧浏览器里遗留的过期账号数据不会覆盖代码里的正确数据。
 *
 * 新注册的账号若尚未进入内置层，会出现在「待同步」队列中，
 * 经 frontend/scripts/sync-accounts.mjs 提交回代码库后全设备生效。
 */

import { SEED_ACCOUNTS } from '@/data/seedAccounts';

export interface PhoneAccount {
  id: string;
  /** 11 位手机号 */
  phone: string;
  /** 全局唯一用户名 */
  username: string;
  /** 密码摘要（hex）。hashVersion=2 时为 hash(salt + 明文)，否则为历史无盐摘要 */
  passwordHash: string;
  /** 哈希方案版本：2 = 加盐（hex 盐 + SHA-256）；缺省表示旧版无盐摘要 */
  hashVersion?: 2;
  /** 随机盐（hex），仅 hashVersion=2 的账号有 */
  salt?: string;
  createdAt: number;
  lastLoginAt?: number;
}

const STORAGE_KEY = 'mathlens-phone-accounts-v1';

/* ───────── 存储读写 ───────── */

/** 仅读取本机 localStorage 中的账号 */
const readLocal = (): PhoneAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as PhoneAccount[]) : [];
  } catch {
    return [];
  }
};

const writeLocal = (accounts: PhoneAccount[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch {
    /* 存储失败时静默降级 */
  }
};

/** 该账号是否已存在于内置登记表（按手机号或用户名匹配） */
const inSeed = (account: PhoneAccount): boolean =>
  SEED_ACCOUNTS.some(
    (s) =>
      s.phone === account.phone ||
      s.username.toLowerCase() === account.username.toLowerCase(),
  );

/**
 * 合并后的全部账号（内置层优先，本地层去重后追加）。
 * 登录、注册、唯一性校验都以这份合并结果为准。
 */
const readAll = (): PhoneAccount[] => [
  ...SEED_ACCOUNTS,
  ...readLocal().filter((a) => !inSeed(a)),
];

/* ───────── 校验规则 ───────── */

export const PHONE_RE = /^1[3-9]\d{9}$/;
export const USERNAME_RE = /^[\u4e00-\u9fa5A-Za-z0-9_]{2,16}$/;

/** SHA-256（hex）。仅当环境提供 WebCrypto（安全上下文）时可用，否则返回 null */
const sha256Hex = async (text: string): Promise<string | null> => {
  try {
    if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.subtle) {
      const buf = await globalThis.crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(text),
      );
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }
  } catch {
    /* 无 WebCrypto */
  }
  return null;
};

/** 非安全上下文（http）下的降级摘要。绝不可当作密码学安全哈希使用 */
const fallbackHex = (text: string): string => {
  let h1 = 0xdeadbeef ^ text.length;
  let h2 = 0x41c6ce57 ^ text.length;
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
};

/** 密码摘要：优先 SHA-256，无 WebCrypto 时退化为非加密摘要 */
export const hashPassword = async (text: string): Promise<string> =>
  (await sha256Hex(text)) ?? fallbackHex(text);

/** 生成 16 字节随机盐（hex） */
const randomSalt = (): string => {
  const bytes = new Uint8Array(16);
  if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

/** 用指定密码生成加盐凭据 */
const makeSalted = async (
  password: string,
): Promise<{ passwordHash: string; salt: string; hashVersion: 2 }> => {
  const salt = randomSalt();
  return { passwordHash: await hashPassword(salt + password), salt, hashVersion: 2 };
};

/**
 * 校验密码，并给出可写回的升级凭据。
 *
 * 历史账号（hashVersion 缺省）的摘要是无盐的，且生成时的环境可能支持
 * WebCrypto 也可能不支持，所以两种算法都要试一遍；一旦匹配就顺手升级成
 * 加盐格式，避免同一站点在 http / https 之间切换时登录失败。
 */
const verifyPassword = async (
  password: string,
  account: PhoneAccount,
): Promise<{ ok: boolean; upgraded?: { passwordHash: string; salt: string; hashVersion: 2 } }> => {
  if (account.hashVersion === 2 && account.salt) {
    const h = await hashPassword(account.salt + password);
    return { ok: h === account.passwordHash };
  }
  const sha = await sha256Hex(password);
  const matched =
    (sha !== null && sha === account.passwordHash) || fallbackHex(password) === account.passwordHash;
  if (!matched) return { ok: false };
  return { ok: true, upgraded: await makeSalted(password) };
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * 注册手机号账户。
 * 校验：手机号格式、手机号唯一（含内置层）、用户名格式、用户名全局唯一、密码长度。
 * 抛出带友好提示的 Error。
 */
export const registerPhoneAccount = async (input: {
  phone: string;
  username: string;
  password: string;
}): Promise<PhoneAccount> => {
  const phone = input.phone.trim();
  const username = input.username.trim();
  const password = input.password;

  if (!PHONE_RE.test(phone)) {
    throw new Error('请输入 11 位有效手机号（1 开头的中国大陆号码）');
  }
  if (!USERNAME_RE.test(username)) {
    throw new Error('用户名需 2-16 位，仅支持中文、字母、数字和下划线');
  }
  if (password.length < 6 || password.length > 32) {
    throw new Error('密码长度需在 6-32 位之间');
  }

  const accounts = readAll();
  if (accounts.some((a) => a.phone === phone)) {
    throw new Error('该手机号已注册过账号，可直接登录');
  }
  if (accounts.some((a) => a.username.toLowerCase() === username.toLowerCase())) {
    throw new Error('该用户名已被占用，请换一个试试');
  }

  await delay(500); // 模拟请求
  const account: PhoneAccount = {
    id: `acc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    phone,
    username,
    // 加盐存储：同一密码在不同账号上得到不同摘要，避免彩虹表直接命中
    ...(await makeSalted(password)),
    createdAt: Date.now(),
  };
  writeLocal([...readLocal(), account]);
  return account;
};

/** 手机号或用户名 + 密码登录；成功返回账户并更新 lastLoginAt */
export const authenticateAccount = async (
  identifier: string,
  password: string,
): Promise<PhoneAccount> => {
  const id = identifier.trim();
  if (!id) throw new Error('请输入手机号或用户名');
  if (!password) throw new Error('请输入密码');

  const accounts = readAll();
  const account = accounts.find(
    (a) => a.phone === id || a.username.toLowerCase() === id.toLowerCase(),
  );
  if (!account) {
    throw new Error('账号不存在，请先用手机号注册');
  }

  await delay(500);
  const verified = await verifyPassword(password, account);
  if (!verified.ok) {
    throw new Error('密码不正确，请重试');
  }

  // 仅回写本机副本（内置层账号的 lastLoginAt 与哈希升级都不落库到代码）。
  // 历史无盐账号在这里顺手升级为加盐格式；内置账号写不回去，下次登录重算一遍即可。
  const upgraded = verified.upgraded;
  writeLocal(
    readLocal().map((a) =>
      a.id === account.id ? { ...a, ...(upgraded ?? {}), lastLoginAt: Date.now() } : a,
    ),
  );
  return { ...account, ...(upgraded ?? {}) };
};

/** 全部注册账户（注册时间倒序） */
export const listAccounts = (): PhoneAccount[] =>
  [...readAll()].sort((a, b) => b.createdAt - a.createdAt);

/** 注册账户总数 */
export const countAccounts = (): number => readAll().length;

/** 内置登记表账号数 */
export const countSeedAccounts = (): number => SEED_ACCOUNTS.length;

/** 该账号是否来自内置登记表（全设备生效） */
export const isSeedAccount = (account: PhoneAccount): boolean => inSeed(account);

/* ───────── 待同步队列（新注册 → 写入代码库） ───────── */

/**
 * 待同步账号：本机注册、但尚未进入内置登记表的账号。
 * 内置层已包含的账号不会出现在这里（说明已全设备生效）。
 */
export const listPendingSyncAccounts = (): PhoneAccount[] =>
  readLocal().filter((a) => !inSeed(a));

/**
 * 生成同步载荷（JSON 字符串）：
 * 交给 frontend/scripts/sync-accounts.mjs 写入 src/data/seedAccounts.ts。
 */
export const buildSyncPayload = (): string =>
  JSON.stringify(
    {
      source: 'mathlens-account-sync',
      exportedAt: new Date().toISOString(),
      accounts: listPendingSyncAccounts(),
    },
    null,
    2,
  );

/** 同步载荷的 Base64 形式（便于在聊天工具里转发；UTF-8 安全） */
export const buildSyncCode = (): string => {
  const bytes = new TextEncoder().encode(buildSyncPayload());
  let bin = '';
  const chunkSize = 0x8000; // 分块避免超长字符串触发调用栈上限
  for (let i = 0; i < bytes.length; i += chunkSize) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(bin);
};

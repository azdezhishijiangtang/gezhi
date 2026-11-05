import type { PhoneAccount } from '@/lib/accountStore';

/**
 * 内置账号登记表（随网站代码一起发布，全设备生效）。
 *
 * 作用：账号数据不再只存在于某台设备的浏览器 localStorage 里，
 * 而是编译进网站本身 —— 任何设备打开网站都会带上这份登记表，
 * 里面的账号可以直接登录，彻底解决「换设备就登录不上去」的问题。
 *
 * 维护方式：新用户注册后会进入本机「待同步」队列，
 * 通过 frontend/scripts/sync-accounts.mjs 提交回本文件后全站生效。
 *
 * 注意：passwordHash 为密码的 SHA-256（hex），不要存放明文密码。
 */
export const SEED_ACCOUNTS: PhoneAccount[] = [
  {
    id: 'acc-seed-17736095542',
    phone: '17736095542',
    username: '开发者阿z的知识讲堂',
    passwordHash: 'fd6b862900dd48b023aed49af7cf5d05e310708cd400a2e848ee72f88699c547',
    createdAt: 1735660800000,
    lastLoginAt: undefined,
  },
];

/** 登记表版本号：每次通过同步程序写入新账号时 +1，便于排查线上版本 */
export const SEED_ACCOUNTS_VERSION = 1;

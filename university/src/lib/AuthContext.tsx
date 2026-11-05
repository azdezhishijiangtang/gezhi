import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  authenticateAccount,
  registerPhoneAccount,
  type PhoneAccount,
} from '@/lib/accountStore';
import { SEED_ACCOUNTS } from '@/data/seedAccounts';

/** 用户（本地会话，无真实后端） */
export interface DemoUser {
  id: string;
  /** 历史字段：邮箱登录已移除，手机号账户恒为空字符串 */
  email: string;
  name: string;
  avatarUrl: string;
  loginAt: number;
  /** 登录方式（老数据缺省视为 email） */
  loginType?: 'email' | 'phone';
  /** 手机号账户字段 */
  phone?: string;
  username?: string;
}

interface AuthContextValue {
  user: DemoUser | null;
  loading: boolean;
  /** 手机号注册：一个手机号一个账号，用户名全局唯一 */
  signUpWithPhone: (phone: string, username: string, password: string) => Promise<void>;
  /** 手机号（或用户名）+ 密码登录 */
  signInWithPhone: (identifier: string, password: string) => Promise<void>;
  /** 退出登录 */
  signOut: () => void;
}

const STORAGE_KEY = 'mathlens-demo-user';

const AuthContext = createContext<AuthContextValue | null>(null);

/** 基于种子生成稳定的头像（DiceBear API，无需后端） */
const avatarFromSeed = (seed: string): string =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=2563eb,475569&textColor=ffffff`;

const readStoredUser = (): DemoUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoUser;
    if (!parsed?.id) return null;
    return parsed;
  } catch {
    return null;
  }
};

/** 手机号账户 → 会话用户 */
const userFromAccount = (account: PhoneAccount): DemoUser => ({
  id: account.id,
  email: '',
  name: account.username,
  avatarUrl: avatarFromSeed(account.username),
  loginAt: Date.now(),
  loginType: 'phone',
  phone: account.phone,
  username: account.username,
});

/** 开发者专属账号（手机号）：开发者模式仅对该账号开放 */
export const DEV_PHONE = '17736095542';

/** 当前登录用户是否为开发者账号 */
export const isDevUser = (user: DemoUser | null): boolean => {
  if (!user || user.loginType !== 'phone' || user.phone !== DEV_PHONE) return false;
  // 光比对手机号不够：会话存在 localStorage 里，访客可以把 phone 改成开发者号码。
  // 这里再要求「会话里的账号 id 与内置登记表一致」——只有真的用开发者账号登录过，
  // id 才对得上。
  return SEED_ACCOUNTS.some((s) => s.phone === DEV_PHONE && s.id === user.id);
};

/** 侧栏/个人页展示的联系方式：邮箱优先，否则脱敏手机号 */
export const userContact = (user: DemoUser): string => {
  if (user.email) return user.email;
  if (user.phone) return `${user.phone.slice(0, 3)}****${user.phone.slice(-4)}`;
  return '手机号账户';
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 惰性初始化：渲染前同步恢复会话（刷新后保持登录）
  const [user, setUser] = useState<DemoUser | null>(readStoredUser);
  // 本地会话为同步读取，无异步加载态；保留字段以兼容守卫逻辑
  const loading = false;

  // 多标签页同步：一个标签登出，其他标签同步
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setUser(readStoredUser());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const signUpWithPhone = useCallback(
    async (phone: string, username: string, password: string) => {
      const account = await registerPhoneAccount({ phone, username, password });
      const session = userFromAccount(account);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      setUser(session);
    },
    [],
  );

  const signInWithPhone = useCallback(async (identifier: string, password: string) => {
    const account = await authenticateAccount(identifier, password);
    const session = userFromAccount(account);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(session);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, signUpWithPhone, signInWithPhone, signOut }),
    [user, loading, signUpWithPhone, signInWithPhone, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth 必须在 AuthProvider 内部使用');
  return ctx;
};

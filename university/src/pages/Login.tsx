import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  KeyRound,
  Loader2,
  Lock,
  LogIn,
  Phone,
  Sigma,
  UserRound,
  UserPlus,
} from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeIn } from '@/components/MotionPrimitives';
import { renderMath } from '@/components/MathText';
import { useAuth } from '@/lib/AuthContext';
import { useT } from '@/i18n/LocaleContext';

const inputCls = 'pl-10';

const Login = () => {
  const t = useT();
  const { signUpWithPhone, signInWithPhone, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 已登录则直接进入来源页（或首页）
  const from = (location.state as { from?: string })?.from ?? '/';

  /* ── 手机号模式 ── */
  const [phoneMode, setPhoneMode] = useState<'register' | 'login'>('register');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [phoneSubmitting, setPhoneSubmitting] = useState(false);

  const handlePhoneRegister = async (e: FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    if (regPassword !== confirmPassword) {
      setPhoneError(t('两次输入的密码不一致'));
      return;
    }
    setPhoneSubmitting(true);
    try {
      await signUpWithPhone(phone, username, regPassword);
      navigate(from, { replace: true });
    } catch (err) {
      setPhoneError(err instanceof Error ? err.message : t('注册失败，请重试'));
    } finally {
      setPhoneSubmitting(false);
    }
  };

  const handlePhoneLogin = async (e: FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    setPhoneSubmitting(true);
    try {
      await signInWithPhone(identifier, loginPassword);
      navigate(from, { replace: true });
    } catch {
      // 统一文案，避免泄露「账号不存在」vs「密码错误」，防止账号枚举
      setPhoneError(t('账号或密码错误'));
    } finally {
      setPhoneSubmitting(false);
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-14">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl w-full">
        {/* ── 左侧：品牌与说明 ── */}
        <FadeIn className="hidden lg:block">
          <p className="flex items-center gap-2 text-sm font-semibold text-info tracking-wide mb-4">
            <Sigma className="h-4 w-4" />
            MATHLENS
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight">
            {t('手机号注册，')}
            <br />
            {t('开启你的数学学习之旅')}
          </h1>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            {t('一个手机号一个账号，设置专属用户名与密码；登录后保存学习进度、收藏知识点，在任意页面继续你的推导。')}
          </p>
          <div
            className="mt-8 border-l-2 border-info pl-5 text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: renderMath('e^{i\\pi} + 1 = 0', true),
            }}
          />
          <p className="mt-3 text-xs text-muted-foreground">
            {t('欧拉恒等式 —— 数学中最美的公式之一')}
          </p>
        </FadeIn>

        {/* ── 右侧：登录表单 ── */}
        <FadeIn delay={0.1} className="w-full">
          <div className="border border-border bg-card p-8 lg:p-10">
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <BrandMark className="h-9 w-9 drop-shadow-sm" />
              <span className="font-serif text-xl font-semibold">
                Principia
              </span>
            </div>

            <h2 className="font-serif text-2xl font-semibold">{t('欢迎来到 Principia')}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {phoneMode === 'register'
                ? t('手机号注册：一个手机号一个账号，用户名全站唯一')
                : t('输入手机号（或用户名）与密码登录')}
            </p>

            <div className="mt-6">
              {/* ═══════ 手机号（本站唯一登录方式） ═══════ */}
                {/* 注册 / 登录 切换 */}
                <div className="grid grid-cols-2 gap-1 border border-border bg-secondary/60 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setPhoneMode('register');
                      setPhoneError('');
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 text-sm transition-colors duration-[var(--duration-fast)] ${
                      phoneMode === 'register'
                        ? 'bg-card text-foreground shadow-sm font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <UserPlus className="h-4 w-4" />
                    {t('注册新账号')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPhoneMode('login');
                      setPhoneError('');
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 text-sm transition-colors duration-[var(--duration-fast)] ${
                      phoneMode === 'login'
                        ? 'bg-card text-foreground shadow-sm font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <LogIn className="h-4 w-4" />
                    {t('已有账号登录')}
                  </button>
                </div>

                {phoneMode === 'register' ? (
                  <form onSubmit={handlePhoneRegister} className="mt-6 space-y-4" noValidate>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        {t('手机号')}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          inputMode="numeric"
                          maxLength={11}
                          autoComplete="tel"
                          placeholder={t('11 位手机号，如 13812345678')}
                          className={inputCls}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="username" className="block text-sm font-medium mb-2">
                        {t('用户名')} <span className="text-xs text-muted-foreground">{t('（全站唯一，2-16 位）')}</span>
                      </label>
                      <div className="relative">
                        <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="username"
                          type="text"
                          maxLength={16}
                          autoComplete="username"
                          placeholder={t('中文、字母、数字或下划线')}
                          className={inputCls}
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="reg-password" className="block text-sm font-medium mb-2">
                          {t('设置密码')}
                        </label>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="reg-password"
                            type="password"
                            autoComplete="new-password"
                            placeholder={t('6-32 位')}
                            className={inputCls}
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                          {t('确认密码')}
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirm-password"
                            type="password"
                            autoComplete="new-password"
                            placeholder={t('再输入一次')}
                            className={inputCls}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {phoneError && (
                      <p
                        role="alert"
                        className="border border-destructive/40 bg-destructive/8 px-3 py-2 text-sm text-destructive"
                      >
                        {phoneError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={phoneSubmitting}
                      className="w-full gap-2 bg-info text-info-foreground hover:bg-info/90"
                    >
                      {phoneSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t('正在注册…')}
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4" />
                          {t('注册并登录')}
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      {t('已有账号？')}
                      <button
                        type="button"
                        onClick={() => {
                          setPhoneMode('login');
                          setPhoneError('');
                        }}
                        className="ml-1 text-info hover:underline"
                      >
                        {t('直接登录')}
                      </button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handlePhoneLogin} className="mt-6 space-y-4" noValidate>
                    <div>
                      <label htmlFor="identifier" className="block text-sm font-medium mb-2">
                        {t('手机号或用户名')}
                      </label>
                      <div className="relative">
                        <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="identifier"
                          type="text"
                          autoComplete="username"
                          placeholder={t('注册时的手机号或用户名')}
                          className={inputCls}
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="login-password" className="block text-sm font-medium mb-2">
                        {t('密码')}
                      </label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          autoComplete="current-password"
                          placeholder={t('注册时设置的密码')}
                          className={inputCls}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {phoneError && (
                      <p
                        role="alert"
                        className="border border-destructive/40 bg-destructive/8 px-3 py-2 text-sm text-destructive"
                      >
                        {phoneError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={phoneSubmitting}
                      className="w-full gap-2 bg-info text-info-foreground hover:bg-info/90"
                    >
                      {phoneSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t('正在登录…')}
                        </>
                      ) : (
                        <>
                          <LogIn className="h-4 w-4" />
                          {t('登录')}
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      {t('还没有账号？')}
                      <button
                        type="button"
                        onClick={() => {
                          setPhoneMode('register');
                          setPhoneError('');
                        }}
                        className="ml-1 text-info hover:underline"
                      >
                        {t('用手机号注册')}
                      </button>
                    </p>
                  </form>
                )}
              </div>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('返回首页')}
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* 已登录用户的隐蔽跳转提示（无障碍） */}
      {user && (
        <p className="sr-only" role="status">
          {t('你已登录，正在跳转…')}
        </p>
      )}
    </div>
  );
};

export default Login;

import { Link } from 'react-router-dom';
import { Mail, Calendar, LogOut, LogIn, BookOpen, FileQuestion, ListChecks, Sigma, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeIn, Stagger, HoverLift } from '@/components/MotionPrimitives';
import { useAuth, userContact } from '@/lib/AuthContext';
import { useCourses, useProblems } from '@/i18n/data';
import { useLocale, useT } from '@/i18n/LocaleContext';

const Profile = () => {
  const t = useT();
  const { tpl, lang } = useLocale();
  const { user, signOut } = useAuth();
  const courseList = useCourses();
  const problemList = useProblems();

  const quickLinks = [
    { to: '/courses', icon: BookOpen, label: t('课程总览'), desc: tpl('{n} 门核心课程', { n: courseList.length }) },
    { to: '/problems', icon: FileQuestion, label: t('例题广场'), desc: tpl('{n} 道详解例题', { n: problemList.length }) },
    { to: '/formulas', icon: ListChecks, label: t('公式速查表'), desc: t('按课程归类的常用公式') },
  ];

  // 未登录：渲染登录引导（不做重定向，避免登出过渡动画期间的路由冲突）
  if (!user) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-14">
        <FadeIn className="text-center max-w-md">
          <span className="flex h-14 w-14 mx-auto items-center justify-center bg-info/10 text-info mb-6">
            <UserRound className="h-7 w-7" />
          </span>
          <h1 className="font-serif text-2xl font-semibold">{t('还未登录')}</h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {t('登录后即可查看个人中心。使用手机号注册的账号即可体验全部功能。')}
          </p>
          <Button asChild className="mt-7 gap-2 bg-info text-info-foreground hover:bg-info/90">
            <Link to="/login">
              <LogIn className="h-4 w-4" />
              {t('去登录')}
            </Link>
          </Button>
        </FadeIn>
      </div>
    );
  }

  // 校验 loginAt：非法/缺失时回退占位符，避免渲染出 "Invalid Date"
  const loginAt = user.loginAt ? new Date(user.loginAt) : null;
  const loginDate =
    loginAt && !Number.isNaN(loginAt.getTime())
      ? loginAt.toLocaleString(lang === 'en' ? 'en-US' : 'zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '—';

  return (
    <div className="container py-14 lg:py-20 max-w-4xl">
      {/* 用户信息卡 */}
      <FadeIn>
        <div className="border border-border bg-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-border px-6 py-6">
            <Avatar className="h-16 w-16 border border-border">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-info/10 text-info text-lg font-semibold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-2xl font-semibold">{user.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {userContact(user)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {tpl('登录于 {date}', { date: loginDate })}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={signOut}
              className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive/40"
            >
              <LogOut className="h-4 w-4" />
              {t('退出登录')}
            </Button>
          </div>

          <div className="px-6 py-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('欢迎回来，')}<strong className="text-foreground">{user.name}</strong>
              {t('！这里是你的个人中心。演示模式下，学习进度与收藏功能将在接入云端账号体系后开放。')}
            </p>
          </div>
        </div>
      </FadeIn>

      {/* 学习入口 */}
      <FadeIn delay={0.1}>
        <h2 className="font-serif text-xl font-semibold mt-12 mb-5">{t('继续学习')}</h2>
      </FadeIn>
      <Stagger className="grid gap-4 sm:grid-cols-3" stagger={0.08}>
        {quickLinks.map((link) => (
          <HoverLift key={link.to}>
            <Link
              to={link.to}
              className="group block h-full border border-border bg-card p-5 transition-colors duration-[var(--duration-normal)] hover:border-info/50"
            >
              <span className="flex h-10 w-10 items-center justify-center bg-info/10 text-info mb-4">
                <link.icon className="h-5 w-5" />
              </span>
              <h3 className="font-serif text-base font-semibold group-hover:text-info transition-colors duration-[var(--duration-fast)]">
                {link.label}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{link.desc}</p>
            </Link>
          </HoverLift>
        ))}
      </Stagger>

      {/* 品牌脚注 */}
      <FadeIn delay={0.2}>
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Sigma className="h-3.5 w-3.5" />
          {t('Principia · 手机号账号体系')}
        </div>
      </FadeIn>
    </div>
  );
};

export default Profile;

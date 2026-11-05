import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, LogIn, LogOut, User, BookOpen, Sun, Moon } from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth, userContact } from '@/lib/AuthContext';
import { useTheme } from '@/lib/ThemeContext';
import { useSubject } from '@/lib/SubjectContext';
import { useLocale } from '@/i18n/LocaleContext';
import { SUBJECT_META, type Subject } from '@/types';

// xlOnly：次级导航项仅在超宽屏（≥1280px）显示，避免英文长文案把头部撑出视口
const navLinks: { to: string; label: string; xlOnly?: boolean }[] = [
  { to: '/', label: '首页' },
  { to: '/courses', label: '课程' },
  { to: '/knowledge', label: '知识库' },
  { to: '/tutor', label: 'AI 答疑' },
  { to: '/problems', label: '例题广场' },
  { to: '/formulas', label: '公式速查' },
  { to: '/mistakes', label: '错题本', xlOnly: true },
  { to: '/about', label: '关于', xlOnly: true },
];

interface NavbarProps {
  onOpenSearch: () => void;
}

const Navbar = ({ onOpenSearch }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, toggle: toggleTheme, themeLabel } = useTheme();
  const { subject, setSubject } = useSubject();
  const { lang, setLang, t } = useLocale();

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  // 移动端抽屉：Esc 关闭 + 焦点管理（打开时聚焦首个链接，关闭时焦点归还触发按钮）
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const firstFocusable = drawerRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])');
    firstFocusable?.focus();
    // 在 effect 执行时就把触发按钮存下来：cleanup 阶段再读 ref.current
    // 可能已经指向别的元素，焦点会还给错的节点。
    const toggleEl = toggleRef.current;
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      toggleEl?.focus();
    };
  }, [mobileOpen]);

  const handleSignOut = () => {
    signOut();
    setMobileOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Principia 首页">
          <BrandMark className="h-9 w-9 drop-shadow-sm" />
          <span className="font-serif text-xl font-semibold tracking-tight">
            Principia
          </span>
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden min-w-0 items-center gap-0.5 lg:flex" aria-label="主导航">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`whitespace-nowrap px-2 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)] hover:text-foreground xl:px-3 ${
                isActive(link.to) ? 'text-foreground' : 'text-muted-foreground'
              } ${link.xlOnly ? 'hidden xl:inline-block' : ''}`}
            >
              {t(link.label)}
              {isActive(link.to) && (
                <span className="block h-0.5 w-full bg-info mt-0.5" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-0 shrink-0 items-center gap-1.5 xl:gap-2">
          {/* 搜索触发按钮（宽屏显示完整输入式按钮，窄屏退化为图标） */}
          <Button
            variant="outline"
            onClick={onOpenSearch}
            className="hidden min-w-0 max-w-[9rem] shrink items-center justify-between gap-2 text-muted-foreground font-normal xl:flex xl:max-w-[15rem]"
            aria-label={t('搜索知识点与例题')}
          >
            <span className="flex min-w-0 items-center gap-2">
              <Search className="h-4 w-4 shrink-0" />
              <span className="text-sm truncate">{t('搜索知识 / 例题')}</span>
            </span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground xl:inline-flex">
              ⌘K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSearch}
            className="hidden shrink-0 sm:inline-flex xl:hidden"
            aria-label={t('搜索')}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* 数学 / 物理 学科切换 */}
          <div className="hidden sm:flex items-center gap-0.5 rounded-md border border-border p-0.5">
            {(['math', 'physics'] as Subject[]).map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                aria-label={t(`切换到${SUBJECT_META[s].name}`)}
                aria-pressed={subject === s}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors duration-[var(--duration-fast)] ${
                  subject === s
                    ? 'bg-info text-info-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t(SUBJECT_META[s].short)}
              </button>
            ))}
          </div>

          {/* 中 / EN 语言切换 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="hidden sm:inline-flex gap-1 px-2 font-medium"
            aria-label={t('切换语言')}
            title={t('切换语言')}
          >
            {lang === 'en' ? '中文' : 'EN'}
          </Button>

          {/* 日光 / 月光模式切换 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={t(`切换到${theme === 'dark' ? '日光模式' : '月光模式'}`)}
            title={t(themeLabel)}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* 登录状态区 */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label={`${t('用户菜单')}：${user.name}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="bg-info/10 text-info text-xs font-semibold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground font-normal truncate">
                    {userContact(user)}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer gap-2">
                    <User className="h-4 w-4" />
                    {t('个人中心')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/study" className="cursor-pointer gap-2">
                    <BookOpen className="h-4 w-4" />
                    {t('学习档案')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  {t('退出登录')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="gap-1.5 bg-info text-info-foreground hover:bg-info/90">
              <Link to="/login">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">{t('登录')}</span>
              </Link>
            </Button>
          )}

          {/* 移动端菜单按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            ref={toggleRef}
            aria-label={mobileOpen ? t('关闭菜单') : t('打开菜单')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* 移动端抽屉菜单 */}
      {mobileOpen && (
        <nav
          ref={drawerRef}
          className="lg:hidden border-t border-border bg-background"
          aria-label="移动端导航"
          role="dialog"
          aria-modal="true"
        >
          <div className="container py-3 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`py-3 text-sm font-medium border-b border-border last:border-0 ${
                  isActive(link.to) ? 'text-info' : 'text-muted-foreground'
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/study"
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-medium border-b border-border text-muted-foreground"
                >
                  {t('学习档案')}
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-medium border-b border-border text-muted-foreground"
                >
                  {t('个人中心')}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="py-3 text-sm font-medium text-left text-destructive"
                >
                  {t('退出登录')}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-medium text-info"
              >
                {t('登录')}
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;

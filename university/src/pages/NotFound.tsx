import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/MotionPrimitives';
import { renderMath } from '@/components/MathText';
import { useT } from '@/i18n/LocaleContext';

const NotFound = () => {
  const t = useT();
  const location = useLocation();

  useEffect(() => {
    // 仅在开发环境输出 404 诊断，避免生产构建向控制台刷无关注释
    if (import.meta.env.DEV) {
      console.error('404 Error: User attempted to access non-existent route:', location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-20">
      <FadeIn className="text-center max-w-lg">
        <div
          className="mb-6 flex justify-center"
          dangerouslySetInnerHTML={{
            __html: renderMath('\\lim_{x \\to \\text{page}} \\text{content} = \\text{undefined}', true),
          }}
        />
        <h1 className="font-serif text-5xl font-semibold">404</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {t('你访问的页面不存在——就像函数在该点没有定义一样。')}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="gap-2 bg-info text-info-foreground hover:bg-info/90">
            <Link to="/">
              <Home className="h-4 w-4" />
              {t('返回首页')}
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/courses">
              <BookOpen className="h-4 w-4" />
              {t('浏览课程')}
            </Link>
          </Button>
          <Button asChild variant="ghost" className="gap-2">
            <Link to="/problems">
              <Search className="h-4 w-4" />
              {t('例题广场')}
            </Link>
          </Button>
        </div>
      </FadeIn>
    </div>
  );
};

export default NotFound;

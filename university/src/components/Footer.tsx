import { Link } from 'react-router-dom';
import { KeyRound, HandCoins, Users, Wrench } from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import { courseCategories } from '@/data/courses';
import { useCourses, useTopics } from '@/i18n/data';
import { useT } from '@/i18n/LocaleContext';
import { isDevUser, useAuth } from '@/lib/AuthContext';

const Footer = () => {
  const t = useT();
  const { user } = useAuth();
  const devAllowed = isDevUser(user);
  const courses = useCourses();
  const topics = useTopics();

  return (
    <footer className="border-t border-border bg-secondary/50 mt-auto">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* 品牌 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BrandMark className="h-8 w-8 drop-shadow-sm" />
              <span className="font-serif text-lg font-semibold">Principia</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('面向大学本科生与考研学生的数学、物理知识解答平台。以清晰的讲解、规范的公式排版与分步详解，陪伴你理解每一个数学与物理概念。')}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              {courses.length} {t('门课程')} · {topics.length} {t('个知识专题')}
            </p>
          </div>

          {/* 学科方向 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('学科方向')}</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {courseCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/courses?category=${cat.id}`}
                    className="hover:text-foreground transition-colors duration-[var(--duration-fast)]"
                  >
                    {t(cat.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 学习工具 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('学习工具')}</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/courses" className="hover:text-foreground transition-colors duration-[var(--duration-fast)]">
                  {t('全部课程')}
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="hover:text-foreground transition-colors duration-[var(--duration-fast)]">
                  {t('知识检索')}
                </Link>
              </li>
              <li>
                <Link to="/problems" className="hover:text-foreground transition-colors duration-[var(--duration-fast)]">
                  {t('例题广场')}
                </Link>
              </li>
              <li>
                <Link to="/formulas" className="hover:text-foreground transition-colors duration-[var(--duration-fast)]">
                  {t('公式速查表')}
                </Link>
              </li>
              <li>
                <Link to="/tutor" className="hover:text-foreground transition-colors duration-[var(--duration-fast)]">
                  {t('AI 答疑')}
                </Link>
              </li>
              <li>
                <Link to="/study" className="hover:text-foreground transition-colors duration-[var(--duration-fast)]">
                  {t('学习档案')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 支持与反馈 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t('支持')}</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/about"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-[var(--duration-fast)]"
                >
                  <Users className="h-4 w-4" />
                  {t('关于开发者')}
                </Link>
              </li>
              <li>
                <Link
                  to="/donate"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-[var(--duration-fast)]"
                >
                  <HandCoins className="h-4 w-4" />
                  {t('打赏开发者')}
                </Link>
              </li>
              <li>
                <Link
                  to="/custom"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-[var(--duration-fast)]"
                >
                  <Wrench className="h-4 w-4" />
                  {t('功能定制共建')}
                </Link>
              </li>
              {devAllowed && (
                <li>
                  <Link
                    to="/dev"
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-[var(--duration-fast)]"
                  >
                    <KeyRound className="h-4 w-4" />
                    {t('开发者模式')}
                  </Link>
                </li>
              )}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              {t('Principia 持续更新中——新内容与功能会不定期上线。')}
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>Principia · {t('大学数学物理本科知识解答平台')}</p>
          <p>{t('公式由 KaTeX 渲染 · 内容仅供学习交流')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

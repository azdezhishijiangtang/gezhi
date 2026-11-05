import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, FileQuestion, List } from 'lucide-react';
import { FadeIn, Stagger, HoverLift } from '@/components/MotionPrimitives';
import { InlineMathText } from '@/components/MathText';
import { useT } from '@/i18n/LocaleContext';
import { useCourse, useTopics, useProblems } from '@/i18n/data';
import NotFound from './NotFound';

const CourseDetail = () => {
  const t = useT();
  const { courseId } = useParams<{ courseId: string }>();
  const course = useCourse(courseId);
  const topics = useTopics();
  const problems = useProblems();

  const courseTopics = useMemo(
    () => (course ? topics.filter((t) => t.courseId === course.id) : []),
    [course, topics],
  );

  const chapters = useMemo(() => {
    const map = new Map<string, typeof courseTopics>();
    courseTopics.forEach((t) => {
      const list = map.get(t.chapter) ?? [];
      list.push(t);
      map.set(t.chapter, list);
    });
    return Array.from(map.entries());
  }, [courseTopics]);

  if (!course) return <NotFound />;

  const problemCount = problems.filter((p) => p.courseId === course.id).length;

  return (
    <div className="container py-14 lg:py-20">
      {/* 返回 */}
      <FadeIn>
        <Link
          to="/courses"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)] mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('返回课程列表')}
        </Link>
      </FadeIn>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* ── 主内容 ── */}
        <div className="lg:col-span-8">
          <FadeIn>
            <p className="text-sm font-semibold text-info tracking-wide mb-2 font-mono">
              {course.code}
            </p>
            <h1 className="font-serif text-4xl font-semibold">{course.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="border border-border bg-secondary px-2 py-0.5 text-xs">
                {course.difficulty}
              </span>
              <span>{course.semester}</span>
              <span className="text-border">|</span>
              <span>{courseTopics.length} {t('个知识专题')}</span>
              <span className="text-border">|</span>
              <span>{problemCount} {t('道例题')}</span>
            </div>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">
              {course.description}
            </p>
          </FadeIn>

          {/* 章节列表 */}
          <div className="mt-12 space-y-10">
            {chapters.map(([chapter, chapterTopics], chapterIdx) => (
              <FadeIn key={chapter} delay={chapterIdx * 0.05}>
                <section>
                  <h2 className="font-serif text-xl font-semibold flex items-center gap-2.5 pb-3 border-b border-border">
                    <List className="h-4 w-4 text-info" />
                    {chapter}
                  </h2>
                  <Stagger className="mt-4 space-y-3" stagger={0.06}>
                    {chapterTopics.map((topic) => {
                      const topicProblems = problems.filter((p) => p.topicId === topic.id);
                      return (
                        <HoverLift key={topic.id}>
                          <Link
                            to={`/topics/${topic.id}`}
                            className="group block border border-border bg-card p-5 transition-colors duration-[var(--duration-normal)] hover:border-info/50"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <h3 className="font-serif text-lg font-semibold group-hover:text-info transition-colors duration-[var(--duration-fast)]">
                                  <InlineMathText escape text={topic.title} />
                                </h3>
                                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                  <InlineMathText escape text={topic.summary} />
                                </p>
                              </div>
                              <ArrowRight className="h-4 w-4 shrink-0 mt-1.5 text-muted-foreground transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 group-hover:text-info" />
                            </div>
                            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-3.5 w-3.5" />
                                {topic.keyPoints.length} {t('个要点')}
                              </span>
                              {topicProblems.length > 0 && (
                                <span className="flex items-center gap-1">
                                  <FileQuestion className="h-3.5 w-3.5" />
                                  {topicProblems.length} {t('道例题')}
                                </span>
                              )}
                            </div>
                          </Link>
                        </HoverLift>
                      );
                    })}
                  </Stagger>
                </section>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ── 侧栏：章节导航 ── */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-serif text-base font-semibold">{t('章节目录')}</h2>
            </div>
            <nav className="p-3">
              {chapters.map(([chapter, chapterTopics]) => (
                <div key={chapter} className="mb-3 last:mb-0">
                  <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    {chapter}
                  </p>
                  {chapterTopics.map((topic) => (
                    <Link
                      key={topic.id}
                      to={`/topics/${topic.id}`}
                      className="block px-2 py-2 text-sm text-foreground/85 hover:text-info hover:bg-info/8 transition-colors duration-[var(--duration-fast)] border-l-2 border-transparent hover:border-info"
                    >
                      <InlineMathText escape text={topic.title} />
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
            <div className="border-t border-border p-4">
              <Link
                to="/problems"
                className="flex items-center justify-between text-sm text-info font-medium hover:underline"
              >
                {t('浏览全部例题')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetail;

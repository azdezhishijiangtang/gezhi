import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger, HoverLift } from '@/components/MotionPrimitives';
import CourseIcon from '@/components/CourseIcon';
import { subjectCategories } from '@/data/courses';
import { useT, useLocale } from '@/i18n/LocaleContext';
import { useCourses, useTopics, useProblems } from '@/i18n/data';
import { useSubject } from '@/lib/SubjectContext';
import { SUBJECT_META, subjectOf, type Course } from '@/types';

const difficultyColors: Record<Course['difficulty'], string> = {
  基础: 'bg-success/12 text-success border-success/30',
  进阶: 'bg-warning/12 text-warning border-warning/30',
  高阶: 'bg-destructive/12 text-destructive border-destructive/30',
};

const Courses = () => {
  const t = useT();
  const { tpl, lang } = useLocale();
  const { subject } = useSubject();
  const meta = SUBJECT_META[subject];
  const [activeTag, setActiveTag] = useState<string>('全部');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') ?? '全部';

  const setActiveCategory = (id: string) => {
    if (id === '全部') setSearchParams({});
    else setSearchParams({ category: id });
  };

  const allCourses = useCourses();
  const subjectCourseList = useMemo(
    () => allCourses.filter((c) => subjectOf(c) === subject),
    [allCourses, subject],
  );
  const topics = useTopics();
  const problems = useProblems();

  const allTags = useMemo(() => {
    const set = new Set<string>();
    subjectCourseList.forEach((c) => c.tags.forEach((tag) => set.add(tag)));
    return ['全部', ...Array.from(set)];
  }, [subjectCourseList]);

  const filtered = useMemo(() => {
    const cat = subjectCategories(subject).find((c) => c.id === activeCategory);
    let list = cat ? subjectCourseList.filter((c) => cat.courseIds.includes(c.id)) : subjectCourseList;
    if (activeTag !== '全部') list = list.filter((c) => c.tags.includes(activeTag));
    return list;
  }, [activeCategory, activeTag, subject, subjectCourseList]);

  const subjectTopicCount = useMemo(
    () => topics.filter((t) => subjectCourseList.some((c) => c.id === t.courseId)).length,
    [topics, subjectCourseList],
  );

  return (
    <div className="container py-14 lg:py-20">
      {/* 页头 */}
      <FadeIn>
        <p className="text-sm font-semibold text-info tracking-wide mb-2">{t('课程体系 · ')}{t(meta.name)}</p>
        <h1 className="font-serif text-4xl font-semibold">{tpl('{short}课程总览', { short: t(meta.short) })}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
          {tpl('共 {n} 门本科{short}课程，横跨{names}，合计 {k} 个知识专题。每门课程按章节组织内容，配套例题详解，支持按方向与标签筛选。', {
            n: subjectCourseList.length,
            short: t(meta.short),
            names: subjectCategories(subject).map((c) => t(c.name)).join(lang === 'en' ? ', ' : '、'),
            k: subjectTopicCount,
          })}
        </p>
      </FadeIn>

      {/* 方向筛选 */}
      <FadeIn delay={0.05}>
        <div className="mt-10 flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground mr-1">
            <Filter className="h-4 w-4" />
            {t('方向')}
          </span>
          <Button
            variant={activeCategory === '全部' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory('全部')}
            className={
              activeCategory === '全部'
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'text-muted-foreground'
            }
          >
            {t('全部')}
          </Button>
          {subjectCategories(subject).map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className={
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'text-muted-foreground'
              }
            >
              {t(cat.name)}
            </Button>
          ))}
        </div>
      </FadeIn>

      {/* 标签筛选 */}
      <FadeIn delay={0.1}>
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground mr-1">
            <Filter className="h-4 w-4" />
            {t('筛选')}
          </span>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={activeTag === tag ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTag(tag)}
              className={
                activeTag === tag
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'text-muted-foreground'
              }
            >
              {t(tag)}
            </Button>
          ))}
        </div>
      </FadeIn>

      {/* 课程卡片 */}
      <Stagger className="mt-8 grid gap-6 lg:grid-cols-2" stagger={0.1}>
        {filtered.map((course) => {
          const courseTopics = topics.filter((t) => t.courseId === course.id);
          const problemCount = problems.filter((p) => p.courseId === course.id).length;
          return (
            <HoverLift key={course.id}>
              <Link
                to={`/courses/${course.id}`}
                className="group block h-full border border-border bg-card transition-colors duration-[var(--duration-normal)] hover:border-info/50"
              >
                <div className="border-b border-border px-6 py-5 flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-info/10 text-info">
                    <CourseIcon name={course.icon} className="h-6 w-6" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="font-serif text-xl font-semibold group-hover:text-info transition-colors duration-[var(--duration-fast)]">
                        {course.name}
                      </h2>
                      <span
                        className={`text-xs border px-1.5 py-0.5 ${difficultyColors[course.difficulty]}`}
                      >
                        {course.difficulty}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground font-mono">
                      {course.code} · {course.semester}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {course.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTag(tag);
                        }}
                        className="text-xs bg-secondary text-muted-foreground px-2 py-1 hover:bg-info/10 hover:text-info transition-colors duration-[var(--duration-fast)] cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-border flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {tpl('{n} 个专题 · {m} 道例题', { n: courseTopics.length, m: problemCount })}
                  </span>
                  <span className="flex items-center gap-1.5 text-info font-medium">
                    {t('进入课程')}
                    <ArrowRight className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </HoverLift>
          );
        })}
      </Stagger>

      {filtered.length === 0 && (
        <div className="mt-10 border border-border bg-card py-16 text-center">
          <p className="text-muted-foreground">{t('该标签下暂无课程，试试其他标签吧')}</p>
          <Button variant="outline" className="mt-4" onClick={() => setActiveTag('全部')}>
            {t('查看全部课程')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Courses;

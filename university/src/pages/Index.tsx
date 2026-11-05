import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Sigma,
  CheckCircle2,
  Sparkles,
  Atom,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger, HoverLift } from '@/components/MotionPrimitives';
import MathText, { InlineMathText, renderMath } from '@/components/MathText';
import CourseIcon from '@/components/CourseIcon';
import { subjectCategories } from '@/data/courses';
import { useT, useLocale } from '@/i18n/LocaleContext';
import { useCourses, useTopics, useProblems, useFormulaGroups } from '@/i18n/data';
import { useSubject } from '@/lib/SubjectContext';
import { SUBJECT_META, subjectOf, type Subject } from '@/types';

const Index = () => {
  const t = useT();
  const { tpl } = useLocale();
  const { subject, setSubject } = useSubject();
  const meta = SUBJECT_META[subject];
  const navigate = useNavigate();

  const courses = useCourses();
  const topics = useTopics();
  const problems = useProblems();
  const formulaGroups = useFormulaGroups();

  const subjectCourseList = useMemo(
    () => courses.filter((c) => subjectOf(c) === subject),
    [courses, subject],
  );
  const subjectCourseIds = useMemo(
    () => new Set(subjectCourseList.map((c) => c.id)),
    [subjectCourseList],
  );
  const subjectTopicCount = useMemo(
    () => topics.filter((t) => subjectCourseIds.has(t.courseId)).length,
    [topics, subjectCourseIds],
  );
  const subjectProblemCount = useMemo(
    () => problems.filter((p) => subjectCourseIds.has(p.courseId)).length,
    [problems, subjectCourseIds],
  );
  const subjectFormulaCount = useMemo(
    () => formulaGroups.filter((g) => subjectCourseIds.has(g.courseId)).reduce((s, g) => s + g.formulas.length, 0),
    [formulaGroups, subjectCourseIds],
  );

  const stats = [
    { value: subjectCourseList.length, suffix: '门', label: '核心课程' },
    { value: subjectTopicCount, suffix: '个', label: '知识专题' },
    { value: subjectProblemCount, suffix: '道', label: '详解例题' },
    { value: subjectFormulaCount, suffix: '+', label: '速查公式' },
  ];

  const hotTopics = useMemo(
    () => topics.filter((t) => subjectCourseIds.has(t.courseId)).slice(0, 4),
    [topics, subjectCourseIds],
  );
  const featuredProblems = useMemo(
    () => problems.filter((p) => subjectCourseIds.has(p.courseId)).slice(0, 3),
    [problems, subjectCourseIds],
  );

  // Hero 精选公式：取当前学科前三组的第一条，空集时回退到数学
  const heroFormulas = useMemo(() => {
    const pick = (s: Subject) => {
      const ids = new Set(courses.filter((c) => subjectOf(c) === s).map((c) => c.id));
      return formulaGroups
        .filter((g) => ids.has(g.courseId))
        .slice(0, 3)
        .map((g) => ({ name: g.name, latex: g.formulas[0]?.latex }))
        .filter((x) => x.latex);
    };
    return pick(subject).length ? pick(subject) : pick('math');
  }, [subject, courses, formulaGroups]);

  return (
    <div className="flex flex-col">
      {/* ═══════════ Hero ═══════════ */}
      <section className="relative bg-hero text-hero-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.07]" />
        <div className="container relative py-20 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="flex items-center gap-2 text-sm text-hero-foreground/70 mb-6">
                  <Sigma className="h-4 w-4" />
                  {t('大学数学物理本科知识解答平台')}
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1
                  className="font-serif font-semibold leading-[1.15] tracking-tight"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                >
                  {t('把抽象的数理，')}
                  <br />
                  <span className="text-[oklch(0.75_0.15_255)]">{t('看得懂的推理')}</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-6 text-lg text-hero-foreground/75 leading-relaxed max-w-xl">
                  {t('覆盖数学系与物理系本科核心课程——分析、代数与几何、概率统计、方程与计算，经典物理、理论物理、凝聚态与粒子天体。知识点可检索、例题分步详解、公式规范排版，还有 AI 助教随身答疑。')}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-info text-info-foreground hover:bg-info/90 gap-2"
                  >
                    <Link to="/courses">
                      {t('浏览课程')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-hero-foreground/30 text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground gap-2"
                  >
                    <Link to="/tutor">
                      <Sparkles className="h-4 w-4" />
                      {t('AI 答疑')}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-hero-foreground/30 text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground gap-2"
                  >
                    <Link to="/knowledge">
                      <BookOpen className="h-4 w-4" />
                      {t('知识检索')}
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Hero 公式卡片 */}
            <FadeIn delay={0.25} className="lg:col-span-5">
              <div className="border border-hero-foreground/15 bg-hero-foreground/5 backdrop-blur-sm p-8">
                <p className="flex items-center gap-2 text-sm font-medium text-hero-foreground/70 mb-6">
                  <Sigma className="h-4 w-4" />
                  {t('精选公式 · ')}{t(meta.short)}
                </p>
                <div className="space-y-7">
                  {heroFormulas.map((f, i) => (
                    <div key={i} className={i > 0 ? 'border-t border-hero-foreground/10 pt-6' : ''}>
                      <p className="text-sm text-hero-foreground/60 mb-2">{f.name}</p>
                      <div
                        className="text-base overflow-x-auto [&_.katex]:text-hero-foreground [&_.katex-display]:my-0"
                        dangerouslySetInnerHTML={{ __html: renderMath(f.latex, true) }}
                      />
                    </div>
                  ))}
                </div>
                <Link
                  to="/formulas"
                  className="mt-7 flex items-center gap-1.5 text-sm text-hero-foreground/60 hover:text-hero-foreground transition-colors duration-[var(--duration-fast)]"
                >
                  {tpl('查看全部 {n} 条速查公式', { n: subjectFormulaCount })}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════ 学科门户（首页自由选择） ═══════════ */}
      <section className="border-b border-border bg-card">
        <div className="container py-14">
          <FadeIn>
            <p className="text-sm font-semibold text-info tracking-wide mb-2">{t('选择你的学科区')}</p>
            <h2 className="font-serif text-3xl font-semibold">{t('数学区 还是 物理区？')}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
              {t('平台分为数学与物理两大本科知识区，内容、课程、例题与公式互不干扰。点击进入后，全站导航与搜索都会聚焦到对应学科。')}
            </p>
          </FadeIn>
          <Stagger className="mt-8 grid gap-5 md:grid-cols-2" stagger={0.1}>
            {(['math', 'physics'] as Subject[]).map((s) => {
              const m = SUBJECT_META[s];
              const list = courses.filter((c) => subjectOf(c) === s);
              const ids = new Set(list.map((c) => c.id));
              const tCount = topics.filter((t) => ids.has(t.courseId)).length;
              const Icon = s === 'math' ? Sigma : Atom;
              return (
                <HoverLift key={s}>
                  <button
                    onClick={() => {
                      setSubject(s);
                      navigate('/courses');
                    }}
                    className="group block h-full w-full text-left border border-border bg-background p-8 transition-colors duration-[var(--duration-normal)] hover:border-info/50"
                  >
                    <span className="flex h-14 w-14 items-center justify-center bg-info/10 text-info mb-5">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="font-serif text-2xl font-semibold group-hover:text-info transition-colors duration-[var(--duration-fast)]">
                      {t(m.name)}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {tpl('{blurb}。共 {n} 门课程、{k} 个知识专题。', { blurb: t(m.blurb), n: list.length, k: tCount })}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5 text-sm text-info font-medium">
                      {tpl('进入{name}', { name: t(m.name) })}
                      <ArrowRight className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1" />
                    </div>
                  </button>
                </HoverLift>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ 数据统计 ═══════════ */}
      <section className="border-b border-border bg-card">
        <div className="container">
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border" stagger={0.08}>
            {stats.map((s) => (
              <FadeIn key={s.label} className="px-4 py-8 text-center first:pl-0 last:pr-0">
                <p className="font-serif text-4xl font-semibold text-info">
                  {s.value}
                  <span className="text-xl">{t(s.suffix)}</span>
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{t(s.label)}</p>
              </FadeIn>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ 课程入口 ═══════════ */}
      <section className="container py-20">
        <FadeIn>
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-info tracking-wide mb-2">{t('课程体系 · ')}{t(meta.name)}</p>
              <h2 className="font-serif text-3xl font-semibold">{t('按课程开始学习')}</h2>
            </div>
            <Link
              to="/courses"
              className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
            >
              {t('查看全部')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {subjectCourseList.map((course) => {
            const topicCount = topics.filter((t) => t.courseId === course.id).length;
            return (
              <HoverLift key={course.id}>
                <Link
                  to={`/courses/${course.id}`}
                  className="group block h-full border border-border bg-card p-6 transition-colors duration-[var(--duration-normal)] hover:border-info/50"
                >
                  <span className="flex h-11 w-11 items-center justify-center bg-info/10 text-info mb-5">
                    <CourseIcon name={course.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-serif text-lg font-semibold group-hover:text-info transition-colors duration-[var(--duration-fast)]">
                    {course.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground font-mono">{course.code}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs text-muted-foreground">{topicCount} {t('个知识专题')}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 group-hover:text-info" />
                  </div>
                </Link>
              </HoverLift>
            );
          })}
        </Stagger>
      </section>

      {/* ═══════════ 学科版图 ═══════════ */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container py-14">
          <FadeIn>
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-info tracking-wide mb-2">{t('学科版图 · ')}{t(meta.name)}</p>
                <h2 className="font-serif text-2xl font-semibold">
                  {tpl('{n} 大方向 · {m} 门课程全貌', { n: subjectCategories(subject).length, m: subjectCourseList.length })}
                </h2>
              </div>
              <span className="hidden sm:block text-sm text-muted-foreground">
                {tpl('共 {n} 个知识专题', { n: subjectTopicCount })}
              </span>
            </div>
          </FadeIn>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {subjectCategories(subject).map((cat) => {
              const catCourses = courses.filter((c) => cat.courseIds.includes(c.id));
              const topicCount = topics.filter((t) => cat.courseIds.includes(t.courseId)).length;
              return (
                <FadeIn key={cat.id}>
                  <Link
                    to={`/courses?category=${cat.id}`}
                    className="group block h-full border border-border bg-card p-5 transition-colors duration-[var(--duration-normal)] hover:border-info/50"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg font-semibold group-hover:text-info transition-colors duration-[var(--duration-fast)]">
                        {t(cat.name)}
                      </h3>
                      <span className="text-xs text-muted-foreground">{topicCount} {t('个知识专题')}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{t(cat.description)}</p>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {catCourses.map((c) => c.name).join(' · ')}
                    </p>
                  </Link>
                </FadeIn>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ 热门知识点 ═══════════ */}
      <section className="border-y border-border bg-secondary/40 py-20">
        <div className="container">
          <FadeIn>
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
              <p className="text-sm font-semibold text-info tracking-wide mb-2">{t('知识专题 · ')}{t(meta.name)}</p>
              <h2 className="font-serif text-3xl font-semibold">{t('热门知识专题')}</h2>
              </div>
              <Link
                to="/courses"
                className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
              >
                {t('全部专题')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          <Stagger className="grid gap-5 md:grid-cols-2" stagger={0.1}>
            {hotTopics.length > 0 && hotTopics.map((topic) => {
              const course = courses.find((c) => c.id === topic.courseId);
              return (
                <HoverLift key={topic.id}>
                  <Link
                    to={`/topics/${topic.id}`}
                    className="group block h-full border border-border bg-card p-6 transition-colors duration-[var(--duration-normal)] hover:border-info/50"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <BookOpen className="h-3.5 w-3.5 text-info" />
                      <span className="font-medium text-info">{course?.name}</span>
                      <span className="text-border">/</span>
                      <span>{topic.chapter}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold group-hover:text-info transition-colors duration-[var(--duration-fast)]">
                      <InlineMathText escape text={topic.title} />
                    </h3>
                    <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      <InlineMathText escape text={topic.summary} />
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {topic.keyPoints.slice(0, 2).map((kp, i) => (
                        <span
                          key={i}
                          className="text-xs bg-secondary text-muted-foreground px-2 py-1 line-clamp-1"
                        >
                          <InlineMathText escape text={kp} />
                        </span>
                      ))}
                    </div>
                  </Link>
                </HoverLift>
              );
            })}
            {hotTopics.length === 0 && (
              <p className="text-muted-foreground">{t('该学科内容正在建设中，敬请期待。')}</p>
            )}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ 精选例题 ═══════════ */}
      <section className="container py-20">
        <FadeIn>
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-info tracking-wide mb-2">{t('例题精讲 · ')}{t(meta.name)}</p>
              <h2 className="font-serif text-3xl font-semibold">{t('精选例题详解')}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('每道题都提供分步提示与完整解答——先思考，再看答案')}
              </p>
            </div>
            <Link
              to="/problems"
              className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
            >
              {t('例题广场')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        <Stagger className="grid gap-5 md:grid-cols-3" stagger={0.1}>
          {featuredProblems.length > 0 && featuredProblems.map((problem) => {
            const course = courses.find((c) => c.id === problem.courseId);
            return (
              <HoverLift key={problem.id}>
                <Link
                  to={`/topics/${problem.topicId}#problem-${problem.id}`}
                  className="group block h-full border border-border bg-card p-6 transition-colors duration-[var(--duration-normal)] hover:border-info/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-info">{course?.name}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                      {tpl('{n} 步详解', { n: problem.solution.length })}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-info transition-colors duration-[var(--duration-fast)]">
                    <InlineMathText escape text={problem.title} />
                  </h3>
                  <MathText escape
                    content={problem.question}
                    className="mt-3 text-sm text-muted-foreground line-clamp-2 [&_.katex-display]:my-1 [&_p]:my-1"
                  />
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {problem.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-secondary px-2 py-0.5 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </HoverLift>
            );
          })}
          {featuredProblems.length === 0 && (
            <p className="text-muted-foreground">{t('该学科例题正在建设中，敬请期待。')}</p>
          )}
        </Stagger>
      </section>

      {/* ═══════════ 底部 CTA ═══════════ */}
      <section className="container pb-20">
        <FadeIn>
          <div className="border border-border bg-card px-8 py-12 lg:px-14 lg:py-16 text-center">
            <h2 className="font-serif text-3xl font-semibold">{t('准备好攻克下一个知识点了吗？')}</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {tpl('从极限到泛函，从牛顿定律到量子力学——{n} 门课程、{k} 个专题系统学，知识点随时检索，公式速查随身带，还有 AI 助教为你答疑解惑。', { n: subjectCourseList.length, k: subjectTopicCount })}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-info text-info-foreground hover:bg-info/90 gap-2">
                <Link to="/courses">
                  {t('开始学习')} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link to="/tutor">
                  <Sparkles className="h-4 w-4" />
                  {t('AI 答疑')}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/formulas">{t('公式速查表')}</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
};

export default Index;

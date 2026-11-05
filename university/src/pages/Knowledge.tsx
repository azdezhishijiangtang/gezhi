import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, X, ChevronRight, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FadeIn, Stagger } from '@/components/MotionPrimitives';
import CourseIcon from '@/components/CourseIcon';
import { useTopics, useCourses } from '@/i18n/data';
import { subjectCourses } from '@/data/courses';
import { InlineMathText } from '@/components/MathText';
import { searchAll } from '@/lib/mathSearch';
import { useT, useLocale } from '@/i18n/LocaleContext';
import { useSubject } from '@/lib/SubjectContext';
import { SUBJECT_META } from '@/types';

/** 在含公式的文本中高亮关键词：先按 $公式$ 切分，公式用 KaTeX 渲染，非公式片段做关键词高亮 */
const highlightMath = (text: string, query: string): ReactNode => {
  const mathRe = /\$\$([^$]+?)\$\$|\$([^$]+?)\$/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let seq = 0;
  const renderPlain = (plain: string, key: string): ReactNode => {
    if (!query.trim()) return <InlineMathText escape key={key} text={plain} />;
    const q = query.trim().toLowerCase();
    const lower = plain.toLowerCase();
    const nodes: ReactNode[] = [];
    let l = 0;
    let idx = lower.indexOf(q);
    let j = 0;
    while (idx !== -1) {
      if (idx > l) nodes.push(<InlineMathText escape key={`${key}-t${j}`} text={plain.slice(l, idx)} />);
      nodes.push(
        <mark key={`${key}-m${j}`} className="bg-info/20 text-info px-0.5">
          {plain.slice(idx, idx + q.length)}
        </mark>,
      );
      l = idx + q.length;
      idx = lower.indexOf(q, l);
      j++;
    }
    if (l < plain.length) nodes.push(<InlineMathText escape key={`${key}-t${j}`} text={plain.slice(l)} />);
    return <span key={key}>{nodes}</span>;
  };
  while ((m = mathRe.exec(text)) !== null) {
    if (m.index > last) out.push(renderPlain(text.slice(last, m.index), `s${seq++}`));
    out.push(<InlineMathText escape key={`k${seq++}`} text={`$${m[1] ?? m[2]}$`} />);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(renderPlain(text.slice(last), `s${seq++}`));
  return out;
};


const Knowledge = () => {
  const t = useT();
  const { tpl } = useLocale();
  const { subject } = useSubject();
  const meta = SUBJECT_META[subject];
  const topics = useTopics();
  const courses = useCourses();
  const courseById = useMemo(() => new Map(courses.map((c) => [c.id, c])), [courses]);
  const [query, setQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState<string>('all');

  const subjectCourseList = subjectCourses(subject);
  const subjectCourseIds = useMemo(() => new Set(subjectCourseList.map((c) => c.id)), [subjectCourseList]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return topics
        .filter((t) => subjectCourseIds.has(t.courseId))
        .filter((t) => courseFilter === 'all' || t.courseId === courseFilter)
        .map((t) => ({ topic: t, score: 1, excerpt: t.summary }));
    }
    // 先按课程过滤、再截断展示数量，避免搜索上限（24）先于课程过滤导致某课程结果被裁掉
    return searchAll(query, 200, subject).topics
      .filter((h) => courseFilter === 'all' || h.topic.courseId === courseFilter)
      .slice(0, 24);
  }, [query, courseFilter, subject, subjectCourseIds, topics]);

  // 每个课程的专题数
  const topicCountByCourse = useMemo(() => {
    const m = new Map<string, number>();
    for (const t of topics) m.set(t.courseId, (m.get(t.courseId) ?? 0) + 1);
    return m;
  }, [topics]);

  return (
    <div className="container py-10 lg:py-14">
      {/* 页头 */}
      <FadeIn>
        <p className="text-sm font-semibold text-info tracking-wide mb-2">KNOWLEDGE BASE · {t(meta.name)}</p>
        <h1 className="font-serif text-3xl font-semibold">{t('知识点检索大全')}</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl leading-relaxed">
          {tpl(
            '{n} 门{short}课程 · {k} 个知识专题。输入关键词或按课程浏览——每个专题都有完整的定义、定理、方法讲解与 LaTeX 公式推导。',
            {
              n: subjectCourseList.length,
              short: t(meta.short),
              k: topics.filter((t) => subjectCourseIds.has(t.courseId)).length,
            },
          )}
        </p>
      </FadeIn>

      {/* 搜索框 */}
      <FadeIn delay={0.05}>
        <div className="mt-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('用自然语言提问也可以：怎么求矩阵的逆 / 钟形曲线 / 抽屉原理 / 点乘…')}
            className="pl-12 pr-10 h-12 text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={t('清空搜索')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </FadeIn>

      {/* 课程筛选 */}
      <FadeIn delay={0.1}>
        <div className="mt-5 flex flex-wrap gap-1.5">
          <button
            onClick={() => setCourseFilter('all')}
            className={`text-xs px-2.5 py-1.5 border transition-colors duration-[var(--duration-fast)] ${
              courseFilter === 'all'
                ? 'border-info bg-info/10 text-info'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('全部课程')}
          </button>
          {subjectCourseList.map((c) => (
            <button
              key={c.id}
              onClick={() => setCourseFilter(c.id)}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 border transition-colors duration-[var(--duration-fast)] ${
                courseFilter === c.id
                  ? 'border-info bg-info/10 text-info'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <CourseIcon name={c.icon} className="h-3.5 w-3.5" />
              {courseById.get(c.id)?.name ?? c.name}
              <span className="text-muted-foreground/60">{topicCountByCourse.get(c.id) ?? 0}</span>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* 结果统计 */}
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <GraduationCap className="h-4 w-4" />
        {t('共')} <span className="text-info font-semibold">{results.length}</span> {t('个结果')}
        {query && <span>{tpl('（关键词「{q}」）', { q: query })}</span>}
      </div>

      {/* 结果列表 */}
      {results.length === 0 ? (
        <div className="mt-8 border border-border bg-card py-16 text-center">
          <Search className="mx-auto h-10 w-10 text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground">{t('没有找到匹配的知识点')}</p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {t('换个关键词试试，或去')}
            <Link to="/tutor" className="text-info hover:underline mx-1">{t('AI 答疑')}</Link>
            {t('直接提问。')}
          </p>
        </div>
      ) : (
        <Stagger className="mt-6 space-y-4" stagger={0.04}>
          {results.map(({ topic, excerpt }) => {
            const course = courses.find((c) => c.id === topic.courseId);
            return (
              <FadeIn key={topic.id}>
                <Link
                  to={`/topics/${topic.id}`}
                  className="group block border border-border bg-card p-5 transition-colors duration-[var(--duration-normal)] hover:border-info/50"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5">
                    {course && <CourseIcon name={course.icon} className="h-3.5 w-3.5 text-info" />}
                    <span className="font-medium text-info">{course?.name}</span>
                    <span className="text-border">/</span>
                    <span>{topic.chapter}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="font-serif text-lg font-semibold group-hover:text-info transition-colors duration-[var(--duration-fast)]">
                        {highlightMath(topic.title, query)}
                      </h2>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {highlightMath(query ? excerpt : topic.summary, query)}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {topic.keyPoints.slice(0, 3).map((kp, i) => (
                          <span
                            key={i}
                            className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 line-clamp-1"
                          >
                            <InlineMathText escape text={kp} />
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 group-hover:text-info" />
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </Stagger>
      )}

      {/* 底部引导 */}
      <FadeIn delay={0.15}>
        <div className="mt-10 flex items-center gap-3 border border-border bg-card px-6 py-5">
          <BookOpen className="h-5 w-5 shrink-0 text-info" />
          <p className="text-sm text-muted-foreground flex-1">
            {t('没找到想学的内容？可以在 AI 答疑中描述你的问题，助教会结合课程知识体系为你讲解。')}
          </p>
          <Link
            to="/tutor"
            className="text-sm text-info hover:underline shrink-0 flex items-center gap-1"
          >
            {t('去 AI 答疑')}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </FadeIn>
    </div>
  );
};

export default Knowledge;

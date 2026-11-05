import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger } from '@/components/MotionPrimitives';
import ProblemCard from '@/components/ProblemCard';
import { useSubject } from '@/lib/SubjectContext';
import { SUBJECT_META } from '@/types';
import { useT } from '@/i18n/LocaleContext';
import { useProblems, useCourses, useTopics } from '@/i18n/data';

const difficultyFilters = [
  { value: 'all', label: '全部难度' },
  { value: '1', label: '基础' },
  { value: '2', label: '中等' },
  { value: '3', label: '较难' },
] as const;

const Problems = () => {
  const t = useT();
  const { subject } = useSubject();
  const meta = SUBJECT_META[subject];
  const allCourses = useCourses();
  const subjectCourseList = useMemo(
    () => allCourses.filter((c) => (c.subject ?? 'math') === subject),
    [allCourses, subject],
  );
  const subjectCourseIds = useMemo(() => new Set(subjectCourseList.map((c) => c.id)), [subjectCourseList]);
  const problems = useProblems();
  const topics = useTopics();
  const [courseFilter, setCourseFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const filtered = useMemo(
    () =>
      problems.filter((p) => {
        if (!subjectCourseIds.has(p.courseId)) return false;
        if (courseFilter !== 'all' && p.courseId !== courseFilter) return false;
        if (difficultyFilter !== 'all' && String(p.difficulty) !== difficultyFilter) return false;
        return true;
      }),
    [courseFilter, difficultyFilter, subjectCourseIds, problems],
  );

  return (
    <div className="container py-14 lg:py-20">
      {/* 页头 */}
      <FadeIn>
        <p className="text-sm font-semibold text-info tracking-wide mb-2">PROBLEM BANK · {t(meta.name)}</p>
        <h1 className="font-serif text-4xl font-semibold">{t(meta.short)}{t('例题广场')}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
          {t('每道例题配备分步提示与完整解答。建议先看提示独立思考，再展开解答核对每一步的推理依据。')}
        </p>
      </FadeIn>

      {/* 筛选器 */}
      <FadeIn delay={0.1}>
        <div className="mt-10 border border-border bg-card p-4 flex flex-col lg:flex-row lg:items-center gap-4">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
            <Filter className="h-4 w-4" />
            {t('筛选')}
          </span>

          {/* 课程筛选 */}
          <div className="flex flex-wrap gap-1.5">
            <Button
              variant={courseFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCourseFilter('all')}
              className={courseFilter === 'all' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground'}
            >
              {t('全部课程')}
            </Button>
            {subjectCourseList.map((c) => (
              <Button
                key={c.id}
                variant={courseFilter === c.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCourseFilter(c.id)}
                className={courseFilter === c.id ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground'}
              >
                {c.name}
              </Button>
            ))}
          </div>

          <div className="hidden lg:block w-px h-6 bg-border" />

          {/* 难度筛选 */}
          <div className="flex flex-wrap gap-1.5">
            {difficultyFilters.map((d) => (
              <Button
                key={d.value}
                variant={difficultyFilter === d.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter(d.value)}
                className={
                  difficultyFilter === d.value
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'text-muted-foreground'
                }
              >
                {t(d.label)}
              </Button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* 结果统计 */}
      <FadeIn delay={0.15}>
        <p className="mt-6 text-sm text-muted-foreground">
          {t('共')} <span className="font-semibold text-foreground">{filtered.length}</span> {t('道例题')}
        </p>
      </FadeIn>

      {/* 例题列表 */}
      <Stagger className="mt-6 space-y-6" stagger={0.08}>
        {filtered.map((problem) => {
          const course = allCourses.find((c) => c.id === problem.courseId);
          return (
            <FadeIn key={problem.id}>
              <div>
                <Link
                  to={`/topics/${problem.topicId}`}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-info transition-colors duration-[var(--duration-fast)] mb-2"
                >
                  {course?.name}
                  <ArrowRight className="h-3 w-3" />
                  {topics.find((tp) => tp.id === problem.topicId)?.title ?? t('知识点')}
                </Link>
                <ProblemCard problem={problem} showTopicLink={false} />
              </div>
            </FadeIn>
          );
        })}
      </Stagger>

      {filtered.length === 0 && (
        <div className="mt-8 border border-border bg-card py-16 text-center">
          <p className="text-muted-foreground">{t('当前筛选条件下暂无例题')}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setCourseFilter('all');
              setDifficultyFilter('all');
            }}
          >
            {t('清除筛选条件')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Problems;

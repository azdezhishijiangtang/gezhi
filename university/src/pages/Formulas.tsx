import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookMarked, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger } from '@/components/MotionPrimitives';
import { InlineMathText, renderMath } from '@/components/MathText';
import { useFormulaGroups, useCourses } from '@/i18n/data';
import { subjectCourses } from '@/data/courses';
import { useT, useLocale } from '@/i18n/LocaleContext';
import { useSubject } from '@/lib/SubjectContext';
import { SUBJECT_META } from '@/types';

const Formulas = () => {
  const t = useT();
  const { tpl } = useLocale();
  const { subject } = useSubject();
  const meta = SUBJECT_META[subject];
  const formulaGroups = useFormulaGroups();
  const courses = useCourses();
  const subjectCourseList = subjectCourses(subject);
  const subjectCourseIds = useMemo(() => new Set(subjectCourseList.map((c) => c.id)), [subjectCourseList]);

  const validGroups = useMemo(
    () => formulaGroups.filter((g) => subjectCourseIds.has(g.courseId)),
    [formulaGroups, subjectCourseIds],
  );
  const [activeCourse, setActiveCourse] = useState(formulaGroups[0].courseId);

  // 当前学科下若选中的课程没有公式（典型场景：刚切换了学科），回退到该学科
  // 第一门有公式的课程。这是纯派生值，不需要 effect + setState 兜底，
  // 否则每次切换都会多一次级联渲染。
  const effectiveCourse = useMemo(
    () =>
      validGroups.some((g) => g.courseId === activeCourse)
        ? activeCourse
        : (validGroups[0]?.courseId ?? ''),
    [validGroups, activeCourse],
  );

  const groups = formulaGroups.filter((g) => g.courseId === effectiveCourse);
  const activeCourseObj = courses.find((c) => c.id === effectiveCourse);
  const courseById = useMemo(() => new Map(courses.map((c) => [c.id, c])), [courses]);

  // 每门课程一个标签（按当前学科课程聚合）
  const courseTabs = subjectCourseList
    .map((course) => ({
      course,
      count: formulaGroups
        .filter((g) => g.courseId === course.id)
        .reduce((s, g) => s + g.formulas.length, 0),
    }))
    .filter((tab) => tab.count > 0);

  return (
    <div className="container py-14 lg:py-20">
      {/* 页头 */}
      <FadeIn>
        <p className="text-sm font-semibold text-info tracking-wide mb-2">CHEAT SHEET · {t(meta.name)}</p>
        <h1 className="font-serif text-4xl font-semibold">{tpl('{short}公式速查表', { short: t(meta.short) })}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
          {t('按课程归类的常用公式集合，考前冲刺与作业速查两相宜。所有公式均由 KaTeX 规范排版。')}
        </p>
      </FadeIn>

      {/* 课程切换 */}
      <FadeIn delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-2 border-b border-border pb-4">
          {courseTabs.map(({ course, count }) => {
            const isActive = effectiveCourse === course.id;
            return (
              <Button
                key={course.id}
                variant="ghost"
                onClick={() => setActiveCourse(course.id)}
                className={`gap-2 ${
                  isActive
                    ? 'bg-info/10 text-info hover:bg-info/15 hover:text-info'
                    : 'text-muted-foreground'
                }`}
              >
                <BookMarked className="h-4 w-4" />
                {courseById.get(course.id)?.name ?? course.name}
                <Badge variant="secondary" className="ml-1 font-mono text-xs">
                  {count}
                </Badge>
              </Button>
            );
          })}
        </div>
      </FadeIn>

      {/* 公式分组 */}
      <div className="mt-8 space-y-10">
        {groups.map((group) => (
          <FadeIn key={group.id}>
            <section>
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-border">
                <h2 className="font-serif text-xl font-semibold">{group.name}</h2>
                <Link
                  to={`/courses/${group.courseId}`}
                  className="text-xs text-muted-foreground hover:text-info transition-colors duration-[var(--duration-fast)]"
                >
                  {tpl('前往 {name} 课程 →', { name: activeCourseObj?.name ?? '' })}
                </Link>
              </div>
              <Stagger className="mt-4 grid gap-4 md:grid-cols-2" stagger={0.06}>
                {group.formulas.map((formula) => (
                  <FormulaCard key={formula.id} name={formula.name} latex={formula.latex} note={formula.note} />
                ))}
              </Stagger>
            </section>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

const FormulaCard = ({ name, latex, note }: { name: string; latex: string; note?: string }) => {
  const t = useT();
  const { tpl } = useLocale();
  const [copied, setCopied] = useState(false);

  const copyLatex = async () => {
    try {
      await navigator.clipboard.writeText(latex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error(t('复制失败，请手动选择公式文本'));
    }
  };

  return (
    <div className="group border border-border bg-card p-5 transition-colors duration-[var(--duration-normal)] hover:border-info/50">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-sm font-semibold"><InlineMathText escape text={name} /></h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-fast)] text-muted-foreground hover:text-info"
          onClick={copyLatex}
          aria-label={tpl('复制 {name} 的 LaTeX 源码', { name })}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
      <div
        className="overflow-x-auto text-sm"
        dangerouslySetInnerHTML={{ __html: renderMath(latex, true) }}
      />
      {note && <p className="mt-3 text-xs text-muted-foreground leading-relaxed"><InlineMathText escape text={note} /></p>}
    </div>
  );
};

export default Formulas;

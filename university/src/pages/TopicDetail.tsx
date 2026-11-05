import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  Lightbulb,
  ListChecks,
  FileQuestion,
  Sparkles,
  List,
  X,
  FileDown,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger } from '@/components/MotionPrimitives';
import MathText, { InlineMathText, renderInline } from '@/components/MathText';
import ProblemCard from '@/components/ProblemCard';
import { useCourses, useProblems, useTopics } from '@/i18n/data';
import { useT, useLocale } from '@/i18n/LocaleContext';
import { exportTopicToDocx } from '@/lib/wordExport';
import { downloadBlob } from '@/lib/textImage';
import { toast } from 'sonner';
import NotFound from './NotFound';

interface Section {
  id: string;
  /** 小节标题（空字符串表示标题前的导语） */
  title: string;
  body: string;
}

/** 按 `## ` 标题把正文切分为小节（保留标题前的导语作为无标题小节） */
const splitSections = (content: string): Section[] => {
  const sections: Section[] = [];
  let current: Section | null = null;
  for (const line of content.split('\n')) {
    if (line.startsWith('## ')) {
      if (current) sections.push(current);
      current = { id: `sec-${sections.length}`, title: line.slice(3).trim(), body: '' };
    } else if (current) {
      current.body = current.body ? `${current.body}\n${line}` : line;
    } else if (line.trim()) {
      // 第一个 ## 之前的导语
      current = { id: 'sec-intro', title: '', body: line };
    }
  }
  if (current) sections.push(current);
  return sections;
};

const TopicDetail = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionParam = searchParams.get('section');
  const t = useT();
  const { tpl } = useLocale();
  const topics = useTopics();
  const courses = useCourses();
  const problems = useProblems();
  const topic = topics.find((tp) => tp.id === topicId);

  const course = useMemo(
    () => (topic ? courses.find((c) => c.id === topic.courseId) : undefined),
    [topic, courses],
  );

  const relatedProblems = useMemo(
    () => (topic ? problems.filter((p) => p.topicId === topic.id) : []),
    [topic, problems],
  );

  const sections = useMemo(
    () => (topic ? splitSections(topic.content) : []),
    [topic],
  );

  // 同课程的前后知识点
  const { prev, next } = useMemo(() => {
    if (!topic) return { prev: undefined, next: undefined };
    const siblings = topics.filter((tp) => tp.courseId === topic.courseId);
    const idx = siblings.findIndex((tp) => tp.id === topic.id);
    return { prev: idx > 0 ? siblings[idx - 1] : undefined, next: idx < siblings.length - 1 ? siblings[idx + 1] : undefined };
  }, [topic, topics]);

  // 目录滚动高亮：取最后一个顶部越过阈值的可见小节
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  useEffect(() => {
    if (sections.length === 0) return;
    const onScroll = () => {
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) current = s.id;
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  // Word 导出：直接由知识点数据生成（真文本 + 可编辑公式，不再栅格化）
  // 注意：所有 Hook 必须在此 early return 之前调用，否则 topic 存在性变化时
  // Hook 调用顺序会改变，React 会抛 "Rendered fewer hooks than expected"。
  const [exporting, setExporting] = useState(false);

  if (!topic || !course) return <NotFound />;

  const tocSections = sections.filter((s) => s.title);

  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clearSectionContext = () => {
    searchParams.delete('section');
    setSearchParams(searchParams);
  };

  const handleExportWord = async () => {
    setExporting(true);
    try {
      const blob = await exportTopicToDocx({
        courseName: course.name,
        topic: {
          title: topic.title,
          chapter: topic.chapter,
          summary: topic.summary,
          keyPoints: topic.keyPoints,
          content: topic.content,
        },
      });
      const safe = topic.title.replace(/[\\/:*?"<>|]/g, '_').slice(0, 60);
      downloadBlob(blob, `Principia-知识讲解-${safe}.docx`);
      toast.success(t('已导出 Word'));
    } catch (err) {
      toast.error(tpl('导出失败：{msg}', { msg: err instanceof Error ? err.message : String(err) }));
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="container py-10 lg:py-14">
      {/* 面包屑 */}
      <FadeIn>
        <nav aria-label={t('面包屑')} className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors duration-[var(--duration-fast)]">
            {t('首页')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            to={`/courses/${course.id}`}
            className="hover:text-foreground transition-colors duration-[var(--duration-fast)]"
          >
            {course.name}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>{topic.chapter}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium"><InlineMathText escape text={topic.title} /></span>
        </nav>
      </FadeIn>

      <div className="mt-8 grid lg:grid-cols-12 gap-10">
        {/* ── 正文 ── */}
        <article className="lg:col-span-8 min-w-0">
          {/* 标题区 */}
          <FadeIn>
            <p className="text-sm font-semibold text-info tracking-wide mb-2">
              {course.name} · {topic.chapter}
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-tight"><InlineMathText escape text={topic.title} /></h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed"><InlineMathText escape text={topic.summary} /></p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild className="gap-2 bg-info text-info-foreground hover:bg-info/90">
                <Link to={`/tutor?topic=${topic.id}`}>
                  <Sparkles className="h-4 w-4" />
                  {t('问 AI 讲解这个知识点')}
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => void handleExportWord()}
                disabled={exporting}
                title={t('导出为可编辑的 Word 文档（公式可在 Word 中编辑）')}
              >
                {exporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileDown className="h-4 w-4" />
                )}
                {exporting ? t('导出中…') : t('导出 Word')}
              </Button>
              <span className="text-xs text-muted-foreground">
                {t('带着本页上下文提问，问答自动记入学习档案')}
              </span>
            </div>
            <div className="mt-6 h-px bg-border" />
          </FadeIn>

          {/* 分节上下文横幅（从"问 AI 这一节"跳转回来时显示） */}
          {sectionParam && (
            <div className="mt-6 flex items-center gap-3 border border-info/30 bg-info/5 px-4 py-3">
              <Sparkles className="h-4 w-4 shrink-0 text-info" />
              <p className="text-sm flex-1 min-w-0">
                {t('正在阅读：')}
                <span className="text-info font-medium mx-1"><InlineMathText escape text={sectionParam} /></span>
                <span className="text-muted-foreground">{t('（AI 答疑时会结合这一节讲解）')}</span>
              </p>
              <button
                onClick={clearSectionContext}
                className="text-muted-foreground hover:text-foreground shrink-0"
                aria-label={t('清除小节上下文')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* 移动端目录 */}
          {tocSections.length > 1 && (
            <details className="lg:hidden mt-6 border border-border bg-card">
              <summary className="flex items-center gap-2 px-4 py-3 text-sm font-medium cursor-pointer select-none">
                <List className="h-4 w-4 text-info" />
                {tpl('本页目录（{n} 节）', { n: tocSections.length })}
              </summary>
              <ul className="border-t border-border px-4 py-2">
                {tocSections.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => goToSection(s.id)}
                      className={`w-full text-left py-1.5 text-sm transition-colors duration-[var(--duration-fast)] ${
                        activeId === s.id ? 'text-info font-medium' : 'text-muted-foreground'
                      }`}
                    >
                      <InlineMathText escape text={s.title} />
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {/* 知识讲解（按小节渲染，每节可单独问 AI） */}
          <div className="mt-8 space-y-10">
            {sections.map((s, i) => (
              <FadeIn key={s.id} delay={Math.min(i * 0.04, 0.2)}>
                <section id={s.id} className="scroll-mt-24">
                  {s.title && (
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h2
                        className="font-serif text-2xl font-semibold leading-snug"
                        dangerouslySetInnerHTML={{ __html: renderInline(s.title) }}
                      />
                      <Link
                        to={`/tutor?topic=${topic.id}&section=${encodeURIComponent(s.title)}`}
                        className="group flex shrink-0 items-center gap-1.5 border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors duration-[var(--duration-fast)] hover:border-info/50 hover:text-info"
                        title={tpl('让 AI 结合「{title}」这一节讲解', { title: s.title })}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        {t('问 AI 这一节')}
                      </Link>
                    </div>
                  )}
                  <MathText escape content={s.body} />
                </section>
              </FadeIn>
            ))}
          </div>

          {/* 核心要点 */}
          <FadeIn delay={0.15}>
            <section className="mt-12 border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-5 py-4">
                <Lightbulb className="h-4 w-4 text-warning" />
                <h2 className="font-serif text-lg font-semibold">{t('核心要点')}</h2>
              </div>
              <ul className="p-5 space-y-3">
                {topic.keyPoints.map((kp, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-info/10 text-info font-mono text-xs font-semibold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-foreground/90"><InlineMathText escape text={kp} /></span>
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          {/* 关联例题 */}
          {relatedProblems.length > 0 && (
            <section className="mt-12">
              <FadeIn>
                <div className="flex items-center gap-2 mb-6">
                  <FileQuestion className="h-5 w-5 text-info" />
                  <h2 className="font-serif text-2xl font-semibold">
                    {tpl('配套例题（{n}）', { n: relatedProblems.length })}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6 -mt-3">
                  {t('建议先读提示独立思考，再对照完整解答核对步骤')}
                </p>
              </FadeIn>
              <Stagger className="space-y-6" stagger={0.1}>
                {relatedProblems.map((problem) => (
                  <FadeIn key={problem.id}>
                    <ProblemCard problem={problem} />
                  </FadeIn>
                ))}
              </Stagger>
            </section>
          )}

          {/* 前后知识点 */}
          <nav className="mt-14 grid sm:grid-cols-2 gap-4" aria-label="知识点导航">
            {prev ? (
              <Link
                to={`/topics/${prev.id}`}
                className="group border border-border bg-card p-5 transition-colors duration-[var(--duration-normal)] hover:border-info/50"
              >
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {t('上一个知识点')}
                </span>
                <p className="mt-2 font-serif font-semibold group-hover:text-info transition-colors duration-[var(--duration-fast)]">
                  <InlineMathText escape text={prev.title} />
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link
                to={`/topics/${next.id}`}
                className="group border border-border bg-card p-5 text-right transition-colors duration-[var(--duration-normal)] hover:border-info/50"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                  {t('下一个知识点')}
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
                <p className="mt-2 font-serif font-semibold group-hover:text-info transition-colors duration-[var(--duration-fast)]">
                  <InlineMathText escape text={next.title} />
                </p>
              </Link>
            )}
          </nav>
        </article>

        {/* ── 侧栏 ── */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-5">
            {/* 本页目录 */}
            {tocSections.length > 1 && (
              <div className="border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border px-5 py-4">
                  <List className="h-4 w-4 text-info" />
                  <h2 className="font-serif text-base font-semibold">{t('本页目录')}</h2>
                </div>
                <nav className="p-3">
                  <ul className="space-y-0.5">
                    {tocSections.map((s) => (
                      <li key={s.id}>
                        <button
                          onClick={() => goToSection(s.id)}
                          className={`w-full rounded-none px-2.5 py-2 text-left text-xs leading-relaxed transition-colors duration-[var(--duration-fast)] ${
                            activeId === s.id
                              ? 'bg-info/10 text-info font-medium'
                              : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                          }`}
                        >
                          <InlineMathText escape text={s.title} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* 核心要点速览 */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-5 py-4">
                <ListChecks className="h-4 w-4 text-info" />
                <h2 className="font-serif text-base font-semibold">{t('本页要点')}</h2>
              </div>
              <ul className="p-4 space-y-2.5">
                {topic.keyPoints.map((kp, i) => (
                  <li key={i} className="flex gap-2.5 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-mono text-info shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span><InlineMathText escape text={kp} /></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 课程信息 */}
            <div className="border border-border bg-card p-5">
              <h2 className="font-serif text-base font-semibold mb-3">{t('所属课程')}</h2>
              <Link
                to={`/courses/${course.id}`}
                className="group flex items-center justify-between"
              >
                <div>
                  <p className="font-medium group-hover:text-info transition-colors duration-[var(--duration-fast)]">
                    {course.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{course.code}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 group-hover:text-info" />
              </Link>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {course.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 快速入口 */}
            <div className="border border-border bg-card p-5">
              <h2 className="font-serif text-base font-semibold mb-3">{t('继续学习')}</h2>
              <div className="space-y-2.5">
                <Link
                  to={`/tutor?topic=${topic.id}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-info transition-colors duration-[var(--duration-fast)]"
                >
                  <Sparkles className="h-4 w-4" />
                  {t('问 AI 讲解这个知识点')}
                </Link>
                <Link
                  to="/problems"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-info transition-colors duration-[var(--duration-fast)]"
                >
                  <FileQuestion className="h-4 w-4" />
                  {t('例题广场')}
                </Link>
                <Link
                  to="/formulas"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-info transition-colors duration-[var(--duration-fast)]"
                >
                  <ListChecks className="h-4 w-4" />
                  {t('公式速查表')}
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

    </div>
  );
};

export default TopicDetail;

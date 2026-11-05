/** 错题本：按课程分集合；AI 练习一键收录 + 手动录入（文字/代码/图片） */
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { BookX, Check, ImagePlus, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FadeIn } from '@/components/MotionPrimitives';
import MathText from '@/components/MathText';
import { useAuth } from '@/lib/AuthContext';
import { useSubject } from '@/lib/SubjectContext';
import { useCourses } from '@/i18n/data';
import { useLocale, useT } from '@/i18n/LocaleContext';
import {
  MAX_MISTAKE_IMAGES,
  addMistake,
  countMistakesByCourse,
  deleteMistake,
  readImageFile,
  subscribeMistakes,
  toggleMastered,
  useMistakes,
  type MistakeImage,
} from '@/lib/mistakeBook';

const Mistakes = () => {
  const t = useT();
  const { tpl } = useLocale();
  const { user } = useAuth();
  const { subject } = useSubject();
  const allCourses = useCourses();
  const subjectCourseList = useMemo(
    () => allCourses.filter((c) => (c.subject ?? 'math') === subject),
    [allCourses, subject],
  );
  const userId = user?.id ?? 'guest';
  const [activeCourse, setActiveCourse] = useState('all');
  // 订阅错题数据变更（本地写操作/跨标签页），counts 随数据实时刷新
  const [countsVersion, setCountsVersion] = useState(0);
  useEffect(() => subscribeMistakes(() => setCountsVersion((v) => v + 1)), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- countsVersion 订阅错题数据变更，用来强制重算统计
  const counts = useMemo(() => countMistakesByCourse(userId), [userId, countsVersion]);
  const mistakes = useMistakes(userId, activeCourse);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState(subjectCourseList[0]?.id ?? '');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<MistakeImage[]>([]);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const courseOptions = useMemo(
    () => subjectCourseList.filter((c) => (counts[c.id] ?? 0) > 0 || c.id === courseId),
    [counts, courseId, subjectCourseList],
  );

  // 学科切换时重置课程筛选与表单课程选择，避免残留旧学科的课程 id（首次挂载不重置）
  const lastSubjectRef = useRef(subject);
  useEffect(() => {
    if (subject === lastSubjectRef.current) return;
    lastSubjectRef.current = subject;
    const firstCourseId = subjectCourseList[0]?.id ?? '';
    setActiveCourse(firstCourseId);
    setCourseId(firstCourseId);
  }, [subject, subjectCourseList]);

  const submit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error(t('请填写标题与题目内容'));
      return;
    }
    const res = addMistake({
      userId,
      courseId,
      title: title.trim(),
      content: content.trim(),
      images: images.length > 0 ? images : undefined,
      source: 'manual',
    });
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success(t('已加入错题本'));
    setTitle('');
    setContent('');
    setImages([]);
    setShowForm(false);
  };

  const pickImages = async (files: FileList | null) => {
    if (!files) return;
    const next: MistakeImage[] = [...images];
    for (const f of Array.from(files)) {
      if (next.length >= MAX_MISTAKE_IMAGES) break;
      try {
        next.push({ name: f.name, dataUrl: await readImageFile(f) });
      } catch (err) {
        toast.error(err instanceof Error ? err.message : t('图片读取失败'));
      }
    }
    setImages(next);
  };

  return (
    <div className="container py-10 lg:py-14">
      <FadeIn>
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide text-info">
          <BookX className="h-4 w-4" />
          {t('错题本')}
        </p>
        <h1 className="font-serif text-3xl font-semibold">{t('我的专属错题集')}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t('每门课一个独立错题集：AI 专项练习可一键收录，也可以手动录入文字、代码或题目图片。掌握后可标记，随时回顾。')}
        </p>
      </FadeIn>

      {/* 课程集合切换 */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={activeCourse === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveCourse('all')}
          className={activeCourse === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}
        >
          {tpl('全部 {n}', { n: Object.values(counts).reduce((a, b) => a + b, 0) })}
        </Button>
        {courseOptions.map((c) => (
          <Button
            key={c.id}
            size="sm"
            variant={activeCourse === c.id ? 'default' : 'outline'}
            onClick={() => setActiveCourse(c.id)}
            className={activeCourse === c.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}
          >
            {c.name} {counts[c.id] ?? 0}
          </Button>
        ))}
        <Button size="sm" className="ml-auto gap-1.5 bg-info text-info-foreground hover:bg-info/90" onClick={() => setShowForm((v) => !v)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {t('手动录入错题')}
        </Button>
      </div>

      {/* 录入表单 */}
      {showForm && (
        <FadeIn className="mt-5 border border-border bg-card p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{t('所属课程')}</Label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="h-9 w-full border border-input bg-background px-2 text-sm"
              >
                {subjectCourseList.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{t('标题 *')}</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('如：中值定理证明题·构造函数失误')} />
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              {t('题目与错因（支持 Markdown / LaTeX 公式 / ``` 代码块）*')}
            </Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder={t('题目：设 f 在 [0,1] 连续……\n\n我的错解：……\n\n错因：……\n\n```python\n# 代码版错题可粘贴代码\n```')}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <input
              ref={imgInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                pickImages(e.target.files);
                e.target.value = '';
              }}
            />
            <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => imgInputRef.current?.click()}>
              <ImagePlus className="h-4 w-4" />
              {t('上传题目图片（≤1.5MB/张）')}
            </Button>
            <span className="text-xs text-muted-foreground">{images.length}/{MAX_MISTAKE_IMAGES}</span>
            <Button className="ml-auto gap-1.5" onClick={submit}>{t('保存到错题本')}</Button>
          </div>
          {images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {images.map((im, i) => (
                <span key={i} className="relative">
                  <img src={im.dataUrl} alt={im.name} className="h-14 w-14 border border-border object-cover" />
                  <button
                    onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                    aria-label={tpl('移除图片 {name}', { name: im.name })}
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center bg-destructive text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </FadeIn>
      )}

      {/* 列表 */}
      <div className="mt-8 space-y-5">
        {mistakes.length === 0 ? (
          <div className="border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            {t('这个集合还没有错题。去「学习档案」把 AI 练习题一键收录，或点右上角手动录入。')}
          </div>
        ) : (
          mistakes.map((m) => {
            const course = allCourses.find((c) => c.id === m.courseId);
            return (
              <FadeIn key={m.id}>
                <div className={`border bg-card transition-opacity ${m.mastered ? 'border-success/30 opacity-75' : 'border-border'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
                    <div className="min-w-0">
                      <span className={`mr-2 border px-1.5 py-0.5 text-xs ${m.source === 'ai' ? 'border-info/40 bg-info/10 text-info' : 'border-border bg-secondary text-muted-foreground'}`}>
                        {m.source === 'ai' ? t('AI 练习收录') : t('手动录入')}
                      </span>
                      <span className="text-xs text-muted-foreground">{course?.name ?? m.courseId} · {new Date(m.createdAt).toLocaleDateString('zh-CN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className={m.mastered ? 'gap-1.5 border-success/40 text-success' : 'gap-1.5'}
                        onClick={() => toggleMastered(m.id)}
                      >
                        {m.mastered ? <><Check className="h-3.5 w-3.5" />{t('已掌握')}</> : <><RotateCcw className="h-3.5 w-3.5" />{t('标记掌握')}</>}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-destructive hover:text-destructive"
                        onClick={() => deleteMistake(m.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {t('删除')}
                      </Button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-base font-semibold">{m.title}</h3>
                    <MathText escape content={m.content} className="mt-3 text-sm" />
                    {m.images && m.images.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.images.map((im, i) => (
                          <img key={i} src={im.dataUrl} alt={im.name} className="max-h-52 border border-border" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Mistakes;

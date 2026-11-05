import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookX,
  MessageCircleQuestion,
  BrainCircuit,
  Dumbbell,
  Trash2,
  Sparkles,
  Loader2,
  Lightbulb,
  Eye,
  EyeOff,
  ChevronRight,
  History,
  Clock,
  FileDown,
  Upload,
  Archive,
  CloudUpload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MathText, { InlineMathText } from '@/components/MathText';
import { addMistake } from '@/lib/mistakeBook';
import { toast } from 'sonner';
import { FadeIn } from '@/components/MotionPrimitives';
import CourseIcon from '@/components/CourseIcon';
import { useAuth } from '@/lib/AuthContext';
import { useSubject } from '@/lib/SubjectContext';
import {
  readAiConfig,
  readAiProfiles,
  getActiveProfile,
  readProfileConfig,
  streamChat,
  describeAiError,
  MATH_TUTOR_SYSTEM_PROMPT,
  AI_PROFILE_LABELS,
  type AiProfile,
  type ChatMessage,
} from '@/lib/ai';
import { isEn } from '@/i18n/lang';
import { localizeCourse, useCourses } from '@/i18n/data';
import { useT, useLocale } from '@/i18n/LocaleContext';
import {
  useQaEntries,
  deleteQaEntry,
  clearQaHistory,
  computeQaStats,
} from '@/lib/qaHistory';
import {
  loadSummaries,
  saveSummary,
  deleteSummary,
  clearSummaries,
  subscribeSummaries,
  type StudySummary,
} from '@/lib/summaryArchive';
import {
  exportQaEntriesToDocx,
  exportSummariesToDocx,
  exportPracticeToDocx,
} from '@/lib/wordExport';
import { downloadBlob } from '@/lib/textImage';
import {
  buildArchive,
  encodeArchive,
  decodeArchive,
  importArchive,
  archiveEntryCount,
} from '@/lib/archiveSync';
import {
  loadPat,
  savePat,
  loadGistId,
  saveGistId,
  extractGistId,
  uploadArchive,
  fetchArchive,
} from '@/lib/gistSync';

const formatDate = (ts: number) => {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/** 解析 AI 生成的练习题文本 */
interface GeneratedProblem {
  title: string;
  question: string;
  hint: string;
  solution: string;
}

const parseGeneratedProblems = (raw: string): GeneratedProblem[] => {
  const blocks = raw.split(/^#{2,3}\s*(?:题目|练习)\s*\d*\s*/m).filter((b) => b.trim());
  if (blocks.length === 0) return [];
  return blocks.map((block) => {
    const lines = block.split('\n');
    const title = (lines[0] ?? '').replace(/[#*]/g, '').trim() || '练习题';
    const hintIdx = lines.findIndex((l) => /^[（(]?提示/.test(l.trim()));
    const solIdx = lines.findIndex((l) => /^[（(]?解答/.test(l.trim()));
    const question =
      hintIdx > 0
        ? lines.slice(1, hintIdx).join('\n').trim()
        : lines.slice(1).join('\n').trim();
    const hint =
      hintIdx >= 0
        ? lines
            .slice(hintIdx, solIdx > hintIdx ? solIdx : undefined)
            .join('\n')
            .replace(/^[（(]?提示[：:]?/, '')
            .trim()
        : '';
    const solution =
      solIdx >= 0
        ? lines
            .slice(solIdx)
            .join('\n')
            .replace(/^[（(]?解答[：:]?/, '')
            .trim()
        : '';
    return { title, question, hint, solution };
  });
};

const Study = () => {
  const t = useT();
  const { tpl } = useLocale();
  const { user } = useAuth();
  const { subject } = useSubject();
  const courses = useCourses();
  const subjectCourseList = useMemo(
    () => courses.filter((c) => (c.subject ?? 'math') === subject),
    [courses, subject],
  );
  const courseById = (id: string) => courses.find((c) => c.id === id);
  const freeLabel = t('自由提问');
  const userId = user?.id ?? 'guest';
  const entries = useQaEntries(userId);
  const stats = useMemo(() => computeQaStats(entries), [entries]);

  // 记录筛选
  const [filter, setFilter] = useState<string>('all');
  const filteredEntries =
    filter === 'all'
      ? entries
      : entries.filter((e) => (e.courseId ?? 'free') === filter);

  // AI 总结
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  // 总结所用接口存档（选择模型）
  const [selectedProfile, setSelectedProfile] = useState<number>(() => {
    const ps = readAiProfiles();
    const isSet = (p: AiProfile | null) =>
      Boolean(p && p.baseUrl && p.apiKey && p.model);
    const active = getActiveProfile();
    if (isSet(ps[active])) return active;
    const first = ps.findIndex(isSet);
    return first >= 0 ? first : 0;
  });
  // 历史总结留存
  const [archive, setArchive] = useState<StudySummary[]>([]);
  useEffect(() => {
    const reload = () => setArchive(loadSummaries(userId));
    reload();
    return subscribeSummaries(reload);
  }, [userId]);

  // 跨设备档案同步：导出为文件、在另一台设备粘贴导入
  const [importOpen, setImportOpen] = useState(false);
  const [importCode, setImportCode] = useState('');
  const [importMsg, setImportMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // 云端同步（GitHub Gist）：上传得同步 ID，任何设备凭 ID 拉取最新档案
  const [cloudOpen, setCloudOpen] = useState(false);
  const [cloudPat, setCloudPat] = useState(loadPat());
  const [cloudGistId, setCloudGistId] = useState(loadGistId());
  const [cloudPullId, setCloudPullId] = useState('');
  const [cloudBusy, setCloudBusy] = useState<'upload' | 'pull' | null>(null);
  const [cloudMsg, setCloudMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  // 已配置的存档列表（供下拉选择模型）
  const isSet = (p: AiProfile | null) =>
    Boolean(p && p.baseUrl && p.apiKey && p.model);
  const configuredProfiles = readAiProfiles()
    .map((p, i) => ({ index: i, profile: p }))
    .filter((x) => isSet(x.profile));
  const profileLabel = (p: AiProfile | null, i: number) =>
    p?.name
      ? tpl('{name}（{model}）', { name: p.name, model: p.model })
      : tpl('{label} · {model}', {
          label: AI_PROFILE_LABELS[i],
          model: p?.model ?? t('未配置'),
        });

  // ══ 导出 Word（可编辑：正文为真文本，公式为 Word 原生公式对象）══
  const [wordExporting, setWordExporting] = useState(false);
  const exportWord = async () => {
    if (wordExporting || filteredEntries.length === 0) return;
    setWordExporting(true);
    try {
      const blob = await exportQaEntriesToDocx(filteredEntries);
      downloadBlob(blob, `Principia-答疑记录-${formatDate(Date.now())}.docx`);
      toast.success(
        tpl('已导出 {n} 条记录为 Word（公式可编辑）', { n: filteredEntries.length }),
      );
    } catch (err) {
      toast.error(
        tpl('导出失败：{msg}', { msg: err instanceof Error ? err.message : String(err) }),
      );
    } finally {
      setWordExporting(false);
    }
  };

  // 导出 Word 对话框
  const [exportOpen, setExportOpen] = useState(false);
  const [exportSel, setExportSel] = useState<Set<string>>(new Set());
  const [exportMode, setExportMode] = useState<'merge' | 'separate'>('merge');
  const [exporting, setExporting] = useState(false);
  const exportChosen = archive.filter((s) => exportSel.has(s.id));

  // 练习题生成
  const [practiceCourseInput, setPracticeCourse] = useState(
    () => subjectCourseList[0]?.id ?? 'calculus',
  );
  const [practiceCount, setPracticeCount] = useState('3');
  const [practiceLevel, setPracticeLevel] = useState('中等');
  const [practiceRaw, setPracticeRaw] = useState('');
  const [practiceLoading, setPracticeLoading] = useState(false);
  const [practiceError, setPracticeError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  // 学科切换后若原先选中的课程已不属于当前学科，回退到该学科第一门课程。
  // 用派生值而非 effect + setState，避免切换学科时多一次级联渲染。
  const practiceCourse = useMemo(
    () =>
      subjectCourseList.some((c) => c.id === practiceCourseInput)
        ? practiceCourseInput
        : (subjectCourseList[0]?.id ?? 'calculus'),
    [subjectCourseList, practiceCourseInput],
  );

  const practiceProblems = useMemo(
    () => parseGeneratedProblems(practiceRaw),
    [practiceRaw],
  );

  const runStream = async (
    messages: ChatMessage[],
    onChunk: (acc: string) => void,
    profileIndex?: number,
  ): Promise<string> => {
    const cfg =
      profileIndex !== undefined
        ? readProfileConfig(profileIndex)
        : readAiConfig();
    if (!cfg) {
      if (profileIndex !== undefined) {
        throw new Error(
          tpl('「{label}」尚未配置 API Key，请先在 AI 答疑页设置该存档。', {
            label: AI_PROFILE_LABELS[profileIndex],
          }),
        );
      }
      throw new Error(t('尚未配置 API Key，请先在 AI 答疑页完成密钥设置。'));
    }
    let acc = '';
    for await (const chunk of streamChat(cfg, messages)) {
      acc += chunk;
      onChunk(acc);
    }
    return acc;
  };

  const generateSummary = async () => {
    setSummaryLoading(true);
    setSummaryError(null);
    setSummary('');
    try {
      const recent = entries.slice(0, 50);
      const questionList = recent
        .map((e, i) => `${i + 1}. [${e.courseId ? courseById(e.courseId)?.name ?? e.courseId : freeLabel}] ${e.question}`)
        .join('\n');
      // 临时确定配置以记录所用模型
      const cfg = readProfileConfig(selectedProfile) ?? readAiConfig();
      if (!cfg) {
        throw new Error(
          tpl('「{label}」尚未配置 API Key，请先在 AI 答疑页设置该存档。', {
            label: AI_PROFILE_LABELS[selectedProfile],
          }),
        );
      }
      const summaryUser = isEn()
        ? `Here are the ${recent.length} questions I have asked the AI tutor on Principia:\n\n${questionList}\n\nAct as my study advisor and produce a summary including:\n1. **Question distribution**: summarize by course/topic what I mainly ask about;\n2. **Weak areas**: infer from the questions the topics I may not have mastered, with reasons;\n3. **Study suggestions**: give a concrete review roadmap (what to review first, then what to practice);\n4. **3 topics worth reviewing**: each with a one-sentence core reminder.`
        : `以下是我在 Principia 上向 AI 助教提出过的 ${recent.length} 个问题：\n\n${questionList}\n\n请作为我的学习顾问输出一份总结，包含：\n1. **问题分布**：按课程/知识点归纳我主要在问什么；\n2. **薄弱环节**：从问题反推我可能掌握不牢的知识点，说明理由；\n3. **学习建议**：给出一个具体的复习路线（先补什么、再练什么）；\n4. **值得复习的 3 个知识点**：各附一句核心提醒。`;
      const final = await runStream(
        [
          {
            role: 'system',
            content: MATH_TUTOR_SYSTEM_PROMPT(),
          },
          {
            role: 'user',
            content: summaryUser,
          },
        ],
        (acc) => setSummary(acc),
        selectedProfile,
      );
      // 留存：写入不同时间段的总结档案
      const record: StudySummary = {
        id: `sum-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        userId,
        createdAt: Date.now(),
        model: cfg.model,
        profileIndex: selectedProfile,
        questionCount: recent.length,
        content: final,
      };
      saveSummary(record);
      setArchive(loadSummaries(userId));
      setSummary(''); // 已存入档案，避免重复展示
    } catch (err) {
      setSummaryError(describeAiError(err));
    } finally {
      setSummaryLoading(false);
    }
  };

  const generatePractice = async () => {
    setPracticeLoading(true);
    setPracticeError(null);
    setPracticeRaw('');
    setRevealed({});
    try {
      const course = localizeCourse(courseById(practiceCourse)!);
      // 结合历史问题，让练习更有针对性
      const relatedQuestions = entries
        .filter((e) => e.courseId === practiceCourse)
        .slice(0, 10)
        .map((e) => e.question);
      const levelEn = practiceLevel === '基础' ? 'basic' : practiceLevel === '高阶' ? 'advanced' : 'intermediate';
      const relatedHintZh =
        relatedQuestions.length > 0
          ? `\n该学生历史上在该课程问过这些问题，请围绕这些薄弱点命题：\n${relatedQuestions.map((q) => `- ${q}`).join('\n')}`
          : '';
      const relatedHintEn =
        relatedQuestions.length > 0
          ? `\nThis student has previously asked these questions in this course; please design problems around these weak points:\n${relatedQuestions.map((q) => `- ${q}`).join('\n')}`
          : '';
      const practiceUser = isEn()
        ? `Please generate ${practiceCount} practice problems at ${levelEn} difficulty for "${course?.name ?? practiceCourse}".${relatedHintEn}\n\nOutput format (strictly follow): each problem starts with "### Problem N", followed by the statement (LaTeX with $ or $$), then a line "Hint:" with one key hint, then a line "Solution:" with the full step-by-step solution. Do not add anything else between problems.`
        : `请为我生成 ${practiceCount} 道「${course?.name ?? practiceCourse}」的${practiceLevel}难度练习题。${relatedHintZh}\n\n输出格式要求（严格遵守）：\n每道题以「### 题目 N」开头，随后是题干（LaTeX 公式用 $ 或 $$ 包裹），然后单独一行「提示：」给一条关键提示，再单独一行「解答：」给完整分步解答。题目之间不要加其他内容。`;
      await runStream(
        [
          { role: 'system', content: MATH_TUTOR_SYSTEM_PROMPT() },
          {
            role: 'user',
            content: practiceUser,
          },
        ],
        (acc) => setPracticeRaw(acc),
      );
    } catch (err) {
      setPracticeError(describeAiError(err));
    } finally {
      setPracticeLoading(false);
    }
  };

  // 打开导出对话框：默认合并、清空选择
  const openExportDialog = () => {
    setExportSel(new Set());
    setExportMode('merge');
    setExportOpen(true);
  };

  /**
   * 导出全部学习档案（总结 + 答疑 + 错题）为一段同步码文件。
   * 本站没有服务器，档案只在本机浏览器里，换设备必须靠这份文件搬过去。
   */
  const handleExportArchive = () => {
    const payload = buildArchive(userId, { username: user?.username, phone: user?.phone });
    const total = archiveEntryCount(payload);
    if (total === 0) {
      toast.error(t('当前账号还没有可导出的档案'));
      return;
    }
    const blob = new Blob([encodeArchive(payload)], { type: 'text/plain;charset=utf-8' });
    const stamp = new Date().toISOString().slice(0, 10);
    downloadBlob(blob, `Principia-学习档案-${stamp}.txt`);
    toast.success(
      tpl('已导出 {n} 条档案（总结 {a} · 答疑 {b} · 错题 {c}），在另一台设备点「导入档案」即可恢复', {
        n: total,
        a: payload.summaries.length,
        b: payload.qa.length,
        c: payload.mistakes.length,
      }),
    );
  };

  /** 粘贴同步码导入；按 id 去重，可安全重复导入 */
  const handleImportArchive = () => {
    const decoded = decodeArchive(importCode);
    if (!decoded.ok) {
      setImportMsg({ type: 'err', text: decoded.error });
      return;
    }
    const res = importArchive(decoded.payload, userId);
    // 总结列表是手动 state，导入后要显式刷新；答疑与错题有订阅，会自动更新
    setArchive(loadSummaries(userId));
    const parts: string[] = [];
    if (res.summaries > 0) parts.push(tpl('总结 {n}', { n: res.summaries }));
    if (res.qa > 0) parts.push(tpl('答疑 {n}', { n: res.qa }));
    if (res.mistakes > 0) parts.push(tpl('错题 {n}', { n: res.mistakes }));
    if (parts.length === 0) {
      setImportMsg({ type: 'ok', text: t('导入完成：这些记录本机都已经有了，没有新增') });
    } else {
      setImportMsg({ type: 'ok', text: tpl('导入完成，新增 {list}', { list: parts.join('、') }) });
    }
    if (res.error) setImportMsg({ type: 'err', text: res.error });
    setImportCode('');
  };

  /** 云端上传：把当前账号档案推到 GitHub Gist，得到/更新同步 ID */
  const handleCloudUpload = async () => {
    const pat = cloudPat.trim();
    if (!pat) {
      setCloudMsg({ type: 'err', text: t('请先粘贴 GitHub PAT（上方有生成指引）') });
      return;
    }
    setCloudBusy('upload');
    setCloudMsg(null);
    try {
      const payload = buildArchive(userId, { username: user?.username, phone: user?.phone });
      const total = archiveEntryCount(payload);
      if (total === 0) {
        setCloudMsg({ type: 'err', text: t('当前账号还没有可上传的档案') });
        return;
      }
      const id = await uploadArchive(payload, pat, cloudGistId.trim());
      savePat(pat);
      saveGistId(id);
      setCloudGistId(id);
      setCloudMsg({
        type: 'ok',
        text: tpl('上传成功（{n} 条）。同步 ID 已生成——在另一台设备把它粘进「从云端拉取」即可', { n: total }),
      });
    } catch (err) {
      setCloudMsg({ type: 'err', text: err instanceof Error ? err.message : t('上传失败，请稍后再试') });
    } finally {
      setCloudBusy(null);
    }
  };

  /** 云端拉取：凭同步 ID 取最新档案并合并导入（无需 PAT） */
  const handleCloudPull = async () => {
    const id = extractGistId(cloudPullId);
    if (!id) {
      setCloudMsg({ type: 'err', text: t('请先粘贴另一台设备生成的同步 ID（或 Gist 链接）') });
      return;
    }
    setCloudBusy('pull');
    setCloudMsg(null);
    try {
      const payload = await fetchArchive(id);
      const res = importArchive(payload, userId);
      setArchive(loadSummaries(userId));
      const parts: string[] = [];
      if (res.summaries > 0) parts.push(tpl('总结 {n}', { n: res.summaries }));
      if (res.qa > 0) parts.push(tpl('答疑 {n}', { n: res.qa }));
      if (res.mistakes > 0) parts.push(tpl('错题 {n}', { n: res.mistakes }));
      setCloudMsg({
        type: 'ok',
        text: parts.length === 0
          ? t('拉取完成：云端记录本机都已经有了，没有新增')
          : tpl('拉取完成，新增 {list}', { list: parts.join('、') }),
      });
      if (res.error) setCloudMsg({ type: 'err', text: res.error });
      saveGistId(id);
      setCloudGistId(id);
    } catch (err) {
      setCloudMsg({ type: 'err', text: err instanceof Error ? err.message : t('拉取失败，请稍后再试') });
    } finally {
      setCloudBusy(null);
    }
  };

  const toggleExport = (id: string) =>
    setExportSel((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // 确认导出：合并=1 个 Word；分开=每个各一个 Word
  const doExport = async () => {
    const chosen = exportChosen;
    if (chosen.length === 0) {
      toast.error(t('请先勾选要导出的总结'));
      return;
    }
    setExporting(true);
    try {
      if (exportMode === 'merge') {
        const blob = await exportSummariesToDocx(chosen);
        downloadBlob(blob, `Principia-学习总结-合并${chosen.length}份.docx`);
        toast.success(tpl('已导出 1 个合并 Word（含 {n} 份总结）', { n: chosen.length }));
      } else {
        for (let i = 0; i < chosen.length; i++) {
          const blob = await exportSummariesToDocx([chosen[i]]);
          downloadBlob(blob, `Principia-学习总结-${formatDate(chosen[i].createdAt)}.docx`);
          // 间隔一下，避免浏览器拦截连续下载
          if (i < chosen.length - 1) await new Promise((r) => setTimeout(r, 400));
        }
        toast.success(tpl('已导出 {n} 个 Word', { n: chosen.length }));
      }
      setExportOpen(false);
    } catch (err) {
      toast.error(describeAiError(err));
    } finally {
      setExporting(false);
    }
  };

  // 专项练习 → Word 导出（真文本 + 可编辑公式）
  const [practiceExporting, setPracticeExporting] = useState(false);
  const exportPracticeWord = async () => {
    if (practiceProblems.length === 0 || practiceExporting) return;
    const course = courseById(practiceCourse);
    setPracticeExporting(true);
    try {
      const blob = await exportPracticeToDocx({
        courseName: course?.name ?? practiceCourse,
        level: practiceLevel,
        problems: practiceProblems,
      });
      downloadBlob(
        blob,
        `Principia-专项练习-${course?.name ?? practiceCourse}-${formatDate(Date.now())}.docx`,
      );
      toast.success(t('已导出 Word'));
    } catch (err) {
      toast.error(describeAiError(err));
    } finally {
      setPracticeExporting(false);
    }
  };

  const courseOfEntry = (courseId?: string) =>
    courseId ? courseById(courseId) : undefined;

  return (
    <>
      <div className="container py-10 lg:py-14">
      {/* 页头 */}
      <FadeIn>
        <p className="text-sm font-semibold text-info tracking-wide mb-2">STUDY ARCHIVE</p>
        <h1 className="font-serif text-3xl font-semibold">{t('学习档案')}</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl leading-relaxed">
          {user ? (
            <>
              {t('当前账户：')}<span className="text-foreground font-medium">{user.name}</span>
              {user.email ? tpl('（{email}）', { email: user.email }) : ''}
              {t('。所有 AI 答疑记录按账户沉淀于此。')}
            </>
          ) : (
            <>
              {t('当前为')}<span className="text-foreground font-medium">{t('游客模式')}</span>
              {t('，记录保存在本机浏览器。')}
              <Link to="/login" className="text-info hover:underline ml-1">{t('登录后')}</Link>
              {t('按账户隔离保存。')}
            </>
          )}
        </p>
      </FadeIn>

      {/* 统计卡片 */}
      <FadeIn delay={0.05}>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-border bg-card p-5">
            <p className="font-serif text-3xl font-semibold text-info">{stats.total}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t('累计提问')}</p>
          </div>
          <div className="border border-border bg-card p-5">
            <p className="font-serif text-3xl font-semibold text-info">{stats.last7Days}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t('近 7 天提问')}</p>
          </div>
          <div className="border border-border bg-card p-5">
            <p className="font-serif text-3xl font-semibold text-info">
              {stats.byCourse.filter((c) => c.courseId !== 'free').length}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{t('涉及课程')}</p>
          </div>
          <div className="border border-border bg-card p-5">
            <p className="font-serif text-3xl font-semibold text-info">
              {stats.latestTs ? formatDate(stats.latestTs).slice(5, 10) : '—'}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{t('最近活跃')}</p>
          </div>
        </div>
      </FadeIn>

      {/* 三个功能页签 */}
      <FadeIn delay={0.1}>
        <Tabs defaultValue="records" className="mt-10">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="records" className="gap-1.5">
              <MessageCircleQuestion className="h-4 w-4" />
              {t('答疑记录')}
            </TabsTrigger>
            <TabsTrigger value="summary" className="gap-1.5">
              <BrainCircuit className="h-4 w-4" />
              {t('AI 学习总结')}
            </TabsTrigger>
            <TabsTrigger value="practice" className="gap-1.5">
              <Dumbbell className="h-4 w-4" />
              {t('专项练习生成')}
            </TabsTrigger>
          </TabsList>

          {/* ── 答疑记录 ── */}
          <TabsContent value="records" className="mt-6">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-sm text-muted-foreground">{t('筛选：')}</span>
              <button
                onClick={() => setFilter('all')}
                className={`text-xs px-2.5 py-1.5 border transition-colors duration-[var(--duration-fast)] ${
                  filter === 'all'
                    ? 'border-info bg-info/10 text-info'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {tpl('全部（{n}）', { n: entries.length })}
              </button>
              {stats.byCourse.map((c) => {
                const course = courseOfEntry(c.courseId === 'free' ? undefined : c.courseId);
                return (
                  <button
                    key={c.courseId}
                    onClick={() => setFilter(c.courseId)}
                    className={`text-xs px-2.5 py-1.5 border transition-colors duration-[var(--duration-fast)] ${
                      filter === c.courseId
                        ? 'border-info bg-info/10 text-info'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tpl('{name}（{count}）', { name: course?.name ?? freeLabel, count: c.count })}
                  </button>
                );
              })}
              {entries.length > 0 && (
                <div className="ml-auto flex items-center gap-3">
                  <button
                    onClick={exportWord}
                    disabled={wordExporting || filteredEntries.length === 0}
                    className="flex items-center gap-1.5 text-xs text-info hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
                    title={
                      filteredEntries.length === 0
                        ? t('当前筛选下没有记录')
                        : t('导出为可编辑的 Word 文档（公式可在 Word 中编辑）')
                    }
                  >
                    {wordExporting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <FileDown className="h-3.5 w-3.5" />
                    )}
                    {wordExporting
                      ? t('正在导出…')
                      : tpl('导出 Word（{n} 条）', { n: filteredEntries.length })}
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(t('确定清空全部答疑记录吗？此操作不可恢复。'))) {
                        clearQaHistory(userId);
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors duration-[var(--duration-fast)]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {t('清空记录')}
                  </button>
                </div>
              )}
            </div>

            {filteredEntries.length === 0 ? (
              <div className="border border-border bg-card py-16 text-center">
                <MessageCircleQuestion className="mx-auto h-10 w-10 text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground">{t('还没有答疑记录')}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('去')}
                  <Link to="/tutor" className="text-info hover:underline mx-1">{t('AI 答疑')}</Link>
                  {t('问第一个问题吧，记录会自动出现在这里。')}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEntries.map((e) => {
                  const course = courseOfEntry(e.courseId);
                  return (
                    <div key={e.id} className="border border-border bg-card">
                      <div className="flex items-center gap-2 border-b border-border px-5 py-3 text-xs text-muted-foreground">
                        {course && <CourseIcon name={course.icon} className="h-3.5 w-3.5 text-info" />}
                        <span className="font-medium text-info">{course?.name ?? freeLabel}</span>
                        {e.topicTitle && (
                          <>
                            <span className="text-border">/</span>
                            <Link to={`/topics/${e.topicId}`} className="hover:text-foreground">
                              {e.topicTitle}
                            </Link>
                          </>
                        )}
                        <span className="ml-auto">{formatDate(e.ts)}</span>
                        {e.usage && (
                          <span
                            className="font-mono text-[10px] bg-secondary px-1.5 py-0.5"
                            title={t('本次回答 token 消耗：↑输入 ↓输出')}
                          >
                            {tpl('↑{prompt} ↓{completion} · 共 {total} tokens', {
                              prompt: e.usage.prompt,
                              completion: e.usage.completion,
                              total: e.usage.total,
                            })}
                          </span>
                        )}
                        <button
                          onClick={() => deleteQaEntry(e.id)}
                          className="hover:text-destructive transition-colors duration-[var(--duration-fast)]"
                          aria-label={t('删除这条记录')}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="p-5 space-y-4">
                        <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap"><InlineMathText escape text={e.question} /></p>
                        {/* 思考过程记录（可选） */}
                        {e.thinking && (
                          <details className="group">
                            <summary className="flex items-center gap-1.5 text-xs text-warning cursor-pointer select-none">
                              <BrainCircuit className="h-3.5 w-3.5" />
                              {t('查看思考过程')}
                            </summary>
                            <div className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                              {e.thinking}
                            </div>
                          </details>
                        )}
                        <details className="group">
                          <summary className="flex items-center gap-1.5 text-xs text-info cursor-pointer select-none">
                            <Eye className="h-3.5 w-3.5" />
                            {t('查看助教回答')}
                          </summary>
                          <div className="mt-3 border-t border-border pt-3">
                            <MathText escape content={e.answer} className="text-sm" />
                          </div>
                        </details>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ── AI 学习总结 ── */}
          <TabsContent value="summary" className="mt-6 space-y-6">
            <div className="border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl font-semibold">{t('AI 学习总结')}</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {t('把全部答疑记录交给 AI 分析：归纳问题分布、反推薄弱环节、给出复习路线。记录越多，总结越准确。每次总结都会按时间留存，方便回看进步轨迹。')}
                  </p>
                </div>
                <Button
                  onClick={generateSummary}
                  disabled={summaryLoading || entries.length === 0 || configuredProfiles.length === 0}
                  className="bg-info text-info-foreground hover:bg-info/90 gap-1.5"
                >
                  {summaryLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {summaryLoading ? t('生成中…') : t('生成学习总结')}
                </Button>
              </div>

              {/* 选择生成所用的接口存档 / 模型 */}
              <div className="mt-5 max-w-md space-y-2">
                <label className="text-xs text-muted-foreground">{t('生成所用模型（选择 API 存档）')}</label>
                <Select
                  value={String(selectedProfile)}
                  onValueChange={(v) => setSelectedProfile(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {configuredProfiles.map(({ index, profile }) => (
                      <SelectItem key={index} value={String(index)}>
                        {profileLabel(profile, index)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {configuredProfiles.length === 0 && (
                <p className="mt-4 text-sm text-muted-foreground">
                  {t('还没有可用的 API 存档——请先到')}
                  <Link to="/tutor" className="text-info hover:underline mx-1">{t('AI 答疑')}</Link>
                  {t('配置接口与模型，再回来生成总结。')}
                </p>
              )}

              {entries.length === 0 && configuredProfiles.length > 0 && (
                <p className="mt-6 text-sm text-muted-foreground">
                  {t('暂无记录可总结——先去')}
                  <Link to="/tutor" className="text-info hover:underline mx-1">{t('AI 答疑')}</Link>
                  {t('积累几个问题吧。')}
                </p>
              )}

              {summaryError && (
                <div className="mt-6 border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {summaryError}
                </div>
              )}

              {summary && (
                <div className="mt-6 border-t border-border pt-6">
                  <MathText escape content={summary} className="text-sm" />
                  {summaryLoading && (
                    <span className="mt-2 inline-block text-xs text-info animate-pulse">{t('正在输入…')}</span>
                  )}
                </div>
              )}
            </div>

            {/* 历史总结留存 */}
            <div className="border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-info" />
                  <h3 className="font-serif text-lg font-semibold">{t('历史总结留存')}</h3>
                  <span className="text-xs text-muted-foreground">
                    {tpl('（共 {n} 份 · 按时间倒序）', { n: archive.length })}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {/* 跨设备搬运：本站没有服务器，档案只在本机，靠这几个入口搬 */}
                  <Button
                    onClick={() => {
                      setCloudMsg(null);
                      setCloudOpen(true);
                    }}
                    size="sm"
                    className="gap-1.5"
                    title={t('上传到云端生成同步 ID；任何设备凭 ID 拉取最新档案')}
                  >
                    <CloudUpload className="h-4 w-4" />
                    {t('云端同步')}
                  </Button>
                  <Button
                    onClick={handleExportArchive}
                    size="sm"
                    variant="outline"
                    className="gap-1.5"
                    title={t('把学习总结、答疑历史、错题本打包成一个文件，带到另一台设备导入')}
                  >
                    <Archive className="h-4 w-4" />
                    {t('导出全部档案')}
                  </Button>
                  <Button
                    onClick={() => {
                      setImportMsg(null);
                      setImportOpen(true);
                    }}
                    size="sm"
                    variant="outline"
                    className="gap-1.5"
                    title={t('粘贴另一台设备导出的档案内容，恢复到这里')}
                  >
                    <Upload className="h-4 w-4" />
                    {t('导入档案')}
                  </Button>
                  {archive.length > 0 && (
                    <Button
                      onClick={openExportDialog}
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                      title={t('把学习总结导出为可编辑的 Word 文档')}
                    >
                      <FileDown className="h-4 w-4" />
                      {t('导出 Word')}
                    </Button>
                  )}
                  {archive.length > 0 && (
                    <button
                      onClick={() => {
                        if (window.confirm(t('确定清空全部历史总结吗？此操作不可恢复。'))) {
                          clearSummaries(userId);
                          setArchive(loadSummaries(userId));
                          // 同步重置导出勾选，避免残留已删除总结的 id 导致计数不符
                          setExportSel(new Set());
                        }
                      }}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors duration-[var(--duration-fast)]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {t('清空全部')}
                    </button>
                  )}
                </div>
              </div>

              {archive.length === 0 ? (
                <p className="mt-5 text-sm text-muted-foreground">
                  {t('还没有留存任何总结。生成一份后，它会保存在这里，下次打开仍能查看。')}
                </p>
              ) : (
                <div className="mt-5 space-y-4">
                  {archive.map((s) => (
                    <div key={s.id} className="border border-border bg-background">
                      <div className="flex items-center gap-2 border-b border-border px-5 py-3 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 text-info" />
                        <span className="font-medium text-foreground">{formatDate(s.createdAt)}</span>
                        <span className="px-1.5 py-0.5 border border-border rounded text-[11px]">
                          {profileLabel(configuredProfiles.find((x) => x.index === s.profileIndex)?.profile ?? null, s.profileIndex)}
                        </span>
                        <span>{tpl('模型 {model}', { model: s.model })}</span>
                        <span>{tpl('· 覆盖 {n} 个问题', { n: s.questionCount })}</span>
                        <button
                          onClick={() => {
                            deleteSummary(s.id);
                            setArchive(loadSummaries(userId));
                          }}
                          className="ml-auto hover:text-destructive transition-colors duration-[var(--duration-fast)]"
                          aria-label={t('删除这份总结')}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="p-5">
                        <MathText escape content={s.content} className="text-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── 专项练习生成 ── */}
          <TabsContent value="practice" className="mt-6">
            <div className="border border-border bg-card p-6">
              <h2 className="font-serif text-xl font-semibold">{t('AI 专项练习生成')}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-xl">
                {t('选择课程与难度，AI 结合你的答疑历史生成针对性练习题——先看提示独立思考，再对照完整解答。')}
              </p>

              <div className="mt-5 grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">{t('课程')}</label>
                  <Select value={practiceCourse} onValueChange={setPracticeCourse}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectCourseList.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">{t('题目数量')}</label>
                  <Select value={practiceCount} onValueChange={setPracticeCount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">{tpl('{n} 道', { n: 3 })}</SelectItem>
                      <SelectItem value="5">{tpl('{n} 道', { n: 5 })}</SelectItem>
                      <SelectItem value="8">{tpl('{n} 道', { n: 8 })}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">{t('难度')}</label>
                  <Select value={practiceLevel} onValueChange={setPracticeLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="基础">{t('基础（概念直接应用）')}</SelectItem>
                      <SelectItem value="中等">{t('中等（综合运用）')}</SelectItem>
                      <SelectItem value="提高">{t('提高（竞赛/考研风格）')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  onClick={generatePractice}
                  disabled={practiceLoading}
                  className="bg-info text-info-foreground hover:bg-info/90 gap-1.5"
                >
                  {practiceLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Dumbbell className="h-4 w-4" />
                  )}
                  {practiceLoading ? t('生成中…') : t('生成练习题')}
                </Button>
                <Button
                  variant="outline"
                  onClick={exportPracticeWord}
                  disabled={practiceProblems.length === 0 || practiceExporting}
                  className="gap-1.5"
                  title={t('把练习题（含提示与解答）导出为可编辑的 Word 文档')}
                >
                  {practiceExporting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileDown className="h-4 w-4" />
                  )}
                  {practiceExporting ? t('导出中…') : t('导出 Word')}
                </Button>
              </div>

              {practiceError && (
                <div className="mt-5 border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {practiceError}
                </div>
              )}

              {practiceProblems.length > 0 && (
                <div className="mt-8 space-y-5">
                  {practiceProblems.map((p, i) => (
                    <div key={i} className="border border-border bg-background">
                      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                        <span className="flex h-6 w-6 items-center justify-center bg-info/10 text-info font-mono text-xs font-semibold">
                          {i + 1}
                        </span>
                        <h3 className="font-serif text-base font-semibold"><InlineMathText escape text={p.title} /></h3>
                        <Button
                          size="sm"
                          variant="outline"
                          className="ml-auto gap-1.5 text-xs"
                          onClick={() => {
                            const parts = [p.question];
                            if (p.hint) parts.push(t('【提示】') + p.hint);
                            if (p.solution) parts.push(t('【解答】') + p.solution);
                            const res = addMistake({
                              userId,
                              courseId: practiceCourse,
                              title: p.title,
                              content: parts.filter(Boolean).join('\n\n'),
                              source: 'ai',
                            });
                            if (res.ok) toast.success(t('已加入错题本'));
                            else toast.error(res.error);
                          }}
                        >
                          <BookX className="h-3.5 w-3.5" />
                          {t('加入错题本')}
                        </Button>
                      </div>
                      <div className="p-5 space-y-4">
                        <MathText escape content={p.question} className="text-sm" />
                        {p.hint && (
                          <div className="border border-warning/30 bg-warning/5 px-4 py-3">
                            <p className="flex items-center gap-1.5 text-xs font-medium text-warning mb-1.5">
                              <Lightbulb className="h-3.5 w-3.5" />
                              {t('提示')}
                            </p>
                            <MathText escape content={p.hint} className="text-sm" />
                          </div>
                        )}
                        {p.solution && (
                          <div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setRevealed((r) => ({ ...r, [i]: !r[i] }))
                              }
                              className="gap-1.5"
                            >
                              {revealed[i] ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                              {revealed[i] ? t('隐藏解答') : t('显示解答')}
                            </Button>
                            {revealed[i] && (
                              <div className="mt-3 border-t border-border pt-3">
                                <MathText escape content={p.solution} className="text-sm" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {practiceRaw && practiceProblems.length === 0 && !practiceLoading && (
                <div className="mt-8 border border-border bg-background p-5">
                  <p className="text-xs text-muted-foreground mb-3">{t('AI 输出（未按标准格式解析，原文展示）：')}</p>
                  <MathText escape content={practiceRaw} className="text-sm" />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>

      {/* 底部引导 */}
      <FadeIn delay={0.15}>
        <div className="mt-10 border border-border bg-card px-6 py-5 flex flex-wrap items-center gap-4">
          <p className="text-sm text-muted-foreground flex-1 min-w-[200px]">
            {t('答疑记录来自 AI 答疑页的每一次提问；换个角度复习，可以配合')}
            <Link to="/knowledge" className="text-info hover:underline mx-1">{t('知识点检索')}</Link>
            {t('定位薄弱章节。')}
          </p>
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link to="/knowledge">
              {t('去检索知识点')}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </FadeIn>
      </div>

      {/* ── 云端同步对话框（GitHub Gist）── */}
      <Dialog open={cloudOpen} onOpenChange={setCloudOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CloudUpload className="h-5 w-5 text-info" />
              {t('云端档案同步')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t('把档案上传到你自己的 GitHub 私密 Gist：上传后得到一个「同步 ID」，数据更新后可反复上传（同步 ID 不变）；在另一台设备粘贴这个 ID 即可拉取最新档案并合并导入。同步 ID 只要有它就能读档，请像密码一样保管。')}
            </p>

            {/* 第一步：PAT 配置（只需一次，存在本机） */}
            <div className="border border-border bg-background p-4 space-y-2">
              <p className="text-sm font-medium">{tpl('第一步 · 配置 GitHub PAT（只需一次，当前{state}）', { state: cloudPat ? t('：已配置') : t('：未配置') })}</p>
              <ol className="list-decimal list-inside text-xs text-muted-foreground space-y-1">
                <li>
                  {t('打开 ')}
                  <a href="https://github.com/settings/tokens/new?scopes=gist&description=Principia%20Archive%20Sync" target="_blank" rel="noreferrer" className="text-info hover:underline">
                    GitHub 生成 PAT 页面
                  </a>
                  {t('（需已登录 GitHub）')}
                </li>
                <li>{t('过期时间随便选，勾选 gist 权限，点底部 Generate token')}</li>
                <li>{t('复制生成的 token（ghp_ 开头），粘贴到下面保存。token 只存在本机浏览器')}</li>
              </ol>
              <div className="flex gap-2 pt-1">
                <input
                  type="password"
                  value={cloudPat}
                  onChange={(e) => setCloudPat(e.target.value)}
                  placeholder="ghp_…"
                  className="flex-1 h-9 px-3 text-xs border border-border bg-background outline-none focus:border-info"
                  autoComplete="off"
                />
                <Button variant="outline" size="sm" onClick={() => { savePat(cloudPat); toast.success(t('PAT 已保存到本机')); }}>
                  {t('保存')}
                </Button>
              </div>
            </div>

            {/* 第二步：上传 → 得到同步 ID */}
            <div className="border border-border bg-background p-4 space-y-2">
              <p className="text-sm font-medium">{t('第二步 · 上传档案，得到同步 ID')}</p>
              <Button onClick={handleCloudUpload} size="sm" disabled={cloudBusy !== null} className="gap-1.5">
                {cloudBusy === 'upload' ? <Loader2 className="h-4 w-4 animate-spin" /> : <CloudUpload className="h-4 w-4" />}
                {cloudGistId ? t('更新云端档案') : t('上传到云端')}
              </Button>
              {cloudGistId && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <code className="px-2 py-1 text-[11px] bg-muted border border-border max-w-full break-all">{cloudGistId}</code>
                  <button
                    onClick={() => { navigator.clipboard?.writeText(cloudGistId); toast.success(t('同步 ID 已复制')); }}
                    className="text-xs text-info hover:underline"
                  >
                    {t('复制同步 ID')}
                  </button>
                  <span className="text-xs text-muted-foreground">{t('· 发给另一台设备（微信文件传输助手即可）')}</span>
                </div>
              )}
            </div>

            {/* 第三步：另一台设备凭 ID 拉取 */}
            <div className="border border-border bg-background p-4 space-y-2">
              <p className="text-sm font-medium">{t('第三步 · 在新设备凭同步 ID 拉取')}</p>
              <div className="flex gap-2">
                <input
                  value={cloudPullId}
                  onChange={(e) => setCloudPullId(e.target.value)}
                  placeholder={t('粘贴同步 ID 或 Gist 链接')}
                  className="flex-1 h-9 px-3 text-xs border border-border bg-background outline-none focus:border-info"
                  autoComplete="off"
                />
                <Button onClick={handleCloudPull} size="sm" disabled={cloudBusy !== null} className="gap-1.5">
                  {cloudBusy === 'pull' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {t('拉取并导入')}
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">{t('拉取按 id 去重合并，重复操作安全；导入的记录自动归属当前登录账号。')}</p>
            </div>

            {cloudMsg && (
              <p className={cloudMsg.type === 'ok' ? 'text-xs text-info' : 'text-xs text-destructive'}>
                {cloudMsg.text}
              </p>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={() => setCloudOpen(false)}>
              {t('关闭')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── 导出 Word 对话框 ── */}
      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('导入学习档案')}</DialogTitle>
            <DialogDescription>
              {t('在另一台设备点「导出全部档案」，把下载到的文件内容完整粘贴到这里。导入按记录去重，已有的不会重复，可以放心多次导入。')}
            </DialogDescription>
          </DialogHeader>
          <textarea
            value={importCode}
            onChange={(e) => setImportCode(e.target.value)}
            placeholder={t('把档案文件里的内容完整粘贴到这里')}
            spellCheck={false}
            className="mt-2 h-48 w-full resize-none border border-border bg-background p-3 font-mono text-xs outline-none focus:border-info"
          />
          {importMsg && (
            <p className={importMsg.type === 'ok' ? 'text-xs text-info' : 'text-xs text-destructive'}>
              {importMsg.text}
            </p>
          )}
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setImportOpen(false)}>
              {t('关闭')}
            </Button>
            <Button onClick={handleImportArchive} className="gap-1.5">
              <Upload className="h-4 w-4" />
              {t('确认导入')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileDown className="h-5 w-5 text-info" />
              {t('导出学习总结')}
            </DialogTitle>
            <DialogDescription>
              {t('勾选要导出的总结，再选择「合并为一个 Word」或「分开导出多个 Word」。')}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {tpl('共 {a} 份 · 已选 {b} 份', {
                a: archive.length,
                b: exportChosen.length,
              })}
            </span>
            <button
              onClick={() =>
                setExportSel(
                  exportChosen.length === archive.length
                    ? new Set()
                    : new Set(archive.map((s) => s.id)),
                )
              }
              className="text-xs text-info hover:underline"
            >
              {exportChosen.length === archive.length ? t('取消全选') : t('全选')}
            </button>
          </div>

          <div className="max-h-72 overflow-auto space-y-1 border border-border bg-background p-2">
            {archive.map((s) => (
              <label
                key={s.id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-muted/50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={exportSel.has(s.id)}
                  onChange={() => toggleExport(s.id)}
                  style={{ accentColor: 'hsl(var(--info))' }}
                  className="h-4 w-4 cursor-pointer"
                />
                <span className="text-sm">{formatDate(s.createdAt)}</span>
                <span className="text-xs text-muted-foreground">{tpl('模型 {model}', { model: s.model })}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {tpl('覆盖 {n} 个问题', { n: s.questionCount })}
                </span>
              </label>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={() => setExportMode('merge')}
              className={`text-left border p-3 transition-colors duration-[var(--duration-fast)] ${
                exportMode === 'merge'
                  ? 'border-info bg-info/10'
                  : 'border-border hover:border-info/50'
              }`}
            >
              <span className="text-sm font-medium">{t('合并为一个 Word')}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {t('所选总结合并成 1 个文件')}
              </span>
            </button>
            <button
              onClick={() => setExportMode('separate')}
              className={`text-left border p-3 transition-colors duration-[var(--duration-fast)] ${
                exportMode === 'separate'
                  ? 'border-info bg-info/10'
                  : 'border-border hover:border-info/50'
              }`}
            >
              <span className="text-sm font-medium">{t('分开导出')}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {tpl('每份各 1 个 Word，共 {n} 个文件', { n: exportChosen.length })}
              </span>
            </button>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setExportOpen(false)}
              disabled={exporting}
            >
              {t('取消')}
            </Button>
            <Button
              onClick={() => void doExport()}
              disabled={exporting || exportChosen.length === 0}
              className="bg-info text-info-foreground hover:bg-info/90 gap-1.5"
            >
              {exporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileDown className="h-4 w-4" />
              )}
              {exporting
                ? t('导出中…')
                : exportChosen.length
                  ? tpl('确认导出（{n} 份）', { n: exportChosen.length })
                  : t('确认导出')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default Study;

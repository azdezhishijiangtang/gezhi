import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  BarChart3,
  FilePenLine,
  KeyRound,
  LogIn,
  RotateCcw,
  Save,
  ShieldX,
  Trash2,
  Users,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { courseCategories } from '@/data/courses';
import { useCourses, useFormulaGroups, useProblems, useTopics } from '@/i18n/data';
import { useLocale, useT } from '@/i18n/LocaleContext';
import {
  applyTopicOverrides,
  countOverrides,
  loadOverrides,
  removeOverride,
  saveOverride,
} from '@/lib/contentOverrides';
import {
  countAccounts,
  countSeedAccounts,
  isSeedAccount,
  listAccounts,
  listPendingSyncAccounts,
  buildSyncCode,
  buildSyncPayload,
} from '@/lib/accountStore';
import { isDevUser, useAuth } from '@/lib/AuthContext';
import { InlineMathText } from '@/components/MathText';

/* ─────────────────────────── 无权访问页 ─────────────────────────── */
const AccessDenied = ({ loggedIn }: { loggedIn: boolean }) => {
  const t = useT();
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-md border border-border bg-card p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center bg-destructive/10 text-destructive">
          <ShieldX className="h-6 w-6" />
        </span>
        <h1 className="mt-4 font-serif text-2xl font-semibold">{t('无权访问')}</h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {t('开发者模式仅对指定的开发者账号开放。')}
          {loggedIn
            ? t('当前登录账号不是开发者账号，请退出后使用开发者手机号登录。')
            : t('请先登录开发者账号后再访问。')}
        </p>
        <div className="mt-6 flex flex-col gap-2">
          {!loggedIn && (
            <Button asChild className="w-full gap-2 bg-info text-info-foreground hover:bg-info/90">
              <Link to="/login">
                <LogIn className="h-4 w-4" />
                {t('前往登录')}
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" className="w-full">
            <Link to="/">{t('返回首页')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};


/* ─────────────────────────── 内容编辑 ─────────────────────────── */
const ContentAdmin = () => {
  const t = useT();
  const { tpl } = useLocale();
  const courses = useCourses();
  const topics = useTopics();
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const courseTopics = useMemo(
    () => topics.filter((t) => t.courseId === courseId),
    [topics, courseId],
  );
  // 当前选中知识点不属于本课程时（典型：刚切换课程）回退到该课程第一个知识点。
  // 用派生值代替 effect + setState 联动，切换时不再触发级联渲染。
  const [topicIdInput, setTopicId] = useState(courseTopics[0]?.id ?? '');
  const topicId = courseTopics.some((t) => t.id === topicIdInput)
    ? topicIdInput
    : (courseTopics[0]?.id ?? '');

  const topic = topics.find((t) => t.id === topicId);

  // 草稿 = 当前知识点原文 + 用户尚未保存的改动。改动记录它所属的 topicId，
  // 所以切换知识点后自动回落到新知识点的原文，不需要额外 effect 重置。
  type Draft = { title: string; summary: string; content: string };
  const [draftEdits, setDraftEdits] = useState<{ topicId: string; value: Draft } | null>(null);
  const baseDraft: Draft = topic
    ? { title: topic.title, summary: topic.summary, content: topic.content }
    : { title: '', summary: '', content: '' };
  const draft = draftEdits?.topicId === topicId ? draftEdits.value : baseDraft;
  const setDraft = (next: Draft | ((d: Draft) => Draft)) => {
    setDraftEdits({ topicId, value: typeof next === 'function' ? next(draft) : next });
  };

  const dirty =
    !!topic &&
    (draft.title !== topic.title ||
      draft.summary !== topic.summary ||
      draft.content !== topic.content);

  const save = () => {
    if (!topic) return;
    if (!draft.title.trim() || !draft.content.trim()) {
      toast.error(t('标题与正文不能为空'));
      return;
    }
    const res = saveOverride(topic.id, draft);
    if (!res.ok) {
      toast.error(res.error ?? t('覆盖保存失败'));
      return;
    }
    applyTopicOverrides(topics);
    toast.success(t('已保存，页面即将刷新'));
    // 保存后强制刷新页面，保证编辑页显示与 localStorage 覆盖层一致
    window.location.reload();
  };

  const reset = () => {
    if (topic) setDraft({ title: topic.title, summary: topic.summary, content: topic.content });
  };

  const remove = () => {
    if (!topic) return;
    const res = removeOverride(topic.id);
    if (!res.ok) {
      toast.error(res.error ?? t('撤销失败'));
      return;
    }
    toast.success(t('已撤销本地覆盖，页面即将刷新恢复源码原文'));
    // 撤销后强制刷新页面，让内存中的 topics 回到原始源码数据
    window.location.reload();
  };

  const overrideCount = countOverrides();
  const overridden = topic ? Boolean(loadOverrides()[topic.id]) : false;

  return (
    <div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="dev-course-select" className="text-xs text-muted-foreground">{t('课程')}</Label>
          <Select value={courseId} onValueChange={setCourseId}>
            <SelectTrigger id="dev-course-select" className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {courses.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dev-topic-select" className="text-xs text-muted-foreground">{tpl('知识点（{n} 个）', { n: courseTopics.length })}</Label>
          <Select value={topicId} onValueChange={setTopicId}>
            <SelectTrigger id="dev-topic-select" className="w-72">
              <SelectValue placeholder={t('选择知识点')} />
            </SelectTrigger>
            <SelectContent>
              {courseTopics.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  <InlineMathText escape text={t.title} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="pb-2 text-xs text-muted-foreground">
          {tpl('本地覆盖 {n} 个', { n: overrideCount })}
          {overridden && <span className="ml-2 text-info">· {t('当前专题已被覆盖')}</span>}
        </span>
      </div>

      {topic && (
        <div className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="dev-title">{t('标题')}</Label>
            <Input
              id="dev-title"
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dev-summary">{t('摘要')}</Label>
            <Textarea
              id="dev-summary"
              value={draft.summary}
              onChange={(e) => setDraft((d) => ({ ...d, summary: e.target.value }))}
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="dev-content">{t('讲解正文（Markdown + LaTeX）')}</Label>
              <span className="text-xs text-muted-foreground">
                {tpl('{n} 字符', { n: draft.content.length })}
              </span>
            </div>
            <Textarea
              id="dev-content"
              value={draft.content}
              onChange={(e) => setDraft((d) => ({ ...d, content: e.target.value }))}
              rows={20}
              className="font-mono text-xs leading-relaxed"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button className="gap-1.5" onClick={save} disabled={!dirty}>
              <Save className="h-4 w-4" />
              {t('保存覆盖')}
            </Button>
            <Button variant="outline" className="gap-1.5" onClick={reset} disabled={!dirty}>
              <RotateCcw className="h-4 w-4" />
              {t('还原编辑')}
            </Button>
            <Button
              variant="outline"
              className="gap-1.5 text-destructive hover:text-destructive"
              onClick={remove}
              disabled={!overridden}
            >
              <Trash2 className="h-4 w-4" />
              {t('撤销本地覆盖')}
            </Button>
            <Link
              to={`/topics/${topic.id}`}
              className="ml-auto text-sm text-info hover:underline"
            >
              {t('查看该专题 →')}
            </Link>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t('说明：覆盖保存在当前浏览器的 localStorage，仅本机可见。要让所有访客看到，需要把修改同步进源码后重新构建发布。')}
          </p>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────── 数据概览 ─────────────────────────── */
const StatsAdmin = () => {
  const t = useT();
  const { tpl } = useLocale();
  const courses = useCourses();
  const topics = useTopics();
  const problems = useProblems();
  const formulaGroups = useFormulaGroups();
  const cards = [
    { label: t('课程'), value: courses.length },
    { label: t('知识专题'), value: topics.length },
    { label: t('例题'), value: problems.length },
    { label: t('速查公式'), value: formulaGroups.reduce((s, g) => s + g.formulas.length, 0) },
    { label: t('手机号注册账户'), value: countAccounts() },
    { label: t('本地内容覆盖'), value: countOverrides() },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="border border-border bg-card p-4">
            <p className="font-serif text-3xl font-semibold text-info">{c.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-8 font-serif text-lg font-semibold">{t('各学科方向专题分布')}</h3>
      <div className="mt-3 space-y-2">
        {courseCategories.map((cat) => {
          const count = topics.filter((tp) => cat.courseIds.includes(tp.courseId)).length;
          const max = Math.max(
            ...courseCategories.map(
              (c) => topics.filter((tp) => c.courseIds.includes(tp.courseId)).length,
            ),
          );
          return (
            <div key={cat.id} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-sm">{t(cat.name)}</span>
              <div className="h-2 flex-1 bg-secondary">
                <div
                  className="h-2 bg-info"
                  style={{ width: `${max > 0 ? (count / max) * 100 : 0}%` }}
                />
              </div>
              <span className="w-16 shrink-0 text-right text-xs text-muted-foreground">
                {tpl('{n} 专题', { n: count })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────── 账号管理 ─────────────────────────── */
const maskPhone = (phone: string): string =>
  phone.length === 11 ? `${phone.slice(0, 3)}****${phone.slice(-4)}` : phone;

const AccountsAdmin = () => {
  const t = useT();
  const { tpl } = useLocale();
  const [tick, setTick] = useState(0);
  // 简单刷新：切回标签页或点击刷新按钮时重读
  // eslint-disable-next-line react-hooks/exhaustive-deps -- tick 是手动刷新计数器，用来强制重读外部存储
  const accounts = useMemo(() => listAccounts(), [tick]);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- tick 是手动刷新计数器，用来强制重读外部存储
  const pending = useMemo(() => listPendingSyncAccounts(), [tick]);
  const seedCount = countSeedAccounts();
  const total = countAccounts();

  const copyText = async (text: string, okMsg: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(okMsg);
    } catch {
      toast.error(t('复制失败，请手动选择文本复制'));
    }
  };

  const downloadSyncFile = () => {
    const blob = new Blob([buildSyncPayload()], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `account-sync-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(t('同步文件已下载'));
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="border border-border bg-card p-4">
          <p className="font-serif text-3xl font-semibold text-info">{total}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t('账号总数（含内置）')}</p>
        </div>
        <div className="border border-border bg-card p-4">
          <p className="font-serif text-3xl font-semibold text-info">{seedCount}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t('内置登记表账号')}</p>
        </div>
        <div className="border border-border bg-card p-4">
          <p className="font-serif text-3xl font-semibold text-info">
            {accounts.length - seedCount}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{t('本机注册账号')}</p>
        </div>
        <div className="border border-border bg-card p-4">
          <p
            className={`font-serif text-3xl font-semibold ${
              pending.length > 0 ? 'text-destructive' : 'text-info'
            }`}
          >
            {pending.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{t('待同步进代码库')}</p>
        </div>
      </div>

      {/* ── 同步操作区 ── */}
      <div className="mt-6 border border-border bg-card p-5">
        <h3 className="font-serif text-lg font-semibold">{t('把新账号写入代码库')}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {t('新用户注册的账号默认只保存在他自己的浏览器里。导出下面的同步数据并提交进')}
          <code className="mx-1 rounded bg-secondary px-1.5 py-0.5 text-xs">
            frontend/src/data/seedAccounts.ts
          </code>
          {t('后，该账号就能在任意设备登录，不会再「登录不上去」。')}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            className="gap-1.5 bg-info text-info-foreground hover:bg-info/90"
            disabled={pending.length === 0}
            onClick={() => copyText(buildSyncCode(), t('同步码已复制，发送给网站维护者即可'))}
          >
            <Save className="h-4 w-4" />
            {tpl('复制同步码（{n}）', { n: pending.length })}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="gap-1.5"
            disabled={pending.length === 0}
            onClick={downloadSyncFile}
          >
            <Save className="h-4 w-4" />
            {t('下载同步文件')}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="gap-1.5"
            onClick={() => setTick((v) => v + 1)}
          >
            <RotateCcw className="h-4 w-4" />
            {t('刷新列表')}
          </Button>
        </div>
        {pending.length > 0 ? (
          <p className="mt-3 text-xs text-muted-foreground">
            {t('提示：同步码是一段 Base64 文本，直接通过聊天工具发给维护者；维护者提交并发布后，这里待同步数量会自动清零。')}
          </p>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">
            {t('当前没有待同步的新账号 —— 所有本机注册账号都已在代码库中生效。')}
          </p>
        )}
      </div>

      {/* ── 账号列表 ── */}
      <h3 className="mt-8 font-serif text-lg font-semibold">
        {tpl('全部账号（{n}）', { n: accounts.length })}
      </h3>
      <div className="mt-3 divide-y divide-border border border-border">
        {accounts.map((a) => {
          const isSeed = isSeedAccount(a);
          return (
            <div
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-info/10 text-info">
                  <Users className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">{a.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {maskPhone(a.phone)} · {t('注册于')}{' '}
                    {new Date(a.createdAt).toLocaleDateString('zh-CN')}
                    {a.lastLoginAt
                      ? ` · ${t('最近登录')} ${new Date(a.lastLoginAt).toLocaleDateString('zh-CN')}`
                      : ''}
                  </p>
                </div>
              </div>
              <span
                className={`rounded px-2 py-0.5 text-xs ${
                  isSeed
                    ? 'bg-info/10 text-info'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {isSeed ? t('内置登记表') : t('本机注册')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────── 页面 ─────────────────────────── */
const DevMode = () => {
  const t = useT();
  const { user } = useAuth();

  // 开发者模式仅对指定开发者账号（DEV_PHONE）开放，其他账号一律拒绝
  if (!isDevUser(user)) return <AccessDenied loggedIn={Boolean(user)} />;

  return (
    <div className="container py-12 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide text-info">
            <KeyRound className="h-4 w-4" />
            {t('开发者模式')} · {user?.phone}
          </p>
          <h1 className="font-serif text-3xl font-semibold">{t('站点管理台')}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('回复用户反馈、更新知识点讲解、查看数据概览。')}
          </p>
        </div>
        <Button asChild variant="outline" className="gap-1.5">
          <Link to="/">
            <XCircle className="h-4 w-4" />
            {t('退出开发者模式')}
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="content" className="mt-8">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="content" className="gap-1.5">
            <FilePenLine className="h-4 w-4" />
            {t('内容编辑')}
          </TabsTrigger>
          <TabsTrigger value="accounts" className="gap-1.5">
            <Users className="h-4 w-4" />
            {t('账号管理')}
          </TabsTrigger>
          <TabsTrigger value="stats" className="gap-1.5">
            <BarChart3 className="h-4 w-4" />
            {t('数据概览')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <ContentAdmin />
        </TabsContent>
        <TabsContent value="accounts" className="mt-6">
          <AccountsAdmin />
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
          <StatsAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DevMode;

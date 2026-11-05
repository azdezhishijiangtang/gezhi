import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Send,
  Square,
  MessageSquarePlus,
  ChevronRight,
  X,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  RefreshCw,
  FileSearch,
  ImagePlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import MathText, { InlineMathText } from '@/components/MathText';
import { FadeIn } from '@/components/MotionPrimitives';
import ThinkingPanel from '@/components/ThinkingPanel';
import AiSettingsCard from '@/components/AiSettingsCard';
import DocLibraryPanel from '@/components/DocLibraryPanel';
import { useAuth } from '@/lib/AuthContext';
import { readAiConfig, saveAiConfig, THINKING_LABELS } from '@/lib/ai';
import {
  getCatalog,
  describeCatalogAge,
  retiredModelHint,
  type CatalogEntry,
} from '@/lib/modelCatalog';
import { useTutorChat, QUICK_FOLLOWUPS } from '@/lib/useTutorChat';
import { useUserDocs } from '@/lib/docLibrary';
import { useTopic, useCourse } from '@/i18n/data';
import { useT, useLocale } from '@/i18n/LocaleContext';

const SUGGESTED_QUESTIONS = [
  '泰勒展开和洛必达法则有什么区别？什么时候该用哪个？',
  '特征值和特征向量的几何意义是什么？为什么要对角化？',
  '贝叶斯公式为什么是"由果溯因"？能举个生活中的例子吗？',
  '一致收敛和逐点收敛到底差在哪里？为什么积分号下取极限要一致收敛？',
  '留数定理是怎么把困难的实积分变成找极点的？',
  '伽罗瓦理论为什么能证明五次方程没有根式解？',
];

const Tutor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const t = useT();
  const { tpl } = useLocale();
  const { user } = useAuth();
  const userId = user?.id ?? 'guest';
  const topicId = searchParams.get('topic');
  const section = searchParams.get('section');
  const topic = useTopic(topicId ?? undefined);
  const course = useCourse(topic?.courseId);

  const [config, setConfig] = useState(readAiConfig());
  const [showSettings, setShowSettings] = useState(!readAiConfig());
  const [useDocs, setUseDocs] = useState(true);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  // 模型目录（随服务商自动更新）：缓存新鲜秒回，过期后台刷新，失败回退内置列表
  const [catalog, setCatalog] = useState<CatalogEntry>({ models: [], source: 'builtin', fetchedAt: 0 });
  const [catalogLoading, setCatalogLoading] = useState(false);
  const docs = useUserDocs(userId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const attachRef = useRef<HTMLInputElement>(null);

  const chat = useTutorChat({ userId, topicId, section, useDocs });
  const {
    messages,
    input,
    setInput,
    images,
    addImages,
    removeImage,
    sessionUsage,
    lastModel,
    streaming,
    status,
    error,
    setError,
    send,
    stop,
    clear,
    regenerate,
  } = chat;

  // 自动滚动到底部
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // 未配置密钥时自动展开设置卡片
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 错误来自异步对话流，一旦出现即展开密钥设置卡片
    if (error?.includes('API Key')) setShowSettings(true);
  }, [error]);

  /** 拉取当前服务商的模型目录；force=true 时强制刷新 */
  const loadCatalog = async (force = false) => {
    if (!config) return;
    setCatalogLoading(true);
    try {
      const entry = await getCatalog(config.baseUrl, config.apiKey, { force });
      setCatalog(entry);
    } finally {
      setCatalogLoading(false);
    }
  };

  // 配置就绪后自动拉取模型目录（缓存新鲜则秒回，过期则后台静默刷新）
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 配置就绪后拉取模型目录，loading 标志需同步置位
    if (config) void loadCatalog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.baseUrl, config?.apiKey]);

  /** 侧栏直接切换模型：写回生效配置并刷新目录状态 */
  const switchModel = (model: string) => {
    if (!config) return;
    const next = { ...config, model };
    saveAiConfig(next);
    setConfig(readAiConfig() ?? next);
  };

  const copyMessage = async (content: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {
      /* 剪贴板不可用时忽略 */
    }
  };

  const clearTopicContext = () => {
    searchParams.delete('topic');
    setSearchParams(searchParams);
  };

  return (
    <div className="container py-10 lg:py-14">
      {/* 页头 */}
      <FadeIn>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-info tracking-wide mb-2">AI TUTOR</p>
            <h1 className="font-serif text-3xl font-semibold">{t('AI 答疑')}</h1>
            <p className="mt-2 text-muted-foreground max-w-2xl leading-relaxed">
              {t('用你自己的 API Key 调用大模型，随问随答。支持分步推导、公式渲染、上传个人资料后基于资料作答，问答自动存入')}
              <Link to="/study" className="text-info hover:underline">{t('学习档案')}</Link>
              {t('，可随时回顾、总结与生成练习题。')}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {t('开启「思考强度」后，回答上方会实时展示模型的思考过程（可折叠、可复制），方便学习 AI 的推理路径。')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings((v) => !v)}
              className="gap-1.5"
            >
              {showSettings ? t('收起设置') : t('密钥设置')}
            </Button>
            {messages.length > 0 && (
              <Button variant="outline" size="sm" onClick={clear} className="gap-1.5">
                <MessageSquarePlus className="h-4 w-4" />
                {t('新对话')}
              </Button>
            )}
          </div>
        </div>
      </FadeIn>

      {/* 知识点上下文横幅 */}
      {topic && (
        <FadeIn delay={0.05}>
          <div className="mt-6 flex items-center gap-3 border border-info/30 bg-info/5 px-4 py-3">
            <BookOpen className="h-4 w-4 shrink-0 text-info" />
            <p className="text-sm flex-1 min-w-0">
              {t('正在带着知识点提问：')}
              <Link to={`/topics/${topic.id}`} className="text-info font-medium hover:underline mx-1">
                <InlineMathText text={topic.title} />
              </Link>
              {section && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-info font-medium mx-1"><InlineMathText text={section} /></span>
                </>
              )}
              <span className="text-muted-foreground">{tpl('（{name} · {chapter}）', { name: course?.name ?? '', chapter: topic.chapter })}</span>
            </p>
            <button
              onClick={clearTopicContext}
              className="text-muted-foreground hover:text-foreground shrink-0"
              aria-label={t('清除知识点上下文')}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </FadeIn>
      )}

      {config && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>{t('已接入模型：')}<code className="bg-secondary px-1.5 py-0.5 text-info">{config.model}</code></span>
          {(sessionUsage.total > 0 || lastModel) && (
            <span>{tpl('本次会话用量：↑{p} / ↓{c} · 共 {t} tokens', { p: sessionUsage.prompt, c: sessionUsage.completion, t: sessionUsage.total })}</span>
          )}
          <span className="hidden sm:inline">{t('支持上传图片（≤4 张）与 500MB 内文档')}</span>
        </div>
      )}

      <div className="mt-8 grid lg:grid-cols-12 gap-8">
        {/* ── 对话区 ── */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="border border-border bg-card flex flex-col min-h-[560px] max-h-[72vh]">
            {/* 消息列表 */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5">
              {messages.length === 0 && (
                <div className="py-10 text-center">
                  <Sparkles className="mx-auto h-10 w-10 text-info/40 mb-4" />
                  <h2 className="font-serif text-xl font-semibold">{t('问点什么吧')}</h2>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    {t('可以问概念理解、解题思路、定理证明。')}
                    {topic ? (
                      <>
                        {t('也可以让我结合「')}
                        <InlineMathText text={topic.title} />
                        {section ? (
                          <>
                            {' · '}
                            <InlineMathText text={section} />
                          </>
                        ) : null}
                        {t('」这一节展开讲。')}
                      </>
                    ) : (
                      t('先从下面的常见问题开始，或直接在输入框提问。')
                    )}
                    {docs.length > 0 && t(' 有不懂的也可以问我上传的资料。')}
                  </p>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : ''}>
                  {m.role === 'user' ? (
                    <div className="max-w-[85%] bg-info/10 border border-info/20 px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap">
                      <InlineMathText text={m.content} escape />
                      {m.images && m.images.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {m.images.map((src, j) => (
                            <img key={j} src={src} alt={t('提问附图')} className="max-h-40 border border-border" />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="max-w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex h-6 w-6 items-center justify-center bg-info text-info-foreground">
                          <Sparkles className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">Principia {t('助教')}</span>
                        {m.model && (
                          <span className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 font-mono">{m.model}</span>
                        )}
                        {m.mode && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 ${
                              m.mode === 'medium' || m.mode === 'high' ? 'bg-warning/15 text-warning' : 'bg-info/10 text-info'
                            }`}
                          >
                            {m.auto && t('自动·')}
                            {tpl('思考 · {mode}', { mode: t(THINKING_LABELS[m.mode]) })}
                          </span>
                        )}
                        {m.multiPath && (
                          <span className="text-[10px] bg-info/15 text-info px-1.5 py-0.5">
                            {tpl('多路径·{n}路', { n: m.multiPath })}
                          </span>
                        )}
                        {m.crossModel && (
                          <span className="text-[10px] bg-warning/15 text-warning px-1.5 py-0.5">
                            {tpl('交叉验证·{model}', { model: m.crossModel })}
                          </span>
                        )}
                        {m.link && (
                          <span className="text-[10px] bg-success/15 text-success px-1.5 py-0.5">
                            {tpl('联动·{model}', { model: m.linkModel ?? '' })}
                          </span>
                        )}
                        {m.usage && (
                          <span className="text-[10px] text-muted-foreground">↑{m.usage.prompt} ↓{m.usage.completion} tokens</span>
                        )}
                        {status === 'searching' && i === messages.length - 1 && (
                          <span className="flex items-center gap-1 text-xs text-info">
                            <FileSearch className="h-3 w-3 animate-pulse" />
                            {t('正在检索我的文档…')}
                          </span>
                        )}
                        {streaming && i === messages.length - 1 && (
                          <span className="text-xs text-info animate-pulse">{t('正在输入…')}</span>
                        )}
                      </div>
                      {/* 思考过程：流式实时展示推理路径，可折叠、可复制 */}
                      {(m.reasoning ||
                        (streaming && i === messages.length - 1 && !m.content && m.mode !== 'off')) && (
                        <ThinkingPanel
                          reasoning={m.reasoning ?? ''}
                          live={streaming && i === messages.length - 1 && !m.content}
                          startedAt={m.reasoningStartedAt}
                          durationMs={m.reasoningMs}
                        />
                      )}
                      {/* 智能自检：自动复核结果（榨干算力的纠错环节） */}
                      {m.selfCheck && (
                        <details
                          className="mb-2.5 border border-success/30 bg-success/5 px-3.5 py-2.5 text-xs"
                          open={streaming && i === messages.length - 1}
                        >
                          <summary className="flex cursor-pointer select-none items-center gap-1.5 font-medium text-success">
                            <Check className="h-3 w-3" />
                            {t('智能自检')}
                          </summary>
                          <div className="mt-2 whitespace-pre-wrap leading-relaxed text-muted-foreground">
                            {m.selfCheck}
                          </div>
                        </details>
                      )}
                      {/* 多路径自洽：各路独立思路（深度/难题时启用） */}
                      {m.paths && m.paths.length > 0 && (
                        <details className="mb-2.5 border border-info/30 bg-info/5 px-3.5 py-2.5 text-xs">
                          <summary className="flex cursor-pointer select-none items-center gap-1.5 font-medium text-info">
                            <Sparkles className="h-3 w-3" />
                            {tpl('多路径推理 · {n} 路独立思路', { n: m.paths.length })}
                            {m.link ? tpl('（经 {model} 仲裁）', { model: m.linkModel ?? '' }) : ''}
                          </summary>
                          <div className="mt-2 space-y-3">
                            {m.paths.map((p, j) => (
                              <div key={j}>
                                <div className="mb-1 font-medium text-foreground">{tpl('思路 {n}', { n: j + 1 })}</div>
                                <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                                  {p}
                                </div>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                      {/* 极致模式·双模型交叉验证：第二模型的独立解答 */}
                      {m.crossCheck && (
                        <details className="mb-2.5 border border-warning/30 bg-warning/5 px-3.5 py-2.5 text-xs">
                          <summary className="flex cursor-pointer select-none items-center gap-1.5 font-medium text-warning">
                            <RefreshCw className="h-3 w-3" />
                            {tpl('交叉验证 · 模型B（{model}）独立解答', { model: m.crossModel ?? '' })}
                          </summary>
                          <div className="mt-2 whitespace-pre-wrap leading-relaxed text-muted-foreground">
                            {m.crossCheck}
                          </div>
                        </details>
                      )}
                      {m.content ? (
                        <>
                          <MathText content={m.content} className="text-sm" />
                          {/* 引用的文档段落 */}
                          {m.sources && m.sources.length > 0 && (
                            <details className="mt-2.5 border border-info/20 bg-info/5 px-3.5 py-2.5 text-xs">
                              <summary className="cursor-pointer text-info font-medium select-none">
                                {tpl('参考了我的文档 · {n} 个段落（点击展开）', { n: m.sources.length })}
                              </summary>
                              <ul className="mt-2 space-y-2 leading-relaxed">
                                {m.sources.map((s, j) => (
                                  <li key={j} className="text-muted-foreground">
                                    <span className="font-medium text-foreground">{tpl('《{name}》', { name: s.docName })}</span>
                                    <span className="mx-1.5 text-info">›</span>
                                    {s.snippet}…
                                  </li>
                                ))}
                              </ul>
                            </details>
                          )}
                          {/* 操作行 */}
                          {!streaming && i === messages.length - 1 && (
                            <div className="mt-2 flex items-center gap-3">
                              <button
                                onClick={() => copyMessage(m.content, i)}
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
                              >
                                {copiedIdx === i ? (
                                  <>
                                    <Check className="h-3.5 w-3.5 text-success" />
                                    {t('已复制')}
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3.5 w-3.5" />
                                    {t('复制')}
                                  </>
                                )}
                              </button>
                              <button
                                onClick={regenerate}
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
                              >
                                <RefreshCw className="h-3.5 w-3.5" />
                                {t('重新生成')}
                              </button>
                            </div>
                          )}
                          {/* 快捷追问 */}
                          {!streaming && i === messages.length - 1 && (
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {QUICK_FOLLOWUPS.map((q) => (
                                <button
                                  key={q.label}
                                  onClick={() => send(q.prompt)}
                                  className="text-xs border border-border px-2.5 py-1 text-muted-foreground hover:border-info/50 hover:text-info transition-colors duration-[var(--duration-fast)]"
                                >
                                  {t(q.label)}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        streaming && (
                          <div className="flex gap-1.5 py-2">
                            <span className="h-2 w-2 bg-info/60 animate-bounce [animation-delay:-0.3s]" />
                            <span className="h-2 w-2 bg-info/60 animate-bounce [animation-delay:-0.15s]" />
                            <span className="h-2 w-2 bg-info/60 animate-bounce" />
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}

              {error && (
                <div className="border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive leading-relaxed">
                  {error}
                </div>
              )}
            </div>

            {/* 推荐问题（空对话时显示） */}
            {messages.length === 0 && !streaming && (
              <div className="border-t border-border px-5 py-4">
                <p className="text-xs text-muted-foreground mb-2.5">{t('常见问题')}</p>
                <div className="space-y-1.5">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="group flex w-full items-center gap-2 text-left text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
                    >
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-info" />
                      <span className="truncate">{t(q)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 输入区 */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2 items-end">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder={config ? t('输入你的数学问题（Enter 发送，Shift+Enter 换行）…') : t('请先在右侧配置 API Key')}
                  disabled={streaming}
                  rows={2}
                  className="resize-none flex-1"
                />
                {streaming ? (
                  <Button onClick={stop} variant="outline" className="gap-1.5" aria-label={t('停止生成')}>
                    <Square className="h-4 w-4" />
                    {t('停止')}
                  </Button>
                ) : (
                  <>
                    {images.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {images.map((im) => (
                          <span key={im.id} className="relative">
                            <img src={im.dataUrl} alt={im.name} className="h-14 w-14 object-cover border border-border" />
                            <button
                              onClick={() => removeImage(im.id)}
                              aria-label={tpl('移除图片 {name}', { name: im.name })}
                              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center bg-destructive text-destructive-foreground"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    {/* 图片上传 */}
                    <input
                      ref={attachRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) addImages(e.target.files);
                        e.target.value = '';
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={streaming || images.length >= 4}
                      onClick={() => attachRef.current?.click()}
                      aria-label={t('添加图片')}
                      title={t('添加图片（随提问发给多模态模型，最多 4 张）')}
                      className="shrink-0"
                    >
                      <ImagePlus className="h-4 w-4" />
                    </Button>
                  <Button
                    onClick={() => send(input)}
                    disabled={!input.trim() || !config}
                    className="bg-info text-info-foreground hover:bg-info/90 gap-1.5"
                    aria-label={t('发送')}
                  >
                    <Send className="h-4 w-4" />
                    {t('发送')}
                  </Button>
                  </>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                {docs.length > 0 ? (
                  <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                    <Switch
                      checked={useDocs}
                      onCheckedChange={setUseDocs}
                      aria-label={t('是否使用我的文档知识库')}
                    />
                    {tpl('使用我的文档知识库作答（{n} 份已启用）', { n: docs.filter((d) => d.enabled).length })}
                  </label>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {t('上传教材讲义后，可让 AI 参考你的资料作答')}
                  </span>
                )}
                {messages.length > 0 && (
                  <button
                    onClick={clear}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors duration-[var(--duration-fast)]"
                  >
                    {t('清空当前对话（不影响已保存的答疑记录）')}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── 对话框下方：使用说明 / 学习档案 ── */}
          <div className="mt-5 grid gap-5 md:grid-cols-5">
            <div className="border border-border bg-card p-5 md:col-span-3">
              <h3 className="font-serif text-base font-semibold mb-3">{t('使用说明')}</h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                <li className="flex gap-2">
                  <span className="font-mono text-info shrink-0">01</span>
                  {t('填写任一 OpenAI 兼容服务商的密钥（见右侧预设），保存后即可提问。')}
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-info shrink-0">02</span>
                  {t('在任意知识点页点击"问 AI"，会自动带上该知识点的上下文。')}
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-info shrink-0">03</span>
                  {t('上传教材 / 讲义 / 笔记，提问时自动检索相关段落，AI 会参考你的资料并注明出处。')}
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-info shrink-0">04</span>
                  {t('每轮问答自动存入学习档案，可回顾、AI 总结、生成专项练习。')}
                </li>
              </ul>
            </div>

            <div className="border border-border bg-card p-5 md:col-span-2">
              <h3 className="font-serif text-base font-semibold mb-3">{t('学习档案')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {t('答疑历史按账户沉淀，AI 可帮你总结薄弱点并生成个性化练习题。')}
              </p>
              <Button asChild variant="outline" size="sm" className="w-full gap-1.5">
                <Link to="/study">
                  {t('打开学习档案')}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── 侧栏：设置 / 文档知识库 ── */}
        <aside className="lg:col-span-4 space-y-5">
          {showSettings ? (
            <AiSettingsCard
              onSaved={() => {
                setConfig(readAiConfig());
                setError(null);
                // 保存后收起设置卡片，回到「当前模型」视图（可随时再展开）
                setShowSettings(false);
                inputRef.current?.focus();
              }}
            />
          ) : (
            <div className="border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-base font-semibold">{t('当前模型')}</h3>
                <span className="text-xs text-success">{t('已就绪')}</span>
              </div>

              {/* 模型切换：选项来自服务商实时目录（随服务商自动更新） */}
              {catalog.models.length > 0 ? (
                <div className="space-y-2">
                  <label htmlFor="tutor-model" className="text-xs text-muted-foreground">
                     {tpl('切换模型（{n} 个可选）', { n: catalog.models.length })}
                  </label>
                  <select
                    id="tutor-model"
                    value={config?.model}
                    onChange={(e) => switchModel(e.target.value)}
                    className="h-9 w-full border border-input bg-background px-2 text-sm font-mono"
                  >
                    {config?.model && !catalog.models.includes(config.model) && (
                      <option value={config.model}>{tpl('{model}（当前）', { model: config.model })}</option>
                    )}
                    {catalog.models.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-muted-foreground">
                      {catalog.source === 'remote'
                        ? tpl('服务商实时列表 · 更新于 {age}', { age: describeCatalogAge(catalog.fetchedAt) }) +
                          (catalog.stale ? t('（已过期）') : '')
                        : t('内置参考列表（实时拉取失败）')}
                    </span>
                    <button
                      type="button"
                      onClick={() => void loadCatalog(true)}
                      disabled={catalogLoading}
                      className="flex items-center gap-1 text-[11px] text-info hover:underline disabled:text-muted-foreground disabled:no-underline"
                    >
                      <RefreshCw className={`h-3 w-3 ${catalogLoading ? 'animate-spin' : ''}`} />
                      {t('刷新')}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm font-mono text-info break-all">{config?.model}</p>
                  <p className="mt-1 text-xs text-muted-foreground break-all">{config?.baseUrl}</p>
                </>
              )}

              {retiredModelHint(config?.model ?? '') && (
                <p className="mt-2 text-[11px] text-warning leading-relaxed">
                  {tpl('当前模型已被服务商退役，建议更换为 {model}', { model: retiredModelHint(config?.model ?? '') ?? '' })}
                </p>
              )}

              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() => setShowSettings(true)}
              >
                {t('更换密钥 / 接口存档')}
              </Button>
            </div>
          )}

          <DocLibraryPanel userId={userId} />
        </aside>
      </div>
    </div>
  );
};

export default Tutor;

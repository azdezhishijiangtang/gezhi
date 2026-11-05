/**
 * 全局悬浮"问 AI"：右下角常驻入口，任何页面都能随时提问。
 * - 自动识别当前是否处于知识点页（/topics/:topicId），携带该知识点上下文
 * - 复用 useTutorChat：与答疑台共享同一套对话逻辑（含文档知识库检索）
 * - 在 /tutor 与 /login 页自动隐藏
 */
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Sparkles,
  X,
  Send,
  Square,
  Maximize2,
  BookOpen,
  FileSearch,
  Library,
  Check,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import MathText from '@/components/MathText';
import ThinkingPanel from '@/components/ThinkingPanel';
import { useAuth } from '@/lib/AuthContext';
import { InlineMathText } from '@/components/MathText';
import { readAiConfig, THINKING_LABELS } from '@/lib/ai';
import { useTutorChat, QUICK_FOLLOWUPS } from '@/lib/useTutorChat';
import { useUserDocs } from '@/lib/docLibrary';
import { useT } from '@/i18n/LocaleContext';

const HIDDEN_PATHS = ['/tutor', '/login'];

/** 从路由推导当前知识点上下文 */
const useRouteTopicId = (): string | null => {
  const { pathname } = useLocation();
  const m = /^\/topics\/([^/]+)$/.exec(pathname);
  return m ? m[1] : null;
};

const AskAiWidget = () => {
  const t = useT();
  const location = useLocation();
  const { user } = useAuth();
  const topicId = useRouteTopicId();
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const docs = useUserDocs(user?.id ?? 'guest');
  const enabledDocCount = docs.filter((d) => d.enabled).length;

  const chat = useTutorChat({
    userId: user?.id ?? 'guest',
    topicId,
    onBeforeSend: () => inputRef.current?.focus(),
  });
  const { messages, input, setInput, streaming, status, error, send, stop, topic } = chat;

  // 打开时聚焦输入框；Escape 关闭；向 body 广播展开状态（供「生成示意图」浮动入口避让）
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (open) document.body.dataset.askAiOpen = '1';
    else delete document.body.dataset.askAiOpen;
    return () => {
      delete document.body.dataset.askAiOpen;
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  // 自动滚动
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  if (HIDDEN_PATHS.includes(location.pathname)) return null;

  return (
    <>
      {/* 悬浮按钮 */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-info text-info-foreground shadow-lg shadow-info/25 transition-colors hover:bg-info/90"
        aria-label={open ? t('关闭 AI 答疑') : t('打开 AI 答疑')}
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </motion.button>

      {/* 对话面板 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-20 right-4 sm:right-6 z-40 flex w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden border border-border bg-card shadow-xl"
          >
            {/* 头部 */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="flex h-6 w-6 items-center justify-center bg-info text-info-foreground shrink-0">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-medium">{t('AI 助教')}</span>
              {topic && (
                <span className="flex items-center gap-1 text-xs text-info truncate max-w-[140px]" title={topic.title}>
                  <BookOpen className="h-3 w-3 shrink-0" />
                  <span className="truncate"><InlineMathText text={topic.title} /></span>
                </span>
              )}
              <div className="ml-auto flex items-center gap-1">
                <Link
                  to="/tutor"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-info transition-colors duration-[var(--duration-fast)]"
                  title={t('打开完整答疑台')}
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  {t('答疑台')}
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={t('关闭面板')}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 消息区 */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[46vh] min-h-[200px]">
              {messages.length === 0 && (
                <div className="py-6 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-info/40 mb-3" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('随时提问，随叫随到。')}
                    <br />
                    {t('概念、解题、证明都可以问。')}
                  </p>
                  {enabledDocCount > 0 && (
                    <p className="mt-2 flex items-center justify-center gap-1 text-xs text-info">
                      <Library className="h-3 w-3" />
                      {t('已加载 ')}{enabledDocCount}{t(' 份个人资料')}
                    </p>
                  )}
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : ''}>
                  {m.role === 'user' ? (
                    <div className="max-w-[85%] bg-info/10 border border-info/20 px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap">
                      {m.content}
                    </div>
                  ) : (
                    <div className="max-w-full">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-medium text-muted-foreground">{t('Principia 助教')}</span>
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
                            {t('思考 · ') + t(THINKING_LABELS[m.mode])}
                          </span>
                        )}
                        {m.multiPath && (
                          <span className="text-[10px] bg-info/15 text-info px-1.5 py-0.5">
                            {t('多路径·')}{m.multiPath}{t('路')}
                          </span>
                        )}
                        {m.crossModel && (
                          <span className="text-[10px] bg-warning/15 text-warning px-1.5 py-0.5">
                            {t('交叉验证·')}{m.crossModel}
                          </span>
                        )}
                        {m.link && (
                          <span className="text-[10px] bg-success/15 text-success px-1.5 py-0.5">
                            {t('联动·')}{m.linkModel}
                          </span>
                        )}
                        {status === 'searching' && i === messages.length - 1 && (
                          <span className="flex items-center gap-1 text-xs text-info">
                            <FileSearch className="h-3 w-3 animate-pulse" />
                            {t('检索文档中…')}
                          </span>
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
                      {/* 智能自检：自动复核结果 */}
                      {m.selfCheck && (
                        <details
                          className="mb-2 border border-success/30 bg-success/5 px-3 py-2 text-xs"
                          open={streaming && i === messages.length - 1}
                        >
                          <summary className="flex cursor-pointer select-none items-center gap-1.5 font-medium text-success">
                            <Check className="h-3 w-3" />
                            {t('智能自检')}
                          </summary>
                          <div className="mt-1.5 whitespace-pre-wrap leading-relaxed text-muted-foreground">
                            {m.selfCheck}
                          </div>
                        </details>
                      )}
                      {/* 多路径自洽：各路独立思路 */}
                      {m.paths && m.paths.length > 0 && (
                        <details className="mb-2 border border-info/30 bg-info/5 px-3 py-2 text-xs">
                          <summary className="flex cursor-pointer select-none items-center gap-1.5 font-medium text-info">
                            <Sparkles className="h-3 w-3" />
                            {t('多路径推理 · ')}{m.paths.length}{t(' 路独立思路')}{m.link ? t('（经 ') + m.linkModel + t(' 仲裁）') : ''}
                          </summary>
                          <div className="mt-1.5 space-y-2">
                            {m.paths.map((p, j) => (
                              <div key={j}>
                                <div className="mb-0.5 font-medium text-foreground">{t('思路 ') + (j + 1)}</div>
                                <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{p}</div>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                      {/* 极致模式·双模型交叉验证：第二模型的独立解答 */}
                      {m.crossCheck && (
                        <details className="mb-2 border border-warning/30 bg-warning/5 px-3 py-2 text-xs">
                          <summary className="flex cursor-pointer select-none items-center gap-1.5 font-medium text-warning">
                            <RefreshCw className="h-3 w-3" />
                            {t('交叉验证 · 模型B（')}{m.crossModel}{t('）')}
                          </summary>
                          <div className="mt-1.5 whitespace-pre-wrap leading-relaxed text-muted-foreground">
                            {m.crossCheck}
                          </div>
                        </details>
                      )}
                      {m.content ? (
                        <>
                          <MathText content={m.content} className="text-sm" />
                          {m.sources && m.sources.length > 0 && (
                            <p className="mt-1.5 text-xs text-info">
                              {t('· 参考了我的文档 ')}{m.sources.length}{t(' 个段落（')}
                              <Link to="/tutor" onClick={() => setOpen(false)} className="hover:underline">
                                {t('查看详情')}
                              </Link>
                              {t('）')}
                            </p>
                          )}
                          {!streaming && i === messages.length - 1 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {QUICK_FOLLOWUPS.slice(0, 3).map((q) => (
                                <button
                                  key={q.label}
                                  onClick={() => send(q.prompt)}
                                  className="text-xs border border-border px-2 py-0.5 text-muted-foreground hover:border-info/50 hover:text-info transition-colors duration-[var(--duration-fast)]"
                                >
                                  {t(q.label)}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        streaming && (
                          <div className="flex gap-1.5 py-1">
                            <span className="h-1.5 w-1.5 bg-info/60 animate-bounce [animation-delay:-0.3s]" />
                            <span className="h-1.5 w-1.5 bg-info/60 animate-bounce [animation-delay:-0.15s]" />
                            <span className="h-1.5 w-1.5 bg-info/60 animate-bounce" />
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}

              {error && (
                <div className="border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive leading-relaxed">
                  {error}
                  {error.includes('API Key') && (
                    <Link to="/tutor" onClick={() => setOpen(false)} className="ml-1 underline">
                      {t('去配置')}
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* 输入区 */}
            <div className="border-t border-border p-3">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder={t('输入问题，Enter 发送…')}
                  disabled={streaming}
                  rows={1}
                  className="flex-1 resize-none border border-border bg-background px-3 py-2 text-sm outline-none focus:border-info/50 disabled:opacity-50"
                />
                {streaming ? (
                  <Button onClick={stop} variant="outline" size="icon" className="shrink-0" aria-label={t('停止生成')}>
                    <Square className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => send(input)}
                    disabled={!input.trim() || !readAiConfig()}
                    size="icon"
                    className="shrink-0 bg-info text-info-foreground hover:bg-info/90"
                    aria-label={t('发送')}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AskAiWidget;

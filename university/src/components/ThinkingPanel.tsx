/**
 * 思考过程面板：折叠展示推理模型返回的思维链（reasoning_content）。
 *
 * 设计目标（面向「学习 AI 如何思考」这个场景）：
 * - 生成过程中自动展开，并实时逐字追加，能看到模型「边想边写」的完整过程；
 * - 顶部显示实时状态：思考中 / 用时 / 字数，方便感知推理的节奏与规模；
 * - 生成结束后保留面板（不会突然收起），可继续回看，也可一键复制；
 * - 随时可手动折叠，编辑/提问区不被长期占用。
 */
import { useEffect, useId, useRef, useState } from 'react';
import { Brain, Check, ChevronDown, Copy, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useT } from '@/i18n/LocaleContext';
import { tpl } from '@/i18n/translate';

export interface ThinkingPanelProps {
  /** 已累积的思考内容（可随流式输出增长） */
  reasoning: string;
  /** 是否仍在生成中（思考中 / 作答中） */
  live?: boolean;
  /** 开始思考的时间戳（epoch ms），用于实时计时 */
  startedAt?: number;
  /** 已确定的思考耗时（ms），生成结束后优先展示 */
  durationMs?: number;
  className?: string;
}

/** 把毫秒格式化为「12 秒」「1 分 05 秒」 */
const formatDuration = (ms: number): string => {
  const total = Math.max(0, Math.round(ms / 1000));
  if (total < 60) return tpl('{n} 秒', { n: total });
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return tpl('{m} 分 {s} 秒', { m: min, s: String(sec).padStart(2, '0') });
};

const ThinkingPanel = ({ reasoning, live = false, startedAt, durationMs, className }: ThinkingPanelProps) => {
  const t = useT();
  const bodyId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  // 默认展开（首次出现即能看到推理过程），用户可随时手动折叠
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  // 思考中的计时（每 500ms 刷新一次，足够顺滑且不浪费渲染）
  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(timer);
  }, [live]);

  // 流式追加时自动跟随到底部（仅在展开时）
  useEffect(() => {
    if (!open || !live) return;
    const el = contentRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [reasoning, open, live]);

  const elapsed = durationMs && durationMs > 0
    ? durationMs
    : live && startedAt
      ? Math.max(0, now - startedAt)
      : 0;

  const copy = async () => {
    if (!reasoning) return;
    try {
      await navigator.clipboard.writeText(reasoning);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 剪贴板不可用时忽略 */
    }
  };

  return (
    <div className={cn('mb-2.5 border border-warning/30 bg-warning/5 text-xs', className)}>
      <div className="flex items-center gap-1 px-3 py-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={bodyId}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <Brain className={cn('h-3.5 w-3.5 shrink-0 text-warning', live && 'animate-pulse')} />
          <span className="shrink-0 font-medium text-warning">{t('思考过程')}</span>

          {live ? (
            <span className="flex items-center gap-1 text-[11px] text-warning/80">
              <Loader2 className="h-3 w-3 shrink-0 animate-spin" />
              {elapsed > 0 ? t('思考中 · ') + formatDuration(elapsed) : t('正在思考…')}
            </span>
          ) : (
            elapsed > 0 && (
              <span className="shrink-0 text-[11px] text-muted-foreground">
                {t('用时 ')}{formatDuration(elapsed)}
              </span>
            )
          )}

          {reasoning.length > 0 && (
            <span className="shrink-0 text-[10px] text-muted-foreground">{t('· ')}{reasoning.length}{t(' 字')}</span>
          )}

          <ChevronDown
            className={cn(
              'ml-auto h-4 w-4 shrink-0 text-warning/70 transition-transform duration-[var(--duration-fast)]',
              open && 'rotate-180',
            )}
          />
        </button>

        {reasoning.length > 0 && (
          <button
            type="button"
            onClick={() => void copy()}
            className="flex shrink-0 items-center gap-1 px-1 py-0.5 text-[11px] text-muted-foreground transition-colors duration-[var(--duration-fast)] hover:text-foreground"
            aria-label={t('复制思考过程')}
            title={t('复制思考过程')}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-success" />
                {t('已复制')}
              </>
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        )}
      </div>

      {open && (
        <div
          id={bodyId}
          ref={contentRef}
          className="max-h-64 overflow-y-auto border-t border-warning/20 px-3 py-2 leading-relaxed whitespace-pre-wrap text-muted-foreground"
        >
          {reasoning || <span className="text-warning/70">{t('模型正在整理思路，稍等片刻…')}</span>}
          {live && reasoning.length > 0 && (
            <span className="ml-0.5 inline-block h-3 w-1 translate-y-0.5 animate-pulse bg-warning/70 align-baseline" />
          )}
        </div>
      )}
    </div>
  );
};

export default ThinkingPanel;

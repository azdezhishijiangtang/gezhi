import { useState } from 'react';
import { Lightbulb, ListOrdered, Check, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger } from '@/components/MotionPrimitives';
import MathText, { InlineMathText } from './MathText';
import { useT } from '@/i18n/LocaleContext';
import { tpl } from '@/i18n/translate';
import type { Problem } from '@/types';

const difficultyLabel: Record<number, { text: string; className: string }> = {
  1: { text: '基础', className: 'bg-success/12 text-success border-success/30' },
  2: { text: '中等', className: 'bg-warning/12 text-warning border-warning/30' },
  3: { text: '较难', className: 'bg-destructive/12 text-destructive border-destructive/30' },
};

interface ProblemCardProps {
  problem: Problem;
  /** 显示关联知识点链接 */
  showTopicLink?: boolean;
}

const ProblemCard = ({ problem, showTopicLink = true }: ProblemCardProps) => {
  const t = useT();
  const [hintsShown, setHintsShown] = useState(0);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);

  const diff = difficultyLabel[problem.difficulty];

  return (
    <article
      id={`problem-${problem.id}`}
      className="border border-border bg-card scroll-mt-24"
    >
      {/* 题头 */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4 sm:px-6">
        <Badge variant="outline" className={`${diff.className} font-medium`}>
          {t(diff.text)}
        </Badge>
        <h3 className="font-serif text-base font-semibold flex-1 min-w-0"><InlineMathText escape text={problem.title} /></h3>
        {showTopicLink && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Tag className="h-3 w-3" />
            {problem.tags.join(' · ')}
          </span>
        )}
      </div>

      {/* 题目 */}
      <div className="px-5 py-5 sm:px-6">
        <p className="text-xs font-semibold text-muted-foreground mb-2 tracking-wide">{t('题目')}</p>
        <MathText escape content={problem.question} className="text-[0.95rem]" />

        {/* 操作区 */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHintsShown((n) => (n >= problem.hints.length ? 0 : n + 1))}
            className="gap-1.5"
            disabled={problem.hints.length === 0}
            aria-expanded={hintsShown > 0}
            aria-controls={`hints-${problem.id}`}
          >
            <Lightbulb className="h-3.5 w-3.5" />
            {problem.hints.length === 0
              ? t('暂无提示')
              : hintsShown >= problem.hints.length
                ? t('收起提示')
                : hintsShown === 0
                  ? t('查看提示')
                  : tpl('再看下一条（{a}/{b}）', { a: hintsShown, b: problem.hints.length })}
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setSolutionOpen((v) => !v);
              if (!solutionOpen) setHintsShown(problem.hints.length);
            }}
            className="gap-1.5 bg-info text-info-foreground hover:bg-info/90"
            aria-expanded={solutionOpen}
            aria-controls={`solution-${problem.id}`}
          >
            <ListOrdered className="h-3.5 w-3.5" />
            {solutionOpen ? t('收起完整解答') : t('查看完整解答')}
            {solutionOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>
        </div>

        {/* 分步提示（渐进揭示） */}
        {hintsShown > 0 && (
          <Stagger id={`hints-${problem.id}`} className="mt-4 border-l-2 border-warning/60 bg-warning/8 py-3 pl-4 pr-4" stagger={0.08}>
            <p className="text-xs font-semibold text-warning mb-2">{t('思路提示')}</p>
            <ol className="space-y-2">
              {problem.hints.slice(0, hintsShown).map((hint, idx) => (
                <FadeIn key={idx} className="text-sm text-foreground/90 leading-relaxed flex gap-2">
                  <span className="font-mono text-xs text-warning shrink-0 mt-0.5">{t('提示 ')}{idx + 1}</span>
                  <MathText escape content={hint} className="flex-1 [&_p]:my-0" />
                </FadeIn>
              ))}
            </ol>
            {hintsShown < problem.hints.length && (
              <p className="mt-2 text-xs text-muted-foreground">
                {tpl('还有 {n} 条提示，先自己想一想', { n: problem.hints.length - hintsShown })}
              </p>
            )}
          </Stagger>
        )}

        {/* 完整解答 */}
        {solutionOpen && (
          <div id={`solution-${problem.id}`} className="mt-5 border-t border-border pt-5">
            <p className="text-xs font-semibold text-info mb-4 tracking-wide">{t('完整解答')}</p>
            <Stagger className="space-y-5" stagger={0.1}>
              {problem.solution.map((step, idx) => (
                <FadeIn key={idx} className="relative pl-9">
                  <span className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center bg-info/10 text-info font-mono text-xs font-semibold">
                    {idx + 1}
                  </span>
                  <p className="font-medium text-sm mb-1.5"><InlineMathText escape text={step.title} /></p>
                  <MathText escape content={step.detail} className="text-sm text-foreground/90" />
                </FadeIn>
              ))}
            </Stagger>

            {/* 最终答案 */}
            <div className="mt-6">
              {answerOpen ? (
                <FadeIn className="flex items-start gap-3 border border-success/40 bg-success/8 px-4 py-3.5">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-success mb-1">{t('最终答案')}</p>
                    <MathText escape content={problem.answer} className="text-sm font-medium [&_p]:my-0" />
                  </div>
                </FadeIn>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAnswerOpen(true)}
                  className="gap-1.5 border-success/40 text-success hover:bg-success/8 hover:text-success"
                >
                  <Check className="h-3.5 w-3.5" />
                  {t('显示最终答案')}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProblemCard;

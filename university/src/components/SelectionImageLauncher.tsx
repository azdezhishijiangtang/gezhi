/**
 * 全局「选中文字 → 生成示意图」：
 * 右下角（AI 答疑按钮上方）常驻一枚浮动按钮——选中任意文字后它会高亮，
 * 点击即用你存档的 API 模型把选中内容生成一张矢量示意图（SVG），
 * 可在线预览并下载 SVG / PNG。
 * 采用"模型无关"技能：让任意文本模型绘制自包含 SVG，前端渲染。
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  Loader2,
  RefreshCw,
  Download,
  Copy,
  ImageDown,
  Image as ImageIcon,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useT } from '@/i18n/LocaleContext';
import { tpl, translate } from '@/i18n/translate';
import {
  streamChat,
  readAiProfiles,
  readProfileConfig,
  getActiveProfile,
  describeAiError,
  AI_PROFILE_LABELS,
  type AiProfile,
} from '@/lib/ai';
import {
  buildSvgSystemPrompt,
  buildSvgUserPrompt,
  extractSvg,
  sanitizeSvg,
  svgToPngBlob,
  downloadBlob,
  svgFilenameBase,
  detectKind,
  DIAGRAM_KIND_LABELS,
  type DiagramKind,
} from '@/lib/textImage';

const isSet = (p: AiProfile | null) =>
  Boolean(p && p.baseUrl && p.apiKey && p.model);
const profileLabel = (p: AiProfile | null, i: number) =>
  p?.name ? `${p.name}（${p.model}）` : `${AI_PROFILE_LABELS[i]} · ${p?.model ?? translate('未配置')}`;

const SelectionImageLauncher = () => {
  const t = useT();
  // 当前有效文字选区（用于按钮高亮；点击时以实时选区为准）
  const [selText, setSelText] = useState('');
  // AI 答疑面板展开时避让（AskAiWidget 会在 body 上打 data-ask-ai-open 标记）
  const [askAiOpen, setAskAiOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  // 弹窗内状态
  const [kind, setKind] = useState<DiagramKind>('auto');
  const [modelIndex, setModelIndex] = useState(0);
  const [svg, setSvg] = useState<string | null>(null);
  const [svgBlobUrl, setSvgBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const autoRan = useRef(false);
  // 生成请求的取消与序号保护：旧流/重试不得覆盖新结果
  const abortRef = useRef<AbortController | null>(null);
  const runSeqRef = useRef(0);

  // 预览改用 <img src=blob:>：浏览器加载 SVG 图片时不执行其中的脚本，
  // 从根本上杜绝 SVG 注入（比 sanitize 黑名单更可靠）；下载/复制仍用原始 SVG。
  useEffect(() => {
    if (!svg) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 依据 svg 派生预览用 blob URL，属于资源生命周期同步
      setSvgBlobUrl(null);
      return;
    }
    const url = URL.createObjectURL(
      new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }),
    );
    setSvgBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [svg]);

  // 组件卸载时取消未完成的生成请求
  useEffect(() => () => abortRef.current?.abort(), []);

  const configuredProfiles = readAiProfiles()
    .map((p, i) => ({ index: i, profile: p }))
    .filter((x) => isSet(x.profile));

  const clearSelection = useCallback(() => {
    try {
      window.getSelection()?.removeAllRanges();
    } catch {
      /* 忽略 */
    }
  }, []);

  // 跟踪当前文字选区（常驻按钮据此高亮；选区无效时置空）
  useEffect(() => {
    const evaluate = () => {
      const sel = window.getSelection();
      const value = sel ? sel.toString().trim() : '';
      if (!sel || sel.rangeCount === 0 || value.length < 2) {
        setSelText('');
        return;
      }
      const range = sel.getRangeAt(0);
      const node = range.commonAncestorContainer;
      const el =
        node.nodeType === Node.ELEMENT_NODE
          ? (node as Element)
          : node.parentElement;
      if (!el || !el.closest('body')) {
        setSelText('');
        return;
      }
      // 输入框 / 可编辑区 / 弹窗内的选择不算
      if (
        el.closest(
          'input, textarea, [contenteditable="true"], [role="dialog"], [data-img-fab]',
        )
      ) {
        setSelText('');
        return;
      }
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        setSelText('');
        return;
      }
      setSelText(value);
    };

    // selectionchange 覆盖鼠标 / 触摸 / 键盘各种选择方式
    document.addEventListener('selectionchange', evaluate);
    return () => document.removeEventListener('selectionchange', evaluate);
  }, []);

  // 监听 AI 答疑面板展开状态（展开时隐藏浮动入口，避免遮挡面板）
  useEffect(() => {
    const read = () => setAskAiOpen(document.body.dataset.askAiOpen === '1');
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-ask-ai-open'],
    });
    return () => obs.disconnect();
  }, []);

  const openDialog = (selected: string) => {
    setText(selected);
    setKind('auto');
    // 默认选一个已配置存档：优先当前生效，否则第一个
    const active = getActiveProfile();
    const idx = configuredProfiles.some((c) => c.index === active)
      ? active
      : configuredProfiles[0]?.index ?? 0;
    setModelIndex(idx);
    setSvg(null);
    setError(null);
    autoRan.current = false;
    setOpen(true);
    clearSelection();
  };

  // 点击常驻按钮：优先取实时选区，其次取跟踪的选区
  const onFabClick = () => {
    let live = '';
    try {
      live = window.getSelection()?.toString().trim() ?? '';
    } catch {
      /* 忽略 */
    }
    const picked = live.length >= 2 ? live : selText;
    if (!picked) {
      toast.info(t('请先在页面上选中一段文字，再点我生成示意图'));
      return;
    }
    openDialog(picked);
  };

  const generate = useCallback(async () => {
    const cfg = readProfileConfig(modelIndex);
    if (!cfg) {
      setError(t('所选存档尚未配置 API Key，请先到 AI 答疑页完成设置。'));
      return;
    }
    // 取消上一次未完成的生成，并取新序号：旧流的 chunk 一律丢弃
    abortRef.current?.abort();
    const seq = ++runSeqRef.current;
    const isCurrent = () => runSeqRef.current === seq;
    const abort = new AbortController();
    abortRef.current = abort;
    setLoading(true);
    setError(null);
    setSvg(null);
    try {
      const messages = [
        { role: 'system' as const, content: buildSvgSystemPrompt() },
        { role: 'user' as const, content: buildSvgUserPrompt(text, kind) },
      ];
      const runOnce = async (extraHint?: string): Promise<string | null> => {
        let acc = '';
        const msgs = extraHint
          ? [...messages, { role: 'user' as const, content: extraHint }]
          : messages;
        for await (const chunk of streamChat(cfg, msgs, abort.signal)) {
          if (!isCurrent()) return null;
          acc += chunk;
          const s = extractSvg(acc);
          if (s) setSvg(sanitizeSvg(s));
        }
        return extractSvg(acc);
      };

      let final = await runOnce();
      // 首次没拿到 SVG：带纠正提示重试一次
      if (isCurrent() && !final) {
        final = await runOnce(
          '上次输出不符合要求。请只返回一个完整的 <svg>…</svg>（含 xmlns 与 viewBox），不要任何解释文字或代码块标记。',
        );
      }
      if (final && isCurrent()) {
        setSvg(sanitizeSvg(final));
      } else if (isCurrent()) {
        setError(t('模型没有返回有效的 SVG，请重试或更换一个模型/存档。'));
      }
    } catch (err) {
      if (isCurrent()) setError(describeAiError(err));
    } finally {
      if (isCurrent()) {
        setLoading(false);
        abortRef.current = null;
      }
    }
  }, [modelIndex, text, kind, t]);

  // 打开后自动生成一次
  useEffect(() => {
    if (open && text && !autoRan.current && configuredProfiles.length > 0) {
      autoRan.current = true;
      void generate();
    }
  }, [open, text, generate, configuredProfiles.length]);

  const onDownloadSvg = () => {
    if (!svg) return;
    downloadBlob(
      new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }),
      `${svgFilenameBase(text)}.svg`,
    );
    toast.success(t('已下载 SVG 矢量图'));
  };

  const onDownloadPng = async () => {
    if (!svg) return;
    try {
      const blob = await svgToPngBlob(svg, 2);
      downloadBlob(blob, `${svgFilenameBase(text)}.png`);
      toast.success(t('已下载 PNG 图片'));
    } catch (e) {
      toast.error(describeAiError(e));
    }
  };

  const onCopy = async () => {
    if (!svg) return;
    try {
      await navigator.clipboard.writeText(svg);
      toast.success(t('已复制 SVG 代码'));
    } catch {
      toast.error(t('复制失败，请手动选择复制'));
    }
  };

  const noProfile = configuredProfiles.length === 0;

  return (
    <>
      {/* 常驻浮动入口：右下角、AI 答疑按钮上方；选中文字时高亮 */}
      <button
        data-img-fab
        onClick={onFabClick}
        onMouseDown={(e) => e.preventDefault()}
        title={
          selText
            ? tpl('把选中文字生成示意图：{s}', {
                s: selText.slice(0, 40) + (selText.length > 40 ? '…' : ''),
              })
            : t('选中一段文字后，点我生成示意图')
        }
        className={`fixed bottom-[5.5rem] right-4 sm:right-6 z-40 flex h-10 items-center gap-1.5 rounded-full border px-4 text-xs font-medium shadow-lg transition-all duration-[var(--duration-fast)] ${
          askAiOpen
            ? 'pointer-events-none opacity-0'
            : selText
              ? 'border-info bg-info text-info-foreground shadow-info/30 ring-2 ring-info/20 hover:bg-info/90'
              : 'border-border bg-card text-muted-foreground shadow-black/5 hover:border-info/50 hover:text-info'
        }`}
      >
        <Sparkles className="h-4 w-4" />
        {t('生成示意图')}
      </button>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!next) abortRef.current?.abort();
          setOpen(next);
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-info" />
              {t('AI 生成示意图')}
            </DialogTitle>
            <DialogDescription>
              {t('用你存档的模型把选中内容画成矢量图（函数曲线 / 受力图 / 电路 / 光路等），可下载 SVG 或 PNG。')}
            </DialogDescription>
          </DialogHeader>

          {/* 选中文字 */}
          <div className="border border-border bg-background px-4 py-3 text-sm leading-relaxed max-h-24 overflow-auto whitespace-pre-wrap">
            {text}
          </div>

          {/* 控件 */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-32">
              <Select value={kind} onValueChange={(v) => setKind(v as DiagramKind)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(DIAGRAM_KIND_LABELS) as DiagramKind[]).map((k) => (
                    <SelectItem key={k} value={k}>
                      {DIAGRAM_KIND_LABELS[k]}
                      {k === 'auto' ? `（${DIAGRAM_KIND_LABELS[detectKind(text)]}）` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-52">
              <Select
                value={String(modelIndex)}
                onValueChange={(v) => setModelIndex(Number(v))}
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
            <Button
              onClick={() => void generate()}
              disabled={loading || noProfile}
              className="bg-info text-info-foreground hover:bg-info/90 gap-1.5"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              {svg ? t('重新生成') : t('生成')}
            </Button>
          </div>

          {noProfile && (
            <p className="text-sm text-muted-foreground">
              {t('还没有可用的 API 存档——请先到 AI 答疑页配置接口与模型。')}
            </p>
          )}

          {error && (
            <div className="border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* 预览 */}
          <div className="border border-border bg-background min-h-[240px] flex items-center justify-center p-3">
            {loading && !svg && (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin text-info" />
                <span className="text-sm">{t('正在绘图…')}</span>
              </div>
            )}
            {svg && (
              <img
                src={svgBlobUrl ?? undefined}
                alt={t('AI 生成的示意图')}
                className="max-w-full h-auto max-h-[55vh]"
              />
            )}
            {!loading && !svg && !error && !noProfile && (
              <span className="text-sm text-muted-foreground">{t('尚未生成')}</span>
            )}
          </div>

          {/* 操作 */}
          {svg && !loading && (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={onDownloadSvg} className="gap-1.5">
                <Download className="h-4 w-4" />
                {t('下载 SVG')}
              </Button>
              <Button variant="outline" size="sm" onClick={() => void onDownloadPng()} className="gap-1.5">
                <ImageDown className="h-4 w-4" />
                {t('下载 PNG')}
              </Button>
              <Button variant="outline" size="sm" onClick={() => void onCopy()} className="gap-1.5">
                <Copy className="h-4 w-4" />
                {t('复制 SVG')}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectionImageLauncher;

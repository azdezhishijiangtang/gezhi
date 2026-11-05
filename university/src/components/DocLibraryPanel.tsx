/**
 * 文档知识库面板：上传 txt/md/pdf/docx → 解析 → 分块入库（IndexedDB）。
 * 答疑时由 useTutorChat 自动检索启用中的文档段落，注入系统上下文（RAG）。
 */
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  Upload,
  FileText,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  FileType2,
  Library,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT, useLocale } from '@/i18n/LocaleContext';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  saveDocument,
  toggleDocument,
  deleteDocument,
  useUserDocs,
  type DocMeta,
} from '@/lib/docLibrary';

const ACCEPTED = '.txt,.md,.markdown,.pdf,.docx';

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

const formatDate = (ts: number): string => {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const DOC_TYPE_HINT: Record<string, string> = {
  pdf: 'PDF',
  docx: 'Word',
  txt: '文本',
  md: 'Markdown',
  markdown: 'Markdown',
};

const docExt = (name: string): string =>
  name.toLowerCase().split('.').pop() ?? '';

interface DocLibraryPanelProps {
  userId: string;
  /** 紧凑模式（悬浮窗内使用） */
  compact?: boolean;
  /** 关闭面板回调（紧凑模式下显示关闭按钮） */
  onClose?: () => void;
}

const DocLibraryPanel = ({ userId, compact = false, onClose }: DocLibraryPanelProps) => {
  const t = useT();
  const { tpl } = useLocale();
  const docs = useUserDocs(userId);
  const [dragging, setDragging] = useState(false);
  const [uploadName, setUploadName] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files);
      if (list.length === 0) return;
      setUploadError(null);
      for (const file of list) {
        setUploadName(file.name);
        setProgress(null);
        try {
          await saveDocument(userId, file, (p) => setProgress(p));
        } catch (err) {
          setUploadError(
            tpl('《{name}》{msg}', {
              name: file.name,
              msg: err instanceof Error ? t(err.message) : t('上传失败'),
            }),
          );
        }
      }
      setUploadName(null);
      setProgress(null);
    },
    [userId, t, tpl],
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) upload(e.dataTransfer.files);
  };

  const totalChunks = docs.reduce((s, d) => s + d.chunkCount, 0);
  const enabledCount = docs.filter((d) => d.enabled).length;

  return (
    <div className={compact ? 'space-y-4' : 'border border-border bg-card p-5 space-y-5'}>
      {/* ── 标题 ── */}
      <div className="flex items-center gap-2">
        <Library className="h-4 w-4 text-info" />
        <h3 className="font-serif text-base font-semibold">{t('我的文档知识库')}</h3>
        {docs.length > 0 && (
          <span className="ml-auto text-xs text-muted-foreground">
            {tpl('{on}/{all} 份参与检索 · {n} 个段落', {
              on: enabledCount,
              all: docs.length,
              n: totalChunks,
            })}
          </span>
        )}
        {compact && onClose && (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label={t('关闭文档面板')}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ── 上传区 ── */}
      <div
        role="button"
        tabIndex={0}
        aria-label={t('上传文档：拖入文件，或按回车键选择文件')}
        onKeyDown={(e) => {
          // 键盘用户按 Enter / 空格触发文件选择
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer border-2 border-dashed px-4 py-6 text-center transition-colors duration-[var(--duration-fast)] outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          dragging
            ? 'border-info bg-info/5'
            : 'border-border hover:border-info/50 hover:bg-secondary/30'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) upload(e.target.files);
            e.target.value = '';
          }}
        />
        {uploadName ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm">
              <Loader2 className="h-4 w-4 animate-spin text-info" />
              <span className="truncate max-w-[220px]">
                {tpl('正在解析《{name}》…', { name: uploadName })}
              </span>
            </div>
            {progress && progress.total > 0 ? (
              <>
                <Progress value={(progress.done / progress.total) * 100} className="h-1.5" />
                <p className="text-xs text-muted-foreground">
                  {tpl('{done} / {total} 页', { done: progress.done, total: progress.total })}
                </p>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">{t('提取文字并分块中…')}</p>
            )}
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-7 w-7 text-muted-foreground/60 mb-2" />
            <p className="text-sm font-medium">{t('拖入文件，或点击上传')}</p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {t('支持 PDF / Word / txt / Markdown，单个不超过 500MB。')}
              <br />
              {t('文件仅在本地浏览器解析并存储，不会上传到任何服务器。')}
            </p>
          </>
        )}
      </div>

      {uploadError && (
        <div className="flex items-start gap-2 border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-xs text-destructive leading-relaxed">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span className="flex-1">{uploadError}</span>
          <button onClick={() => setUploadError(null)} aria-label={t('关闭错误提示')}>
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* ── 文档列表 ── */}
      {docs.length === 0 ? (
        <div className="py-6 text-center">
          <FileType2 className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('还没有上传资料。')}
            <br />
            {t('上传教材、讲义或笔记后，AI 回答时会优先参考你的资料并注明出处。')}
          </p>
        </div>
      ) : (
        <ul className="space-y-2.5">
          {docs.map((doc) => (
            <DocRow
              key={doc.id}
              doc={doc}
              confirming={confirmDeleteId === doc.id}
              onConfirmDelete={() => setConfirmDeleteId(doc.id)}
              onCancelDelete={() => setConfirmDeleteId(null)}
              onDelete={async () => {
                const res = await deleteDocument(userId, doc.id);
                if (!res.ok) {
                  toast.error(res.error ? t(res.error) : t('删除失败'));
                  return;
                }
                setConfirmDeleteId(null);
              }}
              onToggle={(enabled) => toggleDocument(userId, doc.id, enabled)}
            />
          ))}
        </ul>
      )}

      {/* ── 说明 ── */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/50 px-3 py-2.5 leading-relaxed">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-success" />
        <span>
          {t(
            '提问时自动检索与问题最相关的段落注入 AI 上下文；关闭开关可临时让某份资料不参与检索。',
          )}
        </span>
      </div>
    </div>
  );
};

interface DocRowProps {
  doc: DocMeta;
  confirming: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onDelete: () => void;
  onToggle: (enabled: boolean) => void;
}

const DocRow = ({
  doc,
  confirming,
  onConfirmDelete,
  onCancelDelete,
  onDelete,
  onToggle,
}: DocRowProps) => {
  const t = useT();
  const { tpl } = useLocale();
  const ext = docExt(doc.name);
  return (
    <li
      className={`border px-3.5 py-3 transition-opacity duration-[var(--duration-fast)] ${
        doc.enabled ? 'border-border bg-card' : 'border-border/60 bg-muted/30 opacity-60'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <FileText className="h-4 w-4 shrink-0 mt-0.5 text-info" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate" title={doc.name}>
            {doc.name}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {t(DOC_TYPE_HINT[ext] ?? ext.toUpperCase())} · {formatSize(doc.size)} ·{' '}
            {tpl('{n} 个段落', { n: doc.chunkCount })} · {formatDate(doc.addedAt)}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {confirming ? (
            <>
              <Button
                size="sm"
                variant="destructive"
                className="h-7 px-2.5 text-xs"
                onClick={onDelete}
              >
                {t('确认删除')}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs"
                onClick={onCancelDelete}
              >
                {t('取消')}
              </Button>            </>
          ) : (
            <>
              <Switch
                checked={doc.enabled}
                onCheckedChange={onToggle}
                aria-label={doc.enabled ? t('停用该文档') : t('启用该文档')}
              />
              <button
                onClick={onConfirmDelete}
                className="text-muted-foreground hover:text-destructive transition-colors duration-[var(--duration-fast)]"
                aria-label={tpl('删除 {name}', { name: doc.name })}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default DocLibraryPanel;

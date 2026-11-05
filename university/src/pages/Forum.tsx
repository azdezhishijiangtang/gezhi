/** 论坛：综合讨论区 + 课程分区；发帖分享理解/方法/知识与文档附件 */
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { MessagesSquare, Paperclip, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FadeIn } from '@/components/MotionPrimitives';
import MathText from '@/components/MathText';
import { InlineMathText } from '@/components/MathText';
import { useAuth } from '@/lib/AuthContext';
import { useT, useLocale } from '@/i18n/LocaleContext';
import {
  GENERAL_SECTION,
  MAX_ATTACHMENTS,
  addPost,
  addReply,
  deletePost,
  forumSections,
  readAttachment,
  sectionName,
  useForumPosts,
  type ForumAttachment,
  type ForumPost,
} from '@/lib/forum';

const formatTime = (ts: number): string =>
  new Date(ts).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

// 访客匿名 ID：首次生成后持久化到 localStorage，刷新/重进都能认回自己的历史帖
const ANON_ID_KEY = 'principia-forum-anon-id';
const getAnonId = (): string => {
  try {
    const existing = localStorage.getItem(ANON_ID_KEY);
    if (existing) return existing;
  } catch {
    /* localStorage 不可用时退回每次随机 */
  }
  const id = `anon-${Math.random().toString(36).slice(2, 10)}`;
  try {
    localStorage.setItem(ANON_ID_KEY, id);
  } catch {
    /* ignore */
  }
  return id;
};

const Forum = () => {
  const t = useT();
  const { tpl } = useLocale();
  const { user } = useAuth();
  const [anonId] = useState(getAnonId);
  const userId = user?.id ?? anonId;
  const userName = user?.name ?? t('访客');

  const [section, setSection] = useState(GENERAL_SECTION);
  const posts = useForumPosts(section);
  const sections = forumSections();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<ForumAttachment[]>([]);
  const attInputRef = useRef<HTMLInputElement>(null);

  const [openPostId, setOpenPostId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const openPost: ForumPost | undefined = posts.find((p) => p.id === openPostId);

  // 切换帖子时清空回复输入框，避免把上一条帖子的草稿误发到另一条。
  // 直接在事件里清空，不用 effect 监听 openPostId，省掉一次级联渲染。
  const switchPost = (id: string | null) => {
    setOpenPostId(id);
    setReplyText('');
  };

  const pickAttachments = async (files: FileList | null) => {
    if (!files) return;
    const next: ForumAttachment[] = [...attachments];
    for (const f of Array.from(files)) {
      if (next.length >= MAX_ATTACHMENTS) break;
      try {
        next.push({ name: f.name, dataUrl: await readAttachment(f) });
      } catch (err) {
        toast.error(err instanceof Error ? err.message : t('附件读取失败'));
      }
    }
    setAttachments(next);
  };

  const submitPost = () => {
    if (!title.trim() || !content.trim()) {
      toast.error(t('请填写标题与正文'));
      return;
    }
    const res = addPost({
      userId,
      userName,
      sectionId: section,
      title: title.trim(),
      content: content.trim(),
      attachments: attachments.length > 0 ? attachments : undefined,
    });
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success(t('发布成功'));
    setTitle('');
    setContent('');
    setAttachments([]);
    setShowForm(false);
  };

  const submitReply = (postId: string) => {
    if (!replyText.trim()) {
      toast.error(t('回复内容不能为空'));
      return;
    }
    const res = addReply(postId, { userId, userName, content: replyText.trim() });
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setReplyText('');
    toast.success(t('回复成功'));
  };

  const renderAttachments = (atts: ForumAttachment[]) => (
    <div className="mt-3 flex flex-wrap gap-2">
      {atts.map((a, i) => (
        <a
          key={i}
          href={a.dataUrl}
          download={a.name}
          className="flex items-center gap-1.5 border border-border bg-secondary px-2.5 py-1.5 text-xs text-muted-foreground hover:text-info"
        >
          <Paperclip className="h-3.5 w-3.5" />
          {a.name}
        </a>
      ))}
    </div>
  );

  return (
    <div className="container py-10 lg:py-14">
      <FadeIn>
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide text-info">
          <MessagesSquare className="h-4 w-4" />
          {t('学习论坛')}
        </p>
        <h1 className="font-serif text-3xl font-semibold">{t('交流区')}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t('分课程讨论 + 综合讨论区：分享对各门课的理解、学习方法与学到的知识，支持 LaTeX 公式与文档/图片附件。')}
        </p>
      </FadeIn>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* 分区侧栏 */}
        <aside className="lg:col-span-3">
          <div className="border border-border bg-card">
            <div className="border-b border-border px-4 py-3 text-sm font-semibold">{t('版块')}</div>
            <nav className="p-2">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setSection(sec.id);
                    switchPost(null);
                  }}
                  className={`block w-full px-2.5 py-2 text-left text-sm transition-colors ${
                    section === sec.id
                      ? 'bg-info/10 font-medium text-info'
                      : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                  }`}
                >
                  {t(sec.name)}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* 主区 */}
        <div className="lg:col-span-9 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-serif text-xl font-semibold">{t(sectionName(section))}</h2>
            <Button size="sm" className="gap-1.5 bg-info text-info-foreground hover:bg-info/90" onClick={() => setShowForm((v) => !v)}>
              {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {t('发帖')}
            </Button>
          </div>

          {showForm && (
            <FadeIn className="mt-4 border border-border bg-card p-5">
              <div className="space-y-1.5">
                <Label htmlFor="forum-title" className="text-xs text-muted-foreground">{t('标题 *')}</Label>
                <Input id="forum-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('一句话概括你的分享/提问')} />
              </div>
              <div className="mt-3 space-y-1.5">
                <Label htmlFor="forum-content" className="text-xs text-muted-foreground">{t('正文 *（支持 Markdown 与 LaTeX 公式）')}</Label>
                <Textarea
                  id="forum-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  placeholder={
                    t('分享你的学习方法、对某个知识点的理解，或提出问题……\n\n例如：我这样理解 ') +
                    '$\\epsilon-\\delta$' +
                    t(' 语言……')
                  }
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <input
                  ref={attInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    pickAttachments(e.target.files);
                    e.target.value = '';
                  }}
                />
                <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => attInputRef.current?.click()}>
                  <Paperclip className="h-4 w-4" />
                  {t('添加附件（≤2MB/个）')}
                </Button>
                <span className="text-xs text-muted-foreground">{attachments.length}/{MAX_ATTACHMENTS}</span>
                <Button className="ml-auto" onClick={submitPost}>{t('发布')}</Button>
              </div>
              {attachments.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {attachments.map((a, i) => (
                    <span key={i} className="relative flex items-center gap-1 border border-border bg-secondary px-2 py-1 text-xs">
                      <Paperclip className="h-3 w-3" />
                      {a.name}
                      <button onClick={() => setAttachments((prev) => prev.filter((_, j) => j !== i))} aria-label={tpl('移除附件 {name}', { name: a.name })}>
                        <X className="h-3 w-3 text-destructive" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </FadeIn>
          )}

          {/* 帖子列表 / 详情 */}
          <div className="mt-5 space-y-4">
            {openPost ? (
              <div className="border border-border bg-card">
                <div className="border-b border-border px-5 py-4">
                  <button onClick={() => switchPost(null)} className="text-xs text-info hover:underline">
                    ← {t('返回列表')}
                  </button>
                  <h3 className="mt-2 font-serif text-xl font-semibold">
                    <InlineMathText escape text={openPost.title} />
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {openPost.userName} · {formatTime(openPost.createdAt)} · {t(sectionName(openPost.sectionId))}
                  </p>
                </div>
                <div className="p-5">
                  <MathText escape content={openPost.content} className="text-sm" />
                  {openPost.attachments && renderAttachments(openPost.attachments)}
                  {openPost.userId === userId && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-4 gap-1.5 text-destructive hover:text-destructive"
                      onClick={() => {
                        if (deletePost(openPost.id, userId)) {
                          switchPost(null);
                          toast.success(t('已删除'));
                        }
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {t('删除本帖')}
                    </Button>
                  )}
                </div>
                <div className="border-t border-border px-5 py-4">
                  <p className="text-sm font-semibold">{tpl('{n} 条回复', { n: openPost.replies.length })}</p>
                  <div className="mt-3 space-y-3">
                    {openPost.replies.map((r) => (
                      <div key={r.id} className="border-l-2 border-info/30 pl-3">
                        <p className="text-xs text-muted-foreground">
                          {r.userName} · {formatTime(r.createdAt)}
                        </p>
                        <div className="mt-1 text-sm">
                          <MathText escape content={r.content} className="text-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={2}
                      placeholder={t('写下你的回复……')}
                    />
                    <Button className="shrink-0 self-end" onClick={() => submitReply(openPost.id)}>
                      {t('回复')}
                    </Button>
                  </div>
                </div>
              </div>
            ) : posts.length === 0 ? (
              <div className="border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
                {t('本版块还没有帖子，点右上角「发帖」分享你的第一篇理解吧。')}
              </div>
            ) : (
              posts.map((p) => (
                <FadeIn key={p.id}>
                  <button
                    onClick={() => switchPost(p.id)}
                    className="group block w-full border border-border bg-card p-4 text-left transition-colors hover:border-info/50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="min-w-0 truncate font-serif text-base font-semibold group-hover:text-info">
                        <InlineMathText escape text={p.title} />
                      </h3>
                      <span className="shrink-0 text-xs text-muted-foreground">{tpl('{n} 回复', { n: p.replies.length })}</span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                      <InlineMathText escape text={p.content.slice(0, 160)} />
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {p.userName} · {formatTime(p.createdAt)}
                      {p.attachments && p.attachments.length > 0 ? ` · ${tpl('{n} 个附件', { n: p.attachments.length })}` : ''}
                    </p>
                  </button>
                </FadeIn>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { BookOpen, FileQuestion, Search } from 'lucide-react';
import { InlineMathText } from '@/components/MathText';
import { searchAll, searchCourses } from '@/lib/mathSearch';
import { useSubject } from '@/lib/SubjectContext';
import { useT } from '@/i18n/LocaleContext';

interface CommandSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** 命令面板式全文搜索：知识点 + 例题 + 课程 */
const CommandSearch = ({ open, onOpenChange }: CommandSearchProps) => {
  const t = useT();
  const navigate = useNavigate();
  const { subject } = useSubject();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return { topics: [], problems: [], courses: [] };
    const r = searchAll(query, 8, subject);
    return {
      courses: searchCourses(query, subject),
      topics: r.topics.map((h) => h.topic),
      problems: r.problems.map((h) => h.problem),
    };
  }, [query, subject]);

  const totalCount =
    results.courses.length + results.topics.length + results.problems.length;

  const go = (path: string) => {
    onOpenChange(false);
    setQuery('');
    navigate(path);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 gap-0 max-w-2xl" aria-describedby={undefined}>
        <DialogTitle className="sr-only">{t('搜索知识点与例题')}</DialogTitle>
        <Command shouldFilter={false} loop className="rounded-none">
          <div className="flex items-center border-b border-border px-4">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <CommandInput
              placeholder={t('搜索知识点、例题、课程…（如：泰勒、特征值、贝叶斯）')}
              value={query}
              onValueChange={setQuery}
            />
          </div>

          <CommandList className="max-h-[60vh]">
            {!query.trim() && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                <BookOpen className="mx-auto mb-3 h-8 w-8 opacity-40" />
                {t('输入关键词开始搜索')}
                <p className="mt-1 text-xs">{t('支持知识点标题、章节、例题标签与课程名称')}</p>
              </div>
            )}

            {query.trim() !== '' && totalCount === 0 && (
              <CommandEmpty className="py-12 text-center text-sm text-muted-foreground">
                {t('未找到与「')}{query}{t('」相关的内容')}
              </CommandEmpty>
            )}

            {results.courses.length > 0 && (
              <CommandGroup heading={t('课程')}>
                {results.courses.map((c) => (
                  <CommandItem
                    key={c.id}
                    value={`course-${c.id}`}
                    onSelect={() => go(`/courses/${c.id}`)}
                    className="flex items-center gap-3 px-3 py-2.5 cursor-pointer aria-selected:bg-muted"
                  >
                    <BookOpen className="h-4 w-4 text-info shrink-0" />
                    <span className="font-medium text-sm">{c.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto font-mono">
                      {c.code}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {results.topics.length > 0 && (
              <CommandGroup heading={t('知识点')}>
                {results.topics.map((t2) => (
                  <CommandItem
                    key={t2.id}
                    value={`topic-${t2.id}`}
                    onSelect={() => go(`/topics/${t2.id}`)}
                    className="flex items-start gap-3 px-3 py-2.5 cursor-pointer aria-selected:bg-muted"
                  >
                    <BookOpen className="h-4 w-4 text-info shrink-0 mt-0.5" />
                    <span className="min-w-0">
                      <span className="font-medium text-sm block"><InlineMathText escape text={t2.title} /></span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {t2.chapter}
                      </span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {results.problems.length > 0 && (
              <CommandGroup heading={t('例题')}>
                {results.problems.map((p) => (
                  <CommandItem
                    key={p.id}
                    value={`problem-${p.id}`}
                    onSelect={() => go(`/topics/${p.topicId}#problem-${p.id}`)}
                    className="flex items-start gap-3 px-3 py-2.5 cursor-pointer aria-selected:bg-muted"
                  >
                    <FileQuestion className="h-4 w-4 text-theme-gold shrink-0 mt-0.5" />
                    <span className="min-w-0">
                      <span className="font-medium text-sm block"><InlineMathText escape text={p.title} /></span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {p.tags.join(' · ')}
                      </span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>

          <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground flex justify-between">
            <span>{t('↑↓ 选择 · ↵ 打开 · Esc 关闭')}</span>
            <span>{t('Principia 搜索')}</span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default CommandSearch;

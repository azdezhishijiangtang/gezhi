/**
 * 知识库数据的英文覆盖映射聚合层。
 *
 * 设计原则：中文源数据文件（src/data/**）一字不改；
 * 英文翻译以「按 id 的覆盖映射」形式放在本目录，与源文件一一对应：
 *   dataEn/topics/<源文件名>.ts      →  Record<topicId, Partial<Topic>>
 *   dataEn/problems/<源文件名>.ts     →  Record<problemId, Partial<Problem>>
 *   dataEn/formulas/<源文件名>.ts     →  Record<groupId, Partial<FormulaGroup>>
 *   dataEn/courses.ts                →  Record<courseId, Partial<Course>>
 *
 * 性能：英文数据约 4.6 MB，曾占首包一半。中文是默认语言，绝大多数用户
 * 永远用不到英文覆盖，却被强制下载。因此改为「按需加载」：
 *   - 导出的 4 个映射是**可变对象**，初始为空；localize* 查不到即回退中文，不会白屏。
 *   - 仅当界面处于英文模式时，LocaleProvider 调用 loadEnData() 异步填充。
 *   - 填充用 Object.assign 就地写入，对象引用不变，故 i18n/data.ts 里同步的
 *     localize* 一行都不用改，只靠 enVersion 触发一次重渲染即可。
 *   - import.meta.glob 使用非 eager，Vite 会把英文文件拆成独立 chunk；
 *     中文用户的浏览器根本不会发起这些请求。
 */
import type { Course, FormulaGroup, Problem, Topic } from '@/types';

type Map<T> = Record<string, Partial<T>>;
type Loader<T> = () => Promise<{ default?: Map<T> }>;

/** 可变映射：初始为空，英文数据加载后就地填充（引用保持不变） */
export const topicEn: Map<Topic> = {};
export const problemEn: Map<Problem> = {};
export const formulaGroupEn: Map<FormulaGroup> = {};
export const courseEn: Map<Course> = {};

const topicMods = import.meta.glob('./topics/*.ts') as Record<string, Loader<Topic>>;
const problemMods = import.meta.glob('./problems/*.ts') as Record<string, Loader<Problem>>;
const formulaMods = import.meta.glob('./formulas/*.ts') as Record<string, Loader<FormulaGroup>>;

async function merge<T>(mods: Record<string, Loader<T>>): Promise<Map<T>> {
  const out: Map<T> = {};
  // 单个翻译文件加载失败不应让整个英文模式失效：跳过它，其余条目仍可用，
  // 缺失的条目自动回退中文，绝不白屏。
  const loaded = await Promise.all(
    Object.values(mods).map((load) => load().catch(() => null)),
  );
  for (const mod of loaded) {
    if (mod?.default) Object.assign(out, mod.default);
  }
  return out;
}

let task: Promise<void> | null = null;

/** 加载并填充英文覆盖数据；重复调用复用同一个 Promise，失败后可重试。 */
export function loadEnData(): Promise<void> {
  if (task) return task;
  task = (async () => {
    const [topics, problems, formulas, courses] = await Promise.all([
      merge(topicMods),
      merge(problemMods),
      merge(formulaMods),
      import('./courses').then((m) => m.courseEn as Map<Course>),
    ]);
    Object.assign(topicEn, topics);
    Object.assign(problemEn, problems);
    Object.assign(formulaGroupEn, formulas);
    Object.assign(courseEn, courses);
  })().catch((error) => {
    task = null; // 允许下次重新进入英文模式时重试
    throw error;
  });
  return task;
}

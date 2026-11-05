/**
 * 稳健校验：逐文件尝试解析，捕获截断/语法错误，并报告每个 courseId 的专题数。
 */
import { readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const dir = resolve('src/data/topics');
const files = readdirSync(dir).filter((f) => f.endsWith('.ts'));

const main = async () => {
  for (const f of files.sort()) {
    const file = join(dir, f);
    try {
      const mod: Record<string, unknown> = await import(file);
      const entry = Object.entries(mod).find(([, v]) => Array.isArray(v));
      if (!entry) {
        console.log(`${f}: ✗ 无数组导出`);
        continue;
      }
      const topics = entry[1] as { id: string; courseId: string }[];
      const byCourse: Record<string, number> = {};
      for (const t of topics) byCourse[t.courseId] = (byCourse[t.courseId] ?? 0) + 1;
      const detail = Object.entries(byCourse)
        .map(([c, n]) => `${c}:${n}`)
        .join(' ');
      console.log(`${f}: ✓ ${topics.length} 个 [${detail}]`);
    } catch (err) {
      const msg = err instanceof Error ? err.message.split('\n')[0].slice(0, 100) : String(err);
      console.log(`${f}: ✗ PARSE ERROR ${msg}`);
    }
  }
};
main();

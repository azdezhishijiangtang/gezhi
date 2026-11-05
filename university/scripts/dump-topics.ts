/** 把全部专题数据导出为 JSON 快照（用于转换前后对比） */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const files = [
  'abstract-algebra', 'analytic-geometry', 'calculus', 'combinatorics',
  'complex-analysis', 'differential-geometry', 'discrete-math',
  'functional-analysis', 'linear-algebra', 'mathematical-analysis',
  'mathematical-logic', 'numerical-analysis', 'ode', 'pde', 'probability',
  'real-analysis', 'stochastic-processes', 'topology',
];

const main = async () => {
  const out: Record<string, unknown> = {};
  for (const f of files) {
    const mod: Record<string, unknown> = await import(
      join(here, '..', 'src', 'data', 'topics', `${f}.ts`)
    );
    for (const [k, v] of Object.entries(mod)) {
      if (Array.isArray(v)) out[`${f}.${k}`] = v;
    }
  }
  writeFileSync(process.argv[2], JSON.stringify(out));
  const topics = Object.values(out).flat() as { id: string; content: string }[];
  console.log(`dumped ${topics.length} topics, total content chars: ${topics.reduce((s, t) => s + t.content.length, 0)}`);
};

main();

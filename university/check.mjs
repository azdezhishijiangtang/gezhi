import fs from 'fs';
import path from 'path';

const load = async (file) => {
  const src = fs
    .readFileSync(file, 'utf8')
    .replace(/^import type .*?;$/ms, '')
    .replace(/export const (\w+): \w+\[\] = \[/, 'export const $1 = [');
  const tmp = file.replace(/\.ts$/, '.__check.mjs');
  fs.writeFileSync(tmp, src);
  try {
    const mod = await import(path.resolve(tmp));
    return mod;
  } finally {
    fs.unlinkSync(tmp);
  }
};

const countCn = (s) => (s.match(/[\u4e00-\u9fff]/g) || []).length;
const countH2 = (s) => s.split('\n').filter((l) => l.startsWith('## ')).length;

const files = process.argv.slice(2);
for (const f of files) {
  const mod = await load(f);
  const arr = Object.values(mod)[0];
  console.log('=== ' + f);
  for (const t of arr) {
    const c = t.content ?? '';
    console.log(
      String(t.id).padEnd(22),
      'CN=' + String(countCn(c)).padStart(5),
      'H2=' + String(countH2(c)).padStart(2),
      'tick=' + String((c.match(/`/g) || []).length).padStart(3),
      'bs2=' + String((c.match(/\\\\/g) || []).length).padStart(4),
    );
  }
  if (files.indexOf(f) === files.length - 1) {
    const s = fs.readFileSync(f, 'utf8');
    console.log('FILE ticks:', (s.match(/`/g) || []).length);
  }
}

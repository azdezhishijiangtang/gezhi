import fs from 'fs';

const file = process.argv[2];
let s = fs.readFileSync(file, 'utf8');
s = s.replace(/^import type .*?;$/ms, '').replace(/export const (\w+): \w+\[\] = \[/, 'export const $1 = [');
const tmp = '/tmp/chk_' + Math.random().toString(36).slice(2) + '.mjs';
fs.writeFileSync(tmp, s);
const m = await import(tmp);
fs.unlinkSync(tmp);

const arr = Object.values(m)[0];
for (const t of arr) {
  const c = t.content ?? '';
  const re = /\\+/g;
  let mm;
  const counts = {};
  const samples = [];
  let idx = 0;
  while ((mm = re.exec(c)) !== null) {
    const n = mm[0].length;
    counts[n] = (counts[n] || 0) + 1;
    if (n > 1 && samples.length < 4) samples.push(JSON.stringify(c.slice(Math.max(0, mm.index - 30), mm.index + 30)));
    idx++;
  }
  console.log(String(t.id).padEnd(22), 'runlen:', JSON.stringify(counts));
  samples.forEach((x) => console.log('    ', x));
}

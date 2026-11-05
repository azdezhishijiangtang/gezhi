#!/usr/bin/env node
/**
 * 数据层全量校验脚本（不抽样，逐条校验 src/data 全部数据）：
 *
 *  A. courses       —— 必填字段、枚举合法、id 唯一
 *  B. courseCategories —— id 唯一、引用课程存在
 *  C. topics        —— 必填字段、courseId 引用、relatedProblemIds 引用、
 *                      $ 配对启发式、KaTeX 逐块渲染校验
 *  D. problems      —— 必填字段、topicId/courseId 引用、难度枚举、
 *                      题干/步骤/答案 KaTeX 渲染校验
 *  E. formulas      —— 组与条目 id 全站唯一、courseId 引用、latex KaTeX 渲染校验
 *  F. seedAccounts  —— 手机号/用户名格式与唯一性、哈希格式
 *
 * 用法：node scripts/validate-data.mjs
 * 退出码：0 = 全部通过；1 = 存在 ERROR；2 = 仅 WARN
 */
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import katex from 'katex';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TMP = mkdtempSync(join(tmpdir(), 'mathlens-data-'));

const errors = [];
const warns = [];
const info = [];

const err = (file, msg) => errors.push(`[${file}] ${msg}`);
const warn = (file, msg) => warns.push(`[${file}] ${msg}`);

/* ───────── 1. 打包数据模块（esbuild 处理 TS + @ 别名） ───────── */

const bundle = join(TMP, 'data-bundle.mjs');
try {
  // pnpm 下 esbuild 未链接到 .bin，经 vite 依赖解析后用 Node API 打包
  const require = createRequire(import.meta.url);
  const esbuildPath = require.resolve('esbuild', { paths: [require.resolve('vite')] });
  const { build } = await import(esbuildPath);
  await build({
    stdin: {
      contents: `
        export * from ${JSON.stringify(join(ROOT, 'src/data/courses.ts'))};
        export * from ${JSON.stringify(join(ROOT, 'src/data/topics.ts'))};
        export * from ${JSON.stringify(join(ROOT, 'src/data/problems.ts'))};
        export * from ${JSON.stringify(join(ROOT, 'src/data/formulas.ts'))};
        export * from ${JSON.stringify(join(ROOT, 'src/data/seedAccounts.ts'))};
      `,
      loader: 'ts',
      resolveDir: ROOT,
    },
    bundle: true,
    format: 'esm',
    alias: { '@': join(ROOT, 'src') },
    outfile: bundle,
    logLevel: 'warning',
  });
} catch (e) {
  console.error('✗ esbuild 打包数据模块失败：', e.message);
  process.exit(1);
}

const data = await import(bundle);
const { courses, courseCategories, topics, problems, formulaGroups, SEED_ACCOUNTS } = data;

console.log('═'.repeat(60));
console.log('数据层全量校验');
console.log('═'.repeat(60));

/* ───────── 工具 ───────── */

const isNonEmptyStr = (v) => typeof v === 'string' && v.trim().length > 0;
const isStrArray = (v) => Array.isArray(v) && v.every((x) => typeof x === 'string');

/** 从 Markdown+LaTeX 文本中提取所有公式片段（标注是否块级） */
function extractMath(text) {
  const out = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let m;
  while ((m = re.exec(text)) !== null)
    out.push({ latex: m[1] ?? m[2], display: m[1] !== undefined });
  return out;
}

/** KaTeX 严格渲染校验（返回 null 表示通过） */
function katexCheck(latex, displayMode = false) {
  try {
    katex.renderToString(latex, {
      displayMode,
      throwOnError: true,
      strict: false,
      trust: false,
      output: 'html',
    });
    return null;
  } catch (e) {
    return e.message ?? String(e);
  }
}

/** $ 配对启发式：未转义的 $ 应为偶数（行内公式开闭各一） */
function dollarParity(text) {
  const stripped = text.replace(/\\\$/g, '');
  return (stripped.match(/\$/g) ?? []).length;
}

/** 收集对象中所有字符串字段（含嵌套），逐个做公式提取与 KaTeX 校验 */
function validateTextField(obj, where, label, field) {
  const v = obj?.[field];
  if (typeof v !== 'string' || !v) return 0;
  const parity = dollarParity(v);
  if (parity % 2 !== 0) warn(where, `${label} 中 $ 数量为奇数（${parity}），可能有未闭合公式`);
  let n = 0;
  for (const [i, { latex, display }] of extractMath(v).entries()) {
    const e = katexCheck(latex, display);
    if (e)
      err(where, `${label} 第 ${i + 1} 个公式 KaTeX 渲染失败：${latex.slice(0, 60)}… → ${e}`);
    n++;
  }
  return n;
}

/* ───────── 2. courses ───────── */

{
  const seen = new Map();
  const DIFFS = new Set(['基础', '进阶', '高阶']);
  const SUBJECTS = new Set(['math', 'physics']);
  for (const c of courses) {
    const where = `courses:${c.id}`;
    if (seen.has(c.id)) err(where, `course id 重复`);
    seen.set(c.id, true);
    if (!isNonEmptyStr(c.id)) err('courses', `存在空 id 的课程`);
    if (!isNonEmptyStr(c.name)) err(where, 'name 为空');
    if (!isNonEmptyStr(c.code)) err(where, 'code 为空');
    if (!isNonEmptyStr(c.description)) err(where, 'description 为空');
    if (!isNonEmptyStr(c.icon)) err(where, 'icon 为空');
    if (!DIFFS.has(c.difficulty)) err(where, `difficulty 非法：「${c.difficulty}」`);
    if (c.subject !== undefined && !SUBJECTS.has(c.subject))
      err(where, `subject 非法：「${c.subject}」`);
    if (!isStrArray(c.tags) || c.tags.length === 0) err(where, 'tags 为空或类型错误');
    if (!isNonEmptyStr(c.semester)) err(where, 'semester 为空');
  }
  const math = courses.filter((c) => (c.subject ?? 'math') === 'math').length;
  info.push(`courses：${courses.length} 门（数学 ${math} / 物理 ${courses.length - math}）`);
}

/* ───────── 3. courseCategories ───────── */

{
  const courseIds = new Set(courses.map((c) => c.id));
  const seen = new Set();
  for (const cat of courseCategories) {
    if (seen.has(cat.id)) err(`categories:${cat.id}`, 'category id 重复');
    seen.add(cat.id);
    if (!isNonEmptyStr(cat.name)) err(`categories:${cat.id}`, 'name 为空');
    if (!isNonEmptyStr(cat.description)) err(`categories:${cat.id}`, 'description 为空');
    if (!['math', 'physics'].includes(cat.subject))
      err(`categories:${cat.id}`, `subject 非法：「${cat.subject}」`);
    for (const cid of cat.courseIds ?? []) {
      if (!courseIds.has(cid)) err(`categories:${cat.id}`, `引用不存在的课程：${cid}`);
    }
  }
  // 每门课程至少被一个方向覆盖
  const covered = new Set(courseCategories.flatMap((c) => c.courseIds ?? []));
  for (const c of courses) {
    if (!covered.has(c.id)) warn(`courses:${c.id}`, '未被任何课程方向（category）覆盖');
  }
  info.push(`courseCategories：${courseCategories.length} 个方向`);
}

/* ───────── 4. topics ───────── */

{
  const courseIds = new Set(courses.map((c) => c.id));
  const seen = new Map();
  let mathChecked = 0;
  for (const t of topics) {
    const where = `topics:${t.id}`;
    if (seen.has(t.id)) err(where, 'topic id 重复');
    seen.set(t.id, true);
    if (!isNonEmptyStr(t.courseId)) err(where, 'courseId 为空');
    else if (!courseIds.has(t.courseId)) err(where, `引用不存在的课程：${t.courseId}`);
    if (!isNonEmptyStr(t.chapter)) err(where, 'chapter 为空');
    if (!isNonEmptyStr(t.title)) err(where, 'title 为空');
    if (!isNonEmptyStr(t.summary)) err(where, 'summary 为空');
    if (!isNonEmptyStr(t.content)) err(where, 'content 为空');
    if (!isStrArray(t.keyPoints)) err(where, 'keyPoints 类型错误');
    if (!isStrArray(t.relatedProblemIds)) err(where, 'relatedProblemIds 类型错误');
    for (const pid of t.relatedProblemIds ?? []) {
      if (!problems.some((p) => p.id === pid)) err(where, `relatedProblemIds 引用不存在的例题：${pid}`);
    }
    mathChecked += validateTextField(t, where, 'content', 'content');
    // 其余文本字段（title/summary/keyPoints）也做公式校验
    mathChecked += validateTextField(t, where, 'title', 'title');
    mathChecked += validateTextField(t, where, 'summary', 'summary');
    for (const [i, kp] of (t.keyPoints ?? []).entries())
      mathChecked += validateTextField({ v: kp }, where, `keyPoints[${i}]`, 'v');
  }
  info.push(`topics：${topics.length} 个专题，校验公式片段 ${mathChecked} 处`);
}

/* ───────── 5. problems ───────── */

{
  const topicIds = new Set(topics.map((t) => t.id));
  const courseIds = new Set(courses.map((c) => c.id));
  const topicCourse = new Map(topics.map((t) => [t.id, t.courseId]));
  const seen = new Map();
  let mathChecked = 0;
  for (const p of problems) {
    const where = `problems:${p.id}`;
    if (seen.has(p.id)) err(where, 'problem id 重复');
    seen.set(p.id, true);
    if (!isNonEmptyStr(p.courseId)) err(where, 'courseId 为空');
    else if (!courseIds.has(p.courseId)) err(where, `引用不存在的课程：${p.courseId}`);
    if (!isNonEmptyStr(p.topicId)) err(where, 'topicId 为空');
    else if (!topicIds.has(p.topicId)) err(where, `引用不存在的专题：${p.topicId}`);
    if (p.topicId && topicCourse.get(p.topicId) && topicCourse.get(p.topicId) !== p.courseId)
      err(where, `courseId（${p.courseId}）与所属 topic 的 courseId（${topicCourse.get(p.topicId)}）不一致`);
    if (!isNonEmptyStr(p.title)) err(where, 'title 为空');
    if (![1, 2, 3].includes(p.difficulty)) err(where, `difficulty 非法：${p.difficulty}`);
    if (!isNonEmptyStr(p.question)) err(where, 'question 为空');
    if (!isStrArray(p.hints)) err(where, 'hints 类型错误');
    if (!Array.isArray(p.solution) || p.solution.length === 0) err(where, 'solution 为空');
    else {
      for (const [i, s] of p.solution.entries()) {
        if (!isNonEmptyStr(s.title)) err(where, `solution[${i}].title 为空`);
        if (!isNonEmptyStr(s.detail)) err(where, `solution[${i}].detail 为空`);
      }
    }
    if (!isNonEmptyStr(p.answer)) err(where, 'answer 为空');
    if (!isStrArray(p.tags)) err(where, 'tags 类型错误');

    mathChecked += validateTextField(p, where, 'title', 'title');
    for (const field of ['question', 'answer']) {
      mathChecked += validateTextField(p, where, field, field);
    }
    for (const [i, h] of (p.hints ?? []).entries())
      mathChecked += validateTextField({ v: h }, where, `hints[${i}]`, 'v');
    for (const [si, s] of (p.solution ?? []).entries()) {
      mathChecked += validateTextField(s, where, `solution[${si}].title`, 'title');
      mathChecked += validateTextField(s, where, `solution[${si}].detail`, 'detail');
    }
    for (const [i, tg] of (p.tags ?? []).entries())
      mathChecked += validateTextField({ v: tg }, where, `tags[${i}]`, 'v');
  }
  info.push(`problems：${problems.length} 道例题，校验公式片段 ${mathChecked} 处`);
}

/* ───────── 6. formulas ───────── */

{
  const courseIds = new Set(courses.map((c) => c.id));
  const groupSeen = new Set();
  const formulaSeen = new Set();
  let latexChecked = 0;
  for (const g of formulaGroups) {
    if (groupSeen.has(g.id)) err(`formulas:${g.id}`, '组 id 重复');
    groupSeen.add(g.id);
    if (!isNonEmptyStr(g.name)) err(`formulas:${g.id}`, 'name 为空');
    if (!isNonEmptyStr(g.courseId)) err(`formulas:${g.id}`, 'courseId 为空');
    else if (!courseIds.has(g.courseId)) err(`formulas:${g.id}`, `引用不存在的课程：${g.courseId}`);
    if (!Array.isArray(g.formulas) || g.formulas.length === 0)
      err(`formulas:${g.id}`, 'formulas 为空');
    for (const f of g.formulas ?? []) {
      if (formulaSeen.has(f.id)) err(`formulas:${f.id}`, '公式 id 全站重复');
      formulaSeen.add(f.id);
      if (!isNonEmptyStr(f.group)) err(`formulas:${f.id}`, 'group 为空');
      if (!isNonEmptyStr(f.name)) err(`formulas:${f.id}`, 'name 为空');
      if (!isNonEmptyStr(f.latex)) err(`formulas:${f.id}`, 'latex 为空');
      else {
        const e = katexCheck(f.latex, false);
        if (e) err(`formulas:${f.id}`, `KaTeX 渲染失败：${f.latex.slice(0, 60)}… → ${e}`);
        latexChecked++;
      }
      // name/group 字段也可能含行内公式
      latexChecked += validateTextField(f, `formulas:${f.id}`, 'name', 'name');
      if (typeof f.note === 'string') latexChecked += validateTextField(f, `formulas:${f.id}`, 'note', 'note');
    }
  }
  info.push(`formulas：${formulaGroups.length} 组 / ${formulaSeen.size} 条公式，全部通过 KaTeX 校验 ${latexChecked} 条`);
}

/* ───────── 7. seedAccounts ───────── */

{
  const PHONE_RE = /^1[3-9]\d{9}$/;
  const USERNAME_RE = /^[\u4e00-\u9fa5A-Za-z0-9_]{2,16}$/;
  const phones = new Set();
  const usernames = new Set();
  for (const a of SEED_ACCOUNTS) {
    const where = `seedAccounts:${a.phone}`;
    if (!PHONE_RE.test(a.phone)) err(where, '手机号格式非法');
    if (phones.has(a.phone)) err(where, '手机号重复');
    phones.add(a.phone);
    if (!USERNAME_RE.test(a.username)) err(where, `用户名格式非法：${a.username}`);
    if (usernames.has(a.username.toLowerCase())) err(where, '用户名重复');
    usernames.add(a.username.toLowerCase());
    if (!/^[0-9a-f]{64}$/.test(a.passwordHash)) err(where, 'passwordHash 不是 64 位 hex');
    if (typeof a.createdAt !== 'number' || a.createdAt <= 0) err(where, 'createdAt 非法');
  }
  info.push(`seedAccounts：${SEED_ACCOUNTS.length} 个内置账号`);
}

/* ───────── 8. 汇总 ───────── */

rmSync(TMP, { recursive: true, force: true });

console.log('\n统计：');
for (const line of info) console.log(`  · ${line}`);

if (warns.length > 0) {
  console.log(`\n⚠ WARN（${warns.length} 条）：`);
  for (const w of warns) console.log(`  ${w}`);
}
if (errors.length > 0) {
  console.log(`\n✗ ERROR（${errors.length} 条）：`);
  for (const e of errors) console.log(`  ${e}`);
  console.log('\n结果：未通过');
  process.exit(1);
}
console.log('\n结果：全部通过 ✓');
process.exit(0);

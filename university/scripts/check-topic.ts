/**
 * 专题内容校验：对单个专题数据文件做质量检查。
 * 用法：npx tsx scripts/check-topic.ts src/data/topics/calculus.ts
 *
 * 检查项：
 *  1. 基线中的专题：元信息字段必须与基线一致（防误改）
 *     新增专题：字段结构完整即可（允许新增，不算错误）
 *  2. 文件内 id 不得重复
 *  3. content 长度（< 2500 字警告）
 *  4. $ 符号配对、无 ${ 插值
 *  5. 所有 $...$ / $$...$$ 公式段可被 KaTeX 解析（throwOnError）
 *  6. ## 小节数量（< 5 警告）
 */
import { renderToString } from 'katex';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const file = resolve(process.argv[2]);
const before: Record<string, Record<string, unknown>[]> = JSON.parse(
  readFileSync('/tmp/topics-before.json', 'utf-8'),
);

const main = async () => {
  const mod: Record<string, unknown> = await import(file);
  const entry = Object.entries(mod).find(([, v]) => Array.isArray(v));
  if (!entry) {
    console.error('✗ 文件中未找到专题数组导出');
    process.exit(1);
  }
  const [exportName, topics] = entry as [string, Record<string, unknown>[]];
  const baselineKey = Object.keys(before).find((k) => k.endsWith(`.${exportName}`));
  const baseline = baselineKey ? before[baselineKey] : [];

  let problems = 0;
  let warnings = 0;
  const ids = new Set<string>();

  for (const t of topics) {
    const id = String(t.id);
    const content = String(t.content);
    const base = baseline.find((b) => b.id === id);
    const tag = `[${id}]`;

    // ── 2. id 查重 ──
    if (ids.has(id)) {
      console.error(`✗ ${tag} id 在文件中重复`);
      problems++;
    }
    ids.add(id);

    // ── 1. 元信息校验 ──
    if (base) {
      for (const field of ['courseId', 'chapter', 'title', 'summary', 'keyPoints', 'relatedProblemIds']) {
        if (JSON.stringify(base[field]) !== JSON.stringify(t[field])) {
          console.error(`✗ ${tag} 元信息字段 ${field} 被改动，必须与基线一致`);
          problems++;
        }
      }
    } else {
      // 新增专题：只检查字段结构完整
      for (const field of ['courseId', 'chapter', 'title', 'summary', 'keyPoints', 'relatedProblemIds']) {
        if (t[field] === undefined) {
          console.error(`✗ ${tag} 缺少字段 ${field}`);
          problems++;
        }
      }
      if (!Array.isArray(t.keyPoints) || t.keyPoints.length < 3) {
        console.error(`✗ ${tag} keyPoints 至少 3 条`);
        problems++;
      }
      if (!Array.isArray(t.relatedProblemIds)) {
        console.error(`✗ ${tag} relatedProblemIds 必须是数组（无关联例题时为空数组）`);
        problems++;
      }
    }

    // ── 3. 长度 ──
    if (content.length < 2500) {
      console.warn(`⚠ ${tag} content 仅 ${content.length} 字（目标 ≥ 3000）`);
      warnings++;
    }

    // ── 4. 符号检查 ──
    if (content.includes('${')) {
      console.error(`✗ ${tag} 含 \${ 插值语法（String.raw 中会被解析为插值）`);
      problems++;
    }
    const dollarCount = (content.match(/\$/g) ?? []).length;
    if (dollarCount % 2 !== 0) {
      console.error(`✗ ${tag} $ 符号数量为奇数（${dollarCount}），公式未闭合`);
      problems++;
    }

    // ── 5. KaTeX 解析 ──
    const segments: string[] = [];
    const blockRe = /\$\$([\s\S]+?)\$\$/g;
    let m: RegExpExecArray | null;
    while ((m = blockRe.exec(content)) !== null) segments.push(m[1]);
    const stripped = content.replace(blockRe, '');
    const inlineRe = /\$([^$]+?)\$/g;
    while ((m = inlineRe.exec(stripped)) !== null) segments.push(m[1]);

    for (const tex of segments) {
      try {
        renderToString(tex, { throwOnError: true, strict: false, trust: false, output: 'html' });
      } catch (err) {
        const ctx = tex.length > 60 ? `${tex.slice(0, 60)}…` : tex;
        console.error(`✗ ${tag} 公式解析失败：${ctx}\n    ${err instanceof Error ? err.message.slice(0, 120) : err}`);
        problems++;
      }
    }

    // ── 6. 小节数量 ──
    const h2 = (content.match(/^## /gm) ?? []).length;
    if (h2 < 5) {
      console.warn(`⚠ ${tag} 仅 ${h2} 个 ## 小节（目标 ≥ 6）`);
      warnings++;
    }
  }

  console.log(
    `\n${exportName}: ${topics.length} 个专题 · ${problems} 个错误 · ${warnings} 个警告`,
  );
  if (problems > 0) process.exit(1);
};

main();

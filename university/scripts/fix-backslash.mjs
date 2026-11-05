#!/usr/bin/env node
/**
 * 一次性数据修复脚本（v2，精确区分字符串类型）：
 *
 * src/data 的 topic content 全部使用 String.raw 模板字符串 —— 其中单反斜杠
 * 是正确写法；而 keyPoints / problems 字段 / formulas.latex 等是普通字符串 —— 
 * 单反斜杠 LaTeX 命令会被 JS 转义毁坏（\v→VT、\t→tab、\e→丢反斜杠）。
 *
 * 本脚本：
 *  1. 逐行跟踪是否处于 String.raw 模板内（模板内不做反斜杠修复）
 *  2. 普通字符串域内：单反斜杠 + 字母 → 双反斜杠
 *  3. LaTeX 级修复（两种域都适用，正则兼容单/双反斜杠写法）：
 *     - \text{kg\cdot m}  → \text{kg}\cdot\text{m}（KaTeX \text 内不支持 \cdot）
 *     - W_\max / W_\min   → W_{\max} / W_{\min}（运算符函数不能直接作下标）
 *
 * 保护：跳过注释行与行内双斜杠之后的内容。
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', 'src', 'data');
const dry = process.argv.includes('--dry');

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.ts')) out.push(p);
  }
  return out;
}

const isCommentLine = (line) => {
  const t = line.trim();
  return t.startsWith('*') || t.startsWith('//') || t.startsWith('/*') || t.startsWith('*/');
};

/** 普通字符串域内：单反斜杠 + 字母 → 双反斜杠 */
function fixEscapes(code) {
  let out = '';
  let i = 0;
  while (i < code.length) {
    if (code[i] === '\\') {
      let j = i;
      while (j < code.length && code[j] === '\\') j++;
      const runLen = j - i;
      const next = code[j];
      if (runLen === 1 && /[a-zA-Z]/.test(next ?? '')) {
        out += '\\\\';
        i = j;
        continue;
      }
      out += code.slice(i, j);
      i = j;
      continue;
    }
    out += code[i];
    i++;
  }
  return out;
}

/** \text{A\cdot B} → \text{A}\cdot\text{B}（兼容单/双反斜杠） */
function fixCdotInText(code) {
  return code.replace(
    /(\\{1,2})text\{([^{}]*?)(\\{1,2})cdot([^{}]*?)\}/g,
    '$1text{$2}$3cdot\\text{$4}',
  );
}

/** W_\max / W_\min → W_{\max} / W_{\min} */
function fixMaxMinSubscript(code) {
  return code.replace(/_(\\{1,2})(max|min)(?![a-zA-Z])/g, '_{$1$2}');
}

/** 单行 LaTeX 级修复（raw 与非 raw 域都执行） */
function fixLatex(code) {
  return fixMaxMinSubscript(fixCdotInText(code));
}

let totalChanged = 0;
for (const file of walk(ROOT)) {
  if (file.endsWith('seedAccounts.ts')) continue;
  const src = readFileSync(file, 'utf8');
  const lines = src.split('\n');
  let changed = 0;
  let inRaw = false;

  const fixed = lines.map((line) => {
    if (inRaw) {
      // raw 模板内：只做 LaTeX 级修复，直到遇到闭合反引号
      const tick = line.indexOf('`');
      if (tick === -1) {
        if (fixLatex(line) !== line) changed++;
        return fixLatex(line);
      }
      const rawPart = line.slice(0, tick + 1);
      const rest = line.slice(tick + 1);
      inRaw = false;
      let r = fixLatex(rawPart) + rest;
      if (r !== line) changed++;
      return r;
    }
    if (isCommentLine(line)) return line;
    // 普通行：可能开启 String.raw 模板
    const rawStart = line.indexOf('String.raw`');
    let code, tail;
    if (rawStart !== -1) {
      const after = line.slice(rawStart + 'String.raw`'.length);
      const tick = after.indexOf('`');
      if (tick === -1) {
        // 模板跨行：此行 rawStart 之后进入 raw 域
        code = line.slice(0, rawStart + 'String.raw`'.length);
        tail = '';
        inRaw = true;
        let r = fixLatex(code);
        if (r !== line) changed++;
        return r;
      }
      // 单行内闭合的 raw 模板
      code = line.slice(0, rawStart + 'String.raw`'.length + tick + 1);
      tail = line.slice(rawStart + 'String.raw`'.length + tick + 1);
      let r = fixLatex(code) + tail;
      if (r !== line) changed++;
      return r;
    }
    code = line;
    tail = '';
    let f = fixEscapes(code);
    if (f !== code) changed++;
    f = fixLatex(f);
    return f + tail;
  });

  const result = fixed.join('\n');
  if (result !== src) {
    totalChanged++;
    console.log(`${dry ? '[dry] ' : ''}${file.replace(ROOT + '/', '')}  ${changed} 行`);
    if (!dry) writeFileSync(file, result);
  }
}
console.log(`\n${dry ? '试运行' : '已修复'}：${totalChanged} 个文件`);

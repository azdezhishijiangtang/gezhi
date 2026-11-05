import { useMemo } from 'react';
import katex from 'katex';

/** HTML 转义（用户输入防注入） */
export const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** 渲染 LaTeX 字符串为 HTML */
export const renderMath = (latex: string, displayMode = false): string => {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: false,
      output: 'html',
    });
  } catch {
    return `<code>${escapeHtml(latex)}</code>`;
  }
};

/**
 * 规范化 LaTeX 分隔符：把 \(...\) 与 \[...\] 转成 $...$ / $$...$$。
 * GPT 等很多模型默认输出标准 LaTeX 圆括号 / 方括号定界符，而本站渲染器
 * 只认 $ 定界符；不转换就会整段显示为"乱码"源码。
 * (?<!\\) 负向断言避免误伤 \\[2pt] 这类换行间距命令。
 */
export const normalizeMathDelimiters = (text: string): string =>
  text
    .replace(/(?<!\\)\\\[((?:.|\n)+?)\\\]/g, (_m, inner: string) => `\n\n$$${inner}$$\n\n`)
    .replace(/(?<!\\)\\\(((?:.|\n)+?)\\\)/g, (_m, inner: string) => `$${inner}$`);

/** 预处理：把同一行中的 $$...$$ 块拆分为独立行，避免行内文本被吞入公式 */
const preprocessLines = (text: string): string[] => {
  const out: string[] = [];
  for (const line of text.split('\n')) {
    // 表格行不拆分（表格单元格内仅使用行内公式）
    if (line.trim().startsWith('|') || !line.includes('$$')) {
      out.push(line);
      continue;
    }
    const regex = /\$\$([\s\S]+?)\$\$/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(line)) !== null) {
      if (m.index > last) out.push(line.slice(last, m.index));
      out.push(`$$${m[1]}$$`);
      last = m.index + m[0].length;
    }
    if (last < line.length) out.push(line.slice(last));
  }
  return out;
};

/**
 * 行内解析：**加粗** 与 $公式$ 组合解析（递归实现，任意嵌套均可）。
 * escape=true 时对非公式文本做 HTML 转义（用于不可信输入）。
 */
const parseInline = (text: string, escape = false): string => {
  const plain = (s: string) => (escape ? escapeHtml(s) : s);
  const combined = /\*\*([\s\S]+?)\*\*|\$\$([^$]+?)\$\$|\$([^$]+?)\$/g;
  const out: string[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = combined.exec(text)) !== null) {
    if (m.index > last) out.push(plain(text.slice(last, m.index)));
    if (m[1] !== undefined) {
      // 加粗：内部递归解析（支持加粗内公式、公式内外的其他加粗）
      out.push(`<strong>${parseInline(m[1], escape)}</strong>`);
    } else {
      out.push(renderMath(m[2] ?? m[3], false));
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(plain(text.slice(last)));
  return out.join('');
};

/** 行内渲染：**加粗** 与 $行内公式$（供标题等行内场景使用） */
export const renderInline = (text: string): string => parseInline(normalizeMathDelimiters(text));

/**
 * 用户输入的行内渲染：非公式文本做 HTML 转义，公式段正常渲染。
 * 用于答疑提问、反馈内容等不可信文本。
 */
export const renderUserInline = (text: string): string => {
  const norm = normalizeMathDelimiters(text);
  const mathRegex = /\$\$([^$]+?)\$\$|\$([^$]+?)\$/g;
  const out: string[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = mathRegex.exec(norm)) !== null) {
    if (m.index > last) out.push(escapeHtml(norm.slice(last, m.index)));
    out.push(renderMath(m[1] ?? m[2], false));
    last = m.index + m[0].length;
  }
  if (last < norm.length) out.push(escapeHtml(norm.slice(last)));
  return out.join('');
};

interface InlineMathTextProps {
  /** 含 $...$ 行内公式的纯文本 */
  text: string;
  className?: string;
  /** 用户输入时开启 HTML 转义（默认 false，用于站内可信数据） */
  escape?: boolean;
}

/** 行内公式文本组件：标题、摘要、要点、面包屑等场景的专业排版渲染 */
export const InlineMathText = ({ text, className = '', escape = false }: InlineMathTextProps) => {
  const html = useMemo(() => (escape ? renderUserInline(text) : renderInline(text)), [text, escape]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

/** 块级解析：Markdown + LaTeX 混合 */
const parseBlock = (text: string, escape = false): string => {
  const lines = preprocessLines(normalizeMathDelimiters(text));
  const html: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 空行
    if (line.trim() === '') {
      i++;
      continue;
    }

    // 二级标题
    if (line.startsWith('## ')) {
      html.push(`<h2>${parseInline(line.slice(3), escape)}</h2>`);
      i++;
      continue;
    }

    // 一级标题
    if (line.startsWith('# ')) {
      html.push(`<h1>${parseInline(line.slice(2), escape)}</h1>`);
      i++;
      continue;
    }

    // 三级标题
    if (line.startsWith('### ')) {
      html.push(`<h3>${parseInline(line.slice(4), escape)}</h3>`);
      i++;
      continue;
    }

    // 四级标题
    if (line.startsWith('#### ')) {
      html.push(`<h4>${parseInline(line.slice(5), escape)}</h4>`);
      i++;
      continue;
    }

    // 引用块
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      html.push(`<blockquote>${parseInline(quoteLines.join('<br/>'), escape)}</blockquote>`);
      continue;
    }

    // 表格
    if (line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      const rows = tableLines
        .filter((r) => !/^\|[\s:|-]+\|$/.test(r))
        .map((r) => r.slice(1, -1).split('|').map((c) => c.trim()));
      const thead = rows[0]
        ? `<thead><tr>${rows[0].map((c) => `<th>${parseInline(c, escape)}</th>`).join('')}</tr></thead>`
        : '';
      const tbody = `<tbody>${rows
        .slice(1)
        .map((r) => `<tr>${r.map((c) => `<td>${parseInline(c, escape)}</td>`).join('')}</tr>`)
        .join('')}</tbody>`;
      html.push(`<table>${thead}${tbody}</table>`);
      continue;
    }

    // 无序列表
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(`<li>${parseInline(lines[i].slice(2), escape)}</li>`);
        i++;
      }
      html.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    // 有序列表
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(`<li>${parseInline(lines[i].replace(/^\d+\. /, ''), escape)}</li>`);
        i++;
      }
      html.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    // 独立公式块 $$...$$（单行或多行）
    if (line.trim().startsWith('$$')) {
      const latex = line.trim().slice(2);
      if (latex.endsWith('$$')) {
        html.push(renderMath(latex.slice(0, -2), true));
        i++;
      } else {
        const mathLines = [latex];
        i++;
        while (i < lines.length && !lines[i].trim().endsWith('$$')) {
          mathLines.push(lines[i]);
          i++;
        }
        if (i < lines.length) {
          mathLines.push(lines[i].trim().slice(0, -2));
          i++;
        }
        html.push(renderMath(mathLines.join(' '), true));
      }
      continue;
    }

    // 普通段落（可含行内公式）
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('> ') &&
      !lines[i].startsWith('- ') &&
      !/^\d+\. /.test(lines[i]) &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('$$')
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    // 兜底：无法识别的行强制前进，避免死循环
    if (paraLines.length === 0) {
      html.push(`<p>${parseInline(line, escape)}</p>`);
      i++;
      continue;
    }
    html.push(`<p>${parseInline(paraLines.join(' '), escape)}</p>`);
  }

  return html.join('');
};

interface MathTextProps {
  /** Markdown + LaTeX 混合内容 */
  content: string;
  className?: string;
  /**
   * 对非公式文本做 HTML 转义。
   * 默认 false（站内静态数据已审核）；渲染不可信输入
   * （论坛帖子、错题内容、AI 回答、URL 参数等）必须开启。
   */
  escape?: boolean;
}

/**
 * 渲染 Markdown + LaTeX 混合文本。
 * - $...$  行内公式
 * - $$...$$ 独立公式块
 * - 支持 # / ## / ### / #### 标题、**加粗**、- 列表、1. 列表、> 引用、| 表格 |
 */
const MathText = ({ content, className = '', escape = false }: MathTextProps) => {
  const html = useMemo(() => parseBlock(content, escape), [content, escape]);
  return (
    <div
      className={`prose-math ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MathText;

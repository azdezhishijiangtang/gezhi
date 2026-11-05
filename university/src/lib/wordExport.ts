/**
 * 答疑记录 → Word（.docx）导出。
 *
 * 设计目标（与 PDF 位图方案的根本区别）：
 * 1. 正文全部是真实文本（w:t），在 Word 里可直接选中、修改、排版；
 * 2. 数学公式是 Word 原生 OMML 公式对象（m:oMath），可在 Word 公式编辑器中双击编辑，
 *    而不是截图 / 位图；
 * 3. 版面照搬站内「问题 → 思考过程 → 助教回答 → 参考资料」的呈现顺序，简洁清晰。
 */
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  type IRunPropertiesOptions,
} from 'docx';
// 两个库均为 CJS/UMD：不同打包/运行环境互操作形态不同（可能挂在 default 上），
// 这里统一取默认导出再回退命名空间，保证浏览器与打包后都能拿到函数。
import * as temmlModule from 'temml';
import * as mathml2ommlModule from 'mathml2omml';

const temml = ((temmlModule as { default?: typeof temmlModule }).default ??
  temmlModule) as { renderToString: (tex: string, options?: Record<string, unknown>) => string };

const mathml2omml = ((mathml2ommlModule as { default?: typeof mathml2ommlModule }).default ??
  mathml2ommlModule) as { mml2omml: (mathml: string) => string };
import { normalizeMathDelimiters } from '@/components/MathText';
import type { QaEntry } from '@/lib/qaHistory';

/** 可插入段落的内容：普通文本 run，或原始 OMML 公式对象 */
type Inline = TextRun | { prepForXml: () => unknown };

/**
 * 极简 XML → docx 内部对象树（{ "标签": [ {_attr}, 子节点… ] }）。
 * 不依赖 DOMParser，浏览器 / 打包环境均可工作。
 */
const xmlToDocxObject = (xml: string): Record<string, unknown> => {
  const body = xml.replace(/<\?xml[^>]*\?>/, '').trim();
  const tagRe = /<\/?([A-Za-z_][\w.:-]*)((?:\s+[\w.:-]+\s*=\s*"[^"]*")*)\s*(\/?)>/g;
  const attrRe = /([\w.:-]+)\s*=\s*"([^"]*)"/g;
  const stack: { tag: string; children: unknown[] }[] = [
    { tag: '', children: [] },
  ];
  let pos = 0;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(body)) !== null) {
    const text = body.slice(pos, m.index);
    if (text.trim()) stack[stack.length - 1].children.push(text);
    pos = m.index + m[0].length;
    const tag = m[1];
    if (m[0].startsWith('</')) {
      const el = stack.pop();
      if (el) {
        stack[stack.length - 1].children.push({ [el.tag]: el.children });
      }
    } else {
      const attrs: Record<string, string> = {};
      let a: RegExpExecArray | null;
      while ((a = attrRe.exec(m[2] || '')) !== null) {
        // 命名空间声明交给上层 document.xml 统一声明，节点上不再重复输出
        if (a[1].startsWith('xmlns')) continue;
        attrs[a[1]] = a[2];
      }
      const el = { tag, children: [] as unknown[] };
      if (Object.keys(attrs).length) el.children.push({ _attr: attrs });
      stack.push(el);
      if (m[3] === '/') {
        stack.pop();
        stack[stack.length - 1].children.push({ [tag]: el.children });
      }
    }
  }
  return (stack[0].children[0] as Record<string, unknown>) ?? {};
};

/** LaTeX → 可嵌入 docx 的 Word 原生公式对象（OMML） */
export const latexToOmml = (latex: string): { prepForXml: () => unknown } | null => {
  try {
    const html = temml.renderToString(latex, { throwOnError: false });
    const match = html.match(/<math[\s\S]*?<\/math>/);
    const ommlXml = mathml2omml.mml2omml(match ? match[0] : html);
    if (!ommlXml) return null;
    const obj = xmlToDocxObject(ommlXml);
    return { prepForXml: () => obj };
  } catch {
    // 公式解析失败时降级为纯文本，不影响整篇文档
    return null;
  }
};

/** 文本 + 行内公式 + 加粗 → 段落内容序列 */
const parseInline = (text: string, opts: IRunPropertiesOptions = {}): Inline[] => {
  const items: Inline[] = [];
  // 先 $$...$$ 再 $...$，加粗 **...**
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$|\*\*([\s\S]+?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      const seg = text.slice(last, m.index);
      if (seg) items.push(new TextRun({ ...opts, text: seg }));
    }
    if (m[3] !== undefined) {
      // 加粗：内部继续解析（加粗里可含公式）
      for (const inner of parseInline(m[3], opts)) {
        items.push(
          inner instanceof TextRun
            ? new TextRun({ ...opts, ...{ text: String((inner as unknown as { text: string }).text) }, bold: true })
            : inner,
        );
      }
    } else {
      const latex = (m[1] ?? m[2] ?? '').trim();
      const omml = latexToOmml(latex);
      if (omml) items.push(omml as Inline);
      else if (latex) items.push(new TextRun({ ...opts, text: `$${latex}$` }));
    }
    last = m.index + m[0].length;
  }
  const tail = text.slice(last);
  if (tail) items.push(new TextRun({ ...opts, text: tail }));
  if (items.length === 0) items.push(new TextRun({ ...opts, text: '' }));
  return items;
};

/**
 * 把 Markdown + LaTeX 混合文本解析为 Word 段落序列。
 * 支持 # / ## / ### 标题、- 列表、1. 列表、独立公式块（居中）与普通段落。
 */
const parseBlocks = (text: string): Paragraph[] => {
  const lines = normalizeMathDelimiters(text ?? '').split('\n');
  const paras: Paragraph[] = [];
  let i = 0;
  const headingOf = (line: string): ((typeof HeadingLevel)[keyof typeof HeadingLevel]) | null => {
    if (/^###\s+/.test(line)) return HeadingLevel.HEADING_3;
    if (/^##\s+/.test(line)) return HeadingLevel.HEADING_2;
    if (/^#\s+/.test(line)) return HeadingLevel.HEADING_1;
    return null;
  };
  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();
    if (line === '') {
      i++;
      continue;
    }
    // 独立公式块：整行 $$...$$
    if (/^\$\$[\s\S]+\$\$$/.test(line)) {
      const latex = line.slice(2, -2).trim();
      const omml = latexToOmml(latex);
      paras.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 120 },
          children: (omml ? [omml as Inline] : [new TextRun({ text: `$$${latex}$$` })]) as unknown as TextRun[],
        }),
      );
      i++;
      continue;
    }
    const heading = headingOf(line);
    if (heading !== null) {
      paras.push(
        new Paragraph({
          heading,
          spacing: { before: 200, after: 100 },
          children: parseInline(line.replace(/^#{1,4}\s+/, '')) as unknown as TextRun[],
        }),
      );
      i++;
      continue;
    }
    // 无序 / 有序列表：保留项目符号作为文本前缀，清晰且不依赖编号样式
    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const isOrdered = /^\d+\.\s+/.test(line);
      const marker = isOrdered ? line.replace(/^(\d+)\..*$/, '$1. ') : '• ';
      paras.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          indent: { left: 480 },
          children: [
            new TextRun({ text: marker }),
            ...parseInline(line.replace(/^(?:[-*]|\d+\.)\s+/, '')),
          ] as unknown as TextRun[],
        }),
      );
      i++;
      continue;
    }
    // 普通段落
    paras.push(
      new Paragraph({
        spacing: { before: 60, after: 60, line: 300 },
        children: parseInline(line) as unknown as TextRun[],
      }),
    );
    i++;
  }
  return paras;
};

/** 小号灰色元信息行 */
const metaLine = (text: string): Paragraph =>
  new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 18, color: '666666' })],
  });

/** 小标题（如「问题」「助教回答」） */
const sectionLabel = (text: string): Paragraph =>
  new Paragraph({
    spacing: { before: 180, after: 60 },
    children: [new TextRun({ text, bold: true, size: 24 })],
  });

/** 统一文档骨架：A4 + 页边距 + 中文字体，保证所有导出排版一致、清晰 */
const buildDoc = (children: Paragraph[]): Document =>
  new Document({
    styles: {
      default: {
        document: { run: { font: 'Microsoft YaHei', size: 22 } },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children,
      },
    ],
  });

/** 把多条答疑记录导出为 Word 文档（返回 Blob） */
export const exportQaEntriesToDocx = async (entries: QaEntry[]): Promise<Blob> => {
  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [new TextRun({ text: 'Principia 答疑记录' })],
    }),
    metaLine(`导出时间：${new Date().toLocaleString('zh-CN')}    共 ${entries.length} 条记录`),
  ];

  entries.forEach((e, idx) => {
    const parts: (string | undefined)[] = [];
    if (e.topicTitle) parts.push(`知识点：${e.topicTitle}`);
    if (e.model) parts.push(`模型：${e.model}`);
    if (e.usage) parts.push(`tokens：${e.usage.total}（↑${e.usage.prompt} ↓${e.usage.completion}）`);
    const meta = parts.filter(Boolean).join('    ');

    children.push(
      new Paragraph({
        spacing: { before: 320, after: 80 },
        border: {
          bottom: { style: 'single', size: 6, color: 'BFBFBF', space: 4 },
        },
        children: [new TextRun({ text: `记录 ${idx + 1}`, bold: true, size: 22 })],
      }),
    );
    if (meta) children.push(metaLine(meta));

    // 问题
    children.push(sectionLabel('问题'));
    children.push(
      new Paragraph({
        spacing: { before: 40, after: 120 },
        children: parseInline(normalizeMathDelimiters(e.question ?? '')) as unknown as TextRun[],
      }),
    );

    // 思考过程（若有）
    if (e.thinking?.trim()) {
      children.push(sectionLabel('思考过程'));
      for (const p of parseBlocks(e.thinking)) children.push(p);
    }

    // 助教回答
    children.push(sectionLabel('助教回答'));
    for (const p of parseBlocks(e.answer ?? '')) children.push(p);

    // 参考资料（若有）
    if (e.sources && e.sources.length > 0) {
      children.push(sectionLabel('参考资料'));
      e.sources.forEach((s) => {
        children.push(
          new Paragraph({
            spacing: { before: 40, after: 40 },
            indent: { left: 360 },
            children: [
              new TextRun({ text: `《${s.docName}》`, bold: true, size: 20 }),
              new TextRun({ text: `  ${s.snippet}`, size: 20, color: '555555' }),
            ],
          }),
        );
      });
    }
  });

  return Packer.toBlob(buildDoc(children));
};

/**
 * 学习总结 → Word。传入 1 份即为单份导出，传入多份即为合并导出。
 * 结构与站内一致：每份总结一段，带生成时间 / 所用模型 / 覆盖问题数。
 */
export const exportSummariesToDocx = async (
  summaries: { id: string; createdAt: number; model: string; questionCount: number; content: string }[],
): Promise<Blob> => {
  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [new TextRun({ text: 'Principia 学习总结' })],
    }),
    metaLine(`导出时间：${new Date().toLocaleString('zh-CN')}    共 ${summaries.length} 份`),
  ];

  summaries.forEach((s, idx) => {
    children.push(
      new Paragraph({
        spacing: { before: 320, after: 80 },
        border: { bottom: { style: 'single', size: 6, color: 'BFBFBF', space: 4 } },
        children: [new TextRun({ text: `总结 ${idx + 1}`, bold: true, size: 22 })],
      }),
    );
    children.push(
      metaLine(
        [
          `生成时间：${new Date(s.createdAt).toLocaleString('zh-CN')}`,
          s.model ? `模型：${s.model}` : '',
          `覆盖问题：${s.questionCount} 个`,
        ]
          .filter(Boolean)
          .join('    '),
      ),
    );
    for (const p of parseBlocks(s.content ?? '')) children.push(p);
  });

  return Packer.toBlob(buildDoc(children));
};

/** 专项练习 → Word：题目 + 提示 + 解答，公式可编辑 */
export const exportPracticeToDocx = async (opts: {
  courseName: string;
  level: string;
  problems: { title: string; question: string; hint: string; solution: string }[];
}): Promise<Blob> => {
  const { courseName, level, problems } = opts;
  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [new TextRun({ text: `Principia 专项练习 · ${courseName}` })],
    }),
    metaLine(
      [
        `生成时间：${new Date().toLocaleString('zh-CN')}`,
        `难度：${level}`,
        `题量：${problems.length} 道`,
      ].join('    '),
    ),
  ];

  problems.forEach((p, idx) => {
    children.push(
      new Paragraph({
        spacing: { before: 320, after: 80 },
        border: { bottom: { style: 'single', size: 6, color: 'BFBFBF', space: 4 } },
        children: [new TextRun({ text: `题目 ${idx + 1}\u3000${p.title}`.trimEnd(), bold: true, size: 22 })],
      }),
    );
    for (const para of parseBlocks(p.question)) children.push(para);
    if (p.hint?.trim()) {
      children.push(sectionLabel('提示'));
      for (const para of parseBlocks(p.hint)) children.push(para);
    }
    if (p.solution?.trim()) {
      children.push(sectionLabel('解答'));
      for (const para of parseBlocks(p.solution)) children.push(para);
    }
  });

  return Packer.toBlob(buildDoc(children));
};

/** 知识讲解页 → Word：提要 + 正文（含小节标题与公式）+ 核心要点 */
export const exportTopicToDocx = async (opts: {
  courseName: string;
  topic: { title: string; chapter: string; summary: string; keyPoints: string[]; content: string };
}): Promise<Blob> => {
  const { courseName, topic } = opts;
  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: parseInline(normalizeMathDelimiters(topic.title)) as unknown as TextRun[],
    }),
    metaLine(`${courseName}\u3000·\u3000${topic.chapter}`),
  ];

  if (topic.summary?.trim()) {
    children.push(sectionLabel('提要'));
    children.push(
      new Paragraph({
        spacing: { before: 60, after: 160 },
        children: parseInline(normalizeMathDelimiters(topic.summary)) as unknown as TextRun[],
      }),
    );
  }

  for (const p of parseBlocks(topic.content ?? '')) children.push(p);

  if (topic.keyPoints?.length) {
    children.push(sectionLabel('核心要点'));
    topic.keyPoints.forEach((kp, i) => {
      children.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          indent: { left: 480 },
          children: [
            new TextRun({ text: `${i + 1}. ` }),
            ...(parseInline(normalizeMathDelimiters(kp)) as Inline[]),
          ] as unknown as TextRun[],
        }),
      );
    });
  }

  return Packer.toBlob(buildDoc(children));
};

/**
 * 选中文字 → 生成矢量示意图（SVG）。
 *
 * 用户存档的 API 均为对话/文本模型，无法直接产出位图。
 * 这里用"模型无关"的通用技能：让任意文本模型绘制一张自包含 SVG，
 * 再由前端渲染为矢量图，并支持导出 SVG / PNG。
 * 相比 DALL·E 类艺术图，SVG 坐标精确、标注清晰、可无损缩放，更适合数学/物理插图。
 */

export type DiagramKind = 'auto' | 'math' | 'physics' | 'general';

export const DIAGRAM_KIND_LABELS: Record<DiagramKind, string> = {
  auto: '自动识别',
  math: '数学图像',
  physics: '物理图像',
  general: '通用示意',
};

/** 根据选中文字粗判类型（物理优先，其次数学，否则通用） */
export const detectKind = (text: string): Exclude<DiagramKind, 'auto'> => {
  const t = text || '';
  const phys =
    /力|牛顿|加速度|速度|位移|电场|磁场|电荷|电流|电压|电阻|电容|电路|折射|反射|透镜|干涉|衍射|波长|频率|动量|冲量|功|能量|热力学|熵|量子|重力|引力|受力|压强|浮力|张力|摩擦|矢量|力矩|简谐|振幅|光谱|核|质子|电子|光子|伏特|安培|欧姆/;
  const math =
    /\$\$?|\\frac|\\int|\\sum|\\sqrt|\\lim|导数|微分|积分|极限|函数|方程|矩阵|行列式|特征|几何|三角|坐标|曲线|渐近|概率|分布|方差|期望|集合|拓扑|级数|泰勒|傅里叶|拉普拉斯/;
  if (phys.test(t)) return 'physics';
  if (math.test(t)) return 'math';
  return 'general';
};

const KIND_GUIDE: Record<Exclude<DiagramKind, 'auto'>, string> = {
  math:
    '这是数学内容：画函数图像/几何图形/坐标系。必须画坐标轴（带箭头与刻度）、标明变量与关键点，曲线用平滑 path，渐近线用虚线，关键公式以文本标注。',
  physics:
    '这是物理内容：画准确的物理示意图。受力分析要画带箭头的矢量并标注大小与方向；电路用标准元件符号与连线；光学画光线、法线与界面；波动画正弦曲线并标波长/振幅；场图电力线/磁力线。',
  general:
    '这是通用内容：画一张清晰的概念示意图，用框图、箭头与简短标注表达逻辑关系或结构。',
};

/** 学术插图大师的系统提示词——"不论什么模型都能画好图"的核心技能 */
export const buildSvgSystemPrompt = (): string => `你是一位顶尖的学术插图大师，专门把数学与物理概念画成清晰、准确、专业的矢量示意图。你的唯一产出是一张自包含的 SVG 图片。

硬性要求（必须全部满足）：
1. 只输出一个 <svg ...>...</svg>，根元素必须带 xmlns="http://www.w3.org/2000/svg" 与 viewBox。禁止输出任何解释文字，禁止用 \`\`\` 代码块包裹，禁止在 SVG 之外出现任何字符。
2. 画布宽度约 760，高度按内容取 420~580；背景填纯白 #ffffff 或极浅灰 #f8fafc。风格像严谨的教材插图，简洁、对齐、留白充分。
3. 克制的配色：主色靛蓝 #4f46e5，强调色琥珀 #f59e0b 或玫红 #e11d48，坐标轴/线条 #334155，文字 #0f172a。同类别元素颜色统一。
4. 所有文字用 <text>，font-size 不小于 15；西文与数字用 "Georgia, 'Times New Roman', serif"，中文用系统无衬线体。文本中的 & < > 必须写成 &amp; &lt; &gt;。文字置于元素上层，避免被图形遮挡。
5. 坐标轴用 <defs> 定义箭头 marker 后以 <line>/<path> 绘制，标刻度与变量名（如 x、y、t、θ、F、v）。曲线/轨迹用 <path>，关键点用 <circle> 并在旁注标签与坐标。
6. 布局分层：先背景/网格，再主体图形，最后文字标注。坐标尽量用整数，图形元素居中对齐。
7. 严禁出现：<script>、外链图片或字体、<foreignObject>、动画、任何 onXxx 事件属性。确保 XML 合法、所有标签正确闭合。
8. 公式用普通文本呈现（如 f(x)=x²、∫、Σ、√ 直接用 Unicode 字符或清晰排版），不要依赖外部渲染。`;

/** 构造给模型的用户消息 */
export const buildSvgUserPrompt = (text: string, kind: DiagramKind): string => {
  const resolved: Exclude<DiagramKind, 'auto'> =
    kind === 'auto' ? detectKind(text) : kind;
  return `请把下面这段内容画成一张准确的示意图。${KIND_GUIDE[resolved]}

内容：
"""${text}"""

直接给出 SVG，不要任何额外说明。`;
};

/** 从模型输出中提取完整的 <svg>…</svg>（容忍 ```svg 包裹与前后杂文本） */
export const extractSvg = (raw: string): string | null => {
  if (!raw) return null;
  const start = raw.indexOf('<svg');
  if (start === -1) return null;
  const end = raw.lastIndexOf('</svg>');
  if (end === -1) return null;
  return raw.slice(start, end + 6).trim();
};

/** 净化 SVG：去脚本/事件/外链，供 innerHTML 安全注入 */
export const sanitizeSvg = (svg: string): string =>
  svg
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(xlink:href|href)\s*=\s*("[^"]*"|'[^']*')/gi, (m) =>
      /javascript:|https?:/i.test(m) ? '' : m,
    );

/** 读取 SVG 尺寸（优先 viewBox） */
const svgSize = (svg: string): { w: number; h: number } => {
  const vb = /viewBox\s*=\s*"([^"]+)"/i.exec(svg);
  if (vb) {
    const parts = vb[1].split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      return { w: parts[2], h: parts[3] };
    }
  }
  const w = /width\s*=\s*"([\d.]+)/i.exec(svg);
  const h = /height\s*=\s*"([\d.]+)/i.exec(svg);
  return { w: w ? Number(w[1]) : 760, h: h ? Number(h[1]) : 480 };
};

/** 把 SVG 栅格化为 PNG Blob（2x 清晰度，白底） */
export const svgToPngBlob = async (svg: string, scale = 2): Promise<Blob> => {
  let s = svg.trim();
  if (!/xmlns=/.test(s)) s = s.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  // 去掉固定宽高，让 viewBox 决定比例
  s = s.replace(/(<svg[^>]*?)\s(width|height)\s*=\s*"[^"]*"/gi, '$1');
  const { w, h } = svgSize(svg);
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('SVG 栅格化失败'));
    img.src = url;
  });
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('无法创建画布');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('PNG 导出失败'))), 'image/png'),
  );
};

/** 触发浏览器下载 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // 不要立刻撤销：导出 docx / 大图时，慢设备上浏览器还没真正读完 blob，
  // URL 就先失效会导致下载中断。留足时间，blob 本身不因此多占内存。
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
};

export const svgFilenameBase = (text: string): string => {
  const base = (text || '示意图').replace(/[\\/:*?"<>|\n\r]+/g, '').slice(0, 24);
  return `Principia-${base || '示意图'}`;
};

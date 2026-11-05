/** UI 组件文案英文映射（FeedbackDialog / Footer / ProblemCard / SelectionImageLauncher / ThinkingPanel） */
const dict: Record<string, string> = {
  // ── Footer ──
  '面向大学本科生与考研学生的数学、物理知识解答平台。以清晰的讲解、规范的公式排版与分步详解，陪伴你理解每一个数学与物理概念。':
    'A math and physics Q&A platform for undergraduates and graduate-school candidates. With clear explanations, well-formatted formulas, and step-by-step solutions, we help you understand every concept.',
  '门课程': 'courses',
  '个知识专题': 'topics',
  '学科方向': 'Subjects',
  '学习工具': 'Study Tools',
  '全部课程': 'All Courses',
  '知识检索': 'Knowledge Search',
  '例题广场': 'Problems',
  '公式速查表': 'Formulas',
  'AI 答疑': 'AI Tutor',
  '学习档案': 'Study Archive',
  '支持': 'Support',
  '关于开发者': 'About the Developer',
  '打赏开发者': 'Support the Developer',
  '功能定制共建': 'Custom Feature Co-building',
  '开发者模式': 'Developer Mode',
  '大学数学物理本科知识解答平台': 'Undergraduate Math & Physics Q&A Platform',
  '公式由 KaTeX 渲染 · 内容仅供学习交流': 'Formulas rendered by KaTeX · For study and discussion only',

  // ── ProblemCard ──
  '题目': 'Problem',
  '暂无提示': 'No hints yet',
  '收起提示': 'Hide hints',
  '查看提示': 'Show hints',
  '再看下一条（{a}/{b}）': 'Next hint ({a}/{b})',
  '收起完整解答': 'Hide full solution',
  '查看完整解答': 'Show full solution',
  '思路提示': 'Hints',
  '提示 ': 'Hint ',
  '还有 {n} 条提示，先自己想一想': 'You still have {n} hint(s) — try thinking it through first.',
  '完整解答': 'Full Solution',
  '最终答案': 'Final Answer',
  '显示最终答案': 'Show final answer',

  // ── SelectionImageLauncher ──
  '请先在页面上选中一段文字，再点我生成示意图':
    'Please select some text on the page first, then click me to generate a diagram.',
  '所选存档尚未配置 API Key，请先到 AI 答疑页完成设置。':
    'The selected profile has no API key configured. Please set it up on the AI Tutor page first.',
  '已下载 SVG 矢量图': 'SVG vector image downloaded',
  '已下载 PNG 图片': 'PNG image downloaded',
  '已复制 SVG 代码': 'SVG code copied',
  '复制失败，请手动选择复制': 'Copy failed. Please copy manually.',
  '把选中文字生成示意图：{s}': 'Generate a diagram from the selected text: {s}',
  '选中一段文字后，点我生成示意图': 'Select some text, then click me to generate a diagram',
  '生成示意图': 'Generate Diagram',
  'AI 生成示意图': 'AI Generated Diagram',
  '用你存档的模型把选中内容画成矢量图（函数曲线 / 受力图 / 电路 / 光路等），可下载 SVG 或 PNG。':
    'Use your saved model to turn the selected content into a vector image (function curve / force diagram / circuit / light path, etc.). Downloadable as SVG or PNG.',
  '重新生成': 'Regenerate',
  '生成': 'Generate',
  '还没有可用的 API 存档——请先到 AI 答疑页配置接口与模型。':
    'No usable API profile yet — please configure the endpoint and model on the AI Tutor page first.',
  '正在绘图…': 'Drawing…',
  'AI 生成的示意图': 'AI-generated diagram',
  '尚未生成': 'Not generated yet',
  '下载 SVG': 'Download SVG',
  '下载 PNG': 'Download PNG',
  '复制 SVG': 'Copy SVG',
  '未配置': 'not configured',
  '模型没有返回有效的 SVG，请重试或更换一个模型/存档。':
    'The model did not return a valid SVG. Please retry or switch to another model/profile.',

  // ── ThinkingPanel ──
  '{n} 秒': '{n}s',
  '{m} 分 {s} 秒': '{m}m {s}s',
  '思考过程': 'Thinking Process',
  '思考中 · ': 'Thinking · ',
  '正在思考…': 'Thinking…',
  '用时 ': 'Time ',
  '· ': ' · ',
  ' 字': ' chars',
  '复制思考过程': 'Copy thinking process',
  '已复制': 'Copied',
  '模型正在整理思路，稍等片刻…': 'The model is organizing its thoughts, please wait…',
};

export default dict;

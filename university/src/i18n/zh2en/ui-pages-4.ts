/** Formulas / Knowledge 页面可见文案英文映射 */
const dict: Record<string, string> = {
  // ── Formulas ──
  '数学区': 'Mathematics',
  '物理区': 'Physics',
  '{short}公式速查表': '{short} Formula Cheat Sheet',
  '按课程归类的常用公式集合，考前冲刺与作业速查两相宜。所有公式均由 KaTeX 规范排版。':
    'A course-by-course collection of frequently used formulas—handy for exam cramming and quick homework reference. Every formula is typeset by KaTeX.',
  '前往 {name} 课程 →': 'Go to {name} course →',
  '复制 {name} 的 LaTeX 源码': 'Copy the LaTeX source of {name}',
  '复制失败，请手动选择公式文本': 'Copy failed. Please select the formula text manually.',

  // ── Knowledge ──
  '知识点检索大全': 'Knowledge Base Search',
  '{n} 门{short}课程 · {k} 个知识专题。输入关键词或按课程浏览——每个专题都有完整的定义、定理、方法讲解与 LaTeX 公式推导。':
    '{n} {short} courses · {k} topics. Search by keyword or browse by course—every topic comes with complete definitions, theorems, method explanations and LaTeX derivations.',
  '用自然语言提问也可以：怎么求矩阵的逆 / 钟形曲线 / 抽屉原理 / 点乘…':
    'You can also ask in natural language: how to invert a matrix / bell curve / pigeonhole principle / dot product…',
  '清空搜索': 'Clear search',
  '全部课程': 'All Courses',
  '共': 'Total',
  '个结果': 'results',
  '（关键词「{q}」）': '(keyword "{q}")',
  '没有找到匹配的知识点': 'No matching topics found',
  '换个关键词试试，或去': 'Try another keyword, or go to ',
  'AI 答疑': 'AI Tutor',
  '直接提问。': 'to ask directly.',
  '没找到想学的内容？可以在 AI 答疑中描述你的问题，助教会结合课程知识体系为你讲解。':
    'Can’t find what you want to learn? Describe your question in AI Tutor, and the tutor will explain it within the course knowledge system.',
  '去 AI 答疑': 'Go to AI Tutor',
};

export default dict;

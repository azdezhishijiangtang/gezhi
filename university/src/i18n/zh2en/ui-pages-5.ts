/** 页面可见文案英文映射：仅保留仍在使用的页面词条。 */
const dict: Record<string, string> = {
  // ── 通用词条 ──
  '返回首页': 'Back to Home',
  '全部 {n}': 'All {n}',
  '联系：': 'Contact: ',
  '取消': 'Cancel',
  '回复': 'Reply',
  '已关闭': 'Closed',
  '关闭': 'Close',
  '删除失败': 'Failed to delete',
  '已删除': 'Deleted',
  '删除': 'Delete',
  '课程': 'Course',
  '标题': 'Title',
  '摘要': 'Summary',
  '知识专题': 'Topics',
  '例题': 'Problems',
  '速查公式': 'Quick Formulas',
  '本地内容覆盖': 'Local Content Overrides',
  '其他': 'Other',

  // ── 错题本（Mistakes） ──
  '请填写标题与题目内容': 'Please fill in the title and the problem content',
  '已加入错题本': 'Added to your mistake notebook',
  '图片读取失败': 'Failed to read the image',
  '错题本': 'Mistakes',
  '我的专属错题集': 'My Mistake Notebook',
  '每门课一个独立错题集：AI 专项练习可一键收录，也可以手动录入文字、代码或题目图片。掌握后可标记，随时回顾。':
    'Each course has its own notebook: save AI practice problems in one click, or add text, code, or problem images manually. Mark items as mastered and review them anytime.',
  '手动录入错题': 'Add Mistake Manually',
  '所属课程': 'Course',
  '标题 *': 'Title *',
  '如：中值定理证明题·构造函数失误':
    'e.g. Mean value theorem proof · wrong auxiliary function',
  '题目与错因（支持 Markdown / LaTeX 公式 / ``` 代码块）*':
    'Problem and mistake analysis (Markdown / LaTeX / ``` code blocks supported) *',
  '题目：设 f 在 [0,1] 连续……\n\n我的错解：……\n\n错因：……\n\n```python\n# 代码版错题可粘贴代码\n```':
    'Problem: let f be continuous on [0,1]…\n\nMy attempt: …\n\nMistake: …\n\n```python\n# Paste code here for code-based mistakes\n```',
  '上传题目图片（≤1.5MB/张）': 'Upload problem images (≤1.5MB each)',
  '保存到错题本': 'Save to Notebook',
  '移除图片 {name}': 'Remove image {name}',
  '这个集合还没有错题。去「学习档案」把 AI 练习题一键收录，或点右上角手动录入。':
    'No mistakes in this collection yet. Save AI practice problems in one click from Study Profile, or add one manually from the top right.',
  'AI 练习收录': 'From AI Practice',
  '手动录入': 'Manual',
  '已掌握': 'Mastered',
  '标记掌握': 'Mark Mastered',

  // ── 课程 / 例题 / 公式概览 ──
  '课程总览': 'Course Overview',
  '例题广场': 'Problem Plaza',
  '公式速查表': 'Formula Cheat Sheet',
  '按课程归类的常用公式': 'Common formulas organized by course',
  '继续学习': 'Continue Learning',
};

export default dict;

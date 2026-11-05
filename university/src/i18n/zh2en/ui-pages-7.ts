/** Study（学习档案）页面可见文案英文映射 */
const dict: Record<string, string> = {
  // ── 页头 ──
  '学习档案': 'Study Archive',
  '自由提问': 'Free question',
  '当前账户：': 'Signed in as: ',
  '（{email}）': ' ({email})',
  '。所有 AI 答疑记录按账户沉淀于此。': '. All AI Q&A records are archived here per account.',
  '当前为': 'You are currently in ',
  '游客模式': 'guest mode',
  '，记录保存在本机浏览器。': '. Records are saved in this browser.',
  '登录后': 'Sign in',
  '按账户隔离保存。': ' to keep records separated by account.',

  // ── 统计卡片 ──
  '累计提问': 'Total questions',
  '近 7 天提问': 'Questions in last 7 days',
  '涉及课程': 'Courses covered',
  '最近活跃': 'Last active',

  // ── 页签 ──
  '答疑记录': 'Q&A Records',
  'AI 学习总结': 'AI Study Summary',
  '专项练习生成': 'Practice Generator',

  // ── 答疑记录 ──
  '筛选：': 'Filter:',
  '全部（{n}）': 'All ({n})',
  '{name}（{count}）': '{name} ({count})',
  '当前筛选下没有记录': 'No records under the current filter',
  '导出为可编辑的 Word 文档（公式可在 Word 中编辑）':
    'Export as an editable Word document (formulas editable in Word)',
  '正在导出…': 'Exporting…',
  '导出 Word（{n} 条）': 'Export Word ({n} items)',
  '确定清空全部答疑记录吗？此操作不可恢复。':
    'Clear all Q&A records? This cannot be undone.',
  '清空记录': 'Clear records',
  '还没有答疑记录': 'No Q&A records yet',
  '去': 'Go to ',
  'AI 答疑': 'AI Tutor',
  '问第一个问题吧，记录会自动出现在这里。':
    ' and ask your first question — it will show up here automatically.',
  '本次回答 token 消耗：↑输入 ↓输出': 'Tokens used by this answer: ↑input ↓output',
  '↑{prompt} ↓{completion} · 共 {total} tokens':
    '↑{prompt} ↓{completion} · {total} tokens total',
  '删除这条记录': 'Delete this record',
  '查看思考过程': 'Show reasoning',
  '查看助教回答': 'Show tutor answer',

  // ── AI 学习总结 ──
  '把全部答疑记录交给 AI 分析：归纳问题分布、反推薄弱环节、给出复习路线。记录越多，总结越准确。每次总结都会按时间留存，方便回看进步轨迹。':
    'Hand all your Q&A records to the AI: it summarises the question distribution, infers your weak areas and suggests a review roadmap. The more records, the more accurate the summary. Every summary is archived by time so you can trace your progress.',
  '生成学习总结': 'Generate summary',
  '生成中…': 'Generating…',
  '生成所用模型（选择 API 存档）': 'Model used for generation (choose API profile)',
  '未配置': 'Not configured',
  '{name}（{model}）': '{name} ({model})',
  '{label} · {model}': '{label} · {model}',
  '还没有可用的 API 存档——请先到': 'No API profile available yet — go to ',
  '配置接口与模型，再回来生成总结。':
    ' to set up an endpoint and model, then come back to generate a summary.',
  '暂无记录可总结——先去': 'No records to summarise yet — go to ',
  '积累几个问题吧。': ' and ask a few questions first.',
  '正在输入…': 'Typing…',
  '历史总结留存': 'Summary Archive',
  '（共 {n} 份 · 按时间倒序）': '({n} saved · newest first)',
  '把学习总结导出为可编辑的 Word 文档':
    'Export the study summaries as an editable Word document',
  '导出 Word': 'Export Word',
  '确定清空全部历史总结吗？此操作不可恢复。':
    'Clear all saved summaries? This cannot be undone.',
  '清空全部': 'Clear all',
  '还没有留存任何总结。生成一份后，它会保存在这里，下次打开仍能查看。':
    'No summaries saved yet. Once you generate one, it is stored here and stays available next time.',
  '模型 {model}': 'Model {model}',
  '· 覆盖 {n} 个问题': '· covers {n} questions',
  '删除这份总结': 'Delete this summary',

  // ── 专项练习生成 ──
  'AI 专项练习生成': 'AI Practice Generator',
  '选择课程与难度，AI 结合你的答疑历史生成针对性练习题——先看提示独立思考，再对照完整解答。':
    'Pick a course and difficulty; the AI uses your Q&A history to generate targeted problems — think through the hint first, then check the full solution.',
  '课程': 'Courses',
  '题目数量': 'Number of problems',
  '难度': 'Difficulty',
  '{n} 道': '{n} problems',
  '基础（概念直接应用）': 'Basic (direct application of concepts)',
  '中等（综合运用）': 'Intermediate (combined application)',
  '提高（竞赛/考研风格）': 'Advanced (contest / graduate-exam style)',
  '生成练习题': 'Generate problems',
  '把练习题（含提示与解答）导出为可编辑的 Word 文档':
    'Export the problems (with hints and solutions) as an editable Word document',
  '导出中…': 'Exporting…',
  '【提示】': '[Hint] ',
  '【解答】': '[Solution] ',
  '已加入错题本': 'Added to mistake book',
  '加入错题本': 'Add to mistakes',
  '提示': 'Hint',
  '隐藏解答': 'Hide solution',
  '显示解答': 'Show solution',
  'AI 输出（未按标准格式解析，原文展示）：':
    'AI output (could not parse into the standard format; showing raw text):',

  // ── 底部引导 ──
  '答疑记录来自 AI 答疑页的每一次提问；换个角度复习，可以配合':
    'Q&A records come from every question you ask on the AI Tutor page; to review from another angle, use ',
  '知识点检索': 'Knowledge Search',
  '定位薄弱章节。': ' to locate weak chapters.',
  '去检索知识点': 'Browse knowledge points',

  // ── 导出对话框 ──
  '导出学习总结': 'Export study summaries',
  '勾选要导出的总结，再选择「合并为一个 Word」或「分开导出多个 Word」。':
    'Select the summaries to export, then choose “merge into one Word file” or “export as separate Word files”.',
  '共 {a} 份 · 已选 {b} 份': '{a} saved · {b} selected',
  '取消全选': 'Deselect all',
  '全选': 'Select all',
  '覆盖 {n} 个问题': 'covers {n} questions',
  '合并为一个 Word': 'Merge into one Word',
  '所选总结合并成 1 个文件': 'Combine the selected summaries into one file',
  '分开导出': 'Export separately',
  '每份各 1 个 Word，共 {n} 个文件': 'One Word file each · {n} files in total',
  '取消': 'Cancel',
  '确认导出': 'Confirm export',
  '确认导出（{n} 份）': 'Confirm export ({n})',

  // ── 提示与错误 ──
  '已导出 {n} 条记录为 Word（公式可编辑）':
    'Exported {n} records to Word (formulas editable)',
  '导出失败：{msg}': 'Export failed: {msg}',
  '请先勾选要导出的总结': 'Select at least one summary to export',
  '已导出 1 个合并 Word（含 {n} 份总结）':
    'Exported 1 merged Word file ({n} summaries)',
  '已导出 {n} 个 Word': 'Exported {n} Word files',
  '已导出 Word': 'Exported to Word',
  '「{label}」尚未配置 API Key，请先在 AI 答疑页设置该存档。':
    '“{label}” has no API key yet — set it up on the AI Tutor page first.',
  '尚未配置 API Key，请先在 AI 答疑页完成密钥设置。':
    'No API key configured — set it up on the AI Tutor page first.',
};

export default dict;

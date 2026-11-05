/** Tutor（AI 答疑）与 TopicDetail（知识点详情）页面可见文案英文映射 */
const dict: Record<string, string> = {
  // ── Tutor · 页头 ──
  'AI 答疑': 'AI Tutor',
  '用你自己的 API Key 调用大模型，随问随答。支持分步推导、公式渲染、上传个人资料后基于资料作答，问答自动存入':
    'Call a large model with your own API Key for instant Q&A. Supports step-by-step reasoning and formula rendering; after uploading your own materials it answers based on them, and every Q&A is saved to ',
  '学习档案': 'Study Archive',
  '，可随时回顾、总结与生成练习题。':
    ', where you can review it, get summaries, and generate practice problems anytime.',
  '开启「思考强度」后，回答上方会实时展示模型的思考过程（可折叠、可复制），方便学习 AI 的推理路径。':
    'With "thinking effort" enabled, the model’s reasoning is shown live above each answer (collapsible and copyable), so you can study how the AI reasons.',
  '收起设置': 'Hide Settings',
  '密钥设置': 'API Key Settings',
  '新对话': 'New Chat',

  // ── Tutor · 知识点上下文横幅 ──
  '正在带着知识点提问：': 'Asking with topic context: ',
  '（{name} · {chapter}）': '({name} · {chapter})',
  '清除知识点上下文': 'Clear topic context',

  // ── Tutor · 状态条 ──
  '已接入模型：': 'Model in use: ',
  '本次会话用量：↑{p} / ↓{c} · 共 {t} tokens': 'Session usage: ↑{p} / ↓{c} · {t} tokens total',
  '支持上传图片（≤4 张）与 500MB 内文档':
    'Supports image uploads (up to 4) and documents up to 500MB',

  // ── Tutor · 空状态 ──
  '问点什么吧': 'Ask me anything',
  '可以问概念理解、解题思路、定理证明。':
    'You can ask about conceptual understanding, problem-solving strategies, or theorem proofs.',
  '也可以让我结合「': 'Or have me explain ',
  '」这一节展开讲。': ' in more depth.',
  '先从下面的常见问题开始，或直接在输入框提问。':
    'Start with a common question below, or type your own in the box.',
  ' 有不懂的也可以问我上传的资料。': ' You can also ask about the materials you uploaded.',

  // ── Tutor · 消息头部 ──
  '提问附图': 'Attached image',
  '助教': 'Tutor',
  '自动·': 'Auto·',
  '思考 · {mode}': 'Thinking · {mode}',
  '多路径·{n}路': 'Multi-path·{n} routes',
  '交叉验证·{model}': 'Cross-check·{model}',
  '联动·{model}': 'Linked·{model}',
  '正在检索我的文档…': 'Searching your documents…',
  '正在输入…': 'Typing…',
  '关闭': 'Off',
  '低': 'Low',
  '中': 'Medium',
  '高': 'High',

  // ── Tutor · 思考/自检/多路径面板 ──
  '智能自检': 'Self-Check',
  '多路径推理 · {n} 路独立思路': 'Multi-path reasoning · {n} independent approaches',
  '（经 {model} 仲裁）': '(arbitrated by {model})',
  '思路 {n}': 'Approach {n}',
  '交叉验证 · 模型B（{model}）独立解答': 'Cross-validation · Model B ({model}) independent solution',
  '参考了我的文档 · {n} 个段落（点击展开）':
    'Referenced my documents · {n} passages (click to expand)',
  '《{name}》': '“{name}”',

  // ── Tutor · 消息操作 ──
  '已复制': 'Copied',
  '复制': 'Copy',
  '重新生成': 'Regenerate',
  '用更简单的话解释': 'Explain more simply',
  '举个具体例子': 'Give a concrete example',
  '分步骤教我': 'Teach me step by step',
  '我算错了吗': 'Did I make a mistake?',
  '总结成要点': 'Summarize into key points',

  // ── Tutor · 推荐问题 ──
  '常见问题': 'Common Questions',
  '泰勒展开和洛必达法则有什么区别？什么时候该用哪个？':
    'What is the difference between Taylor expansion and L’Hôpital’s rule? When should I use which?',
  '特征值和特征向量的几何意义是什么？为什么要对角化？':
    'What is the geometric meaning of eigenvalues and eigenvectors? Why diagonalize?',
  '贝叶斯公式为什么是"由果溯因"？能举个生活中的例子吗？':
    'Why is Bayes’ formula "reasoning from effect to cause"? Can you give an everyday example?',
  '一致收敛和逐点收敛到底差在哪里？为什么积分号下取极限要一致收敛？':
    'What exactly is the difference between uniform and pointwise convergence? Why does taking a limit under the integral sign require uniform convergence?',
  '留数定理是怎么把困难的实积分变成找极点的？':
    'How does the residue theorem turn a difficult real integral into finding poles?',
  '伽罗瓦理论为什么能证明五次方程没有根式解？':
    'Why does Galois theory prove that the quintic has no solution by radicals?',

  // ── Tutor · 输入区 ──
  '输入你的数学问题（Enter 发送，Shift+Enter 换行）…':
    'Type your math question (Enter to send, Shift+Enter for a new line)…',
  '请先在右侧配置 API Key': 'Please configure your API Key on the right first',
  '停止生成': 'Stop generating',
  '停止': 'Stop',
  '移除图片 {name}': 'Remove image {name}',
  '添加图片': 'Add image',
  '添加图片（随提问发给多模态模型，最多 4 张）':
    'Add image (sent with your question to the multimodal model, up to 4)',
  '发送': 'Send',
  '是否使用我的文档知识库': 'Whether to use my document knowledge base',
  '使用我的文档知识库作答（{n} 份已启用）':
    'Answer using my document knowledge base ({n} enabled)',
  '上传教材讲义后，可让 AI 参考你的资料作答':
    'After uploading textbooks or lecture notes, the AI can answer with reference to your materials',
  '清空当前对话（不影响已保存的答疑记录）':
    'Clear the current conversation (saved Q&A records are kept)',

  // ── Tutor · 使用说明 / 学习档案卡片 ──
  '使用说明': 'How to Use',
  '填写任一 OpenAI 兼容服务商的密钥（见右侧预设），保存后即可提问。':
    'Enter an API key from any OpenAI-compatible provider (see the presets on the right); save it and you can start asking.',
  '在任意知识点页点击"问 AI"，会自动带上该知识点的上下文。':
    'Click "Ask AI" on any topic page and that topic’s context is attached automatically.',
  '上传教材 / 讲义 / 笔记，提问时自动检索相关段落，AI 会参考你的资料并注明出处。':
    'Upload textbooks / lecture notes / memos; relevant passages are retrieved automatically and the AI cites your materials.',
  '每轮问答自动存入学习档案，可回顾、AI 总结、生成专项练习。':
    'Every Q&A round is saved to your Study Archive for review, AI summaries, and targeted practice.',
  '答疑历史按账户沉淀，AI 可帮你总结薄弱点并生成个性化练习题。':
    'Q&A history accumulates per account; the AI can summarize your weak spots and generate personalized exercises.',
  '打开学习档案': 'Open Study Archive',

  // ── Tutor · 侧栏 · 当前模型 ──
  '当前模型': 'Current Model',
  '已就绪': 'Ready',
  '切换模型（{n} 个可选）': 'Switch model ({n} available)',
  '{model}（当前）': '{model} (current)',
  '服务商实时列表 · 更新于 {age}': 'Provider live list · updated {age}',
  '（已过期）': ' (stale)',
  '内置参考列表（实时拉取失败）': 'Built-in reference list (live fetch failed)',
  '刷新': 'Refresh',
  '当前模型已被服务商退役，建议更换为 {model}':
    'The provider has retired the current model; consider switching to {model}',
  '更换密钥 / 接口存档': 'Change Key / API Profiles',

  // ── TopicDetail ──
  '面包屑': 'Breadcrumb',
  '首页': 'Home',
  '问 AI 讲解这个知识点': 'Ask AI to explain this topic',
  '导出为可编辑的 Word 文档（公式可在 Word 中编辑）':
    'Export as an editable Word document (formulas editable in Word)',
  '导出中…': 'Exporting…',
  '导出 Word': 'Export Word',
  '带着本页上下文提问，问答自动记入学习档案':
    'Ask with this page’s context; Q&A is saved to your Study Archive automatically',
  '正在阅读：': 'Reading: ',
  '（AI 答疑时会结合这一节讲解）': ' (AI Tutor will explain with this section in mind)',
  '清除小节上下文': 'Clear section context',
  '已导出 Word': 'Word exported',
  '导出失败：{msg}': 'Export failed: {msg}',
  '本页目录': 'On this page',
  '本页目录（{n} 节）': 'On this page ({n} sections)',
  '问 AI 这一节': 'Ask AI about this section',
  '让 AI 结合「{title}」这一节讲解': 'Ask AI to explain the section “{title}”',
  '核心要点': 'Key Points',
  '本页要点': 'Key Points on This Page',
  '配套例题（{n}）': 'Practice Problems ({n})',
  '建议先读提示独立思考，再对照完整解答核对步骤': 'Read the hints first, think it through, then compare each step with the full solution.',
  '下一个知识点': 'Next topic',
  '上一个知识点': 'Previous topic',
  '所属课程': 'Course',
  '继续学习': 'Continue Learning',
};

export default dict;

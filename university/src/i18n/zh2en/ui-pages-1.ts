/** Index / Courses / CourseDetail / Knowledge / Tutor 页面可见文案英文映射 */
const dict: Record<string, string> = {
  // ── Index ──
  '大学数学物理本科知识解答平台': 'Undergraduate math & physics knowledge Q&A platform',
  '把抽象的数理，': 'Turn abstract math & physics,',
  '看得懂的推理': 'into reasoning you can follow',
  '覆盖数学系与物理系本科核心课程——分析、代数与几何、概率统计、方程与计算，经典物理、理论物理、凝聚态与粒子天体。知识点可检索、例题分步详解、公式规范排版，还有 AI 助教随身答疑。':
    'Covers the core undergraduate curriculum of mathematics and physics—analysis, algebra & geometry, probability & statistics, equations & computation, classical physics, theoretical physics, condensed matter and particle/astrophysics. Topics are searchable, problems are explained step by step, formulas are typeset cleanly, and an AI tutor is always ready to help.',
  '浏览课程': 'Browse Courses',
  'AI 答疑': 'AI Tutor',
  '知识检索': 'Knowledge Search',
  '精选公式 · ': 'Featured Formulas · ',
  '查看全部 {n} 条速查公式': 'View all {n} cheat-sheet formulas',
  '选择你的学科区': 'Choose your subject area',
  '数学区 还是 物理区？': 'Mathematics or Physics?',
  '平台分为数学与物理两大本科知识区，内容、课程、例题与公式互不干扰。点击进入后，全站导航与搜索都会聚焦到对应学科。':
    'The platform is divided into two undergraduate knowledge areas—mathematics and physics—with independent content, courses, problems and formulas. After entering, site-wide navigation and search focus on the chosen subject.',
  '门': '',
  '个': '',
  '道': '',
  '核心课程': 'Core Courses',
  '知识专题': 'Topics',
  '详解例题': 'Solved Problems',
  '速查公式': 'Quick Formulas',
  '课程体系 · ': 'Course System · ',
  '按课程开始学习': 'Start learning by course',
  '查看全部': 'View All',
  '学科版图 · ': 'Subject Map · ',
  '{n} 大方向 · {m} 门课程全貌': '{n} major directions · {m} courses at a glance',
  '共 {n} 个知识专题': 'Total {n} topics',
  '知识专题 · ': 'Topics · ',
  '热门知识专题': 'Popular Topics',
  '全部专题': 'All Topics',
  '该学科内容正在建设中，敬请期待。': 'Content for this subject is coming soon. Stay tuned.',
  '例题精讲 · ': 'Problem Walkthrough · ',
  '精选例题详解': 'Featured Problem Solutions',
  '每道题都提供分步提示与完整解答——先思考，再看答案':
    'Every problem offers step-by-step hints and full solutions—think first, then check the answer.',
  '例题广场': 'Problem Plaza',
  '{n} 步详解': '{n}-step solution',
  '该学科例题正在建设中，敬请期待。': 'Example problems for this subject are coming soon. Stay tuned.',
  '准备好攻克下一个知识点了吗？': 'Ready to tackle your next topic?',
  '从极限到泛函，从牛顿定律到量子力学——{n} 门课程、{k} 个专题系统学，知识点随时检索，公式速查随身带，还有 AI 助教为你答疑解惑。':
    'From limits to functional analysis, from Newton’s laws to quantum mechanics—{n} courses and {k} topics to study systematically, with on-demand search, a pocket formula reference, and an AI tutor to answer your questions.',
  '开始学习': 'Start Learning',
  '公式速查表': 'Formula Cheat Sheet',
  '{blurb}。共 {n} 门课程、{k} 个知识专题。': '{blurb}. A total of {n} courses and {k} topics.',
  '进入{name}': 'Enter {name}',

  // ── Courses ──
  '方向': 'Direction',
  '全部': 'All',
  '筛选': 'Filter',
  '全部课程': 'All Courses',
  '进入课程': 'Enter Course',
  '该标签下暂无课程，试试其他标签吧': 'No courses under this tag—try another one.',
  '查看全部课程': 'View All Courses',
  '{short}课程总览': '{short} Course Overview',
  '共 {n} 门本科{short}课程，横跨{names}，合计 {k} 个知识专题。每门课程按章节组织内容，配套例题详解，支持按方向与标签筛选。':
    'A total of {n} undergraduate {short} courses across {names}, {k} topics in all. Each course is organized by chapter with worked examples, and can be filtered by direction and tag.',
  '{n} 个专题 · {m} 道例题': '{n} topics · {m} problems',

  // ── CourseDetail ──
  '返回课程列表': 'Back to Courses',
  '个知识专题': 'topics',
  '道例题': 'problems',
  '章节目录': 'Chapter Contents',
  '浏览全部例题': 'Browse All Problems',
  '个要点': 'key points',

  // ── Knowledge ──
  '知识点检索大全': 'Knowledge Base Search',
  '{n} 门{short}课程 · {k} 个知识专题。输入关键词或按课程浏览——每个专题都有完整的定义、定理、方法讲解与 LaTeX 公式推导。':
    '{n} {short} courses · {k} topics. Search by keyword or browse by course—every topic comes with complete definitions, theorems, method explanations and LaTeX derivations.',
  '用自然语言提问也可以：怎么求矩阵的逆 / 钟形曲线 / 抽屉原理 / 点乘…':
    'You can ask in natural language too: how to invert a matrix / bell curve / pigeonhole principle / dot product…',
  '清空搜索': 'Clear search',
  '共': 'Total',
  '个结果': 'results',
  '（关键词「{q}」）': '(keyword "{q}")',
  '没有找到匹配的知识点': 'No matching topics found',
  '换个关键词试试，或去': 'Try another keyword, or go to ',
  '直接提问。': 'to ask directly.',
  '没找到想学的内容？可以在 AI 答疑中描述你的问题，助教会结合课程知识体系为你讲解。':
    'Can’t find what you want to learn? Describe your question in AI Tutor, and the tutor will explain it using the course knowledge system.',
  '去 AI 答疑': 'Go to AI Tutor',

  // ── Tutor ──
  '用你自己的 API Key 调用大模型，随问随答。支持分步推导、公式渲染、上传个人资料后基于资料作答，问答自动存入':
    'Call a large model with your own API Key for instant Q&A. Supports step-by-step reasoning and formula rendering; after uploading your materials it answers based on them, and conversations are saved to ',
  '学习档案': 'Study Archive',
  '，可随时回顾、总结与生成练习题。': ', and can be reviewed, summarized, and turned into practice problems anytime.',
  '开启「思考强度」后，回答上方会实时展示模型的思考过程（可折叠、可复制），方便学习 AI 的推理路径。':
    'After enabling "thinking intensity", the model’s reasoning process is shown live above the answer (collapsible and copyable), so you can study the AI’s reasoning path.',
  '收起设置': 'Hide Settings',
  '密钥设置': 'API Key Settings',
  '新对话': 'New Chat',
  '正在带着知识点提问：': 'Asking with the topic context: ',
  '（{name} · {chapter}）': '({name} · {chapter})',
  '清除知识点上下文': 'Clear topic context',
  '已接入模型：': 'Model connected: ',
  '本次会话用量：↑{p} / ↓{c} · 共 {t} tokens': 'Session usage: ↑{p} / ↓{c} · {t} tokens total',
  '支持上传图片（≤4 张）与 500MB 内文档': 'Supports uploading images (≤4) and documents up to 500MB',
  '问点什么吧': 'Ask me anything',
  '可以问概念理解、解题思路、定理证明。': 'You can ask about concept intuition, problem-solving approaches, or theorem proofs.',
  '也可以让我结合「': 'You can also ask me to expand on ',
  '」这一节展开讲。': ' this section.',
  '先从下面的常见问题开始，或直接在输入框提问。': 'Start with the common questions below, or type your question directly.',
  ' 有不懂的也可以问我上传的资料。': ' You can also ask about the materials you uploaded.',
  '提问附图': 'Attached image',
  '助教': 'Tutor',
  '正在检索我的文档…': 'Searching my documents…',
  '正在输入…': 'Typing…',
  '智能自检': 'Self-Check',
  '多路径推理 · ': 'Multi-path reasoning · ',
  ' 路独立思路': ' independent approaches',
  '（经 {model} 仲裁）': '(arbitrated by {model})',
  '思路': 'Approach',
  '交叉验证 · 模型B（': 'Cross-validation · Model B (',
  '）独立解答': ') independent solution',
  '参考了我的文档 · {n} 个段落（点击展开）': 'Referenced my documents · {n} paragraphs (click to expand)',
  '已复制': 'Copied',
  '复制': 'Copy',
  '重新生成': 'Regenerate',
  '常见问题': 'Common Questions',
  '输入你的数学问题（Enter 发送，Shift+Enter 换行）…':
    'Enter your math question (Enter to send, Shift+Enter for newline)…',
  '请先在右侧配置 API Key': 'Please configure your API Key on the right first',
  '停止': 'Stop',
  '移除图片 {name}': 'Remove image {name}',
  '添加图片（随提问发给多模态模型，最多 4 张）':
    'Add image (sent with your question to the multimodal model, up to 4)',
  '发送': 'Send',
  '是否使用我的文档知识库': 'Whether to use my document knowledge base',
  '使用我的文档知识库作答（{n} 份已启用）': 'Answer using my document knowledge base ({n} enabled)',
  '上传教材讲义后，可让 AI 参考你的资料作答':
    'After uploading textbooks or notes, the AI can answer with reference to your materials',
  '清空当前对话（不影响已保存的答疑记录）': 'Clear current chat (saved Q&A history is kept)',
  '使用说明': 'How to Use',
  '填写任一 OpenAI 兼容服务商的密钥（见右侧预设），保存后即可提问。':
    'Fill in an API key from any OpenAI-compatible provider (see presets on the right), save it, and you can start asking.',
  '在任意知识点页点击"问 AI"，会自动带上该知识点的上下文。':
    'Click "Ask AI" on any topic page to automatically include that topic’s context.',
  '上传教材 / 讲义 / 笔记，提问时自动检索相关段落，AI 会参考你的资料并注明出处。':
    'Upload textbooks / lecture notes / memos; related passages are retrieved automatically when you ask, and the AI references your materials with citations.',
  '每轮问答自动存入学习档案，可回顾、AI 总结、生成专项练习。':
    'Each Q&A round is saved to your Study Archive, where you can review, get AI summaries, and generate targeted practice.',
  '答疑历史按账户沉淀，AI 可帮你总结薄弱点并生成个性化练习题。':
    'Your Q&A history accumulates per account; the AI can summarize your weak points and generate personalized exercises.',
  '打开学习档案': 'Open Study Archive',
  '当前模型': 'Current Model',
  '已就绪': 'Ready',
  '切换模型（{n} 个可选）': 'Switch model ({n} available)',
  '服务商实时列表 · 更新于 ': 'Provider live list · updated ',
  '（已过期）': '(expired)',
  '内置参考列表（实时拉取失败）': 'Built-in reference list (live fetch failed)',
  '刷新': 'Refresh',
  '当前模型已被服务商退役，建议更换为 ': 'The current model has been retired by the provider; consider switching to ',
  '更换密钥 / 接口存档': 'Change Key / Endpoint',
  '自动·': 'Auto·',
  '思考 · ': 'Thinking · ',
  '多路径·': 'Multi-path·',
  '路': ' paths',
  '交叉验证·': 'Cross-check·',
  '联动·': 'Linked·',

  // ── SUGGESTED_QUESTIONS (Tutor) ──
  '泰勒展开和洛必达法则有什么区别？什么时候该用哪个？':
    'What’s the difference between Taylor expansion and L’Hôpital’s rule? When should you use which?',
  '特征值和特征向量的几何意义是什么？为什么要对角化？':
    'What is the geometric meaning of eigenvalues and eigenvectors? Why do we diagonalize?',
  '贝叶斯公式为什么是"由果溯因"？能举个生活中的例子吗？':
    'Why is Bayes’ formula "reasoning from effect to cause"? Can you give a real-life example?',
  '一致收敛和逐点收敛到底差在哪里？为什么积分号下取极限要一致收敛？':
    'What exactly differs between uniform and pointwise convergence? Why is uniform convergence needed to take limits under the integral sign?',
  '留数定理是怎么把困难的实积分变成找极点的？':
    'How does the residue theorem turn a hard real integral into finding poles?',
  '伽罗瓦理论为什么能证明五次方程没有根式解？':
    'Why can Galois theory prove that quintic equations have no radical solution?',
};

export default dict;

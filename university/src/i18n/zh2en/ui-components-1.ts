/** UI 组件文案英文映射（AiSettingsCard / AskAiWidget / CommandSearch） */
const dict: Record<string, string> = {
  // ── AiSettingsCard ──
  '不启用额外推理，直接给出结论和关键步骤。':
    'No extra reasoning; give the conclusion and key steps directly.',
  '少量推理，适合概念理解与简单练习。':
    'Light reasoning, suitable for concept understanding and simple exercises.',
  '平衡推理深度与响应速度，适合日常解题。':
    'Balanced reasoning depth and response speed, suitable for everyday problem solving.',
  '分配更多推理预算，适合复杂计算、证明与综合题。':
    'Allocates more reasoning budget for complex computation, proofs, and comprehensive problems.',
  'API 密钥设置': 'API Key Settings',
  '三套存档 · 当前生效：': '3 profiles · Active: ',
  '接口存档（三套独立配置，互不覆盖）':
    'API profiles (three independent configurations that never overwrite each other)',
  '使用中': 'In use',
  '未配置': 'Not configured',
  '启用': 'Activate ',
  '存档备注名（选填）': 'Profile note (optional)',
  '例如：DeepSeek 主力 / 备用 Key': 'e.g. DeepSeek primary / backup key',
  '快速选择服务商': 'Quick provider selection',
  '＋ 其他': '＋ Other',
  '接口地址（Base URL）': 'Endpoint (Base URL)',
  '填入你的 OpenAI 兼容接口地址（如 OpenRouter、Ollama 本地、或任意第三方兼容网关），保存 API Key 后会':
    'Enter your OpenAI-compatible endpoint (e.g. OpenRouter, local Ollama, or any third-party compatible gateway). After saving the API Key, ',
  '自动检测可用模型': 'available models are detected automatically',
  '；若服务商不支持自动检测，可手动填写模型名。':
    '; if your provider does not support auto-detection, enter the model name manually.',
  '模型名称': 'Model name',
  '正在获取…': 'Fetching…',
  '刷新模型列表': 'Refresh model list',
  '（当前）': ' (current)',
  '服务商实时列表 · ': 'Live provider list · ',
  ' 个模型 · 更新于 ': ' models · updated ',
  '（已过期，建议刷新）': ' (stale, refresh recommended)',
  '内置参考列表 · ': 'Built-in reference list · ',
  ' 个模型（实时拉取失败，可手动输入）':
    ' models (live fetch failed, enter manually)',
  '正在从服务商获取最新模型列表…':
    'Fetching the latest model list from the provider…',
  '填入 Key 后自动列出该服务商的最新模型（随服务商更新）':
    'Enter a key to list the latest models from this provider (kept up to date)',
  '手动输入': 'Enter manually',
  '返回列表选择': 'Back to list',
  '模型 ': 'Model ',
  ' 已被服务商退役或更名，建议更换为 ':
    ' has been retired or renamed by the provider; consider switching to ',
  '。': '.',
  '思考强度': 'Reasoning effort',
  '保存后生效，系统不会自动改变档位。强度越高通常耗时、用量越多；实际支持程度取决于模型，仅支持开关的接口会将低/中/高均映射为开启。':
    'Takes effect after saving; the system never changes the level automatically. Higher levels usually take longer and use more. Actual support depends on the model; endpoints with only an on/off switch map low/medium/high to on.',
  '模型选择': 'Model selection',
  '智能选模型（自动）': 'Smart model routing (auto)',
  '按题目难度在已配置存档中自动路由：简单题用便宜快的模型，难题用旗舰推理模型。':
    'Routes by problem difficulty across your configured profiles: cheap fast models for easy problems, flagship reasoning models for hard ones.',
  '已开启': 'On',
  '手动': 'Manual',
  '需至少配置 2 个模型存档才会真正路由；当前仅 1 个或 0 个时仍使用当前激活存档。手动选择存档依然可用。':
    'Requires at least 2 configured model profiles to route; with only 1 or 0, the active profile is used. Manual profile selection still works.',
  '智能增强（榨干算力）': 'Smart boost (squeeze the compute)',
  '智能自检（自动复核）': 'Self-check (auto review)',
  '回答生成后自动再让模型复核一遍：揪出计算/逻辑错误、跳步或更优解，把额外算力花在「纠错题」上。':
    'After answering, the model reviews its own work: catching calculation or logic errors, skipped steps, or better solutions — extra compute spent on catching mistakes.',
  '已关闭': 'Off',
  '智能容错（失败自动切换）': 'Smart fallback (auto switch on failure)',
  '当前模型彻底失败时，自动用下一个已配置存档的模型重试，最大化「一定能拿到答案」的概率。':
    'If the current model fails completely, retry with the next configured profile — maximizing the chance of getting an answer.',
  '多路径自洽（Self-Consistency）': 'Multi-path self-consistency',
  '中高强度思考或难题时，并发生成多条独立思路，再由模型仲裁取最可靠答案——数学题正确率提升最明显。':
    'For medium/high effort or hard problems, generates several independent solutions in parallel and arbitrates the most reliable one — the biggest accuracy gains on math.',
  '并发路数': 'Parallel paths',
  ' 路': ' paths',
  '约 ': 'About ',
  '× 算力': '× compute',
  '仅在中高强度思考或识别为难题（证明/计算/推导等）时生效；关闭或低强度且为简单题时自动跳过，不额外消耗算力。':
    'Only applies at medium/high effort or when a problem is classified as hard (proof, computation, derivation). Skipped when off or at low effort on easy problems, so no extra compute is used.',
  '极致模式 · 双模型交叉验证': 'Extreme mode · dual-model cross-check',
  '用第二个已配置模型独立重做同一题，再交叉比对、标注分歧，把「单一模型唯一答案」的偶然错误风险降到最低。':
    'A second configured model redoes the same problem independently, then results are cross-compared and disagreements flagged — minimizing the risk of a single-model error.',
  '需至少配置 2 个模型存档才会真正启用；否则自动跳过。开启后单题算力约 2–3 倍。':
    'Requires at least 2 configured model profiles; otherwise skipped. Uses roughly 2–3× the compute per problem.',
  '多路径 + 交叉验证联动': 'Multi-path + cross-check link',
  '多路径生成的多份解答，改由【第二个已配置模型】独立仲裁（而非主模型自己合成）：兼得多路采样的多样性与第三方公正性。':
    'Multiple generated solutions are arbitrated by the second configured model instead of the main model: combining multi-sample diversity with third-party impartiality.',
  '需同时开启「多路径自洽」且至少 2 个已配置存档才会真正生效；否则自动回退为普通多路径合成。':
    'Requires multi-path self-consistency to be on and at least 2 configured profiles; otherwise falls back to normal multi-path synthesis.',
  'RAG 检索增强 · 难题专精': 'RAG retrieval boost · hard-problem focus',
  '中高强度思考或难题时，额外加强文档检索（召回更多相关段落）并强制依据资料作答、逐条注明出处，把权威资料用足。':
    'At medium/high effort or on hard problems, strengthens document retrieval (more relevant passages) and requires answers grounded in the sources with citations, making full use of authoritative material.',
  '仅在中高强度思考或识别为难题时生效（检索召回 4 → 8 段）；关闭或低强度且为简单题时自动跳过，不额外消耗 token。':
    'Only applies at medium/high effort or for hard problems (retrieval 4 → 8 passages). Skipped when off or at low effort on easy problems, so no extra tokens are used.',
  '隐藏密钥': 'Hide API key',
  '显示密钥': 'Show API key',
  '三个存档各自独立保存（含接口地址、模型、思考模式与密钥），只存在你自己的浏览器 localStorage，不会上传到服务器；请求由浏览器直连你所选服务商。':
    'Each of the three profiles is stored independently (endpoint, model, reasoning mode, and key) in your browser localStorage only; nothing is uploaded to a server. Requests go directly from your browser to the provider you selected.',
  '保存到': 'Save to ',
  '并启用': ' and activate',
  '清除该存档': 'Clear this profile',
  '已保存，可以开始提问了': 'Saved. You can start asking questions.',
  '（点击上方按钮可自动列出可用模型）':
    ' (click the button above to list available models)',
  '存档 1': 'Profile 1',
  '存档 2': 'Profile 2',
  '存档 3': 'Profile 3',
  '关闭': 'Off',
  '低': 'Low',
  '中': 'Medium',
  '高': 'High',

  // ── AskAiWidget ──
  '关闭 AI 答疑': 'Close AI tutor',
  '打开 AI 答疑': 'Open AI tutor',
  'AI 助教': 'AI Tutor',
  '打开完整答疑台': 'Open the full tutor',
  '答疑台': 'Tutor',
  '关闭面板': 'Close panel',
  '随时提问，随叫随到。': 'Ask anytime, answers on demand.',
  '概念、解题、证明都可以问。':
    'Concepts, problem solving, and proofs — all fair game.',
  '已加载 ': 'Loaded ',
  ' 份个人资料': ' personal documents',
  'Principia 助教': 'Principia Tutor',
  '自动·': 'Auto · ',
  '思考 · ': 'Thinking · ',
  '多路径·': 'Multi-path · ',
  '路': ' paths',
  '交叉验证·': 'Cross-check · ',
  '联动·': 'Linked · ',
  '检索文档中…': 'Searching documents…',
  '智能自检': 'Self-check',
  '多路径推理 · ': 'Multi-path reasoning · ',
  ' 路独立思路': ' independent paths',
  '（经 ': ' (arbitrated by ',
  ' 仲裁）': ')',
  '思路 ': 'Path ',
  '交叉验证 · 模型B（': 'Cross-check · Model B (',
  '）': ')',
  '· 参考了我的文档 ': '· Referenced ',
  ' 个段落（': ' passages from my documents (',
  '查看详情': 'View details',
  '去配置': 'Configure',
  '输入问题，Enter 发送…': 'Ask a question, Enter to send…',
  '停止生成': 'Stop generating',
  '发送': 'Send',
  '用更简单的话解释': 'Explain more simply',
  '举个具体例子': 'Give a concrete example',
  '分步骤教我': 'Teach me step by step',
  '我算错了吗': 'Did I miscalculate?',
  '总结成要点': 'Summarize key points',

  // ── CommandSearch ──
  '搜索知识点与例题': 'Search topics and problems',
  '搜索知识点、例题、课程…（如：泰勒、特征值、贝叶斯）':
    'Search topics, problems, and courses… (e.g. Taylor, eigenvalues, Bayes)',
  '输入关键词开始搜索': 'Type a keyword to start searching',
  '支持知识点标题、章节、例题标签与课程名称':
    'Searches topic titles, chapters, problem tags, and course names',
  '未找到与「': 'No results for “',
  '」相关的内容': '”',
  '课程': 'Courses',
  '知识点': 'Topics',
  '例题': 'Problems',
  '↑↓ 选择 · ↵ 打开 · Esc 关闭': '↑↓ select · ↵ open · Esc close',
  'Principia 搜索': 'Principia Search',
};

export default dict;

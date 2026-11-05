/** DevMode / Mistakes / Profile 页面可见文案英文映射 */
const dict: Record<string, string> = {
  // ── DevMode：无权访问 ──
  '无权访问': 'Access Denied',
  '开发者模式仅对指定的开发者账号开放。':
    'Developer mode is only available to designated developer accounts.',
  '当前登录账号不是开发者账号，请退出后使用开发者手机号登录。':
    'The current account is not a developer account. Please sign out and sign in with the developer phone number.',
  '请先登录开发者账号后再访问。': 'Please sign in with a developer account first.',
  '前往登录': 'Go to Sign In',
  '返回首页': 'Back to Home',

  // ── DevMode：反馈管理 ──
  '回复内容不能为空': 'Reply cannot be empty',
  '回复保存失败': 'Failed to save the reply',
  '回复已发送': 'Reply sent',
  '全部 {n}': 'All {n}',
  '待处理 {n}': 'Pending {n}',
  '已回复 {n}': 'Replied {n}',
  '已关闭 {n}': 'Closed {n}',
  '暂无反馈': 'No feedback yet',
  '联系：': 'Contact: ',
  '输入官方回复……': 'Write an official reply…',
  '发送回复': 'Send Reply',
  '取消': 'Cancel',
  '回复': 'Reply',
  '状态更新失败': 'Failed to update the status',
  '已关闭': 'Closed',
  '关闭': 'Close',
  '删除失败': 'Failed to delete',
  '已删除': 'Deleted',
  '删除': 'Delete',

  // ── DevMode：内容编辑 ──
  '标题与正文不能为空': 'Title and body cannot be empty',
  '覆盖保存失败': 'Failed to save the override',
  '已保存，页面即将刷新': 'Saved. The page will refresh shortly',
  '撤销失败': 'Failed to revert',
  '已撤销本地覆盖，页面即将刷新恢复源码原文':
    'Local override removed. The page will refresh and restore the original source text',
  '课程': 'Course',
  '知识点（{n} 个）': 'Topics ({n})',
  '选择知识点': 'Select a topic',
  '本地覆盖 {n} 个': '{n} local overrides',
  '当前专题已被覆盖': 'This topic is currently overridden',
  '标题': 'Title',
  '摘要': 'Summary',
  '讲解正文（Markdown + LaTeX）': 'Content (Markdown + LaTeX)',
  '{n} 字符': '{n} characters',
  '保存覆盖': 'Save Override',
  '还原编辑': 'Reset Edits',
  '撤销本地覆盖': 'Remove Local Override',
  '查看该专题 →': 'View this topic →',
  '说明：覆盖保存在当前浏览器的 localStorage，仅本机可见。要让所有访客看到，需要把修改同步进源码后重新构建发布。':
    "Note: overrides are stored in this browser's localStorage and are visible only on this device. To make them visible to all visitors, sync the changes into the source code and rebuild.",

  // ── DevMode：数据概览 ──
  '知识专题': 'Topics',
  '例题': 'Problems',
  '速查公式': 'Quick Formulas',
  '反馈总数': 'Total Feedback',
  '待处理反馈': 'Pending Feedback',
  '手机号注册账户': 'Phone-registered Accounts',
  '本地内容覆盖': 'Local Content Overrides',
  '各学科方向专题分布': 'Topic Distribution by Subject Area',
  '{n} 专题': '{n} topics',

  // ── DevMode：账号管理 ──
  '复制失败，请手动选择文本复制': 'Copy failed. Please select the text and copy it manually',
  '同步文件已下载': 'Sync file downloaded',
  '账号总数（含内置）': 'Total Accounts (incl. built-in)',
  '内置登记表账号': 'Built-in Registry Accounts',
  '本机注册账号': 'Locally Registered Accounts',
  '待同步进代码库': 'Pending Sync to Repository',
  '把新账号写入代码库': 'Write New Accounts into the Repository',
  '新用户注册的账号默认只保存在他自己的浏览器里。导出下面的同步数据并提交进':
    "Newly registered accounts are stored only in the user's own browser by default. Export the sync data below and commit it into",
  '后，该账号就能在任意设备登录，不会再「登录不上去」。':
    ', so the account can sign in on any device instead of failing to log in.',
  '同步码已复制，发送给网站维护者即可': 'Sync code copied. Send it to the site maintainer',
  '复制同步码（{n}）': 'Copy Sync Code ({n})',
  '下载同步文件': 'Download Sync File',
  '刷新列表': 'Refresh List',
  '提示：同步码是一段 Base64 文本，直接通过聊天工具发给维护者；维护者提交并发布后，这里待同步数量会自动清零。':
    'Tip: the sync code is a Base64 string—send it to the maintainer through any chat tool. Once it is committed and published, the pending count here resets to zero.',
  '当前没有待同步的新账号 —— 所有本机注册账号都已在代码库中生效。':
    'No new accounts awaiting sync — all locally registered accounts are already in effect in the repository.',
  '全部账号（{n}）': 'All Accounts ({n})',
  '注册于': 'Registered on',
  '最近登录': 'Last login',
  '内置登记表': 'Built-in',
  '本机注册': 'Local',

  // ── DevMode：页面 ──
  '开发者模式': 'Developer Mode',
  '站点管理台': 'Site Admin',
  '回复用户反馈、更新知识点讲解、查看数据概览。':
    'Reply to user feedback, update topic explanations, and review site statistics.',
  '退出开发者模式': 'Exit Developer Mode',
  '反馈管理': 'Feedback',
  '内容编辑': 'Content',
  '账号管理': 'Accounts',
  '数据概览': 'Stats',

  // ── 反馈类型 / 状态标签 ──
  '功能异常': 'Bug',
  '改进建议': 'Suggestion',
  '内容纠错': 'Content Correction',
  '其他': 'Other',
  '待处理': 'Pending',
  '已回复': 'Replied',

  // ── Mistakes ──
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

  // ── Profile ──
  '课程总览': 'Course Overview',
  '{n} 门核心课程': '{n} core courses',
  '例题广场': 'Problem Plaza',
  '{n} 道详解例题': '{n} solved problems',
  '公式速查表': 'Formula Cheat Sheet',
  '按课程归类的常用公式': 'Common formulas organized by course',
  '还未登录': 'Not signed in',
  '登录后即可查看个人中心。使用手机号注册的账号即可体验全部功能。':
    'Sign in to view your personal center. An account registered with a phone number unlocks all features.',
  '去登录': 'Sign In',
  '登录于 {date}': 'Signed in on {date}',
  '退出登录': 'Sign Out',
  '欢迎回来，': 'Welcome back, ',
  '！这里是你的个人中心。演示模式下，学习进度与收藏功能将在接入云端账号体系后开放。':
    '! This is your personal center. In demo mode, learning progress and favorites will be available once the cloud account system is integrated.',
  '继续学习': 'Continue Learning',
  'Principia · 手机号账号体系': 'Principia · Phone-based Accounts',
};

export default dict;

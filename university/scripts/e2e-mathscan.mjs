/**
 * 数学排版扫描：遍历核心页面，断言可见文本中不存在未渲染的
 * LaTeX 记号（$、\delta、\frac、\sum、\vec、** 等）。
 */
import pw from '/root/.nvm/versions/node/v22.13.1/lib/node_modules/playwright/index.js';

const { chromium } = pw;
const BASE = 'http://localhost:3000';

const targets = [
  { path: '/', label: '首页' },
  { path: '/courses', label: '课程总览' },
  { path: '/courses/calculus', label: '高等数学课程页' },
  { path: '/topics/limits', label: '极限专题(截图页)' },
  { path: '/topics/taylor', label: '泰勒展开专题' },
  { path: '/topics/matrix-operations', label: '线性代数-矩阵' },
  { path: '/topics/divisibility', label: '初等数论' },
  { path: '/problems', label: '例题广场' },
  { path: '/formulas', label: '公式速查' },
  { path: '/knowledge?q=极限', label: '知识检索(带高亮)' },
  { path: '/tutor', label: '答疑台' },
  { path: '/dev', label: '开发者模式' },
];

// 可见文本中不允许出现的原始记号
const BAD = [
  { re: /\$[^$]{1,40}\$/, label: '$...$ 原文' },
  { re: /\\delta|\\frac|\\sum|\\vec|\\epsilon|\\lim|\\int|\\alpha|\\beta|\\pi(?![a-z])/, label: '原始 LaTeX 命令' },
  { re: /\*\*[^*]{1,30}\*\*/, label: '** 未渲染加粗' },
];

const results = [];
const errors = [];

const main = async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`[pageerror] ${String(e).slice(0, 150)}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`[console] ${m.text().slice(0, 150)}`);
  });

  for (const t of targets) {
    await page.goto(`${BASE}${t.path}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(400);
    const text = (await page.locator('body').innerText()) ?? '';
    const found = [];
    for (const b of BAD) {
      const m = text.match(b.re);
      if (m) found.push(`${b.label}:"${m[0].slice(0, 36)}"`);
    }
    // KaTeX 是否有渲染产出（正文页应有）
    const katexCount = await page.locator('.katex').count();
    results.push(
      found.length === 0
        ? `✓ ${t.label} 无原始记号（KaTeX 节点 ${katexCount}）`
        : `✗ ${t.label} 残留: ${found.join(' | ')}`,
    );
  }

  // 截图中的具体标题专项验证
  await page.goto(`${BASE}/topics/limits`, { waitUntil: 'networkidle' });
  const body = (await page.locator('body').innerText()) ?? '';
  results.push(
    body.includes('去心邻域') && !body.includes('$0 <')
      ? '✓ "去心邻域"标题公式已正确渲染'
      : '✗ 去心邻域标题仍有原始公式',
  );

  await browser.close();

  console.log('════════ 扫描结果 ════════');
  results.forEach((r) => console.log(r));
  console.log('\n════════ Console 错误 ════════');
  if (errors.length === 0) console.log('✓ 无');
  else errors.slice(0, 12).forEach((e) => console.log('✗', e));

  const fails = results.filter((r) => r.startsWith('✗')).length + errors.length;
  console.log(`\n总结：${fails === 0 ? '全部通过' : fails + ' 项失败'}`);
  process.exit(fails === 0 ? 0 : 1);
};

main().catch((e) => {
  console.log('════════ 已收集结果（崩溃前） ════════');
  results.forEach((r) => console.log(r));
  errors.slice(0, 10).forEach((x) => console.log('✗', x));
  console.error('测试崩溃:', e.message?.slice(0, 300));
  process.exit(1);
});

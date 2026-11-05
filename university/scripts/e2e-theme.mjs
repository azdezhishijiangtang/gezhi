/**
 * 日光/月光主题切换测试：
 * 1) 默认跟随系统（无偏好时）
 * 2) 点击切换 → html.dark + 背景色变化
 * 3) 刷新后持久化
 * 4) 切回日光
 * 5) 截图（首页日光/月光、专题页月光）供视觉核查
 */
import pw from '/root/.nvm/versions/node/v22.13.1/lib/node_modules/playwright/index.js';

const { chromium } = pw;
const BASE = 'http://localhost:3000';
const results = [];
const errors = [];

const isDark = (page) =>
  page.evaluate(() => document.documentElement.classList.contains('dark'));

const bg = (page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

const main = async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light', // 强制系统偏好为浅色，验证默认跟随
  });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`[pageerror] ${String(e).slice(0, 150)}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`[console] ${m.text().slice(0, 150)}`);
  });

  // ── 1. 默认（系统浅色偏好）→ 日光 ──
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  results.push(!(await isDark(page)) ? '✓ 默认为日光模式（跟随系统浅色）' : '✗ 默认竟为月光');

  // ── 2. 切换到月光 ──
  await page.getByRole('button', { name: '切换到月光模式' }).click();
  await page.waitForTimeout(300);
  const darkOn = await isDark(page);
  const darkBg = await bg(page);
  results.push(
    darkOn && darkBg !== 'oklch(0.984 0.003 247.9)'
      ? `✓ 切换到月光（背景 ${darkBg}）`
      : `✗ 切换失败 dark=${darkOn} bg=${darkBg}`,
  );
  await page.screenshot({ path: '/tmp/theme-dark-home.png', fullPage: false });

  // ── 3. 刷新持久化 ──
  await page.reload({ waitUntil: 'networkidle' });
  results.push((await isDark(page)) ? '✓ 刷新后保持月光' : '✗ 刷新后丢失主题');

  // ── 4. 月光下专题页截图 + 公式可读性 ──
  await page.goto(`${BASE}/topics/limits`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/theme-dark-topic.png', fullPage: false });
  const katexDark = await page.locator('.katex').count();
  results.push(katexDark > 100 ? `✓ 月光下专题页公式正常（${katexDark} 个 KaTeX 节点）` : '✗ 公式渲染异常');

  // ── 5. 切回日光 ──
  await page.getByRole('button', { name: '切换到日光模式' }).click();
  await page.waitForTimeout(300);
  const lightBg = await bg(page);
  results.push(
    !(await isDark(page))
      ? `✓ 切回日光（背景 ${lightBg}）`
      : '✗ 切回日光失败',
  );
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/theme-light-home.png', fullPage: false });

  // ── 6. localStorage 持久值检查 ──
  const stored = await page.evaluate(() => localStorage.getItem('mathlens-theme'));
  results.push(stored === 'light' ? '✓ 偏好已持久化（light）' : `✗ 持久化异常: ${stored}`);

  await browser.close();

  console.log('════════ 测试结果 ════════');
  results.forEach((r) => console.log(r));
  console.log('\n════════ Console 错误 ════════');
  if (errors.length === 0) console.log('✓ 无');
  else errors.slice(0, 10).forEach((e) => console.log('✗', e));

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

/**
 * 手机号注册/登录端到端测试：
 * 1) 注册成功并自动登录（导航栏显示用户名）
 * 2) 用户名重复被拒绝
 * 3) 手机号重复被拒绝
 * 4) 用户名+密码登录成功；错误密码被拒绝
 * 5) 刷新后会话保持；个人中心显示脱敏手机号
 * 6) 开发者种子账号 17736095542（内置账号）可正常登录
 */
import pw from '/root/.nvm/versions/node/v22.13.1/lib/node_modules/playwright/index.js';

const { chromium } = pw;
const BASE = 'http://localhost:3000';
const PHONE = '13800001111';
const USERNAME = '测试小明';
const PASSWORD = 'abc123456';

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

  // ── 1. 注册成功并自动登录 ──
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.getByPlaceholder('11 位手机号，如 13812345678').fill(PHONE);
  await page.getByPlaceholder('中文、字母、数字或下划线').fill(USERNAME);
  await page.getByPlaceholder('6-32 位').fill(PASSWORD);
  await page.getByPlaceholder('再输入一次').fill(PASSWORD);
  await page.getByRole('button', { name: /注册并登录/ }).click();
  await page.waitForURL(`${BASE}/`, { timeout: 10000 });
  await page.waitForTimeout(600);
  const navBtn = page.locator('button[aria-label="用户菜单：测试小明"]');
  results.push(
    (await navBtn.count()) > 0
      ? '✓ 注册成功且导航栏出现用户菜单（测试小明）'
      : '✗ 注册后导航栏未出现用户菜单',
  );

  // ── 2/3. 重复校验（退出后回登录页） ──
  await page.getByRole('button', { name: new RegExp(`用户菜单：${USERNAME}`) }).click();
  await page.getByRole('menuitem', { name: '退出登录' }).click();
  await page.waitForTimeout(400);
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });

  // 用户名重复
  await page.getByPlaceholder('11 位手机号，如 13812345678').fill('13900002222');
  await page.getByPlaceholder('中文、字母、数字或下划线').fill(USERNAME);
  await page.getByPlaceholder('6-32 位').fill(PASSWORD);
  await page.getByPlaceholder('再输入一次').fill(PASSWORD);
  await page.getByRole('button', { name: /注册并登录/ }).click();
  await page.waitForTimeout(1200);
  let body = (await page.textContent('body')) ?? '';
  results.push(body.includes('该用户名已被占用') ? '✓ 用户名重复被拒绝' : '✗ 用户名重复未被拦截');

  // 手机号重复
  await page.getByPlaceholder('11 位手机号，如 13812345678').fill(PHONE);
  await page.getByPlaceholder('中文、字母、数字或下划线').fill('另一个名字');
  await page.getByRole('button', { name: /注册并登录/ }).click();
  await page.waitForTimeout(1200);
  body = (await page.textContent('body')) ?? '';
  results.push(body.includes('该手机号已注册') ? '✓ 手机号重复被拒绝' : '✗ 手机号重复未被拦截');

  // ── 4. 登录：错误密码 → 正确密码（用户名登录） ──
  await page.getByRole('button', { name: /已有账号登录/ }).click();
  await page.getByPlaceholder('注册时的手机号或用户名').fill(USERNAME);
  await page.getByPlaceholder('注册时设置的密码').fill('wrongpass');
  await page.getByRole('button', { name: '登录', exact: true }).click();
  await page.waitForTimeout(1400);
  body = (await page.textContent('body')) ?? '';
  results.push(body.includes('密码不正确') ? '✓ 错误密码被拒绝' : '✗ 错误密码未被拦截');

  await page.getByPlaceholder('注册时设置的密码').fill(PASSWORD);
  await page.getByRole('button', { name: '登录', exact: true }).click();
  await page.waitForURL(`${BASE}/`, { timeout: 10000 });
  results.push('✓ 用户名+密码登录成功并跳转首页');

  // ── 5. 刷新保持 + 个人中心脱敏手机号 ──
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const stillLoggedIn = await page.locator('button[aria-label="用户菜单：测试小明"]').count();
  results.push(stillLoggedIn > 0 ? '✓ 刷新后会话保持' : '✗ 刷新后掉线');

  await page.goto(`${BASE}/profile`, { waitUntil: 'networkidle' });
  body = (await page.textContent('body')) ?? '';
  results.push(
    body.includes('138****1111') ? '✓ 个人中心显示脱敏手机号' : '✗ 未显示脱敏手机号',
  );

  // ── 6. 开发者种子账号（内置账号，全设备可用）可正常登录 ──
  await page.getByRole('button', { name: new RegExp(`用户菜单：${USERNAME}`) }).click();
  await page.getByRole('menuitem', { name: '退出登录' }).click();
  await page.waitForTimeout(400);
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /已有账号登录/ }).click();
  await page.getByPlaceholder('注册时的手机号或用户名').fill('17736095542');
  await page.getByPlaceholder('注册时设置的密码').fill('Tao20090406');
  await page.getByRole('button', { name: '登录', exact: true }).click();
  await page.waitForURL(`${BASE}/`, { timeout: 10000 });
  const devMenu = page.getByRole('button', { name: /用户菜单：开发者阿z的知识讲堂/ });
  results.push(
    (await devMenu.count()) > 0 ? '✓ 开发者种子账号 17736095542 登录成功' : '✗ 种子账号登录后未显示开发者用户菜单',
  );
  // 退出，恢复干净状态
  await devMenu.click();
  await page.getByRole('menuitem', { name: '退出登录' }).click();
  await page.waitForTimeout(400);

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

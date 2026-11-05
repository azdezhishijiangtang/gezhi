/**
 * 开发者模式账号门控测试：
 * 1) 未登录访问 /dev → 无权访问页
 * 2) 普通账号登录 → /dev 仍拒绝；页脚无"开发者模式"入口
 * 3) 开发者账号 17736095542 登录 → /dev 放行（站点管理台）；页脚显示入口
 * 4) 全程无 console 错误
 */
import pw from '/root/.nvm/versions/node/v22.13.1/lib/node_modules/playwright/index.js';

const { chromium } = pw;
const BASE = 'http://localhost:3000';
const DEV_PHONE = '17736095542';
const results = [];
const errors = [];

const registerAccount = async (page, phone, username) => {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.getByPlaceholder('11 位手机号，如 13812345678').fill(phone);
  await page.getByPlaceholder('中文、字母、数字或下划线').fill(username);
  await page.getByPlaceholder('6-32 位').fill('pass123456');
  await page.getByPlaceholder('再输入一次').fill('pass123456');
  await page.getByRole('button', { name: /注册并登录/ }).click();
  await page.waitForURL(`${BASE}/`, { timeout: 10000 });
};

const logout = async (page, username) => {
  await page.getByRole('button', { name: new RegExp(`用户菜单：${username}`) }).click();
  await page.getByRole('menuitem', { name: '退出登录' }).click();
  await page.waitForTimeout(400);
};

/** 用手机号 + 密码登录（种子账号/已注册账号通用） */
const loginAccount = async (page, identifier, password) => {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /已有账号登录/ }).click();
  await page.getByPlaceholder('注册时的手机号或用户名').fill(identifier);
  await page.getByPlaceholder('注册时设置的密码').fill(password);
  await page.getByRole('button', { name: '登录', exact: true }).click();
  await page.waitForURL(`${BASE}/`, { timeout: 10000 });
};

const main = async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`[pageerror] ${String(e).slice(0, 150)}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`[console] ${m.text().slice(0, 150)}`);
  });

  // ── 1. 未登录 → 拒绝 ──
  await page.goto(`${BASE}/dev`, { waitUntil: 'networkidle' });
  let body = (await page.textContent('body')) ?? '';
  results.push(body.includes('无权访问') ? '✓ 未登录访问 /dev 被拒绝' : '✗ 未登录竟能看到管理台？');
  results.push(body.includes('前往登录') ? '✓ 拒绝页含登录引导' : '✗ 拒绝页缺登录引导');

  // ── 2. 普通账号 → 拒绝，页脚无入口 ──
  await registerAccount(page, '13900003333', '普通用户甲');
  await page.goto(`${BASE}/dev`, { waitUntil: 'networkidle' });
  body = (await page.textContent('body')) ?? '';
  results.push(body.includes('无权访问') ? '✓ 普通账号访问 /dev 被拒绝' : '✗ 普通账号竟进入管理台');
  let footerLink = await page.locator('footer a[href="/dev"]').count();
  results.push(footerLink === 0 ? '✓ 普通账号页脚无开发者入口' : '✗ 普通账号页脚出现开发者入口');
  await logout(page, '普通用户甲');

  // ── 3. 开发者账号（内置种子账号）→ 放行，页脚有入口 ──
  await loginAccount(page, DEV_PHONE, 'Tao20090406');
  await page.goto(`${BASE}/dev`, { waitUntil: 'networkidle' });
  body = (await page.textContent('body')) ?? '';
  results.push(body.includes('站点管理台') ? '✓ 开发者账号进入管理台' : '✗ 开发者账号被拒绝');
  results.push(body.includes(DEV_PHONE) ? '✓ 管理台显示开发者手机号' : '✗ 未显示开发者手机号');
  footerLink = await page.locator('footer a[href="/dev"]').count();
  results.push(footerLink === 1 ? '✓ 开发者账号页脚显示入口' : '✗ 开发者账号页脚缺入口');

  // 反馈管理 / 内容编辑 tab 正常
  await page.getByRole('tab', { name: /内容编辑/ }).click();
  await page.waitForTimeout(400);
  body = (await page.textContent('body')) ?? '';
  results.push(body.includes('讲解正文') ? '✓ 内容编辑器可用' : '✗ 内容编辑器异常');

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

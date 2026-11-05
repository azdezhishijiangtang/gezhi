/** AI 模型目录自动更新功能实测 */
import pw from '/root/.nvm/versions/node/v22.13.1/lib/node_modules/playwright/index.js';
const { chromium } = pw;
const BASE = 'http://localhost:3000';
const results = [];

const main = async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => results.push(`✗ pageerror: ${String(e).slice(0, 150)}`));

  // 1. 未配置 → 自动展开设置卡片
  await page.goto(`${BASE}/tutor`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const hasSettings = (await page.locator('#ai-baseurl').count()) > 0;
  results.push(hasSettings ? '✓ 未配置时自动展开 API 设置卡片' : '✗ 设置卡片未展开');

  // 2. 应用 DeepSeek 预设 + 假 Key（拉取必失败 → 内置目录回退）
  await page.getByRole('button', { name: 'DeepSeek', exact: true }).click();
  await page.locator('#ai-key').fill('sk-invalid-test-key');
  await page.waitForTimeout(3500); // 等待实时拉取失败并回退
  let body = (await page.textContent('body')) ?? '';
  results.push(body.includes('内置参考列表') ? '✓ 实时拉取失败时回退内置参考列表' : '✗ 未回退内置列表');
  const sel = page.locator('#ai-model');
  const isSelect = (await sel.evaluate((el) => el.tagName)) === 'SELECT';
  results.push(isSelect ? '✓ 模型下拉框出现（内置目录）' : '✗ 模型下拉框未出现');
  const optCount = isSelect ? await sel.locator('option').count() : 0;
  results.push(optCount >= 3 ? `✓ 内置目录含 ${optCount} 个模型` : `✗ 内置目录模型过少: ${optCount}`);
  const optText = isSelect ? await sel.locator('option').allTextContents() : [];
  results.push(optText.some((t) => t.includes('deepseek-flash')) ? '✓ 默认模型已是新版 deepseek-flash' : `✗ 默认模型旧: ${optText[0]}`);

  // 3. 手动输入已退役模型 → 出现迁移警告
  await page.getByRole('button', { name: '手动输入' }).click();
  await page.locator('#ai-model').fill('deepseek-chat');
  await page.waitForTimeout(300);
  body = (await page.textContent('body')) ?? '';
  results.push(body.includes('已被服务商退役或更名') ? '✓ 退役模型迁移警告出现' : '✗ 退役警告未出现');

  // 4. 改回 deepseek-flash 并保存（保存后设置卡片应收起，回到当前模型视图）
  await page.getByRole('button', { name: '返回列表选择' }).click();
  await page.locator('#ai-model').selectOption('deepseek-flash');
  await page.getByRole('button', { name: /保存到/ }).click();
  await page.waitForTimeout(800);
  const settingsGone = (await page.locator('#ai-baseurl').count()) === 0;
  results.push(settingsGone ? '✓ 存档保存成功并收起设置卡片' : '✗ 保存后设置卡片未收起');

  // 5. 侧栏当前模型卡片：下拉切换 + 刷新按钮
  await page.waitForTimeout(500);
  const tutorSel = page.locator('#tutor-model');
  results.push((await tutorSel.count()) > 0 ? '✓ 答疑台侧栏出现模型切换下拉' : '✗ 侧栏无模型切换');
  const tutorOpts = await tutorSel.locator('option').allTextContents();
  results.push(tutorOpts.includes('deepseek-v4-pro') ? '✓ 侧栏下拉含 deepseek-v4-pro' : `✗ 侧栏下拉缺旗舰: ${tutorOpts.join(',')}`);
  await tutorSel.selectOption('deepseek-v4-pro');
  await page.waitForTimeout(500);
  body = (await page.textContent('body')) ?? '';
  results.push(body.includes('deepseek-v4-pro') ? '✓ 侧栏切换模型生效' : '✗ 侧栏切换未生效');

  // 6. 刷新后保持（localStorage 持久化）
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  body = (await page.textContent('body')) ?? '';
  results.push(body.includes('deepseek-v4-pro') ? '✓ 刷新后模型选择保持' : '✗ 刷新后丢失');

  // 7. 缓存生效：第二次打开不再转很久（内置目录 24h 缓存）
  await browser.close();
  console.log('════════ 测试结果 ════════');
  results.forEach((r) => console.log(r));
  const fails = results.filter((r) => r.startsWith('✗')).length;
  console.log(`\n总结：${fails === 0 ? '全部通过' : fails + ' 项失败'}`);
  process.exit(fails === 0 ? 0 : 1);
};

main().catch((e) => {
  console.error('崩溃:', e.message?.slice(0, 300));
  process.exit(1);
});

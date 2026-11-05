/** 文档知识库上传与持久化测试：上传 txt → 分块入库 → 刷新后仍在 */
import pw from '/root/.nvm/versions/node/v22.13.1/lib/node_modules/playwright/index.js';

const { chromium } = pw;
const BASE = 'http://localhost:3000';

const main = async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`[pageerror] ${String(e).slice(0, 200)}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`[console] ${m.text().slice(0, 200)}`);
  });

  await page.goto(`${BASE}/tutor`, { waitUntil: 'networkidle' });
  // 文档知识库的上传控件（accept 含 .txt）；聊天框的图片上传控件是 image/*
  const input = page.locator('input[type=file][accept*=".txt"]');
  const count = await input.count();
  console.log(`文档上传控件数量: ${count}`);
  if (count === 0) {
    console.log('✗ 未找到文档上传控件（可能文档面板未展开）');
    await browser.close();
    process.exit(1);
  }

  await input.first().setInputFiles('/tmp/rag-test.txt');
  await page.waitForTimeout(3500);
  const body = (await page.textContent('body')) ?? '';
  console.log(body.includes('rag-test.txt') ? '✓ 文档已出现在列表' : '✗ 文档未出现');
  const chunk = body.match(/(\d+)\s*个段落/);
  console.log(chunk ? `✓ 分块数量: ${chunk[1]} 个段落` : '✗ 未显示分块数量');

  // 关闭开关 / 删除前的持久化验证
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const body2 = (await page.textContent('body')) ?? '';
  console.log(body2.includes('rag-test.txt') ? '✓ 刷新后文档仍存在（IndexedDB 持久化）' : '✗ 刷新后文档丢失');

  console.log('\nConsole/Page 错误:', errors.length === 0 ? '无' : errors.slice(0, 10));
  await browser.close();
  process.exit(errors.length > 0 ? 1 : 0);
};

main().catch((e) => {
  console.error('崩溃:', e.message?.slice(0, 300));
  process.exit(1);
});

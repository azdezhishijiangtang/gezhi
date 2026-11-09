# 数理答疑平台 · 格致（门厅 + 高中区 + 大学区）

> 一个门厅，两个校区。本仓库把原本两个独立站点合并到同一个 GitHub Pages 站点下，**只做站点合并，不做功能合并**。

**门厅入口：** https://azdezhishijiangtang.github.io/gezhi/

---

## 站点地图

| 分区 | 站点 | 本仓库路径 | 在线地址 | 技术栈 |
|---|---|---|---|---|
| 门厅 | 分区选择页 | `portal/` | `/gezhi/` | 纯静态单文件（无脚本） |
| 高中区 | 问渠 · 高中理科 AI 答疑 | `highschool/` | `/gezhi/highschool/` | Vite + React + TS（npm） |
| 大学区 | Principia · 大学数学物理知识解答平台 | `university/` | `/gezhi/university/` | Vite + React 19 + TS（pnpm） |

两个校区**各自保留原有的全部功能、数据结构与交互逻辑**，门厅只负责分流。高中区另有独立部署 `https://azdezhishijiangtang.github.io/wenqu/`，大学区另有独立部署 `https://azdezhishijiangtang.github.io/Principia/`，与合并站点是同一套代码。

各分区完整功能请看各自的 README：[高中区](./highschool/README.md) · [大学区](./university/README.md)。

---

## 设计原则

**不做功能合并，只做站点合并。**

- **学习档案隔离**：高中区存储键带 `wenqu-` 前缀，大学区带 `mathlens-` / `principia-` 前缀，天然互不干扰。
- **旧数据零丢失**：合并前后站点同属 `azdezhishijiangtang.github.io` 域（同一 localStorage origin），老用户的历史档案在合并后的站点上原样可用。
- **统一的安全基线**：两个校区共用同一套「密钥保险库」实现与浏览器兼容层；门厅本身是纯静态无脚本页，并设置了 `script-src 'none'` 的严格 CSP。

---

## 纯本地存储，没有云端同步

请特别注意：**整套平台没有后端、没有账号、没有云端同步。**

- 对话、错题、学习档案、计划、AI 设置都只保存在**你自己的浏览器**里，清理浏览器数据会一并清掉。
- 「学习档案」「答疑记录」等**不会**同步到云端，也不会在你换设备后自动出现；需要靠各站点的**导出 / 导入备份**手动搬运。
- 导出备份**永远不含 API Key 和解锁口令**，换设备后需要重新粘贴 Key。
- 站点无埋点、无统计、无第三方可执行脚本。

---

## 密钥保护与「解锁口令」

两个校区的 AI 设置里都有 **「密钥保护」** 面板，机制完全相同。里面的「口令」常被误解，请先看这三句话：

1. **API Key**（`sk-...`）是服务商给你的，用来让 AI 干活。
2. **解锁口令**是你自己随便设的（至少 8 位），只是给**浏览器里的临时保险箱**上锁用的本地密码。
3. **它不是网站密码**——平台没有账号、不用注册登录；**也不是 API Key**。

| 用法 | 效果 |
|---|---|
| **不设口令（默认）** | Key 只存在内存里，刷新或关闭标签页立即消失；每次刷新要重新粘贴一次 Key |
| **设口令 + 点「会话内记住」** | `PBKDF2-SHA256(310000 轮)` + `AES-256-GCM` 加密后暂存在**当前标签页**；刷新后输口令解锁即可，不用重贴 Key |

- 口令**哪里都不存**、从不进入网络请求、也**无法找回**（忘了就点「彻底清除」，重新粘贴 API Key 再设个新口令即可）。
- 明文 Key 永不写入 `localStorage` / 备份；保存的设置里只有不能发请求的句柄。
- 密文只写 `sessionStorage`，关闭标签页即清除；最长 8 小时过期；空闲 15 分钟 / 后台 3 分钟自动锁定。
- 面板右侧新增 **「?」按钮**，点开即白话说明。

> 📖 完整说明书： [高中区《密钥保护说明》](./highschool/密钥保护说明.md) · [大学区《密钥保护说明》](./university/密钥保护说明.md)
> 内含「三个东西别搞混」对照表、设 / 不设对比、逐步操作、10 条常见问题（含「忘了怎么办」）、加密参数与如实的安全边界。

---

## 部署

`push` 到 `main` 或手动 `workflow_dispatch` 触发 `.github/workflows/deploy.yml`：

1. **构建高中区**：`npm ci && npm run build`，base 为相对路径。
2. **构建大学区**：`pnpm exec tsc -b && pnpm exec vite build --base=/gezhi/university/`。
3. **拼装站点**：`portal/` → 根目录，两应用产物分别置于 `highschool/`、`university/`。
4. **站点根放置 404 兜底页**（大学区入口 + 路径分流脚本）：大学区为 BrowserRouter 多级路由，刷新深链时由其兜底恢复；非大学区路径弹回门厅。

> ⚠️ **CSP 注意事项**：大学区入口页带严格 CSP（`script-src` 为 sha256 白名单）。注入分流脚本时，脚本哈希必须一并写入 CSP，否则浏览器会拦截该脚本；拼装步骤内已带**断言**做防回归校验。修改任何内联脚本后都要重算哈希。

首次部署需在仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。

---

## 本地开发

```bash
# 高中区
cd highschool && npm install && npm run dev

# 大学区
cd university && pnpm install && pnpm dev

# 门厅（任意静态服务器即可，例如）
cd portal && python3 -m http.server 8000
```

> 大学区本地 dev 的 base 为 `/`，线上为 `/gezhi/university/`，两者均由 `BrowserRouter basename={import.meta.env.BASE_URL}` 自动适配。
> 静态资源请使用 `document.baseURI` 解析相对基路径，不要用 `window.location.origin`，否则子路径部署会 404。

---

## 目录结构

```
gezhi/
├── portal/index.html          门厅（纯静态，严格 CSP，无内联脚本）
├── highschool/                高中区（问渠）
│   ├── src/                   源码
│   ├── public/ocr/            本地 OCR 引擎与字库（勿删）
│   ├── README.md
│   └── 密钥保护说明.md
├── university/                大学区（Principia 应用副本）
│   ├── src/
│   ├── README.md
│   └── 密钥保护说明.md
└── .github/workflows/deploy.yml
```

---

## 已知限制与安全边界

- **纯前端 BYOK 的不可能三角**：发请求那一刻浏览器必须短暂持有明文 Key。若页面被注入恶意脚本（XSS），攻击者仍可能在解锁期间读取。密钥保险库把「长期磁盘明文」变成「短暂内存明文」，并配合严格 CSP 降低风险，但**不能宣称绝对不会泄露**。
- 请使用**额度受限、可随时撤销的专用子密钥**，不要用主账号密钥，并定期轮换。
- **无法由前端绕过的边界**：真实 CORS 限制、网络屏蔽、HTTPS 页面请求 HTTP 地址被拦截。
- 大学区首包偏大（约 5.2 MB，gzip ≈ 1.85 MB），慢网络下首屏可能等待较久；英文知识数据已按需加载，中文知识正文仍为静态打包。

---

## 相关文档

| 文档 | 内容 |
|---|---|
| [高中区 README](./highschool/README.md) | 问渠功能、AI 接入、隐私、开发与部署 |
| [大学区 README](./university/README.md) | Principia 功能、三套存档、双语、开发与部署 |
| [高中区《密钥保护说明》](./highschool/密钥保护说明.md) · [大学区《密钥保护说明》](./university/密钥保护说明.md) | 解锁口令机制完整说明书 |

# 数理答疑平台（高中区 & 大学区）

一个门厅，两个校区。本仓库由原两个独立站点合并而成：

| 分区 | 站点 | 路径 | 原仓库 | 技术栈 |
|------|------|------|--------|--------|
| 高中区 | 问渠 · 高中理科学习工作台 | `/highschool/` | `wenqu` | Vite + React + TS（npm） |
| 大学区 | Principia · 大学数学物理本科知识解答平台 | `/university/` | `Principia`（frontend/） | Vite + React 19 + TS（pnpm） |
| 门厅 | 分区选择页 | `/` | — | 纯静态单文件 |

线上地址：`https://azdezhishijiangtang.github.io/gezhi/`

## 设计原则

**不做功能合并，只做站点合并。** 两个区是两个完全独立的应用，各自保留原有的全部功能、数据结构与交互逻辑；门厅页只负责分流。

- **学习档案隔离**：高中区存储键带 `wenqu-` 前缀，大学区带 `mathlens-` / `principia-` 前缀，天然互不干扰。
- **旧数据零丢失**：合并前后站点同属 `azdezhishijiangtang.github.io` 域（同一 localStorage origin），老用户的历史档案在合并后的站点上原样可用。
- **识图服务不受影响**：高中区拍照识题走 Cloudflare Worker（`zhihu-study-vision`），其 `ALLOWED_ORIGINS` 绑定主域，合并后照常工作。Worker 源码保留在 `highschool/cloudflare/`，改动会经 `.github/workflows/deploy-vision.yml` 触发重部署（需在新仓库配置 `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` secrets，未配置时该工作流自动跳过）。

## 部署

`push` 到 `main` 或手动 `workflow_dispatch` 触发 `.github/workflows/deploy.yml`：

1. 构建高中区（`npm ci && npm run build`，base 为相对路径）；
2. 构建大学区（`pnpm exec tsc -b && pnpm exec vite build --base=/gezhi/university/`）；
3. 拼装站点：`portal/` → 根目录，两应用产物分别置于 `highschool/`、`university/`；
4. 站点根放置 404 兜底页（大学区入口 + 路径分流脚本）：大学区为 BrowserRouter 多级路由，刷新深链时由其兜底恢复；非大学区路径弹回门厅。

## 本地开发

```bash
# 高中区
cd highschool && npm install && npm run dev

# 大学区
cd university && pnpm install && pnpm dev
```

> 注意：大学区本地 dev 的 base 为 `/`，而线上为 `/gezhi/university/`，两者均由 `BrowserRouter basename={import.meta.env.BASE_URL}` 自动适配。

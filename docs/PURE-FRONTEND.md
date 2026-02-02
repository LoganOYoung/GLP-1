# 纯前端约束（本项目无后端）

## 约定

- **无后端**：不新增 `app/api/`、不新增 `route.ts`/`route.js`、不使用 `'use server'`。数据仅来自客户端 fetch 公开 API（如 FDA）或静态数据。
- **静态导出**：生产构建使用 `output: 'export'`，输出到 `out/`，可部署到任意静态托管（Vercel、GitHub Pages 等）。
- **样式**：全局样式在 `app/globals.css`，必须含 `@tailwind base/components/utilities`；根布局必须 `import './globals.css'`。

## 开发与校验

- **开发时访问 http://localhost:3000**：必须用 `npm run dev`（会先清 `.next` 再启动）。根路径 404 或无样式多为用了 `npm run dev:fast` 残留缓存，或误用了 `npm run start`（本项目静态导出，`start` 是 `serve out`，不是 Next 的 Node 服务）。
- **预览构建结果**：`npm run build && npm run start`（start 会执行 `npx serve out -p 3000` 托管静态文件）。
- **提交/上线前**：执行 `npm run check`，确保 lint 与 build 通过后再推送或部署。

## 若出现“无样式”或构建报错

1. 停掉 dev 服务器，执行：`rm -rf .next`，再执行 `npm run dev`。
2. 确认 `app/layout.tsx` 中有 `import './globals.css'`。
3. 确认存在 `postcss.config.js` 或 `postcss.config.mjs`，且包含 `tailwindcss`、`autoprefixer`。

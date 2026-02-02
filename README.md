# GLP-1

Next.js + Tailwind **纯前端**项目，**无后端**（无 `app/api`、无 `route.ts`、无 `'use server'`），可部署到 Vercel。约束说明见 [docs/PURE-FRONTEND.md](docs/PURE-FRONTEND.md)。

## 技术栈

- **Next.js 14**（App Router）
- **Tailwind CSS**
- **TypeScript**
- **静态导出**（`output: 'export'`），适合纯前端

## 本地开发

```bash
# 安装依赖（需联网）
npm install

# 开发：启动开发服务器 http://localhost:3000（每次会先清 .next，根路径 / 正常）
npm run dev

# 提交/上线前执行，确保 lint + build 通过
npm run check

# 不清理缓存直接启动（若出现 404 或无样式，请用上面的 npm run dev）
npm run dev:fast

# 构建静态站点（输出到 out/）
npm run build

# 预览构建结果：先 build，再 start（本项目为静态导出，start 用 serve 托管 out/，不是 next start）
npm run build && npm run start
```

## 常见问题

- **localhost:3000 显示 404（This page could not be found）但顶部有导航**  
  本项目为静态导出（`output: 'export'`）。开发时必须用 `npm run dev`（会先清 `.next`），不要用 `npm run dev:fast` 留缓存，也不要先 `build` 再跑 `next start`（旧版 start 会 404）。现已将 `npm run start` 改为 `npx serve out -p 3000`，预览构建结果请用 `npm run build && npm run start`。
- **页面打开但完全没有样式（只有默认蓝链接、黑字）**  
  多为开发缓存导致 CSS 未注入。停掉 dev 后执行 `rm -rf .next`，再执行 `npm run dev`。若仍无样式，检查 `app/layout.tsx` 中是否有 `import './globals.css'`，以及 `app/globals.css` 中是否有 `@tailwind base/components/utilities`。

## 部署到 GitHub + Vercel

### 1. 推送到 GitHub

在项目根目录执行：

```bash
# 初始化 Git（若尚未初始化）
git init

# 添加所有文件
git add .
git commit -m "Initial commit: Next.js + Tailwind"

# 在 GitHub 网页上新建仓库（不要勾选 README），然后：
git remote add origin https://github.com/你的用户名/GLP-1.git
git branch -M main
git push -u origin main
```

### 2. 用 Vercel 部署

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录。
2. 点击 **Add New** → **Project**，选择刚推送的仓库。
3. **Framework Preset** 选 **Next.js**，其余保持默认。
4. 点击 **Deploy**，等待构建完成。
5. 部署成功后会有 `https://xxx.vercel.app` 的访问地址。

**说明**：本项目使用 `output: 'export'`，Vercel 会自动识别并正确部署静态导出站点，无需额外配置。

## 项目结构

```
GLP-1/
├── app/
│   ├── layout.tsx         # 根布局（Header + Footer）
│   ├── page.tsx           # 首页
│   ├── globals.css
│   ├── alternatives/      # 平替百科
│   ├── cost-insurance/    # 省钱攻略
│   ├── legitimacy/       # 合规监测（含 shortage 子页）
│   ├── calculator/        # 到手价计算器
│   └── quiz/              # Find Your Option 问卷
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── docs/
│   └── PRODUCT-PLAN.md    # 产品方案与实施状态
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## 已实现（Phase 1 纯前端）

- **内容**：Alternatives、Cost & Insurance、Legitimacy（含 FDA Shortage 客户端拉取）。
- **工具**：Out-of-Pocket Calculator、Find Your Option Quiz。
- **变现**：Footer 免责；可自行在页面中插入 Affiliate 链接与展示广告。
- **SEO**：各页 metadata，英文、美国受众。

## API 集成设置

### Google Maps API（可选）

1. **获取 API Key**：https://console.cloud.google.com/
2. **安装依赖**：`npm install @react-google-maps/api`
3. **配置环境变量**：创建 `.env.local`，添加 `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key`
4. **重启服务器**：`npm run dev`

### Telehealth Platform APIs（可选）

1. **联系平台**获取 API 访问权限
2. **配置环境变量**：参考 `.env.example`
3. **更新配置**：编辑 `lib/telehealth-api-config.ts`，设置 `enabled: true`
4. **实现数据映射**：编辑 `lib/telehealth-api.ts` 中的 `normalizePlatformData()`

详细说明请查看：`docs/API-SETUP-GUIDE.md`

## 后续可做

- 扩充各 hub 内文案与表格。
- 在 `tailwind.config.ts` 里扩展主题色、字体。
- Phase 2：Supabase + Clerk + Cron（补货提醒、UGC 等）按产品方案排期。

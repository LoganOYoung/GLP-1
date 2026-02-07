# 上线就绪评估：GitHub + 域名解析 + Vercel 部署

本文档基于当前代码与构建结果，评估网站是否**可以**推送到 GitHub、做域名解析并部署至 Vercel 上线。结论为**可以**，按下列清单执行即可。

---

## 一、已满足条件（可直接上线）

| 项目 | 状态 | 说明 |
|------|------|------|
| **生产构建** | ✅ 通过 | `npm run build` 成功，静态导出到 `out/`，`inject-root-redirect.js` 已执行 |
| **错误边界** | ✅ 有 | `app/error.tsx`、`app/global-error.tsx`、`app/not-found.tsx` 已存在 |
| **敏感信息** | ✅ 未提交 | `.gitignore` 含 `.env*.local`、`.vercel`，无密钥硬编码 |
| **域名引用** | ✅ 一致 | 全站使用 `https://glp1guide.com`（About、Footer、Breadcrumbs、StructuredData、FAQ/Calculator metadata） |
| **Next 配置** | ✅ 适配 | `next.config.js` 生产环境 `output: 'export'`，`images.unoptimized: true`，适合静态托管 |
| **Vercel 兼容** | ✅ 兼容 | Vercel 自动识别 Next.js 静态导出，无需单独设置 Output Directory |
| **README 部署说明** | ✅ 有 | README 含「推送到 GitHub」「用 Vercel 部署」步骤 |

---

## 二、可选环境变量（不配置也能上线）

| 变量 | 用途 | 不配置时 |
|------|------|----------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | 地图组件（如 Telehealth 按州） | 地图区域显示「添加 API Key」说明，其余页面正常 |
| `CALCULATOR_PRICES_URL` 等 4 个 | 每月 Action 拉取外部数据 | 仅不拉取外部数据，站点用仓库内 `data/*.json` 照常运行 |

上线前**不必**在 Vercel 配置上述变量；需要地图或自动拉数据时再在 Vercel / GitHub 里配置即可。

---

## 三、上线步骤清单

### 1. 推送到 GitHub

```bash
cd /path/to/GLP-1

# 若尚未初始化
git init
git add .
git commit -m "Initial commit: GLP-1 Guide static site"

# 在 GitHub 新建仓库（不要勾选 README），然后：
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

**注意**：推送前再次确认未提交 `.env.local`、`.env`（已在 `.gitignore` 中）。

---

### 2. 在 Vercel 部署

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录。
2. **Add New** → **Project**，选择刚推送的仓库。
3. **Framework Preset** 选 **Next.js**。
4. **Build Command** 保持默认 `next build`（会执行 `package.json` 的 `build`，即 `next build && node scripts/inject-root-redirect.js`）。
5. **Output Directory** 留空（Vercel 自动识别 Next 静态导出）。
6. **Root Directory** 若仓库不是单体仓库，填 `GLP-1`；否则留空。
7. 点击 **Deploy**，等待构建完成。
8. 部署成功后会得到 `https://xxx.vercel.app` 的预览地址。

---

### 3. 域名解析与绑定（glp1guide.com）

1. **在 Vercel 添加域名**  
   - 项目 → **Settings** → **Domains** → **Add** → 输入 `glp1guide.com` 和 `www.glp1guide.com`（按需）。  
   - Vercel 会提示需要配置的 DNS 记录。

2. **在域名服务商做解析**（以常见厂商为例）  
   - **A 记录**：`@` → `76.76.21.21`（Vercel 的 IP，以 Vercel 控制台为准）。  
   - **CNAME 记录**：`www` → `cname.vercel-dns.com`（以 Vercel 提示为准）。  
   - 若 Vercel 提供 CNAME 方式解析根域名（如 `cname.vercel-dns.com`），则按 Vercel 文档操作。

3. **在 Vercel 中验证**  
   - 回到 **Domains**，等待 SSL 与 DNS 验证通过；状态变为 Ready 即可用 `https://glp1guide.com` 访问。

**注意**：DNS 生效可能需要几分钟到 48 小时，视服务商而定。

---

## 四、上线后建议检查

| 检查项 | 操作 |
|--------|------|
| 根路径 | 访问 `https://glp1guide.com/` 和 `https://www.glp1guide.com/`（若已绑），应正常显示首页且无 404。 |
| **Sitemap / robots** | 访问 `https://你的域名/sitemap.xml` 和 `https://你的域名/robots.txt`，应返回 XML/文本内容而非 404。构建后二者在 `out/` 根目录，部署时需一并发布。若 404，检查托管是否把整个 `out/` 根目录作为站点根（含 `sitemap.xml`、`robots.txt`）。 |
| 静态资源 | 检查样式、图片、脚本是否加载正常（当前为静态导出，资源均来自同域或 CDN）。 |
| 关键页 | 打开首页、Calculator、Alternatives、Legitimacy、FAQ、About，确认无白屏或报错。 |
| 移动端 | 用手机或 DevTools 移动模式看导航、表单、CTA 是否可用。 |
| 每月数据更新 | 若已启用 GitHub Actions（`data-update-reminder.yml`），确认 1/15 或手动触发后，Vercel 能收到 push 并自动重新部署。 |

---

## 五、结论

- **可以推送到 GitHub**：无敏感信息被提交、构建通过、README 有说明。  
- **可以做域名解析并绑定 Vercel**：全站已统一使用 `https://glp1guide.com`，按 Vercel 文档配置 DNS 即可。  
- **可以部署至 Vercel 上线**：Next 静态导出与 Vercel 兼容，无需必选环境变量即可运行。

按上述步骤执行即可完成从推送到域名解析再到 Vercel 上线的全流程。

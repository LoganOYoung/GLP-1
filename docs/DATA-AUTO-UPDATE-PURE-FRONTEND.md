# 纯前端下如何做到数据自动更新

本文说明在**不部署自有后端服务**的前提下，GLP-1 网站如何实现或增强「数据自动更新」。

---

## 一、当前架构（已是纯前端）

- **数据存放**：`data/*.json`（calculator-prices、telehealth-platforms、trumprx-states、discount-cards）
- **读取方式**：构建时通过 `import ... from '@/data/xxx.json'` 打进静态页面
- **部署**：Vercel / Netlify 等静态/SSG 托管，无 Node 常驻服务

因此站点本身就是**纯前端**：没有你维护的 API 服务器，数据更新依赖「改仓库 → 重新构建 → 重新部署」。

---

## 二、已有的「自动」机制（日期刷新 + 触发部署）

**GitHub Action**（`.github/workflows/data-update-reminder.yml`）：

| 触发 | 频率 | 动作 |
|------|------|------|
| `schedule` | 每月 1 号、15 号 09:00 UTC | 运行 `scripts/refresh-data-dates.js` |
| `workflow_dispatch` | 手动 | 同上 |

**脚本做的事**：

1. **（可选）拉取外部数据**：若在仓库里配置了 `CALCULATOR_PRICES_URL`、`TELEHEALTH_PLATFORMS_URL`、`TRUMPRX_STATES_URL`、`DISCOUNT_CARDS_URL` 任一变量，会先运行 `scripts/fetch-external-data.js` 从对应 URL 拉取 JSON 并覆盖 `data/*.json`；未配置或拉取失败则跳过，不影响后续步骤。
2. 把 `data/*.json` 里所有 `lastUpdated` 更新为**当天日期**
3. 若有变更则 `git add data/` → `git commit` → `git push`
4. 托管平台检测到 push，**自动重新构建并部署**
5. 每月 1 号还会在仓库里 **Create issue**，提醒人工检查并更新价格/链接（见 [DATA-UPDATE-PROCESS.md](./DATA-UPDATE-PROCESS.md)）

**效果**：

- **日期**：全站「最后更新」展示会定期变成最新，无需人工改 JSON
- **触发部署**：每次 push 都会带来一次全新构建，用户看到的是最新一次构建时的数据
- **数值本身**：价格、TrumpRx 州状态等仍需要人工改（或下面方案 2/3 自动化）

总结：**纯前端下，你已经实现了「定期自动刷新日期 + 自动触发部署」**；若还要「自动改价格/州状态等」，需要下面两种方式之一。

---

## 三、纯前端的两种「自动更新数据」思路

### 思路 1：定时任务改仓库 → 触发部署（推荐、无后端）

**做法**：在现有 GitHub Action 里加一步（或新 workflow），用脚本**拉取外部数据 → 写入 `data/*.json` → 若有变更再 commit + push**。  
站点仍然只在构建时读本地 JSON，不跑任何自有 API。

**适用**：

- 有**稳定、可脚本调用的数据源**：例如公开 API、RSS、或允许的爬虫
- 价格/州状态等**允许延迟几小时到一天**（按 cron 频率更新即可）

**示例流程**：

```
1. cron 或 workflow_dispatch 触发
2. 脚本 fetch(某 API) 或爬取页面 → 解析出价格/州状态
3. 写入 data/calculator-prices.json、data/trumprx-states.json 等
4. git diff data/ → 若有变更则 git add / commit / push
5. Vercel/Netlify 检测 push → 自动 build + deploy
```

**注意**：

- 若用第三方 API，需遵守其 ToS 与 rate limit
- 若用爬虫，需确认目标站点的 robots.txt 与法律条款
- GLP-1 价格多数无官方统一 API，可考虑：人工维护 + 每月 issue 提醒（当前做法），或接入合规的第三方数据商

**实现要点**（在现有 repo 内即可）：

- 在 `.github/workflows/` 里新增或扩展现有 workflow，增加一个 step 运行 Node 脚本
- 脚本内用 `fetch()` 或 `axios` 拉数据，用 `fs.writeFileSync` 写 `data/*.json`
- 用 `git status --short data/` 或 `git diff` 判断是否有改动，有则 `git add` / `git commit` / `git push`（需 `contents: write` 权限，已有）

这样仍然是**纯前端**：没有你部署的后端，只是「定时任务在 GitHub 上改文件并 push」。

**已实现**：项目里已加入 `scripts/fetch-external-data.js`，并在同一 workflow 中增加一步「Fetch external data (optional)」。要启用「从外部 URL 自动拉数据」：

1. 在 GitHub 仓库 **Settings → Secrets and variables → Actions → Variables** 中新增变量（任选）：
   - `CALCULATOR_PRICES_URL`：返回与 `data/calculator-prices.json` 同结构的 JSON 的 URL
   - `TELEHEALTH_PLATFORMS_URL`：返回与 `data/telehealth-platforms.json` 同结构的 JSON 的 URL
   - `TRUMPRX_STATES_URL`：返回与 `data/trumprx-states.json` 同结构的 JSON 的 URL
   - `DISCOUNT_CARDS_URL`：返回与 `data/discount-cards.json` 同结构的 JSON 的 URL
2. 每月 1/15 或手动触发 workflow 时，会先请求这些 URL；若返回合法 JSON 且结构校验通过，则覆盖对应 `data/*.json`，再执行日期刷新与 commit+push。
3. 本地测试：`CALCULATOR_PRICES_URL=https://example.com/prices.json npm run fetch-external-data`（无 URL 时脚本仅打印 "no URLs set" 并退出）。

---

### 思路 2：构建时或运行时从「外部 URL」读数据（仍可不跑后端）

站点不一定要从仓库内 `data/*.json` 读；也可以从**公网可访问的 URL** 读，这样数据更新不必每次改仓库。

**2a）Next.js 构建时 fetch + revalidate（ISR）**

- 在 page/layout 里用 `fetch(某个 URL, { next: { revalidate: 3600 } })` 拉取 JSON
- 该 URL 可以是：GitHub Raw、你放在 CDN 的 JSON、或 Headless CMS 的 API
- 部署后，Next 会在 `revalidate` 秒后重新拉取并更新静态内容，**无需重新部署**

**2b）浏览器端 fetch（Client Component）**

- 页面加载后，用 `useEffect` + `fetch(某个 URL)` 取数据并 setState 渲染
- 数据永远来自「该 URL 当前内容」；更新数据只需更新该 URL 背后的文件/API（例如 GitHub Raw 或 CMS）
- 缺点：首屏无数据（或需 skeleton），SEO 若依赖这部分内容需配合服务端渲染或预填

**共同点**：

- 「数据源」在别处（GitHub、CDN、CMS），本站不存数据、只消费
- 不部署自有后端，仍是纯前端；若 URL 是 GitHub Raw 或静态 JSON，则连 CMS 都可以没有

---

## 四、推荐组合（纯前端、尽量自动）

| 目标 | 做法 |
|------|------|
| **日期与部署节奏** | 保持现有 Action：每月 1/15 刷新 `lastUpdated` 并 push，触发部署 |
| **提醒人检查** | 保持每月 1 号 Create issue，按 [DATA-UPDATE-PROCESS.md](./DATA-UPDATE-PROCESS.md) 更新价格/链接 |
| **若有可用的价格/州 API** | 在 Action 里加一步：脚本拉 API → 写 `data/*.json` → 有变更再 commit+push |
| **若引入 Headless CMS** | 部分数据改由 CMS 管理，站点用 2a 或 2b 从 CMS API 读；仍可不跑自有后端 |

这样在**纯前端**前提下，既能自动刷新日期与触发部署，又能在有数据源时逐步自动化「真实数据」的更新。

---

## 五、相关文件速查

| 文件 | 作用 |
|------|------|
| `.github/workflows/data-update-reminder.yml` | 每月 1/15 先可选拉取外部数据、再刷新 `lastUpdated`、commit+push、每月 1 号建 issue |
| `scripts/fetch-external-data.js` | 按环境变量从 URL 拉取 JSON 写入 `data/*.json`（未配置或失败则跳过） |
| `scripts/refresh-data-dates.js` | 把所有 `data/*.json` 的 `lastUpdated` 改为当天 |
| `scripts/update-data.js` | 本地一条命令改某条价格/州状态等（`npm run update-data --`） |
| `data/README.md` | 各 JSON 含义与更新频率 |
| `docs/DATA-UPDATE-PROCESS.md` | 人工更新价格/链接的流程与检查清单 |
| `docs/DATA-SOURCES-AND-ZERO-OPS-UPDATES.md` | 数据源与零运维/低运维方案（JSON、CMS、API） |

---

**结论**：在纯前端下，**自动更新**已经通过「定时 Action 刷新日期 + push 触发部署」实现；若还要**自动更新价格等业务数据**，优先在同一个（或新）GitHub Action 里用脚本拉取可用的外部数据并写回 `data/*.json`，再 commit+push，无需自建后端。

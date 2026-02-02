# 全站结构评估 (Rx Likewise / GLP-1 Guide)

评估时间：2026-01  
范围：路由、组件、数据、导航、SEO、品牌一致性。

---

## 一、技术栈与构建

| 项目 | 说明 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 构建 | 生产环境 `output: 'export'` 静态导出，适合 Vercel / 静态托管 |
| 样式 | Tailwind CSS，`tailwind.config.ts` 含 primary/secondary 等主题色 |
| 字体 | Google Inter，在 `app/layout.tsx` 用 `<link>` 加载 |
| 脚本 | 根路径重定向 `inject-root-redirect.js` 在 build 后执行；`fetch-external-data.js` 供 CI 拉取外部数据 |

**结论**：结构清晰，静态导出与当前部署方式匹配。

---

## 二、路由与页面结构

### 2.1 路由一览

| 类型 | 数量 | 路径 |
|------|------|------|
| 静态 | 14 | `/`, `/about`, `/alternatives`, `/calculator`, `/comparison`, `/cost-insurance`, `/cost-insurance/appeals`, `/faq`, `/labs`, `/legitimacy`, `/legitimacy/shortage`, `/quiz`, `/tools/dose-converter`, `/trumprx` |
| 动态 | 1 路由 → 4 页 | `/drugs/[slug]` → wegovy, ozempic, mounjaro, zepbound |
| **合计** | **18 个可访问页面** | 不含 404 / error |

### 2.2 层级与职责

- **扁平**：主要栏目均为一级路径（`/alternatives`, `/cost-insurance`, `/legitimacy` 等），仅 appeals、shortage、dose-converter 为二级，便于记忆与 SEO。
- **职责清晰**：每路由对应单一主题（费用、替代、真假、计算器、对比、测验等）。
- **错误与 404**：`app/error.tsx`、`app/global-error.tsx`、`app/not-found.tsx` 齐全，符合 App Router 要求。

---

## 三、组件与布局

### 3.1 全局布局 (`app/layout.tsx`)

- **结构**：`SkipLinks` → `ReadingProgress` → `Header` → `main#main-content` → `Footer` → `BackToTop`
- **无障碍**：Skip links、main 地标、Reading progress 具备。
- **Metadata**：根 layout 设 default title/description/template、keywords、openGraph、robots。

### 3.2 全局组件 (`components/`)

| 类别 | 组件 | 用途 |
|------|------|------|
| 导航 | Header, NavDesktop, MobileMenu | 全站导航与主 CTA |
| 布局 | Breadcrumbs, Footer, SkipLinks, BackToTop, ReadingProgress | 面包屑、页脚、无障碍与体验 |
| 首页 | HeroBanner, HomeFlowByRole, HomeComparisonSection | 首页分流与对比入口 |
| 工具/内容 | CalculatorMultiStep, ComparisonClient 等 | 各页业务组件 |
| 通用 | ImagePlaceholder, LastUpdated, RelatedPages, DisclaimerBanner | 图片、时间、相关页、免责 |
| 结构化数据 | StructuredData | JSON-LD 等 |

**结论**：全局壳统一，页面级组件按路由拆分合理；部分重组件（如 Calculator、Alternatives）放在各自 `app/` 目录下，便于按需维护。

### 3.3 页面级组件分布

- **alternatives**：AlternativesClient + PathComparisonTable、PharmacyLegitimacyRadar、StockTrackerWidget 等，模块多但职责分明。
- **cost-insurance**：PriceSnapshotWithHSA、DiscountCardGrid、TrumpRxGuide、FAQSection 等，与费用/保险/政策一致。
- **calculator**：CalculatorMultiStep（在 components）+ calculator-engine、advanced-calculator-engine（在 app/calculator）。
- **legitimacy**：VerifiedPharmaciesSection、shortage 子路由。
- **drugs/[slug]**：DrugInfoClient + drug-data，动态页统一结构。

---

## 四、数据与配置

### 4.1 数据层

| 位置 | 内容 |
|------|------|
| `data/*.json` | calculator-prices, discount-cards, telehealth-platforms, trumprx-states；供前端或脚本使用 |
| `app/*/ *-data.ts` 或 `*-prices.ts` | faq-data, cost-insurance-data, cost-insurance-prices, alternatives-data, telehealth-prices, comparison-data, drug-data, trumprx-data |
| `lib/` | nav-config, related-pages-data, calculator-data, ingredient-data, lab-data, us-states, telehealth-api 等 |

**结论**：数据按业务拆分，导航与相关页集中配置，利于统一改链接与文案。

### 4.2 导航配置 (`lib/nav-config.ts`)

- **6 个一级组**：Get Started → Costs & Savings → Alternatives → Safety & Trust → Tools → Resources。
- **主 CTA**：Find Your Option → `/quiz`。
- **顺序**：Costs 在 Alternatives 前，与「费用优先」策略一致。

---

## 五、站内链接与入口

- **导航**：6 组下拉 + 主 CTA 覆盖 `/`, `/quiz`, `/comparison`, `/alternatives`, `/cost-insurance`, `/calculator`, `/trumprx`, `/cost-insurance/appeals`, `/legitimacy`, `/labs`, `/tools/dose-converter`, `/faq`, `/about`。
- **Footer**：Content / Tools / Drug Info / Policy / Resources 等区块，含「Start by your situation」分流与 Appeal Center、Shortage、药物详情等。
- **RelatedPages**：由 `lib/related-pages-data.ts` 驱动，各内容页底部可展示相关页。
- **Breadcrumbs / Quick links**：各页有面包屑与情境化快速链接。
- **孤岛**：无；18 个页面均被导航、Footer 或内容链接覆盖（参见 `docs/SITE-PAGES-AND-LINKS.md`）。

---

## 六、SEO 与元数据

- **根 layout**：default title、description、template、keywords、openGraph、robots。
- **各页**：在对应 `page.tsx` 中 export `metadata`（title、description、keywords、openGraph），部分页有 FAQ/HowTo/Service 等 JSON-LD。
- **结构化数据**：Footer 含 Organization；cost-insurance 有 FAQ + HowTo；calculator 有 SoftwareApplication 等。
- **URL**：静态路径语义清晰，无冗余参数；动态仅 `/drugs/[slug]`，slug 固定集合。

**已统一**：全站已使用 Rx Likewise、https://www.rxlikewise.com 与 tagline「Same results, smarter choices」。

---

## 七、品牌与域名一致性（已统一）

全站已统一为 **Rx Likewise** 与 **https://www.rxlikewise.com**，tagline 为 **Same results, smarter choices**。已更新：`app/layout.tsx`、`components/Header.tsx`、`components/Footer.tsx`、`components/Breadcrumbs.tsx`、`components/StructuredData.tsx`、`app/page.tsx`、`app/about/page.tsx`、`app/about/AboutClient.tsx`、`app/calculator/page.tsx`、`app/faq/page.tsx`、`app/alternatives/page.tsx`、`app/cost-insurance/page.tsx`、`app/drugs/[slug]/page.tsx`、`components/PriceStockAlert.tsx`、`app/calculator/calculator-engine.ts`。

---

## 八、优势小结

1. **路由扁平、主题清晰**：18 页无孤岛，利于用户与爬虫。
2. **导航与分流明确**：6 组 + 主 CTA + Footer「Start by your situation」与 RelatedPages 形成闭环。
3. **数据与配置集中**：nav-config、related-pages-data、各 *-data.ts 便于维护与扩展。
4. **静态导出 + 错误边界完整**：部署简单，稳定性好。
5. **无障碍与基础 SEO**：Skip links、main 地标、metadata、部分 JSON-LD 已具备。

---

## 九、可选优化建议

1. **品牌统一**：已完成（Rx Likewise + www.rxlikewise.com + tagline）。
2. **Sitemap**：若尚未有，可增加 `app/sitemap.ts` 或静态 `public/sitemap.xml`，并提交 Search Console。
3. **robots.txt**：确认 `public/robots.txt` 存在且允许爬取需收录路径。
4. **性能**：大列表页（如 comparison、alternatives）可视需要做虚拟滚动或分块；图片已 unoptimized，若 CDN 支持可考虑后续用 Next Image 或外部优化。
5. **文档**：`docs/` 内多为历史与规划，可保留一份「当前全站结构」入口文档（本文档）并随大改更新。

---

**总结**：全站结构清晰、路由与链接完整、数据与导航配置集中，具备良好可维护性与扩展性。下一步建议优先完成品牌与域名统一（Rx Likewise + rxlikewise.com），再视需要补 sitemap/robots 与性能优化。

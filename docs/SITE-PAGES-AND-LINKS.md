# 全站页面与链接汇总

## 一、页面总数

| 类型 | 数量 | 说明 |
|------|------|------|
| 静态路由 | 14 | 每个对应一个 `app/.../page.tsx` |
| 动态路由 | 1 个路由 → 4 个页面 | `/drugs/[slug]` 生成 wegovy, ozempic, mounjaro, zepbound |
| **合计** | **18 个可访问页面** | 不含 404 / error 等特殊页 |

### 静态路由列表（14）

| 路径 | 说明 |
|------|------|
| `/` | 首页 |
| `/about` | About / Medical Blog |
| `/alternatives` | GLP-1 替代方案 |
| `/calculator` | 成本计算器 |
| `/comparison` | 药物对比表 |
| `/cost-insurance` | 费用与保险 |
| `/cost-insurance/appeals` | 申诉中心 |
| `/faq` | 常见问题 |
| `/labs` | 实验室透明度 |
| `/legitimacy` | 合法性 / 药房雷达 |
| `/legitimacy/shortage` | FDA 短缺状态 |
| `/quiz` | 找到你的选项（测验） |
| `/tools/dose-converter` | 剂量换算工具 |
| `/trumprx` | TrumpRx $350 项目 |

### 动态路由页面（4）

| 路径 | 说明 |
|------|------|
| `/drugs/wegovy` | Wegovy 详情 |
| `/drugs/ozempic` | Ozempic 详情 |
| `/drugs/mounjaro` | Mounjaro 详情 |
| `/drugs/zepbound` | Zepbound 详情 |

---

## 二、孤岛页面检查（是否有页面未被站内链接）

**结论：无孤岛页面。** 每个可访问页面都至少被以下一种方式链接：

- **全局导航**：Header 首页链接；NavDesktop / MobileMenu 使用 `lib/nav-config.ts` 的 6 组菜单（Get Started, Alternatives, Costs & Savings, Safety & Trust, Tools, Resources），覆盖 `/`, `/quiz`, `/faq`, `/comparison`, `/alternatives`, `/cost-insurance`, `/calculator`, `/trumprx`, `/cost-insurance/appeals`, `/legitimacy`, `/labs`, `/tools/dose-converter`, `/about`。
- **Footer**：链接到上述所有主要栏目 + `/legitimacy/shortage`、`/drugs/wegovy`、`/cost-insurance/appeals`、`/about` 等。
- **各页内容**：Quick links、RelatedPages（`lib/related-pages-data.ts`）、Breadcrumbs、正文中的链接。
- **药物详情**：Comparison 表 (`ComparisonClient`) 中每行链接到 `/drugs/${row.slug}`；药品详情页 (`DrugInfoClient`) 中“替代药物”链接到 `/drugs/${altId}`；`StockTrackerWidget` 链接到 `/drugs/${drugSlug}`。因此 4 个药物页均被站内链接。

### 各页面入链来源简表

| 页面 | 主要入链来源 |
|------|----------------|
| `/` | Header logo、Nav Get Started、Breadcrumbs、error/not-found |
| `/about` | Footer、FAQ/Newsletter 等正文、Nav Resources |
| `/alternatives` | Footer、首页 Explore、Nav、多处 RelatedPages 与正文 |
| `/calculator` | Footer、首页 CTA、Nav、多处 Quick links / RelatedPages |
| `/comparison` | Footer、Nav、alternatives/comparison 等页 |
| `/cost-insurance` | Footer、首页、Nav、calculator/trumprx/appeals 等 |
| `/cost-insurance/appeals` | Footer、cost-insurance、trumprx、RelatedPages |
| `/faq` | Footer、首页 FAQ 预览、Nav、Mobile 搜索、多处正文 |
| `/labs` | Footer、legitimacy 页、ComplianceFlowDiagram、RelatedPages |
| `/legitimacy` | Footer、首页 Explore、Nav、多处 Quick links |
| `/legitimacy/shortage` | Footer、legitimacy 页、首页 Explore、StockTrackerWidget |
| `/quiz` | 首页 CTA、Footer、Nav Get Started、AboutClient |
| `/tools/dose-converter` | Footer、Nav Tools、comparison/alternatives 等 |
| `/trumprx` | Footer、cost-insurance、CalculatorMultiStep、RelatedPages |
| `/drugs/wegovy` | Footer「Drug Information」、comparison 表、其他药物页「替代」 |
| `/drugs/ozempic` | comparison 表、其他药物页「替代」、StockTrackerWidget |
| `/drugs/mounjaro` | comparison 表、其他药物页「替代」、StockTrackerWidget |
| `/drugs/zepbound` | comparison 表、其他药物页「替代」、StockTrackerWidget |

---

## 三、建议

- 全站共 **18 个页面**，**无孤岛页面**。
- 若后续新增路由（例如新药物 slug、新工具页），请在 **Footer** 或 **nav-config** 或 **related-pages-data** 中至少增加一处链接，并在本表中补充入链来源，以利于收录与发现。

# 扁平化架构：利弊与实操指南

## 一、核心逻辑：什么是「更扁平」？

扁平化 = **从首页到任意深度内容/工具的点击次数（Click Depth）减少**。通过多内链形成**网状结构**，而非单向漏斗。

---

## 二、优势（如何发挥）

| 优势 | 实操 |
|------|------|
| **SEO 语义权重** | 每页一个主题、独立 title/meta；长尾词单独页面（如 Appeal Center、Dose Converter）。 |
| **长尾覆盖** | 为每个子页设置精准的 title/description（如「Zepbound 申诉模板」）。 |
| **降低认知负荷** | 短页 + Quick links + 面包屑，用户直达目标，少滚屏。 |
| **移动端友好** | 短页加载快；导航用手风琴/下拉，减少长列表滚动。 |
| **PV 与转化埋点** | 内链多 → PV 提升；按页面统计「从哪一页流向药商/Calculator」，优化 Affiliate。 |

---

## 三、隐患（如何避免）

| 隐患 | 应对 |
|------|------|
| **薄内容 / 权重稀释** | 每页至少 300–500 字实质内容；不为一两个关键词单独建空页。子页可「摘要 + 链接到母页或 FAQ」。 |
| **点击疲劳** | 关键路径控制在 2 次点击内（如 Home → Calculator；Home → Costs → Appeal）。Quick links 和导航直接暴露深度工具。 |
| **内链维护成本** | 用**单一数据源**：`lib/related-pages-data.ts`、`lib/nav-config.ts`；新增/下线页面时只改配置。定期跑 `docs/OUTBOUND-LINKS.md` 与 `scripts/check-outbound-links.js`。 |

---

## 四、已落实的实操

1. **面包屑**：所有内容页与工具页顶部有 Breadcrumbs（Home > 一级 > 二级），含 JSON-LD。
2. **Quick links**：Cost & Insurance、Alternatives、FAQ、Legitimacy、Comparison、TrumpRx、About 等页均有「Quick links」条，减少点击深度。
3. **导航分层**：6 组一级菜单（Get Started, Alternatives, Costs & Savings, Safety & Trust, Tools, Resources），下拉直达子页。
4. **Related Pages**：每页底部统一用 `getRelatedPagesFor(context)`，避免孤岛页。

---

## 五、建议的下一步

1. **全局搜索**：在 Header 增加「搜索」入口（如链到 `/faq` 或站内搜索），便于从任意页找 FAQ/主题。
2. **拆分与内聚**：  
   - Alternatives：若「药房资质核查」「减重效果曲线」内容增多，可拆为 `/alternatives/legitimacy-radar`、`/alternatives/efficacy`，并在 Alternatives 主页保留摘要 + 链接。  
   - Cost & Insurance：TrumpRx、Appeal Center 已独立；主页保持「枢纽 + 摘要」。  
   - Calculator：保持精简；结果页可链到「价格优化指南」或 Cost & Insurance。
3. **内容底线**：新子页遵循「逻辑内聚」：一个 URL 一个主题，且具备足够实质内容（避免薄页）。

---

## 六、总结

「短页面、多内链」把网站从**信息库**升级为**专业工具网**，符合 E-E-A-T 与 2026 年搜索偏好。  
**发挥优势**：主题清晰、面包屑 + Quick links + 分层导航、内链与转化可追踪。  
**避免弊端**：每页有实质内容、关键路径 ≤2 点击、内链与出链用配置与脚本统一维护。

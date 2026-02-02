# 首页结构与功能规划

## 一、结构（自上而下）

| 区块 | 功能 | 说明 |
|------|------|------|
| **Hero** | 首屏价值主张 + 主 CTA | 标题、一句话价值、两个主按钮（Calculator / Quiz）、信任线（US · 非医疗建议） |
| **Trust** | 信任声明 | 简短一行：Informational only · US-focused · 不售药 · 非医疗建议 |
| **We help with** | 四大痛点 + 入口 | 药价贵、保险拒、常缺货、信息乱 → 每项一句话 + 链到对应 hub 或工具 |
| **Primary tools** | 两个核心工具 | Calculator、Find Your Option，卡片带说明和 CTA |
| **Content hubs** | 三大内容板块 | Alternatives、Cost & Insurance、Legitimacy，卡片带摘要和「Learn more」 |
| **Featured** | 精选内容 | 4 张卡片：Calculator、申诉信模板、Legitimacy、Find your option |
| **FAQ summary** | FAQ 摘要 | 5 个高频问题链接到 /faq#id |
| **Quick links** | 常用入口 | FAQ、FDA Shortage、About，横向链接 |
| **Newsletter** | 邮件订阅 | NewsletterSignup 组件，标题「Get updates」+ 说明 |
| **Bottom CTA** | 收尾引导 | 「不确定从哪开始？做问卷」+ 按钮链到 Quiz |

## 二、功能要点

- **Hero**：主标题可带副标题；双 CTA 区分主次（主：Calculator，次：Quiz 或反之）。
- **We help with**：4 项用简洁图标或数字，每项可点击整块区域跳转。
- **Tools / Hubs**：卡片统一风格，hover 有反馈，移动端堆叠。
- **Quick links**：减少滚动，方便直接到 FAQ / Shortage / About。
- **SEO**：保持现有 metadata；区块用 section + id（如 #tools）便于以后锚点链接。

## 三、实施状态

- 已按上述结构实现首页 `app/page.tsx`。
- 已补充可选板块：Trust、Featured（精选内容）、FAQ summary、Newsletter。

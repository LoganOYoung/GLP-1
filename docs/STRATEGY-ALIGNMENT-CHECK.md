# 当前站点与策略方向对齐情况

对照 [STRATEGY-REVENUE-VS-COST.md](./STRATEGY-REVENUE-VS-COST.md) 的设定，当前网站**基本符合**该方向；仅有个别可选项可微调。

---

## 一、方向与定位：符合

| 策略要求 | 当前站点 | 结论 |
|----------|----------|------|
| 一句话：美国用户查 GLP-1 到手价、比选项、验药房 | 首页 H1：「GLP-1 Guide: Real Cost, Alternatives & Legitimacy」；副文案强调 out-of-pocket estimates、compare options、avoid scams | ✅ 一致 |
| 战略重心 1：成本 + 计算器 | Hero 主 CTA「Estimate your cost」→ /calculator；分流「I have insurance」主链 /calculator、/cost-insurance | ✅ 成本优先已体现 |
| 战略重心 2：替代 + 对比 | 分流「Uninsured / paying cash」→ /alternatives、/cost-insurance；导航有 Alternatives、Comparison | ✅ 一致 |
| 战略重心 3：合法性 + 短缺 | 导航 Safety & Trust → /legitimacy、/comparison、/labs；Legitimacy 含红绿 flag、短缺、验证药房 | ✅ 一致 |
| 不卖药、不处方 | 全站免责「Informational only」「We do not sell medications」 | ✅ 一致 |

---

## 二、收益策略：符合

| 策略要求 | 当前站点 | 结论 |
|----------|----------|------|
| 联盟为主，高意图页 CTA 清晰 | Calculator 结果、Alternatives（Telehealth + 药房）、Legitimacy 验证药房均有联盟链接 + 近链披露 | ✅ 一致 |
| 不卖 lead、不泛展示广告 | 无 lead 收集变现、无 AdSense | ✅ 一致 |
| 赞助仅后期、且标注 | 未接赞助 | ✅ 符合「后期」 |

---

## 三、成本策略：符合

| 策略要求 | 当前站点 | 结论 |
|----------|----------|------|
| 内容/数据极简 + 自动化 | 数据用 data/*.json；GitHub Actions 每月刷新 lastUpdated、可选拉取外部数据 | ✅ 一致 |
| 技术零后端、静态 | Next `output: 'export'`，无 app/api、无数据库 | ✅ 一致 |
| 获客以 SEO 为主 | 多页、内链、入口清晰、Breadcrumbs/结构化数据 | ✅ 一致 |
| 无日更、无 UGC | 无新闻流、无评论 | ✅ 一致 |

---

## 四、可选项（非必须）

| 项目 | 说明 | 建议 |
|------|------|------|
| **导航顺序** | 策略优先级为「成本 → 替代 → 合法性」；当前导航为 Get Started → Alternatives → Costs & Savings → Safety & Trust → Tools → Resources | 若希望导航与战略完全一致，可将 **Costs & Savings** 提前到 **Alternatives** 之前；当前首页 Hero 已把「成本」设为主 CTA，不调也可 |
| **Resources 下「Medical Blog」** | 实际链到 About，并非博客 | 可改名为「About」或「Our Mission」，避免「Medical」带来诊疗联想；非必须 |

---

## 五、结论

- **方向**：当前站点与「美国用户查 GLP-1 到手价、比选项、验药房的首选信息与工具站」的定位一致，三个战略重心（成本、替代、合法性）均有对应页面与入口，且不卖药、不处方。
- **收益/成本策略**：联盟为主、高意图页已接好；技术零后端、数据自动化、获客以 SEO 为主，与策略一致。
- **可选优化**：仅导航顺序、Resources 下「Medical Blog」命名等小处可按需微调，不影响「符合方向」的结论。

**总结：当前网站符合既定方向与策略；无需大改即可按该方向运营。**

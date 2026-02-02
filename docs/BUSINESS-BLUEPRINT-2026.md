# 2026 减肥药平替数字资产站：全维度商业蓝图

> **本文档是运营手册和价值说明书，用于未来将站点作为"数字资产"出售时的价值证明。**

---

## 一、市场背景与价值定位 (Value Proposition)

### 1. 2026 市场现状

- **爆发式需求**：GLP-1 药物（司美格鲁肽、替泽帕肽）已从单纯的减肥药演变为"全健康管理药物"（涵盖心脏病、肾脏病保护）。
- **政策拐点**：2026 年初 TrumpRx 控价计划上线，政府开始介入控价（~$350），但资格审核严苛。
- **形态进化**：第一代口服 GLP-1 小分子药物（如 Orforglipron）正式商业化，用户面临"打针还是吃药"的新决策。

### 2. 我们的核心价值

- **消除"信息不对称"**：用户在复杂的保险政策、波动的药房库存和混乱的平替方案中迷失，我们提供一站式决策引擎。
- **建立"信任绿洲"**：在充斥着非法"科研肽"的市场中，我们通过 LegitScript 认证标准筛选合规 Telehealth 平台，成为用户的安全护城河。

---

## 二、产品体系与功能架构 (Product Architecture)

### 1. 核心功能模块

#### Alternatives Engine（平替搜索引擎）
- 动态对比"原研药 (Wegovy)"、"合规复方药 (Compounded)"与"新型口服药"。
- 实时抓取全美主流 Telehealth 平台（Henry Meds, Ro, Mochi 等）的价格。

#### Insurance Calculator（保险精算器）
- 基于 2026 年最新保险目录（Formulary），预测用户获得 PA（预先授权）的概率。
- 自动计算使用 TrumpRx 补贴后的实际到手价。

#### Legitimacy Radar（合规雷达）
- 监控 503A/503B 药房的 FDA 注册状态与质检记录。

### 2. 用户留存工具 (Lead Magnets)

- **Stock Alert System**：订阅特定剂量、特定地区的补货通知。
- **Appeal Templates**：提供针对 2026 年保险拒保理由的专业申诉信模板。

---

## 三、竞争策略与优势 (Competitive Edge)

### 1. 错位竞争 (VS. GoodRx & Healthline)

- **垂直深度**：GoodRx 关注所有药物，我们只深挖减肥药。我们提供**"剂量换算计算器"**，这是通才网站无法提供的深度工具。
- **平替敏感度**：传统大媒体不敢深度推荐"复方药（Compounded）"，而我们通过透明化实验室数据，正面切入这一高利润、高需求的灰色地带。

### 2. 技术壁垒

- **实时数据化**：放弃静态博客模式，采用 Next.js + 实时 API。用户看到的是"3 分钟前更新的价格"，而非"去年写的文章"。
- **SEO 结构化**：全站集成 FAQPage 和 Product Schema，在 Google 搜索结果中直接展示价格区间和星级。

---

## 四、商业变现与资产化策略 (Business Model)

### 1. 收入流 (Revenue Streams)

- **Affiliate Commissions**：引导用户至合规远程医疗平台（单笔转化价值 $150-$300）。
- **Lead Generation**：将高净值（拥有特定保险且 PA 被拒）的用户导向专业的保险申诉法律服务。
- **Data Monetization**：匿名化的"用户求药意向图"对药企和药房极具价值。

### 2. 资产退出计划 (The Exit Strategy)

- **资产估值公式**：2026 年此类垂类工具站的估值通常为 **36x - 45x 月纯利润**。
- **潜在买家**：
  - 希望降低获客成本（CAC）的大型 Telehealth 巨头。
  - 寻找高增长医疗资产的私募股权基金（PE）。
  - 正在转型数字服务的传统连锁药房。

---

## 五、FAQ 核心知识库（SEO 重点）

为了在 2026 年获得最佳 SEO 效果，FAQ 页面涵盖以下搜索量最高的问题：

1. "How to get $350 GLP-1s via TrumpRx?"
2. "Are compounded GLP-1s still legal after the 2026 shortage updates?"
3. "Injectable vs. Oral: Which 2026 weight loss pill is best for me?"

---

## 六、技术实现状态

### ✅ 已实现

- [x] Alternatives Engine：三条路径对比表（Brand vs Compounded vs Oral）
- [x] **实时 Telehealth 价格展示**：Henry Meds, Ro, Mochi 等平台价格（带"X 分钟前更新"时间戳）
- [x] Insurance Calculator：多步骤保险精算器（3 步表单 + PA 成功率预测）
- [x] **TrumpRx $350 逻辑**：Calculator 引擎集成 2026 政策，无保险用户显示 $350 cap 提示
- [x] Legitimacy Radar：药房资质展示（503A/503B + LegitScript + State Board 验证）
- [x] **信任信号组件**：社会证明（50K+ 用户、100% LegitScript 认证、实时数据）
- [x] Appeal Templates：申诉信模板（Cost & Insurance 页面）
- [x] FAQ 页面：33 个问题（含 3 个高搜索量问题），含 FAQPage Schema
- [x] SEO Schema：FAQPage、SoftwareApplication、Service（Alternatives 页面）
- [x] 剂量换算计算器：Switching Guide（原研剂量 → 复方 Units）

### 🔄 待实现（Phase 2）

- [ ] Stock Alert System：补货通知订阅（需后端 + 定时任务）
- [ ] 实时价格抓取：Telehealth 平台价格 API 集成
- [ ] 用户数据采集：匿名化意向图分析（需后端）
- [ ] Affiliate 深度链接：与合规平台对接

---

## 七、资产价值点

1. **2026 Policy Logic Engine**：`calculator-engine.ts` 中的政策计算逻辑是核心 IP。
2. **实时数据架构**：Next.js + 客户端 API 调用，可扩展为实时数据源。
3. **SEO 基础设施**：结构化数据、FAQ Schema、关键词布局。
4. **用户留存工具**：Email 采集、个性化推荐、工具链。

---

## 八、后续开发优先级

1. **高优先级**：完善 Alternatives 页面的实时价格展示（接入真实 API 或占位数据）。
2. **中优先级**：在 FAQ 中添加上述 3 个高搜索量问题的详细答案。
3. **低优先级**：Stock Alert System（需后端支持）。

---

**文档版本**：v1.0  
**最后更新**：2026-01-30  
**维护者**：GLP-1 Guide Team

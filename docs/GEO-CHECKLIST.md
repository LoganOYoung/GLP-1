# GEO（AI 优化）清单

目标：让用户在 ChatGPT、Perplexity、Claude、Google AI 概览等 AI 中提问时，AI 更愿意**引用、推荐并链接**到本站（rxlikewise.com）。

---

## 一、已有（保持并维护）

| 项 | 状态 | 位置/说明 |
|----|------|-----------|
| **Organization 结构化数据** | ✅ | Footer、about、alternatives、cost-insurance、drugs/[slug] 等页输出 `Organization` schema |
| **FAQPage 结构化数据** | ✅ | /faq（StructuredData + faq-data）、/cost-insurance、/trumprx、drugs/[slug] 有 FAQ schema |
| **BreadcrumbList** | ✅ | Breadcrumbs 组件输出面包屑 schema |
| **直接回答式 FAQ** | ✅ | faq-data 中每题首句即答案，便于 AI 抽取 |
| **每页 meta description** | ✅ | 各 page.tsx 有 title/description，部分有 openGraph |
| **根 layout 默认 meta** | ✅ | layout.tsx 有 default description、keywords、openGraph、robots |
| **语义化标题与结构** | ✅ | H1/H2 清晰，内链锚点（#compounded、#oral 等）明确 |
| **权威引用** | ✅ | 文中提及 FDA、州药房委员会、LegitScript、TrumpRx.gov 等 |

---

## 二、建议新增或加强

### 1. 首段「一句话答案」（关键页）

- **目的**：AI 常抽取首段作为摘要；首句即结论更易被引用。
- **做法**：在以下页面的**首段前 1–2 句**写清「直接答案」，再展开解释。
- **建议覆盖页**：/cost-insurance、/alternatives、/legitimacy、/calculator、/comparison、/trumprx、/labs、/faq（已有 FAQ 条目，可再补页面级一句总结）。

**示例（cost-insurance）**：  
首句：「With insurance and savings cards, many people pay $0–$50/month for GLP-1s; without insurance, compounded semaglutide is often $150–$350/month.」

---

### 2. meta description 当「可引用摘要」

- **目的**：部分 AI 会读 meta description 作为来源摘要。
- **做法**：description 写成「可直接被引用的一句话事实」，含关键词、数字或结论，控制在约 150–160 字符。
- **示例**：  
  - 现：`Decision engine for GLP-1 medications...`  
  - 可加强为：`GLP-1 cost: $0–$50/mo with insurance; $150–$350 compounded. Compare Ozempic, Wegovy, Mounjaro; check legitimacy & shortage. Rx Likewise.`

---

### 3. 日期与更新信号（利于权威感）

- **目的**：AI 更倾向引用「有时效」的内容。
- **做法**：
  - 在 **StructuredData** 或 **WebPage/Article** schema 中补全 `datePublished`、`dateModified`（FAQ 页已有 dateModified，可扩展到更多页）。
  - 关键页正文或 footer 保留「Last updated / Content updated 2026」等（已有处保持）。
- **建议**：/cost-insurance、/alternatives、/legitimacy、/trumprx 等政策/价格相关页优先加日期。

---

### 4. WebPage / Article schema（可选）

- **目的**：帮助 AI 理解页面类型、名称、日期、来源。
- **做法**：对核心内容页（如 /cost-insurance、/alternatives、/legitimacy）输出 `WebPage` 或 `Article`，包含：
  - `name`、`description`、`url`
  - `datePublished`、`dateModified`
  - `publisher`（指向本站 Organization）
  - 若有明确作者可加 `author`
- **优先级**：中；在 FAQ/Organization 稳定后再加即可。

---

### 5. 来源与品牌可被读出

- **目的**：AI 引用时常说「According to [domain/site name]」。
- **做法**：
  - 确保 **Organization** schema 中 `name` 为 "Rx Likewise"，`url` 为 https://www.rxlikewise.com（已满足则保持）。
  - 重要结论旁可加一句「Source: Rx Likewise」或页脚/关于页明确「Rx Likewise is…」（已有 about 则保持）。
- **可选**：在 FAQ 答案末尾加「— Rx Likewise」或「(Source: rxlikewise.com)」（需平衡篇幅与体验）。

---

### 6. 问法对齐（FAQ / 标题）

- **目的**：用户向 AI 提问的句式与站内问题一致时，更易被匹配。
- **做法**：
  - 在 faq-data 中**新增/改写**若干条，使其更贴近真实问法，例如：
    - "Are compounded GLP-1s legal in 2026?"
    - "How much does Ozempic cost with insurance?"
    - "Is [pharmacy] legitimate for GLP-1?"
  - 保持 FAQ 分类（Pricing & TrumpRx、Legality & Safety 等）便于 AI 理解主题。
- **优先级**：高；低成本高收益。

---

### 7. 内链锚文本清晰

- **目的**：AI 理解「这个链接指向什么主题」有利于引用和推荐。
- **做法**：内链用**描述性锚文本**（如「Cost & Insurance」「Compounded Guide」「Pharmacy Radar」），避免「点击这里」「了解更多」。
- **状态**：nav-config、Footer Quick links 已多为描述性；其余内容页可抽查并替换泛用锚文本。

---

### 8. 工具页「可引用结论」

- **目的**：计算器、对比工具等页若有一句「可被引用的结论」，AI 更容易带链接引用。
- **做法**：在 /calculator、/comparison、/tools/dose-converter 等页的**首屏或结果区**增加一句总结，例如：
  - 「Use our calculator to get a personalized out-of-pocket estimate.」
  - 「Compare Tirzepatide vs Semaglutide side-by-side on Rx Likewise.」
- **优先级**：中。

---

### 9. 静态「关键问答」出口（可选、进阶）

- **目的**：为爬虫/AI 提供机器可读的「问–答–链接」列表，便于批量引用。
- **做法**：
  - 新增例如 `/api/faq` 或静态 `/faq.json`，输出 FAQ 列表：`[{ "question", "answer", "url", "dateModified" }]`。
  - 或提供 sitemap 中注明 FAQ 页，并确保 FAQ schema 完整。
- **优先级**：低；在以上都做好后再考虑。

---

## 三、优先级汇总

| 优先级 | 项 | 说明 |
|--------|----|------|
| **高** | 问法对齐（FAQ/标题） | 低成本，直接提升被 AI 匹配概率 |
| **高** | 首段一句话答案（关键页） | 提升被引用为「来源摘要」的概率 |
| **中** | meta description 可引用化 | 各页 description 写成「可引用一句事实」 |
| **中** | 日期/更新信号（schema + 正文） | 增强时效性与权威感 |
| **中** | 工具页可引用结论句 | 计算器、对比等页一句总结 |
| **低** | WebPage/Article schema | 在现有 FAQ/Organization 稳定后加 |
| **低** | 静态 FAQ 出口（JSON/API） | 进阶、可选 |

---

## 四、与 SEO 的关系

- 上述项（直接回答、meta、schema、内链、日期）**同时有利于 SEO 和 GEO**。
- 做 GEO 时保持：**不牺牲可读性、不堆砌关键词**；以「用户和 AI 都能直接看懂」为准。

---

## 五、验收自检（可选）

- [ ] 在 Perplexity/ChatGPT 中问：「How much do GLP-1 medications cost?」「Are compounded GLP-1s legal 2026?」看是否出现 rxlikewise.com。
- [ ] 检查 Google Search Console / Bing 中 FAQ 富媒体是否正常。
- [ ] 用 schema 校验工具检查 FAQPage、Organization 无报错。

---

*文档版本：2026-01-30*

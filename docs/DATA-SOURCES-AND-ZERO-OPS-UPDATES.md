# 全站需定时更新的数据 + 无需运维的更新方案

## 一、全站需定时更新的数据清单

### 1. 高优先级（建议每月）

| 数据类型 | 所在文件 | 位置/常量 | 说明 | 当前更新方式 |
|---------|----------|-----------|------|--------------|
| **药物基础价格** | `app/calculator/advanced-calculator-engine.ts` | `MEDICATION_BASE_COSTS` | Wegovy/Ozempic/Mounjaro/Zepbound/Rybelsus/复方/口服 等 list price | 改代码常量 |
| **药物基础价格（旧引擎）** | `app/calculator/calculator-engine.ts` | `BRAND_BASE_COST`, `COMPOUNDED_BASE_COST`, `ORAL_BASE_COST` | 旧版计算器用 | 改代码常量 |
| **Telehealth 平台价格** | `app/alternatives/telehealth-prices.ts` | `TELEHEALTH_PLATFORMS[]` | 各平台月费、咨询费、会员费、`totalMonthly`、`lastUpdated` | 改 TS 数组 |
| **厂商优惠卡上限** | `app/calculator/advanced-calculator-engine.ts` | `MANUFACTURER_CARD_SAVINGS` | 各药每月/每年节省上限 | 改代码常量 |
| **折扣卡/保险页** | `app/cost-insurance/cost-insurance-data.ts` | `DISCOUNT_CARDS[]` | 厂商卡链接、`maxSavings`、`validUntil` | 改 TS 数组 |

### 2. 中优先级（建议每季度）

| 数据类型 | 所在文件 | 位置/常量 | 说明 | 当前更新方式 |
|---------|----------|-----------|------|--------------|
| **TrumpRx 州级数据** | `app/trumprx/trumprx-data.ts` | `TRUMPRX_STATES[]`, `TRUMPRX_LAST_UPDATED` | 各州 status、effectiveDate、申请链接、notes | 改 TS 数组 |
| **保险 Tier Copay** | `app/calculator/advanced-calculator-engine.ts` | `INSURANCE_TIER_COPAYS` | 各 tier 的 copay、coinsurance | 改代码常量 |

### 3. 低优先级（建议每年或按政策）

| 数据类型 | 所在文件 | 位置/常量 | 说明 | 当前更新方式 |
|---------|----------|-----------|------|--------------|
| **Medicare Part D 覆盖率** | `app/calculator/advanced-calculator-engine.ts` | `MEDICARE_PART_D_COVERAGE` | 糖尿病/减重/default 覆盖率 | 改代码常量 |
| **HSA/FSA 税率** | `app/calculator/advanced-calculator-engine.ts` | `TAX_BENEFIT_RATE` | 有效税率节省比例 | 改代码常量 |

### 4. 内容类（按需更新，非严格“定时”）

| 数据类型 | 所在文件 | 说明 | 当前更新方式 |
|---------|----------|------|--------------|
| **FAQ** | `app/faq/faq-data.ts` | `FAQ_ITEMS[]` 价格/政策相关问答 | 改 TS 数组 |
| **药品详情** | `app/drugs/drug-data.ts` | 各药 `priceRange`、`availability`、`shortageReason`、说明文案 | 改 TS 对象 |
| **替代方案页** | `app/alternatives/alternatives-data.ts` | 路径对比、文案 | 改 TS |
| **成本与保险 FAQ** | `app/cost-insurance/cost-insurance-data.ts` | `COST_INSURANCE_FAQ[]` | 改 TS 数组 |

---

## 二、当前更新方式与痛点

- **现状**：所有数据写在 TypeScript/TS 文件里，更新 = 改代码 + 提交 + 重新部署。
- **痛点**：需要懂代码的人；容易漏更新；没有“谁在什么时候改了什么”的审计；无法让运营/客服直接改价格或文案。

---

## 三、无需运维（或低运维）的更新办法

### 方案 A：用 JSON/YAML 做“数据层” + 定时提醒（零运维改动最小）

**思路**：把“会变的数据”抽到仓库里的 JSON（或 YAML）文件，代码在构建时读取；人还是手动改 JSON，但不用碰 TS。

- **做法**：
  1. 在 `data/` 下新建例如：  
     `data/calculator-prices.json`、`data/telehealth-platforms.json`、`data/trumprx-states.json`、`data/discount-cards.json`。
  2. 定义好 schema（字段名、类型），用 TypeScript 类型从 JSON 推断或手写类型。
  3. 在 `advanced-calculator-engine.ts`、`telehealth-prices.ts`、`trumprx-data.ts`、`cost-insurance-data.ts` 里改为：  
     `import prices from '@/data/calculator-prices.json'` 或 `fetch/readFile` 同目录下的 JSON（构建时读一次即可）。
  4. **“定时”**：用 GitHub Actions 的 **scheduled workflow**（例如每月 1 号）发一封邮件/Slack 提醒：“请检查并更新 `data/*.json`”，并附上 [DATA-UPDATE-PROCESS.md](./DATA-UPDATE-PROCESS.md) 链接。不自动改数据，只提醒。

**优点**：不用上新服务、不用 CMS；非前端也能在编辑器里改 JSON；Git 历史即审计。  
**缺点**：还是要有人去改 JSON 并提交。

---

### 方案 B：Headless CMS（非技术也能改，适合价格+文案）

**思路**：价格、政策摘要、FAQ、药品说明等放到 CMS，站点在**构建时**或**运行时**拉取。

- **可选产品**（均支持定时发布、权限、审计）：
  - **Sanity**：免费档够用，Schema 清晰，适合“价格 + 文案”。
  - **Contentful**：免费档有限，适合小站。
  - **Notion**：用 Notion API 把表格当数据源，编辑体验好，适合小团队。
  - **Strapi**（自托管）：数据在自己服务器，需要一点运维。

- **推荐用法**：
  1. 在 CMS 里建“模型”：例如 Calculator Prices、Telehealth Platform、TrumpRx State、Discount Card、FAQ Item。
  2. 构建时：在 `getStaticProps` 或 Next.js 的 fetch 里调 CMS API，把结果写入内存或生成一层薄薄的 JSON，现有 TS 从这层读（或直接替换当前常量来源）。
  3. 可选：用 **Incremental Static Regeneration (ISR)** 或 **revalidate**，例如 86400（一天）重新拉一次 CMS，这样不重新全站部署也能更新数据。

**优点**：运营/客服可直接改价格和文案；有版本与权限；无需改代码即可更新。  
**缺点**：要接一个外部服务；需要定义 schema 和一次迁移（把现有 TS 数据导入 CMS）。

---

### 方案 C：外部 API 拉取（仅适用于有稳定 API 的数据）

**思路**：若某类数据有现成、稳定的 API，用定时任务拉取并落盘，站点只读本地结果，避免直接依赖 API 可用性。

- **药物价格**：  
  - 例如 **GoodRx** 等第三方有 API，但多为商业合作；若无 API，可考虑方案 A/B。
- **TrumpRx 州级**：  
  - 通常无官方统一 API，适合用 CMS 或 JSON + 人工（方案 A/B）。
- **Telehealth 平台**：  
  - 多为官网抓取或人工维护，适合方案 A 或 B。

**可落地的“零运维”形态**：  
- 用 **GitHub Actions 定时 job**（例如每周一次）：  
  - 若有 API：脚本拉取 → 校验 → 写入 `data/*.json` → 若有变更则 commit 并 push。  
  - 站点 CI 在 build 时读 `data/*.json`。  
- 这样“更新”变成“跑一次 Action”，无需登服务器；若没有可用 API，就退回到方案 A/B。

---

### 方案 D：单一日历提醒 + 清单（零实现成本）

**思路**：不改架构，只把“谁在何时该更新什么”固化下来，减少遗漏。

- 在日历里设重复事件（每月 1 日、每季度 1 日等），标题如：“GLP-1 站：更新价格与 TrumpRx”。
- 事件描述里贴一份**简短清单**（来自本文“数据清单”），并链到 [DATA-UPDATE-PROCESS.md](./DATA-UPDATE-PROCESS.md)。
- 更新方式仍为：改 TS/JSON → PR → 部署。

**优点**：立即可用，零开发。  
**缺点**：仍依赖人工，无自动化。

---

## 四、推荐组合（在尽量不增加运维的前提下）

1. **短期（立刻可做）**  
   - 采用 **方案 D**：日历 + 清单，保证“该更新的数据”和“更新流程”被明确写下来并定期提醒。

2. **中期（1–2 周内可做）** — **已实施 ✅**  
   - **方案 A 已落地**：  
     - 计算器价格、Telehealth、TrumpRx、折扣卡已拆到 `data/*.json`（`calculator-prices.json`、`telehealth-platforms.json`、`trumprx-states.json`、`discount-cards.json`）。  
     - 代码通过 `lib/calculator-data.ts` 及各页面从 JSON 读取；类型由 TS 保留。  
     - **GitHub Actions**：`.github/workflows/data-update-reminder.yml` 每月 1 号 09:00 UTC 自动创建一条 Issue「Data update check – YYYY-MM」，正文列出要检查的 JSON 文件并链到本文档与 [DATA-UPDATE-PROCESS.md](./DATA-UPDATE-PROCESS.md)。  
   - 更新数据只需编辑 `data/` 下 JSON，无需改 TS；提醒由系统自动发。

3. **长期（若有运营/内容人员）**  
   - 引入 **方案 B**：把价格、政策摘要、FAQ、药品价格区间等迁到 Sanity/Contentful/Notion，用 ISR 或 revalidate 定期刷新。  
   - 计算逻辑仍在本站代码里，只把“数据源”从代码常量改为 CMS（或从 CMS 生成的 JSON）。

---

## 五、小结

| 需求 | 推荐做法 |
|------|----------|
| 全站哪些数据要定时更新？ | 见本文 **第一节**：价格、政策、平台、保险 tier、Medicare、内容类等，按月/季/年区分。 |
| 怎么更新？ | 当前：改 TS 并部署；改进：先迁到 **JSON 数据层 + 日历/邮件提醒**（方案 A + D），再视情况上 **CMS**（方案 B）。 |
| 有没有不需要运维的办法？ | 有：**方案 A（JSON + 定时提醒）** 不增加运维；**方案 B（CMS）** 把“运维”变成“在 CMS 里改数”；**方案 C** 仅在有 API 时用 GitHub Actions 自动拉取并写 JSON，无需登服务器。 |

如需，我可以下一步给出：  
- `data/` 下 JSON 的示例 schema，或  
- 一份具体的 GitHub Actions 提醒 workflow 示例（每月发邮件/发 Slack）。

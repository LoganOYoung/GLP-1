# 网站合规与法律风险评估

本文档基于当前代码与文案，对 GLP-1 Guide 网站的合规与法律风险做**非法律意见**的评估，供内部与法务参考。正式合规结论需由律师根据实际业务与管辖法律出具。

---

## 一、已具备的合规措施

### 1. 医疗/健康免责

| 位置 | 内容要点 |
|------|----------|
| **首页 Hero** | “US audience · Informational only · Not medical advice” |
| **DisclaimerBanner**（Alternatives 等） | “This page is informational only. Talk to your doctor before starting or switching any medication. We do not sell medications.” |
| **Alternatives 额外** | “Compounded drugs are not FDA-approved but are legal copies under FDA shortage guidelines.” |
| **About #disclaimer** | 明确：仅信息用途、非医疗建议、不处方/不销售药品、价格与短缺为参考、建议咨询医生并核实药房 |
| **FAQ** | “Not medical advice—we point you to the right info.” |
| **Quiz** | “We don't prescribe or sell—we point you to the right content and tools.” |
| **Comparison** | “This page is for information only; discuss with your prescriber.” |
| **Footer** | “© … US audience. Not medical advice.” |

**结论**：全站多处、多形式强调“信息用途、非医疗建议、不卖药”，有利于降低“被误解为医疗建议/处方”的风险。

---

### 2. 商业披露（联盟/赞助）

| 位置 | 内容 |
|------|------|
| **Footer “Disclaimer”** | “Informational only. We do not prescribe or sell medications. **Some links may be affiliate or sponsored.** Consult your doctor; verify pharmacy legitimacy.” 并链至 About。 |
| **About** | 免责与用途说明与 Footer 一致。 |

**结论**：已做“部分链接为联盟/赞助”的概括披露，符合 FTC 要求“清晰、醒目”披露的大方向；见下文“可加强点”。

---

### 3. 隐私与条款

| 位置 | 内容 |
|------|------|
| **Footer** | 有 Legal：Disclaimer、Privacy Policy、Terms of Use，均链至 About#disclaimer / #privacy / #terms。 |
| **About #privacy** | 简短说明：不卖个人数据；Newsletter 与网站使用仅用于改进内容与工具；提及“本节的 cookie 与数据实践”。 |
| **About #terms** | 简短说明：网站仅供信息用途、非医疗或法律建议；使用即表示负责任使用并核实药房/项目。 |
| **About 联系与举报** | 提供 FDA MedWatch、FTC 举报链接，并说明不提供医疗/法律建议。 |

**结论**：具备基础的隐私与使用条款说明，并引导用户向官方渠道举报；深度与细节见下文“缺口”。

---

### 4. 药品/监管相关表述

| 内容 | 评估 |
|------|------|
| **复方药** | 明确“非 FDA 批准、在短缺指引下合法”，与 FDA 立场一致。 |
| **Legitimacy 红 flag** | 含“无需处方/无真实处方医生”“保证减肥/无副作用”等警示，有助于用户识别骗局。 |
| **FDA Shortage** | 标明来源为 FDA 官方，并说明“本页不替代 FDA 官方列表”。 |
| **Comparison “expected weight loss”** | 以典型/研究数据形式呈现，未承诺个人效果；页面有“信息仅供参考、与处方医生讨论”的表述。 |

**结论**：未发现明显“无依据疗效承诺”或“替代 FDA/官方信息”的表述，风险相对可控。

---

### 5. 数据与 HIPAA

- 当前**不收集健康数据**（无病史、诊断、用药记录等）。
- Newsletter 仅收集邮箱，且当前为“即将推出”状态，无后端存储。
- **结论**：在未收集 PHI 的前提下，HIPAA 直接适用风险低；若未来增加健康问卷或预筛，需重新评估并可能需合规与披露。

---

## 二、缺口与风险点

### 1. 隐私政策深度不足

- **现状**：About#privacy 仅一段话，未单独成页。
- **风险**：若使用 Analytics、广告或第三方服务（如 Vercel Analytics、Google Analytics、广告 SDK），多数法域要求披露：收集哪些数据、用途、保留期、是否共享/出售、用户权利（访问、删除、反对等）。
- **建议**：  
  - 若已使用或计划使用分析/广告/再营销：在 About#privacy 或独立 `/privacy` 中补充：数据种类、目的、保留期、第三方名单及用途、Cookie 列表、用户权利及行使方式。  
  - 若有加州/欧盟用户：考虑 CCPA/CPRA 与 GDPR 的披露与权利（如 Do Not Sell、同意/撤回、数据可携带等），必要时增加同意/偏好机制。

---

### 2. Cookie / 追踪披露与同意

- **现状**：About 提到“cookie and data practices”但未列出具体 Cookie 或追踪技术，且无同意/拒绝机制。
- **风险**：欧盟 ePrivacy/GDPR 及加州等法域对非必要 Cookie/追踪有同意或至少明确披露的要求；未披露或未取得同意可能带来监管与投诉风险。
- **建议**：  
  - 列出实际使用的 Cookie/本地存储（如 Analytics、会话 ID）。  
  - 若面向欧盟/加州用户：考虑在首次访问时提供 Cookie 横幅或设置页（同意/拒绝非必要 Cookie），并在 Privacy 中说明。

---

### 3. 联盟链接披露位置

- **现状**：联盟/赞助披露仅在 Footer 和 About；实际带 `ref=`/联盟参数的链接出现在：Alternatives（TelehealthPriceGrid、PharmacyLegitimacyRadar）、Legitimacy（VerifiedPharmaciesSection）、Calculator 结果 CTA（ctaLink）等。
- **风险**：FTC 要求披露“清晰且醒目”，且最好在用户可能产生商业行为的上下文中（如点击前或附近）出现，仅页脚可能被认为不够醒目。
- **建议**：  
  - 在含大量联盟链接的页面（如 Alternatives、Calculator 结果、Legitimacy 药房列表）顶部或区块上方增加一句短披露，例如：“We may earn a commission if you use certain links below. This does not change our editorial content.” 并保留 Footer 概括披露。  
  - 确保披露在移动端同样可见（不被折叠或忽略）。

---

### 4. 条款深度（责任限制、管辖法律）

- **现状**：About#terms 仅一段，无责任限制、无赔偿、无管辖法律与争议解决。
- **风险**：若用户因依赖网站信息产生争议（如价格、药房选择、保险建议），缺少“责任上限”“按现状提供”“不保证准确性”等条款可能增加被诉或责任扩大的风险。
- **建议**：在律师指导下补充：  
  - 责任限制与排除（在法律允许范围内）；  
  - “按现状/可用性”提供、不保证完整性/准确性；  
  - 管辖法律与争议解决（如仲裁、管辖法院）；  
  - 可接受使用与禁止行为。  
  可保留在 About#terms 或拆成独立 `/terms` 页面。

---

### 5. Newsletter 与表单

- **现状**：Newsletter 表单收集邮箱，提交后仅显示“我们将很快推出”；当前无后端存储。
- **风险**：一旦真正开始收集并存储邮箱（或其它个人信息），需在提交前或旁边明确：收集目的、使用方式、与 Privacy 的关联，以及在适用法下取得同意（如 GDPR 的 consent）。
- **建议**：  
  - 在表单旁增加“By submitting you agree to our [Privacy Policy]”或类似表述，并确保 Privacy 中已说明 Newsletter 用途与保留期。  
  - 若面向欧盟：考虑勾选式同意（opt-in）并记录同意时间。

---

### 6. 无障碍（Accessibility）

- **现状**：代码中有 SkipLinks、焦点环（focus-visible）、部分 aria 属性；未做全站 WCAG 审计。
- **风险**：美国 ADA 及州法、部分国家法律要求公共服务/商业网站具备合理可访问性；若未达 WCAG 2.x 相应级别，可能面临投诉或诉讼。
- **建议**：进行 WCAG 2.1 AA 抽样或全站审计，修复键盘导航、对比度、标签与语义等问题，并保留简单可访问性声明（可放在 About 或 Footer）。

---

## 三、风险等级小结（主观、非法律意见）

| 领域 | 当前状态 | 风险等级 | 说明 |
|------|----------|----------|------|
| 医疗/健康免责 | 较充分 | 低 | 多处、一致强调信息用途与非医疗建议。 |
| 联盟/赞助披露 | 有，但可加强 | 中 | 建议在含联盟链接的页面增加近链披露。 |
| 隐私政策 | 基础有，细节少 | 中 | 若使用追踪/第三方，需补充披露与权利。 |
| Cookie/同意 | 未系统披露 | 中 | 欧盟/加州用户时建议披露+同意机制。 |
| 条款（责任等） | 过简 | 中 | 建议律师起草责任限制与管辖等条款。 |
| 药品/疗效表述 | 谨慎 | 低 | 未发现无依据承诺；复方/FDA 表述得当。 |
| 数据/HIPAA | 未收集 PHI | 低 | 保持现状则 HIPAA 风险低。 |
| 无障碍 | 部分具备 | 中 | 建议 WCAG 审计与可访问性声明。 |

---

## 四、建议优先动作（非穷尽）

1. **联盟披露**：在 Alternatives、Calculator 结果、Legitimacy 药房列表等含联盟链接的页面，在首屏或该区块上方增加一句短披露，并保留 Footer 现有披露。  
2. **隐私与 Cookie**：若使用任何 Analytics/广告/第三方脚本，在 About#privacy 或独立 Privacy 页中列出：收集项、目的、保留期、第三方、Cookie、用户权利；若面向欧盟/加州，考虑 Cookie 同意/偏好。  
3. **条款**：委托律师起草或审阅 Terms，加入责任限制、按现状提供、管辖法律与争议解决等。  
4. **Newsletter**：在真正存储邮箱前，在表单旁增加与 Privacy 的链接及同意表述，并在 Privacy 中写明 Newsletter 用途与保留期。  
5. **可访问性**：做一次 WCAG 2.1 AA 抽样或全站审计，修复高影响问题，并发布简短可访问性声明。

---

## 五、相关文件

| 文件 | 说明 |
|------|------|
| `components/DisclaimerBanner.tsx` | 通用健康免责文案。 |
| `components/Footer.tsx` | Footer 免责与“部分链接联盟/赞助”披露。 |
| `app/about/AboutClient.tsx` | About 页 Disclaimer、Privacy、Terms、Contact 与举报链接。 |
| `app/alternatives/alternatives-data.ts` | AFFILIATE_REF、AFFILIATE_SOURCE 等联盟参数。 |
| `app/legitimacy/page.tsx` | 药房/骗局警示与 FDA/FTC 链接。 |

---

**声明**：本评估为技术与产品层面的梳理，不构成法律意见。具体合规与风险结论须由在适用司法管辖地执业的律师根据实际业务、用户地域与数据流出具。

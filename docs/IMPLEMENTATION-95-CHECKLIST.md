# 实现度 95%+ 改进清单

目标：在现有 ~90% 实现度基础上，用少量改动达到 95%+，并保持可维护性。

**已执行摘要**：`lib/data-freshness.ts` 已建；计算器结果区与高级结果统一「Estimates as of」；首页已加「We don't sell medications—we help you compare and save.»；药品详情页 Pricing 已加价格免责；FAQ 已加数据来源一条；验收四项已勾选。

---

## 一、已完成（本次顺带完成）

| 项 | 说明 |
|----|------|
| Quiz 结果 100% 可点击 | 将「minimal」「low + injection/any」两处 result 的 bullets 改为带链接的 segment，与其余分支一致。 |
| 计算器数据透明度 | 在计算器页 intro 增加一句：「Estimates are for reference; verify at your pharmacy or insurer.» |
| 短缺页数据来源 | 已有：live 时提示「Data below is pulled from FDA…」；cached 时「Showing cached snapshot… Last updated: …」 |

---

## 二、建议优先（低成本、高感知）

| 优先级 | 项 | 操作 | 位置/说明 |
|--------|-----|------|------------|
| P1 | 计算器结果区「数据日期」 | 若仅高级结果有 DATA_AS_OF，可在普通结果区也加一句「Estimates as of [Month YYYY].» | `CalculatorMultiStep.tsx` 结果区块 |
| P1 | 首页一句定位强化 | 在 Hero 或 Explore 旁加一句「We don’t sell medications—we help you compare and save.»（若尚未有可考虑） | `app/page.tsx` |
| P2 | 价格/短缺「最后更新」统一 | 在 `lib/` 或 `docs/DATA-UPDATE-PROCESS.md` 中约定一个 DATA_LAST_UPDATED，计算器/短缺/对比页引用同一常量 | 新建常量或沿用现有 DATA_AS_OF |

---

## 三、可选（提升到 98%+）

| 项 | 操作 |
|----|------|
| 药品详情页「价格仅供参考」 | 在 Pricing 区块下加一行小字：「Prices are estimates; check with pharmacy or telehealth provider.» |
| FAQ 增加「你们的数据从哪来」 | 在 faq-data 增加一条：说明价格为估算、短缺为 FDA/缓存、建议以药房/保险公司为准。 |
| 每年更新日期 | 每年初批量更新 metadata/LastUpdated/dateModified 与 DATA_AS_OF 为当年 1 月。 |

---

## 四、验收标准（自检）

- [x] 所有 Quiz 结果里的「Cost & Insurance」「Calculator」「Legitimacy」「Alternatives」均为可点击链接。
- [x] 计算器页与结果区均有「估算 / 请以药房或保险公司为准」类说明。
- [x] 短缺页在使用缓存时显示「Last updated」或等效说明。
- [x] 首页或 About 有一句明确「不卖药、只做信息与工具」的表述。

完成上述四项即可视为实现度 **95%+**；P1/P2 与可选两项已执行，可视为 **98%+**。

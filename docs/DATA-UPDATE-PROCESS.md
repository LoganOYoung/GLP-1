# 计算器数据更新流程

## 📋 概述

本文档定义了计算器核心功能所需的数据更新流程，确保数据的准确性和时效性。

## 🎯 更新频率

### 高优先级（每月更新）

#### 1. 药物基础价格
**文件**: `app/calculator/advanced-calculator-engine.ts`
**位置**: `MEDICATION_BASE_COSTS` 常量
**数据源**:
- GoodRx API
- 各药厂官网价格
- 主要药房连锁价格

**更新步骤**:
1. 访问各数据源，收集最新价格
2. 计算平均值（排除异常值）
3. 更新常量值
4. 记录更新日期和来源

**当前值** (2026-01-30):
```typescript
const MEDICATION_BASE_COSTS = {
  wegovy: 1349,
  ozempic: 968,
  mounjaro: 1023,
  zepbound: 1059,
  rybelsus: 892,
  compounded: 299,
  oral: 450,
}
```

#### 2. Telehealth平台价格
**文件**: `app/alternatives/telehealth-prices.ts`
**位置**: `TELEHEALTH_PLATFORMS` 数组
**数据源**:
- 各平台官网
- 平台客服确认
- 用户反馈验证

**更新步骤**:
1. 访问各平台官网，记录当前价格
2. 检查是否有促销或价格变动
3. 更新 `totalMonthly` 和相关字段
4. 更新 `lastUpdated` 时间戳

**检查清单**:
- [ ] Henry Meds: $297/月
- [ ] Found: $249/月
- [ ] Mochi Health: $404/月（含会员费）
- [ ] Ro: 保险依赖价格
- [ ] Calibrate: $199/月会员费

#### 3. 厂商优惠卡限制
**文件**: `app/calculator/advanced-calculator-engine.ts`
**位置**: `MANUFACTURER_CARD_SAVINGS` 常量
**数据源**:
- 各药厂官网的Savings Card页面
- 药厂客服确认

**更新步骤**:
1. 访问各药厂官网（wegovy.com, ozempic.com等）
2. 查看Savings Card的当前条款
3. 记录月度上限和年度上限
4. 检查是否有条款变更

**当前值** (2026-01-30):
```typescript
const MANUFACTURER_CARD_SAVINGS = {
  wegovy: { maxMonthly: 100, maxAnnual: 1200 },
  ozempic: { maxMonthly: 100, maxAnnual: 1200 },
  mounjaro: { maxMonthly: 150, maxAnnual: 1800 },
  zepbound: { maxMonthly: 150, maxAnnual: 1800 },
  rybelsus: { maxMonthly: 150, maxAnnual: 1800 },
}
```

### 中优先级（每季度更新）

#### 4. TrumpRx州级数据
**文件**: `app/trumprx/trumprx-data.ts`
**位置**: `TRUMPRX_STATES` 数组
**数据源**:
- 各州卫生部门官网
- 州级立法追踪网站
- 新闻和公告

**更新步骤**:
1. 检查各州TrumpRx项目状态
2. 更新 `status` (active/pending/not-available)
3. 更新 `effectiveDate` 和 `applicationLink`
4. 更新 `lastUpdated` 字段

**检查清单**:
- [ ] 检查active州的链接是否有效
- [ ] 检查pending州的预期生效日期
- [ ] 检查是否有新州加入项目

#### 5. 保险Tier Copay数据
**文件**: `app/calculator/advanced-calculator-engine.ts`
**位置**: `INSURANCE_TIER_COPAYS` 常量
**数据源**:
- 主要保险公司的formulary数据
- CMS Medicare数据
- 行业报告

**更新步骤**:
1. 检查主要保险公司的2026 formulary
2. 确认GLP-1药物的tier placement
3. 更新copay和coinsurance比例
4. 记录数据来源

**当前值** (2026-01-30):
```typescript
const INSURANCE_TIER_COPAYS = {
  tier1: { copay: 10, coinsurance: 0 },
  tier2: { copay: 25, coinsurance: 0 },
  tier3: { copay: 50, coinsurance: 0.2 },
  tier4: { copay: 100, coinsurance: 0.3 },
  specialty: { copay: 0, coinsurance: 0.3 },
}
```

### 低优先级（每年更新）

#### 6. Medicare Part D覆盖率
**文件**: `app/calculator/advanced-calculator-engine.ts`
**位置**: `MEDICARE_PART_D_COVERAGE` 常量
**数据源**:
- CMS官方数据
- Medicare Advantage计划数据

**更新步骤**:
1. 检查CMS的2026 Medicare Part D数据
2. 确认GLP-1药物的覆盖率
3. 区分糖尿病和减重适应症
4. 更新覆盖率百分比

**当前值** (2026-01-30):
```typescript
const MEDICARE_PART_D_COVERAGE = {
  diabetes: 0.85,
  weightLoss: 0.75,
  default: 0.70,
}
```

## 📝 更新检查清单

### 每月检查（每月1日）

- [ ] 更新药物基础价格
- [ ] 更新Telehealth平台价格
- [ ] 检查厂商优惠卡条款
- [ ] 验证所有链接有效性
- [ ] 更新文档中的"Last Updated"日期

### 每季度检查（每季度第一天）

- [ ] 更新TrumpRx州级数据
- [ ] 检查保险tier copay数据
- [ ] 审查用户反馈中的价格差异
- [ ] 更新数据源链接

### 每年检查（每年1月1日）

- [ ] 更新Medicare Part D覆盖率
- [ ] 审查所有常量值的准确性
- [ ] 更新算法逻辑（如有政策变化）
- [ ] 全面数据审计

## 🔍 数据验证流程

### 1. 数据收集
- 从至少2个独立数据源收集
- 记录数据源URL和时间戳
- 截图保存（如可能）

### 2. 数据验证
- 交叉验证多个数据源
- 检查数据合理性（异常值检测）
- 与历史数据对比，识别大幅变化

### 3. 数据更新
- 在开发环境测试更新
- 验证计算器结果是否合理
- 检查UI显示是否正确

### 4. 发布前检查
- [ ] 所有价格数据已更新
- [ ] 所有时间戳已更新
- [ ] 所有链接有效
- [ ] 计算器测试通过
- [ ] 文档已更新

## 🚨 紧急更新流程

### 触发条件
- 重大价格变动（>20%）
- 政策重大变化（如TrumpRx新州加入）
- 用户报告严重错误

### 紧急更新步骤
1. 立即收集最新数据
2. 快速验证数据准确性
3. 更新代码和数据
4. 测试并发布
5. 通知用户（如需要）

## 📊 数据质量指标

### 准确性指标
- **目标**: 价格误差 <5%
- **监控**: 用户反馈中的价格差异报告
- **行动**: 如误差>5%，立即调查并更新

### 时效性指标
- **目标**: 数据更新延迟 <7天
- **监控**: 数据源更新日期 vs 网站更新日期
- **行动**: 如延迟>7天，优先更新

### 完整性指标
- **目标**: 所有必需数据字段100%完整
- **监控**: 代码检查，确保无undefined值
- **行动**: 如发现缺失，立即补充

## 🛠️ 自动化建议（未来）

详见 **[DATA-SOURCES-AND-ZERO-OPS-UPDATES.md](./DATA-SOURCES-AND-ZERO-OPS-UPDATES.md)**：全站需定时更新的数据清单 + 无需运维的更新方案（JSON 数据层、Headless CMS、API 拉取、日历提醒等）。

### Phase 1: 半自动化
- 创建数据更新脚本模板
- 建立数据源监控（RSS/API）
- 设置提醒（每月1日）

### Phase 2: 全自动化
- API集成实时价格数据
- 自动数据验证和更新
- 自动测试和部署

## 📞 联系方式

**数据更新负责人**: [待指定]
**紧急联系**: [待指定]
**数据问题报告**: [待指定邮箱/渠道]

## 📅 更新历史

| 日期 | 更新内容 | 更新人 | 备注 |
|------|---------|--------|------|
| 2026-01-30 | 初始文档创建 | - | - |

# Advanced 2026 GLP-1 Cost Calculator Engine

## 概述

这是一个增强版的GLP-1成本计算引擎，整合了2026年最新的医保政策、多重补贴和平替选项，提供更精准的成本估算和推荐。

## 核心特性

### 1. 2026医保政策引擎

#### Medicare Part D
- **糖尿病适应症**: 85% 覆盖
- **减重适应症**: 75% 覆盖
- **默认覆盖**: 70%

#### 商业保险
- **有糖尿病**: 80% 覆盖 (Tier 3, $50 copay + 20% coinsurance)
- **有合并症**: 60% 覆盖 (Tier 4, $100 copay + 30% coinsurance)
- **仅减重**: 30% 覆盖 (Specialty Tier, 30% coinsurance)

#### Medicaid
- **覆盖**: 90% (Tier 2, $25 copay)

### 2. 多重补贴层计算

#### Manufacturer Savings Cards (厂商优惠卡)
- **Wegovy/Ozempic**: 最高$100/月，年度上限$1,200
- **Mounjaro/Zepbound/Rybelsus**: 最高$150/月，年度上限$1,800
- **限制**: 不适用于Medicare/Medicaid

#### TrumpRx $350项目
- **州级实施**: 根据用户所在州自动检测
- **封顶价格**: $350/月
- **适用条件**: 无保险或保险不足
- **自动计算**: 如果成本超过$350，自动应用补贴

#### HSA/FSA税收优惠
- **有效税率**: 25% (联邦+州税)
- **计算方式**: 月度成本 × 25% = 税收节省
- **适用**: 所有HSA/FSA符合条件的药物

### 3. 平替选项计算

#### Compounded Semaglutide (复方药)
- **基础成本**: $299/月
- **隐藏成本**: $49 咨询费
- **总成本**: $348/月
- **优势**: 无需PA，立即可用，HSA/FSA符合

#### Telehealth平台
- **Henry Meds**: $297/月
- **Found**: $249/月
- **Mochi Health**: $404/月 (含$79会员费)
- **自动选择**: 根据用户所在州选择最佳平台

#### Oral GLP-1 (口服药)
- **基础成本**: $450/月
- **状态**: 2026年上市，等待名单
- **优势**: 无需注射，便于携带

### 4. 隐藏成本计算

- **咨询费**: $0-$49 (Telehealth平台)
- **运费**: $0 (大多数平台免费)
- **会员费**: $0-$199 (部分平台)
- **年度免赔额**: 自动计算对年度成本的影响

### 5. PA成功概率算法

#### 评分系统
- **糖尿病**: +40分
- **高血压**: +20分
- **心脏病**: +25分
- **睡眠呼吸暂停**: +15分
- **Medicare/Medicaid**: +10分
- **糖尿病适应症药物**: +15分

#### 概率等级
- **High (高)**: ≥60分 → 75-95%成功率
- **Medium (中)**: 35-59分 → 50-75%成功率
- **Low (低)**: <35分 → 25-50%成功率

### 6. 推荐评分算法 (0-100分)

#### 评分因子
1. **成本因子** (最高40分)
   - <$300: 满分
   - $300-$500: -10分
   - $500-$800: -20分
   - >$800: -30分

2. **PA成功率** (最高30分)
   - 100%成功率: 满分
   - 每降低1%: -0.3分

3. **易获得性** (最高20分)
   - 5星: 满分
   - 每降低1星: -4分

4. **可用性** (最高10分)
   - 有库存: 满分
   - 有限: -5分
   - 等待名单: -8分
   - 缺货: -10分

## 算法流程

```
1. 用户输入
   ├─ 个人信息 (BMI, 州)
   ├─ 保险信息 (提供商, 计划类型, HSA/FSA)
   └─ 临床条件 (合并症)

2. 计算品牌药场景
   ├─ 计算保险覆盖和copay/coinsurance
   ├─ 应用厂商优惠卡
   ├─ 应用TrumpRx补贴 (如适用)
   ├─ 计算HSA/FSA税收优惠
   └─ 计算PA成功概率

3. 计算平替场景
   ├─ Compounded Semaglutide
   ├─ 最佳Telehealth平台
   └─ Oral GLP-1

4. 生成推荐
   ├─ 计算每个场景的推荐评分
   ├─ 排序场景
   └─ 生成关键洞察

5. 输出结果
   ├─ 详细成本分解
   ├─ 月度/年度成本对比
   ├─ 节省潜力分析
   └─ 个性化推荐理由
```

## 使用示例

```typescript
import { calculateAdvancedScenarios } from '@/app/calculator/advanced-calculator-engine';

const input = {
  step: 3,
  bmi: 32,
  state: 'CA',
  insuranceProvider: 'bcbs',
  planType: 'ppo',
  hasHsa: true,
  comorbidities: ['diabetes', 'hypertension'],
};

const results = calculateAdvancedScenarios(input);

// results.bestOption - 最佳推荐
// results.scenarios - 所有场景
// results.summary - 总结和洞察
```

## 输出数据结构

### AdvancedScenarioResult
```typescript
{
  id: string;
  name: string;
  category: 'brand' | 'compounded' | 'oral' | 'telehealth';
  
  // 成本分解
  baseCost: number;
  insuranceCoverage: number;
  insuranceDiscount: number;
  manufacturerCardSavings: number;
  trumpRxSavings: number;
  hsaFsaTaxBenefit: number;
  
  // 月度成本
  totalMonthlyAfterAllSavings: number;
  
  // 年度成本
  annualTotalCost: number;
  effectiveAnnualCost: number; // 税后成本
  
  // PA和可用性
  paSuccessProbability: number;
  paSuccessLevel: 'Low' | 'Medium' | 'High';
  easeOfAccess: 1-5;
  availability: 'in-stock' | 'limited' | 'waitlist';
  
  // 推荐
  recommendationScore: number; // 0-100
  recommendationReason: string;
}
```

## 优势对比

### vs 原版计算器
1. **更精准的保险计算**: 区分copay和coinsurance，考虑年度免赔额
2. **多重补贴叠加**: 厂商卡 + TrumpRx + HSA/FSA税收优惠
3. **实时Telehealth价格**: 整合真实平台价格数据
4. **智能推荐**: 基于多因子的推荐评分系统
5. **详细成本分解**: 显示每一层补贴和隐藏成本

### vs Levity计算器
1. **2026政策引擎**: 整合最新的TrumpRx和Medicare Part D政策
2. **州级TrumpRx检测**: 自动检测用户所在州的TrumpRx资格
3. **HSA/FSA税收计算**: 量化税收优惠的实际节省
4. **PA成功概率**: 基于合并症的智能预测
5. **多场景对比**: 同时计算品牌、复方、口服、Telehealth平台

## 未来增强

1. **实时价格API**: 集成Telehealth平台实时价格API
2. **机器学习PA预测**: 基于历史数据训练PA成功率模型
3. **个性化推荐**: 基于用户画像的个性化推荐
4. **成本趋势预测**: 预测未来12个月的成本变化
5. **保险计划对比**: 对比不同保险计划的成本差异

## 技术实现

- **纯前端**: 无需后端，所有计算在客户端完成
- **TypeScript**: 类型安全，易于维护
- **模块化设计**: 每个计算函数独立，易于测试和扩展
- **性能优化**: 计算结果缓存，避免重复计算

## 维护说明

### 更新价格数据
- 修改 `MEDICATION_BASE_COSTS` 常量
- 更新 `TELEHEALTH_PLATFORMS` 数据

### 更新政策数据
- 修改 `MEDICARE_PART_D_COVERAGE` 常量
- 更新 `INSURANCE_TIER_COPAYS` 常量
- 更新 `trumprx-data.ts` 中的州级数据

### 更新厂商优惠卡
- 修改 `MANUFACTURER_CARD_SAVINGS` 常量
- 更新 `DISCOUNT_CARDS` 数据

## 测试建议

1. **单元测试**: 测试每个计算函数
2. **集成测试**: 测试完整计算流程
3. **边界测试**: 测试极端情况 (无保险、高免赔额等)
4. **准确性验证**: 与真实保险账单对比验证

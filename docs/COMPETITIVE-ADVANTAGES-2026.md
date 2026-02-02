# 2026 年竞争优势功能实施计划

> **目标**：通过三个核心功能实现市场压制，建立不可复制的竞争优势

---

## 一、功能价值分析

### 1. ✅ **TrumpRx 政策深度整合**（时效性优势）

**市场现状：**
- 大多数竞品还在使用 2025 年数据
- 缺乏实时政策更新机制
- 用户无法快速了解所在州的 TrumpRx 落地情况

**我们的优势：**
- ✅ 第一时间反映 TrumpRx 2026 控价协议变动
- ✅ 按州显示 $350 封顶价落地情况
- ✅ 实时更新政策状态（哪些州已落地、哪些州待审批）

**预期效果：**
- **SEO 爆发**：覆盖 "TrumpRx [州名]"、"$350 GLP-1 [州名]" 等长尾关键词
- **用户粘性**：政策变动时用户会第一时间回访
- **媒体关注**：成为行业政策追踪的权威来源

**实施难度：** ⭐⭐⭐（中等）
- 需要定期更新州级政策数据
- 可以纯前端实现（静态数据 + 定期更新）

---

### 2. ✅ **复方药实验室透明度数据库**（信任度优势）

**市场现状：**
- 竞品只说"某平台有复方药"
- 用户无法验证实验室资质
- 缺乏 FDA 检查记录的透明展示

**我们的优势：**
- ✅ 点击平台 → 显示背后 503A/503B 实验室信息
- ✅ 展示 FDA 最近一次检查记录（日期、结果、关键发现）
- ✅ 可视化合规流程对比图（Legitimacy 页面）

**预期效果：**
- **信任建立**：成为唯一提供实验室透明度的平台
- **用户决策**：帮助用户选择合规的复方药来源
- **媒体引用**：成为"复方药透明度"的行业标准

**实施难度：** ⭐⭐⭐⭐（较高）
- 需要整合 FDA 公开数据（503A/503B 注册信息）
- 需要建立平台 → 实验室的映射关系
- 可以纯前端实现（静态数据 + 定期更新）

---

### 3. ✅ **剂量转换工具增强版**（交互性优势）

**市场现状：**
- 市场上极度稀缺此功能
- 用户从原研药（Wegovy 2.4mg 笔）转到复方药（瓶装药水 + 针筒）时完全不知道抽多少刻度

**我们的优势：**
- ✅ 已有基础：`SwitchingGuideCalculator.tsx`（品牌剂量 → 复方 units）
- ✅ 需要增强：支持更多转换场景（原研 ↔ 复方 ↔ 口服）
- ✅ 可视化：显示针筒刻度示意图

**预期效果：**
- **用户痛点解决**：直接解决用户最困惑的问题
- **SEO 优势**："Wegovy to compounded conversion"、"how many units semaglutide" 等关键词
- **用户留存**：用户会收藏并反复使用

**实施难度：** ⭐⭐（较低）
- 已有基础代码
- 纯前端实现
- 需要扩展转换规则和可视化

---

## 二、实施优先级

### 🔥 Phase 1：立即实施（1-2 周）

#### 1.1 剂量转换工具增强版
**原因：** 已有基础，实施难度低，用户痛点明确

**功能增强：**
- [ ] 支持双向转换（品牌 → 复方，复方 → 品牌）
- [ ] 支持口服药转换（Rybelsus mg → 注射 units）
- [ ] 添加针筒刻度可视化（SVG 示意图）
- [ ] 添加常见剂量快速选择按钮
- [ ] 添加"保存转换结果"功能（localStorage）

**文件：**
- `app/alternatives/SwitchingGuideCalculator.tsx`（增强）
- `app/alternatives/alternatives-data.ts`（扩展转换规则）

---

### ⚡ Phase 2：高优先级（2-4 周）

#### 2.1 TrumpRx 政策深度整合
**原因：** 时效性强，SEO 价值高

**功能实现：**
- [ ] 创建 `app/trumprx/page.tsx`（独立 TrumpRx 页面）
- [ ] 创建 `app/trumprx/trumprx-data.ts`（州级政策数据）
- [ ] 创建 `components/TrumpRxStateMap.tsx`（州级地图可视化）
- [ ] 集成到 Calculator（显示 TrumpRx 适用性）
- [ ] 集成到 Cost & Insurance 页面（已有基础）

**数据结构：**
```typescript
interface TrumpRxState {
  stateCode: string;
  stateName: string;
  status: 'active' | 'pending' | 'not-available';
  effectiveDate?: string;
  monthlyCap: number; // 350
  eligibilityCriteria: string[];
  applicationLink?: string;
  lastUpdated: string;
}
```

**SEO 策略：**
- 每个州一个独立页面：`/trumprx/[state]`
- FAQ Schema：覆盖州级常见问题
- 实时更新提示："Last updated: [date]"

---

### 📊 Phase 3：中优先级（1-2 个月）

#### 3.1 复方药实验室透明度数据库
**原因：** 实施难度较高，但信任度价值巨大

**功能实现：**
- [ ] 创建 `app/labs/page.tsx`（实验室数据库页面）
- [ ] 创建 `lib/lab-data.ts`（503A/503B 实验室数据）
- [ ] 创建 `components/LabInspectionRecord.tsx`（FDA 检查记录组件）
- [ ] 在 Alternatives 页面集成（点击平台 → 显示实验室信息）
- [ ] 在 Legitimacy 页面添加合规流程对比图

**数据结构：**
```typescript
interface CompoundingLab {
  id: string;
  name: string;
  type: '503A' | '503B';
  state: string;
  licenseNumber: string;
  fdaRegistrationNumber?: string;
  lastInspection?: {
    date: string;
    result: 'satisfactory' | 'voluntary-action-indicated' | 'official-action-indicated';
    findings?: string[];
  };
  platforms: string[]; // 使用此实验室的 Telehealth 平台
}
```

**数据来源：**
- FDA 503B 注册数据库（公开）
- 各州药房委员会（503A）
- FDA 检查记录（公开，但需要定期更新）

**可视化：**
- 合规流程对比图（Legitimacy 页面）
- 实验室资质徽章（Alternatives 页面）

---

## 三、技术实施细节

### 3.1 剂量转换工具增强版

**当前状态：**
- ✅ 已有 `SwitchingGuideCalculator.tsx`
- ✅ 已有 `DOSE_TO_UNITS_MAP` 数据

**增强计划：**
1. **双向转换**
   ```typescript
   // 品牌 → 复方（已有）
   Wegovy 2.4mg → 60 units
   
   // 复方 → 品牌（新增）
   60 units → Wegovy 2.4mg
   
   // 口服 → 注射（新增）
   Rybelsus 14mg → 2.4mg injection → 60 units
   ```

2. **针筒刻度可视化**
   - SVG 针筒示意图
   - 动态显示刻度位置
   - 支持不同规格针筒（0.3ml, 0.5ml, 1ml）

3. **快速选择**
   - 常见剂量按钮（0.25mg, 0.5mg, 1mg, 1.7mg, 2.4mg）
   - 药物选择器（Wegovy, Ozempic, Mounjaro, Zepbound）

---

### 3.2 TrumpRx 政策整合

**数据更新策略：**
- **静态数据**：初始数据存储在 `trumprx-data.ts`
- **更新机制**：定期手动更新（每月一次）
- **未来扩展**：可以接入 API（如果有官方 API）

**页面结构：**
```
/trumprx
  ├── page.tsx（主页面：州级地图 + 列表）
  ├── [state]/page.tsx（州级详情页）
  └── trumprx-data.ts（数据文件）
```

**Calculator 集成：**
- 在 Calculator 结果中显示："You may be eligible for TrumpRx $350 program in [State]"
- 链接到 TrumpRx 页面

---

### 3.3 实验室透明度数据库

**数据收集策略：**
- **初始数据**：手动收集主要 Telehealth 平台的实验室信息
- **更新机制**：定期检查 FDA 数据库更新
- **数据验证**：交叉验证州药房委员会数据

**平台 → 实验室映射：**
```typescript
const PLATFORM_LAB_MAP: Record<string, string[]> = {
  'henry-meds': ['lab-1', 'lab-2'],
  'ro': ['lab-3'],
  'mochi': ['lab-4'],
  // ...
};
```

**显示位置：**
1. Alternatives 页面：点击平台卡片 → 弹出实验室信息
2. Labs 页面：完整实验室数据库
3. Legitimacy 页面：合规流程对比图

---

## 四、预期效果

### SEO 提升
- **TrumpRx 相关**：覆盖 50+ 州级关键词
- **剂量转换**：覆盖 "Wegovy to compounded conversion" 等长尾词
- **实验室透明度**：覆盖 "503A semaglutide lab" 等专业词

### 用户价值
- **决策支持**：用户可以根据实验室资质选择平台
- **信任建立**：透明度提升用户信任度
- **工具价值**：剂量转换工具解决实际痛点

### 竞争优势
- **时效性**：第一时间反映政策变动
- **透明度**：唯一提供实验室数据的平台
- **专业性**：深度工具解决用户实际问题

---

## 五、实施检查清单

### Phase 1：剂量转换工具增强版
- [ ] 扩展 `DOSE_TO_UNITS_MAP` 数据
- [ ] 实现双向转换逻辑
- [ ] 添加针筒刻度可视化组件
- [ ] 添加快速选择按钮
- [ ] 添加药物选择器
- [ ] 测试所有转换场景

### Phase 2：TrumpRx 政策整合
- [ ] 创建 `trumprx-data.ts` 数据文件
- [ ] 创建 TrumpRx 主页面
- [ ] 创建州级详情页面（动态路由）
- [ ] 创建州级地图可视化组件
- [ ] 集成到 Calculator
- [ ] 集成到 Cost & Insurance 页面
- [ ] 添加 SEO Schema

### Phase 3：实验室透明度数据库
- [ ] 收集主要实验室数据
- [ ] 创建 `lab-data.ts` 数据文件
- [ ] 创建 Labs 数据库页面
- [ ] 创建实验室信息组件
- [ ] 创建合规流程对比图
- [ ] 集成到 Alternatives 页面
- [ ] 集成到 Legitimacy 页面

---

**文档版本**：v1.0  
**创建日期**：2026-01-30  
**优先级**：Phase 1 立即实施，Phase 2-3 按计划推进

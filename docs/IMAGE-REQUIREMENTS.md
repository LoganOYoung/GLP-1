# 全站图片需求清单

## 一、首页 (app/page.tsx)

### 1. Hero 区域
- ✅ **Hero Banner 图片** (已添加占位符，需要替换为真实图片)
  - 位置：Hero 区域右侧
  - 尺寸：1200x800px (桌面端)
  - 内容：医疗健康主题，展示 GLP-1 药物相关视觉元素
  - 优先级：**高**

### 2. "We help with" 区域
- ❌ **每个卡片图标背景图**
  - Real cost 卡片：成本计算相关插图
  - Insurance & savings 卡片：保险/折扣卡相关插图
  - Shortage status 卡片：库存状态图表/示意图
  - Legitimacy & scams 卡片：安全/信任相关插图
  - 优先级：**中**

### 3. Tools 区域
- ❌ **工具卡片背景图或插图**
  - Calculator 卡片：计算器/图表相关插图
  - Find Your Option 卡片：搜索/选择流程插图
  - 优先级：**中**

### 4. 内容中心区域
- ❌ **对比图表/信息图表**
  - 价格对比可视化图表
  - 节省金额示意图
  - 优先级：**高**

---

## 二、Alternatives 页面 (app/alternatives/page.tsx)

### 1. Hero Banner
- ❌ **Hero Banner 图片**
  - 位置：页面顶部
  - 内容：GLP-1 药物对比示意图（Brand vs Compounded vs Oral）
  - 尺寸：1200x600px
  - 优先级：**高**

### 2. Path Comparison Table
- ❌ **对比表格视觉增强**
  - 表格头部图标/徽章
  - "Best Value" 标签背景图
  - 优先级：**中**

### 3. Price Comparison Chart
- ✅ **价格对比图表** (已使用 Recharts，但可添加背景图)
  - 图表背景或装饰元素
  - 优先级：**低**

### 4. Pharmacy Legitimacy Radar
- ❌ **药房资质认证图标**
  - LegitScript 认证徽章图片
  - FDA 注册标识图片
  - 优先级：**高**

### 5. Side Effect Profiling
- ❌ **副作用对比信息图表**
  - 副作用严重程度可视化图表
  - 不同药物副作用对比图
  - 优先级：**中**

### 6. Stock Tracker Widget
- ❌ **库存状态可视化**
  - 库存状态图标（绿色/橙色/红色）
  - 库存地图可视化
  - 优先级：**中**

### 7. Dose Converter
- ❌ **剂量转换工具插图**
  - 注射器示意图
  - 剂量刻度可视化
  - 优先级：**中**

---

## 三、Calculator 页面 (app/calculator/page.tsx)

### 1. Hero Banner
- ❌ **计算器 Hero Banner**
  - 位置：计算器顶部
  - 内容：计算流程示意图
  - 尺寸：1200x400px
  - 优先级：**高**

### 2. 步骤指示器
- ❌ **进度条背景图或装饰**
  - 步骤图标
  - 进度指示器视觉元素
  - 优先级：**低**

### 3. 结果展示区域
- ✅ **数据可视化图表** (已使用 Recharts)
  - PA 成功率图表背景
  - 节省金额图表装饰
  - 优先级：**低**

### 4. 三条路径对比卡片
- ❌ **对比卡片背景图**
  - Brand Name 卡片：原研药相关图片
  - Compounded 卡片：复方药相关图片
  - Oral 卡片：口服药相关图片
  - 优先级：**高**

---

## 四、Cost & Insurance 页面 (app/cost-insurance/page.tsx)

### 1. Hero Banner
- ❌ **Hero Banner 图片**
  - 位置：Hero 区域
  - 内容：节省金额示意图、保险流程图表
  - 尺寸：1200x600px
  - 优先级：**高**

### 2. Discount Card Grid
- ❌ **折扣卡图片**
  - 每个折扣卡的品牌 Logo
  - 折扣卡外观图片
  - 优先级：**高**

### 3. Insurance Appeal Flowchart
- ✅ **流程图** (已使用 SVG，但可添加装饰图片)
  - 流程图背景或装饰元素
  - 优先级：**低**

### 4. TrumpRx Guide
- ❌ **TrumpRx 相关图片**
  - 政策说明图
  - 州地图可视化
  - 优先级：**中**

### 5. HSA/FSA Guide
- ❌ **HSA/FSA 资格流程图**
  - 资格判断流程图
  - 相关图标
  - 优先级：**中**

---

## 五、Legitimacy 页面 (app/legitimacy/page.tsx)

### 1. Hero Banner
- ❌ **合规性 Hero Banner**
  - 位置：页面顶部
  - 内容：合规流程对比图
  - 优先级：**高**

### 2. Compliance Flow Diagram
- ✅ **合规流程图** (已使用 SVG)
  - 可添加背景装饰
  - 优先级：**低**

### 3. Red Flags / Green Flags
- ❌ **警告标志图标**
  - 红色警告图标
  - 绿色信任图标
  - 优先级：**中**

### 4. FDA Shortage Status
- ❌ **FDA 缺货状态可视化**
  - 缺货状态图表
  - FDA Logo/标识
  - 优先级：**高**

---

## 六、FAQ 页面 (app/faq/page.tsx)

### 1. Hero Banner
- ❌ **FAQ Hero Banner**
  - 位置：页面顶部
  - 内容：常见问题相关插图
  - 优先级：**中**

### 2. 分类图标
- ❌ **FAQ 分类图标**
  - Pricing & TrumpRx 图标
  - Legality & Safety 图标
  - Side Effects 图标
  - New Oral Pills 图标
  - Logistics 图标
  - 优先级：**中**

### 3. 信息图表
- ❌ **FAQ 相关图表**
  - 副作用对比图（Side Effects 部分）
  - 效果对比图（Effectiveness 部分）
  - 优先级：**中**

---

## 七、About 页面 (app/about/page.tsx)

### 1. Hero Banner
- ❌ **About Hero Banner**
  - 位置：页面顶部
  - 内容：团队/使命相关图片
  - 优先级：**高**

### 2. 信任指标
- ❌ **信任徽章图片**
  - LegitScript 认证徽章
  - 其他认证标识
  - 优先级：**高**

### 3. 数据统计可视化
- ❌ **统计数据图表**
  - 用户数量图表
  - 数据更新频率图表
  - 优先级：**中**

### 4. 团队照片（如适用）
- ❌ **团队成员照片**
  - 如果展示团队，需要照片
  - 优先级：**低**

---

## 八、TrumpRx 页面 (app/trumprx/page.tsx)

### 1. Hero Banner
- ❌ **TrumpRx Hero Banner**
  - 位置：页面顶部
  - 内容：$350 项目相关图片
  - 优先级：**高**

### 2. 州地图可视化
- ✅ **州地图** (已使用 Google Maps)
  - 可添加自定义地图标记图标
  - 优先级：**中**

### 3. 政策变化时间线
- ❌ **时间线图表**
  - 政策变化时间线可视化
  - 优先级：**中**

### 4. 状态卡片
- ❌ **状态卡片图标**
  - Active 状态图标
  - Pending 状态图标
  - Not Available 状态图标
  - 优先级：**中**

---

## 九、Drugs 页面 (app/drugs/[slug]/page.tsx)

### 1. 药物 Hero Banner
- ❌ **每个药物的 Hero 图片**
  - Wegovy: 药物包装/注射器图片
  - Ozempic: 药物包装/注射器图片
  - Mounjaro: 药物包装/注射器图片
  - Zepbound: 药物包装/注射器图片
  - 优先级：**高**

### 2. 药物信息图表
- ❌ **药物信息可视化**
  - 剂量图表
  - 副作用严重程度图表
  - 价格趋势图
  - 优先级：**高**

### 3. 缺货状态可视化
- ❌ **缺货状态图表**
  - 缺货状态地图
  - 缺货时间线
  - 优先级：**中**

---

## 十、Labs 页面 (app/labs/page.tsx)

### 1. Hero Banner
- ❌ **实验室透明度 Hero Banner**
  - 位置：页面顶部
  - 内容：实验室/合规相关图片
  - 优先级：**高**

### 2. 实验室 Logo
- ❌ **每个实验室的 Logo**
  - 503A 药房 Logo
  - 503B 设施 Logo
  - 优先级：**高**

### 3. FDA 检查记录可视化
- ❌ **检查记录图表**
  - 检查结果可视化
  - 检查时间线
  - 优先级：**中**

### 4. 合规流程对比图
- ❌ **503A vs 503B 对比图**
  - 流程对比信息图表
  - 优先级：**高**

---

## 十一、Quiz 页面 (app/quiz/page.tsx)

### 1. Hero Banner
- ❌ **Quiz Hero Banner**
  - 位置：页面顶部
  - 内容：个性化推荐流程相关图片
  - 优先级：**中**

### 2. 步骤指示器图标
- ❌ **每个步骤的图标**
  - Budget 步骤图标
  - Preference 步骤图标
  - Goal 步骤图标
  - 优先级：**低**

---

## 十二、全局组件

### 1. Header
- ❌ **Logo 图片**
  - 网站 Logo（如果有）
  - 优先级：**高**

### 2. Footer
- ❌ **Footer 装饰图片**
  - 背景装饰（可选）
  - 优先级：**低**

### 3. TrustSignals
- ❌ **信任信号图标**
  - 认证徽章
  - 统计数据图标
  - 优先级：**中**

---

## 图片优先级总结

### 🔴 高优先级（必须添加）
1. 所有页面的 Hero Banner 图片
2. 药物页面（Drugs）的药物图片
3. 折扣卡品牌 Logo（Cost & Insurance）
4. 实验室 Logo（Labs）
5. 网站 Logo（Header）
6. 信任徽章图片（About, Legitimacy）
7. FDA 缺货状态可视化（Legitimacy, Drugs）

### 🟡 中优先级（建议添加）
1. 卡片背景图/插图（首页、Alternatives、Calculator）
2. 信息图表（副作用、效果对比）
3. 流程图装饰（Insurance Appeal、Compliance）
4. 状态图标（TrumpRx、Stock Tracker）
5. 分类图标（FAQ）

### 🟢 低优先级（可选）
1. 步骤指示器图标
2. Footer 装饰
3. 图表背景装饰

---

## 图片规格建议

### Hero Banner
- 尺寸：1200x600px - 1200x800px
- 格式：WebP（优先）、JPG
- 文件大小：< 200KB

### 图标/Logo
- 尺寸：根据使用场景（通常 64x64px - 256x256px）
- 格式：SVG（优先）、PNG
- 文件大小：< 50KB

### 信息图表
- 尺寸：800x600px - 1200x800px
- 格式：WebP、PNG
- 文件大小：< 300KB

### 卡片背景图
- 尺寸：400x300px - 600x400px
- 格式：WebP、JPG
- 文件大小：< 100KB

---

## 实施建议

1. **使用 Next.js Image 组件**：所有图片使用 `next/image` 进行优化
2. **图片存储位置**：`/public/images/` 目录
3. **子目录结构**：
   - `/public/images/banners/` - Hero Banner 图片
   - `/public/images/logos/` - Logo 和品牌图片
   - `/public/images/icons/` - 图标
   - `/public/images/infographics/` - 信息图表
   - `/public/images/drugs/` - 药物相关图片
   - `/public/images/labs/` - 实验室相关图片

4. **图片优化**：
   - 使用 WebP 格式
   - 添加 `alt` 属性用于 SEO
   - 使用 `loading="lazy"` 进行懒加载

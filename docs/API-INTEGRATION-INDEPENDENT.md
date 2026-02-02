# API 集成说明：两个独立功能

> **重要**：Google Maps API 和 Telehealth Platform APIs 是**两个完全独立的功能**，不是二选一的关系。

---

## 功能对比

| 功能 | Google Maps API | Telehealth Platform APIs |
|------|----------------|-------------------------|
| **用途** | 可视化服务区域地图 | 获取实时价格数据 |
| **影响范围** | 服务区域地图显示方式 | 价格数据的来源 |
| **位置** | `/alternatives` 页面的 "Service Area Visualization" | `/alternatives` 页面的 "Real-Time Telehealth Prices" |
| **依赖** | `@react-google-maps/api` 库 | 各平台的 API 访问权限 |
| **环境变量** | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | `HENRY_MEDS_API_KEY`, `RO_API_KEY` 等 |
| **可选性** | ✅ 完全可选 | ✅ 完全可选 |

---

## 四种组合方式

### 1. ✅ 都启用（推荐）

**效果**：
- ✅ 交互式 Google Maps 地图（可缩放、拖拽）
- ✅ 实时价格数据（从 API 获取）

**配置**：
```bash
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
HENRY_MEDS_API_KEY=your_henry_meds_key
RO_API_KEY=your_ro_key
# ... 其他平台
```

**安装**：
```bash
npm install @react-google-maps/api
```

---

### 2. ✅ 只启用 Google Maps

**效果**：
- ✅ 交互式 Google Maps 地图
- ⚠️ 价格数据使用静态数据（模拟数据）

**配置**：
```bash
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
# 不配置 Telehealth API keys
```

**安装**：
```bash
npm install @react-google-maps/api
```

**说明**：
- 地图会显示交互式 Google Maps
- 价格仍然显示，但来自静态数据（`telehealth-prices.ts`）
- 价格时间戳会更新，但数据是模拟的

---

### 3. ✅ 只启用 Telehealth API

**效果**：
- ⚠️ 服务区域地图使用静态州网格（非交互式）
- ✅ 实时价格数据（从 API 获取）

**配置**：
```bash
# .env.local
# 不配置 Google Maps API key
HENRY_MEDS_API_KEY=your_henry_meds_key
RO_API_KEY=your_ro_key
# ... 其他平台
```

**安装**：
```bash
# 不需要安装 @react-google-maps/api
```

**说明**：
- 地图显示静态州网格（50 个州的网格布局）
- 价格从真实 API 获取，实时更新
- 功能完全可用，只是地图不是交互式的

---

### 4. ✅ 都不启用（默认状态）

**效果**：
- ⚠️ 服务区域地图使用静态州网格
- ⚠️ 价格数据使用静态数据（模拟数据）

**配置**：
```bash
# .env.local
# 不配置任何 API keys
```

**安装**：
```bash
# 不需要安装任何额外依赖
```

**说明**：
- 所有功能仍然可用
- 地图显示静态州网格
- 价格显示模拟数据（带时间戳，但数据是静态的）
- **这是当前的默认状态**，网站完全可用

---

## 功能位置

### Google Maps API 影响的功能

**位置**：`/alternatives` 页面 → "Service Area Visualization" 部分

**显示内容**：
- 如果启用：交互式 Google Maps（可缩放、拖拽、标记点）
- 如果未启用：静态州网格（50 个州的网格布局）

**代码位置**：
- `components/GoogleMapsServiceArea.tsx` - Google Maps 组件
- `components/TelehealthServiceAreaMap.tsx` - 服务区域地图组件（包含 Google Maps）

---

### Telehealth Platform APIs 影响的功能

**位置**：`/alternatives` 页面 → "Real-Time Telehealth Platform Prices" 部分

**显示内容**：
- 如果启用：从真实 API 获取的价格数据
- 如果未启用：静态模拟数据（`telehealth-prices.ts`）

**代码位置**：
- `lib/telehealth-api.ts` - API 调用逻辑
- `lib/telehealth-api-config.ts` - API 配置
- `components/TelehealthPriceGrid.tsx` - 价格显示组件

---

## 实际使用场景

### 场景 1：快速上线（都不启用）

**适合**：想要快速上线，不需要实时数据

**配置**：
- 不配置任何 API keys
- 不安装额外依赖

**结果**：
- ✅ 网站完全可用
- ✅ 所有功能正常
- ⚠️ 使用静态数据

---

### 场景 2：有 Google Maps 预算（只启用 Google Maps）

**适合**：想要更好的地图体验，但暂时不需要实时价格

**配置**：
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
npm install @react-google-maps/api
```

**结果**：
- ✅ 交互式地图体验
- ⚠️ 价格使用静态数据（但功能正常）

---

### 场景 3：有平台 API 访问权限（只启用 Telehealth API）

**适合**：已获得平台 API 访问权限，但不想使用 Google Maps

**配置**：
```bash
HENRY_MEDS_API_KEY=your_key
# ... 其他平台
# 更新 lib/telehealth-api-config.ts，设置 enabled: true
```

**结果**：
- ✅ 实时价格数据
- ⚠️ 地图使用静态网格（但功能正常）

---

### 场景 4：完整功能（都启用）

**适合**：想要最佳用户体验

**配置**：
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
HENRY_MEDS_API_KEY=your_key
# ... 其他平台
npm install @react-google-maps/api
```

**结果**：
- ✅ 交互式地图
- ✅ 实时价格数据
- ✅ 最佳用户体验

---

## 成本考虑

### Google Maps API

- **免费额度**：前 $200/月（约 28,000 次地图加载）
- **超出后**：$7/1000 次加载
- **估算**：中小型网站通常在免费额度内

### Telehealth Platform APIs

- **通常免费**（作为合作伙伴）
- **可能需要**：最低交易量或合作协议
- **联系平台**了解具体条款

---

## 总结

**关键点**：
1. ✅ **两个功能完全独立**，不是二选一
2. ✅ **可以都启用**，也可以只启用一个
3. ✅ **都不启用也能正常工作**（使用静态数据）
4. ✅ **根据需求选择**，没有强制要求

**推荐**：
- **快速上线**：都不启用（使用静态数据）
- **有预算**：启用 Google Maps（提升地图体验）
- **有 API 权限**：启用 Telehealth API（实时价格）
- **最佳体验**：都启用（完整功能）

---

**文档版本**: v1.0  
**最后更新**: 2026-01-30  
**维护者**: GLP-1 Guide Team

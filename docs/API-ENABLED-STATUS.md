# API 集成启用状态

> **最后更新**: 2026-01-30

---

## 当前状态

### ✅ Google Maps API

**状态**: ✅ **已安装库，等待 API Key**

- ✅ `@react-google-maps/api` 已安装
- ✅ 代码已集成
- ⚠️ API Key 需要配置（当前使用占位符）

**当前行为**:
- 如果没有有效的 API Key，会显示提示信息："Google Maps API Key Required"
- 地图功能会回退到静态州网格显示
- 网站完全可用，不影响其他功能

**启用步骤**:
1. 获取 Google Maps API Key：https://console.cloud.google.com/
2. 更新 `.env.local` 中的 `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
3. 重启开发服务器：`npm run dev`

---

### ✅ Telehealth Platform APIs

**状态**: ✅ **代码已准备好，等待 API Keys**

- ✅ API 集成代码已完成
- ✅ 配置系统已就绪
- ⚠️ API Keys 需要从平台获取（当前使用占位符）

**当前行为**:
- 如果没有配置 API Keys 或 `enabled: false`，使用静态模拟数据
- 价格仍然显示，带时间戳（但数据是静态的）
- 网站完全可用，不影响其他功能

**启用步骤**:
1. 联系平台获取 API 访问权限
2. 更新 `.env.local` 中的 API Keys
3. 更新 `lib/telehealth-api-config.ts`，设置 `enabled: true`
4. 实现 `normalizePlatformData()` 函数（根据实际 API 响应）
5. 重启开发服务器

---

## 功能验证

### 当前可用功能

✅ **所有页面正常访问**:
- `/` - 首页 ✅
- `/alternatives` - Alternatives 页面 ✅
- `/drugs/wegovy` - Wegovy 页面 ✅
- `/drugs/ozempic` - Ozempic 页面 ✅
- `/drugs/mounjaro` - Mounjaro 页面 ✅
- `/drugs/zepbound` - Zepbound 页面 ✅
- `/calculator` - Calculator 页面 ✅
- `/faq` - FAQ 页面 ✅
- `/about` - About 页面 ✅

✅ **API 集成功能**:
- Google Maps: 显示提示（等待 API Key）
- Telehealth API: 使用静态数据（等待 API Keys）
- 价格时间戳: 正常工作
- 服务区域地图: 静态州网格显示

---

## 下一步操作

### 启用 Google Maps（可选）

1. **获取 API Key**:
   ```
   访问: https://console.cloud.google.com/
   启用: Maps JavaScript API
   创建: API Key
   限制: 域名和 API
   ```

2. **更新 `.env.local`**:
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_real_api_key_here
   ```

3. **重启服务器**:
   ```bash
   npm run dev
   ```

4. **验证**:
   - 访问 `/alternatives` 页面
   - 滚动到 "Service Area Visualization"
   - 应该看到交互式 Google Maps

### 启用 Telehealth API（可选）

1. **联系平台**获取 API 访问权限

2. **更新 `.env.local`**:
   ```bash
   HENRY_MEDS_API_KEY=your_real_key
   RO_API_KEY=your_real_key
   # ... 其他平台
   ```

3. **更新配置** (`lib/telehealth-api-config.ts`):
   ```typescript
   'henry-meds': {
     // ... other config
     enabled: true, // 改为 true
   }
   ```

4. **实现数据映射** (`lib/telehealth-api.ts`):
   - 根据实际 API 响应格式实现 `normalizePlatformData()`

5. **重启服务器并测试**

---

## 重要说明

### 当前状态（都未启用）

- ✅ **网站完全可用**
- ✅ **所有功能正常**
- ⚠️ **使用静态数据**（模拟数据）
- ⚠️ **地图使用静态网格**（非交互式）

### 启用后的状态

- ✅ **Google Maps**: 交互式地图
- ✅ **Telehealth API**: 实时价格数据
- ✅ **最佳用户体验**

---

**文档版本**: v1.0  
**维护者**: GLP-1 Guide Team

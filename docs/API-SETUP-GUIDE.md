# API 集成设置指南

> **目的**：指导如何设置 Telehealth 平台 API 集成和 Google Maps API

---

## 一、Google Maps API 设置

### 1.1 获取 Google Maps API Key

1. **访问 Google Cloud Console**
   - 前往：https://console.cloud.google.com/
   - 创建新项目或选择现有项目

2. **启用 Maps JavaScript API**
   - 在 API 库中搜索 "Maps JavaScript API"
   - 点击 "启用"

3. **创建 API Key**
   - 转到 "凭据" → "创建凭据" → "API 密钥"
   - 复制生成的 API Key

4. **限制 API Key（推荐）**
   - 点击 API Key 进行编辑
   - **应用程序限制**：选择 "HTTP 引荐来源网址（网站）"
   - 添加你的域名（如：`https://glp1guide.com/*`）
   - **API 限制**：选择 "限制密钥" → 仅选择 "Maps JavaScript API"
   - 保存

### 1.2 配置环境变量

创建或编辑 `.env.local` 文件：

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 1.3 安装依赖

```bash
npm install @react-google-maps/api
```

### 1.4 验证设置

1. 重启开发服务器：`npm run dev`
2. 访问 `/alternatives` 页面
3. 滚动到 "Service Area Visualization" 部分
4. 应该看到交互式 Google Maps（如果 API key 正确）

---

## 二、Telehealth 平台 API 集成

### 2.1 联系平台获取 API 访问权限

**需要联系的平台**：
- Henry Meds
- Ro
- Mochi Health
- Calibrate
- Found

**请求信息**：
- API 端点 URL
- 认证方式（Bearer Token、API Key、OAuth）
- 速率限制
- 数据格式（JSON、XML）
- 示例响应

### 2.2 配置 API 凭据

编辑 `.env.local` 文件，添加每个平台的 API Key：

```bash
# Telehealth Platform API Keys
HENRY_MEDS_API_KEY=your_henry_meds_api_key
HENRY_MEDS_API_URL=https://api.henrymeds.com/v1/pricing

RO_API_KEY=your_ro_api_key
RO_API_URL=https://api.ro.co/v1/pricing

MOCHI_API_KEY=your_mochi_api_key
MOCHI_API_URL=https://api.mochihealth.com/v1/pricing

CALIBRATE_API_KEY=your_calibrate_api_key
CALIBRATE_API_URL=https://api.calibrate.com/v1/pricing

FOUND_API_KEY=your_found_api_key
FOUND_API_URL=https://api.found.com/v1/pricing
```

### 2.3 更新 API 配置

编辑 `lib/telehealth-api-config.ts`：

1. **更新 API 端点**（如果与默认值不同）
2. **设置 `enabled: true`** 对于已配置的平台
3. **调整速率限制**（根据平台文档）
4. **设置缓存 TTL**（建议 5-15 分钟）

示例：

```typescript
'henry-meds': {
  // ... other config
  enabled: true, // 改为 true
  cacheTTL: 5, // 根据平台建议调整
},
```

### 2.4 实现数据标准化

编辑 `lib/telehealth-api.ts` 中的 `normalizePlatformData()` 函数：

1. **查看平台 API 文档**，了解响应格式
2. **映射字段**到我们的 `TelehealthPlatform` 接口
3. **处理错误情况**（缺失字段、null 值）

示例（Henry Meds）：

```typescript
case 'henry-meds':
  return {
    ...cached,
    basePrice: data.monthly_price || cached.basePrice,
    totalMonthly: data.total_monthly || cached.totalMonthly,
    availability: data.in_stock ? 'in-stock' : 'limited',
    lastUpdated: new Date().toISOString(),
  };
```

### 2.5 测试 API 集成

1. **启用一个平台**（设置 `enabled: true`）
2. **添加 API Key** 到 `.env.local`
3. **重启开发服务器**
4. **检查控制台**是否有错误
5. **验证数据**是否正确显示

---

## 三、API 响应格式示例

### 3.1 预期响应格式

每个平台的 API 响应可能不同。以下是常见格式示例：

**Henry Meds 示例**：
```json
{
  "monthly_price": 297,
  "total_monthly": 297,
  "in_stock": true,
  "availability": "in-stock"
}
```

**Ro 示例**：
```json
{
  "base_price": 0,
  "total_cost": 0,
  "insurance_dependent": true,
  "availability_status": "limited"
}
```

**Mochi Health 示例**：
```json
{
  "medication_price": 325,
  "membership_fee": 79,
  "total_monthly": 404,
  "availability_status": "in-stock"
}
```

### 3.2 字段映射表

| 我们的字段 | Henry Meds | Ro | Mochi |
|-----------|------------|----|----|
| `basePrice` | `monthly_price` | `base_price` | `medication_price` |
| `membershipFee` | N/A | N/A | `membership_fee` |
| `totalMonthly` | `total_monthly` | `total_cost` | `total_monthly` |
| `availability` | `in_stock` (boolean) | `availability_status` | `availability_status` |

---

## 四、故障排除

### 4.1 Google Maps 不显示

**问题**：地图显示 "Google Maps API Key Required"

**解决方案**：
1. 检查 `.env.local` 中是否有 `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
2. 确保 API Key 以 `NEXT_PUBLIC_` 开头（Next.js 要求）
3. 重启开发服务器
4. 检查 Google Cloud Console 中的 API 限制设置

### 4.2 API 请求失败

**问题**：控制台显示 API 错误

**检查清单**：
- [ ] API Key 是否正确
- [ ] API 端点 URL 是否正确
- [ ] 认证方式是否正确（Bearer vs API Key）
- [ ] 速率限制是否超限
- [ ] 网络连接是否正常

**调试步骤**：
1. 检查浏览器控制台的网络请求
2. 查看响应状态码和错误消息
3. 验证 API Key 权限
4. 测试 API 端点（使用 curl 或 Postman）

### 4.3 数据格式不匹配

**问题**：数据显示不正确或为空

**解决方案**：
1. 检查 `normalizePlatformData()` 函数
2. 验证 API 响应格式
3. 添加错误处理和日志
4. 使用 TypeScript 类型检查

---

## 五、安全最佳实践

### 5.1 API Key 安全

- ✅ **永远不要**将 API Key 提交到 Git
- ✅ 使用 `.env.local`（已在 `.gitignore` 中）
- ✅ 限制 API Key 权限（仅需要的 API）
- ✅ 限制 API Key 域名（仅你的网站）
- ✅ 定期轮换 API Key

### 5.2 速率限制

- ✅ 遵守每个平台的速率限制
- ✅ 实现缓存以减少 API 调用
- ✅ 使用指数退避重试策略
- ✅ 监控 API 使用情况

### 5.3 错误处理

- ✅ 始终有回退机制（使用缓存/模拟数据）
- ✅ 记录错误但不暴露敏感信息
- ✅ 优雅降级（API 失败时仍显示数据）

---

## 六、成本估算

### 6.1 Google Maps API

- **Maps JavaScript API**：前 $200/月免费（28,000 次加载）
- **超出后**：$7/1000 次加载
- **估算**：对于中小型网站，通常在前 $200 免费额度内

### 6.2 Telehealth Platform APIs

- **通常免费**（作为合作伙伴）
- **可能需要**：最低交易量或合作协议
- **联系平台**了解具体条款

---

## 七、检查清单

### Google Maps 设置
- [ ] 创建 Google Cloud 项目
- [ ] 启用 Maps JavaScript API
- [ ] 创建并限制 API Key
- [ ] 添加 `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` 到 `.env.local`
- [ ] 安装 `@react-google-maps/api`
- [ ] 验证地图显示

### Telehealth API 设置
- [ ] 联系平台获取 API 访问权限
- [ ] 获取 API Key 和端点 URL
- [ ] 添加 API Keys 到 `.env.local`
- [ ] 更新 `telehealth-api-config.ts`（设置 `enabled: true`）
- [ ] 实现 `normalizePlatformData()` 函数
- [ ] 测试 API 集成
- [ ] 验证数据显示正确

---

## 八、支持与资源

### 8.1 文档链接

- **Google Maps API**: https://developers.google.com/maps/documentation/javascript
- **@react-google-maps/api**: https://react-google-maps-api-docs.netlify.app/

### 8.2 联系信息

- **Henry Meds API**: [联系 Henry Meds 支持]
- **Ro API**: [联系 Ro 支持]
- **Mochi Health API**: [联系 Mochi Health 支持]

---

**文档版本**: v1.0  
**最后更新**: 2026-01-30  
**维护者**: GLP-1 Guide Team

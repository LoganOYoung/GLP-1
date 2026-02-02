# 全站 UI 与布局优化说明

## 一、统一风格与布局 token

### 1. 全局样式 (`app/globals.css`)

- **布局类**（`@layer components`）：
  - `.container-page`：`mx-auto max-w-6xl px-4 sm:px-6`，全站内容区统一宽度与左右留白
  - `.section-pad`：`py-10 sm:py-12 lg:py-16`，标准区块上下间距
  - `.section-pad-tight`：`py-8 sm:py-10 lg:py-12`，略紧的区块间距
- **防溢出**：`html`、`body`、`#main-content` 的 `overflow-x: hidden` / `min-width: 0`，避免横向滚动
- **安全区**：`body` 使用 `padding-left/right: env(safe-area-inset-*)`，适配刘海屏/圆角
- **打印**：打印 URL 已改为 `https://www.rxlikewise.com`
- **字体**：`-webkit-text-size-adjust: 100%` 防止 iOS 自动放大字体

### 2. 颜色统一

- 移除未定义色：`medical-blue` 已全部替换为 `primary`（`app/cost-insurance/page.tsx`、`components/CalculatorMultiStep.tsx`）

---

## 二、桌面端与手机端布局

### 1. 导航断点（Header / NavDesktop / MobileMenu）

- **原**：`sm`（640px）以上显示桌面导航，以下显示汉堡菜单
- **现**：`md`（768px）以上显示桌面导航，以下显示汉堡菜单
- **效果**：平板与窄屏用手机菜单，桌面导航不再挤在一行，下拉有足够空间

### 2. Header

- 使用 `.container-page` 统一内边距与最大宽度
- 高度 `h-14 min-h-[56px]`，Logo 区域在移动端保证约 44px 触控区域（`min-h-[44px] min-w-[44px]`），在 `md` 以上恢复为自动
- 站点名「Rx Likewise」在 `md` 以上显示（原为 `sm`）

### 3. 移动端菜单 (MobileMenu)

- **body 滚动锁定**：菜单打开时 `document.body` 与 `document.documentElement` 设置 `overflow: hidden`，关闭时恢复，避免背景滚动
- **触控区域**：汉堡按钮、关闭按钮、所有链接与分组按钮使用 `min-h-[44px]` 或 `py-3`，符合约 44px 触控规范
- **显示范围**：`md:hidden`，与桌面导航的 `md:flex` 对应

### 4. Footer

- 使用 `.container-page` 与 `.section-pad` 统一宽度与上下间距
- **分流按钮**：移动端 `min-h-[44px] py-2.5`，桌面端 `md:py-1.5 md:min-h-0`
- **链接列表**：移动端 `block py-2` 增大可点区域，桌面端 `md:py-0`
- **网格**：`gap-6 sm:gap-8`，小屏略紧、大屏略松

---

## 三、页面容器与区块间距

以下页面已改为使用 `.container-page`、`.section-pad` 或 `.section-pad-tight`，与全局 token 一致：

- **首页**：Hero 与各 section 使用 `container-page` + `section-pad`
- **HomeFlowByRole**：`container-page section-pad-tight`
- **Cost & Insurance**：Hero `container-page section-pad`，主内容区 `container-page section-pad-tight`
- **Alternatives**：主内容区 `container-page section-pad-tight`
- **Legitimacy**：Hero `container-page section-pad`，Quick links 区 `container-page py-4`
- **Comparison**：Hero 与底部 Related 区 `container-page section-pad` / `section-pad-tight`

其他页面可逐步把 `mx-auto max-w-6xl px-4 sm:px-6` 换成 `container-page`，把 `py-10 sm:py-12 lg:py-16` 换成 `section-pad` 或 `section-pad-tight`，以保持全站一致。

---

## 四、使用建议

1. **新区块**：外层用 `container-page`，需要上下留白时加 `section-pad` 或 `section-pad-tight`
2. **移动端优先**：新增按钮/链接时，在移动端保证至少约 44px 触控高度（如 `min-h-[44px]` 或 `py-3`），桌面端可用 `md:min-h-0 md:py-2` 等收窄
3. **防横向滚动**：全宽或大图区块加 `overflow-hidden` 或 `min-w-0`，避免撑破视口

---

**总结**：全站采用统一 container/section token、导航在 768px 切换、移动端菜单锁 body 滚动并满足触控区域、Footer 与主要页面已统一为上述布局类，颜色上已去除未定义 `medical-blue`。

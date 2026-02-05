# SEO 性能检查与评估报告

**项目**: Rx Likewise (GLP-1)  
**评估日期**: 2026-01-30  
**域名**: https://www.rxlikewise.com

---

## 一、已具备的 SEO 能力（✅）

### 1. 元数据 (Metadata)

| 项目 | 状态 | 说明 |
|------|------|------|
| 根 layout | ✅ | `app/layout.tsx`: title template、description、keywords、robots、viewport |
| metadataBase | ✅ | 已设置 `https://www.rxlikewise.com`，便于相对 URL 解析 |
| Open Graph | ✅ | 已补全 url、siteName、title、description、images（使用现有 banner） |
| Twitter Card | ✅ | summary_large_image，title、description |
| 各页独立 metadata | ✅ | calculator、faq、alternatives、cost-insurance、legitimacy、comparison、labs、trumprx、about、appeals、shortage、dose-converter、quiz layout、calculator layout、**drugs/[slug]**（动态 generateMetadata） |
| 首页 metadata | ✅ | 显式 title、description、openGraph.url、canonical |

### 2. 结构化数据 (JSON-LD)

| 页面/组件 | Schema 类型 | 说明 |
|-----------|-------------|------|
| FAQ | FAQPage | StructuredData 组件 + faq-data，dateModified |
| Calculator | SoftwareApplication | 功能列表、offers、dateModified、url |
| Alternatives | Service | 自建 buildServiceSchema |
| Cost & Insurance | FAQPage + HowTo + Service | 多 schema |
| TrumpRx | FAQPage | 自建 faqSchema |
| Drugs/[slug] | Drug + BreadcrumbList + FAQPage | 药品详情页 |
| About | Organization | 自建 |
| Footer | Organization | 全站页脚 |
| Breadcrumbs | BreadcrumbList | Breadcrumbs 组件内 |

### 3. 技术 SEO

| 项目 | 状态 |
|------|------|
| 语义化 HTML | ✅ lang="en"，合理 h1/h2/section |
| 无障碍 | ✅ SkipLinks（#main-content, #navigation）、aria 使用 |
| 移动端 | ✅ viewport、响应式布局 |
| 图片 alt | ✅ ImagePlaceholder 强制 alt，各页 banner 有描述性 alt |
| Sitemap | ✅ **新增** `app/sitemap.ts`：静态路由 + 药品 slug，changeFrequency/priority |
| Robots | ✅ **新增** `app/robots.ts`：allow /，sitemap 指向 /sitemap.xml |
| 静态导出 | ✅ next.config 使用 output: 'export'，sitemap/robots 在构建时生成 |

### 4. 内容与站内结构

| 项目 | 状态 |
|------|------|
| 唯一 H1/页 | ✅ 各页单一主标题 |
| 内部链接 | ✅ 已审计，关键页、FAQ、药品详情链接正确 |
| URL 结构 | ✅ 清晰：/calculator、/alternatives、/drugs/wegovy 等 |
| 面包屑 | ✅ Breadcrumbs 组件 + BreadcrumbList schema（药品页等） |

---

## 二、本次修改摘要

1. **新增 `app/sitemap.ts`**  
   包含所有静态路由（首页、quiz、calculator、alternatives、cost-insurance、appeals、comparison、legitimacy、shortage、labs、trumprx、dose-converter、faq、about）及 `drug-data` 导出的药品 slug，生成 `/sitemap.xml`。

2. **新增 `app/robots.ts`**  
   允许所有爬虫抓取全站，并声明 `sitemap: https://www.rxlikewise.com/sitemap.xml`。

3. **增强根 layout 元数据**  
   - `metadataBase: new URL(SITE_URL)`  
   - Open Graph：url、siteName、title、description、images（现有 home-hero-banner）  
   - Twitter：card、title、description  

4. **首页 `app/page.tsx`**  
   增加显式 metadata：title、description、openGraph.url、alternates.canonical，便于首页在搜索结果与分享中表现一致。

---

## 三、建议后续优化（可选）

| 优先级 | 建议 | 说明 |
|--------|------|------|
| 中 | 专用 OG 图 | 新增 1200×630 的 `/images/og-default.png` 或同尺寸图，替换当前 banner 作为默认分享图，品牌感更强 |
| 中 | 关键页 canonical | 对 /calculator、/alternatives 等使用 `metadata.alternates.canonical` 指向当前页 URL，避免重复内容 |
| 低 | 更多 WebPage/Article schema | 长文页（如 about、cost-insurance）可加 WebPage 或 Article，带 datePublished/dateModified |
| 低 | 核心 Web Vitals | 使用 Lighthouse / PageSpeed Insights 测 LCP、FID、CLS；字体可考虑自托管或 preconnect 以减阻塞 |
| 低 | hreflang | 若未来做多语言，再增加 hreflang |

---

## 四、验证方式

- **Sitemap**: 部署后访问 `https://www.rxlikewise.com/sitemap.xml`  
- **Robots**: 访问 `https://www.rxlikewise.com/robots.txt`  
- **OG/Twitter**: 使用 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 或 [Twitter Card Validator](https://cards-dev.twitter.com/validator)  
- **结构化数据**: [Google Rich Results Test](https://search.google.com/test/rich-results) 或 [Schema Markup Validator](https://validator.schema.org/)  
- **整体 SEO**: Google Search Console 提交 sitemap、查看覆盖率与增强结果

---

## 五、结论

站点已具备完整的 **meta 信息、Open Graph、Twitter Card、多类型 JSON-LD、sitemap、robots** 以及首页 canonical；语义化与无障碍基础良好。本次补充 **sitemap/robots** 与 **根 layout/首页 metadata 增强** 后，更利于爬虫发现与索引，以及社交分享展示。建议上线后提交 sitemap 至 Search Console 并定期查看索引与富媒体结果状态。

/**
 * 导航结构图谱 (2026): 6 个一级菜单，与业务逻辑对应。
 * 一级菜单 (Primary) | 二级/功能项 (Secondary) | 业务逻辑 (Business Logic)
 */

export type NavGroupId =
  | 'getStarted'
  | 'alternatives'
  | 'costsSavings'
  | 'safetyTrust'
  | 'tools'
  | 'resources';

export interface NavLink {
  href: string;
  label: string;
  icon?: string;
}

export interface NavGroup {
  id: NavGroupId;
  label: string;
  links: NavLink[];
}

/** 1. Get Started — 转化漏斗入口，给新手明确起点 */
export const GET_STARTED_GROUP: NavGroup = {
  id: 'getStarted',
  label: 'Get Started',
  links: [
    { href: '/#start-by-situation', label: 'Start here', icon: 'Compass' },
    { href: '/quiz', label: 'Find Your Option (Quiz)', icon: 'HelpCircle' },
    { href: '/', label: 'Home', icon: 'Compass' },
  ],
};

/** 2. Alternatives — 核心对比，按药物类型拆分，SEO 权重高 */
export const ALTERNATIVES_GROUP: NavGroup = {
  id: 'alternatives',
  label: 'Alternatives',
  links: [
    { href: '/comparison', label: 'Tirzepatide vs Semaglutide', icon: 'GitCompare' },
    { href: '/alternatives', label: 'Compounded Guide', icon: 'LayoutList' },
    { href: '/alternatives', label: 'Oral Pills 2026', icon: 'Pill' },
  ],
};

/** 3. Costs & Savings — 支付解决方案，计算器+政策+模板打包 */
export const COSTS_SAVINGS_GROUP: NavGroup = {
  id: 'costsSavings',
  label: 'Costs & Savings',
  links: [
    { href: '/cost-insurance', label: 'Cost & Insurance', icon: 'Wallet' },
    { href: '/calculator', label: 'Insurance Calculator', icon: 'Calculator' },
    { href: '/trumprx', label: 'TrumpRx Policy', icon: 'MapPin' },
    { href: '/cost-insurance/appeals', label: 'Appeal Templates', icon: 'FileText' },
  ],
};

/** 4. Safety & Trust — 信任背书，安全性研究，E-E-A-T */
export const SAFETY_TRUST_GROUP: NavGroup = {
  id: 'safetyTrust',
  label: 'Safety & Trust',
  links: [
    { href: '/legitimacy', label: 'Pharmacy Radar (Legitimacy)', icon: 'Shield' },
    { href: '/comparison', label: 'Side Effect Database', icon: 'Activity' },
    { href: '/labs', label: 'Clinical Data', icon: 'FlaskConical' },
  ],
};

/** 5. Tools — 高频工具，提高回访率 */
export const TOOLS_GROUP: NavGroup = {
  id: 'tools',
  label: 'Tools',
  links: [
    { href: '/tools/dose-converter', label: 'Dose-to-Units Converter', icon: 'Scale' },
    { href: '/calculator', label: 'BMI Tracker', icon: 'Calculator' },
    { href: '/alternatives', label: 'Stock Alert', icon: 'Bell' },
  ],
};

/** 6. Resources — 长尾内容，辅助信息 */
export const RESOURCES_GROUP: NavGroup = {
  id: 'resources',
  label: 'Resources',
  links: [
    { href: '/faq', label: 'FAQ Center', icon: 'HelpCircle' },
    { href: '/about', label: 'About', icon: 'BookOpen' },
    { href: '/faq', label: 'Glossary', icon: 'BookMarked' },
  ],
};

/** 所有一级菜单（下拉组）：Costs 优先于 Alternatives，与战略重心一致 */
export const NAV_GROUPS: NavGroup[] = [
  GET_STARTED_GROUP,
  COSTS_SAVINGS_GROUP,
  ALTERNATIVES_GROUP,
  SAFETY_TRUST_GROUP,
  TOOLS_GROUP,
  RESOURCES_GROUP,
];

/** 主 CTA：Find Your Option → /quiz（右侧高对比度按钮） */
export const CTA_LABEL = 'Find Your Option';
export const CTA_HREF = '/quiz';

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
  | 'resources'
  | 'legal';

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

/** 1. Get Started — 只保留测验入口；按情境分流在首页 + Footer，减少导航「回首页」出口以留住用户 */
export const GET_STARTED_GROUP: NavGroup = {
  id: 'getStarted',
  label: 'Get Started',
  links: [
    { href: '/quiz', label: 'Find Your Option (Quiz)', icon: 'HelpCircle' },
  ],
};

/** 2. Alternatives — 核心对比（同页两条，用锚点区分复配 / 口服） */
export const ALTERNATIVES_GROUP: NavGroup = {
  id: 'alternatives',
  label: 'Alternatives',
  links: [
    { href: '/comparison', label: 'Tirzepatide vs Semaglutide', icon: 'GitCompare' },
    { href: '/alternatives#compounded', label: 'Compounded Guide', icon: 'LayoutList' },
    { href: '/alternatives#oral', label: 'Oral Pills 2026', icon: 'Pill' },
  ],
};

/** 3. Costs & Savings — 支付解决方案，计算器+政策+模板打包 */
export const COSTS_SAVINGS_GROUP: NavGroup = {
  id: 'costsSavings',
  label: 'Costs',
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
  label: 'Safety',
  links: [
    { href: '/legitimacy', label: 'Pharmacy Radar (Legitimacy)', icon: 'Shield' },
    { href: '/comparison', label: 'Side Effect Database', icon: 'Activity' },
    { href: '/labs', label: 'Clinical Data', icon: 'FlaskConical' },
  ],
};

/** 5. Tools — 高频工具（Calculator 主功能为费用估算，统一称 Cost Calculator） */
export const TOOLS_GROUP: NavGroup = {
  id: 'tools',
  label: 'Tools',
  links: [
    { href: '/tools/dose-converter', label: 'Dose-to-Units Converter', icon: 'Scale' },
    { href: '/calculator', label: 'Cost Calculator', icon: 'Calculator' },
    { href: '/report', label: 'Report Price & Supply', icon: 'FileText' },
    { href: '/alternatives#stock', label: 'Stock Alert', icon: 'Bell' },
  ],
};

/** 6. Resources — 长尾内容（FAQ 与 Glossary 同页，合并为一条） */
export const RESOURCES_GROUP: NavGroup = {
  id: 'resources',
  label: 'Resources',
  links: [
    { href: '/faq', label: 'FAQ', icon: 'HelpCircle' },
    { href: '/about', label: 'About', icon: 'BookOpen' },
  ],
};

/** 7. Legal & Compliance — 法律与合规（Header 必须有一级入口） */
export const LEGAL_GROUP: NavGroup = {
  id: 'legal',
  label: 'Legal',
  links: [
    { href: '/about#disclaimer', label: 'Disclaimer', icon: 'FileText' },
    { href: '/about#privacy', label: 'Privacy', icon: 'FileText' },
    { href: '/about#terms', label: 'Terms of Use', icon: 'FileText' },
    { href: '/legitimacy#compliance', label: 'Lab Compliance', icon: 'Shield' },
  ],
};

/** 所有一级菜单（下拉组）：Costs 优先于 Alternatives，Legal 收尾 */
export const NAV_GROUPS: NavGroup[] = [
  GET_STARTED_GROUP,
  COSTS_SAVINGS_GROUP,
  ALTERNATIVES_GROUP,
  SAFETY_TRUST_GROUP,
  TOOLS_GROUP,
  RESOURCES_GROUP,
  LEGAL_GROUP,
];

/** 主 CTA：Find Your Option → /quiz（右侧高对比度按钮） */
export const CTA_LABEL = 'Find Option';
export const CTA_HREF = '/quiz';

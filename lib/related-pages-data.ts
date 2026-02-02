/**
 * Centralized related-page entries to avoid duplicate copy across pages.
 * Each page can use getRelatedPagesFor(context) or pass a custom slice.
 */

export interface RelatedPageEntry {
  title: string;
  description: string;
  href: string;
  image?: string;
  category?: string;
}

const ENTRIES: Record<string, RelatedPageEntry> = {
  calculator: {
    title: 'Cost Calculator',
    description: 'Get a personalized cost estimate for GLP-1 medications.',
    href: '/calculator',
    image: '/images/banners/calculator-tool-banner.webp',
    category: 'Tool',
  },
  alternatives: {
    title: 'Alternatives',
    description: 'Compare brand, compounded, and oral GLP-1 options.',
    href: '/alternatives',
    image: '/images/banners/alternatives-hero-banner.webp',
    category: 'Guide',
  },
  costInsurance: {
    title: 'Cost & Insurance',
    description: 'Learn about discount cards and insurance appeals.',
    href: '/cost-insurance',
    image: '/images/banners/cost-insurance-hero-banner.webp',
    category: 'Guide',
  },
  legitimacy: {
    title: 'Legitimacy Tracker',
    description: 'How to verify pharmacies and avoid scams.',
    href: '/legitimacy',
    image: '/images/banners/legitimacy-hero-banner.webp',
    category: 'Safety',
  },
  shortage: {
    title: 'FDA Shortage Status',
    description: 'Check current FDA-reported shortages for GLP-1 products.',
    href: '/legitimacy/shortage',
    category: 'Resource',
  },
  labs: {
    title: 'Lab Transparency',
    description: 'Verify compounding lab credentials and FDA inspection records.',
    href: '/labs',
    category: 'Database',
  },
  faq: {
    title: 'FAQ',
    description: 'Frequently asked questions about GLP-1 medications.',
    href: '/faq',
    image: '/images/banners/faq-hero-banner.webp',
    category: 'Resource',
  },
  comparison: {
    title: 'Drug Comparison',
    description: 'Tirzepatide vs Semaglutide, brand vs compounded. Cost, efficacy, side effects.',
    href: '/comparison',
    image: '/images/banners/alternatives-hero-banner.webp',
    category: 'Tool',
  },
  doseConverter: {
    title: 'Dose Converter',
    description: 'Convert brand to compounded units. Wegovy, Ozempic, Zepbound, Mounjaro dose charts.',
    href: '/tools/dose-converter',
    category: 'Tool',
  },
  appeals: {
    title: 'Appeal Center',
    description: 'Appeal letter template and insurer-specific tips for GLP-1 denials.',
    href: '/cost-insurance/appeals',
    category: 'Resource',
  },
};

/** Presets: ordered list of keys for each page context. */
const PRESETS: Record<string, string[]> = {
  faq: ['calculator', 'alternatives', 'costInsurance'],
  calculator: ['costInsurance', 'alternatives', 'comparison'],
  alternatives: ['calculator', 'comparison', 'costInsurance', 'doseConverter'],
  costInsurance: ['calculator', 'alternatives', 'comparison', 'appeals'],
  legitimacy: ['shortage', 'labs', 'costInsurance'],
  shortage: ['legitimacy', 'calculator', 'costInsurance'],
  labs: ['legitimacy', 'alternatives', 'calculator'],
  trumprx: ['costInsurance', 'calculator', 'alternatives'],
  about: ['faq', 'calculator', 'legitimacy'],
  comparison: ['alternatives', 'calculator', 'costInsurance'],
  doseConverter: ['alternatives', 'calculator', 'comparison'],
  appeals: ['costInsurance', 'calculator', 'faq'],
};

export function getRelatedPagesFor(context: keyof typeof PRESETS): RelatedPageEntry[] {
  const keys = PRESETS[context];
  if (!keys) return [];
  return keys.map((key) => ENTRIES[key]).filter(Boolean);
}

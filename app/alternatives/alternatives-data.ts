/**
 * Alternatives 页面数据：三条路径对比、药房资质、副作用差异、剂量换算
 */

export type CurrentIssue = 'out-of-stock' | 'too-expensive' | 'insurance-denied';
export type PreferForm = 'injection' | 'oral';

/** 路径对比表：行维度 */
export const PATH_COMPARISON_ROWS = [
  {
    id: 'price',
    label: 'Price 2026',
    brand: { value: '$900–$1,400+/mo', status: 'high' as const },
    compounded: { value: '$150–$350/mo', status: 'good' as const },
    oral: { value: '$300–$1,000+/mo', status: 'varies' as const },
  },
  {
    id: 'availability',
    label: 'Availability',
    brand: { value: 'Shortage common', status: 'alert' as const },
    compounded: { value: 'Widely available', status: 'good' as const },
    oral: { value: 'Growing supply', status: 'good' as const },
  },
  {
    id: 'insurance',
    label: 'Insurance Support',
    brand: { value: 'Often covered', status: 'good' as const },
    compounded: { value: 'Usually cash / HSA/FSA', status: 'neutral' as const },
    oral: { value: 'Often covered', status: 'good' as const },
  },
  {
    id: 'trust',
    label: 'Trust Score',
    brand: { value: 'FDA-approved', status: 'good' as const },
    compounded: { value: '503A/503B licensed', status: 'good' as const },
    oral: { value: 'FDA-approved (Rybelsus)', status: 'good' as const },
  },
] as const;

/** 药房剂型 */
export type PharmacyForm = 'injection' | 'oral' | 'both';

/** 药房/合作方：含价格区间与剂型，用于按预算与剂型筛选 */
export interface PharmacyPartner {
  id: string;
  name: string;
  type: string;
  legitScriptUrl: string;
  fdaRegistration: string;
  eligibilityUrl: string;
  /** 月费区间（美元），用于按预算过滤 */
  priceMin: number;
  priceMax: number;
  /** 剂型：injection / oral / both */
  form: PharmacyForm;
  /** 是否 HSA/FSA 可用 */
  hsaFsaEligible: boolean;
}

/**
 * Verified GLP-1 providers: telehealth + 503A/503B pharmacy partners.
 * eligibilityUrl = official "check eligibility" or "get started" page. Update periodically.
 */
export const PHARMACY_PARTNERS: PharmacyPartner[] = [
  {
    id: 'ph1',
    name: 'Henry Meds',
    type: '503A',
    legitScriptUrl: 'https://www.legitscript.com',
    fdaRegistration: '503A/503B partners',
    eligibilityUrl: 'https://henrymeds.com/glp-1-weight-management/',
    priceMin: 149,
    priceMax: 297,
    form: 'injection',
    hsaFsaEligible: true,
  },
  {
    id: 'ph2',
    name: 'Mochi Health',
    type: '503B',
    legitScriptUrl: 'https://www.legitscript.com',
    fdaRegistration: '503B partners',
    eligibilityUrl: 'https://app.joinmochi.com/eligibility',
    priceMin: 199,
    priceMax: 350,
    form: 'both',
    hsaFsaEligible: true,
  },
  {
    id: 'ph3',
    name: 'WW Clinic (Sequence)',
    type: '503A',
    legitScriptUrl: 'https://www.legitscript.com',
    fdaRegistration: '503A + brand',
    eligibilityUrl: 'https://www.weightwatchers.com/us/weight-loss-medication',
    priceMin: 249,
    priceMax: 399,
    form: 'both',
    hsaFsaEligible: true,
  },
  {
    id: 'ph4',
    name: 'Push Health',
    type: '503A',
    legitScriptUrl: 'https://www.legitscript.com',
    fdaRegistration: '503A partners',
    eligibilityUrl: 'https://www.pushhealth.com/drugs/glp-1-agonist',
    priceMin: 299,
    priceMax: 450,
    form: 'injection',
    hsaFsaEligible: true,
  },
  {
    id: 'ph5',
    name: 'Sesame Care',
    type: '503A',
    legitScriptUrl: 'https://www.legitscript.com',
    fdaRegistration: '503A partners',
    eligibilityUrl: 'https://sesamecare.com/medication/compounded-tirzepatide',
    priceMin: 179,
    priceMax: 320,
    form: 'both',
    hsaFsaEligible: true,
  },
];

/** 副作用差异化：配方 vs 恶心/乏力反馈 */
export const SIDE_EFFECT_PROFILING = [
  {
    id: 'brand',
    formulation: 'Brand (Ozempic/Wegovy)',
    nausea: 'Moderate – common at dose increase',
    fatigue: 'Reported in some users',
  },
  {
    id: 'compounded-b12',
    formulation: 'Compounded + B12',
    nausea: 'Some report lower nausea vs brand',
    fatigue: 'B12 may help energy; mixed reports',
  },
  {
    id: 'compounded-pure',
    formulation: 'Compounded (semaglutide only)',
    nausea: 'Similar to brand',
    fatigue: 'Similar to brand',
  },
  {
    id: 'oral',
    formulation: 'Oral (Rybelsus)',
    nausea: 'Often lower than injectable',
    fatigue: 'Similar to injectable',
  },
] as const;

/** 剂量转换数据：支持品牌、复方、口服之间的转换 */
export interface DoseConversion {
  brandDoseMg: number;
  brandName: string;
  compoundedUnits: number;
  oralDoseMg?: number; // 口服等效剂量（Rybelsus）
  syringeSize?: '0.3ml' | '0.5ml' | '1ml'; // 推荐针筒规格
  syringeMark?: number; // 针筒刻度位置（0-100）
}

/** 原研剂量 -> 复方 Units 换算（支持双向转换和口服转换） */
export const DOSE_TO_UNITS_MAP: DoseConversion[] = [
  { brandDoseMg: 0.25, brandName: 'Wegovy/Ozempic', compoundedUnits: 5, oralDoseMg: 3, syringeSize: '0.3ml', syringeMark: 17 },
  { brandDoseMg: 0.5, brandName: 'Wegovy/Ozempic', compoundedUnits: 10, oralDoseMg: 7, syringeSize: '0.3ml', syringeMark: 33 },
  { brandDoseMg: 1.0, brandName: 'Wegovy', compoundedUnits: 20, oralDoseMg: 14, syringeSize: '0.5ml', syringeMark: 40 },
  { brandDoseMg: 1.7, brandName: 'Wegovy', compoundedUnits: 34, oralDoseMg: 14, syringeSize: '0.5ml', syringeMark: 68 },
  { brandDoseMg: 2.4, brandName: 'Wegovy', compoundedUnits: 48, oralDoseMg: 14, syringeSize: '1ml', syringeMark: 48 },
];

/** Mounjaro/Zepbound 剂量转换（Tirzepatide） */
export const TIRZEPATIDE_DOSE_MAP: DoseConversion[] = [
  { brandDoseMg: 2.5, brandName: 'Mounjaro/Zepbound', compoundedUnits: 5, syringeSize: '0.3ml', syringeMark: 17 },
  { brandDoseMg: 5.0, brandName: 'Mounjaro/Zepbound', compoundedUnits: 10, syringeSize: '0.3ml', syringeMark: 33 },
  { brandDoseMg: 7.5, brandName: 'Mounjaro/Zepbound', compoundedUnits: 15, syringeSize: '0.5ml', syringeMark: 30 },
  { brandDoseMg: 10.0, brandName: 'Mounjaro/Zepbound', compoundedUnits: 20, syringeSize: '0.5ml', syringeMark: 40 },
  { brandDoseMg: 12.5, brandName: 'Mounjaro/Zepbound', compoundedUnits: 25, syringeSize: '0.5ml', syringeMark: 50 },
  { brandDoseMg: 15.0, brandName: 'Mounjaro/Zepbound', compoundedUnits: 30, syringeSize: '1ml', syringeMark: 30 },
];

/** 常见剂量快速选择 */
export const COMMON_DOSES = {
  semaglutide: [0.25, 0.5, 1.0, 1.7, 2.4],
  tirzepatide: [2.5, 5.0, 7.5, 10.0, 12.5, 15.0],
  oral: [3, 7, 14], // Rybelsus doses
};

/** 药物类型 */
export type DrugType = 'semaglutide' | 'tirzepatide' | 'oral';

/** Affiliate 统一参数 */
export const AFFILIATE_REF = 'glp1guide';
export const AFFILIATE_SOURCE = 'alternatives';

/** 筛选条件（与 SmartFilterBar 的 FilterState 对齐） */
export interface PharmacyFilter {
  budgetMin: number;
  budgetMax: number;
  preferForm: PreferForm | '';
}

/** 按预算与剂型筛选药房：预算内且剂型匹配的才显示，按价格从低到高排序 */
export function filterPharmaciesByFilter(
  partners: PharmacyPartner[],
  filter: PharmacyFilter
): PharmacyPartner[] {
  return partners
    .filter((ph) => {
      const withinBudget = ph.priceMin <= filter.budgetMax;
      const formMatch =
        !filter.preferForm ||
        ph.form === filter.preferForm ||
        ph.form === 'both';
      return withinBudget && formMatch;
    })
    .sort((a, b) => a.priceMin - b.priceMin);
}

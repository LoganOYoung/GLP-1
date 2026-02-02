/**
 * 2026 Policy Logic Engine - Property of Rx Likewise
 * 
 * This engine calculates GLP-1 medication costs based on:
 * - 2026 TrumpRx subsidies
 * - Medicare Part D coverage
 * - Prior Authorization (PA) success probability
 * - Hidden costs (consultation, shipping, membership)
 */

export type InsuranceProvider =
  | 'aetna'
  | 'bcbs'
  | 'cigna'
  | 'unitedhealthcare'
  | 'humana'
  | 'medicare'
  | 'medicaid'
  | 'none'
  | 'other';

export type Comorbidity = 'diabetes' | 'hypertension' | 'heart-disease' | 'sleep-apnea' | 'none';

export interface CalculatorInput {
  step: number;
  bmi?: number;
  state?: string;
  insuranceProvider?: InsuranceProvider;
  planType?: 'hmo' | 'ppo' | 'hdhp' | 'medicare-advantage' | 'medicare-part-d' | 'none';
  hasHsa?: boolean;
  hasFsa?: boolean;
  /** Annual deductible in dollars (for HDHP or other plans). Used in advanced engine. */
  annualDeductible?: number;
  /** Amount already paid toward deductible this year. Used in advanced engine. */
  deductibleRemaining?: number;
  comorbidities?: Comorbidity[];
}

export interface ScenarioResult {
  name: 'Brand Name' | 'Compounded' | 'Oral Pill';
  monthlyCost: number;
  annualCost: number;
  hiddenCosts: {
    consultation: number;
    shipping: number;
    membership: number;
  };
  totalMonthly: number;
  totalAnnual: number;
  annualSavings: number; // vs Brand baseline
  easeOfAccess: 1 | 2 | 3 | 4 | 5; // 1-5 stars
  paProbability: 'Low' | 'Medium' | 'High';
  paProbabilityPercent: number;
  features: string[];
  cta: string;
  ctaLink: string;
}

import {
  LEGACY_BRAND_BASE_COST,
  LEGACY_COMPOUNDED_BASE_COST,
  LEGACY_ORAL_BASE_COST,
} from '@/lib/calculator-data';

const BRAND_BASE_COST = LEGACY_BRAND_BASE_COST;
const COMPOUNDED_BASE_COST = LEGACY_COMPOUNDED_BASE_COST;
const ORAL_BASE_COST = LEGACY_ORAL_BASE_COST;

/**
 * Calculate insurance discount based on 2026 policy engine
 */
function calculateInsuranceDiscount(
  provider: InsuranceProvider,
  planType: string,
  comorbidities: Comorbidity[]
): number {
  let discount = 0;

  // Medicare Part D 2026 coverage
  if (provider === 'medicare' && planType === 'medicare-part-d') {
    discount = 0.75; // 75% coverage for diabetes indication
    if (comorbidities.includes('diabetes')) {
      discount = 0.85; // Higher if diabetes
    }
  }

  // Commercial insurance with comorbidities
  if (provider !== 'medicare' && provider !== 'medicaid' && provider !== 'none') {
    if (comorbidities.includes('diabetes')) {
      discount = 0.8; // 80% coverage
    } else if (comorbidities.length > 0) {
      discount = 0.6; // 60% coverage for weight loss with comorbidities
    } else {
      discount = 0.3; // 30% coverage for weight loss only
    }
  }

  // TrumpRx $350 cap program (2026 policy)
  // Eligibility: uninsured or high-deductible, income-based, specific conditions
  if (provider === 'none' || provider === 'other') {
    // TrumpRx aims to cap costs at ~$350/month for eligible individuals
    // If base cost would exceed $350, apply subsidy to bring it down
    const wouldExceed350 = BRAND_BASE_COST > 350;
    if (wouldExceed350) {
      // Calculate discount needed to reach $350 cap
      const targetCost = 350;
      discount = 1 - targetCost / BRAND_BASE_COST; // ~0.67 for $1050 base
    } else {
      discount = 0.2; // 20% subsidy if already below cap
    }
  }

  return Math.min(discount, 0.9); // Cap at 90%
}

/**
 * Calculate PA success probability based on comorbidities
 */
export function calculatePASuccess(
  comorbidities: Comorbidity[],
  insuranceProvider: InsuranceProvider
): { level: 'Low' | 'Medium' | 'High'; percent: number } {
  if (comorbidities.length === 0) {
    return { level: 'Low', percent: 25 };
  }

  let score = 0;
  if (comorbidities.includes('diabetes')) score += 40;
  if (comorbidities.includes('hypertension')) score += 20;
  if (comorbidities.includes('heart-disease')) score += 25;
  if (comorbidities.includes('sleep-apnea')) score += 15;

  // Medicare/Medicaid more lenient
  if (insuranceProvider === 'medicare' || insuranceProvider === 'medicaid') {
    score += 10;
  }

  if (score >= 60) {
    return { level: 'High', percent: Math.min(score + 20, 95) };
  } else if (score >= 35) {
    return { level: 'Medium', percent: Math.min(score + 15, 75) };
  } else {
    return { level: 'Low', percent: Math.min(score + 10, 50) };
  }
}

/**
 * Main calculation engine
 */
export function calculateScenarios(input: CalculatorInput): ScenarioResult[] {
  const {
    insuranceProvider = 'none',
    planType = 'none',
    hasHsa = false,
    hasFsa = false,
    comorbidities = [],
  } = input;

  const paResult = calculatePASuccess(comorbidities, insuranceProvider);
  const insuranceDiscount = calculateInsuranceDiscount(insuranceProvider, planType, comorbidities);

  // Brand Name scenario
  const brandMonthly = Math.round(BRAND_BASE_COST * (1 - insuranceDiscount));
  const brandHidden = {
    consultation: 0, // Usually covered by insurance
    shipping: 0,
    membership: 0,
  };
  const brandTotalMonthly = brandMonthly + brandHidden.consultation + brandHidden.shipping + brandHidden.membership;

  // Compounded scenario
  const compoundedMonthly = COMPOUNDED_BASE_COST;
  const compoundedHidden = {
    consultation: 49, // Telehealth consultation
    shipping: 0, // Free 2-day shipping
    membership: 0,
  };
  const compoundedTotalMonthly = compoundedMonthly + compoundedHidden.consultation + compoundedHidden.shipping + compoundedHidden.membership;
  const compoundedAnnualSavings = (brandTotalMonthly - compoundedTotalMonthly) * 12;

  // Oral Pill scenario
  const oralMonthly = ORAL_BASE_COST;
  const oralHidden = {
    consultation: 0, // Usually covered if insurance covers
    shipping: 0,
    membership: 0,
  };
  const oralTotalMonthly = oralMonthly + oralHidden.consultation + oralHidden.shipping + oralHidden.membership;
  const oralAnnualSavings = (brandTotalMonthly - oralTotalMonthly) * 12;

  return [
    {
      name: 'Brand Name',
      monthlyCost: brandMonthly,
      annualCost: brandMonthly * 12,
      hiddenCosts: brandHidden,
      totalMonthly: brandTotalMonthly,
      totalAnnual: brandTotalMonthly * 12,
      annualSavings: 0,
      easeOfAccess: insuranceProvider === 'none' ? 2 : 4,
      paProbability: paResult.level,
      paProbabilityPercent: paResult.percent,
      features: [
        'FDA Approved',
        'Clinical Gold Standard',
        insuranceProvider !== 'none' ? 'Insurance Coverage' : 'Cash Pay Available',
      ],
      cta: 'Check Pharmacy Stock',
      ctaLink: '/legitimacy/shortage',
    },
    {
      name: 'Compounded',
      monthlyCost: compoundedMonthly,
      annualCost: compoundedMonthly * 12,
      hiddenCosts: compoundedHidden,
      totalMonthly: compoundedTotalMonthly,
      totalAnnual: compoundedTotalMonthly * 12,
      annualSavings: compoundedAnnualSavings,
      easeOfAccess: 5,
      paProbability: 'High', // No PA needed
      paProbabilityPercent: 100,
      features: [
        'PCAB Accredited Labs',
        'No Insurance Required',
        hasHsa || hasFsa ? 'HSA/FSA Eligible' : 'Cash Pay',
        'Free 2-Day Shipping',
      ],
      cta: 'Start Online Visit',
      ctaLink: '/alternatives',
    },
    {
      name: 'Oral Pill',
      monthlyCost: oralMonthly,
      annualCost: oralMonthly * 12,
      hiddenCosts: oralHidden,
      totalMonthly: oralTotalMonthly,
      totalAnnual: oralTotalMonthly * 12,
      annualSavings: oralAnnualSavings,
      easeOfAccess: 4,
      paProbability: paResult.level,
      paProbabilityPercent: paResult.percent,
      features: ['No Needles', 'Travel Friendly', '2026 Launch Pricing', insuranceProvider !== 'none' ? 'May Be Covered' : 'Cash Pay'],
      cta: 'Join Waitlist',
      ctaLink: '/alternatives',
    },
  ];
}

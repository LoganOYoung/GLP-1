/**
 * Calculator data layer - loaded from data/calculator-prices.json
 * Update that JSON monthly; see docs/DATA-UPDATE-PROCESS.md
 */

import raw from '@/data/calculator-prices.json';

export type MedicationKey = keyof typeof raw.medicationBaseCosts;
export type TierKey = keyof typeof raw.insuranceTierCopays;

export const MEDICATION_BASE_COSTS = raw.medicationBaseCosts as {
  wegovy: number;
  ozempic: number;
  mounjaro: number;
  zepbound: number;
  rybelsus: number;
  compounded: number;
  oral: number;
};

export const MANUFACTURER_CARD_SAVINGS = raw.manufacturerCardSavings as {
  wegovy: { maxMonthly: number; maxAnnual: number };
  ozempic: { maxMonthly: number; maxAnnual: number };
  mounjaro: { maxMonthly: number; maxAnnual: number };
  zepbound: { maxMonthly: number; maxAnnual: number };
  rybelsus: { maxMonthly: number; maxAnnual: number };
};

export const INSURANCE_TIER_COPAYS = raw.insuranceTierCopays as {
  tier1: { copay: number; coinsurance: number };
  tier2: { copay: number; coinsurance: number };
  tier3: { copay: number; coinsurance: number };
  tier4: { copay: number; coinsurance: number };
  specialty: { copay: number; coinsurance: number };
};

export const MEDICARE_PART_D_COVERAGE = raw.medicarePartDCoverage as {
  diabetes: number;
  weightLoss: number;
  default: number;
};

export const TAX_BENEFIT_RATE = raw.taxBenefitRate as number;

export const LEGACY_BRAND_BASE_COST = raw.legacy.brandBaseCost;
export const LEGACY_COMPOUNDED_BASE_COST = raw.legacy.compoundedBaseCost;
export const LEGACY_ORAL_BASE_COST = raw.legacy.oralBaseCost;

export const CALCULATOR_DATA_LAST_UPDATED = raw.lastUpdated;

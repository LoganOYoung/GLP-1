/**
 * Advanced 2026 GLP-1 Cost Calculator Engine
 * 
 * Enhanced algorithm combining:
 * - 2026 Insurance policies (Medicare Part D, Commercial, Medicaid)
 * - Multiple subsidy layers (Manufacturer cards, TrumpRx, HSA/FSA tax benefits)
 * - Alternative options (Compounded, Oral, Telehealth platforms)
 * - Hidden costs (consultation, shipping, membership, deductible)
 * - Annual vs monthly cost optimization
 * 
 * Inspired by Levity's comprehensive approach but enhanced with:
 * - Real-time telehealth platform pricing
 * - State-specific TrumpRx eligibility
 * - Tax-advantaged account calculations
 * - Multi-scenario optimization
 */

import type { InsuranceProvider, Comorbidity, CalculatorInput } from './calculator-engine';
import { getStateByCode, type TrumpRxState } from '@/app/trumprx/trumprx-data';
import { TELEHEALTH_PLATFORMS } from '@/app/alternatives/telehealth-prices';
import { DISCOUNT_CARDS } from '@/app/cost-insurance/cost-insurance-data';
import {
  MEDICATION_BASE_COSTS,
  MANUFACTURER_CARD_SAVINGS,
  INSURANCE_TIER_COPAYS,
  MEDICARE_PART_D_COVERAGE,
  TAX_BENEFIT_RATE,
} from '@/lib/calculator-data';

export interface AdvancedScenarioResult {
  id: string;
  name: string;
  category: 'brand' | 'compounded' | 'oral' | 'telehealth';
  medication: string;
  
  // Cost breakdown
  baseCost: number;
  insuranceCoverage: number;
  insuranceDiscount: number;
  manufacturerCardSavings: number;
  trumpRxSavings: number;
  hsaFsaTaxBenefit: number;
  pharmacyDiscountSavings: number;
  
  // Monthly costs
  monthlyCopay: number;
  monthlyCoinsurance: number;
  monthlyHiddenCosts: {
    consultation: number;
    shipping: number;
    membership: number;
  };
  monthlyDeductibleImpact: number; // How much goes toward deductible
  totalMonthlyAfterAllSavings: number;
  
  // Annual costs
  annualDeductiblePaid: number;
  annualTotalCost: number;
  annualSavingsVsBaseline: number;
  effectiveAnnualCost: number; // After HSA/FSA tax benefits
  
  // Eligibility & access
  paRequired: boolean;
  paSuccessProbability: number;
  paSuccessLevel: 'Low' | 'Medium' | 'High';
  easeOfAccess: 1 | 2 | 3 | 4 | 5;
  availability: 'in-stock' | 'limited' | 'waitlist' | 'out-of-stock';
  
  // Features
  features: string[];
  pros: string[];
  cons: string[];
  
  // Recommendations
  recommendationScore: number; // 0-100, higher is better
  recommendationReason: string;
  
  // CTA
  cta: string;
  ctaLink: string;
  
  // Additional info
  telehealthPlatform?: string;
  trumpRxEligible?: boolean;
  hsaFsaEligible: boolean;
}

export interface AdvancedCalculatorResult {
  scenarios: AdvancedScenarioResult[];
  bestOption: AdvancedScenarioResult;
  summary: {
    monthlySavingsPotential: number;
    annualSavingsPotential: number;
    recommendedPath: string;
    keyInsights: string[];
  };
}

/**
 * Calculate insurance coverage and copay/coinsurance
 */
function calculateInsuranceCosts(
  provider: InsuranceProvider,
  planType: string,
  comorbidities: Comorbidity[],
  medication: keyof typeof MEDICATION_BASE_COSTS,
  annualDeductible: number = 0,
  deductibleRemaining: number = 0
): {
  coverage: number;
  copay: number;
  coinsurance: number;
  tier: keyof typeof INSURANCE_TIER_COPAYS;
  deductibleImpact: number;
} {
  const baseCost = MEDICATION_BASE_COSTS[medication];
  let coverage = 0;
  let tier: keyof typeof INSURANCE_TIER_COPAYS = 'specialty';
  let copay = 0;
  let coinsurance = 0;
  
  // Medicare Part D
  if (provider === 'medicare' && planType === 'medicare-part-d') {
    const hasDiabetes = comorbidities.includes('diabetes');
    coverage = hasDiabetes 
      ? MEDICARE_PART_D_COVERAGE.diabetes 
      : MEDICARE_PART_D_COVERAGE.weightLoss;
    tier = 'tier3';
    copay = INSURANCE_TIER_COPAYS.tier3.copay;
    coinsurance = INSURANCE_TIER_COPAYS.tier3.coinsurance;
  }
  // Medicare Advantage
  else if (provider === 'medicare' && planType === 'medicare-advantage') {
    coverage = MEDICARE_PART_D_COVERAGE.default;
    tier = 'tier3';
    copay = INSURANCE_TIER_COPAYS.tier3.copay;
    coinsurance = INSURANCE_TIER_COPAYS.tier3.coinsurance;
  }
  // Commercial insurance
  else if (provider !== 'medicare' && provider !== 'medicaid' && provider !== 'none') {
    const hasDiabetes = comorbidities.includes('diabetes');
    const hasComorbidities = comorbidities.length > 0;
    
    if (hasDiabetes) {
      coverage = 0.80; // 80% coverage for diabetes
      tier = 'tier3';
      copay = INSURANCE_TIER_COPAYS.tier3.copay;
      coinsurance = INSURANCE_TIER_COPAYS.tier3.coinsurance;
    } else if (hasComorbidities) {
      coverage = 0.60; // 60% coverage for weight loss with comorbidities
      tier = 'tier4';
      copay = INSURANCE_TIER_COPAYS.tier4.copay;
      coinsurance = INSURANCE_TIER_COPAYS.tier4.coinsurance;
    } else {
      coverage = 0.30; // 30% coverage for weight loss only
      tier = 'specialty';
      copay = INSURANCE_TIER_COPAYS.specialty.copay;
      coinsurance = INSURANCE_TIER_COPAYS.specialty.coinsurance;
    }
  }
  // Medicaid
  else if (provider === 'medicaid') {
    coverage = 0.90; // 90% coverage typically
    tier = 'tier2';
    copay = INSURANCE_TIER_COPAYS.tier2.copay;
    coinsurance = 0;
  }
  // No insurance
  else {
    coverage = 0;
    tier = 'specialty';
    copay = 0;
    coinsurance = 0;
  }
  
  // Calculate actual costs
  const coveredAmount = baseCost * coverage;
  const patientResponsibility = baseCost - coveredAmount;
  
  // Apply copay vs coinsurance
  let monthlyCopay = copay;
  let monthlyCoinsurance = 0;
  
  if (coinsurance > 0) {
    monthlyCoinsurance = patientResponsibility * coinsurance;
    monthlyCopay = 0; // Coinsurance replaces copay
  }
  
  // Deductible impact
  const totalMonthlyCost = monthlyCopay + monthlyCoinsurance;
  const deductibleImpact = Math.min(totalMonthlyCost, deductibleRemaining);
  
  return {
    coverage,
    copay: monthlyCopay,
    coinsurance: monthlyCoinsurance,
    tier,
    deductibleImpact,
  };
}

/**
 * Calculate manufacturer savings card savings
 */
function calculateManufacturerCardSavings(
  medication: keyof typeof MEDICATION_BASE_COSTS,
  insuranceProvider: InsuranceProvider,
  monthlyCost: number
): number {
  // Manufacturer cards don't work with Medicare/Medicaid
  if (insuranceProvider === 'medicare' || insuranceProvider === 'medicaid') {
    return 0;
  }
  
  // Only for brand medications
  if (!['wegovy', 'ozempic', 'mounjaro', 'zepbound', 'rybelsus'].includes(medication)) {
    return 0;
  }
  
  const card = MANUFACTURER_CARD_SAVINGS[medication as keyof typeof MANUFACTURER_CARD_SAVINGS];
  if (!card) return 0;
  
  // Card typically reduces copay to $25, with max savings
  const targetCopay = 25;
  const currentCopay = monthlyCost;
  const potentialSavings = Math.max(0, currentCopay - targetCopay);
  
  return Math.min(potentialSavings, card.maxMonthly);
}

/**
 * Calculate TrumpRx $350 program savings
 */
function calculateTrumpRxSavings(
  state: string | undefined,
  insuranceProvider: InsuranceProvider,
  monthlyCost: number
): { savings: number; eligible: boolean; stateInfo?: TrumpRxState } {
  // Only for uninsured or underinsured
  if (insuranceProvider !== 'none' && insuranceProvider !== 'other') {
    return { savings: 0, eligible: false };
  }
  
  if (!state) {
    return { savings: 0, eligible: false };
  }
  
  const stateInfo = getStateByCode(state);
  if (!stateInfo || stateInfo.status !== 'active') {
    return { savings: 0, eligible: false, stateInfo };
  }
  
  // TrumpRx caps at $350/month
  if (monthlyCost > stateInfo.monthlyCap) {
    return {
      savings: monthlyCost - stateInfo.monthlyCap,
      eligible: true,
      stateInfo,
    };
  }
  
  return { savings: 0, eligible: true, stateInfo };
}

/**
 * Calculate HSA/FSA tax benefit
 */
function calculateHSAFSATaxBenefit(
  hasHsa: boolean,
  hasFsa: boolean,
  monthlyCost: number
): number {
  if (!hasHsa && !hasFsa) {
    return 0;
  }
  
  // Tax benefit = monthly cost * effective tax rate
  return monthlyCost * TAX_BENEFIT_RATE;
}

/**
 * Calculate PA success probability
 */
function calculatePASuccessProbability(
  comorbidities: Comorbidity[],
  insuranceProvider: InsuranceProvider,
  medication: keyof typeof MEDICATION_BASE_COSTS
): { probability: number; level: 'Low' | 'Medium' | 'High' } {
  // Compounded and oral don't need PA
  if (medication === 'compounded' || medication === 'oral') {
    return { probability: 100, level: 'High' };
  }
  
  if (comorbidities.length === 0) {
    return { probability: 25, level: 'Low' };
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
  
  // Diabetes medications (Ozempic, Mounjaro) have higher PA success
  if (['ozempic', 'mounjaro'].includes(medication)) {
    score += 15;
  }
  
  if (score >= 60) {
    return { probability: Math.min(score + 20, 95), level: 'High' };
  } else if (score >= 35) {
    return { probability: Math.min(score + 15, 75), level: 'Medium' };
  } else {
    return { probability: Math.min(score + 10, 50), level: 'Low' };
  }
}

/**
 * Main advanced calculation engine
 */
export function calculateAdvancedScenarios(
  input: CalculatorInput,
  annualDeductible: number = 0,
  deductibleRemaining: number = 0
): AdvancedCalculatorResult {
  const {
    insuranceProvider = 'none',
    planType = 'none',
    hasHsa = false,
    hasFsa = false,
    comorbidities = [],
    state,
  } = input;
  
  const scenarios: AdvancedScenarioResult[] = [];
  
  // Scenario 1: Brand Wegovy
  const wegovyScenario = calculateBrandScenario(
    'wegovy',
    'Wegovy',
    input,
    annualDeductible,
    deductibleRemaining
  );
  scenarios.push(wegovyScenario);
  
  // Scenario 2: Brand Ozempic (if diabetes)
  if (comorbidities.includes('diabetes')) {
    const ozempicScenario = calculateBrandScenario(
      'ozempic',
      'Ozempic',
      input,
      annualDeductible,
      deductibleRemaining
    );
    scenarios.push(ozempicScenario);
  }
  
  // Scenario 3: Compounded Semaglutide
  const compoundedScenario = calculateCompoundedScenario(input);
  scenarios.push(compoundedScenario);
  
  // Scenario 4: Best Telehealth Platform
  const telehealthScenario = calculateBestTelehealthScenario(input);
  scenarios.push(telehealthScenario);
  
  // Scenario 5: Oral Pill (if available)
  const oralScenario = calculateOralScenario(input);
  scenarios.push(oralScenario);
  
  // Sort by recommendation score
  scenarios.sort((a, b) => b.recommendationScore - a.recommendationScore);
  
  const bestOption = scenarios[0];
  
  // Calculate summary
  const baselineCost = scenarios.find(s => s.category === 'brand')?.totalMonthlyAfterAllSavings || 0;
  const bestCost = bestOption.totalMonthlyAfterAllSavings;
  const monthlySavings = Math.max(0, baselineCost - bestCost);
  const annualSavings = monthlySavings * 12;
  
  const summary = {
    monthlySavingsPotential: monthlySavings,
    annualSavingsPotential: annualSavings,
    recommendedPath: bestOption.name,
    keyInsights: generateKeyInsights(scenarios, input),
  };
  
  return {
    scenarios,
    bestOption,
    summary,
  };
}

/**
 * Calculate brand medication scenario
 */
function calculateBrandScenario(
  medication: 'wegovy' | 'ozempic' | 'mounjaro' | 'zepbound',
  medicationName: string,
  input: CalculatorInput,
  annualDeductible: number,
  deductibleRemaining: number
): AdvancedScenarioResult {
  const baseCost = MEDICATION_BASE_COSTS[medication];
  const insurance = calculateInsuranceCosts(
    input.insuranceProvider!,
    input.planType || 'none',
    input.comorbidities || [],
    medication,
    annualDeductible,
    deductibleRemaining
  );
  
  const monthlyBeforeSavings = insurance.copay + insurance.coinsurance;
  const manufacturerSavings = calculateManufacturerCardSavings(
    medication,
    input.insuranceProvider!,
    monthlyBeforeSavings
  );
  
  const monthlyAfterCard = Math.max(0, monthlyBeforeSavings - manufacturerSavings);
  
  const trumpRx = calculateTrumpRxSavings(
    input.state,
    input.insuranceProvider!,
    monthlyAfterCard
  );
  
  const monthlyAfterTrumpRx = Math.max(0, monthlyAfterCard - trumpRx.savings);
  
  const hsaFsaBenefit = calculateHSAFSATaxBenefit(
    input.hasHsa || false,
    input.hasFsa || false,
    monthlyAfterTrumpRx
  );
  
  const effectiveMonthlyCost = monthlyAfterTrumpRx - hsaFsaBenefit;
  
  const paResult = calculatePASuccessProbability(
    input.comorbidities || [],
    input.insuranceProvider!,
    medication
  );
  
  // Calculate annual costs
  const monthsInDeductible = Math.ceil(deductibleRemaining / monthlyBeforeSavings);
  const annualDeductiblePaid = Math.min(deductibleRemaining, monthlyBeforeSavings * 12);
  const annualTotalCost = (monthlyAfterTrumpRx * 12) - (hsaFsaBenefit * 12);
  
  // Recommendation score
  const score = calculateRecommendationScore({
    monthlyCost: effectiveMonthlyCost,
    paSuccess: paResult.probability,
    easeOfAccess: insurance.coverage > 0 ? 4 : 2,
    availability: 'limited',
    hasInsurance: input.insuranceProvider !== 'none',
  });
  
  return {
    id: `brand-${medication}`,
    name: medicationName,
    category: 'brand',
    medication,
    baseCost,
    insuranceCoverage: insurance.coverage,
    insuranceDiscount: insurance.coverage * baseCost,
    manufacturerCardSavings: manufacturerSavings,
    trumpRxSavings: trumpRx.savings,
    hsaFsaTaxBenefit: hsaFsaBenefit,
    pharmacyDiscountSavings: 0,
    monthlyCopay: insurance.copay,
    monthlyCoinsurance: insurance.coinsurance,
    monthlyHiddenCosts: {
      consultation: 0,
      shipping: 0,
      membership: 0,
    },
    monthlyDeductibleImpact: insurance.deductibleImpact,
    totalMonthlyAfterAllSavings: effectiveMonthlyCost,
    annualDeductiblePaid,
    annualTotalCost,
    annualSavingsVsBaseline: 0,
    effectiveAnnualCost: annualTotalCost,
    paRequired: true,
    paSuccessProbability: paResult.probability,
    paSuccessLevel: paResult.level,
    easeOfAccess: insurance.coverage > 0 ? 4 : 2,
    availability: 'limited',
    features: [
      'FDA Approved',
      'Clinical Gold Standard',
      insurance.coverage > 0 ? 'Insurance Coverage' : 'Cash Pay Available',
      manufacturerSavings > 0 ? 'Manufacturer Savings Card Eligible' : '',
      input.hasHsa || input.hasFsa ? 'HSA/FSA Eligible' : '',
    ].filter(Boolean),
    pros: [
      'FDA approved and clinically proven',
      'Highest efficacy rates',
      insurance.coverage > 0 ? 'May be covered by insurance' : '',
    ].filter(Boolean),
    cons: [
      'Requires prior authorization',
      'Limited availability due to shortages',
      'Higher cost than alternatives',
    ],
    recommendationScore: score,
    recommendationReason: generateRecommendationReason(score, medicationName, input),
    cta: 'Check Pharmacy Stock',
    ctaLink: '/legitimacy/shortage',
    hsaFsaEligible: true,
    trumpRxEligible: trumpRx.eligible,
  };
}

/**
 * Calculate compounded scenario
 */
function calculateCompoundedScenario(input: CalculatorInput): AdvancedScenarioResult {
  const baseCost = MEDICATION_BASE_COSTS.compounded;
  const hiddenCosts = {
    consultation: 49,
    shipping: 0,
    membership: 0,
  };
  
  const monthlyBeforeTax = baseCost + hiddenCosts.consultation;
  const hsaFsaBenefit = calculateHSAFSATaxBenefit(
    input.hasHsa || false,
    input.hasFsa || false,
    monthlyBeforeTax
  );
  
  const effectiveMonthlyCost = monthlyBeforeTax - hsaFsaBenefit;
  
  const paResult = calculatePASuccessProbability(
    input.comorbidities || [],
    input.insuranceProvider!,
    'compounded'
  );
  
  const score = calculateRecommendationScore({
    monthlyCost: effectiveMonthlyCost,
    paSuccess: paResult.probability,
    easeOfAccess: 5,
    availability: 'in-stock',
    hasInsurance: false,
  });
  
  return {
    id: 'compounded-semaglutide',
    name: 'Compounded Semaglutide',
    category: 'compounded',
    medication: 'compounded',
    baseCost,
    insuranceCoverage: 0,
    insuranceDiscount: 0,
    manufacturerCardSavings: 0,
    trumpRxSavings: 0,
    hsaFsaTaxBenefit: hsaFsaBenefit,
    pharmacyDiscountSavings: 0,
    monthlyCopay: 0,
    monthlyCoinsurance: 0,
    monthlyHiddenCosts: hiddenCosts,
    monthlyDeductibleImpact: 0,
    totalMonthlyAfterAllSavings: effectiveMonthlyCost,
    annualDeductiblePaid: 0,
    annualTotalCost: monthlyBeforeTax * 12,
    annualSavingsVsBaseline: 0, // Will be calculated later
    effectiveAnnualCost: effectiveMonthlyCost * 12,
    paRequired: false,
    paSuccessProbability: 100,
    paSuccessLevel: 'High',
    easeOfAccess: 5,
    availability: 'in-stock',
    features: [
      'No Prior Authorization',
      'PCAB Accredited Labs',
      'HSA/FSA Eligible',
      'Free Shipping',
      'Available Now',
    ],
    pros: [
      'No insurance required',
      'No prior authorization needed',
      'Available immediately',
      'Lower cost than brand',
      input.hasHsa || input.hasFsa ? 'Tax-advantaged with HSA/FSA' : '',
    ].filter(Boolean),
    cons: [
      'Not FDA-approved (but legal under FDA shortage guidelines)',
      'Requires telehealth consultation',
    ],
    recommendationScore: score,
    recommendationReason: generateRecommendationReason(score, 'Compounded Semaglutide', input),
    cta: 'Start Online Visit',
    ctaLink: '/alternatives',
    hsaFsaEligible: true,
  };
}

/**
 * Calculate best telehealth platform scenario
 */
function calculateBestTelehealthScenario(input: CalculatorInput): AdvancedScenarioResult {
  // Find best telehealth platform for user's state
  const availablePlatforms = TELEHEALTH_PLATFORMS.filter(platform => {
    if (platform.serviceArea === 'all-states') return true;
    if (!input.state) return true;
    return platform.serviceArea.includes(input.state);
  });
  
  const bestPlatform = availablePlatforms
    .filter(p => p.type === 'compounded')
    .sort((a, b) => a.totalMonthly - b.totalMonthly)[0];
  
  if (!bestPlatform) {
    // Fallback to compounded scenario
    return calculateCompoundedScenario(input);
  }
  
  const monthlyBeforeTax = bestPlatform.totalMonthly;
  const hsaFsaBenefit = calculateHSAFSATaxBenefit(
    input.hasHsa || false,
    input.hasFsa || false,
    monthlyBeforeTax
  );
  
  const effectiveMonthlyCost = monthlyBeforeTax - hsaFsaBenefit;
  
  const score = calculateRecommendationScore({
    monthlyCost: effectiveMonthlyCost,
    paSuccess: 100,
    easeOfAccess: 5,
    availability: bestPlatform.availability,
    hasInsurance: false,
  });
  
  return {
    id: `telehealth-${bestPlatform.id}`,
    name: `${bestPlatform.name} (Compounded)`,
    category: 'telehealth',
    medication: 'compounded',
    baseCost: bestPlatform.basePrice,
    insuranceCoverage: 0,
    insuranceDiscount: 0,
    manufacturerCardSavings: 0,
    trumpRxSavings: 0,
    hsaFsaTaxBenefit: hsaFsaBenefit,
    pharmacyDiscountSavings: 0,
    monthlyCopay: 0,
    monthlyCoinsurance: 0,
    monthlyHiddenCosts: {
      consultation: bestPlatform.consultationFee,
      shipping: bestPlatform.shipping,
      membership: bestPlatform.membershipFee,
    },
    monthlyDeductibleImpact: 0,
    totalMonthlyAfterAllSavings: effectiveMonthlyCost,
    annualDeductiblePaid: 0,
    annualTotalCost: monthlyBeforeTax * 12,
    annualSavingsVsBaseline: 0,
    effectiveAnnualCost: effectiveMonthlyCost * 12,
    paRequired: false,
    paSuccessProbability: 100,
    paSuccessLevel: 'High',
    easeOfAccess: 5,
    availability: bestPlatform.availability,
    features: [
      'LegitScript Certified',
      bestPlatform.fdaRegistered ? 'FDA Registered Lab' : '',
      'No Prior Authorization',
      bestPlatform.hsaFsaEligible ? 'HSA/FSA Eligible' : '',
      `Rating: ${bestPlatform.rating}/5`,
    ].filter(Boolean),
    pros: [
      `Lowest cost: $${bestPlatform.totalMonthly}/month`,
      'No insurance required',
      'Convenient telehealth platform',
      bestPlatform.hsaFsaEligible ? 'Tax-advantaged' : '',
    ].filter(Boolean),
    cons: [
      'Requires telehealth consultation',
      'Not FDA-approved (but legal)',
    ],
    recommendationScore: score,
    recommendationReason: `Best value option via ${bestPlatform.name} platform`,
    cta: 'Visit Platform',
    ctaLink: bestPlatform.affiliateUrl,
    telehealthPlatform: bestPlatform.name,
    hsaFsaEligible: bestPlatform.hsaFsaEligible,
  };
}

/**
 * Calculate oral pill scenario
 */
function calculateOralScenario(input: CalculatorInput): AdvancedScenarioResult {
  const baseCost = MEDICATION_BASE_COSTS.oral;
  const insurance = calculateInsuranceCosts(
    input.insuranceProvider!,
    input.planType || 'none',
    input.comorbidities || [],
    'oral',
    0,
    0
  );
  
  const monthlyBeforeSavings = insurance.copay + insurance.coinsurance || baseCost;
  const hsaFsaBenefit = calculateHSAFSATaxBenefit(
    input.hasHsa || false,
    input.hasFsa || false,
    monthlyBeforeSavings
  );
  
  const effectiveMonthlyCost = monthlyBeforeSavings - hsaFsaBenefit;
  
  const paResult = calculatePASuccessProbability(
    input.comorbidities || [],
    input.insuranceProvider!,
    'oral'
  );
  
  const score = calculateRecommendationScore({
    monthlyCost: effectiveMonthlyCost,
    paSuccess: paResult.probability,
    easeOfAccess: 4,
    availability: 'waitlist',
    hasInsurance: input.insuranceProvider !== 'none',
  });
  
  return {
    id: 'oral-glp1',
    name: 'Oral GLP-1 Pill',
    category: 'oral',
    medication: 'oral',
    baseCost,
    insuranceCoverage: insurance.coverage,
    insuranceDiscount: insurance.coverage * baseCost,
    manufacturerCardSavings: 0,
    trumpRxSavings: 0,
    hsaFsaTaxBenefit: hsaFsaBenefit,
    pharmacyDiscountSavings: 0,
    monthlyCopay: insurance.copay,
    monthlyCoinsurance: insurance.coinsurance,
    monthlyHiddenCosts: {
      consultation: 0,
      shipping: 0,
      membership: 0,
    },
    monthlyDeductibleImpact: 0,
    totalMonthlyAfterAllSavings: effectiveMonthlyCost,
    annualDeductiblePaid: 0,
    annualTotalCost: monthlyBeforeSavings * 12,
    annualSavingsVsBaseline: 0,
    effectiveAnnualCost: effectiveMonthlyCost * 12,
    paRequired: insurance.coverage > 0,
    paSuccessProbability: paResult.probability,
    paSuccessLevel: paResult.level,
    easeOfAccess: 4,
    availability: 'waitlist',
    features: [
      'No Needles',
      'Travel Friendly',
      '2026 Launch',
      insurance.coverage > 0 ? 'May Be Covered' : 'Cash Pay',
    ],
    pros: [
      'Convenient oral administration',
      'No injection required',
      insurance.coverage > 0 ? 'May be covered by insurance' : '',
    ].filter(Boolean),
    cons: [
      'Limited availability (waitlist)',
      'Newer option, less long-term data',
      'May require prior authorization',
    ],
    recommendationScore: score,
    recommendationReason: 'Convenient oral option, but availability limited',
    cta: 'Join Waitlist',
    ctaLink: '/alternatives',
    hsaFsaEligible: true,
  };
}

/**
 * Calculate recommendation score (0-100)
 */
function calculateRecommendationScore(params: {
  monthlyCost: number;
  paSuccess: number;
  easeOfAccess: number;
  availability: string;
  hasInsurance: boolean;
}): number {
  let score = 100;
  
  // Cost factor (lower is better, max 40 points)
  if (params.monthlyCost < 300) score += 0;
  else if (params.monthlyCost < 500) score -= 10;
  else if (params.monthlyCost < 800) score -= 20;
  else score -= 30;
  
  // PA success factor (higher is better, max 30 points)
  score -= (100 - params.paSuccess) * 0.3;
  
  // Ease of access factor (higher is better, max 20 points)
  score -= (5 - params.easeOfAccess) * 4;
  
  // Availability factor (max 10 points)
  if (params.availability === 'in-stock') score += 0;
  else if (params.availability === 'limited') score -= 5;
  else if (params.availability === 'waitlist') score -= 8;
  else score -= 10;
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Generate recommendation reason
 */
function generateRecommendationReason(
  score: number,
  medicationName: string,
  input: CalculatorInput
): string {
  if (score >= 80) {
    return `Best overall value: ${medicationName} offers the best combination of cost, access, and effectiveness for your profile.`;
  } else if (score >= 60) {
    return `Good option: ${medicationName} is a solid choice, though there may be better alternatives.`;
  } else {
    return `Consider alternatives: ${medicationName} may not be the best fit due to cost or access limitations.`;
  }
}

/**
 * Generate key insights
 */
function generateKeyInsights(
  scenarios: AdvancedScenarioResult[],
  input: CalculatorInput
): string[] {
  const insights: string[] = [];
  
  const brandScenario = scenarios.find(s => s.category === 'brand');
  const compoundedScenario = scenarios.find(s => s.category === 'compounded');
  
  if (brandScenario && compoundedScenario) {
    const savings = brandScenario.totalMonthlyAfterAllSavings - compoundedScenario.totalMonthlyAfterAllSavings;
    if (savings > 200) {
      insights.push(`You could save $${Math.round(savings)}/month by choosing compounded over brand.`);
    }
  }
  
  if (input.hasHsa || input.hasFsa) {
    insights.push(`Using HSA/FSA can save you ~25% through tax benefits.`);
  }
  
  const trumpRxScenario = scenarios.find(s => s.trumpRxEligible);
  if (trumpRxScenario) {
    insights.push(`TrumpRx $350 program may be available in your state - check eligibility.`);
  }
  
  const lowPAScenario = scenarios.find(s => s.paSuccessProbability < 50);
  if (lowPAScenario && input.insuranceProvider !== 'none') {
    insights.push(`Your PA success probability is ${lowPAScenario.paSuccessProbability}% - consider alternatives or appeal strategies.`);
  }
  
  return insights;
}

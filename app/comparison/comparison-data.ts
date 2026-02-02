/**
 * Comparison page: drug/option rows for efficacy, cost, and side-effect views.
 * Data aligned with 2025–2026 clinical and market context.
 */

export interface ComparisonRow {
  id: string;
  activeIngredient: string;
  brandNames: string;
  cost2026: string;
  costSort: number; // monthly $ for sorting
  fdaStatus: string;
  dosageForm: 'Pen' | 'Vial' | 'Pill';
  weightLoss1yr: string;
  weightLossSort: number; // % for sorting
  nauseaPct: string;
  fatiguePct: string;
  muscleLossNote: string;
  slug?: string; // link to /drugs/[slug]
  path?: 'brand' | 'compounded' | 'oral';
}

/** NEJM / clinical-style weight loss (1 yr); cost 2026 US; side-effect ranges from labels/real-world. */
export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: 'wegovy',
    activeIngredient: 'Semaglutide',
    brandNames: 'Wegovy',
    cost2026: '$900–$1,400/mo',
    costSort: 1150,
    fdaStatus: 'FDA-approved (weight)',
    dosageForm: 'Pen',
    weightLoss1yr: '~15%',
    weightLossSort: 15,
    nauseaPct: '44%',
    fatiguePct: '11%',
    muscleLossNote: 'Low–moderate (with protein + exercise)',
    slug: 'wegovy',
    path: 'brand',
  },
  {
    id: 'zepbound',
    activeIngredient: 'Tirzepatide',
    brandNames: 'Zepbound',
    cost2026: '$1,000–$1,200/mo',
    costSort: 1100,
    fdaStatus: 'FDA-approved (weight)',
    dosageForm: 'Pen',
    weightLoss1yr: '~18–22%',
    weightLossSort: 20,
    nauseaPct: '33%',
    fatiguePct: '~8%',
    muscleLossNote: 'Low–moderate (with protein + exercise)',
    slug: 'zepbound',
    path: 'brand',
  },
  {
    id: 'ozempic',
    activeIngredient: 'Semaglutide',
    brandNames: 'Ozempic',
    cost2026: '$800–$1,200/mo',
    costSort: 1000,
    fdaStatus: 'FDA-approved (diabetes)',
    dosageForm: 'Pen',
    weightLoss1yr: '~10–15%',
    weightLossSort: 12.5,
    nauseaPct: '20%',
    fatiguePct: '5%',
    muscleLossNote: 'Low',
    slug: 'ozempic',
    path: 'brand',
  },
  {
    id: 'mounjaro',
    activeIngredient: 'Tirzepatide',
    brandNames: 'Mounjaro',
    cost2026: '$900–$1,200/mo',
    costSort: 1050,
    fdaStatus: 'FDA-approved (diabetes)',
    dosageForm: 'Pen',
    weightLoss1yr: '~15–22%',
    weightLossSort: 18.5,
    nauseaPct: '17%',
    fatiguePct: '~5%',
    muscleLossNote: 'Low–moderate',
    slug: 'mounjaro',
    path: 'brand',
  },
  {
    id: 'compounded-semaglutide',
    activeIngredient: 'Semaglutide (compounded)',
    brandNames: 'Compounded',
    cost2026: '$150–$350/mo',
    costSort: 250,
    fdaStatus: '503A/503B (legal during shortage)',
    dosageForm: 'Vial',
    weightLoss1yr: '~12–16%',
    weightLossSort: 14,
    nauseaPct: '~30–40%',
    fatiguePct: '~10%',
    muscleLossNote: 'Similar to brand; verify source',
    path: 'compounded',
  },
  {
    id: 'compounded-tirzepatide',
    activeIngredient: 'Tirzepatide (compounded)',
    brandNames: 'Compounded',
    cost2026: '$299–$499/mo',
    costSort: 399,
    fdaStatus: '503A/503B (legal during shortage)',
    dosageForm: 'Vial',
    weightLoss1yr: '~16–20%',
    weightLossSort: 18,
    nauseaPct: '~25–35%',
    fatiguePct: '~8%',
    muscleLossNote: 'Similar to brand; verify source',
    path: 'compounded',
  },
  {
    id: 'rybelsus',
    activeIngredient: 'Semaglutide (oral)',
    brandNames: 'Rybelsus',
    cost2026: '$300–$1,000+/mo',
    costSort: 650,
    fdaStatus: 'FDA-approved (diabetes)',
    dosageForm: 'Pill',
    weightLoss1yr: '~5–8%',
    weightLossSort: 6.5,
    nauseaPct: '~15–20%',
    fatiguePct: '~5%',
    muscleLossNote: 'Low',
    path: 'oral',
  },
];

/** APA-style sources for trust / YMYL. */
export const COMPARISON_SOURCES = [
  {
    id: '1',
    text: 'Wilding, J. P. H., et al. (2021). Once-weekly semaglutide in adults with overweight or obesity. New England Journal of Medicine, 384(11), 989–1002.',
  },
  {
    id: '2',
    text: 'Jastreboff, A. M., et al. (2022). Tirzepatide once weekly for the treatment of obesity. New England Journal of Medicine, 387(3), 205–216.',
  },
  {
    id: '3',
    text: 'FDA. (2024). Drug shortage and compounding. U.S. Food and Drug Administration. https://www.fda.gov/drugs/drug-safety-and-availability/drug-shortages',
  },
  {
    id: '4',
    text: 'Clinical and patient-reported outcomes (2025–2026). Aggregated from prescribing information and real-world evidence; verify with your prescriber.',
  },
];

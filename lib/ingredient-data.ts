/**
 * Ingredient Deep Analysis Data
 * Detailed composition breakdown for GLP-1 medications
 */

export interface IngredientDetail {
  name: string;
  percentage?: number;
  concentration?: string; // e.g., "5mg/ml"
  purpose: string;
  safety: 'safe' | 'caution' | 'unknown';
  notes?: string;
}

export interface FormulationAnalysis {
  id: string;
  name: string;
  type: 'brand' | 'compounded' | 'oral';
  activeIngredient: {
    name: string;
    concentration: string;
    purity: string;
  };
  inactiveIngredients: IngredientDetail[];
  additives?: IngredientDetail[];
  preservatives?: IngredientDetail[];
  buffer?: IngredientDetail[];
  ph?: string;
  osmolarity?: string;
  notes?: string;
}

export const FORMULATION_ANALYSES: FormulationAnalysis[] = [
  {
    id: 'wegovy-brand',
    name: 'Wegovy (Brand)',
    type: 'brand',
    activeIngredient: {
      name: 'Semaglutide',
      concentration: '2.4mg/0.75ml',
      purity: '>99%',
    },
    inactiveIngredients: [
      { name: 'Disodium phosphate dihydrate', percentage: 0.1, purpose: 'Buffer', safety: 'safe' },
      { name: 'Propylene glycol', percentage: 1.4, purpose: 'Solvent', safety: 'safe' },
      { name: 'Phenol', percentage: 0.05, purpose: 'Preservative', safety: 'caution', notes: 'May cause allergic reactions in sensitive individuals' },
      { name: 'Water for injection', percentage: 98.45, purpose: 'Solvent', safety: 'safe' },
    ],
    preservatives: [
      { name: 'Phenol', percentage: 0.05, purpose: 'Preservative', safety: 'caution' },
    ],
    buffer: [
      { name: 'Disodium phosphate dihydrate', percentage: 0.1, purpose: 'Buffer', safety: 'safe' },
    ],
    ph: '7.2-7.8',
    osmolarity: '~290 mOsm/L',
    notes: 'FDA-approved formulation. Contains phenol as preservative.',
  },
  {
    id: 'ozempic-brand',
    name: 'Ozempic (Brand)',
    type: 'brand',
    activeIngredient: {
      name: 'Semaglutide',
      concentration: '0.25mg, 0.5mg, 1mg, or 2mg per dose',
      purity: '>99%',
    },
    inactiveIngredients: [
      { name: 'Disodium phosphate dihydrate', percentage: 0.1, purpose: 'Buffer', safety: 'safe' },
      { name: 'Propylene glycol', percentage: 1.4, purpose: 'Solvent', safety: 'safe' },
      { name: 'Phenol', percentage: 0.05, purpose: 'Preservative', safety: 'caution' },
      { name: 'Water for injection', percentage: 98.45, purpose: 'Solvent', safety: 'safe' },
    ],
    preservatives: [
      { name: 'Phenol', percentage: 0.05, purpose: 'Preservative', safety: 'caution' },
    ],
    ph: '7.2-7.8',
    notes: 'Same formulation as Wegovy, different dosing.',
  },
  {
    id: 'compounded-semaglutide-pure',
    name: 'Compounded Semaglutide (Pure)',
    type: 'compounded',
    activeIngredient: {
      name: 'Semaglutide',
      concentration: 'Varies (typically 2.5mg/ml or 5mg/ml)',
      purity: '>95% (varies by lab)',
    },
    inactiveIngredients: [
      { name: 'Bacteriostatic water', percentage: 95, purpose: 'Solvent', safety: 'safe' },
      { name: 'Sodium chloride', percentage: 0.9, purpose: 'Isotonic agent', safety: 'safe' },
      { name: 'Benzyl alcohol', percentage: 0.9, purpose: 'Preservative', safety: 'caution', notes: 'May cause irritation in some patients' },
    ],
    preservatives: [
      { name: 'Benzyl alcohol', percentage: 0.9, purpose: 'Preservative', safety: 'caution' },
    ],
    ph: '6.5-7.5',
    notes: 'Compounded formulations vary by pharmacy. Check with your compounding pharmacy for exact ingredients.',
  },
  {
    id: 'compounded-semaglutide-b12',
    name: 'Compounded Semaglutide + B12',
    type: 'compounded',
    activeIngredient: {
      name: 'Semaglutide',
      concentration: 'Varies (typically 2.5mg/ml or 5mg/ml)',
      purity: '>95%',
    },
    additives: [
      { name: 'Cyanocobalamin (B12)', concentration: '1mg/ml', purpose: 'Energy support, may reduce fatigue', safety: 'safe', notes: 'Some users report lower fatigue with B12 addition' },
    ],
    inactiveIngredients: [
      { name: 'Bacteriostatic water', percentage: 94, purpose: 'Solvent', safety: 'safe' },
      { name: 'Sodium chloride', percentage: 0.9, purpose: 'Isotonic agent', safety: 'safe' },
      { name: 'Benzyl alcohol', percentage: 0.9, purpose: 'Preservative', safety: 'caution' },
    ],
    preservatives: [
      { name: 'Benzyl alcohol', percentage: 0.9, purpose: 'Preservative', safety: 'caution' },
    ],
    ph: '6.5-7.5',
    notes: 'B12 addition is common in compounded formulations. May help with energy levels but not proven to reduce nausea.',
  },
  {
    id: 'mounjaro-brand',
    name: 'Mounjaro (Brand)',
    type: 'brand',
    activeIngredient: {
      name: 'Tirzepatide',
      concentration: '2.5mg, 5mg, 7.5mg, 10mg, 12.5mg, or 15mg per dose',
      purity: '>99%',
    },
    inactiveIngredients: [
      { name: 'Sodium chloride', percentage: 0.9, purpose: 'Isotonic agent', safety: 'safe' },
      { name: 'Sodium phosphate dibasic heptahydrate', percentage: 0.1, purpose: 'Buffer', safety: 'safe' },
      { name: 'Water for injection', percentage: 99, purpose: 'Solvent', safety: 'safe' },
    ],
    buffer: [
      { name: 'Sodium phosphate dibasic heptahydrate', percentage: 0.1, purpose: 'Buffer', safety: 'safe' },
    ],
    ph: '7.0-7.5',
    notes: 'No preservatives. Single-use pen.',
  },
  {
    id: 'zepbound-brand',
    name: 'Zepbound (Brand)',
    type: 'brand',
    activeIngredient: {
      name: 'Tirzepatide',
      concentration: '2.5mg, 5mg, 7.5mg, 10mg, 12.5mg, or 15mg per dose',
      purity: '>99%',
    },
    inactiveIngredients: [
      { name: 'Sodium chloride', percentage: 0.9, purpose: 'Isotonic agent', safety: 'safe' },
      { name: 'Sodium phosphate dibasic heptahydrate', percentage: 0.1, purpose: 'Buffer', safety: 'safe' },
      { name: 'Water for injection', percentage: 99, purpose: 'Solvent', safety: 'safe' },
    ],
    ph: '7.0-7.5',
    notes: 'Same formulation as Mounjaro, approved for weight loss.',
  },
  {
    id: 'rybelsus-brand',
    name: 'Rybelsus (Brand - Oral)',
    type: 'oral',
    activeIngredient: {
      name: 'Semaglutide',
      concentration: '3mg, 7mg, or 14mg per tablet',
      purity: '>99%',
    },
    inactiveIngredients: [
      { name: 'Mannitol', percentage: 60, purpose: 'Filler', safety: 'safe' },
      { name: 'Microcrystalline cellulose', percentage: 25, purpose: 'Binder', safety: 'safe' },
      { name: 'Hydroxypropyl cellulose', percentage: 5, purpose: 'Binder', safety: 'safe' },
      { name: 'Magnesium stearate', percentage: 1, purpose: 'Lubricant', safety: 'safe' },
      { name: 'Talc', percentage: 0.5, purpose: 'Glidant', safety: 'safe' },
      { name: 'Salcaprozate sodium (SNAC)', percentage: 8.5, purpose: 'Absorption enhancer', safety: 'safe', notes: 'Enables oral absorption of semaglutide' },
    ],
    ph: 'N/A (solid tablet)',
    notes: 'Oral formulation uses SNAC technology for absorption. No preservatives needed.',
  },
];

/**
 * Get formulation analysis by ID
 */
export function getFormulationById(id: string): FormulationAnalysis | undefined {
  return FORMULATION_ANALYSES.find((f) => f.id === id);
}

/**
 * Get formulations by type
 */
export function getFormulationsByType(type: 'brand' | 'compounded' | 'oral'): FormulationAnalysis[] {
  return FORMULATION_ANALYSES.filter((f) => f.type === type);
}

/**
 * Compare two formulations
 */
export function compareFormulations(id1: string, id2: string): {
  formulation1: FormulationAnalysis;
  formulation2: FormulationAnalysis;
  differences: {
    activeIngredient: boolean;
    preservatives: boolean;
    additives: boolean;
    ph: boolean;
  };
} {
  const f1 = getFormulationById(id1);
  const f2 = getFormulationById(id2);
  
  if (!f1 || !f2) {
    throw new Error('Formulation not found');
  }
  
  return {
    formulation1: f1,
    formulation2: f2,
    differences: {
      activeIngredient: f1.activeIngredient.name !== f2.activeIngredient.name,
      preservatives: JSON.stringify(f1.preservatives) !== JSON.stringify(f2.preservatives),
      additives: JSON.stringify(f1.additives) !== JSON.stringify(f2.additives),
      ph: f1.ph !== f2.ph,
    },
  };
}

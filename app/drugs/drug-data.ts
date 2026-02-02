/**
 * GLP-1 Drug Information Data
 * 
 * Comprehensive data for each major GLP-1 medication.
 * Used for SEO-optimized drug information pages.
 */

export interface DrugInfo {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  type: 'injection' | 'oral';
  activeIngredient: string;
  manufacturer: string;
  fdaApproved: string; // Date
  indication: string; // Primary use
  dosage: {
    starting: string;
    maintenance: string;
    max: string;
    frequency: string;
  };
  sideEffects: {
    common: string[];
    serious: string[];
    frequency: string; // e.g., "Common (≥10%)"
  };
  contraindications: string[];
  priceRange: {
    brand: string; // e.g., "$650-$1,050"
    compounded?: string; // e.g., "$199-$399"
    withInsurance: string; // e.g., "$0-$350"
  };
  availability: 'in-stock' | 'limited' | 'severe-shortage';
  shortageReason?: string;
  insuranceCoverage: {
    medicare: boolean;
    medicaid: boolean;
    commercial: string; // e.g., "Varies by plan"
    paRequired: boolean;
  };
  hsaFsaEligible: boolean;
  alternatives: string[]; // Other drug IDs
  seoKeywords: string[];
  description: string;
  howItWorks: string;
  effectiveness: string; // Weight loss data
  drugInteractions?: string[]; // Other medications that may interact
  warnings?: string[]; // Important warnings
  storage?: string; // Storage instructions
  administration?: string; // How to administer
  monitoring?: string; // What to monitor while taking
}

export const DRUGS: Record<string, DrugInfo> = {
  wegovy: {
    id: 'wegovy',
    name: 'Wegovy',
    genericName: 'Semaglutide',
    brandNames: ['Wegovy'],
    type: 'injection',
    activeIngredient: 'Semaglutide 2.4 mg',
    manufacturer: 'Novo Nordisk',
    fdaApproved: '2021-06-04',
    indication: 'Chronic weight management in adults with obesity or overweight',
    dosage: {
      starting: '0.25 mg once weekly',
      maintenance: '2.4 mg once weekly',
      max: '2.4 mg once weekly',
      frequency: 'Weekly injection',
    },
    sideEffects: {
      common: [
        'Nausea (44%)',
        'Diarrhea (30%)',
        'Vomiting (24%)',
        'Constipation (24%)',
        'Abdominal pain (20%)',
        'Headache (14%)',
        'Fatigue (11%)',
        'Dizziness (10%)',
      ],
      serious: [
        'Pancreatitis',
        'Gallbladder problems',
        'Kidney problems',
        'Severe allergic reactions',
        'Diabetic retinopathy complications',
      ],
      frequency: 'Common (≥10%)',
    },
    contraindications: [
      'Personal or family history of medullary thyroid carcinoma (MTC)',
      'Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)',
      'Severe gastrointestinal disease',
      'Pregnancy',
    ],
    priceRange: {
      brand: '$650-$1,050/month',
      compounded: '$199-$399/month',
      withInsurance: '$0-$350/month',
    },
    availability: 'limited',
    shortageReason: 'High demand exceeding supply capacity',
    insuranceCoverage: {
      medicare: false, // Not covered by Medicare Part D for weight loss
      medicaid: false, // Varies by state
      commercial: 'Varies by plan (often requires PA)',
      paRequired: true,
    },
    hsaFsaEligible: false, // Brand name typically not eligible
    alternatives: ['ozempic', 'mounjaro', 'compounded-semaglutide'],
    seoKeywords: [
      'Wegovy',
      'Wegovy side effects',
      'Wegovy dosage',
      'Wegovy cost',
      'Wegovy price',
      'Wegovy shortage',
      'Wegovy alternatives',
      'semaglutide weight loss',
      'Wegovy vs Ozempic',
    ],
    description:
      'Wegovy (semaglutide) is an FDA-approved weekly injection for chronic weight management. It works by mimicking a hormone that regulates appetite and blood sugar, leading to significant weight loss in clinical trials.',
    howItWorks:
      'Wegovy mimics GLP-1, a hormone that slows digestion, reduces appetite, and signals fullness to the brain. It also helps regulate blood sugar by increasing insulin production.',
    effectiveness:
      'In clinical trials, participants lost an average of 15% of body weight over 68 weeks when combined with diet and exercise. About 86% of participants lost at least 5% of body weight.',
    drugInteractions: [
      'Insulin: May increase risk of hypoglycemia. Monitor blood sugar closely.',
      'Sulfonylureas: May increase risk of hypoglycemia. Dose reduction may be needed.',
      'Warfarin: Monitor INR more frequently.',
      'Oral contraceptives: May reduce effectiveness. Use additional contraception.',
    ],
    warnings: [
      'Do not use if you have a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).',
      'Stop taking Wegovy and seek immediate medical attention if you experience severe abdominal pain, especially if it radiates to your back.',
      'Inform your doctor if you have a history of pancreatitis, gallbladder disease, or kidney problems.',
      'Pregnant women should not use Wegovy. Use effective contraception while taking this medication.',
    ],
    storage: 'Store Wegovy pens in the refrigerator (36°F to 46°F) before first use. After first use, store at room temperature (up to 86°F) or in the refrigerator. Do not freeze. Discard after 56 days.',
    administration:
      'Inject Wegovy subcutaneously (under the skin) in your stomach, thigh, or upper arm. Rotate injection sites. Use a new needle for each injection. The pen is single-use and should be discarded after use.',
    monitoring:
      'Monitor for signs of pancreatitis (severe abdominal pain), gallbladder problems (pain in upper right abdomen), kidney problems (decreased urination), and allergic reactions. Regular check-ups with your doctor are recommended.',
  },
  ozempic: {
    id: 'ozempic',
    name: 'Ozempic',
    genericName: 'Semaglutide',
    brandNames: ['Ozempic'],
    type: 'injection',
    activeIngredient: 'Semaglutide',
    manufacturer: 'Novo Nordisk',
    fdaApproved: '2017-12-05',
    indication: 'Type 2 diabetes management (off-label for weight loss)',
    dosage: {
      starting: '0.25 mg once weekly',
      maintenance: '0.5-1.0 mg once weekly',
      max: '2.0 mg once weekly',
      frequency: 'Weekly injection',
    },
    sideEffects: {
      common: [
        'Nausea (20%)',
        'Vomiting (9%)',
        'Diarrhea (9%)',
        'Abdominal pain (7%)',
        'Constipation (5%)',
        'Fatigue (5%)',
      ],
      serious: [
        'Pancreatitis',
        'Gallbladder problems',
        'Kidney problems',
        'Severe allergic reactions',
        'Diabetic retinopathy complications',
      ],
      frequency: 'Common (≥5%)',
    },
    contraindications: [
      'Personal or family history of medullary thyroid carcinoma (MTC)',
      'Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)',
      'Severe gastrointestinal disease',
      'Type 1 diabetes',
    ],
    priceRange: {
      brand: '$800-$1,200/month',
      compounded: '$199-$399/month',
      withInsurance: '$0-$350/month',
    },
    availability: 'limited',
    shortageReason: 'High demand for off-label weight loss use',
    insuranceCoverage: {
      medicare: true, // Covered for diabetes
      medicaid: true, // Covered for diabetes
      commercial: 'Usually covered for Type 2 diabetes',
      paRequired: true,
    },
    hsaFsaEligible: false,
    alternatives: ['wegovy', 'mounjaro', 'compounded-semaglutide'],
    seoKeywords: [
      'Ozempic',
      'Ozempic side effects',
      'Ozempic dosage',
      'Ozempic cost',
      'Ozempic price',
      'Ozempic shortage',
      'Ozempic for weight loss',
      'Ozempic vs Wegovy',
      'semaglutide',
    ],
    description:
      'Ozempic (semaglutide) is FDA-approved for Type 2 diabetes management but is widely used off-label for weight loss. It works similarly to Wegovy but at lower doses.',
    howItWorks:
      'Ozempic mimics GLP-1, reducing appetite, slowing digestion, and improving blood sugar control. It increases insulin production and decreases glucagon secretion.',
    effectiveness:
      'For diabetes: Reduces A1C by 1.5-2.0%. For weight loss (off-label): Users typically lose 10-15% of body weight over 6-12 months.',
    drugInteractions: [
      'Insulin: May increase risk of hypoglycemia. Monitor blood sugar closely.',
      'Sulfonylureas: May increase risk of hypoglycemia. Dose reduction may be needed.',
      'Warfarin: Monitor INR more frequently.',
      'Oral contraceptives: May reduce effectiveness. Use additional contraception.',
    ],
    warnings: [
      'Do not use if you have a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).',
      'Stop taking Ozempic and seek immediate medical attention if you experience severe abdominal pain.',
      'Inform your doctor if you have a history of pancreatitis, gallbladder disease, or kidney problems.',
      'Pregnant women should not use Ozempic. Use effective contraception while taking this medication.',
    ],
    storage: 'Store Ozempic pens in the refrigerator (36°F to 46°F) before first use. After first use, store at room temperature (up to 86°F) or in the refrigerator. Do not freeze. Discard after 56 days.',
    administration:
      'Inject Ozempic subcutaneously (under the skin) in your stomach, thigh, or upper arm. Rotate injection sites. Use a new needle for each injection.',
    monitoring:
      'Monitor blood sugar levels regularly, especially if taking insulin or other diabetes medications. Watch for signs of pancreatitis, gallbladder problems, and allergic reactions.',
  },
  mounjaro: {
    id: 'mounjaro',
    name: 'Mounjaro',
    genericName: 'Tirzepatide',
    brandNames: ['Mounjaro'],
    type: 'injection',
    activeIngredient: 'Tirzepatide',
    manufacturer: 'Eli Lilly',
    fdaApproved: '2022-05-13',
    indication: 'Type 2 diabetes management (Zepbound approved for weight loss in 2023)',
    dosage: {
      starting: '2.5 mg once weekly',
      maintenance: '5-15 mg once weekly',
      max: '15 mg once weekly',
      frequency: 'Weekly injection',
    },
    sideEffects: {
      common: [
        'Nausea (17%)',
        'Diarrhea (13%)',
        'Vomiting (10%)',
        'Constipation (10%)',
        'Abdominal pain (7%)',
        'Decreased appetite (6%)',
      ],
      serious: [
        'Pancreatitis',
        'Gallbladder problems',
        'Severe gastrointestinal disease',
        'Severe allergic reactions',
        'Diabetic retinopathy complications',
      ],
      frequency: 'Common (≥5%)',
    },
    contraindications: [
      'Personal or family history of medullary thyroid carcinoma (MTC)',
      'Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)',
      'Severe gastrointestinal disease',
      'Type 1 diabetes',
    ],
    priceRange: {
      brand: '$900-$1,200/month',
      compounded: '$299-$499/month',
      withInsurance: '$0-$350/month',
    },
    availability: 'limited',
    shortageReason: 'High demand exceeding supply, manufacturing constraints',
    insuranceCoverage: {
      medicare: true, // Covered for diabetes
      medicaid: true, // Covered for diabetes
      commercial: 'Usually covered for Type 2 diabetes',
      paRequired: true,
    },
    hsaFsaEligible: false,
    alternatives: ['zepbound', 'wegovy', 'ozempic', 'compounded-tirzepatide'],
    seoKeywords: [
      'Mounjaro',
      'Mounjaro side effects',
      'Mounjaro dosage',
      'Mounjaro cost',
      'Mounjaro price',
      'Mounjaro shortage',
      'Mounjaro for weight loss',
      'Mounjaro vs Wegovy',
      'tirzepatide',
    ],
    description:
      'Mounjaro (tirzepatide) is FDA-approved for Type 2 diabetes and is considered one of the most effective GLP-1 medications. It targets both GLP-1 and GIP receptors, potentially leading to greater weight loss than semaglutide.',
    howItWorks:
      'Mounjaro is a dual GLP-1/GIP receptor agonist, meaning it activates two hormone pathways simultaneously. This dual action may lead to greater weight loss and blood sugar control than GLP-1-only medications.',
    effectiveness:
      'For diabetes: Reduces A1C by 2.0-2.5%. For weight loss (off-label): Users typically lose 15-22% of body weight over 6-12 months, potentially more than semaglutide.',
    drugInteractions: [
      'Insulin: May increase risk of hypoglycemia. Monitor blood sugar closely.',
      'Sulfonylureas: May increase risk of hypoglycemia. Dose reduction may be needed.',
      'Warfarin: Monitor INR more frequently.',
      'Oral contraceptives: May reduce effectiveness. Use additional contraception.',
    ],
    warnings: [
      'Do not use if you have a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).',
      'Stop taking Mounjaro and seek immediate medical attention if you experience severe abdominal pain.',
      'Inform your doctor if you have a history of pancreatitis, gallbladder disease, or kidney problems.',
      'Pregnant women should not use Mounjaro. Use effective contraception while taking this medication.',
    ],
    storage: 'Store Mounjaro pens in the refrigerator (36°F to 46°F) before first use. After first use, store at room temperature (up to 86°F) or in the refrigerator. Do not freeze. Discard after 56 days.',
    administration:
      'Inject Mounjaro subcutaneously (under the skin) in your stomach, thigh, or upper arm. Rotate injection sites. Use a new needle for each injection.',
    monitoring:
      'Monitor blood sugar levels regularly, especially if taking insulin or other diabetes medications. Watch for signs of pancreatitis, gallbladder problems, and allergic reactions.',
  },
  zepbound: {
    id: 'zepbound',
    name: 'Zepbound',
    genericName: 'Tirzepatide',
    brandNames: ['Zepbound'],
    type: 'injection',
    activeIngredient: 'Tirzepatide',
    manufacturer: 'Eli Lilly',
    fdaApproved: '2023-11-08',
    indication: 'Chronic weight management in adults with obesity or overweight',
    dosage: {
      starting: '2.5 mg once weekly',
      maintenance: '5-15 mg once weekly',
      max: '15 mg once weekly',
      frequency: 'Weekly injection',
    },
    sideEffects: {
      common: [
        'Nausea (33%)',
        'Diarrhea (24%)',
        'Vomiting (20%)',
        'Constipation (18%)',
        'Abdominal pain (14%)',
        'Injection site reactions (10%)',
      ],
      serious: [
        'Pancreatitis',
        'Gallbladder problems',
        'Severe gastrointestinal disease',
        'Severe allergic reactions',
      ],
      frequency: 'Common (≥10%)',
    },
    contraindications: [
      'Personal or family history of medullary thyroid carcinoma (MTC)',
      'Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)',
      'Severe gastrointestinal disease',
      'Pregnancy',
    ],
    priceRange: {
      brand: '$900-$1,200/month',
      compounded: '$299-$499/month',
      withInsurance: '$0-$350/month',
    },
    availability: 'severe-shortage',
    shortageReason: 'Extremely high demand, manufacturing capacity limits',
    insuranceCoverage: {
      medicare: false, // Not covered by Medicare Part D for weight loss
      medicaid: false, // Varies by state
      commercial: 'Varies by plan (often requires PA)',
      paRequired: true,
    },
    hsaFsaEligible: false,
    alternatives: ['mounjaro', 'wegovy', 'compounded-tirzepatide'],
    seoKeywords: [
      'Zepbound',
      'Zepbound side effects',
      'Zepbound dosage',
      'Zepbound cost',
      'Zepbound price',
      'Zepbound shortage',
      'Zepbound alternatives',
      'tirzepatide weight loss',
      'Zepbound vs Wegovy',
    ],
    description:
      'Zepbound (tirzepatide) is FDA-approved for chronic weight management. It is the same medication as Mounjaro but approved specifically for weight loss. It is considered one of the most effective weight loss medications available.',
    howItWorks:
      'Zepbound is a dual GLP-1/GIP receptor agonist, activating two hormone pathways to reduce appetite, slow digestion, and improve metabolic function. This dual action may lead to greater weight loss than GLP-1-only medications.',
    effectiveness:
      'In clinical trials, participants lost an average of 18-22% of body weight over 72 weeks when combined with diet and exercise. About 96% of participants lost at least 5% of body weight.',
    drugInteractions: [
      'Insulin: May increase risk of hypoglycemia. Monitor blood sugar closely.',
      'Sulfonylureas: May increase risk of hypoglycemia. Dose reduction may be needed.',
      'Warfarin: Monitor INR more frequently.',
      'Oral contraceptives: May reduce effectiveness. Use additional contraception.',
    ],
    warnings: [
      'Do not use if you have a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).',
      'Stop taking Zepbound and seek immediate medical attention if you experience severe abdominal pain.',
      'Inform your doctor if you have a history of pancreatitis, gallbladder disease, or kidney problems.',
      'Pregnant women should not use Zepbound. Use effective contraception while taking this medication.',
    ],
    storage: 'Store Zepbound pens in the refrigerator (36°F to 46°F) before first use. After first use, store at room temperature (up to 86°F) or in the refrigerator. Do not freeze. Discard after 56 days.',
    administration:
      'Inject Zepbound subcutaneously (under the skin) in your stomach, thigh, or upper arm. Rotate injection sites. Use a new needle for each injection.',
    monitoring:
      'Monitor for signs of pancreatitis (severe abdominal pain), gallbladder problems (pain in upper right abdomen), kidney problems (decreased urination), and allergic reactions. Regular check-ups with your doctor are recommended.',
  },
};

export const DRUG_SLUGS = Object.keys(DRUGS);

export function getDrugBySlug(slug: string): DrugInfo | undefined {
  return DRUGS[slug];
}

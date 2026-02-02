/**
 * Cost & Insurance Page Data
 * DISCOUNT_CARDS loaded from data/discount-cards.json - update monthly; see docs/DATA-UPDATE-PROCESS.md
 * Display prices: see cost-insurance-prices.ts (PRICE_SNAPSHOT); can later be loaded from API/CMS.
 */

import raw from '@/data/discount-cards.json';

export interface DiscountCard {
  id: string;
  name: string;
  drug: string[];
  who: string;
  maxSavings: string;
  validUntil: string;
  officialLink: string;
  hsaFsaEligible: boolean;
  note: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'discount' | 'insurance' | 'trumprx' | 'hsafsa' | 'appeal';
}

export const DISCOUNT_CARDS: DiscountCard[] = raw.cards as DiscountCard[];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How much can I save with manufacturer savings cards?',
    answer:
      'Manufacturer savings cards typically save $150-$225 per month, depending on the medication. Most cards have an annual cap (e.g., $1,800-$2,700 per year). Savings apply only if you have commercial insurance (not Medicare or Medicaid). Always check the official manufacturer website for current terms and eligibility.',
    category: 'discount',
  },
  {
    question: 'Can I use HSA/FSA to pay for GLP-1 medications?',
    answer:
      'Yes, most GLP-1 medications (Wegovy, Ozempic, Mounjaro, Zepbound, Rybelsus) are HSA/FSA eligible when prescribed for a medical condition. You can use HSA/FSA funds at pharmacies or Telehealth platforms. Keep receipts for tax purposes. Note: If using a manufacturer savings card, you may still use HSA/FSA for the remaining copay amount.',
    category: 'hsafsa',
  },
  {
    question: 'What is the success rate of insurance appeals?',
    answer:
      'Insurance appeal success rates vary by insurance type and denial reason. On average, 40-60% of first-level appeals are successful when medical necessity is properly documented. Success rates are higher (60-75%) for patients with BMI >30, type 2 diabetes, or cardiovascular conditions. Always include a physician letter and supporting medical records.',
    category: 'appeal',
  },
  {
    question: 'How do I apply for TrumpRx $350 program?',
    answer:
      'The TrumpRx $350 program (2026) caps GLP-1 medication costs at $350/month for eligible uninsured or underinsured individuals. To apply: 1) Check eligibility (income limits apply), 2) Visit the official TrumpRx portal, 3) Complete the application with proof of income and insurance status, 4) If approved, receive a card to use at participating pharmacies. Use our Calculator tool to estimate your eligibility.',
    category: 'trumprx',
  },
  {
    question: 'What is the difference between copay and coinsurance?',
    answer:
      'Copay is a fixed amount you pay per prescription (e.g., $25, $50). Coinsurance is a percentage of the medication cost (e.g., 20% of $1,000 = $200). Your insurance plan determines which applies. Most GLP-1 medications are Tier 3 or Tier 4 drugs, often requiring coinsurance (20-30%) rather than a simple copay.',
    category: 'insurance',
  },
  {
    question: 'Do manufacturer savings cards work with Medicare?',
    answer:
      'No, manufacturer savings cards typically exclude Medicare and Medicaid beneficiaries due to federal anti-kickback laws. However, Medicare Part D plans may cover GLP-1 medications with prior authorization. Check your Part D formulary and consider Medicare Extra Help programs if you qualify.',
    category: 'discount',
  },
  {
    question: 'How long does an insurance appeal take?',
    answer:
      'Most insurance plans process first-level appeals within 30-60 days. Expedited appeals (for urgent medical needs) may be processed in 72 hours. If your first appeal is denied, you can file a second-level appeal, which may take an additional 30-60 days. Some states offer external review options that can take 30-45 days.',
    category: 'appeal',
  },
  {
    question: 'Can I use multiple savings cards at once?',
    answer:
      'No, you cannot combine manufacturer savings cards. However, you can use a manufacturer savings card with pharmacy discount programs (like GoodRx) if your insurance does not cover the medication. Always check with your pharmacy about which discount applies and provides the lowest cost.',
    category: 'discount',
  },
  {
    question: 'What documents do I need for an insurance appeal?',
    answer:
      'For an insurance appeal, gather: 1) Your denial letter (with reason and appeal instructions), 2) A physician letter explaining medical necessity, 3) Medical records (diagnosis, BMI, lab results, treatment history), 4) Prior authorization forms (if applicable), 5) Proof of previous treatments tried. Use our appeal letter template as a starting point.',
    category: 'appeal',
  },
  {
    question: 'Are compounded GLP-1 medications HSA/FSA eligible?',
    answer:
      'Compounded GLP-1 medications may be HSA/FSA eligible if prescribed by a licensed physician for a medical condition. However, eligibility depends on your HSA/FSA administrator\'s rules. Some administrators require the medication to be FDA-approved, while others accept compounded medications with proper documentation. Check with your HSA/FSA provider before using funds.',
    category: 'hsafsa',
  },
  {
    question: 'What is a formulary and how do I check mine?',
    answer:
      'A formulary is your insurance plan\'s list of covered medications and their tiers (which determine copay/coinsurance). To check your formulary: 1) Log into your insurance portal, 2) Search for your medication (e.g., "Wegovy"), 3) Check the tier and any restrictions (prior authorization, step therapy). You can also call your insurance company or ask your pharmacist.',
    category: 'insurance',
  },
  {
    question: 'Can I get GLP-1 medications for weight loss if I don\'t have diabetes?',
    answer:
      'Yes, Wegovy and Zepbound are FDA-approved for weight loss (BMI ≥30 or BMI ≥27 with weight-related conditions). However, insurance coverage varies. Many plans require prior authorization and may deny coverage for weight loss alone. Some plans only cover GLP-1 medications for type 2 diabetes. Check your formulary and consider manufacturer savings cards or Telehealth platforms if insurance denies coverage.',
    category: 'insurance',
  },
  {
    question: 'What is prior authorization (PA) and how do I get it?',
    answer:
      'Prior authorization (PA) is your insurance plan\'s requirement that your doctor get approval before covering certain medications. Your doctor submits a PA request with medical necessity documentation. The process typically takes 5-10 business days. If denied, you can appeal. Use our Calculator tool to estimate your PA success probability based on your insurance and medical conditions.',
    category: 'insurance',
  },
  {
    question: 'How do I find the official manufacturer savings card?',
    answer:
      'To find the official manufacturer savings card: 1) Visit the medication\'s official website (e.g., wegovy.com, ozempic.com), 2) Look for "Savings" or "Patient Support" section, 3) Enter your information to download or print the card, 4) Present the card at your pharmacy when filling the prescription. Never use third-party sites claiming to offer savings cards—always use the official manufacturer site.',
    category: 'discount',
  },
  {
    question: 'What happens if my insurance appeal is denied?',
    answer:
      'If your first insurance appeal is denied, you can: 1) File a second-level appeal (internal review), 2) Request an external review (independent third-party review, available in most states), 3) Consider alternative options (manufacturer savings cards, Telehealth platforms, compounded medications). Many denials are overturned on second appeal when additional medical documentation is provided.',
    category: 'appeal',
  },
];

export const TRUMPRX_INFO = {
  name: 'TrumpRx $350 Program',
  description:
    'The TrumpRx $350 program (2026) caps GLP-1 medication costs at $350/month for eligible uninsured or underinsured individuals.',
  eligibility: [
    'Uninsured or underinsured (insurance does not cover GLP-1 medications)',
    'Household income below certain thresholds (varies by state)',
    'US citizen or legal resident',
    'Prescription from licensed physician',
  ],
  howToApply: [
    'Search for "TrumpRx $350 program" or visit your state health department website for eligibility information',
    'Complete the eligibility questionnaire (if available in your state)',
    'Submit proof of income and insurance status',
    'If approved, receive a program card via email/mail',
    'Present the card at participating pharmacies',
  ],
  benefits: [
    'Caps monthly cost at $350 (regardless of medication)',
    'Works at participating pharmacies nationwide',
    'No annual cap or lifetime limit',
    'Covers all FDA-approved GLP-1 medications',
  ],
  limitations: [
    'Income eligibility requirements apply',
    'Not available for Medicare/Medicaid beneficiaries',
    'Must reapply annually',
    'Limited to participating pharmacies',
  ],
};

export const HSA_FSA_INFO = {
  title: 'Using HSA/FSA for GLP-1 Medications',
  description:
    'Health Savings Accounts (HSA) and Flexible Spending Accounts (FSA) can be used to pay for GLP-1 medications, providing tax advantages.',
  eligibleDrugs: [
    { name: 'Wegovy', eligible: true, note: 'FDA-approved for weight loss' },
    { name: 'Ozempic', eligible: true, note: 'FDA-approved for type 2 diabetes' },
    { name: 'Mounjaro', eligible: true, note: 'FDA-approved for type 2 diabetes' },
    { name: 'Zepbound', eligible: true, note: 'FDA-approved for weight loss' },
    { name: 'Rybelsus', eligible: true, note: 'FDA-approved for type 2 diabetes' },
    { name: 'Compounded GLP-1', eligible: 'Maybe', note: 'Check with your HSA/FSA administrator' },
  ],
  howToUse: [
    'Pay at pharmacy using your HSA/FSA debit card',
    'Or pay out-of-pocket and submit receipt for reimbursement',
    'Keep all receipts for tax purposes',
    'Check with your administrator for specific rules',
  ],
  taxBenefits: [
    'HSA: Contributions are tax-deductible, withdrawals for medical expenses are tax-free',
    'FSA: Contributions are pre-tax, reducing your taxable income',
    'Both: Can save 20-30% on medication costs through tax savings',
  ],
  annualLimits: {
    hsa: '$4,150 (individual) or $8,300 (family) for 2026',
    fsa: '$3,200 (employer-set limit, varies)',
  },
};

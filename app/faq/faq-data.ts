export const FAQ_CATEGORIES = [
  'Pricing & TrumpRx',
  'Legality & Safety',
  'Side Effects',
  'New Oral Pills',
  'Logistics',
] as const;

export type FAQCategory = (typeof FAQ_CATEGORIES)[number];

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  tags: string[];
}

export const FAQ_ITEMS: FAQItem[] = [
  // Pricing & TrumpRx (6)
  {
    id: 'cost-overview',
    category: 'Pricing & TrumpRx',
    question: 'How much do GLP-1 weight loss medications cost?',
    answer:
      'With insurance and a manufacturer savings card, many people pay $0–$50/month for brand Ozempic, Wegovy, Mounjaro, Zepbound, or Rybelsus. Without insurance, list price is often $900–$1,400+/month. Compounded semaglutide from a licensed pharmacy is typically about $150–$350/month. Use our Out-of-Pocket Calculator for an estimate.',
    tags: ['#Cost', '#Insurance', '#Savings'],
  },
  {
    id: 'ozempic-cost',
    category: 'Pricing & TrumpRx',
    question: 'How much does Ozempic cost?',
    answer:
      'With insurance and a manufacturer savings card, many people pay $0–$50/month for Ozempic. Without insurance, list price is often $900–$1,400+/month. Compounded semaglutide from a licensed pharmacy is typically $150–$350/month. Use our Cost Calculator for a personalized estimate.',
    tags: ['#Ozempic', '#Cost', '#Insurance'],
  },
  {
    id: 'trumprx-what',
    category: 'Pricing & TrumpRx',
    question: 'What is TrumpRx and how does it affect pricing?',
    answer:
      'TrumpRx is a set of initiatives to lower prescription drug costs, including Medicare negotiation and pharmacy benefit reforms. Policy changes can affect list prices, copays, and manufacturer savings programs—check official manufacturer and government sites for current eligibility.',
    tags: ['#TrumpRx', '#Cost', '#Policy'],
  },
  {
    id: 'trumprx-350',
    category: 'Pricing & TrumpRx',
    question: 'How to get $350 GLP-1s via TrumpRx?',
    answer:
      'Eligible people may get certain drugs capped around $350/month under the 2026 TrumpRx program; qualification is strict and typically requires no insurance or high-deductible, income below a threshold, and specific conditions. Apply through official TrumpRx.gov (or current administration site). Compounded semaglutide from licensed pharmacies may already cost $150–$350/month without TrumpRx—use our Calculator to compare.',
    tags: ['#TrumpRx', '#Cost', '#Policy', '#350'],
  },
  {
    id: 'savings-cards',
    category: 'Pricing & TrumpRx',
    question: 'How do manufacturer savings cards work?',
    answer:
      'Manufacturers offer savings cards that can lower your copay if you have commercial insurance (not Medicare/Medicaid in most cases). You or your pharmacy apply the card at the time of fill. Eligibility and maximum savings vary—check the official manufacturer site for the drug you use. We list programs on our Cost & Insurance page.',
    tags: ['#Cost', '#Insurance', '#Savings'],
  },
  {
    id: 'insurance-denial',
    category: 'Pricing & TrumpRx',
    question: 'My insurance denied coverage. What can I do?',
    answer:
      'You can often appeal. Gather medical necessity documentation from your doctor, use the correct codes, and submit a formal appeal by the deadline on your denial letter. We provide step-by-step appeal guidance and an appeal letter template on our Cost & Insurance page.',
    tags: ['#Insurance', '#Appeal', '#Cost'],
  },
  {
    id: 'compounded-cost',
    category: 'Pricing & TrumpRx',
    question: 'Why is compounded semaglutide cheaper than brand?',
    answer:
      'Because compounded versions use bulk ingredient and are prepared by licensed pharmacies—they don’t include the same R&D, marketing, or single-use pen costs as brand. Quality depends on the pharmacy and state board; only use pharmacies you can verify.',
    tags: ['#Compounding', '#Cost', '#Safety'],
  },
  {
    id: 'medicare-glp1',
    category: 'Pricing & TrumpRx',
    question: 'Does Medicare cover GLP-1 for weight loss?',
    answer:
      'Generally no: Medicare Part D does not currently cover drugs approved only for weight loss (e.g., Wegovy, Zepbound). Some Part D plans may cover GLP-1s approved for type 2 diabetes (e.g., Ozempic, Mounjaro) when prescribed for that use. Rules vary by plan.',
    tags: ['#Insurance', '#Medicare', '#Cost'],
  },
  // Legality & Safety (6)
  {
    id: 'compounded-safe',
    category: 'Legality & Safety',
    question: 'Is compounded semaglutide safe?',
    answer:
      'Yes, when from a licensed pharmacy—it’s the same active ingredient as brand Ozempic/Wegovy. Quality depends on the pharmacy; only use one you can verify with your state board of pharmacy. Never buy from unverified sellers or sites that don’t require a valid prescription. See our Legitimacy Tracker for red flags.',
    tags: ['#Compounding', '#Safety', '#Legitimacy'],
  },
  {
    id: 'fda-shortage',
    category: 'Legality & Safety',
    question: 'Why is there a shortage? Where can I check?',
    answer:
      'Demand has outpaced supply, so the FDA reports shortages for some products and doses. Check our FDA Shortage Status page (under Legitimacy) and the official FDA Drug Shortages site for current info.',
    tags: ['#FDA', '#Shortage', '#Safety'],
  },
  {
    id: 'verify-pharmacy',
    category: 'Legality & Safety',
    question: 'How do I verify a pharmacy is legitimate?',
    answer:
      'Check your state board of pharmacy website to confirm the pharmacy is licensed. Legitimate pharmacies require a valid prescription from a licensed prescriber, have a physical address and phone, and do not sell without a prescription. Avoid sites that ship from abroad or offer “no prescription needed.”',
    tags: ['#Legitimacy', '#Safety', '#Pharmacy'],
  },
  {
    id: 'red-flags',
    category: 'Legality & Safety',
    question: 'What are red flags for GLP-1 scams?',
    answer:
      'Watch for: no prescription required, prices far below market, payment only by crypto or wire, no verifiable pharmacy license, products shipped from overseas, and unsolicited emails or social media ads. Always get a prescription and use a pharmacy you can verify with your state board.',
    tags: ['#Legitimacy', '#Safety', '#Scams'],
  },
  {
    id: 'prescription-required',
    category: 'Legality & Safety',
    question: 'Do I need a prescription for GLP-1 medications?',
    answer:
      'Yes. All FDA-approved and compounded GLP-1 medications in the US require a valid prescription from a licensed healthcare provider. Any site or seller offering GLP-1s without a prescription is not operating legally and may be selling unsafe or counterfeit products.',
    tags: ['#Legality', '#Safety', '#Prescription'],
  },
  {
    id: 'imported-glp1',
    category: 'Legality & Safety',
    question: 'Is it legal to import GLP-1 from abroad?',
    answer:
      'Generally no. FDA-approved prescription drugs sold in the US must meet US quality and labeling standards. Importing prescription medications from other countries for personal use can violate federal law and may expose you to unapproved or counterfeit products. Use US-licensed pharmacies and a US prescription.',
    tags: ['#Legality', '#FDA', '#Safety'],
  },
  {
    id: 'compounded-legal-2026',
    category: 'Legality & Safety',
    question: 'Are compounded GLP-1s legal in 2026?',
    answer:
      'Yes. Compounded GLP-1 medications remain legal under FDA guidelines when: (1) There is an FDA-reported shortage of the approved product, (2) The compounding pharmacy is licensed (503A or 503B), (3) A valid prescription is required, and (4) The pharmacy follows state board regulations. The 2026 shortage updates did not change these rules—compounding is still permitted during shortages. However, always verify pharmacy legitimacy through your state board of pharmacy and look for LegitScript certification. See our Legitimacy Tracker for red flags and verification steps.',
    tags: ['#Legality', '#Compounding', '#FDA', '#2026', '#Shortage'],
  },
  // Side Effects (6)
  {
    id: 'common-side-effects',
    category: 'Side Effects',
    question: 'What are the most common side effects of GLP-1s?',
    answer:
      'The most common are nausea, vomiting, diarrhea, constipation, stomach pain, and decreased appetite—often mild to moderate and may improve over time. Rare but serious risks include pancreatitis and gallbladder disease. Always report new or worsening symptoms to your prescriber.',
    tags: ['#SideEffects', '#Nausea', '#Safety'],
  },
  {
    id: 'nausea-tips',
    category: 'Side Effects',
    question: 'How can I reduce nausea on GLP-1 medications?',
    answer:
      'Start at a low dose and increase slowly; eat smaller, bland meals, avoid fatty or spicy foods, and stay hydrated. Some people take medication with food or at bedtime. If nausea is severe or persistent, your doctor may adjust your dose or suggest anti-nausea medication.',
    tags: ['#SideEffects', '#Nausea', '#Tips'],
  },
  {
    id: 'when-to-stop',
    category: 'Side Effects',
    question: 'When should I stop taking a GLP-1 and call my doctor?',
    answer:
      'Stop and seek medical help for: severe stomach pain, persistent vomiting, signs of pancreatitis (pain radiating to the back), severe allergic reaction, or low blood sugar symptoms if you’re on other diabetes medications. Contact your doctor for any new or worsening symptoms that concern you.',
    tags: ['#SideEffects', '#Safety', '#Emergency'],
  },
  {
    id: 'long-term-risks',
    category: 'Side Effects',
    question: 'What are the long-term risks of GLP-1 medications?',
    answer:
      'Known or possible long-term risks include thyroid C-cell tumors (contraindicated with personal/family history of MTC or MEN 2), pancreatitis, gallbladder disease, and kidney issues in some settings; long-term data are still evolving. Your doctor will weigh benefits and risks for your situation.',
    tags: ['#SideEffects', '#Safety', '#LongTerm'],
  },
  {
    id: 'weight-rebound',
    category: 'Side Effects',
    question: 'Will I gain weight back if I stop GLP-1?',
    answer:
      'Many people regain some weight after stopping, especially without lifestyle changes. Studies show that diet, exercise, and sometimes continued lower-dose or other medication can help maintain weight. Work with your prescriber on a plan before stopping, including tapering if appropriate.',
    tags: ['#SideEffects', '#Weight', '#Maintenance'],
  },
  {
    id: 'interaction-other-meds',
    category: 'Side Effects',
    question: 'Do GLP-1s interact with other medications?',
    answer:
      'Yes—GLP-1s can slow stomach emptying (affecting absorption of some oral drugs, e.g. antibiotics or birth control) and increase low blood sugar risk when used with insulin or sulfonylureas. Tell your doctor and pharmacist about all medications and supplements before starting a GLP-1.',
    tags: ['#SideEffects', '#Safety', '#Interactions'],
  },
  // New Oral Pills (6)
  {
    id: 'oral-vs-injection',
    category: 'New Oral Pills',
    question: 'Oral vs injection—which is better?',
    answer:
      'Injectables (Wegovy, Zepbound) tend to show stronger weight loss; orals (Rybelsus) are daily and needle-free. Your doctor can help you choose based on goals, preference, and insurance. See our Alternative Hub for a comparison.',
    tags: ['#Oral', '#Rybelsus', '#Comparison'],
  },
  {
    id: 'injectable-vs-oral-2026',
    category: 'New Oral Pills',
    question: 'Injectable vs. Oral: Which 2026 weight loss pill is best for me?',
    answer:
      'For 2026, injectables (Wegovy, Zepbound) generally show stronger average weight loss (15–20% body weight) than current orals (Rybelsus ~5–8%); new oral formulations may narrow the gap. Choice depends on efficacy goals, convenience (oral daily vs injectable weekly), insurance (weight-loss injectables often need PA; Rybelsus may be easier if you have diabetes), and cost. Use our Calculator or Find Your Option quiz for a personalized comparison.',
    tags: ['#Oral', '#Injectable', '#2026', '#Comparison', '#WeightLoss'],
  },
  {
    id: 'rybelsus-weight-loss',
    category: 'New Oral Pills',
    question: 'Does Rybelsus work for weight loss?',
    answer:
      'Rybelsus is FDA-approved for type 2 diabetes; weight loss can occur as a side effect. For weight loss specifically, Wegovy (injectable semaglutide) is approved at higher doses. New oral weight-loss medications may be approved in the future—check FDA and your doctor for current options.',
    tags: ['#Oral', '#Rybelsus', '#WeightLoss'],
  },
  {
    id: 'new-oral-2026',
    category: 'New Oral Pills',
    question: 'What new oral GLP-1 or weight loss pills are coming?',
    answer:
      'Several oral GLP-1 and combination agents are in development; approval timelines depend on FDA review. Check our site and official FDA announcements for new approvals. Your doctor can advise which options are appropriate once they’re available.',
    tags: ['#Oral', '#NewPills', '#FDA'],
  },
  {
    id: 'oral-taking-tips',
    category: 'New Oral Pills',
    question: 'How should I take oral semaglutide (Rybelsus)?',
    answer:
      'Take Rybelsus on an empty stomach with no more than 4 oz of water at least 30 minutes before food, drink, or other oral medications. Do not crush or split the tablet. Follow your prescriber’s dosing schedule. Missing doses can affect blood sugar and weight control.',
    tags: ['#Oral', '#Rybelsus', '#Dosing'],
  },
  {
    id: 'oral-effectiveness',
    category: 'New Oral Pills',
    question: 'How effective are oral GLP-1 pills compared to injections?',
    answer:
      'In trials, injectables (Wegovy, Zepbound) have shown larger average weight loss than current oral semaglutide (Rybelsus); effectiveness varies by person. Newer oral formulations in development may narrow the gap. Your doctor can help match the formulation to your goals and tolerance.',
    tags: ['#Oral', '#Effectiveness', '#Comparison'],
  },
  {
    id: 'switch-oral-to-injection',
    category: 'New Oral Pills',
    question: 'Can I switch from oral to injection or vice versa?',
    answer:
      'Yes, but only under your doctor’s guidance—doses are not equivalent between oral and injectable semaglutide. Your prescriber will choose the right product and starting dose. Do not switch on your own.',
    tags: ['#Oral', '#Switching', '#Dosing'],
  },
  // Logistics (6)
  {
    id: 'where-to-fill',
    category: 'Logistics',
    question: 'Where can I fill my GLP-1 prescription?',
    answer:
      'Brand GLP-1s at retail or specialty pharmacies (some mail-order); compounded semaglutide at compounding pharmacies, often mail-order. Use only a licensed pharmacy that requires a prescription and that you can verify through your state board of pharmacy.',
    tags: ['#Logistics', '#Pharmacy', '#Prescription'],
  },
  {
    id: 'shortage-alternatives',
    category: 'Logistics',
    question: 'What if my dose is on shortage?',
    answer:
      'Check FDA Drug Shortages and our Shortage Status page for current info. Your doctor may suggest a different strength, a temporary switch to another GLP-1, or compounded from a licensed pharmacy. Do not buy from unverified sources during shortages.',
    tags: ['#Shortage', '#Logistics', '#Alternatives'],
  },
  {
    id: 'travel-with-glp1',
    category: 'Logistics',
    question: 'Can I travel with GLP-1 medications?',
    answer:
      'Yes. Keep injectable GLP-1s in their original packaging or a cooler if needed; many can stay at room temperature for a limited time (check the product leaflet). Carry a copy of your prescription. For air travel, follow TSA rules for injectables and sharps. Do not leave pens in checked bags if they need refrigeration.',
    tags: ['#Logistics', '#Travel', '#Storage'],
  },
  {
    id: 'storage-refrigeration',
    category: 'Logistics',
    question: 'Do GLP-1 pens need to be refrigerated?',
    answer:
      'Unopened: yes—store in the refrigerator (36–46°F). Once in use, many brands can be kept at room temperature for a specified period (e.g. 28–56 days; check the leaflet). Do not freeze; keep away from direct heat and light.',
    tags: ['#Logistics', '#Storage', '#Refrigeration'],
  },
  {
    id: 'mail-order-compounded',
    category: 'Logistics',
    question: 'How does mail-order compounded semaglutide work?',
    answer:
      'You get a prescription from your doctor; the compounding pharmacy receives it and ships medication to you, often with syringes and instructions. Ensure the pharmacy is licensed in your state and that you have verified it with your state board. Never use a pharmacy that does not require a valid prescription.',
    tags: ['#Logistics', '#Compounding', '#MailOrder'],
  },
  {
    id: 'prior-auth',
    category: 'Logistics',
    question: 'What is prior authorization and how do I get it?',
    answer:
      'Prior authorization (PA) is when your insurer requires approval before covering a drug. Your doctor submits clinical information; the insurer approves or denies. If denied, you can appeal. We provide appeal steps and a letter template on our Cost & Insurance page. Start the process as soon as your doctor prescribes the medication.',
    tags: ['#Insurance', '#Logistics', '#PriorAuth'],
  },
];

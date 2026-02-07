'use client';

import { useState } from 'react';
import Link from 'next/link';

type InsurerId = 'aetna' | 'bcbs' | 'cigna' | 'united' | 'humana' | 'medicare' | 'other';

const INSURERS: { value: InsurerId; label: string }[] = [
  { value: 'aetna', label: 'Aetna' },
  { value: 'bcbs', label: 'Blue Cross Blue Shield (BCBS)' },
  { value: 'cigna', label: 'Cigna' },
  { value: 'united', label: 'UnitedHealthcare' },
  { value: 'humana', label: 'Humana' },
  { value: 'medicare', label: 'Medicare' },
  { value: 'other', label: 'Other / Not sure' },
];

const TIPS: Record<InsurerId, { short: string; linkText: string }> = {
  aetna: {
    short: 'Aetna often requires prior authorization (PA) for GLP-1s. Include ICD-10 and treatment duration. Use our appeal template if denied.',
    linkText: 'Get appeal template',
  },
  bcbs: {
    short: 'BCBS coverage varies by state and plan. Check your formulary for GLP-1 tier and PA rules. Our template works as a starting point.',
    linkText: 'Appeal template & tips',
  },
  cigna: {
    short: 'Cigna may require step therapy or PA for weight-loss GLP-1s. Document medical necessity and attach physician letter.',
    linkText: 'Download template',
  },
  united: {
    short: 'UnitedHealthcare PA criteria often include BMI and/or type 2 diabetes. Expedited appeals may be available—check your denial letter.',
    linkText: 'Appeal center',
  },
  humana: {
    short: 'Humana plans vary. Include diagnosis, labs, and prior treatments in your appeal. Use our universal template and adapt.',
    linkText: 'Appeal template',
  },
  medicare: {
    short: 'Medicare Part D typically does not cover drugs approved only for weight loss. Part D may cover Ozempic/Mounjaro when prescribed for type 2 diabetes.',
    linkText: 'Cost & Medicare guide',
  },
  other: {
    short: 'Use our universal appeal letter template and insurer-specific tips. Always follow the appeal deadline on your denial letter.',
    linkText: 'Appeal templates & discount cards',
  },
};

export default function HomeInsuranceNavigator() {
  const [selected, setSelected] = useState<InsurerId | ''>('');

  const tip = selected ? TIPS[selected] : null;

  return (
    <section
      className="border-b border-gray-200 bg-primary-50/30"
      aria-labelledby="insurance-nav-heading"
    >
      <div className="container-page section-pad-tight">
        <h2 id="insurance-nav-heading" className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Have insurance? Find your insurer
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Get tailored tips and our free appeal letter template if your plan denied GLP-1 coverage.
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <label htmlFor="home-insurer-select" className="sr-only">
            Select your insurance company
          </label>
          <select
            id="home-insurer-select"
            value={selected}
            onChange={(e) => setSelected((e.target.value || '') as InsurerId)}
            className="w-full max-w-xs rounded-none border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select insurer…</option>
            {INSURERS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {tip && (
            <div className="flex-1 rounded-none border border-primary-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-700">{tip.short}</p>
              <Link
                href={selected === 'medicare' ? '/cost-insurance' : '/cost-insurance/appeals'}
                className="mt-3 inline-block text-sm font-semibold text-primary-600 underline hover:no-underline"
              >
                {tip.linkText} →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

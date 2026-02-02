import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import CalculatorMultiStep from '@/components/CalculatorMultiStep';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: '2026 GLP-1 Cost Calculator | Out-of-Pocket Estimate for Insured & Uninsured',
  description:
    'GLP-1 cost calculator: personalized out-of-pocket estimate in under a minute. Insured or uninsured, 2026 policy, PA success. Rx Likewise.',
  keywords:
    'GLP-1 calculator, cost calculator, insurance calculator, prior authorization, PA success, 2026 policy, TrumpRx, Medicare Part D',
  openGraph: {
    title: '2026 GLP-1 Cost Calculator | Personalized Estimate Tool',
    description: 'Calculate your GLP-1 medication cost with 2026 policy data. For insured and uninsured. PA success probability and hidden costs breakdown.',
  },
};

export default function CalculatorPage() {
  return (
    <>
      <StructuredData
        type="software-application"
        name="2026 GLP-1 Cost Calculator"
        description="Interactive calculator to estimate GLP-1 medication costs based on insurance, comorbidities, and 2026 policy data."
        applicationCategory="HealthApplication"
        operatingSystem="Web Browser"
        featureList={[
          'Multi-step questionnaire',
          'Prior Authorization success probability',
          'Hidden costs breakdown',
          'Annual savings calculation',
          '2026 policy engine integration',
        ]}
        offers={{ price: '0', priceCurrency: 'USD' }}
        dateModified="2026-01-30"
        url="https://www.rxlikewise.com/calculator"
      />
      <div className="container-page section-pad-tight">
        <Breadcrumbs items={[{ label: 'Calculator' }]} />
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">You&apos;re in: Calculator</p>
        <div className="mt-4 mb-6 rounded-none border border-gray-200 bg-gray-50 p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-gray-900">Get a personalized cost estimate</h2>
          <p className="mt-2 text-sm text-gray-600">
            Use our calculator to get a personalized GLP-1 out-of-pocket estimate in under a minute—Rx Likewise. For people with or without insurance: enter your situation to see range and PA success probability. Discount cards and appeal templates are on our <a href="/cost-insurance" className="font-medium text-primary-600 underline hover:no-underline">Cost & Insurance</a> page.
          </p>
        </div>
      </div>
      <CalculatorMultiStep />
    </>
  );
}

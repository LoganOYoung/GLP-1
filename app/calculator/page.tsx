import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CalculatorMultiStep from '@/components/CalculatorMultiStep';
import StructuredData from '@/components/StructuredData';
import ImagePlaceholder from '@/components/ImagePlaceholder';

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
      <div className="bg-white">
        {/* Hero Banner */}
        <section className="border-b border-slate-200 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <div className="container-page section-pad">
            <Breadcrumbs items={[{ label: 'Calculator' }]} />
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  2026 GLP-1 Cost Calculator
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                  Personalized out-of-pocket estimate in under a minute—insured or uninsured, with PA success probability.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="relative h-64 w-full overflow-hidden rounded-none shadow-lg">
                  <ImagePlaceholder
                    src="/images/banners/calculator-hero-banner.webp"
                    alt="GLP-1 Cost Calculator"
                    width={600}
                    height={256}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Intro */}
        <section className="border-b border-slate-200 bg-white">
          <div className="container-page max-w-4xl py-4 sm:py-5">
            <p className="text-sm text-slate-600">
              Discount cards and appeal templates: <Link href="/cost-insurance" className="font-medium text-primary-600 underline hover:no-underline">Cost & Insurance</Link>.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Estimates are for reference; verify at your pharmacy or insurer.
            </p>
          </div>
        </section>
        <CalculatorMultiStep />
      </div>
    </>
  );
}

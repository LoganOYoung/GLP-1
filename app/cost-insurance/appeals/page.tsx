import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedPages from '@/components/RelatedPages';
import { getRelatedPagesFor } from '@/lib/related-pages-data';
import AppealTemplateCopy from '../AppealTemplateCopy';

export const metadata: Metadata = {
  title: 'Insurance Appeal Center | GLP-1 Denial Letter Template by Insurer',
  description:
    'Appeal insurance denial for GLP-1 medications. Universal appeal letter template plus tips by insurer (Aetna, BCBS, United). Step-by-step and what to include.',
  openGraph: {
    title: 'Insurance Appeal Center | GLP-1 Denial Appeal',
    description: 'Appeal letter template and insurer-specific tips for GLP-1 coverage denials.',
  },
};

const INSURER_TIPS: { name: string; tips: string[] }[] = [
  {
    name: 'Aetna',
    tips: [
      'Prior authorization (PA) is often required; include ICD-10 and duration of therapy.',
      'Weight-loss–only (e.g. Wegovy) may require step therapy; document previous attempts if any.',
      'Use the universal template below and adapt the medical necessity paragraph to your case.',
    ],
  },
  {
    name: 'Blue Cross Blue Shield (BCBS)',
    tips: [
      'Coverage varies by state and plan; check your BCBS formulary for GLP-1 tier and PA requirements.',
      'Include physician letter and relevant labs (A1C, BMI, comorbidities).',
      'Universal template works as a starting point; add plan-specific appeal address from your denial letter.',
    ],
  },
  {
    name: 'UnitedHealthcare',
    tips: [
      'PA criteria often include BMI threshold and/or type 2 diabetes; document both if applicable.',
      'Expedited appeals may be available for urgent cases; check your denial letter for instructions.',
      'Use the universal template and attach supporting records; address to the appeal department on your denial notice.',
    ],
  },
];

export default function AppealsPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-page section-pad">
          <Breadcrumbs items={[{ label: 'Cost & Insurance', href: '/cost-insurance' }, { label: 'Appeal Center' }]} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Insurance Appeal Center
          </h1>
          <p className="mt-2 max-w-2xl text-base text-gray-600">
            Use the universal appeal letter template below and adapt it to your insurer. We also include brief tips for Aetna, BCBS, and UnitedHealthcare. Always follow the appeal instructions and deadline on your denial letter.
          </p>
          <p className="mt-4">
            <Link href="/cost-insurance#appeal" className="font-medium text-primary-600 underline hover:no-underline">
              ← Back to Cost & Insurance
            </Link>
          </p>
        </div>
      </section>

      <div className="container-page section-pad">
        {/* By insurer tips */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900">Tips by insurer</h2>
          <p className="mt-1 text-sm text-gray-600">
            Use the universal template below; adapt medical necessity and address to your plan.
          </p>
          <div className="mt-6 space-y-6">
            {INSURER_TIPS.map((insurer) => (
              <div key={insurer.name} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900">{insurer.name}</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700">
                  {insurer.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Universal template */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Universal appeal letter template</h2>
          <p className="mt-1 text-sm text-gray-600">
            Copy and adapt; your doctor should sign and attach supporting records.
          </p>
          <AppealTemplateCopy />
          <p className="mt-3 text-xs text-gray-500">
            This is a starting point only. Your doctor should customize the medical necessity section and attach relevant records. Check your plan&apos;s appeal instructions for any required forms or formats.
          </p>
        </section>
      </div>

      <section className="border-t border-gray-200 bg-gray-50">
        <div className="container-page section-pad">
          <RelatedPages pages={getRelatedPagesFor('appeals')} />
        </div>
      </section>
    </div>
  );
}

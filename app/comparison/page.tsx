import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import RelatedPages from '@/components/RelatedPages';
import { getRelatedPagesFor } from '@/lib/related-pages-data';
import ComparisonClient from './ComparisonClient';

export const metadata: Metadata = {
  title: 'Drug Comparison | Tirzepatide vs Semaglutide, Brand vs Compounded 2026',
  description:
    'Tirzepatide (Zepbound, Mounjaro) vs semaglutide (Wegovy, Ozempic): cost, weight loss %, side effects. Brand and compounded 2026. Rx Likewise.',
  keywords:
    'Tirzepatide vs Semaglutide 2026, brand vs compounded weight loss drugs, GLP-1 comparison, Wegovy vs Zepbound, cost comparison, side effect comparison',
  openGraph: {
    title: 'GLP-1 Drug Comparison 2026 | Tirzepatide vs Semaglutide',
    description: 'Compare weight loss %, cost, and side effects. Brand, compounded, and oral options.',
  },
};

export default function ComparisonPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-page section-pad">
          <Breadcrumbs items={[{ label: 'Compare' }]} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Drug Comparison
          </h1>
          <p className="mt-2 max-w-2xl text-base text-gray-600">
            Tirzepatide (Zepbound, Mounjaro) and semaglutide (Wegovy, Ozempic) are the two main GLP-1 types; both can produce significant weight loss with different cost and side-effect profiles. The table below compares cost, weight loss %, and side effects by brand and compounded option—use the filters to see the option that best fits your budget and goals.
          </p>
          <div className="mt-4">
            <LastUpdated date={new Date('2026-01-30')} />
          </div>
          <div className="mt-6 rounded-none border border-primary-200 bg-primary-50/50 px-4 py-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Quick links</p>
            <ul className="flex flex-wrap gap-2">
              <li><Link href="/alternatives" className="rounded-none border border-primary-300 bg-white px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50">Alternatives</Link></li>
              <li><Link href="/calculator" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Calculator</Link></li>
              <li><Link href="/cost-insurance" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Cost & Insurance</Link></li>
              <li><Link href="/tools/dose-converter" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Dose Converter</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <ComparisonClient />

      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container-page section-pad-tight">
          <RelatedPages pages={getRelatedPagesFor('comparison')} />
        </div>
      </div>
    </div>
  );
}

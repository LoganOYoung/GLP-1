import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedPages from '@/components/RelatedPages';
import { getRelatedPagesFor } from '@/lib/related-pages-data';
import ShortageClient from './ShortageClient';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';

export const metadata: Metadata = {
  title: 'FDA Shortage Status',
  description: 'Current FDA-reported drug shortages for GLP-1 medications (Ozempic, Wegovy, Mounjaro, and related).',
};

export default function ShortagePage() {
  return (
    <div className="container-page max-w-4xl section-pad">
      <Breadcrumbs items={[{ label: 'Legitimacy', href: '/legitimacy' }, { label: 'FDA Shortage Status' }]} />
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        FDA Shortage Status
      </h1>
      <p className="mt-4 text-gray-600">
        Below is current shortage information from the FDA for GLP-1–related products. 
        We pull from public data when available; always confirm on the official FDA site.
      </p>

      <div className="mt-6 rounded-none border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
        <p className="font-medium text-gray-900">Products to check on FDA</p>
        <p className="mt-1 text-gray-600">
          Ozempic, Wegovy, Mounjaro, Zepbound, Rybelsus, and semaglutide/tirzepatide have had supply issues. 
          Search by product name on the official FDA Drug Shortages page for the latest status.
        </p>
      </div>

      <ShortageClient />

      <p className="mt-6 text-sm text-gray-500">
        Source: <a href="https://www.fda.gov/drugs/drug-safety-and-availability/drug-shortages" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">FDA Drug Shortages</a>. 
        This page does not replace the FDA&apos;s official list. <Link href="/legitimacy" className="ml-2 underline hover:no-underline">← Legitimacy</Link>
      </p>
      <RelatedPages pages={getRelatedPagesFor('shortage')} />
    </div>
  );
}

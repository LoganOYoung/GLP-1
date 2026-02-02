import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import RelatedPages from '@/components/RelatedPages';
import { getRelatedPagesFor } from '@/lib/related-pages-data';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | GLP-1 Guide - Trust Oasis, Real-Time Data, 2026 Policy Engine',
  description:
    'Learn how GLP-1 Guide helps 50K+ users navigate GLP-1 medications with real-time pricing, verified pharmacies, and 2026 policy data. LegitScript certified, independent, transparent.',
  keywords:
    'GLP-1 guide about, trusted GLP-1 information, LegitScript verified, 2026 policy engine, real-time drug prices, independent GLP-1 research',
  openGraph: {
    title: 'About GLP-1 Guide | Trust Oasis for GLP-1 Information',
    description: 'Independent, transparent, real-time GLP-1 medication guidance. LegitScript verified sources, 2026 policy engine, trusted by 50K+ users.',
  },
};

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GLP-1 Guide',
    description:
      'Independent decision-support platform for GLP-1 medications. Real-time pricing, verified pharmacies, 2026 policy engine.',
    url: 'https://glp1guide.com',
    logo: 'https://glp1guide.com/logo.png',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };
}

export default function AboutPage() {
  const schema = buildOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:pt-12">
          <Breadcrumbs items={[{ label: 'About' }]} />
          <div className="mb-4">
            <LastUpdated date={new Date('2026-01-30')} />
          </div>
          <div className="mb-6 rounded-lg border border-primary-200 bg-primary-50/50 px-4 py-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Quick links</p>
            <ul className="flex flex-wrap gap-2">
              <li><Link href="/faq" className="rounded-md border border-primary-300 bg-white px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50">FAQ</Link></li>
              <li><Link href="/calculator" className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Calculator</Link></li>
              <li><Link href="/legitimacy" className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Legitimacy</Link></li>
            </ul>
          </div>
        </div>
        <AboutClient />
        <RelatedPages pages={getRelatedPagesFor('about')} />
      </div>
    </>
  );
}

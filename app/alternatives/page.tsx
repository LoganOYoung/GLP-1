import type { Metadata } from 'next';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Breadcrumbs from '@/components/Breadcrumbs';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import LastUpdated from '@/components/LastUpdated';
import PageCTA from '@/components/PageCTA';
import RelatedPages from '@/components/RelatedPages';
import { getRelatedPagesFor } from '@/lib/related-pages-data';
import AlternativesClient from './AlternativesClient';

export const metadata: Metadata = {
  title: 'Alternatives | Zepbound Shortage, Compounded Tirzepatide, GLP-1 Telehealth 2026',
  description:
    'For people comparing options with or without insurance: brand vs compounded vs oral GLP-1, shortage alternatives, telehealth 2026. Switching guide, stock tracker, pharmacy legitimacy.',
  keywords:
    'Compounded Tirzepatide near me 2026, Zepbound shortage alternatives, Cheapest GLP-1 telehealth 2026, GLP-1 alternatives, compounded semaglutide, Wegovy alternatives',
  openGraph: {
    title: 'GLP-1 Alternatives 2026 | Brand vs Compounded vs Oral',
    description: 'Zepbound shortage alternatives, compounded Tirzepatide, GLP-1 telehealth. Compare options and check pharmacy legitimacy.',
  },
};

function buildServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'GLP-1 Alternatives Comparison Engine',
    description:
      'Compare brand, compounded, and oral GLP-1 medications with real-time pricing from major Telehealth platforms. Includes pharmacy legitimacy verification and switching guides.',
    provider: {
      '@type': 'Organization',
      name: 'GLP-1 Guide',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: 'Medical Information Service',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export default function AlternativesPage() {
  const schema = buildServiceSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-gradient-to-b from-white to-primary-50/20">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:pt-12">
        <Breadcrumbs items={[{ label: 'Alternatives' }]} />
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">You&apos;re in: Alternatives</p>
        {/* Hero Banner Section */}
        <div className="mb-8 border-2 border-primary-100 bg-white p-8 shadow-lg lg:p-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                GLP-1 Alternatives
              </h1>
              <p className="mt-2 text-base leading-relaxed text-slate-600 sm:text-lg">
                Your main options are brand, compounded, or oral GLP-1—each differs in cost, access, and efficacy. Compare and find a path that fits when you&apos;re out of stock, priced out, or insurance denied.
              </p>
              <p className="mt-2 text-sm font-medium text-slate-500">
                For people comparing options—with or without insurance.
              </p>
              <div className="mt-4">
                <LastUpdated date={new Date('2026-01-30')} />
              </div>
            </div>
            {/* Visual Element */}
            <div className="hidden lg:block">
              <div className="relative h-64 w-full overflow-hidden shadow-lg">
                <ImagePlaceholder
                  src="/images/banners/alternatives-hero-banner.webp"
                  alt="GLP-1 Alternatives Comparison"
                  width={600}
                  height={256}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <DisclaimerBanner extra="Compounded drugs are not FDA-approved but are legal copies under FDA shortage guidelines." />
        </div>

        {/* Quick links: flat structure, more pages, more jump */}
        <div className="mt-6 rounded-lg border border-primary-200 bg-primary-50/50 px-4 py-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Quick links</p>
          <ul className="flex flex-wrap gap-2">
            <li><Link href="/calculator" className="rounded-md border border-primary-300 bg-white px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50">Calculator</Link></li>
            <li><Link href="/comparison" className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Compare Drugs</Link></li>
            <li><Link href="/tools/dose-converter" className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Dose Converter</Link></li>
            <li><Link href="/cost-insurance" className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Cost & Insurance</Link></li>
            <li><Link href="/legitimacy" className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Legitimacy</Link></li>
          </ul>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="relative h-40 w-full max-w-2xl overflow-hidden rounded-none border border-primary-200 bg-primary-50 shadow-sm">
            <ImagePlaceholder
              src="/images/inline/alternatives-paths.webp"
              alt="Your path - brand, compounded, or oral GLP-1 options"
              width={700}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Why consider alternatives (short) */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Why consider alternatives?</h2>
          <p className="mt-1 text-sm text-gray-600">
            People switch when brand is out of stock, too expensive, or insurance denies. Compounded and oral options can fill the gap—often at lower out-of-pocket cost and with better availability.
          </p>
        </div>

        {/* What is (short + FAQ link) */}
        <div className="mt-4 rounded-lg border border-gray-200 bg-white px-4 py-4">
          <h2 className="text-sm font-semibold text-gray-900">What is a GLP-1 alternative?</h2>
          <p className="mt-1 text-sm text-gray-600">
            Alternatives include other brand-name GLP-1s (e.g. Wegovy vs Zepbound), compounded semaglutide or tirzepatide from licensed pharmacies, and oral options like Rybelsus. All require a prescription.
          </p>
          <p className="mt-2 text-sm">
            <Link href="/faq#compounded-safe" className="font-medium text-primary-600 underline hover:no-underline">
              More in FAQ (safety, legality) →
            </Link>
          </p>
        </div>
      </div>

      <AlternativesClient />

      {/* FAQ teasers: 2–3 questions, link to full FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6" aria-label="Common questions">
        <h2 className="text-lg font-semibold text-gray-900">Common questions</h2>
        <p className="mt-1 text-sm text-gray-600">
          Full list on our <Link href="/faq" className="font-medium text-primary-600 underline hover:no-underline">FAQ</Link> page.
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            <Link href="/faq#compounded-safe" className="block rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100">
              Is compounded semaglutide safe?
            </Link>
          </li>
          <li>
            <Link href="/faq#compounded-legal-2026" className="block rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100">
              Are compounded GLP-1s still legal in 2026?
            </Link>
          </li>
          <li>
            <Link href="/faq#cost-overview" className="block rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100">
              How much do GLP-1 medications cost?
            </Link>
          </li>
        </ul>
      </section>

      <PageCTA
        title="Estimate your cost or find your option"
        ctaLabel="Use Calculator"
        ctaHref="/calculator"
        secondaryLabel="Find Your Option Quiz"
        secondaryHref="/quiz"
      />
      <RelatedPages pages={getRelatedPagesFor('alternatives')} />
      </div>
    </>
  );
}

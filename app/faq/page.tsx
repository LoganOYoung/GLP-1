import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import RelatedPages from '@/components/RelatedPages';
import StructuredData from '@/components/StructuredData';
import { getRelatedPagesFor } from '@/lib/related-pages-data';
import { FAQ_ITEMS } from './faq-data';
import { FAQClientWrapper } from './FAQClient';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'GLP-1 FAQ: cost ($0–$50 with insurance; $150–$350 compounded), TrumpRx, legality, side effects, oral pills. Rx Likewise.',
};

export default function FAQPage() {
  const faqItems = FAQ_ITEMS.map(({ question, answer }) => ({ question, answer }));

  return (
    <>
      <StructuredData
        type="faq"
        items={faqItems}
        dateModified="2026-01-30"
        url="https://www.rxlikewise.com/faq"
      />
      <div className="bg-white">
        {/* Hero Banner */}
        <section className="hero-bg">
          <div className="container-page section-pad">
            <Breadcrumbs items={[{ label: 'FAQ' }]} />
            <div className="hero-content max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Quick answers on pricing, TrumpRx, legality, side effects, new oral pills, and logistics.
              </p>
            </div>
          </div>
        </section>
        <Suspense fallback={<div className="container-page py-8 sm:px-6 lg:px-8" aria-hidden>Loading FAQ…</div>}>
          <FAQClientWrapper />
        </Suspense>
        {/* 看完 FAQ 后：快捷跳转 + 按情境 */}
        <section className="border-b border-slate-200 bg-white">
          <div className="container-page max-w-4xl section-pad-tight">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Quick links</p>
            <ul className="flex flex-wrap gap-2">
              <li><Link href="/calculator" className="rounded-none border border-primary-300 bg-white px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50">Calculator</Link></li>
              <li><Link href="/alternatives" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Alternatives</Link></li>
              <li><Link href="/cost-insurance" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Cost & Insurance</Link></li>
              <li><Link href="/comparison" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Compare Drugs</Link></li>
              <li><Link href="/legitimacy" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Legitimacy</Link></li>
            </ul>
            <hr className="my-4 border-slate-200" />
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Start by your situation</p>
            <ul className="flex flex-wrap gap-2">
              <li><Link href="/faq#cost-overview" className="rounded-none border border-primary-300 bg-white px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50">I have insurance → Cost & appeal</Link></li>
              <li><Link href="/faq#trumprx-350" className="rounded-none border border-secondary-300 bg-white px-3 py-1.5 text-sm font-medium text-secondary-700 hover:bg-secondary-50">Paying cash → TrumpRx & compounded</Link></li>
              <li><Link href="/faq#compounded-safe" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">General → Safety & legality</Link></li>
            </ul>
          </div>
        </section>
        <RelatedPages pages={getRelatedPagesFor('faq')} />
        {/* 页底：简短说明 + 免责 */}
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="container-page max-w-4xl py-4 sm:px-6 lg:px-8">
            <p className="text-xs text-slate-600">
              Common questions, clear answers. Not medical advice—we point you to the right info.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

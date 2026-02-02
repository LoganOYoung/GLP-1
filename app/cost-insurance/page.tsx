import type { Metadata } from 'next';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import RelatedPages from '@/components/RelatedPages';
import AppealTemplateCopy from './AppealTemplateCopy';
import PolicyStatusTicker from './PolicyStatusTicker';
import PriceSnapshotWithHSA from './PriceSnapshotWithHSA';
import { getRelatedPagesFor } from '@/lib/related-pages-data';
import DiscountCardGrid from './DiscountCardGrid';
import FAQSection from './FAQSection';
import { FAQ_ITEMS } from './cost-insurance-data';
import InsuranceAppealFlowchart from '@/components/InsuranceAppealFlowchart';

export const metadata: Metadata = {
  title: 'Cost & Insurance | GLP-1 Savings, Discount Cards, Appeals & TrumpRx $350 Program',
  description:
    'For anyone with or without insurance: save on GLP-1 medications with manufacturer savings cards, insurance appeals, TrumpRx $350 program, and HSA/FSA. Appeal templates and step-by-step guides.',
  keywords:
    'GLP-1 savings card, insurance appeal, TrumpRx $350, HSA FSA GLP-1, manufacturer coupon, prior authorization, copay assistance, GLP-1 discount',
  openGraph: {
    title: 'Cost & Insurance | GLP-1 Savings & Appeals Guide',
    description: 'Save on GLP-1 medications with discount cards, insurance appeals, and TrumpRx $350 program. HSA/FSA eligible options.',
  },
};

function buildFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

function buildHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Appeal Insurance Denial for GLP-1 Medications',
    description: 'Step-by-step guide to appeal insurance denial for GLP-1 medications',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Get your denial letter',
        text: 'Obtain your insurance denial letter, which should state the reason for denial and how to appeal.',
      },
      {
        '@type': 'HowToStep',
        name: 'Gather medical necessity documentation',
        text: 'Your doctor can provide a letter and records showing diagnosis (e.g. type 2 diabetes, BMI, comorbidities) and why the medication is needed.',
      },
      {
        '@type': 'HowToStep',
        name: 'Use correct codes',
        text: 'Ask your doctor or pharmacy to use the right ICD-10 and procedure codes so the plan can process the claim.',
      },
      {
        '@type': 'HowToStep',
        name: 'Submit a formal appeal',
        text: 'Send your appeal by the deadline, to the address or portal listed in the denial letter. Keep a copy and proof of delivery.',
      },
      {
        '@type': 'HowToStep',
        name: 'Follow up',
        text: 'If the first appeal is denied, many plans allow a second-level appeal. Your state may also offer an external review option.',
      },
    ],
  };
}

function buildServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'GLP-1 Cost & Insurance Guidance',
    description:
      'Comprehensive guide to saving on GLP-1 medications through discount cards, insurance appeals, TrumpRx $350 program, and HSA/FSA eligibility.',
    provider: {
      '@type': 'Organization',
      name: 'Rx Likewise',
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

export default function CostInsurancePage() {
  const faqSchema = buildFAQSchema();
  const howToSchema = buildHowToSchema();
  const serviceSchema = buildServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="bg-gradient-to-b from-white to-medical-blue-50/20">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b-2 border-primary-100 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-none bg-primary-500 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
            <Breadcrumbs items={[{ label: 'Cost & Insurance' }]} />
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">You&apos;re in: Cost & Insurance</p>
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Cost & Insurance
                </h1>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  You can lower your GLP-1 cost with manufacturer discount cards, insurance appeals, the TrumpRx $350 program, and HSA/FSA—this page shows how. Always verify current terms on each program&apos;s official website.
                </p>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  For anyone with or without insurance who wants to pay less or appeal a denial.
                </p>
                <div className="mt-4">
                  <LastUpdated date={new Date('2026-01-30')} />
                </div>
              </div>
              {/* Visual Banner */}
              <div className="hidden lg:block">
                <div className="relative h-64 w-full overflow-hidden shadow-lg">
                  <ImagePlaceholder
                    src="/images/banners/cost-insurance-hero-banner.webp"
                    alt="Cost & Insurance Savings Guide"
                    width={600}
                    height={256}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/calculator"
                className="bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-600"
              >
                Check My Cost
              </Link>
            </div>
          </div>
        </section>

        <PolicyStatusTicker />

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          {/* Quick links: actions + where to go (single strip) */}
          <div className="mb-8 rounded-lg border border-primary-200 bg-primary-50/50 px-4 py-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Quick links</p>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link href="/calculator" className="rounded-md border border-primary-300 bg-white px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50">
                  Calculator
                </Link>
              </li>
              <li>
                <Link href="#discount-cards" className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">
                  Discount cards
                </Link>
              </li>
              <li>
                <Link href="#trumprx" className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">
                  TrumpRx $350
                </Link>
              </li>
              <li>
                <Link href="#hsafsa" className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">
                  HSA/FSA
                </Link>
              </li>
              <li>
                <Link href="#appeal" className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">
                  Appeal template
                </Link>
              </li>
              <li>
                <Link href="/cost-insurance/appeals" className="rounded-md border border-primary-400 bg-white px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50">
                  Appeal Center →
                </Link>
              </li>
            </ul>
          </div>

          {/* Price snapshot with optional HSA/FSA tax view */}
          <section className="mb-10">
            <PriceSnapshotWithHSA />
          </section>

          {/* Key Terms (compact) */}
          <section className="mb-12">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Key terms</h2>
            <p className="mb-3 text-sm text-slate-600">
              Formulary — drugs your plan covers. Prior authorization (PA) — doctor approval before coverage. Copay — fixed per fill; coinsurance — percentage. Appeal — formal request to reverse a denial.
            </p>
            <Link href="#faq" className="text-sm font-medium text-primary-600 underline hover:no-underline">
              See FAQ for definitions →
            </Link>
          </section>

          {/* Discount Cards */}
          <section id="discount-cards" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Discount Cards & Programs</h2>
            <p className="mb-4 text-sm text-slate-600">
              Manufacturer savings cards can lower your copay if you have commercial insurance (not Medicare or
              Medicaid in most cases). Pharmacy discount programs may help with cash price. Eligibility and maximum
              savings change—check the official site before using.
            </p>
            <div className="mb-4 rounded-none border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs text-amber-900">
                <strong>Note:</strong> Links below go to manufacturer websites. If a link doesn&apos;t work, visit the
                medication&apos;s main website (e.g., wegovy.com, ozempic.com) and look for &quot;Savings&quot; or
                &quot;Patient Support&quot; section.
              </p>
            </div>
            <DiscountCardGrid />
            <p className="mt-4 text-xs text-slate-500">
              We do not provide affiliate links to these programs. Always verify current terms on the official
              manufacturer website.
            </p>
          </section>

          {/* TrumpRx $350 Program (summary + link) */}
          <section id="trumprx" className="mb-10 scroll-mt-24">
            <h2 className="mb-2 text-xl font-semibold text-slate-900">TrumpRx $350 Program</h2>
            <p className="mb-3 text-sm text-slate-600">
              Some states offer a $350/month cap for eligible GLP-1 prescriptions. Eligibility, application steps, and
              limitations vary by state.
            </p>
            <Link href="/trumprx" className="text-sm font-medium text-primary-600 underline hover:no-underline">
              Full state-by-state guide →
            </Link>
          </section>

          {/* HSA/FSA (summary + link to key terms) */}
          <section id="hsafsa" className="mb-10 scroll-mt-24">
            <h2 className="mb-2 text-xl font-semibold text-slate-900">HSA/FSA Eligibility</h2>
            <p className="mb-3 text-sm text-slate-600">
              Many GLP-1 medications and related costs are HSA/FSA eligible. Check your plan and use the price snapshot
              above to see savings with tax-advantaged accounts.
            </p>
            <Link href="#faq" className="text-sm font-medium text-primary-600 underline hover:no-underline">
              More in FAQ →
            </Link>
          </section>

          {/* Insurance Appeal (flowchart + short copy) */}
          <section className="mb-10">
            <h2 className="mb-2 text-xl font-semibold text-slate-900">Insurance Appeal: Step-by-Step</h2>
            <p className="mb-4 text-sm text-slate-600">
              If your plan denies coverage, you can often appeal. Many denials are overturned with medical necessity
              and following the plan&apos;s process.
            </p>
            <InsuranceAppealFlowchart />
          </section>

          {/* Appeal Letter Template + Appeal Center */}
          <section id="appeal" className="mb-10 scroll-mt-24">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">Appeal Letter Template</h2>
              <Link
                href="/cost-insurance/appeals"
                className="rounded-md border-2 border-primary-500 bg-white px-3 py-1.5 text-sm font-semibold text-primary-600 hover:bg-primary-50"
              >
                Appeal Center (by insurer) →
              </Link>
            </div>
            <p className="mb-3 text-sm text-slate-600">
              Sample letter below; your doctor should tailor and sign it. Copy to clipboard or use Appeal Center for
              by-insurer tips.
            </p>
            <AppealTemplateCopy />
          </section>

          {/* FAQ (top 5 + link) */}
          <section id="faq" className="mb-10 scroll-mt-24">
            <FAQSection items={FAQ_ITEMS.slice(0, 5)} showMoreLink />
          </section>
        </div>
      </div>
      <RelatedPages pages={getRelatedPagesFor('costInsurance')} />
    </>
  );
}

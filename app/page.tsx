import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterSignup from '@/components/NewsletterSignup';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import PopularPharmaciesBanner from '@/components/PopularPharmaciesBanner';
import HomeComparisonSection from '@/components/HomeComparisonSection';
import HomeFlowByRole from '@/components/HomeFlowByRole';

export const metadata: Metadata = {
  title: 'Rx Likewise | Same results, smarter choices',
  description:
    'GLP-1 cost: $0–$50/mo with insurance; $150–$350 compounded. Compare Ozempic, Wegovy, Mounjaro; check legitimacy & shortage. Rx Likewise.',
  openGraph: { url: 'https://www.rxlikewise.com' },
  alternates: { canonical: 'https://www.rxlikewise.com' },
};

export default function Home() {
  return (
    <div>
      {/* Hero: value prop + primary CTAs only */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-primary-100 via-white to-secondary-100">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-none bg-primary-500 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-none bg-secondary-500 blur-3xl" />
        </div>
        <div className="container-page relative section-pad">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <span className="text-sm font-medium text-primary-700">Trusted Healthcare Resource</span>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Rx Likewise: Same results, smarter choices
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                We help you navigate GLP-1 medications in the US—high prices, insurance denials, shortages, and information overload. Get real out-of-pocket estimates, compare options, and avoid scams.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-600"
                >
                  Estimate your cost
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 border-2 border-primary-500 bg-white px-6 py-3 text-sm font-semibold text-primary-500 transition-colors hover:bg-primary-50"
                >
                  Find your option
                </Link>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                US audience · Informational only · Not medical advice
              </p>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative h-full min-h-[400px] w-full overflow-hidden shadow-xl">
                <ImagePlaceholder
                  src="/images/banners/home-hero-banner.webp"
                  alt="Rx Likewise - GLP-1 cost calculator and medication guide: real cost, alternatives, and legitimacy"
                  width={600}
                  height={400}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 分流模块：按角色（有保险 / 无保险 / 不确定）快速导向深层页 */}
      <HomeFlowByRole />

      <HomeComparisonSection />

      {/* Banner: Estimate your cost */}
      <section id="tools" className="border-b border-gray-200 bg-gradient-to-br from-primary-50 via-white to-primary-50/50">
        <div className="container-page section-pad">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Estimate your cost
              </h2>
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
                Enter your insurance and medication to see a realistic out-of-pocket range. Compare brand, compounded, and savings options so you know what to expect before you fill.
              </p>
              <Link
                href="/calculator"
                className="mt-6 inline-flex items-center gap-2 bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-600"
              >
                Use cost calculator
              </Link>
            </div>
            <div className="relative h-56 w-full overflow-hidden rounded-none border border-primary-200 shadow-lg sm:h-64 lg:h-72">
              <ImagePlaceholder
                src="/images/banners/calculator-tool-banner.webp"
                alt="Out-of-pocket cost calculator for GLP-1 medications"
                width={600}
                height={288}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Banner: Find your option */}
      <section className="border-b border-gray-200 bg-gradient-to-br from-secondary-50/50 via-white to-secondary-50">
        <div className="container-page section-pad">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="order-2 lg:order-1">
              <div className="relative h-56 w-full overflow-hidden rounded-none border border-secondary-200 shadow-lg sm:h-64 lg:h-72">
                <ImagePlaceholder
                  src="/images/banners/quiz-tool-banner.webp"
                  alt="Find your GLP-1 option - personalized quiz"
                  width={600}
                  height={288}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Find your option
              </h2>
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
                Answer a few questions about budget, preference (injection vs oral), and goals. Get personalized suggestions—brand, compounded, or telehealth—that fit your situation.
              </p>
              <Link
                href="/quiz"
                className="mt-6 inline-flex items-center gap-2 bg-secondary-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-secondary-600"
              >
                Start the quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PopularPharmaciesBanner />

      {/* Single "Explore" section: 4 hubs (merged from We help + Content & Tools) */}
      <section id="explore" className="border-b border-gray-200 bg-gray-50">
        <div className="container-page section-pad">
          <h2 className="text-xl font-semibold text-gray-900">Explore</h2>
          <p className="mt-1 text-sm text-gray-600">Guides on alternatives, cost & insurance, legitimacy, and tools.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/alternatives"
              className="flex flex-col overflow-hidden rounded-none border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow"
            >
              <span className="text-sm font-medium text-gray-900">Alternatives</span>
              <p className="mt-1 text-xs text-gray-600">Brand vs compounded, oral vs injection.</p>
              <span className="mt-2 text-xs font-semibold text-primary-500">Learn more</span>
            </Link>
            <Link
              href="/cost-insurance"
              className="flex flex-col overflow-hidden rounded-none border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow"
            >
              <span className="text-sm font-medium text-gray-900">Cost & Insurance</span>
              <p className="mt-1 text-xs text-gray-600">Discount cards, appeal templates.</p>
              <span className="mt-2 text-xs font-semibold text-secondary-500">Learn more</span>
            </Link>
            <Link
              href="/legitimacy"
              className="flex flex-col overflow-hidden rounded-none border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow"
            >
              <span className="text-sm font-medium text-gray-900">Legitimacy</span>
              <p className="mt-1 text-xs text-gray-600">Pharmacy red flags, FDA shortage.</p>
              <span className="mt-2 text-xs font-semibold text-primary-500">Learn more</span>
            </Link>
            <Link
              href="/legitimacy/shortage"
              className="flex flex-col overflow-hidden rounded-none border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow"
            >
              <span className="text-sm font-medium text-gray-900">FDA Shortage</span>
              <p className="mt-1 text-xs text-gray-600">Current shortage status.</p>
              <span className="mt-2 text-xs font-semibold text-primary-500">Check status</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ preview: short list + link to full FAQ */}
      <section id="faq-preview" className="border-b border-gray-200 bg-white">
        <div className="container-page section-pad-tight">
          <h2 className="text-lg font-semibold text-gray-900">Frequently asked</h2>
          <p className="mt-1 text-sm text-gray-600">
            Full list on our <Link href="/faq" className="font-medium text-gray-900 underline hover:no-underline">FAQ</Link> page.
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/faq#cost-overview" className="block rounded-none border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:border-gray-300 hover:bg-gray-100">
                How much do GLP-1 medications cost?
              </Link>
            </li>
            <li>
              <Link href="/faq#insurance-denial" className="block rounded-none border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:border-gray-300 hover:bg-gray-100">
                My insurance denied coverage. What can I do?
              </Link>
            </li>
            <li>
              <Link href="/faq#fda-shortage" className="block rounded-none border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:border-gray-300 hover:bg-gray-100">
                Why is there a shortage? Where can I check?
              </Link>
            </li>
            <li>
              <Link href="/faq#compounded-safe" className="block rounded-none border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:border-gray-300 hover:bg-gray-100">
                Is compounded semaglutide safe?
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Newsletter + CTA before global Footer (Quick links live in Footer) */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container-page section-pad-tight">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-sm">
              <h2 className="text-lg font-semibold text-gray-900">Get updates</h2>
              <p className="mt-1 text-sm text-gray-600">Cost tips, shortage alerts, new guides (no spam).</p>
              <div className="mt-4">
                <NewsletterSignup />
              </div>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-base font-semibold text-gray-900">Not sure where to start?</p>
              <Link
                href="/quiz"
                className="mt-3 inline-flex items-center gap-2 bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-600"
              >
                Take the quiz
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

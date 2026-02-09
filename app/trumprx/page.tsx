import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import PageCTA from '@/components/PageCTA';
import RelatedPages from '@/components/RelatedPages';
import { getRelatedPagesFor } from '@/lib/related-pages-data';
import { CheckCircle2, Clock, XCircle, ExternalLink, MapPin } from 'lucide-react';
import { TRUMPRX_STATES, getActiveStates, getPendingStates, TRUMPRX_LAST_UPDATED, type TrumpRxStatus } from './trumprx-data';
import TrumpRxStateMap from './TrumpRxStateMap';
import TrumpRxChangeDetector from './TrumpRxChangeDetector';

export const metadata: Metadata = {
  title: 'TrumpRx $350 Program 2026 | State-by-State Guide & Eligibility',
  description:
    'TrumpRx $350: eligible people may get GLP-1s capped ~$350/mo by state. State-by-state guide, eligibility, application. Rx Likewise.',
  keywords:
    'TrumpRx $350, TrumpRx program 2026, GLP-1 $350 cap, state drug pricing program, affordable GLP-1 medications',
  openGraph: {
    title: 'TrumpRx $350 Program 2026 | State Guide',
    description: 'Check if your state offers TrumpRx $350 program for GLP-1 medications. Eligibility and application guide.',
  },
};

function buildFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the TrumpRx $350 program?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The TrumpRx $350 program caps monthly GLP-1 medication costs at $350 for eligible uninsured or underinsured individuals. The program is implemented state-by-state starting in 2026.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which states have TrumpRx $350 program?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'As of January 2026, California, Texas, New York, Pennsylvania, and North Carolina have active programs. Several other states have pending legislation. Check our state-by-state guide for the latest status.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I apply for TrumpRx $350 program?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visit your state health department website or use the application link provided for your state. You will need proof of income, insurance status, and a prescription from a licensed physician.',
        },
      },
    ],
  };
}

function getStatusIcon(status: TrumpRxStatus) {
  switch (status) {
    case 'active':
      return <CheckCircle2 className="h-5 w-5 text-primary-600" />;
    case 'pending':
      return <Clock className="h-5 w-5 text-amber-600" />;
    case 'not-available':
      return <XCircle className="h-5 w-5 text-slate-400" />;
  }
}

function getStatusBadge(status: TrumpRxStatus) {
  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center gap-1 rounded-none bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700">
          <CheckCircle2 className="h-3 w-3" />
          Active
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1 rounded-none bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
          <Clock className="h-3 w-3" />
          Pending
        </span>
      );
    case 'not-available':
      return (
        <span className="inline-flex items-center gap-1 rounded-none bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
          <XCircle className="h-3 w-3" />
          Not Available
        </span>
      );
  }
}

export default function TrumpRxPage() {
  const activeStates = getActiveStates();
  const pendingStates = getPendingStates();
  const notAvailableStates = TRUMPRX_STATES.filter((s) => s.status === 'not-available');
  const faqSchema = buildFAQSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-gradient-to-b from-white to-secondary-50/20">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b-2 border-secondary-100 bg-gradient-to-br from-secondary-50 via-white to-primary-50">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-none bg-secondary-500 blur-3xl" />
          </div>
          <div className="container-page section-pad relative">
            <Breadcrumbs items={[{ label: 'TrumpRx $350 Program' }]} />
            <div className="hero-content max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-none bg-secondary-500 p-3 shadow-lg">
                  <span className="text-xl font-bold text-white">$350</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                    TrumpRx $350 Program 2026
                  </h1>
                  <p className="mt-2 text-base leading-relaxed text-slate-600 sm:text-lg">
                    State-by-state guide to the TrumpRx $350 program. Check if your state offers a $350/month cap on GLP-1
                    medications for eligible individuals.
                  </p>
                  <div className="mt-4">
                    <LastUpdated date={TRUMPRX_LAST_UPDATED} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="rounded-none border-2 border-secondary-200 bg-gradient-to-br from-secondary-50 to-secondary-100/50 px-5 py-3 shadow-sm">
                <p className="text-base font-bold text-secondary-900">
                  {activeStates.length} States Active
                </p>
                <p className="text-xs font-medium text-secondary-700">{pendingStates.length} States Pending</p>
              </div>
              <div className="rounded-none border-2 border-primary-200 bg-gradient-to-br from-white to-primary-50/30 px-5 py-3 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Last Updated</p>
                <p className="text-xs font-medium text-slate-600">
                  {new Date(TRUMPRX_LAST_UPDATED).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick links: flat structure */}
        <div className="container-page py-4">
          <div className="rounded-none border border-primary-200 bg-primary-50/50 px-4 py-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Quick links</p>
            <ul className="flex flex-wrap gap-2">
              <li><Link href="/cost-insurance" className="rounded-none border border-primary-300 bg-white px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50">Cost & Insurance</Link></li>
              <li><Link href="/calculator" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Calculator</Link></li>
              <li><Link href="/cost-insurance/appeals" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Appeal Center</Link></li>
              <li><Link href="/alternatives" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Alternatives</Link></li>
            </ul>
          </div>
        </div>

        <div className="container-page section-pad">
          {/* Policy Change Detector */}
          <TrumpRxChangeDetector />

          {/* State Map Visualization */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Program Status by State</h2>
            <TrumpRxStateMap />
          </section>

          {/* Active States */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-secondary-500" />
              <h2 className="text-xl font-semibold text-slate-900">Active States ({activeStates.length})</h2>
            </div>
            <div className="space-y-4">
              {activeStates.map((state) => (
                <StateCard key={state.stateCode} state={state} />
              ))}
            </div>
          </section>

          {/* Pending States */}
          {pendingStates.length > 0 && (
            <section className="mb-12">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <h2 className="text-xl font-semibold text-slate-900">Pending States ({pendingStates.length})</h2>
              </div>
              <div className="space-y-4">
                {pendingStates.map((state) => (
                  <StateCard key={state.stateCode} state={state} />
                ))}
              </div>
            </section>
          )}

          {/* Not Available States */}
          {notAvailableStates.length > 0 && (
            <section className="mb-12">
              <div className="mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-slate-400" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Not Available ({notAvailableStates.length})
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {notAvailableStates.map((state) => (
                  <div
                    key={state.stateCode}
                    className="rounded-none border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{state.stateName}</p>
                        <p className="text-xs text-slate-600">{state.stateCode}</p>
                      </div>
                      {getStatusBadge(state.status)}
                    </div>
                    {state.notes && (
                      <p className="mt-2 text-xs text-slate-600">{state.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <PageCTA
            title="Estimate your cost and TrumpRx eligibility"
            ctaLabel="Use Calculator"
            ctaHref="/calculator"
          />
        </div>
      </div>
      <RelatedPages pages={getRelatedPagesFor('trumprx')} />
    </>
  );
}

function StateCard({ state }: { state: typeof TRUMPRX_STATES[0] }) {
  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-slate-400" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{state.stateName}</h3>
              <p className="text-sm text-slate-600">{state.stateCode}</p>
            </div>
            {getStatusBadge(state.status)}
          </div>

          {state.effectiveDate && (
            <div className="mt-3">
              <p className="text-sm text-slate-700">
                <strong>Effective Date:</strong> {new Date(state.effectiveDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          <div className="mt-4">
            <p className="text-sm font-semibold text-slate-900">Monthly Cap: ${state.monthlyCap}</p>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-slate-900">Eligibility Requirements:</p>
            <ul className="space-y-1">
              {state.eligibilityCriteria.map((criteria, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                  <span>{criteria}</span>
                </li>
              ))}
            </ul>
          </div>

          {state.notes && (
            <div className="mt-4 rounded-none border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs text-amber-900">{state.notes}</p>
            </div>
          )}

          {state.applicationLink && (
            <div className="mt-4">
              <a
                href={state.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-none bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                Apply Now
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

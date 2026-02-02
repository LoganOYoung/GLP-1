'use client';

import { useState } from 'react';
import Link from 'next/link';
import SmartFilterBar, { DEFAULT_FILTER, type FilterState } from './SmartFilterBar';
import PathComparisonTable from './PathComparisonTable';
import PharmacyLegitimacyRadar from './PharmacyLegitimacyRadar';
import StockTrackerWidget from './StockTrackerWidget';
import TelehealthPriceGrid from '@/components/TelehealthPriceGrid';
import TelehealthLocationFinder from '@/components/TelehealthLocationFinder';
import PriceStockAlert from '@/components/PriceStockAlert';

export default function AlternativesClient() {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  const hasFilter = filter.currentIssue || filter.preferForm || filter.budgetMax < 1000;
  const recommendation =
    filter.currentIssue === 'out-of-stock'
      ? 'We recommend compounded or oral alternatives when brand is out of stock.'
      : filter.currentIssue === 'too-expensive'
        ? 'We recommend compounded options for lower out-of-pocket cost.'
        : filter.currentIssue === 'insurance-denied'
          ? 'We recommend compounded or cash-pay options; many are HSA/FSA eligible.'
          : hasFilter
            ? 'Use the comparison table and pharmacy list below to find a fit.'
            : null;

  return (
    <div className="container-page section-pad-tight space-y-10">
      {/* 1. Smart Filter Bar */}
      <section aria-label="Filter options">
        <SmartFilterBar filter={filter} onFilterChange={setFilter} />
        {recommendation && (
          <p className="mt-3 rounded-none bg-secondary-50 px-4 py-2 text-sm text-secondary-800">
            {recommendation}
          </p>
        )}
      </section>

      {/* 2. Path Comparison Matrix (summary only; full table on /comparison) */}
      <section aria-labelledby="path-comparison-heading">
        <h2 id="path-comparison-heading" className="text-xl font-semibold text-slate-900">
          Three paths: Brand vs Compounded vs Oral
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Compounded and many oral options are <strong>HSA/FSA eligible</strong>—use pre-tax dollars.
        </p>
        <div className="mt-4">
          <PathComparisonTable />
        </div>
        <p className="mt-4 text-sm text-slate-600">
          <Link href="/comparison" className="font-medium text-primary-600 underline hover:no-underline">
            Full comparison (cost, efficacy, side effects) →
          </Link>
        </p>

        {/* Explicit path strip: where to go next */}
        <div className="mt-6 rounded-lg border border-primary-200 bg-primary-50/50 p-4">
          <p className="text-sm font-semibold text-slate-900">Where to go next</p>
          <ul className="mt-3 flex flex-wrap gap-3">
            <li>
              <Link
                href="/tools/dose-converter"
                className="inline-flex items-center rounded-md border border-primary-300 bg-white px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50"
              >
                Already have meds? Dose & conversion →
              </Link>
            </li>
            <li>
              <Link
                href="/legitimacy"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-gray-50"
              >
                Not sure about a pharmacy? Legitimacy & Labs →
              </Link>
            </li>
            <li>
              <Link
                href="/calculator"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-gray-50"
              >
                Check cost? Calculator & Cost & Insurance →
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 3. Platform prices + find by state (full cost breakdown on /cost-insurance) */}
      <section aria-labelledby="telehealth-prices-heading">
        <h2 id="telehealth-prices-heading" className="text-xl font-semibold text-slate-900">
          Telehealth platform prices at a glance
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Live pricing from major platforms. For insurance, discount cards, and full cost breakdown see{' '}
          <Link href="/cost-insurance" className="font-medium text-primary-600 underline hover:no-underline">
            Cost & Insurance
          </Link>
          .
        </p>
        <p className="mt-2 text-xs text-slate-500" role="note">
          We may earn a commission if you use certain links below. This does not change our editorial content.
        </p>
        <div className="mt-4">
          <TelehealthPriceGrid />
        </div>
        <h3 id="location-finder-heading" className="mt-8 text-lg font-semibold text-slate-900">
          Find platforms in your state
        </h3>
        <div className="mt-3">
          <TelehealthLocationFinder />
        </div>
      </section>

      {/* 4. Pharmacy / option cards */}
      <section aria-labelledby="pharmacy-radar-heading">
        <h2 id="pharmacy-radar-heading" className="text-xl font-semibold text-slate-900">
          Find your best option
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Compare platforms and pharmacies by price, form, and legitimacy. Side-effect and efficacy details:{' '}
          <Link href="/comparison" className="font-medium text-primary-600 underline hover:no-underline">
            Drug Comparison
          </Link>
          .
        </p>
        <p className="mt-2 text-xs text-slate-500" role="note">
          We may earn a commission if you use certain links below. This does not change our editorial content.
        </p>
        <div className="mt-4">
          <PharmacyLegitimacyRadar filter={filter} />
          <p className="mt-4 text-sm text-slate-600">
            <Link href="/legitimacy#verified-pharmacies" className="font-medium text-primary-600 underline hover:no-underline">
              See full list & how we verify →
            </Link>
            {' '}
            All verified pharmacies and the red/green checklist are on our Legitimacy page.
          </p>
        </div>
      </section>

      {/* 5. Stock tracker + dose converter teaser */}
      <section aria-label="Stock and dosing">
        <StockTrackerWidget />
        <div className="mt-6 rounded-lg border border-secondary-200 bg-secondary-50/50 p-4">
          <p className="text-sm font-semibold text-slate-900">Already have medication?</p>
          <p className="mt-1 text-sm text-slate-600">
            Convert brand doses to compounded units (Wegovy, Ozempic, Zepbound, Mounjaro) and match syringe markings.
          </p>
          <Link
            href="/tools/dose-converter"
            className="mt-3 inline-flex items-center rounded-md bg-secondary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-secondary-600"
          >
            Open Dose Converter →
          </Link>
        </div>
      </section>

      {/* 6. Price & Stock Alerts */}
      <section aria-labelledby="alerts-heading">
        <h2 id="alerts-heading" className="text-xl font-semibold text-slate-900">
          Price & stock alerts
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Get notified when prices drop or stock becomes available.
        </p>
        <div className="mt-4">
          <PriceStockAlert />
        </div>
      </section>
    </div>
  );
}

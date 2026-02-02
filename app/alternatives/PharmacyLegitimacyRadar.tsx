'use client';

import { useState } from 'react';
import { Shield, ExternalLink, ChevronDown, ChevronUp, BadgeCheck } from 'lucide-react';
import {
  PHARMACY_PARTNERS,
  AFFILIATE_REF,
  AFFILIATE_SOURCE,
  filterPharmaciesByFilter,
  type PharmacyPartner,
} from './alternatives-data';
import type { FilterState } from './SmartFilterBar';

type Props = {
  filter: FilterState;
};

export default function PharmacyLegitimacyRadar({ filter }: Props) {
  const pharmacyFilter = {
    budgetMin: filter.budgetMin,
    budgetMax: filter.budgetMax,
    preferForm: filter.preferForm,
  };
  const filtered = filterPharmaciesByFilter(PHARMACY_PARTNERS, pharmacyFilter);
  const hasActiveFilter = filter.budgetMax < 1000 || filter.preferForm !== '';

  return (
    <div className="rounded-none border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Pharmacy Legitimacy Radar</h2>
          <p className="mt-1 text-sm text-slate-600">
            Trust-verified 503A/503B licensed pharmacies. All pharmacies are verified through state boards and LegitScript certification.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-none bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700">
          <Shield className="h-4 w-4" />
          <span>Trust Verified</span>
        </div>
      </div>
      {hasActiveFilter && filtered.length > 0 && (
        <p className="mt-2 text-sm font-medium text-slate-700">
          Showing {filtered.length} option{filtered.length !== 1 ? 's' : ''} within your budget
          {filter.preferForm ? ` · ${filter.preferForm}` : ''} (sorted by lowest price).
        </p>
      )}
      {filtered.length === 0 ? (
        <div className="mt-4 rounded-none border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
          <p className="font-medium">No options match your current filters.</p>
          <p className="mt-1">
            Try increasing your budget above or clear &quot;Prefer Form&quot; to see all options.
          </p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ph) => (
            <PharmacyCard key={ph.id} pharmacy={ph} />
          ))}
        </div>
      )}
    </div>
  );
}

function PharmacyCard({ pharmacy }: { pharmacy: PharmacyPartner }) {
  const [open, setOpen] = useState(false);
  const eligibilityUrl = `${pharmacy.eligibilityUrl}${pharmacy.eligibilityUrl.includes('?') ? '&' : '?'}ref=${AFFILIATE_REF}&utm_source=${AFFILIATE_SOURCE}`;

  return (
    <div className="flex flex-col rounded-none border border-slate-200 bg-slate-50/50 transition hover:border-slate-300">
      <div className="flex items-start justify-between gap-2 p-4">
        <div className="flex items-start gap-2">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden />
          <div>
            <p className="font-medium text-slate-900">{pharmacy.name}</p>
            <p className="text-xs font-medium text-primary-600">{pharmacy.type}</p>
            <p className="mt-1 text-xs text-slate-600">
              ${pharmacy.priceMin}–${pharmacy.priceMax}/mo
            </p>
            {pharmacy.hsaFsaEligible && (
              <span className="mt-1 inline-flex items-center gap-1 rounded bg-primary-100 px-1.5 py-0.5 text-xs font-medium text-primary-800">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                HSA/FSA Eligible
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
          aria-expanded={open}
        >
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
          <p>
            <span className="font-medium text-slate-700">Form:</span>{' '}
            {pharmacy.form === 'both' ? 'Injection & oral' : pharmacy.form}
          </p>
          <p className="mt-1">
            <span className="font-medium text-slate-700">LegitScript:</span>{' '}
            <a
              href={pharmacy.legitScriptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary-600 hover:underline"
            >
              Verify certification <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </p>
          <p className="mt-1">
            <span className="font-medium text-slate-700">FDA registration:</span>{' '}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">
              {pharmacy.fdaRegistration}
            </code>
          </p>
          <p className="mt-2 flex items-center gap-2 text-xs text-primary-700">
            <BadgeCheck className="h-4 w-4 shrink-0" />
            <span>Verified by State Board of Pharmacy</span>
          </p>
          <p className="mt-1 flex items-center gap-2 text-xs text-primary-700">
            <BadgeCheck className="h-4 w-4 shrink-0" />
            <span>Active License Status</span>
          </p>
        </div>
      )}
      <div className="mt-auto border-t border-slate-200 p-4">
        <a
          href={eligibilityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-primary-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
        >
          Check Eligibility <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

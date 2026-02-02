'use client';

import { useState } from 'react';
import { Shield, ExternalLink, ChevronDown, ChevronUp, BadgeCheck } from 'lucide-react';
import {
  PHARMACY_PARTNERS,
  AFFILIATE_REF,
  type PharmacyPartner,
} from '@/app/alternatives/alternatives-data';

const UTM_SOURCE_LEGITIMACY = 'legitimacy';

export default function VerifiedPharmaciesSection() {
  return (
    <section
      id="verified-pharmacies"
      className="scroll-mt-24 border-t border-gray-200 bg-gray-50/50"
      aria-labelledby="verified-pharmacies-heading"
    >
      <div className="container-page section-pad">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 id="verified-pharmacies-heading" className="text-xl font-semibold text-gray-900">
              Verified pharmacies we track
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Trust-verified 503A/503B licensed pharmacies. All are verified through state boards and LegitScript certification. We do not endorse any single pharmacy—use the checklist above and verify yourself.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
            <Shield className="h-4 w-4" aria-hidden />
            <span>Trust Verified</span>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PHARMACY_PARTNERS.map((pharmacy) => (
            <VerifiedPharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VerifiedPharmacyCard({ pharmacy }: { pharmacy: PharmacyPartner }) {
  const [open, setOpen] = useState(false);
  const eligibilityUrl = `${pharmacy.eligibilityUrl}${pharmacy.eligibilityUrl.includes('?') ? '&' : '?'}ref=${AFFILIATE_REF}&utm_source=${UTM_SOURCE_LEGITIMACY}`;

  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-slate-300">
      <div className="flex items-start justify-between gap-2 p-4">
        <div className="flex items-start gap-2">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
          <div>
            <p className="font-medium text-slate-900">{pharmacy.name}</p>
            <p className="text-xs font-medium text-emerald-600">{pharmacy.type}</p>
            <p className="mt-1 text-xs text-slate-600">
              ${pharmacy.priceMin}–${pharmacy.priceMax}/mo
            </p>
            {pharmacy.hsaFsaEligible && (
              <span className="mt-1 inline-flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800">
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
              className="inline-flex items-center gap-1 text-emerald-600 hover:underline"
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
          <p className="mt-2 flex items-center gap-2 text-xs text-emerald-700">
            <BadgeCheck className="h-4 w-4 shrink-0" />
            <span>Verified by State Board of Pharmacy</span>
          </p>
          <p className="mt-1 flex items-center gap-2 text-xs text-emerald-700">
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
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Check Eligibility <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

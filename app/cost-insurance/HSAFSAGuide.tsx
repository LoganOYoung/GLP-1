'use client';

import Link from 'next/link';
import { CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { HSA_FSA_INFO } from './cost-insurance-data';

export default function HSAFSAGuide() {
  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">{HSA_FSA_INFO.title}</h2>
        <p className="mt-2 text-sm text-slate-700">{HSA_FSA_INFO.description}</p>
      </div>

      {/* Eligible Drugs */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">HSA/FSA Eligible GLP-1 Medications</h3>
        <div className="space-y-2">
          {HSA_FSA_INFO.eligibleDrugs.map((drug, index) => (
            <div
              key={index}
              className="flex items-start justify-between rounded-none border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900">{drug.name}</span>
                  {drug.eligible === true ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : drug.eligible === 'Maybe' ? (
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-slate-600">{drug.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Use */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">How to Use HSA/FSA</h3>
        <ul className="space-y-2">
          {HSA_FSA_INFO.howToUse.map((step, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-none bg-slate-200 text-xs font-semibold text-slate-700">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tax Benefits */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Tax Benefits</h3>
        <ul className="space-y-2">
          {HSA_FSA_INFO.taxBenefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Annual Limits */}
      <div className="mb-6 rounded-none border border-slate-200 bg-slate-50 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">2026 Annual Contribution Limits</h3>
        <div className="space-y-1 text-sm text-slate-700">
          <p>
            <strong>HSA:</strong> {HSA_FSA_INFO.annualLimits.hsa}
          </p>
          <p>
            <strong>FSA:</strong> {HSA_FSA_INFO.annualLimits.fsa}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-none border border-emerald-200 bg-emerald-50 p-4">
        <p className="mb-3 text-sm font-medium text-slate-900">
          Find HSA/FSA eligible options in our Alternatives comparison
        </p>
        <Link
          href="/alternatives"
          className="inline-flex items-center gap-2 rounded-none bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          View Alternatives
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { CheckCircle2, XCircle, ExternalLink } from 'lucide-react';
import { TRUMPRX_INFO } from './cost-insurance-data';

export default function TrumpRxGuide() {
  return (
    <div className="rounded-none border border-emerald-200 bg-emerald-50/50 p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">{TRUMPRX_INFO.name}</h2>
        <p className="mt-2 text-sm text-slate-700">{TRUMPRX_INFO.description}</p>
      </div>

      {/* Eligibility */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Eligibility Requirements</h3>
        <ul className="space-y-2">
          {TRUMPRX_INFO.eligibility.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* How to Apply */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">How to Apply</h3>
        <ol className="space-y-2">
          {TRUMPRX_INFO.howToApply.map((step, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-none bg-emerald-600 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Benefits</h3>
        <ul className="space-y-2">
          {TRUMPRX_INFO.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Limitations */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Limitations</h3>
        <ul className="space-y-2">
          {TRUMPRX_INFO.limitations.map((limitation, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
              <span>{limitation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="rounded-none border border-emerald-300 bg-white p-4">
        <p className="mb-3 text-sm font-medium text-slate-900">
          Estimate your eligibility and cost with our Calculator
        </p>
        <Link
          href="/calculator"
          className="inline-flex items-center gap-2 rounded-none bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Use Calculator
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

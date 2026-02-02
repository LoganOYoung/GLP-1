'use client';

import { CheckCircle2, AlertTriangle, Building2, FileText } from 'lucide-react';

export default function ComplianceFlowDiagram() {
  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Compounding Lab Compliance Flow</h2>
      <p className="mb-6 text-sm text-slate-600">
        Understanding the difference between 503A and 503B compounding facilities, and how to verify their credentials.
      </p>

      <div className="space-y-6">
        {/* 503A Flow */}
        <div className="rounded-none border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-slate-900">503A Compounding Pharmacy</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-primary-100 text-xs font-semibold text-primary-700">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">State Board Licensed</p>
                <p className="text-xs text-slate-600">Licensed by state board of pharmacy</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-primary-100 text-xs font-semibold text-primary-700">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Patient-Specific Prescription</p>
                <p className="text-xs text-slate-600">Requires prescription for each patient</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-primary-100 text-xs font-semibold text-primary-700">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">State Inspections</p>
                <p className="text-xs text-slate-600">Inspected by state board of pharmacy</p>
              </div>
            </div>
            <div className="mt-4 rounded-none border border-primary-200 bg-primary-50 p-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-primary-900">Verification</p>
                  <p className="text-xs text-primary-700">
                    Check license status on your state board of pharmacy website
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 503B Flow */}
        <div className="rounded-none border border-primary-200 bg-primary-50 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-slate-900">503B Outsourcing Facility</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-primary-100 text-xs font-semibold text-primary-700">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">FDA Registered</p>
                <p className="text-xs text-slate-600">Must register with FDA</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-primary-100 text-xs font-semibold text-primary-700">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">FDA Inspections</p>
                <p className="text-xs text-slate-600">Inspected by FDA (typically annually)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-primary-100 text-xs font-semibold text-primary-700">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Large-Scale Compounding</p>
                <p className="text-xs text-slate-600">Can compound without patient-specific prescriptions</p>
              </div>
            </div>
            <div className="mt-4 rounded-none border border-primary-200 bg-primary-100 p-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-primary-900">Verification</p>
                  <p className="text-xs text-primary-700">
                    Check FDA registration and inspection records on FDA website
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-2 text-left font-semibold text-slate-900">Feature</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-900">503A</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-900">503B</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-2 font-medium text-slate-700">Regulator</td>
                <td className="px-4 py-2 text-slate-600">State Board</td>
                <td className="px-4 py-2 text-slate-600">FDA</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-slate-700">Prescription Required</td>
                <td className="px-4 py-2 text-slate-600">Yes (per patient)</td>
                <td className="px-4 py-2 text-slate-600">Not always</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-slate-700">Scale</td>
                <td className="px-4 py-2 text-slate-600">Small to medium</td>
                <td className="px-4 py-2 text-slate-600">Large</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-slate-700">FDA Registration</td>
                <td className="px-4 py-2 text-slate-600">Not required</td>
                <td className="px-4 py-2 text-slate-600">Required</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-slate-700">Inspection Frequency</td>
                <td className="px-4 py-2 text-slate-600">Varies by state</td>
                <td className="px-4 py-2 text-slate-600">Typically annual</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-6 rounded-none border border-primary-200 bg-primary-50 p-4">
          <div className="flex items-start gap-2">
            <FileText className="h-5 w-5 shrink-0 text-primary-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-primary-900">View Full Lab Database</p>
              <p className="mt-1 text-xs text-primary-700">
                See FDA inspection records and credentials for all compounding labs used by Telehealth platforms.
              </p>
              <a
                href="/labs"
                className="mt-2 inline-block text-xs font-medium text-primary-700 underline hover:no-underline"
              >
                Browse Lab Database →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

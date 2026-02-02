'use client';

import { Check, AlertCircle } from 'lucide-react';
import { PATH_COMPARISON_ROWS } from './alternatives-data';

const statusConfig = {
  good: { Icon: Check, className: 'text-secondary-500' },
  neutral: { Icon: Check, className: 'text-slate-500' },
  alert: { Icon: AlertCircle, className: 'text-accent-amber-500' },
  high: { Icon: AlertCircle, className: 'text-slate-500' },
  varies: { Icon: Check, className: 'text-slate-500' },
} as const;

export default function PathComparisonTable() {
  return (
    <div className="overflow-hidden rounded-none border-2 border-primary-100 bg-white shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b-2 border-primary-200 bg-gradient-to-r from-primary-50 to-secondary-50">
              <th className="px-6 py-4 text-base font-bold text-slate-900">Criteria</th>
              <th className="px-6 py-4 text-base font-bold text-slate-900">Brand Name</th>
              <th className="relative bg-secondary-50/70 px-6 pt-8 pb-4 text-base font-bold text-slate-900">
                <span className="absolute left-0 right-0 top-0 rounded-none bg-gradient-to-r from-secondary-500 to-secondary-600 py-2 text-center text-xs font-bold uppercase tracking-wide text-white shadow-md">
                  Best Value
                </span>
                Compounded
              </th>
              <th className="px-6 py-4 text-base font-bold text-slate-900">Oral Pills</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {PATH_COMPARISON_ROWS.map((row, index) => (
              <tr
                key={row.id}
                className={`transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-primary-50/20'
                } hover:bg-primary-50/40`}
              >
                <td className="px-6 py-4 font-semibold text-slate-900">{row.label}</td>
                <td className="px-6 py-4">
                  <CellContent value={row.brand.value} status={row.brand.status} />
                </td>
                <td className="relative bg-secondary-50/40 px-6 py-4">
                  <CellContent value={row.compounded.value} status={row.compounded.status} />
                </td>
                <td className="px-6 py-4">
                  <CellContent value={row.oral.value} status={row.oral.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CellContent({
  value,
  status,
}: {
  value: string;
  status: 'good' | 'neutral' | 'alert' | 'high' | 'varies';
}) {
  const { Icon, className } = statusConfig[status];
  return (
    <span className="flex items-center gap-2">
      <Icon className={`h-4 w-4 shrink-0 ${className}`} aria-hidden />
      <span className="text-slate-700">{value}</span>
    </span>
  );
}

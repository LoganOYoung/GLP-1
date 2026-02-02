'use client';

import { SIDE_EFFECT_PROFILING } from './alternatives-data';

export default function SideEffectProfiling() {
  return (
    <div className="rounded-none border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Side Effect Profiling</h2>
      <p className="mt-1 text-sm text-slate-600">
        Not all alternatives are the same. User-reported differences in nausea and fatigue by formulation.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-semibold text-slate-900">Formulation</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Nausea</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Fatigue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {SIDE_EFFECT_PROFILING.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900">{row.formulation}</td>
                <td className="px-4 py-3 text-slate-700">{row.nausea}</td>
                <td className="px-4 py-3 text-slate-700">{row.fatigue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

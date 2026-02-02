'use client';

import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { DOSE_TO_UNITS_MAP } from './alternatives-data';

export default function SwitchingGuideCalculator() {
  const [doseMg, setDoseMg] = useState<string>('1.7');
  const num = useMemo(() => parseFloat(doseMg.replace(/,/g, '.')), [doseMg]);
  const match = useMemo(
    () =>
      Number.isFinite(num) && num > 0
        ? DOSE_TO_UNITS_MAP.find((r) => r.brandDoseMg === num) ??
          DOSE_TO_UNITS_MAP.reduce((best, r) =>
            Math.abs(r.brandDoseMg - num) < Math.abs(best.brandDoseMg - num) ? r : best
          )
        : null,
    [num]
  );

  return (
    <div className="rounded-none border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Switching Guide</h2>
      <p className="mt-1 text-sm text-slate-600">
        Enter your current brand dose (e.g. Wegovy 1.7mg) to see the equivalent compounded units.
      </p>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="dose-mg" className="mb-1 block text-xs font-medium text-slate-600">
            Brand dose (mg)
          </label>
          <input
            id="dose-mg"
            type="text"
            inputMode="decimal"
            value={doseMg}
            onChange={(e) => setDoseMg(e.target.value)}
            placeholder="e.g. 1.7"
            className="w-full rounded-none border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center gap-2 text-slate-500 sm:pb-0.5">
          <Calculator className="h-5 w-5 shrink-0 text-primary-600" aria-hidden />
          {match ? (
            <p className="text-sm font-medium text-slate-900">
              ≈ <strong>{match.compoundedUnits}</strong> units (compounded)
              <span className="ml-1 text-slate-500">({match.brandName} {match.brandDoseMg}mg)</span>
            </p>
          ) : (
            <p className="text-sm text-slate-500">Enter a dose to see equivalent.</p>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        This is an estimate. Always confirm dosing with your prescriber and pharmacy.
      </p>
    </div>
  );
}

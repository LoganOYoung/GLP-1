'use client';

import { useCallback } from 'react';
import type { CurrentIssue, PreferForm } from './alternatives-data';

export type FilterState = {
  currentIssue: CurrentIssue | '';
  preferForm: PreferForm | '';
  budgetMin: number;
  budgetMax: number;
};

const BUDGET_MIN = 100;
const BUDGET_MAX = 1000;
const BUDGET_STEP = 50;

type Props = {
  filter: FilterState;
  onFilterChange: (next: FilterState) => void;
};

export default function SmartFilterBar({ filter, onFilterChange }: Props) {
  const setIssue = useCallback(
    (v: CurrentIssue | '') => {
      onFilterChange({ ...filter, currentIssue: v });
    },
    [filter, onFilterChange]
  );
  const setForm = useCallback(
    (v: PreferForm) => {
      onFilterChange({ ...filter, preferForm: filter.preferForm === v ? '' : v });
    },
    [filter, onFilterChange]
  );
  const setBudget = useCallback(
    (min: number, max: number) => {
      onFilterChange({ ...filter, budgetMin: min, budgetMax: max });
    },
    [filter, onFilterChange]
  );

  return (
    <div className="rounded-none border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="mb-4 text-sm font-medium text-slate-900">Find your fit</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        {/* Current Issue */}
        <div className="min-w-0 flex-1 sm:max-w-[220px]">
          <label htmlFor="current-issue" className="mb-1 block text-xs font-medium text-slate-600">
            Current Issue
          </label>
          <select
            id="current-issue"
            value={filter.currentIssue}
            onChange={(e) => setIssue((e.target.value as CurrentIssue) || '')}
            className="w-full rounded-none border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Select…</option>
            <option value="out-of-stock">I&apos;m out of stock</option>
            <option value="too-expensive">Too expensive</option>
            <option value="insurance-denied">Insurance denied</option>
          </select>
        </div>

        {/* Prefer Form */}
        <div>
          <span className="mb-1 block text-xs font-medium text-slate-600">Prefer Form</span>
          <div className="flex rounded-none border border-slate-300 bg-slate-50 p-0.5">
            <button
              type="button"
              onClick={() => setForm('injection')}
              className={`rounded-none px-3 py-2 text-sm font-medium transition ${
                filter.preferForm === 'injection'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Injection
            </button>
            <button
              type="button"
              onClick={() => setForm('oral')}
              className={`rounded-none px-3 py-2 text-sm font-medium transition ${
                filter.preferForm === 'oral'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Oral Pill
            </button>
          </div>
        </div>

        {/* Budget Slider (range display + inputs) */}
        <div className="min-w-0 flex-1 sm:max-w-[280px]">
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Budget: ${filter.budgetMin} – ${filter.budgetMax === BUDGET_MAX ? '1,000+' : filter.budgetMax}/mo
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={BUDGET_MIN}
              max={BUDGET_MAX}
              step={BUDGET_STEP}
              value={filter.budgetMax}
              onChange={(e) =>
                setBudget(
                  filter.budgetMin,
                  Math.max(Number(e.target.value), filter.budgetMin)
                )
              }
              className="h-2 flex-1 appearance-none rounded-none bg-slate-200 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:bg-emerald-600"
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>$100</span>
            <span>$1,000+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const DEFAULT_FILTER: FilterState = {
  currentIssue: '',
  preferForm: '',
  budgetMin: BUDGET_MIN,
  budgetMax: BUDGET_MAX,
};

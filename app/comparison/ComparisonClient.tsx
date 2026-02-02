'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import {
  COMPARISON_ROWS,
  COMPARISON_SOURCES,
  type ComparisonRow,
} from './comparison-data';

type ViewMode = 'weight' | 'cost' | 'sidefx';

function Tooltip({ label, content }: { label: string; content: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="text-gray-400 hover:text-gray-600"
        aria-label={`Info: ${label}`}
      >
        <HelpCircle className="h-4 w-4" />
      </button>
      {show && (
        <span className="absolute left-0 top-full z-10 mt-1 max-w-xs rounded border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-700 shadow-lg">
          {content}
        </span>
      )}
    </span>
  );
}

function bestMatchRow(
  rows: ComparisonRow[],
  budgetMonthly: number | null,
  bmi: number | null
): string | null {
  const budget = budgetMonthly != null && !Number.isNaN(budgetMonthly) ? budgetMonthly : null;
  const b = bmi != null && !Number.isNaN(bmi) ? bmi : null;
  if (budget == null && b == null) return null;
  let best = rows[0];
  let bestScore = -1;
  for (const row of rows) {
    let score = 0;
    if (budget != null) {
      if (row.costSort <= budget) score += 2;
      else score -= Math.min(2, (row.costSort - budget) / 200);
    }
    if (b != null) {
      if (b >= 30 && row.weightLossSort >= 18) score += 2;
      else if (b >= 27 && row.weightLossSort >= 14) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = row;
    }
  }
  return best.id;
}

export default function ComparisonClient() {
  const [viewMode, setViewMode] = useState<ViewMode>('cost');
  const [budgetInput, setBudgetInput] = useState('');
  const [bmiInput, setBmiInput] = useState('');

  const budget = budgetInput === '' ? null : parseInt(budgetInput, 10);
  const bmi = bmiInput === '' ? null : parseFloat(bmiInput);
  const highlightId = useMemo(
    () =>
      (budget != null && !Number.isNaN(budget)) || (bmi != null && !Number.isNaN(bmi))
        ? bestMatchRow(COMPARISON_ROWS, Number.isNaN(budget!) ? null : budget!, Number.isNaN(bmi!) ? null : bmi!)
        : null,
    [budget, bmi]
  );

  const sortedRows = useMemo(() => {
    const copy = [...COMPARISON_ROWS];
    if (viewMode === 'cost') copy.sort((a, b) => a.costSort - b.costSort);
    else if (viewMode === 'weight') copy.sort((a, b) => b.weightLossSort - a.weightLossSort);
    else copy.sort((a, b) => a.id.localeCompare(b.id));
    return copy;
  }, [viewMode]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* View Toggle */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Compare by:</span>
        {[
          { id: 'weight' as ViewMode, label: 'Weight loss %' },
          { id: 'cost' as ViewMode, label: 'Monthly cost' },
          { id: 'sidefx' as ViewMode, label: 'Side effect frequency' },
        ].map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setViewMode(id)}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
              viewMode === id
                ? 'border-primary-500 bg-primary-500 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Personalized filter */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm font-semibold text-gray-900">Personalized recommendation</p>
        <p className="mt-0.5 text-xs text-gray-600">
          Enter your monthly budget and BMI to highlight the best-matching option.
        </p>
        <div className="mt-3 flex flex-wrap gap-4">
          <label className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600">Monthly budget ($)</span>
            <input
              type="number"
              min={0}
              max={2000}
              placeholder="e.g. 300"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600">BMI</span>
            <input
              type="number"
              min={18}
              max={60}
              step={0.1}
              placeholder="e.g. 32"
              value={bmiInput}
              onChange={(e) => setBmiInput(e.target.value)}
              className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
            />
          </label>
        </div>
      </div>

      {/* Comparison table (sticky header) */}
      <div className="overflow-x-auto rounded-lg border-2 border-gray-200 shadow-md">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 z-10 border-b-2 border-gray-200 bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-bold text-gray-900">Active ingredient</th>
              <th className="px-4 py-3 font-bold text-gray-900">Brand names</th>
              <th className="px-4 py-3 font-bold text-gray-900">
                <span className="inline-flex items-center gap-1">
                  2026 est. cost
                  <Tooltip label="Cost" content="Estimated monthly out-of-pocket range in 2026 (US). Brand may be lower with insurance or TrumpRx." />
                </span>
              </th>
              <th className="px-4 py-3 font-bold text-gray-900">
                <span className="inline-flex items-center gap-1">
                  FDA status
                  <Tooltip label="FDA" content="FDA-approved for weight or diabetes; 503A/503B = licensed compounding during shortage." />
                </span>
              </th>
              <th className="px-4 py-3 font-bold text-gray-900">
                <span className="inline-flex items-center gap-1">
                  Dosage form
                  <Tooltip label="Form" content="Pen = prefilled injector; Vial = pharmacy-compounded injection; Pill = oral daily." />
                </span>
              </th>
              <th className="px-4 py-3 font-bold text-gray-900">Expected weight loss (1 yr)</th>
              <th className="px-4 py-3 font-bold text-gray-900">Nausea</th>
              <th className="px-4 py-3 font-bold text-gray-900">Fatigue</th>
              <th className="px-4 py-3 font-bold text-gray-900">Muscle loss note</th>
              <th className="px-4 py-3 font-bold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {sortedRows.map((row) => (
              <tr
                key={row.id}
                className={
                  highlightId === row.id
                    ? 'bg-primary-50 ring-1 ring-primary-300'
                    : 'hover:bg-gray-50'
                }
              >
                <td className="px-4 py-3 font-medium text-gray-900">{row.activeIngredient}</td>
                <td className="px-4 py-3 text-gray-700">{row.brandNames}</td>
                <td className="px-4 py-3 text-gray-700">{row.cost2026}</td>
                <td className="px-4 py-3 text-gray-700">{row.fdaStatus}</td>
                <td className="px-4 py-3 text-gray-700">{row.dosageForm}</td>
                <td className="px-4 py-3 text-gray-700">{row.weightLoss1yr}</td>
                <td className="px-4 py-3 text-gray-700">{row.nauseaPct}</td>
                <td className="px-4 py-3 text-gray-700">{row.fatiguePct}</td>
                <td className="max-w-[140px] px-4 py-3 text-xs text-gray-600">{row.muscleLossNote}</td>
                <td className="px-4 py-3">
                  {row.slug ? (
                    <Link
                      href={`/drugs/${row.slug}`}
                      className="font-medium text-primary-600 hover:underline"
                    >
                      View
                    </Link>
                  ) : (
                    <Link
                      href="/alternatives"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Explore
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sources & References */}
      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-gray-900">Sources & references</h2>
        <p className="mt-1 text-xs text-gray-600">
          Clinical and regulatory references (2025–2026). This page is for information only; discuss with your prescriber.
        </p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-gray-700">
          {COMPARISON_SOURCES.map((src) => (
            <li key={src.id} className="pl-2">
              {src.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

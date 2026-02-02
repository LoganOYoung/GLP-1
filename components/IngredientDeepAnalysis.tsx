'use client';

import { useState } from 'react';
import { Beaker, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import {
  FORMULATION_ANALYSES,
  getFormulationById,
  compareFormulations,
  type FormulationAnalysis,
} from '@/lib/ingredient-data';

export default function IngredientDeepAnalysis() {
  const [selectedFormulation, setSelectedFormulation] = useState<string>('');
  const [compareMode, setCompareMode] = useState(false);
  const [compareFormulation1, setCompareFormulation1] = useState<string>('');
  const [compareFormulation2, setCompareFormulation2] = useState<string>('');

  const formulation = selectedFormulation ? getFormulationById(selectedFormulation) : null;
  const comparison =
    compareMode && compareFormulation1 && compareFormulation2
      ? compareFormulations(compareFormulation1, compareFormulation2)
      : null;

  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Ingredient Deep Analysis</h2>
        <p className="mt-1 text-sm text-slate-600">
          Detailed composition breakdown: active ingredients, preservatives, additives, and safety information.
        </p>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setCompareMode(false)}
          className={`rounded-none border px-3 py-2 text-sm font-medium transition ${
            !compareMode
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          View Single
        </button>
        <button
          type="button"
          onClick={() => setCompareMode(true)}
          className={`rounded-none border px-3 py-2 text-sm font-medium transition ${
            compareMode
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          Compare Two
        </button>
      </div>

      {!compareMode ? (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700">Select Formulation</label>
            <select
              value={selectedFormulation}
              onChange={(e) => setSelectedFormulation(e.target.value)}
              className="mt-1 block w-full rounded-none border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="">Choose a formulation...</option>
              {FORMULATION_ANALYSES.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {formulation && <FormulationDetail formulation={formulation} />}
        </>
      ) : (
        <>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Formulation 1</label>
              <select
                value={compareFormulation1}
                onChange={(e) => setCompareFormulation1(e.target.value)}
                className="mt-1 block w-full rounded-none border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="">Choose...</option>
                {FORMULATION_ANALYSES.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Formulation 2</label>
              <select
                value={compareFormulation2}
                onChange={(e) => setCompareFormulation2(e.target.value)}
                className="mt-1 block w-full rounded-none border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="">Choose...</option>
                {FORMULATION_ANALYSES.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {comparison && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormulationDetail formulation={comparison.formulation1} />
                <FormulationDetail formulation={comparison.formulation2} />
              </div>
              <div className="rounded-none border border-primary-200 bg-primary-50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-primary-900">Key Differences</h3>
                <ul className="space-y-1 text-xs text-primary-800">
                  {comparison.differences.activeIngredient && (
                    <li>• Different active ingredients</li>
                  )}
                  {comparison.differences.preservatives && (
                    <li>• Different preservatives</li>
                  )}
                  {comparison.differences.additives && (
                    <li>• Different additives (e.g., B12)</li>
                  )}
                  {comparison.differences.ph && (
                    <li>• Different pH levels</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FormulationDetail({ formulation }: { formulation: FormulationAnalysis }) {
  return (
    <div className="rounded-none border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Beaker className="h-5 w-5 text-primary-600" />
        <h3 className="text-base font-semibold text-slate-900">{formulation.name}</h3>
        <span className="rounded-none bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">
          {formulation.type}
        </span>
      </div>

      <div className="mb-4 rounded-none border border-primary-200 bg-primary-50 p-3">
        <p className="mb-1 text-xs font-semibold text-primary-900">Active Ingredient</p>
        <p className="text-sm font-medium text-primary-800">{formulation.activeIngredient.name}</p>
        <p className="text-xs text-primary-700">
          Concentration: {formulation.activeIngredient.concentration}
        </p>
        <p className="text-xs text-primary-700">Purity: {formulation.activeIngredient.purity}</p>
      </div>

      {formulation.additives && formulation.additives.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold text-slate-900">Additives</p>
          <div className="space-y-2">
            {formulation.additives.map((additive, idx) => (
              <div key={idx} className="rounded-none border border-slate-200 bg-white p-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{additive.name}</p>
                    {additive.concentration && (
                      <p className="text-xs text-slate-600">Concentration: {additive.concentration}</p>
                    )}
                    <p className="text-xs text-slate-600">{additive.purpose}</p>
                    {additive.notes && (
                      <p className="mt-1 text-xs text-slate-500">{additive.notes}</p>
                    )}
                  </div>
                  {additive.safety === 'safe' ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-600" />
                  ) : additive.safety === 'caution' ? (
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                  ) : (
                    <Info className="h-4 w-4 shrink-0 text-slate-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {formulation.preservatives && formulation.preservatives.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold text-slate-900">Preservatives</p>
          <div className="space-y-2">
            {formulation.preservatives.map((preservative, idx) => (
              <div key={idx} className="rounded-none border border-slate-200 bg-white p-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{preservative.name}</p>
                    {preservative.percentage && (
                      <p className="text-xs text-slate-600">{preservative.percentage}%</p>
                    )}
                    <p className="text-xs text-slate-600">{preservative.purpose}</p>
                    {preservative.notes && (
                      <p className="mt-1 text-xs text-amber-700">{preservative.notes}</p>
                    )}
                  </div>
                  {preservative.safety === 'safe' ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold text-slate-900">Inactive Ingredients</p>
        <div className="space-y-1">
          {formulation.inactiveIngredients.map((ingredient, idx) => (
            <div key={idx} className="flex items-start justify-between text-xs">
              <div className="flex-1">
                <span className="font-medium text-slate-900">{ingredient.name}</span>
                {ingredient.percentage && (
                  <span className="ml-2 text-slate-600">({ingredient.percentage}%)</span>
                )}
                <span className="ml-2 text-slate-600">- {ingredient.purpose}</span>
              </div>
              {ingredient.safety === 'safe' ? (
                <CheckCircle2 className="h-3 w-3 shrink-0 text-primary-600" />
              ) : ingredient.safety === 'caution' ? (
                <AlertTriangle className="h-3 w-3 shrink-0 text-amber-600" />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {formulation.ph && (
        <div className="mb-2 text-xs text-slate-600">
          <strong>pH:</strong> {formulation.ph}
        </div>
      )}

      {formulation.notes && (
        <div className="mt-3 rounded-none border border-amber-200 bg-amber-50 p-2">
          <p className="text-xs text-amber-900">
            <strong>Note:</strong> {formulation.notes}
          </p>
        </div>
      )}
    </div>
  );
}

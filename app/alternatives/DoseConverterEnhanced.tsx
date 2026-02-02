'use client';

import { useState, useMemo } from 'react';
import { Calculator, ArrowRightLeft, Syringe, Pill } from 'lucide-react';
import {
  DOSE_TO_UNITS_MAP,
  TIRZEPATIDE_DOSE_MAP,
  COMMON_DOSES,
  type DoseConversion,
  type DrugType,
} from './alternatives-data';
import SyringeVisualization from './SyringeVisualization';

type ConversionMode = 'brand-to-compounded' | 'compounded-to-brand' | 'brand-to-oral' | 'oral-to-brand';

export default function DoseConverterEnhanced() {
  const [conversionMode, setConversionMode] = useState<ConversionMode>('brand-to-compounded');
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedDrug, setSelectedDrug] = useState<DrugType>('semaglutide');

  const doseMap = selectedDrug === 'semaglutide' ? DOSE_TO_UNITS_MAP : TIRZEPATIDE_DOSE_MAP;
  const commonDoses = selectedDrug === 'semaglutide' ? COMMON_DOSES.semaglutide : COMMON_DOSES.tirzepatide;

  const result = useMemo(() => {
    const num = parseFloat(inputValue.replace(/,/g, '.'));
    if (!Number.isFinite(num) || num <= 0) return null;

    switch (conversionMode) {
      case 'brand-to-compounded': {
        const match =
          doseMap.find((r) => r.brandDoseMg === num) ??
          doseMap.reduce((best, r) =>
            Math.abs(r.brandDoseMg - num) < Math.abs(best.brandDoseMg - num) ? r : best
          );
        return {
          type: 'compounded',
          value: match.compoundedUnits,
          original: match.brandDoseMg,
          drug: match.brandName,
          syringeSize: match.syringeSize,
          syringeMark: match.syringeMark,
        };
      }
      case 'compounded-to-brand': {
        const match =
          doseMap.find((r) => r.compoundedUnits === num) ??
          doseMap.reduce((best, r) =>
            Math.abs(r.compoundedUnits - num) < Math.abs(best.compoundedUnits - num) ? r : best
          );
        return {
          type: 'brand',
          value: match.brandDoseMg,
          original: match.compoundedUnits,
          drug: match.brandName,
        };
      }
      case 'brand-to-oral': {
        const match =
          doseMap.find((r) => r.brandDoseMg === num && r.oralDoseMg) ??
          doseMap.find((r) => r.oralDoseMg);
        if (!match?.oralDoseMg) return null;
        return {
          type: 'oral',
          value: match.oralDoseMg,
          original: match.brandDoseMg,
          drug: match.brandName,
        };
      }
      case 'oral-to-brand': {
        const match = doseMap.find((r) => r.oralDoseMg === num);
        if (!match) return null;
        return {
          type: 'brand',
          value: match.brandDoseMg,
          original: match.oralDoseMg,
          drug: match.brandName,
        };
      }
      default:
        return null;
    }
  }, [inputValue, conversionMode, doseMap]);

  const handleQuickSelect = (dose: number) => {
    setInputValue(dose.toString());
  };

  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Dose Converter</h2>
        <p className="mt-1 text-sm text-slate-600">
          Convert between brand medications, compounded units, and oral doses. Always confirm with your prescriber.
        </p>
      </div>

      {/* Drug Type Selector */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-medium text-slate-700">Medication Type</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSelectedDrug('semaglutide')}
            className={`flex-1 rounded-none border px-3 py-2 text-sm font-medium transition ${
              selectedDrug === 'semaglutide'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Semaglutide (Wegovy/Ozempic)
          </button>
          <button
            type="button"
            onClick={() => setSelectedDrug('tirzepatide')}
            className={`flex-1 rounded-none border px-3 py-2 text-sm font-medium transition ${
              selectedDrug === 'tirzepatide'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Tirzepatide (Mounjaro/Zepbound)
          </button>
        </div>
      </div>

      {/* Conversion Mode Selector */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-medium text-slate-700">Conversion Type</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setConversionMode('brand-to-compounded')}
            className={`flex items-center justify-center gap-2 rounded-none border px-3 py-2 text-xs font-medium transition ${
              conversionMode === 'brand-to-compounded'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Syringe className="h-4 w-4" />
            Brand → Compounded
          </button>
          <button
            type="button"
            onClick={() => setConversionMode('compounded-to-brand')}
            className={`flex items-center justify-center gap-2 rounded-none border px-3 py-2 text-xs font-medium transition ${
              conversionMode === 'compounded-to-brand'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Syringe className="h-4 w-4" />
            Compounded → Brand
          </button>
          <button
            type="button"
            onClick={() => setConversionMode('brand-to-oral')}
            className={`flex items-center justify-center gap-2 rounded-none border px-3 py-2 text-xs font-medium transition ${
              conversionMode === 'brand-to-oral'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Pill className="h-4 w-4" />
            Brand → Oral
          </button>
          <button
            type="button"
            onClick={() => setConversionMode('oral-to-brand')}
            className={`flex items-center justify-center gap-2 rounded-none border px-3 py-2 text-xs font-medium transition ${
              conversionMode === 'oral-to-brand'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Pill className="h-4 w-4" />
            Oral → Brand
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label htmlFor="dose-input" className="mb-2 block text-xs font-medium text-slate-700">
          {conversionMode === 'brand-to-compounded' || conversionMode === 'brand-to-oral'
            ? 'Brand Dose (mg)'
            : conversionMode === 'compounded-to-brand'
            ? 'Compounded Units'
            : 'Oral Dose (mg)'}
        </label>
        <div className="flex gap-2">
          <input
            id="dose-input"
            type="text"
            inputMode="decimal"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              conversionMode === 'brand-to-compounded' || conversionMode === 'brand-to-oral'
                ? 'e.g. 1.7'
                : conversionMode === 'compounded-to-brand'
                ? 'e.g. 34'
                : 'e.g. 14'
            }
            className="flex-1 rounded-none border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Quick Select Buttons */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-medium text-slate-700">Quick Select</label>
        <div className="flex flex-wrap gap-2">
          {commonDoses.map((dose) => (
            <button
              key={dose}
              type="button"
              onClick={() => handleQuickSelect(dose)}
              className="rounded-none border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              {dose}mg
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 rounded-none border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-start gap-3">
            <Calculator className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-900">Conversion Result</p>
              <p className="mt-1 text-sm text-emerald-800">
                {result.original} {conversionMode.includes('brand') ? 'mg' : conversionMode.includes('compounded') ? 'units' : 'mg'} ({result.drug}) ={' '}
                <strong className="text-base">
                  {result.value} {result.type === 'compounded' ? 'units' : result.type === 'oral' ? 'mg (oral)' : 'mg'}
                </strong>
              </p>
              {result.syringeSize && result.syringeMark && (
                <div className="mt-4">
                  <SyringeVisualization
                    units={result.value}
                    syringeSize={result.syringeSize}
                    markPosition={result.syringeMark}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-4 text-xs text-slate-500">
        This is an estimate for reference only. Always confirm dosing with your prescriber and pharmacy. Different
        compounding pharmacies may use different concentrations.
      </p>
    </div>
  );
}

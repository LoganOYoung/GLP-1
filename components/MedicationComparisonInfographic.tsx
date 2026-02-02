'use client';

import { Pill, Syringe, DollarSign, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ComparisonItem {
  feature: string;
  brand: boolean | string;
  compounded: boolean | string;
  oral: boolean | string;
}

const comparisons: ComparisonItem[] = [
  { feature: 'FDA Approved', brand: true, compounded: false, oral: true },
  { feature: 'Cost per Month', brand: '$900-1300', compounded: '$300-400', oral: '$600-800' },
  { feature: 'HSA/FSA Eligible', brand: false, compounded: true, oral: true },
  { feature: 'Availability', brand: 'Shortage', compounded: 'Available', oral: 'Available' },
  { feature: 'Requires Injection', brand: true, compounded: true, oral: false },
];

export default function MedicationComparisonInfographic() {
  return (
    <div className="rounded-none border-2 border-primary-100 bg-white p-6 shadow-md">
      <h3 className="mb-6 text-center text-xl font-bold text-gray-900">Quick Comparison</h3>
      
      <div className="space-y-4">
        {comparisons.map((item, index) => (
          <div key={index} className="rounded-none border border-gray-200 bg-gray-50 p-4">
            <p className="mb-3 text-sm font-semibold text-gray-900">{item.feature}</p>
            <div className="grid grid-cols-3 gap-3">
              {/* Brand */}
              <div className="rounded-none bg-white p-3 text-center">
                <p className="text-xs font-medium text-gray-600 mb-1">Brand</p>
                {typeof item.brand === 'boolean' ? (
                  item.brand ? (
                    <CheckCircle2 className="mx-auto h-5 w-5 text-primary-500" />
                  ) : (
                    <AlertTriangle className="mx-auto h-5 w-5 text-gray-400" />
                  )
                ) : (
                  <p className="text-sm font-semibold text-gray-900">{item.brand}</p>
                )}
              </div>
              
              {/* Compounded */}
              <div className="rounded-none bg-secondary-50 p-3 text-center border-2 border-secondary-200">
                <p className="text-xs font-medium text-secondary-700 mb-1">Compounded</p>
                {typeof item.compounded === 'boolean' ? (
                  item.compounded ? (
                    <CheckCircle2 className="mx-auto h-5 w-5 text-secondary-500" />
                  ) : (
                    <AlertTriangle className="mx-auto h-5 w-5 text-gray-400" />
                  )
                ) : (
                  <p className="text-sm font-semibold text-secondary-700">{item.compounded}</p>
                )}
              </div>
              
              {/* Oral */}
              <div className="rounded-none bg-white p-3 text-center">
                <p className="text-xs font-medium text-gray-600 mb-1">Oral</p>
                {typeof item.oral === 'boolean' ? (
                  item.oral ? (
                    <CheckCircle2 className="mx-auto h-5 w-5 text-primary-500" />
                  ) : (
                    <AlertTriangle className="mx-auto h-5 w-5 text-gray-400" />
                  )
                ) : (
                  <p className="text-sm font-semibold text-gray-900">{item.oral}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { PRICE_SNAPSHOT } from './cost-insurance-prices';

/**
 * Small price snapshot with optional "after HSA/FSA tax savings (~30%)" toggle.
 * Prices come from PRICE_SNAPSHOT (cost-insurance-data); can later be passed as props from API/CMS.
 * Disclaimer: estimate only; not tax advice.
 */
export default function PriceSnapshotWithHSA() {
  const [showAfterTax, setShowAfterTax] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="text-sm font-semibold text-gray-900">Typical monthly cost (cash)</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm text-gray-700">
        <span>Brand: {PRICE_SNAPSHOT.brandRange}</span>
        <span>Compounded: {showAfterTax ? PRICE_SNAPSHOT.compoundedAfterTax : PRICE_SNAPSHOT.compoundedBase}</span>
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={showAfterTax}
          onChange={(e) => setShowAfterTax(e.target.checked)}
          className="rounded border-gray-300"
        />
        <span>Show compounded after HSA/FSA tax savings (~30%)</span>
      </label>
      <p className="mt-2 text-xs text-gray-500">
        Estimate only; not tax advice. Your rate may vary. Verify with your tax or HSA/FSA administrator.
      </p>
    </div>
  );
}

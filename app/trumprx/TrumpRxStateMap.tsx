'use client';

import { useState } from 'react';
import { TRUMPRX_STATES, type TrumpRxStatus } from './trumprx-data';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

// US State coordinates (centroids) for map
const STATE_COORDINATES: Record<string, { x: number; y: number }> = {
  AL: { x: 50, y: 40 },
  AK: { x: 10, y: 10 },
  AZ: { x: 15, y: 35 },
  AR: { x: 45, y: 35 },
  CA: { x: 5, y: 30 },
  CO: { x: 30, y: 30 },
  CT: { x: 85, y: 20 },
  DE: { x: 82, y: 25 },
  FL: { x: 70, y: 50 },
  GA: { x: 65, y: 40 },
  HI: { x: 5, y: 50 },
  ID: { x: 20, y: 20 },
  IL: { x: 55, y: 25 },
  IN: { x: 60, y: 25 },
  IA: { x: 50, y: 25 },
  KS: { x: 45, y: 30 },
  KY: { x: 62, y: 30 },
  LA: { x: 48, y: 45 },
  ME: { x: 88, y: 5 },
  MD: { x: 80, y: 25 },
  MA: { x: 85, y: 18 },
  MI: { x: 62, y: 15 },
  MN: { x: 52, y: 12 },
  MS: { x: 52, y: 40 },
  MO: { x: 50, y: 30 },
  MT: { x: 28, y: 15 },
  NE: { x: 42, y: 25 },
  NV: { x: 12, y: 28 },
  NH: { x: 86, y: 15 },
  NJ: { x: 82, y: 22 },
  NM: { x: 28, y: 38 },
  NY: { x: 80, y: 18 },
  NC: { x: 72, y: 32 },
  ND: { x: 45, y: 10 },
  OH: { x: 65, y: 25 },
  OK: { x: 42, y: 35 },
  OR: { x: 8, y: 18 },
  PA: { x: 75, y: 22 },
  RI: { x: 86, y: 20 },
  SC: { x: 70, y: 38 },
  SD: { x: 45, y: 18 },
  TN: { x: 58, y: 35 },
  TX: { x: 40, y: 42 },
  UT: { x: 22, y: 28 },
  VT: { x: 84, y: 12 },
  VA: { x: 75, y: 28 },
  WA: { x: 10, y: 8 },
  WV: { x: 68, y: 28 },
  WI: { x: 57, y: 18 },
  WY: { x: 32, y: 22 },
};

function getStatusColor(status: TrumpRxStatus): string {
  switch (status) {
    case 'active':
      return 'fill-emerald-500';
    case 'pending':
      return 'fill-amber-500';
    case 'not-available':
      return 'fill-slate-300';
  }
}

function getStatusIcon(status: TrumpRxStatus) {
  switch (status) {
    case 'active':
      return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-amber-600" />;
    case 'not-available':
      return <XCircle className="h-4 w-4 text-slate-400" />;
  }
}

export default function TrumpRxStateMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const stateMap = new Map(TRUMPRX_STATES.map((s) => [s.stateCode, s]));

  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <p className="text-sm text-slate-600">
          Click on a state to see details. Hover to see state name and status.
        </p>
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-emerald-500" />
          <span className="text-slate-700">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-amber-500" />
          <span className="text-slate-700">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-slate-300" />
          <span className="text-slate-700">Not Available</span>
        </div>
      </div>

      {/* Simplified US Map */}
      <div className="relative mb-6 h-[400px] w-full overflow-hidden rounded-none border border-slate-200 bg-slate-50">
        <svg viewBox="0 0 100 60" className="h-full w-full">
          {Object.entries(STATE_COORDINATES).map(([code, pos]) => {
            const state = stateMap.get(code);
            const status = state?.status || 'not-available';
            const isSelected = selectedState === code;

            return (
              <g key={code}>
                {/* State circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 2.5 : 2}
                  className={`${getStatusColor(status)} cursor-pointer transition-all hover:opacity-80 ${
                    isSelected ? 'ring-2 ring-slate-900 ring-offset-2' : ''
                  }`}
                  onClick={() => setSelectedState(selectedState === code ? null : code)}
                  style={{ cursor: 'pointer' }}
                >
                  <title>{state ? `${state.stateName} - ${status}` : `${code} - Not Available`}</title>
                </circle>
                {/* State label */}
                {isSelected && (
                  <text
                    x={pos.x}
                    y={pos.y - 3}
                    fontSize="8"
                    fill="#1e293b"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {code}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected State Info */}
      {selectedState && stateMap.has(selectedState) && (
        <div className="rounded-none border border-emerald-200 bg-emerald-50 p-4">
          {(() => {
            const state = stateMap.get(selectedState)!;
            return (
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-emerald-900">{state.stateName}</h3>
                  {getStatusIcon(state.status)}
                </div>
                <p className="mt-1 text-sm text-emerald-800">
                  Status: <strong>{state.status === 'active' ? 'Active' : state.status === 'pending' ? 'Pending' : 'Not Available'}</strong>
                </p>
                {state.effectiveDate && (
                  <p className="mt-1 text-sm text-emerald-800">
                    Effective: {new Date(state.effectiveDate).toLocaleDateString()}
                  </p>
                )}
                <p className="mt-1 text-sm text-emerald-800">
                  Monthly Cap: <strong>${state.monthlyCap}</strong>
                </p>
                {state.applicationLink && (
                  <a
                    href={state.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-emerald-700 underline hover:no-underline"
                  >
                    Apply Now →
                  </a>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* State List */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-slate-900">Quick State Lookup</p>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
          {TRUMPRX_STATES.map((state) => (
            <button
              key={state.stateCode}
              type="button"
              onClick={() => setSelectedState(state.stateCode)}
              className={`rounded border p-2 text-xs font-medium transition ${
                selectedState === state.stateCode
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
              title={`${state.stateName} - ${state.status}`}
            >
              {state.stateCode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

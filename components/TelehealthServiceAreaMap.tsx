'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { TELEHEALTH_PLATFORMS } from '@/app/alternatives/telehealth-prices';
import GoogleMapsServiceArea from '@/components/GoogleMapsServiceArea';

/**
 * Telehealth Service Area Map Component
 * 
 * Displays a visual map of which Telehealth platforms serve which states.
 * Uses Google Maps API for visualization (requires API key).
 * 
 * Fallback: Shows a state grid if Google Maps is not available.
 */

interface StateAvailability {
  stateCode: string;
  stateName: string;
  availablePlatforms: string[];
}

export default function TelehealthServiceAreaMap() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Group platforms by state availability
  const stateAvailability: StateAvailability[] = [];
  const allStateCodes = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  ];

  const stateNames: Record<string, string> = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
    CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
    FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
    IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
    KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
    MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
    MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
    NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
    NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
    OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
    SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
    VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
    WI: 'Wisconsin', WY: 'Wyoming',
  };

  // Build state availability map
  allStateCodes.forEach((stateCode) => {
    const availablePlatforms = TELEHEALTH_PLATFORMS.filter((platform) => {
      if (platform.serviceArea === 'all-states') return true;
      if (Array.isArray(platform.serviceArea)) {
        return platform.serviceArea.includes(stateCode);
      }
      return false;
    }).map((p) => p.id);

    if (availablePlatforms.length > 0) {
      stateAvailability.push({
        stateCode,
        stateName: stateNames[stateCode],
        availablePlatforms,
      });
    }
  });

  // Filter by selected platform
  const filteredStates = selectedPlatform
    ? stateAvailability.filter((state) => state.availablePlatforms.includes(selectedPlatform))
    : stateAvailability;

  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Service Area Map</h2>
        <p className="mt-1 text-sm text-slate-600">
          See which states each Telehealth platform serves. Select a platform to filter the map.
        </p>
      </div>

      {/* Platform Filter */}
      <div className="mb-6">
        <label htmlFor="platform-filter" className="mb-2 block text-sm font-medium text-slate-700">
          Filter by Platform
        </label>
        <select
          id="platform-filter"
          value={selectedPlatform || ''}
          onChange={(e) => setSelectedPlatform(e.target.value || null)}
          className="w-full rounded-none border border-slate-300 bg-white py-2 px-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">All Platforms</option>
          {TELEHEALTH_PLATFORMS.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>

      {/* State Grid (Fallback - no Google Maps API key needed) */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">
          {selectedPlatform
            ? `${TELEHEALTH_PLATFORMS.find((p) => p.id === selectedPlatform)?.name} Service Area`
            : 'All States Coverage'}
        </h3>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
          {allStateCodes.map((stateCode) => {
            const state = filteredStates.find((s) => s.stateCode === stateCode);
            const isAvailable = !!state;
            const platformCount = state?.availablePlatforms.length || 0;

            return (
              <div
                key={stateCode}
                className={`flex flex-col items-center rounded-none border p-2 text-center transition ${
                  isAvailable
                    ? 'border-primary-300 bg-primary-50 hover:bg-primary-100'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
                title={`${stateNames[stateCode]}: ${isAvailable ? `${platformCount} platform${platformCount !== 1 ? 's' : ''} available` : 'Not available'}`}
              >
                <span className="text-xs font-medium text-slate-900">{stateCode}</span>
                {isAvailable && (
                  <CheckCircle2 className="mt-1 h-3 w-3 text-primary-600" />
                )}
                {!isAvailable && (
                  <XCircle className="mt-1 h-3 w-3 text-slate-400" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary-600" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4 text-slate-400" />
          <span>Not Available</span>
        </div>
      </div>

      {/* Google Maps Integration (Optional - requires API key) */}
      <div className="mt-6">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">Interactive Map</h3>
        <GoogleMapsServiceArea selectedPlatform={selectedPlatform} />
      </div>

      {/* Summary */}
      <div className="mt-6 rounded-none border border-primary-200 bg-primary-50 p-4">
        <p className="text-sm text-primary-900">
          <strong>
            {selectedPlatform
              ? `${filteredStates.length} state${filteredStates.length !== 1 ? 's' : ''}`
              : `${stateAvailability.length} state${stateAvailability.length !== 1 ? 's' : ''}`}
          </strong>{' '}
          {selectedPlatform ? 'served by this platform' : 'have at least one platform available'}
        </p>
      </div>
    </div>
  );
}

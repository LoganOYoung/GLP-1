'use client';

import { useState } from 'react';
import { MapPin, Search, CheckCircle2, XCircle } from 'lucide-react';
import { TELEHEALTH_PLATFORMS, type TelehealthPlatform } from '@/app/alternatives/telehealth-prices';

const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

function isPlatformAvailableInState(platform: TelehealthPlatform, stateCode: string): boolean {
  if (platform.serviceArea === 'all-states') {
    return true;
  }
  if (Array.isArray(platform.serviceArea)) {
    return platform.serviceArea.includes(stateCode);
  }
  return false;
}

export default function TelehealthLocationFinder() {
  const [selectedState, setSelectedState] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const availablePlatforms = selectedState
    ? TELEHEALTH_PLATFORMS.filter((platform) => isPlatformAvailableInState(platform, selectedState))
    : TELEHEALTH_PLATFORMS;

  const filteredPlatforms = searchQuery
    ? availablePlatforms.filter((platform) =>
        platform.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : availablePlatforms;

  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Find Telehealth Near You</h2>
        <p className="mt-1 text-sm text-slate-600">
          Check which Telehealth platforms are available in your state.
        </p>
      </div>

      {/* State Selector */}
      <div className="mb-6">
        <label htmlFor="state-select" className="mb-2 block text-sm font-medium text-slate-700">
          Select Your State
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full rounded-none border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">All States</option>
            {US_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label htmlFor="platform-search" className="mb-2 block text-sm font-medium text-slate-700">
          Search Platforms
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            id="platform-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by platform name..."
            className="w-full rounded-none border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredPlatforms.length === 0 ? (
          <div className="rounded-none border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-600">
              {selectedState
                ? `No platforms found for ${US_STATES.find((s) => s.code === selectedState)?.name || selectedState}.`
                : 'No platforms match your search.'}
            </p>
          </div>
        ) : (
          filteredPlatforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              selectedState={selectedState}
            />
          ))
        )}
      </div>

      {selectedState && (
        <div className="mt-6 rounded-none border border-primary-200 bg-primary-50 p-4">
          <p className="text-sm text-primary-800">
            <strong>Found {filteredPlatforms.length} platform{filteredPlatforms.length !== 1 ? 's' : ''}</strong>{' '}
            {selectedState && `available in ${US_STATES.find((s) => s.code === selectedState)?.name || selectedState}`}
          </p>
        </div>
      )}
    </div>
  );
}

function PlatformCard({
  platform,
  selectedState,
}: {
  platform: TelehealthPlatform;
  selectedState: string;
}) {
  const isAvailable = selectedState
    ? isPlatformAvailableInState(platform, selectedState)
    : true;

  return (
    <div className="flex items-start justify-between rounded-none border border-slate-200 bg-slate-50/50 p-4">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-slate-900">{platform.name}</h3>
          {isAvailable ? (
            <span className="inline-flex items-center gap-1 rounded-none bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              <CheckCircle2 className="h-3 w-3" />
              Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-none bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
              <XCircle className="h-3 w-3" />
              Not Available
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-slate-600">
          {platform.serviceArea === 'all-states'
            ? 'Available in all 50 states'
            : Array.isArray(platform.serviceArea)
              ? `Available in: ${platform.serviceArea.join(', ')}`
              : platform.serviceAreaNote || 'Service area varies'}
        </p>
        {platform.serviceAreaNote && (
          <p className="mt-1 text-xs text-slate-500">{platform.serviceAreaNote}</p>
        )}
        <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
          <span>${platform.totalMonthly === 0 ? 'Insurance-dependent' : `${platform.totalMonthly}/mo`}</span>
          <span>{platform.type === 'compounded' ? 'Compounded' : platform.type === 'brand' ? 'Brand' : 'Both'}</span>
        </div>
      </div>
    </div>
  );
}

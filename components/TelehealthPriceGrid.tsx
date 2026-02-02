'use client';

import { useEffect, useState } from 'react';
import { Clock, Shield, Star, ExternalLink, CheckCircle2, Building2 } from 'lucide-react';
import { TELEHEALTH_PLATFORMS, formatLastUpdated, type TelehealthPlatform } from '@/app/alternatives/telehealth-prices';
import { AFFILIATE_REF, AFFILIATE_SOURCE } from '@/app/alternatives/alternatives-data';
import { fetchTelehealthPrices } from '@/lib/telehealth-api';
import { getLabsByPlatform } from '@/lib/lab-data';
import LabInfoModal from './LabInfoModal';

export default function TelehealthPriceGrid() {
  const [platforms, setPlatforms] = useState<TelehealthPlatform[]>(TELEHEALTH_PLATFORMS);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetch, setLastFetch] = useState<string | null>(null);

  // Fetch real-time prices on mount and periodically
  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      try {
        const response = await fetchTelehealthPrices();
        setPlatforms(response.platforms);
        setLastFetch(response.lastUpdated);
      } catch (error) {
        console.error('Failed to fetch telehealth prices:', error);
        // Fallback to static data
        setPlatforms(TELEHEALTH_PLATFORMS);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchPrices();

    // Refresh every 5 minutes
    const interval = setInterval(fetchPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Real-Time Telehealth Prices</h2>
          <p className="mt-1 text-sm text-slate-600">
            Prices from major platforms. Updated every few minutes.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock className="h-4 w-4" />
          <span>Live data</span>
        </div>
      </div>

      {isLoading && (
        <div className="mb-4 text-center text-sm text-slate-500">
          Updating prices...
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => (
          <TelehealthCard key={platform.id} platform={platform} />
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Prices shown are for compounded semaglutide or brand medication (as indicated). Actual cost may vary by dose, location, and insurance coverage. Always verify pricing directly with the platform.
      </p>
    </div>
  );
}

function TelehealthCard({ platform }: { platform: TelehealthPlatform }) {
  const [showLabModal, setShowLabModal] = useState(false);
  const affiliateUrl = `${platform.affiliateUrl}${platform.affiliateUrl.includes('?') ? '&' : '?'}ref=${AFFILIATE_REF}&utm_source=${AFFILIATE_SOURCE}`;
  const availabilityColors = {
    'in-stock': 'bg-green-100 text-green-700 border-green-200',
    limited: 'bg-amber-100 text-amber-700 border-amber-200',
    waitlist: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  const labs = getLabsByPlatform(platform.id);
  const hasLabInfo = labs.length > 0;

  return (
    <div className="group flex flex-col rounded-none border-2 border-primary-100 bg-gradient-to-br from-white to-primary-50/20 p-5 shadow-sm transition-all duration-200  hover:border-primary-300 hover:shadow-md hover:shadow-primary-500/10">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-none bg-primary-100">
              <span className="text-xs font-bold text-primary-500">{platform.name.charAt(0)}</span>
            </div>
            <h3 className="font-bold text-slate-900">{platform.name}</h3>
          </div>
          <p className="text-xs font-medium text-slate-500">{platform.type === 'compounded' ? 'Compounded' : platform.type === 'brand' ? 'Brand' : 'Both'}</p>
        </div>
        {platform.rating && (
          <div className="flex items-center gap-1 rounded-none bg-amber-50 px-2 py-1">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="text-xs font-bold text-amber-700">{platform.rating}</span>
          </div>
        )}
      </div>

      <div className="mb-4 rounded-none bg-gradient-to-br from-secondary-50 to-secondary-100/50 p-3">
        <div className="flex items-baseline gap-1">
          {platform.totalMonthly === 0 ? (
            <span className="text-lg font-bold text-slate-900">Insurance-dependent</span>
          ) : (
            <>
              <span className="text-3xl font-extrabold text-secondary-600">${platform.totalMonthly}</span>
              <span className="text-sm font-medium text-slate-600">/mo</span>
            </>
          )}
        </div>
        {platform.basePrice > 0 && platform.membershipFee > 0 && (
          <p className="mt-1 text-xs text-slate-600">
            ${platform.basePrice} medication + ${platform.membershipFee} membership
          </p>
        )}
        {platform.basePrice > 0 && platform.membershipFee === 0 && (
          <p className="mt-1 text-xs text-slate-600">All-inclusive pricing</p>
        )}
      </div>

      <div className="mb-3 space-y-1.5">
        <div className={`inline-flex items-center gap-1.5 rounded-none border px-2 py-1 text-xs font-medium ${availabilityColors[platform.availability]}`}>
          <div className={`h-1.5 w-1.5 rounded-none ${platform.availability === 'in-stock' ? 'bg-green-500' : platform.availability === 'limited' ? 'bg-amber-500' : 'bg-slate-400'}`} />
          {platform.availability === 'in-stock' ? 'In Stock' : platform.availability === 'limited' ? 'Limited' : 'Waitlist'}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {platform.legitScriptCertified && (
            <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-secondary-600">
              <Shield className="h-3 w-3" />
              LegitScript
            </span>
          )}
          {platform.hsaFsaEligible && (
            <span className="inline-flex items-center gap-1 rounded bg-primary-100 px-1.5 py-0.5 text-xs font-medium text-primary-600">
              <CheckCircle2 className="h-3 w-3" />
              HSA/FSA
            </span>
          )}
        </div>
      </div>

      {hasLabInfo && (
        <div className="mb-3">
          <button
            type="button"
            onClick={() => setShowLabModal(true)}
            className="inline-flex items-center gap-1 rounded-none border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Building2 className="h-3 w-3" />
            View Lab Info
          </button>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-primary-100 pt-4">
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Clock className="h-3 w-3 text-primary-400" />
          {formatLastUpdated(platform.lastUpdated)}
        </span>
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 rounded-none bg-primary-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200  hover:bg-primary-600 hover:shadow-md"
        >
          Check Price
          <ExternalLink className="h-3 w-3 transition-transform group-" />
        </a>
      </div>

      {showLabModal && (
        <LabInfoModal
          platformId={platform.id}
          platformName={platform.name}
          onClose={() => setShowLabModal(false)}
        />
      )}
    </div>
  );
}

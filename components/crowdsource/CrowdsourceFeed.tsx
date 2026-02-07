'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getSupabaseConfig,
  isSupabaseConfigured,
  fetchRecentPriceReports,
  fetchRecentSupplyReports,
  type PriceReportRow,
  type SupplyReportRow,
} from '@/lib/supabase';

function formatTimeAgo(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffM = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMs / 3600000);
  const diffD = Math.floor(diffMs / 86400000);
  if (diffM < 1) return 'Just now';
  if (diffM < 60) return `${diffM} min ago`;
  if (diffH < 24) return `${diffH} hr ago`;
  if (diffD < 7) return `${diffD} day ago`;
  return d.toLocaleDateString();
}

export default function CrowdsourceFeed({ limit = 5, showAllLink = true }: { limit?: number; showAllLink?: boolean }) {
  const [price, setPrice] = useState<PriceReportRow[]>([]);
  const [supply, setSupply] = useState<SupplyReportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }
    const config = getSupabaseConfig()!;
    Promise.all([
      fetchRecentPriceReports(config, limit),
      fetchRecentSupplyReports(config, limit),
    ]).then(([p, s]) => {
      setPrice(p);
      setSupply(s);
      setLoading(false);
    });
  }, [configured, limit]);

  const combined = [
    ...price.map((r) => ({ type: 'price' as const, time: r.reported_at, row: r })),
    ...supply.map((r) => ({ type: 'supply' as const, time: r.reported_at, row: r })),
  ]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, limit);

  if (loading) {
    return (
      <div className="rounded-none border border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-500">
        Loading community reports…
      </div>
    );
  }

  if (!configured) {
    return (
      <div className="rounded-none border border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-500">
        Community reports will appear here once the backend is connected. You can still{' '}
        <Link href="/report" className="font-medium text-primary-600 underline hover:no-underline">submit a report</Link>.
      </div>
    );
  }

  if (combined.length === 0) {
    return (
      <div className="rounded-none border border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-500">
        No reports yet. Be the first to{' '}
        <Link href="/report" className="font-medium text-primary-600 underline hover:no-underline">report a price or supply</Link>.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <ul className="space-y-2">
        {combined.map((item) => (
          <li key={item.type + (item.row as PriceReportRow & SupplyReportRow).id} className="rounded-none border border-gray-200 bg-white px-3 py-2 text-sm">
            {item.type === 'price' ? (
              <>
                <span className="font-medium text-gray-900">${(item.row as PriceReportRow).amount_paid_usd}/mo</span>
                {' '}({(item.row as PriceReportRow).insurance_or_cash}) at {(item.row as PriceReportRow).pharmacy_or_platform}
                {' '}– {(item.row as PriceReportRow).drug}
              </>
            ) : (
              <>
                <span className="font-medium text-gray-900">Got {(item.row as SupplyReportRow).drug}</span>
                {' '}at {(item.row as SupplyReportRow).pharmacy_or_platform}, {(item.row as SupplyReportRow).city_state}
              </>
            )}
            {' '}
            <span className="text-gray-500">{formatTimeAgo(item.time)}</span>
          </li>
        ))}
      </ul>
      {showAllLink && (
        <p className="text-xs text-gray-500">
          <Link href="/report" className="font-medium text-primary-600 underline hover:no-underline">Submit a report</Link>
          {' · '}
          <Link href="/report#feed" className="font-medium text-primary-600 underline hover:no-underline">See all</Link>
        </p>
      )}
    </div>
  );
}

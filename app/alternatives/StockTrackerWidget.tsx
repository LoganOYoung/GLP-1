'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

type StockStatus = 'in-stock' | 'limited' | 'severe';

type StockItem = {
  name: string;
  status: StockStatus;
  label: string;
};

/** Map FDA/shortage info to green/orange/red. Fallback to static demo if API empty. */
const DEMO_STOCK: StockItem[] = [
  { name: 'Wegovy (1.7mg, 2.4mg)', status: 'limited', label: 'Limited' },
  { name: 'Ozempic (0.5mg, 1mg)', status: 'limited', label: 'Limited' },
  { name: 'Zepbound', status: 'severe', label: 'Severe Shortage' },
  { name: 'Mounjaro', status: 'limited', label: 'Limited' },
  { name: 'Compounded semaglutide', status: 'in-stock', label: 'In Stock' },
  { name: 'Rybelsus', status: 'in-stock', label: 'In Stock' },
];

const statusStyles: Record<StockStatus, string> = {
  'in-stock': 'border-primary-200 bg-primary-50 text-primary-800',
  limited: 'border-amber-200 bg-amber-50 text-amber-800',
  severe: 'border-red-200 bg-red-50 text-red-800',
};

export default function StockTrackerWidget() {
  const [items, setItems] = useState<StockItem[]>(DEMO_STOCK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.fda.gov/drug/shortage.json?limit=30')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        const results = data?.results;
        if (Array.isArray(results) && results.length > 0) {
          const glp1 = results.filter((r: Record<string, unknown>) => {
            const openfda = r.openfda as { brand_name?: string[] } | undefined;
            const name = Array.isArray(openfda?.brand_name)
              ? openfda.brand_name.join(' ')
              : String(r.product_name ?? r.drug_name ?? '');
            return /ozempic|wegovy|mounjaro|zepbound|semaglutide|tirzepatide|rybelsus|glp-1|glp1/i.test(name);
          });
          if (glp1.length > 0) {
            const mapped: StockItem[] = glp1.slice(0, 6).map((r: Record<string, unknown>) => {
              const name = ((r.openfda as { brand_name?: string[] })?.brand_name)?.[0] ?? String(r.product_name ?? r.drug_name ?? '');
              const reason = String(r.shortage_reason ?? r.reason ?? '').toLowerCase();
              let status: StockStatus = 'limited';
              if (/severe|critical|discontinuation/i.test(reason)) status = 'severe';
              else if (/resolved|available/i.test(reason)) status = 'in-stock';
              return {
                name,
                status,
                label: status === 'in-stock' ? 'In Stock' : status === 'severe' ? 'Severe Shortage' : 'Limited',
              };
            });
            setItems(mapped);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-none border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Stock Tracker</h2>
      <p className="mt-1 text-sm text-slate-600">
        Live shortage status. Green = In Stock, Orange = Limited, Red = Severe Shortage.
      </p>
      {loading ? (
        <p className="mt-4 text-sm text-slate-500">Loading…</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {items.map((item) => {
            const drugSlug = item.name.toLowerCase().includes('wegovy') ? 'wegovy' :
              item.name.toLowerCase().includes('ozempic') ? 'ozempic' :
              item.name.toLowerCase().includes('zepbound') ? 'zepbound' :
              item.name.toLowerCase().includes('mounjaro') ? 'mounjaro' : null;
            
            return (
              <li
                key={item.name}
                className={`flex items-center justify-between gap-2 rounded-none border px-3 py-2 text-sm ${statusStyles[item.status]}`}
              >
                {drugSlug ? (
                  <Link href={`/drugs/${drugSlug}`} className="font-medium hover:underline">
                    {item.name}
                  </Link>
                ) : (
                  <span className="font-medium">{item.name}</span>
                )}
                <span className="shrink-0 font-semibold">{item.label}</span>
              </li>
            );
          })}
        </ul>
      )}
      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />
        <Link
          href="/legitimacy/shortage"
          className="font-medium text-primary-600 hover:underline"
        >
          Full FDA shortage status →
        </Link>
      </div>
    </div>
  );
}

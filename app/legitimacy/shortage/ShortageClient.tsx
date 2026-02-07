'use client';

import { useEffect, useState } from 'react';

type ShortageItem = {
  name?: string;
  status?: string;
  link?: string;
};

type Source = 'live' | 'cached' | null;

const FDA_URL = 'https://api.fda.gov/drug/shortage.json?limit=30';
const FALLBACK_URL = '/data/shortage.json';

function parseFdaResults(data: { results?: unknown[] }): ShortageItem[] {
  const results = data?.results;
  if (!Array.isArray(results) || results.length === 0) return [];
  const mapped = results
    .filter((r): r is Record<string, unknown> => typeof r === 'object' && r !== null && !Array.isArray(r))
    .filter((r) => {
      const openfda = r.openfda as { brand_name?: string[] } | undefined;
      const brand = openfda?.brand_name;
      const name = Array.isArray(brand) ? brand.join(' ') : String(r.product_name ?? r.drug_name ?? '');
      return /ozempic|wegovy|mounjaro|zepbound|semaglutide|tirzepatide|rybelsus|glp-1|glp1/i.test(name);
    })
    .map((r) => ({
      name: ((r.openfda as { brand_name?: string[] })?.brand_name)?.[0] ?? String(r.product_name ?? r.drug_name ?? ''),
      status: String(r.shortage_reason ?? r.reason ?? 'See FDA'),
      link: (r.link as string[] | undefined)?.[0],
    }));
  return mapped;
}

export default function ShortageClient() {
  const [items, setItems] = useState<ShortageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<Source>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(FDA_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('API error'))))
      .then((data) => {
        if (cancelled) return { fromLive: false, fallback: null };
        const mapped = parseFdaResults(data);
        if (mapped.length > 0) {
          setItems(mapped);
          setSource('live');
          setLoading(false);
          return { fromLive: true, fallback: null };
        }
        return fetch(FALLBACK_URL)
          .then((r) => (r.ok ? r.json() : Promise.reject(new Error('No fallback'))))
          .then((json) => ({ fromLive: false, fallback: json }));
      })
      .then((result) => {
        if (cancelled) return;
        if (result?.fromLive) return;
        const fallbackData = result?.fallback;
        if (fallbackData?.items && Array.isArray(fallbackData.items)) {
          setItems(fallbackData.items);
          setSource('cached');
          if (fallbackData.lastUpdated) setLastUpdated(fallbackData.lastUpdated);
        } else {
          setError('Unable to load FDA data.');
        }
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        fetch(FALLBACK_URL)
          .then((r) => (r.ok ? r.json() : Promise.reject(new Error('No fallback'))))
          .then((data) => {
            if (cancelled) return;
            if (data?.items && Array.isArray(data.items)) {
              setItems(data.items);
              setSource('cached');
              if (data.lastUpdated) setLastUpdated(data.lastUpdated);
            } else {
              setError('Unable to load FDA data.');
            }
            setLoading(false);
          })
          .catch(() => {
            if (cancelled) return;
            setError('Unable to load FDA data.');
            setLoading(false);
          });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="mt-6 rounded-none border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-600">
        Loading shortage data…
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="mt-6 rounded-none border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
        {error} Check the official{' '}
        <a href="https://www.fda.gov/drugs/drug-safety-and-availability/drug-shortages" target="_blank" rel="noopener noreferrer" className="underline">
          FDA Drug Shortages
        </a>{' '}
        page for current status.
      </div>
    );
  }

  const showCachedNotice = source === 'cached' && items.length > 0;

  return (
    <div className="mt-6 space-y-4">
      {showCachedNotice && (
        <div className="rounded-none border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          Showing cached snapshot of GLP-1–related products that have had supply issues.
          {lastUpdated && <> Last updated: {lastUpdated}.</>} For the latest status, see the official{' '}
          <a href="https://www.fda.gov/drugs/drug-safety-and-availability/drug-shortages" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-900 underline hover:no-underline">
            FDA Drug Shortages
          </a>{' '}
          page.
        </div>
      )}
      {source === 'live' && items.length > 0 && (
        <p className="text-sm text-primary-600">Data below is pulled from FDA when available. Confirm on the official FDA site.</p>
      )}
      {items.length === 0 ? (
        <div className="rounded-none border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-600">
            No GLP-1–specific shortage records returned. For the full list, see{' '}
            <a href="https://www.fda.gov/drugs/drug-safety-and-availability/drug-shortages" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-900 underline hover:no-underline">
              FDA Drug Shortages
            </a>.
          </p>
        </div>
      ) : (
        <div className="rounded-none border border-gray-200 bg-white shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {items.map((item, i) => (
              <li key={i} className="px-4 py-3 sm:px-6">
                <span className="font-medium text-gray-900">{item.name ?? 'Product'}</span>
                {item.status && <span className="ml-2 text-sm text-gray-600">— {item.status}</span>}
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm font-medium text-gray-900 underline hover:no-underline">
                    FDA details
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

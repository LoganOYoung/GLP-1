'use client';

import { useEffect, useState } from 'react';

type ShortageItem = {
  name?: string;
  status?: string;
  link?: string;
};

export default function ShortageClient() {
  const [items, setItems] = useState<ShortageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // FDA Open Data - drug shortages; structure may vary
    const url = 'https://api.fda.gov/drug/shortage.json?limit=30';
    fetch(url)
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('API error')))
      .then((data) => {
        const results = data?.results;
        if (Array.isArray(results) && results.length > 0) {
          const mapped = results
            .filter((r: Record<string, unknown>) => {
              const openfda = r.openfda as { brand_name?: string[] } | undefined;
              const brand = openfda?.brand_name;
              const name = Array.isArray(brand) ? brand.join(' ') : String(r.product_name ?? r.drug_name ?? '');
              return /ozempic|wegovy|mounjaro|zepbound|semaglutide|tirzepatide|rybelsus|glp-1|glp1/i.test(name);
            })
            .map((r: Record<string, unknown>) => ({
              name: ((r.openfda as { brand_name?: string[] })?.brand_name)?.[0] ?? String(r.product_name ?? r.drug_name ?? ''),
              status: String(r.shortage_reason ?? r.reason ?? 'See FDA'),
              link: (r.link as string[] | undefined)?.[0],
            }));
          setItems(mapped.length > 0 ? mapped : []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load FDA data.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="mt-6 rounded-none border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-600">
        Loading shortage data…
      </div>
    );
  }

  if (error) {
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

  if (items.length === 0) {
    return (
      <div className="mt-6 rounded-none border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">
          No GLP-1–specific shortage records returned from the API, or the list is empty. 
          For the full list, see{' '}
          <a href="https://www.fda.gov/drugs/drug-safety-and-availability/drug-shortages" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-900 underline hover:no-underline">
            FDA Drug Shortages
          </a>.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-none border border-gray-200 bg-white shadow-sm overflow-hidden">
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
  );
}

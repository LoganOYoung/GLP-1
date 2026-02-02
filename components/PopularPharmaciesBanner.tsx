'use client';

import { useState } from 'react';
import Image from 'next/image';

const PHARMACIES: { name: string; domain: string }[] = [
  { name: 'Kroger', domain: 'kroger.com' },
  { name: 'Walgreens', domain: 'walgreens.com' },
  { name: 'Hy-Vee', domain: 'hy-vee.com' },
  { name: 'Albertsons', domain: 'albertsons.com' },
  { name: 'Walmart', domain: 'walmart.com' },
  { name: 'H-E-B', domain: 'heb.com' },
  { name: 'Publix', domain: 'publix.com' },
  { name: 'Meijer', domain: 'meijer.com' },
  { name: 'Ralphs', domain: 'ralphs.com' },
];

function PharmacyLogo({ name, domain }: { name: string; domain: string }) {
  const [error, setError] = useState(false);
  const src = `https://logo.clearbit.com/${domain}`;

  if (error) {
    return (
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600 sm:h-14 sm:w-14 sm:text-sm"
        title={name}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <div
      className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-white shadow ring-1 ring-gray-200 sm:h-14 sm:w-14"
      title={name}
    >
      <Image
        src={src}
        alt={name}
        fill
        className="object-contain p-1.5"
        sizes="56px"
        onError={() => setError(true)}
      />
    </div>
  );
}

/**
 * Long horizontal banner: "Make the best decision" + tagline + row of real pharmacy logos (Clearbit).
 */
export default function PopularPharmaciesBanner() {
  return (
    <section className="border-b border-gray-200 bg-[#fafaf9]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Make the best decision
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-600">
              Among most popular pharmacy brands
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {PHARMACIES.map((pharmacy) => (
              <PharmacyLogo key={pharmacy.name} name={pharmacy.name} domain={pharmacy.domain} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

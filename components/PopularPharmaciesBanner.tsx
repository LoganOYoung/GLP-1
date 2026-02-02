'use client';

/** Official US pharmacy chain homepages; verified 2026-01. Some may restrict non-US or automated access. */
const PHARMACIES: { name: string; url: string }[] = [
  { name: 'Kroger', url: 'https://www.kroger.com' },
  { name: 'Walgreens', url: 'https://www.walgreens.com' },
  { name: 'Hy-Vee', url: 'https://www.hy-vee.com' },
  { name: 'Albertsons', url: 'https://www.albertsons.com' },
  { name: 'Walmart', url: 'https://www.walmart.com' },
  { name: 'H-E-B', url: 'https://www.heb.com' },
  { name: 'Publix', url: 'https://www.publix.com' },
  { name: 'Meijer', url: 'https://www.meijer.com' },
  { name: 'Ralphs', url: 'https://www.ralphs.com' },
];

/**
 * Banner: "Make the best decision" + tagline + row of pharmacy names as outbound links.
 */
export default function PopularPharmaciesBanner() {
  return (
    <section className="border-b border-gray-200 bg-[#fafaf9]">
      <div className="container-page section-pad-tight">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Make the best decision
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-600">
              Among most popular pharmacy brands
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6">
            {PHARMACIES.map((pharmacy) => (
              <a
                key={pharmacy.name}
                href={pharmacy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary-600 underline hover:no-underline sm:text-base"
              >
                {pharmacy.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

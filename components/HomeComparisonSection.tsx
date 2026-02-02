import Link from 'next/link';

const CARDS = [
  {
    id: 'brand',
    title: 'Brand-name',
    tag: 'Insurance Dependent',
    price: '$900–$1,400+/mo',
    priceStatus: 'high' as const,
    stock: 'Shortage common' as const,
    stockPulse: 'amber' as const,
    mode: 'Injection',
    timeToAccess: '1–2 weeks (if in stock)',
    updateTag: 'TrumpRx Compatible',
    ctaLabel: 'Explore Brand-name',
    href: '/alternatives#brand',
    highlighted: false,
  },
  {
    id: 'compounded',
    title: 'Compounded',
    tag: 'Best for Out-of-Pocket',
    price: '$150–$350/mo',
    priceStatus: 'good' as const,
    stock: 'Widely available' as const,
    stockPulse: 'green' as const,
    mode: 'Injection',
    timeToAccess: '~1 week',
    updateTag: '503A/503B Licensed',
    ctaLabel: 'Explore Compounded',
    href: '/alternatives#compounded',
    highlighted: true,
    saveBadge: 'Save $700+',
  },
  {
    id: 'oral',
    title: 'Oral Pills',
    tag: '2026 New Release',
    price: '$300–$1,000+/mo',
    priceStatus: 'varies' as const,
    stock: 'Growing supply' as const,
    stockPulse: 'green' as const,
    mode: 'Oral',
    timeToAccess: '1–2 weeks',
    updateTag: 'Rybelsus & New Orals',
    ctaLabel: 'Explore Oral Pills',
    href: '/alternatives#oral',
    highlighted: false,
  },
] as const;

function PriceGauge({ price, status }: { price: string; status: 'high' | 'good' | 'varies' }) {
  const barWidth = status === 'high' ? 'w-full' : status === 'good' ? 'w-1/3' : 'w-2/3';
  const barColor =
    status === 'high'
      ? 'bg-amber-500'
      : status === 'good'
        ? 'bg-emerald-500'
        : 'bg-slate-400';

  return (
    <div>
      <p className="text-lg font-bold text-gray-900">{price}</p>
      <p className="mt-0.5 text-xs font-medium text-gray-500">Monthly cost</p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div className={`h-full rounded-full transition-all ${barWidth} ${barColor}`} />
      </div>
    </div>
  );
}

function StockPill({ label, pulse }: { label: string; pulse: 'green' | 'amber' }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-block h-2 w-2 flex-shrink-0 rounded-full ${
          pulse === 'green' ? 'bg-emerald-500' : 'bg-amber-500'
        } animate-pulse`}
        aria-hidden
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}

/**
 * Home page Comparison: 3-column decision matrix (Brand / Compounded / Oral).
 * Compounded card is highlighted as the value choice. Price gauge, stock pulse, 2026 tags, CTAs.
 */
export default function HomeComparisonSection() {
  return (
    <section id="comparison" className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Find the Right Path to Your Goal (2026 Updated)
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Compare price, availability, and how you take it—then explore the option that fits.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className={`flex flex-col rounded-lg border-2 bg-white p-6 shadow-md transition-shadow hover:shadow-lg ${
                card.highlighted
                  ? 'border-primary-400 ring-2 ring-primary-200 ring-offset-2 sm:-mt-1 sm:scale-[1.02]'
                  : 'border-gray-200'
              }`}
            >
              {'saveBadge' in card && card.saveBadge && (
                <div className="mb-3 inline-flex w-fit animate-pulse rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  {card.saveBadge}
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-primary-600">
                {card.tag}
              </p>

              <div className="mt-4">
                <PriceGauge price={card.price} status={card.priceStatus} />
              </div>
              <div className="mt-4">
                <StockPill label={card.stock} pulse={card.stockPulse} />
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <span className="font-medium">Mode:</span> {card.mode}
              </div>
              <div className="mt-1 text-xs text-gray-600">
                <span className="font-medium">Time to access:</span> {card.timeToAccess}
              </div>

              <div className="mt-4 rounded bg-gray-50 px-2 py-1.5 text-center text-xs font-medium text-gray-600">
                {card.updateTag}
              </div>

              <Link
                href={card.href}
                className="mt-6 inline-flex items-center justify-center rounded-md border-2 border-primary-500 bg-white px-4 py-2.5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
              >
                {card.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

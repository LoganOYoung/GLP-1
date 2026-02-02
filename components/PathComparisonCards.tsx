'use client';

import Link from 'next/link';
import ImagePlaceholder from './ImagePlaceholder';

export default function PathComparisonCards() {
  const tiers = [
    {
      name: 'Brand Name',
      subtitle: 'Wegovy / Zepbound',
      icon: null,
      price: '$650 - $1,050',
      priceDetail: 'With Savings Card',
      availability: 'Intermittent',
      availabilityStatus: 'warning' as const,
      features: ['FDA Approved', 'Clinical Gold Standard', 'Insurance-Dependent'],
      cta: 'Check Pharmacy Stock',
      ctaLink: '/legitimacy/shortage',
      highlight: false,
    },
    {
      name: 'Compounded',
      subtitle: 'Semaglutide / Tirzepatide',
      icon: null,
      price: '$199 - $399',
      priceDetail: 'Flat Monthly Rate',
      availability: 'High / Ready to Ship',
      availabilityStatus: 'success' as const,
      features: ['PCAB Accredited Labs', 'No Insurance Required', 'HSA/FSA Eligible', 'Free 2-Day Shipping'],
      cta: 'Start Online Visit',
      ctaLink: '/alternatives',
      highlight: true, // 核心转化项
    },
    {
      name: 'Oral Next-Gen',
      subtitle: 'Orforglipron / Oral Wegovy',
      icon: null,
      price: '$150 - $450',
      priceDetail: 'Launch Pricing 2026',
      availability: 'Pre-Order / New Launch',
      availabilityStatus: 'info' as const,
      features: ['No Needles', 'Travel Friendly', 'Lower Peak Efficacy'],
      cta: 'Join Waitlist',
      ctaLink: '/alternatives',
      highlight: false,
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-page">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Three Paths: Brand vs Compounded vs Oral
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Compare your options side-by-side. Compounded offers the best value for most users.
          </p>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <TierCard key={idx} tier={tier} />
          ))}
        </div>

        {/* Mobile: Stacked cards with sticky header */}
        <div className="md:hidden space-y-6">
          <MobileStickyHeader tiers={tiers} />
          {tiers.map((tier, idx) => (
            <TierCard key={idx} tier={tier} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TierCard({
  tier,
}: {
  tier: {
    name: string;
    subtitle: string;
    icon: React.ReactNode;
    price: string;
    priceDetail: string;
    availability: string;
    availabilityStatus: 'success' | 'warning' | 'info';
    features: string[];
    cta: string;
    ctaLink: string;
    highlight: boolean;
  };
}) {
  return (
    <div
      className={`relative flex flex-col p-6 sm:p-8 bg-white border shadow-sm transition-colors ${
        tier.highlight
          ? 'ring-2 ring-primary-500 z-10 shadow-xl border-primary-200'
          : 'border-gray-200'
      }`}
    >
      {tier.highlight && (
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-none text-xs sm:text-sm font-bold uppercase tracking-widest whitespace-nowrap">
          Best Value 2026
        </span>
      )}

      <div className="relative mb-4 h-32 w-full overflow-hidden rounded-none">
        <ImagePlaceholder
          src={tier.name === 'Brand Name' ? '/images/infographics/brand-medication-card.webp' : tier.name === 'Compounded' ? '/images/infographics/compounded-medication-card.webp' : '/images/infographics/oral-medication-card.webp'}
          alt={`${tier.name} medication`}
          width={400}
          height={128}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>

      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{tier.name}</h3>
        <p className="text-xs sm:text-sm text-gray-500">{tier.subtitle}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            {tier.price}
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          {tier.priceDetail}
        </p>
      </div>

      <div className="mb-8 flex-1">
        <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
          Availability
        </div>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium mb-6 ${
            tier.availabilityStatus === 'success'
              ? 'bg-green-100 text-green-700'
              : tier.availabilityStatus === 'warning'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-primary-100 text-primary-700'
          }`}
        >
          {tier.availability}
        </div>

        <ul className="space-y-3 sm:space-y-4">
          {tier.features.map((feature, i) => (
            <li key={i} className="text-gray-600 text-xs sm:text-sm">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={tier.ctaLink}
        className={`w-full py-3 sm:py-4 font-bold text-sm sm:text-base transition-colors text-center ${
          tier.highlight
            ? 'bg-primary-600 text-white hover:bg-primary-700'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        {tier.cta}
      </Link>
    </div>
  );
}

function MobileStickyHeader({
  tiers,
}: {
  tiers: Array<{ name: string; highlight: boolean }>;
}) {
  return (
    <div className="sticky top-14 z-20 bg-gray-50 border-b border-gray-200 -mx-4 px-4 pb-3 pt-2">
      <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`flex-1 min-w-[100px] text-center px-2 py-2 text-xs font-semibold transition-colors ${
              tier.highlight
                ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            {tier.name}
          </div>
        ))}
      </div>
    </div>
  );
}

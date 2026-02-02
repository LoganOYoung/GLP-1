'use client';

import { ExternalLink, CheckCircle2, XCircle } from 'lucide-react';
import { DISCOUNT_CARDS, type DiscountCard } from './cost-insurance-data';

interface DiscountCardGridProps {
  selectedDrug?: string | null;
}

export default function DiscountCardGrid({ selectedDrug }: DiscountCardGridProps) {
  // Filter cards by selected drug
  const filteredCards = selectedDrug
    ? DISCOUNT_CARDS.filter((card) => card.drug.includes(selectedDrug) || card.drug.includes('All GLP-1 medications'))
    : DISCOUNT_CARDS;

  return (
    <div className="space-y-4">
      {filteredCards.map((card) => (
        <DiscountCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}

function DiscountCardItem({ card }: { card: DiscountCard }) {
  return (
    <div className="group rounded-none border-2 border-primary-100 bg-gradient-to-br from-white to-primary-50/20 p-6 shadow-sm transition-all duration-200  hover:border-primary-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900">{card.name}</h3>
            {card.hsaFsaEligible && (
              <span className="rounded-none bg-secondary-100 px-2 py-0.5 text-xs font-medium text-secondary-600">
                HSA/FSA
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-600">{card.who}</p>
          <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-600">
            <span>
              <strong className="text-slate-900">Max Savings:</strong> {card.maxSavings}
            </span>
            <span>
              <strong className="text-slate-900">Valid Until:</strong> {card.validUntil}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">{card.note}</p>
        </div>
        <a
          href={card.officialLink}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="ml-4 flex items-center gap-1 rounded-none border-2 border-primary-200 bg-white px-4 py-2 text-xs font-semibold text-primary-600 transition-all duration-200 hover:border-primary-400 hover:bg-primary-50 hover:shadow-sm"
          title={`Visit ${card.name} official website`}
        >
          Visit Site
          <ExternalLink className="h-3 w-3 transition-transform group-" />
        </a>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {card.drug.map((drugName) => (
          <span
            key={drugName}
            className="rounded-none bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
          >
            {drugName}
          </span>
        ))}
      </div>
    </div>
  );
}

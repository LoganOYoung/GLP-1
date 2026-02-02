'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_ITEMS, type FAQItem } from './cost-insurance-data';

interface FAQSectionProps {
  /** Optional subset of items (e.g. first 5); defaults to all */
  items?: FAQItem[];
  /** Show "More cost & insurance questions → /faq" link below */
  showMoreLink?: boolean;
}

export default function FAQSection({ items = FAQ_ITEMS, showMoreLink }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => toggleFAQ(index)}
          />
        ))}
      </div>
      {showMoreLink && (
        <p className="mt-4 text-sm text-slate-600">
          <Link href="/faq" className="font-medium text-primary-600 underline hover:no-underline">
            More cost & insurance questions →
          </Link>
        </p>
      )}
    </div>
  );
}

function FAQItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-none border border-slate-200 bg-slate-50">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-100"
      >
        <span className="pr-4 text-sm font-medium text-slate-900">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 flex-shrink-0 text-slate-500" />
        ) : (
          <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-500" />
        )}
      </button>
      {isOpen && (
        <div className="border-t border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-700">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

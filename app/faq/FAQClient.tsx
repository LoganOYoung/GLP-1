'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  FAQ_ITEMS,
  FAQ_CATEGORIES,
  type FAQItem,
  type FAQCategory,
} from './faq-data';

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
  onHelpful,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  onHelpful: (id: string, helpful: boolean) => void;
}) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleHelpful = (helpful: boolean) => {
    if (feedback != null) return;
    setFeedback(helpful ? 'up' : 'down');
    onHelpful(item.id, helpful);
  };

  return (
    <div
      id={item.id}
      className="scroll-mt-24 border-b border-slate-200 last:border-0"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
      >
        <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
        <span
          className={`shrink-0 text-emerald-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        className={`overflow-hidden transition-all ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="pb-4">
          <p className="text-sm leading-relaxed text-slate-700">{item.answer}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Was this helpful?</span>
            <button
              type="button"
              onClick={() => handleHelpful(true)}
              disabled={feedback != null}
              className={`rounded p-1.5 transition ${
                feedback === 'up'
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-emerald-600'
              } ${feedback != null ? 'cursor-default' : ''}`}
              aria-label="Yes, helpful"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 11V4a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleHelpful(false)}
              disabled={feedback != null}
              className={`rounded p-1.5 transition ${
                feedback === 'down'
                  ? 'bg-slate-200 text-slate-600'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
              } ${feedback != null ? 'cursor-default' : ''}`}
              aria-label="No, not helpful"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-11V4a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v7h7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiagramPlaceholder({ title, className }: { title: string; className?: string }) {
  return (
    <div
      className={`flex min-h-[180px] items-center justify-center rounded-none border-2 border-dashed border-slate-200 bg-slate-50 text-slate-500 ${className ?? ''}`}
    >
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
}

/** Wrapper that reads ?q= from URL and passes to FAQClient (keeps FAQ page static). */
export function FAQClientWrapper() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  return <FAQClient initialQuery={q} />;
}

export default function FAQClient({ initialQuery }: { initialQuery?: string }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery ?? '');
  const [activeCategory, setActiveCategory] = useState<FAQCategory | 'All'>('All');
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialQuery && searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [initialQuery]);

  const filteredItems = useMemo(() => {
    const byCategory =
      activeCategory === 'All'
        ? FAQ_ITEMS
        : FAQ_ITEMS.filter((f) => f.category === activeCategory);
    if (!searchQuery.trim()) return byCategory;
    const q = searchQuery.trim().toLowerCase();
    return byCategory.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [activeCategory, searchQuery]);

  const handleHelpful = (_id: string, _helpful: boolean) => {
    // Could send to analytics or backend
  };

  return (
    <div className="container-page section-pad-tight">
      <div className="lg:grid lg:grid-cols-[240px_1fr_200px] lg:gap-8">
        {/* Sidebar */}
        <aside className="mb-8 lg:mb-0 lg:block">
          <nav className="sticky top-24 space-y-1" aria-label="FAQ categories">
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className={`block w-full rounded-none px-3 py-2 text-left text-sm font-medium transition ${
                activeCategory === 'All'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              All
            </button>
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`block w-full rounded-none px-3 py-2 text-left text-sm font-medium transition ${
                  activeCategory === cat
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="min-w-0">
          {/* Search */}
          <div className="mb-6">
            <label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                ref={searchInputRef}
                id="faq-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword, tag (e.g. #Cost, #Insurance)"
                className="w-full rounded-none border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Category sections */}
          <div className="space-y-10">
            {(activeCategory === 'All' ? FAQ_CATEGORIES : [activeCategory]).map(
              (category) => {
                const items = filteredItems.filter((f) => f.category === category);
                if (items.length === 0) return null;
                return (
                  <section key={category} id={category.replace(/\s+/g, '-').toLowerCase()}>
                    <h2 className="text-xl font-semibold text-slate-900">{category}</h2>
                    {category === 'Side Effects' && (
                      <DiagramPlaceholder
                        title="[Diagram: Common side effects overview]"
                        className="mt-4"
                      />
                    )}
                    {category === 'New Oral Pills' && (
                      <DiagramPlaceholder
                        title="[Diagram: Oral vs injection effectiveness comparison]"
                        className="mt-4"
                      />
                    )}
                    <ul className="mt-4 list-none">
                      {items.map((item) => (
                        <li key={item.id}>
                          <FaqAccordionItem
                            item={item}
                            isOpen={openId === item.id}
                            onToggle={() =>
                              setOpenId((prev) => (prev === item.id ? null : item.id))
                            }
                            onHelpful={handleHelpful}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              }
            )}
          </div>

          {filteredItems.length === 0 && (
            <p className="py-8 text-center text-slate-600">
              No questions match your search. Try a different keyword or category.
            </p>
          )}

          <div className="mt-10 border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-600">
              <Link href="/" className="font-medium text-emerald-600 hover:underline">
                Back to home
              </Link>
              {' · '}
              <Link href="/about" className="font-medium text-emerald-600 hover:underline">
                About
              </Link>
              {' · '}
              <Link href="/calculator" className="font-medium text-emerald-600 hover:underline">
                Calculator
              </Link>
            </p>
          </div>
        </div>

        {/* Sticky Price Alert CTA (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-none border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Price Alert</h3>
            <p className="mt-2 text-xs text-slate-600">
              Get notified when prices or programs change for your medication.
            </p>
            <Link
              href="/calculator"
              className="mt-4 inline-flex w-full items-center justify-center rounded-none bg-emerald-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Estimate your cost
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

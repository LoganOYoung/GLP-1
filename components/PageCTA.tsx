import Link from 'next/link';

interface PageCTAProps {
  /** Short headline, e.g. "Get a personalized estimate" */
  title: string;
  /** Primary CTA label */
  ctaLabel: string;
  /** Primary CTA href (e.g. /calculator or /quiz) */
  ctaHref: string;
  /** Optional secondary CTA */
  secondaryLabel?: string;
  secondaryHref?: string;
}

/**
 * Reusable bottom CTA block for content pages. Keeps layout and copy consistent.
 */
export default function PageCTA({ title, ctaLabel, ctaHref, secondaryLabel, secondaryHref }: PageCTAProps) {
  return (
    <section className="rounded-none border border-primary-200 bg-primary-50/50 p-6 text-center sm:p-8">
      <p className="text-lg font-semibold text-gray-900">{title}</p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary-600"
        >
          {ctaLabel}
        </Link>
        {secondaryLabel && secondaryHref && (
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 border-2 border-primary-500 bg-white px-5 py-2.5 text-sm font-semibold text-primary-500 transition-colors hover:bg-primary-50"
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </section>
  );
}

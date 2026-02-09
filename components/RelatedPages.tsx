import Link from 'next/link';

interface RelatedPage {
  title: string;
  description: string;
  href: string;
  image?: string;
  category?: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
  title?: string;
}

export default function RelatedPages({ pages, title = 'Related Pages' }: RelatedPagesProps) {
  if (pages.length === 0) return null;

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="container-page">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">{title}</h2>
        <ul className="flex flex-col gap-3 sm:gap-4" role="list">
          {pages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="group flex min-h-[44px] flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-primary-300 hover:bg-white hover:shadow-sm active:bg-gray-50 sm:flex-nowrap sm:items-baseline sm:gap-4 sm:py-3"
              >
                {page.category && (
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-primary-600">
                    {page.category}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="font-bold text-gray-900 group-hover:text-primary-600 group-active:text-primary-700">
                    {page.title}
                  </span>
                  <span className="ml-2 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-500" aria-hidden>
                    →
                  </span>
                </span>
                <span className="w-full text-sm text-gray-600 sm:w-auto sm:max-w-md">
                  {page.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

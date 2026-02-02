import Link from 'next/link';
import ImagePlaceholder from './ImagePlaceholder';

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex flex-col overflow-hidden border border-gray-200 bg-white transition-colors hover:border-primary-300 hover:bg-gray-50"
            >
              {page.image && (
                <div className="relative h-32 w-full overflow-hidden">
                  <ImagePlaceholder
                    src={page.image}
                    alt={page.title}
                    width={400}
                    height={128}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex-1 p-4">
                {page.category && (
                  <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wide text-primary-600">
                    {page.category}
                  </span>
                )}
                <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-primary-600">
                  {page.title}
                </h3>
                <p className="text-sm text-gray-600">{page.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

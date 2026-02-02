import Link from 'next/link';

type Crumb = { label: string; href?: string };

const SITE_URL = 'https://www.rxlikewise.com';

function buildBreadcrumbSchema(items: Crumb[]) {
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    ...items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const breadcrumbSchema = buildBreadcrumbSchema(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="hover:text-gray-900">Home</Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-x-2">
              <span aria-hidden className="text-gray-400">/</span>
              {item.href ? (
                <Link href={item.href} className="hover:text-gray-900">{item.label}</Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

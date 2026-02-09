import Image from 'next/image';
import Link from 'next/link';

const SITE_URL = 'https://www.rxlikewise.com';

/** Footer = Quick links 分三列 + Legal 一列 */
const QUICK_LINKS_COL1 = [
  { href: '/', label: 'Home' },
  { href: '/quiz', label: 'Find Your Option' },
  { href: '/cost-insurance', label: 'Cost & Insurance' },
  { href: '/calculator', label: 'Cost Calculator' },
  { href: '/alternatives', label: 'Alternatives' },
] as const;
const QUICK_LINKS_COL2 = [
  { href: '/comparison', label: 'Tirzepatide vs Semaglutide' },
  { href: '/legitimacy', label: 'Pharmacy Radar' },
  { href: '/legitimacy/shortage', label: 'FDA Shortage' },
  { href: '/tools/dose-converter', label: 'Dose Converter' },
  { href: '/cost-insurance/appeals', label: 'Appeal Templates' },
] as const;
const QUICK_LINKS_COL3 = [
  { href: '/cost-insurance#discount-cards', label: 'Discount Cards' },
  { href: '/trumprx', label: 'TrumpRx Policy' },
  { href: '/labs', label: 'Clinical Data' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
] as const;

const LEGAL_LINKS = [
  { href: '/about#disclaimer', label: 'Disclaimer' },
  { href: '/about#privacy', label: 'Privacy' },
  { href: '/about#terms', label: 'Terms of Use' },
] as const;

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rx Likewise',
    description:
      'Same results, smarter choices. Independent decision-support platform for GLP-1 medications. Real-time pricing, verified pharmacies, 2026 policy engine.',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logos/logo.png`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };
}

const linkClass =
  'block py-1.5 text-sm text-gray-600 transition-colors hover:text-primary-500 md:py-1';

function LinkColumn({
  links,
}: {
  links: readonly { href: string; label: string }[];
}) {
  return (
    <ul className="space-y-1">
      {links.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={linkClass}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const organizationSchema = buildOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <footer className="border-t-2 border-primary-100 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-page section-pad">
          {/* Logo + 声明（与 header 一致：图标 + Likewise） */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label="Rx Likewise – Home"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded bg-white sm:h-7 sm:w-7">
                <Image
                  src="/images/logos/favicon.png"
                  alt=""
                  width={28}
                  height={28}
                  className="h-6 w-6 object-contain sm:h-7 sm:w-7"
                />
              </span>
              <span className="text-xl font-bold tracking-tight sm:text-2xl">Likewise</span>
            </Link>
            <hr className="mt-2 border-gray-200" aria-hidden />
            <p className="mt-3 max-w-2xl overflow-x-auto text-sm leading-relaxed text-gray-600 whitespace-nowrap">
              This site is an information hub, not a pharmacy. We do not prescribe or sell medications.{' '}
              <strong className="text-gray-800">Informational only. Not medical advice.</strong>{' '}
              Consult your doctor and verify pharmacy legitimacy.{' '}
              <Link
                href="/about"
                className="font-medium text-primary-500 underline hover:no-underline"
              >
                Learn more
              </Link>
              .
            </p>
          </div>

          {/* Quick links 三列 + Legal 一列 */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Quick links
              </h3>
              <LinkColumn links={QUICK_LINKS_COL1} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Compare & tools
              </h3>
              <LinkColumn links={QUICK_LINKS_COL2} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Resources
              </h3>
              <LinkColumn links={QUICK_LINKS_COL3} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Legal
              </h3>
              <LinkColumn links={LEGAL_LINKS} />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-2 border-t border-primary-100 pt-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Rx Likewise. Same results, smarter choices. US audience. Not medical advice.
            </p>
            <p className="text-xs text-gray-400">Content updated 2026.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

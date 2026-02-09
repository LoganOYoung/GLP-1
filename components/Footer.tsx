import Image from 'next/image';
import Link from 'next/link';

const SITE_URL = 'https://www.rxlikewise.com';

/** Footer = Quick links：平铺常用链接，不按 header 分组 */
const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/quiz', label: 'Find Your Option' },
  { href: '/cost-insurance', label: 'Cost & Insurance' },
  { href: '/calculator', label: 'Cost Calculator' },
  { href: '/alternatives', label: 'Alternatives' },
  { href: '/comparison', label: 'Tirzepatide vs Semaglutide' },
  { href: '/legitimacy', label: 'Pharmacy Radar' },
  { href: '/legitimacy/shortage', label: 'FDA Shortage' },
  { href: '/tools/dose-converter', label: 'Dose Converter' },
  { href: '/cost-insurance/appeals', label: 'Appeal Templates' },
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
  'block py-2 transition-colors hover:text-primary-500 md:py-0 min-h-[44px] flex items-center md:min-h-0 text-sm text-gray-600';

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
            <div className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
              <p className="mb-1">
                This site is an information hub, not a pharmacy. We do not prescribe or sell medications.
              </p>
              <p className="mb-1">
                <strong className="text-gray-800">Informational only. Not medical advice.</strong>
              </p>
              <p>
                Consult your doctor and verify pharmacy legitimacy.{' '}
                <Link
                  href="/about"
                  className="font-medium text-primary-500 underline hover:no-underline whitespace-nowrap"
                >
                  Learn more
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Quick links：平铺，多列流动 */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2">
              <h3 className="mb-3 text-sm font-bold text-gray-900">Quick links</h3>
              <ul className="columns-2 gap-x-8 text-sm lg:columns-3 [&>li]:break-inside-avoid">
                {QUICK_LINKS.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">Legal</h3>
              <ul className="space-y-0 text-sm">
                {LEGAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-gray-500">
                Informational only. We do not prescribe or sell medications. Some links may be affiliate or sponsored.
                Consult your doctor; verify pharmacy legitimacy.{' '}
                <Link href="/about" className="font-medium text-primary-500 underline hover:no-underline">
                  Learn more
                </Link>
                .
              </p>
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

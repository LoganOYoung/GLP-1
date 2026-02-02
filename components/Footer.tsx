import Link from 'next/link';
import { NAV_GROUPS } from '@/lib/nav-config';

const SITE_URL = 'https://www.rxlikewise.com';

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rx Likewise',
    description:
      'Same results, smarter choices. Independent decision-support platform for GLP-1 medications. Real-time pricing, verified pharmacies, 2026 policy engine.',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logos/logo.webp`,
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

/** Footer-only links not in nav (shortage, drug info, discount cards, appeals) */
const FOOTER_EXTRA_LINKS = {
  safetyTrust: [
    { href: '/legitimacy/shortage', label: 'FDA Shortage Status' },
  ] as const,
  resources: [
    { href: '/cost-insurance/appeals', label: 'Appeal Templates' },
    { href: '/cost-insurance#discount-cards', label: 'Discount Cards' },
    { href: '/drugs/wegovy', label: 'Drug Info (Wegovy)' },
  ] as const,
};

const LEGAL_LINKS = [
  { href: '/about#disclaimer', label: 'Disclaimer' },
  { href: '/about#privacy', label: 'Privacy' },
  { href: '/about#terms', label: 'Terms of Use' },
] as const;

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
          {/* 全站迷你分流：与 nav / 首页一致 */}
          <div className="mb-8 rounded-lg border border-primary-200 bg-primary-50/50 px-4 py-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Start by your situation
            </p>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href="/calculator"
                  className="inline-flex items-center min-h-[44px] rounded-md border border-primary-300 bg-white px-4 py-2.5 text-sm font-medium text-primary-700 hover:bg-primary-50 md:min-h-0 md:py-1.5 md:px-3"
                >
                  I have insurance → Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/alternatives"
                  className="inline-flex items-center min-h-[44px] rounded-md border border-secondary-300 bg-white px-4 py-2.5 text-sm font-medium text-secondary-700 hover:bg-secondary-50 md:min-h-0 md:py-1.5 md:px-3"
                >
                  Uninsured / paying cash → Alternatives
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="inline-flex items-center min-h-[44px] rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 md:min-h-0 md:py-1.5 md:px-3"
                >
                  Not sure → Find your option
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* 6 个 nav 组合并为 3 列：Get Started+Costs | Alternatives+Safety | Tools+Resources */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="mb-3 text-sm font-bold text-gray-900">Get Started & Costs</h3>
              <ul className="space-y-0 text-sm">
                {NAV_GROUPS.filter((g) => g.id === 'getStarted' || g.id === 'costsSavings').flatMap((group) =>
                  group.links.map((link) => (
                    <li key={`${group.id}-${link.href}-${link.label}`}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">Alternatives & Safety</h3>
              <ul className="space-y-0 text-sm">
                {NAV_GROUPS.filter((g) => g.id === 'alternatives' || g.id === 'safetyTrust').flatMap((group) => [
                  ...group.links.map((link) => (
                    <li key={`${group.id}-${link.href}-${link.label}`}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  )),
                  ...(group.id === 'safetyTrust'
                    ? FOOTER_EXTRA_LINKS.safetyTrust.map((extra) => (
                        <li key={extra.href}>
                          <Link href={extra.href} className={linkClass}>
                            {extra.label}
                          </Link>
                        </li>
                      ))
                    : []),
                ])}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">Tools & Resources</h3>
              <ul className="space-y-0 text-sm">
                {NAV_GROUPS.filter((g) => g.id === 'tools' || g.id === 'resources').flatMap((group) => [
                  ...group.links.map((link) => (
                    <li key={`${group.id}-${link.href}-${link.label}`}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  )),
                  ...(group.id === 'resources'
                    ? FOOTER_EXTRA_LINKS.resources.map((extra) => (
                        <li key={extra.href}>
                          <Link href={extra.href} className={linkClass}>
                            {extra.label}
                          </Link>
                        </li>
                      ))
                    : []),
                ])}
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

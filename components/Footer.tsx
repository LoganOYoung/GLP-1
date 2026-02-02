import Link from 'next/link';

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
          {/* 全站迷你分流：任意页底部都可按角色再选入口 */}
          <div className="mb-8 rounded-lg border border-primary-200 bg-primary-50/50 px-4 py-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Start by your situation
            </p>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link href="/calculator" className="inline-flex items-center min-h-[44px] rounded-md border border-primary-300 bg-white px-4 py-2.5 text-sm font-medium text-primary-700 hover:bg-primary-50 md:min-h-0 md:py-1.5 md:px-3">
                  I have insurance → Calculator
                </Link>
              </li>
              <li>
                <Link href="/alternatives" className="inline-flex items-center min-h-[44px] rounded-md border border-secondary-300 bg-white px-4 py-2.5 text-sm font-medium text-secondary-700 hover:bg-secondary-50 md:min-h-0 md:py-1.5 md:px-3">
                  Uninsured / paying cash → Alternatives
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="inline-flex items-center min-h-[44px] rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 md:min-h-0 md:py-1.5 md:px-3">
                  Not sure → Find your option
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">Content</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  <Link href="/alternatives" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Alternatives
                  </Link>
                </li>
                <li>
                  <Link href="/comparison" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Compare Drugs
                  </Link>
                </li>
                <li>
                  <Link href="/cost-insurance" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Cost & Insurance
                  </Link>
                </li>
                <li>
                  <Link href="/legitimacy" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Legitimacy
                  </Link>
                </li>
                <li>
                  <Link href="/legitimacy/shortage" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    FDA Shortage Status
                  </Link>
                </li>
                <li>
                  <Link href="/drugs/wegovy" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Drug Information
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">Tools</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  <Link href="/calculator" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Cost Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/dose-converter" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Dose Converter
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Find Your Option
                  </Link>
                </li>
                <li>
                  <Link href="/labs" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Lab Transparency
                  </Link>
                </li>
                <li>
                  <Link href="/trumprx" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    TrumpRx $350 Program
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">Resources</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  <Link href="/faq" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/cost-insurance/appeals" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Appeal Center
                  </Link>
                </li>
                <li>
                  <Link href="/cost-insurance#discount-cards" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Discount Cards
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">Legal</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  <Link href="/about#disclaimer" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/about#privacy" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/about#terms" className="block py-2 transition-colors hover:text-primary-500 md:py-0">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">Disclaimer</h3>
              <p className="text-sm leading-relaxed text-gray-600">
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
            <p className="text-xs text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

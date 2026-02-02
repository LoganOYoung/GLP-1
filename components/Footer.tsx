import Link from 'next/link';

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GLP-1 Guide',
    description:
      'Independent decision-support platform for GLP-1 medications. Real-time pricing, verified pharmacies, 2026 policy engine.',
    url: 'https://glp1guide.com',
    logo: 'https://glp1guide.com/images/logos/logo.webp',
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
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
          {/* 全站迷你分流：任意页底部都可按角色再选入口 */}
          <div className="mb-8 rounded-lg border border-primary-200 bg-primary-50/50 px-4 py-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Start by your situation
            </p>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link href="/calculator" className="rounded-md border border-primary-300 bg-white px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50">
                  I have insurance → Calculator
                </Link>
              </li>
              <li>
                <Link href="/alternatives" className="rounded-md border border-secondary-300 bg-white px-3 py-1.5 text-sm font-medium text-secondary-700 hover:bg-secondary-50">
                  Uninsured / paying cash → Alternatives
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Not sure → Find your option
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">Content</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/alternatives" className="transition-colors hover:text-primary-500">
                    Alternatives
                  </Link>
                </li>
                <li>
                  <Link href="/comparison" className="transition-colors hover:text-primary-500">
                    Compare Drugs
                  </Link>
                </li>
                <li>
                  <Link href="/cost-insurance" className="transition-colors hover:text-primary-500">
                    Cost & Insurance
                  </Link>
                </li>
                <li>
                  <Link href="/legitimacy" className="transition-colors hover:text-primary-500">
                    Legitimacy
                  </Link>
                </li>
                <li>
                  <Link href="/legitimacy/shortage" className="transition-colors hover:text-primary-500">
                    FDA Shortage Status
                  </Link>
                </li>
                <li>
                  <Link href="/drugs/wegovy" className="transition-colors hover:text-primary-500">
                    Drug Information
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">Tools</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/calculator" className="transition-colors hover:text-primary-500">
                    Cost Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/dose-converter" className="transition-colors hover:text-primary-500">
                    Dose Converter
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="transition-colors hover:text-primary-500">
                    Find Your Option
                  </Link>
                </li>
                <li>
                  <Link href="/labs" className="transition-colors hover:text-primary-500">
                    Lab Transparency
                  </Link>
                </li>
                <li>
                  <Link href="/trumprx" className="transition-colors hover:text-primary-500">
                    TrumpRx $350 Program
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/faq" className="transition-colors hover:text-primary-500">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="transition-colors hover:text-primary-500">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/cost-insurance/appeals" className="transition-colors hover:text-primary-500">
                    Appeal Center
                  </Link>
                </li>
                <li>
                  <Link href="/cost-insurance#discount-cards" className="transition-colors hover:text-primary-500">
                    Discount Cards
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/about#disclaimer" className="transition-colors hover:text-primary-500">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/about#privacy" className="transition-colors hover:text-primary-500">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/about#terms" className="transition-colors hover:text-primary-500">
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
              © {new Date().getFullYear()} GLP-1 Guide. US audience. Not medical advice.
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

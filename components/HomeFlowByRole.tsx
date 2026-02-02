import Link from 'next/link';
import { Wallet, CreditCard, HelpCircle } from 'lucide-react';

/**
 * 首页分流模块：按用户角色/情境（有保险 vs 无保险 vs 不确定）快速导向深层页面。
 * 放在 Hero 下方，确保「一进站就能被分流到正确入口」。
 */
const ROUTES = [
  {
    id: 'insured',
    label: 'I have insurance',
    description: 'Estimate your out-of-pocket cost and check PA success. Use discount cards and appeal templates if denied.',
    primaryHref: '/calculator',
    primaryLabel: 'Check my cost',
    secondaryHref: '/cost-insurance',
    secondaryLabel: 'Discount cards & appeals',
    icon: Wallet,
    accent: 'primary' as const,
  },
  {
    id: 'uninsured',
    label: 'I\'m uninsured or paying cash',
    description: 'Compare brand vs compounded vs oral. See prices, availability, and how to save with discount programs or TrumpRx.',
    primaryHref: '/alternatives',
    primaryLabel: 'Compare options',
    secondaryHref: '/cost-insurance',
    secondaryLabel: 'Discounts & TrumpRx $350',
    icon: CreditCard,
    accent: 'secondary' as const,
  },
  {
    id: 'unsure',
    label: 'Not sure where to start?',
    description: 'Answer a few questions about budget, preference, and goals. Get a personalized path—brand, compounded, or oral.',
    primaryHref: '/quiz',
    primaryLabel: 'Find my option',
    secondaryHref: '/comparison',
    secondaryLabel: 'Compare drugs',
    icon: HelpCircle,
    accent: 'neutral' as const,
  },
] as const;

export default function HomeFlowByRole() {
  return (
    <section
      id="start-by-situation"
      className="border-b border-gray-200 bg-white"
      aria-label="Start by your situation"
    >
      <div className="container-page section-pad-tight">
        <h2 className="text-center text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Start by your situation
        </h2>
        <p className="mt-1 text-center text-sm text-gray-600">
          Choose the path that fits you—we&apos;ll take you to the right page.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {ROUTES.map((route) => {
            const Icon = route.icon;
            const isPrimary = route.accent === 'primary';
            const isSecondary = route.accent === 'secondary';
            const primaryBtnClass = isPrimary
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : isSecondary
                ? 'bg-secondary-500 text-white hover:bg-secondary-600'
                : 'border-2 border-gray-700 bg-white text-gray-800 hover:bg-gray-50';

            return (
              <div
                key={route.id}
                className="flex flex-col rounded-lg border-2 border-gray-200 bg-gray-50/50 p-5 shadow-sm transition hover:border-gray-300 hover:shadow"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    isPrimary
                      ? 'bg-primary-100 text-primary-600'
                      : isSecondary
                        ? 'bg-secondary-100 text-secondary-600'
                        : 'bg-gray-200 text-gray-600'
                  }`}
                  aria-hidden
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-gray-900">
                  {route.label}
                </h3>
                <p className="mt-1.5 flex-1 text-sm text-gray-600">
                  {route.description}
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href={route.primaryHref}
                    className={`inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold transition ${primaryBtnClass}`}
                  >
                    {route.primaryLabel}
                  </Link>
                  <Link
                    href={route.secondaryHref}
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {route.secondaryLabel}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Shield, Search, Database, Code, Clock, CheckCircle2, Users, TrendingUp, FileText, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function AboutClient() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero + Value Proposition */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page section-pad">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              We&apos;re Your Trust Oasis in the GLP-1 Information Chaos
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Real-time data, verified sources, actionable insights—not static blogs. We help 50K+ users navigate GLP-1 medications with transparency and accuracy.
            </p>
          </div>

          {/* Key Metrics Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard icon={<Users className="h-6 w-6" />} value="50K+" label="Users Helped" />
            <MetricCard icon={<Shield className="h-6 w-6" />} value="100%" label="LegitScript Verified" />
            <MetricCard icon={<Clock className="h-6 w-6" />} value="Daily" label="2026 Policy Engine" />
            <MetricCard icon={<Database className="h-6 w-6" />} value="Live" label="Real-Time Prices" />
          </div>

          {/* Top CTA - Email Signup */}
          <div className="mt-8 rounded-none border-2 border-primary-200 bg-primary-50 p-6">
            <h2 className="text-lg font-semibold text-primary-900">Get Your 2026 Coverage Report</h2>
            <p className="mt-1 text-sm text-primary-800">
              Receive personalized cost breakdowns, PA success strategies, and policy updates via email.
            </p>
            <div className="mt-4">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>

      {/* Mission: 消除信息不对称 + 信任绿洲 */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page section-pad-tight">
          <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <MissionCard
              icon={<Search className="h-8 w-8" />}
              title="Eliminate Information Asymmetry"
              description="Users are lost in complex insurance policies, fluctuating pharmacy stock, and confusing alternative options. We provide a one-stop decision engine: Calculator, Alternatives Hub, and Legitimacy Tracker."
              features={['Out-of-Pocket Calculator', 'Alternative Comparison', 'Insurance Appeal Templates', 'Stock Tracker']}
            />
            <div className="space-y-4">
              <MissionCard
                icon={<Shield className="h-8 w-8" />}
                title="Build a Trust Oasis"
                description="In a market flooded with illegal 'research peptides,' we filter platforms through LegitScript certification standards. All recommended pharmacies are verified through State Board of Pharmacy."
                features={['LegitScript Certified Only', 'State Board Verified', 'FDA Registration Checked', 'Transparent Verification Process']}
              />
              <div className="relative h-40 w-full overflow-hidden rounded-none border border-slate-200 bg-slate-50">
                <ImagePlaceholder
                  src="/images/inline/about-trust-oasis.webp"
                  alt="Trust and verification - LegitScript and state board verified"
                  width={600}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Data Assets */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-page section-pad-tight">
          <h2 className="text-2xl font-bold text-slate-900">Technology & Data</h2>
          <p className="mt-2 text-slate-600">
            Our core IP and technical advantages that power accurate, real-time guidance.
          </p>

          <div className="mt-6 flex justify-center">
            <div className="relative h-44 w-full max-w-2xl overflow-hidden rounded-none border border-slate-200 bg-white shadow-sm">
              <ImagePlaceholder
                src="/images/inline/about-data-engine.webp"
                alt="Technology and data - 2026 policy engine and real-time data"
                width={640}
                height={176}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-8 space-y-8">
            {/* 2026 Policy Logic Engine */}
            <TechCard
              icon={<Code className="h-6 w-6" />}
              title="2026 Policy Logic Engine"
              description="Our Calculator engine integrates the latest 2026 policy data: TrumpRx $350 cap, Medicare Part D coverage rates, and Prior Authorization success probability prediction. This is our core IP and a key asset for future monetization."
              highlights={[
                'TrumpRx $350 cap calculation',
                'Medicare Part D 2026 coverage (75-85%)',
                'PA success probability based on comorbidities',
                'Insurance discount logic by provider type',
              ]}
            />

            {/* Real-Time Data Architecture */}
            <TechCard
              icon={<Database className="h-6 w-6" />}
              title="Real-Time Data Architecture"
              description="We abandoned static blog mode, adopting Next.js + real-time APIs. Users see 'prices updated 3 minutes ago,' not 'articles written last year.' Telehealth platform prices update hourly."
              highlights={[
                'Next.js + client-side API calls',
                'FDA Drug Shortages API integration',
                'Telehealth price tracking (hourly updates)',
                'Time-stamped data display',
              ]}
            />

            {/* Data Source Transparency */}
            <TechCard
              icon={<FileText className="h-6 w-6" />}
              title="Data Source Transparency"
              description="We are transparent about where our data comes from and how we verify it."
              highlights={[
                'FDA Drug Shortages API (public data)',
                'Telehealth platform public pricing (manually verified)',
                'Insurance formulary data (2026 public information)',
                'Cross-verification from multiple sources',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page section-pad-tight">
          <h2 className="text-2xl font-bold text-slate-900">Trust & Credibility</h2>
          <p className="mt-2 text-slate-600">
            How we verify sources and maintain transparency.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TrustBadge
              title="LegitScript Certified"
              description="All recommended pharmacies pass LegitScript certification. We only show 503A/503B licensed pharmacies."
              icon={<Shield className="h-6 w-6" />}
            />
            <TrustBadge
              title="State Board Verified"
              description="Every pharmacy is verified through State Board of Pharmacy. Active license status checked regularly."
              icon={<CheckCircle2 className="h-6 w-6" />}
            />
            <TrustBadge
              title="FDA Registration"
              description="FDA registration numbers verified. We cross-check with official FDA databases."
              icon={<FileText className="h-6 w-6" />}
            />
          </div>

          {/* Update Frequency Timeline */}
          <div className="mt-10 rounded-none border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Data Update Frequency</h3>
            <div className="mt-4 space-y-3">
              <UpdateFrequencyItem label="Telehealth Platform Prices" frequency="Hourly" />
              <UpdateFrequencyItem label="FDA Shortage Status" frequency="Daily" />
              <UpdateFrequencyItem label="2026 Policy Engine" frequency="When policies update" />
              <UpdateFrequencyItem label="Pharmacy Legitimacy" frequency="Monthly verification" />
            </div>
          </div>

          {/* Independence Statement */}
          <div className="mt-8 rounded-none border border-primary-200 bg-primary-50 p-6">
            <h3 className="font-semibold text-primary-900">Independence & Transparency</h3>
            <ul className="mt-3 space-y-2 text-sm text-primary-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>We are not affiliated with any pharmaceutical company or Telehealth platform.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Affiliate links are clearly marked and do not affect our recommendation neutrality.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>All cost estimates are indicative; actual prices depend on your plan, pharmacy, and region.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Asset Value (for potential buyers) - Collapsible */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-page section-pad-tight">
          <details className="group">
            <summary className="cursor-pointer text-xl font-semibold text-slate-900">
              Asset Value & Exit Strategy
              <span className="ml-2 text-sm font-normal text-slate-500">(For potential buyers/investors)</span>
            </summary>
            <div className="mt-6 space-y-6">
              <AssetCard
                title="Technical Assets"
                items={[
                  '2026 Policy Logic Engine (extensible to other medications)',
                  'Real-time data architecture (Next.js + API, can integrate more data sources)',
                  'SEO infrastructure (structured data, keyword optimization)',
                ]}
              />
              <AssetCard
                title="Data Assets"
                items={[
                  'Anonymous user intent mapping (BMI, insurance type, comorbidity distribution)',
                  'Price database (Telehealth platform historical pricing)',
                  'PA success rate data (prediction accuracy based on user inputs)',
                ]}
              />
              <AssetCard
                title="User Assets"
                items={[
                  'Email list (Lead Magnet collection)',
                  'Tool usage data (Calculator, Quiz conversion rates)',
                  'User engagement metrics',
                ]}
              />
              <div className="rounded-none border-2 border-primary-500 bg-primary-50 p-6">
                <h4 className="font-semibold text-primary-900">Valuation</h4>
                <p className="mt-2 text-sm text-primary-800">
                  In 2026, vertical tool sites like this typically value at <strong>36x - 45x monthly net profit</strong>.
                </p>
                <p className="mt-3 text-sm font-medium text-primary-900">Potential Buyers:</p>
                <ul className="mt-2 space-y-1 text-sm text-primary-800">
                  <li>• Large Telehealth companies seeking to reduce CAC</li>
                  <li>• Private equity funds looking for high-growth healthcare assets</li>
                  <li>• Traditional pharmacy chains transitioning to digital services</li>
                </ul>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* Tools CTA */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page section-pad-tight">
          <h2 className="text-xl font-semibold text-slate-900">Try Our Tools</h2>
          <p className="mt-2 text-slate-600">
            Get personalized estimates and recommendations.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ToolCTA
              title="Cost Calculator"
              description="Get your personalized 2026 cost estimate with PA success probability"
              href="/calculator"
            />
            <ToolCTA
              title="Alternatives Hub"
              description="Compare brand vs compounded vs oral with real-time pricing"
              href="/alternatives"
            />
            <ToolCTA
              title="Find Your Option"
              description="Answer a few questions for personalized recommendations"
              href="/quiz"
            />
          </div>
        </div>
      </section>

      {/* Disclaimer, Privacy, Terms & Contact */}
      <section className="scroll-mt-24 bg-slate-50" id="disclaimer">
        <div className="container-page section-pad-tight">
          <h2 className="text-xl font-semibold text-slate-900">Disclaimer</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-slate-400">•</span>
              <span>This site is for <strong>informational purposes only</strong>. It is not medical advice and does not replace your doctor or pharmacist.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-slate-400">•</span>
              <span>We do not prescribe, dispense, or sell any medication.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-slate-400">•</span>
              <span>Cost estimates and shortage information are indicative; actual prices and supply depend on your plan, pharmacy, and region.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-slate-400">•</span>
              <span>Always consult your healthcare provider before starting or changing any medication. Verify any pharmacy with your state board of pharmacy.</span>
            </li>
          </ul>

          <div id="privacy" className="mt-8 border-t border-slate-200 pt-8 scroll-mt-24">
            <h3 className="font-semibold text-slate-900">Privacy</h3>
            <p className="mt-2 text-sm text-slate-600">
              We do not sell your personal data. Newsletter signup and site usage are used only to improve our content and tools. See our cookie and data practices in this section.
            </p>
          </div>
          <div id="terms" className="mt-6 border-t border-slate-200 pt-6 scroll-mt-24">
            <h3 className="font-semibold text-slate-900">Terms of Use</h3>
            <p className="mt-2 text-sm text-slate-600">
              Use of this site is for informational purposes only. Not medical or legal advice. By using the site you agree to use it responsibly and to verify any pharmacy or program with official sources.
            </p>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8">
            <h3 className="font-semibold text-slate-900">Contact & Feedback</h3>
            <p className="mt-2 text-sm text-slate-600">
              We do not provide medical or legal advice. For site feedback or corrections, use the contact method in the footer when available. For adverse events or suspected fraud, report to{' '}
              <a
                href="https://www.fda.gov/safety/report-problem-fda"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-600 underline hover:no-underline"
              >
                FDA MedWatch
              </a>{' '}
              or{' '}
              <a
                href="https://reportfraud.ftc.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-600 underline hover:no-underline"
              >
                FTC
              </a>.
            </p>
          </div>

          {/* Bottom Email CTA */}
          <div className="mt-8 rounded-none border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Stay Updated</h3>
            <p className="mt-1 text-sm text-slate-600">
              Get 2026 policy updates, new tool releases, and cost-saving tips.
            </p>
            <div className="mt-4">
              <NewsletterSignup />
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-600">
              <Link href="/" className="font-medium text-primary-600 hover:underline">
                Back to home
              </Link>
              {' · '}
              <Link href="/faq" className="font-medium text-primary-600 hover:underline">
                FAQ
              </Link>
              {' · '}
              <Link href="/calculator" className="font-medium text-primary-600 hover:underline">
                Calculator
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-none border border-slate-200 bg-white p-4 shadow-sm transition hover:border-primary-300 hover:shadow">
      <div className="flex items-center gap-3">
        <div className="rounded-none bg-primary-100 p-2 text-primary-600">{icon}</div>
        <div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-600">{label}</p>
        </div>
      </div>
    </div>
  );
}

function MissionCard({
  icon,
  title,
  description,
  features,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 rounded-none bg-primary-100 p-3 text-primary-600 w-fit">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <ul className="mt-4 space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechCard({
  icon,
  title,
  description,
  highlights,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlights: string[];
}) {
  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-none bg-slate-100 p-2 text-slate-600">{icon}</div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <p className="text-sm text-slate-600">{description}</p>
      <ul className="mt-4 space-y-2">
        {highlights.map((highlight, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
            <span className="mt-1 text-primary-600">▸</span>
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrustBadge({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-none border border-slate-200 bg-white p-4">
      <div className="mb-2 rounded-none bg-primary-100 p-2 text-primary-600 w-fit">{icon}</div>
      <h4 className="font-semibold text-slate-900">{title}</h4>
      <p className="mt-1 text-xs text-slate-600">{description}</p>
    </div>
  );
}

function UpdateFrequencyItem({ label, frequency }: { label: string; frequency: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-2 last:border-0 last:pb-0">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className="rounded-none bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">{frequency}</span>
    </div>
  );
}

function AssetCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-none border border-slate-200 bg-white p-5">
      <h4 className="font-semibold text-slate-900">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ToolCTA({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col rounded-none border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary-300 hover:shadow"
    >
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
        Try it now <ExternalLink className="h-4 w-4" />
      </span>
    </Link>
  );
}

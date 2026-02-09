import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import RelatedPages from '@/components/RelatedPages';
import ComplianceFlowDiagram from '@/components/ComplianceFlowDiagram';
import { getRelatedPagesFor } from '@/lib/related-pages-data';
import VerifiedPharmaciesSection from './VerifiedPharmaciesSection';

export const metadata: Metadata = {
  title: 'Legitimacy Tracker',
  description:
    'Legitimate GLP-1: US-licensed pharmacy + prescription required. Scams skip RX, use overseas shipping, or crypto. Red flags and FDA shortage. Rx Likewise.',
};

const redFlags = [
  'No verifiable pharmacy license or address',
  'Prices far below typical market (e.g. $50/month for brand)',
  'No prescription required or “online questionnaire” only with no real prescriber',
  'Pressure to pay upfront by wire, crypto, or gift card',
  'Unclear origin of medication or no NDC/labeling',
  'Only contact is social media or messaging app',
  'Promises “guaranteed” weight loss or “no side effects”',
  'Ships from overseas with no US-licensed pharmacy',
];

const greenFlags = [
  'Licensed US pharmacy (verifiable via your state board of pharmacy)',
  'Requires a valid prescription from a licensed prescriber',
  'Clear business name, address, and phone',
  'Transparent pricing and no pressure to pay by unusual methods',
  'Medication comes with proper labeling and pharmacy information',
  'You can reach a pharmacist or customer service for questions',
];

export default function LegitimacyPage() {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="hero-bg">
        <div className="container-page section-pad">
          <Breadcrumbs items={[{ label: 'Legitimacy' }]} />
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">You&apos;re in: Legitimacy</p>
          <div className="hero-content max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Legitimacy Tracker
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Legitimate GLP-1 sources are US-licensed pharmacies that require a prescription; scams skip the prescription, use overseas shipping, or pressure payment by crypto or wire. Use the checklist below and the verified pharmacy list—we do not endorse any single pharmacy; verify yourself with your state board of pharmacy.
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              For anyone checking a pharmacy or shortage before buying.
            </p>
          </div>
        </div>
      </section>

      {/* Quick links: flat structure */}
      <div className="container-page py-4">
        <div className="rounded-none border border-primary-200 bg-primary-50/50 px-4 py-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Quick links</p>
          <ul className="flex flex-wrap gap-2">
            <li><Link href="#verified-pharmacies" className="rounded-none border border-primary-300 bg-white px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50">Verified pharmacies</Link></li>
            <li><Link href="/legitimacy/shortage" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">FDA Shortage</Link></li>
            <li><Link href="/labs" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Lab Transparency</Link></li>
            <li><Link href="/cost-insurance" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Cost & Insurance</Link></li>
            <li><Link href="/calculator" className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gray-50">Calculator</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container-page max-w-4xl section-pad">

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">Pharmacy & clinic red flags</h2>
        <p className="mt-2 text-sm text-gray-600">
          Warning signs that a source may be unsafe or a scam. If several apply, avoid buying from that source.
        </p>
        <ul className="mt-4 space-y-2">
          {redFlags.map((item, i) => (
            <li key={i} className="flex gap-3 rounded-none border border-red-100 bg-red-50 px-4 py-2 text-sm text-gray-700">
              <span className="text-red-600 font-medium">Red:</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">Green flags (legitimate sources)</h2>
        <p className="mt-2 text-sm text-gray-600">
          Signs that a pharmacy or clinic is more likely to be legitimate. Still verify with your state board.
        </p>
        <ul className="mt-4 space-y-2">
          {greenFlags.map((item, i) => (
            <li key={i} className="flex gap-3 rounded-none border border-green-100 bg-green-50 px-4 py-2 text-sm text-gray-700">
              <span className="text-green-700 font-medium">Green:</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          To verify a US pharmacy: search “[your state] board of pharmacy” and use the licensee lookup to confirm the pharmacy’s name, address, and license status. If the pharmacy is not listed or the address does not match, do not use it.
        </p>
      </section>

      <section id="compliance" className="mt-10 scroll-mt-24" aria-labelledby="compliance-heading">
        <h2 id="compliance-heading" className="text-lg font-semibold text-gray-900">Compounding Lab Compliance</h2>
        <p className="mt-2 text-sm text-gray-600">
          Understanding the difference between 503A and 503B compounding facilities, and how to verify their credentials and FDA inspection records.
        </p>
        <div className="mt-4">
          <ComplianceFlowDiagram />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">FDA shortage status</h2>
        <p className="mt-2 text-sm text-gray-600">
          Current FDA-reported shortages for GLP-1 products can affect supply and where you can fill your prescription. We pull from public data when available; always confirm on the official FDA site.
        </p>
        <Link
          href="/legitimacy/shortage"
          className="mt-4 inline-block rounded-none bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          View shortage status
        </Link>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">Anti-scam guidance</h2>
        <p className="mt-2 text-sm text-gray-600">
          <strong>Do not buy GLP-1 medications</strong> from social-media-only sellers, unverified “telehealth” sites that do not use a real licensed prescriber, or any site that does not require a valid prescription. These are common sources of counterfeit or unsafe products.
        </p>
        <p className="mt-3 text-sm text-gray-600">
          <strong>Verify your pharmacy</strong> with your state board of pharmacy before paying. If a pharmacy is not listed or the address does not match, do not use it.
        </p>
        <p className="mt-3 text-sm text-gray-600">
          <strong>Report suspected fraud:</strong>
        </p>
        <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
          <li><a href="https://www.fda.gov/safety/report-problem-fda" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">FDA MedWatch</a> – adverse events, counterfeit or unapproved drugs</li>
          <li><a href="https://reportfraud.ftc.gov/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">FTC Report Fraud</a> – scams and deceptive practices</li>
          <li>Your state board of pharmacy – for pharmacy-related complaints</li>
        </ul>
      </section>
      </div>

      {/* 验证药房名单：规则 + 名单 同页，信任中心统一 */}
      <p className="container-page pb-2 text-xs text-slate-500" role="note" id="verified-pharmacies-disclosure">
        We may earn a commission if you use certain links below. This does not change our editorial content.
      </p>
      <VerifiedPharmaciesSection />

      <RelatedPages pages={getRelatedPagesFor('legitimacy')} />
    </div>
  );
}

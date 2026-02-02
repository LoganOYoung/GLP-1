'use client';

import { AlertCircle, CheckCircle2, XCircle, DollarSign, Pill, Syringe, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import RelatedPages from '@/components/RelatedPages';
import type { DrugInfo } from '../drug-data';
import { DRUGS } from '../drug-data';
import TelehealthPriceGrid from '@/components/TelehealthPriceGrid';

interface DrugInfoClientProps {
  drug: DrugInfo;
}

export default function DrugInfoClient({ drug }: DrugInfoClientProps) {
  const availabilityColors = {
    'in-stock': 'bg-green-100 text-green-700 border-green-200',
    limited: 'bg-amber-100 text-amber-700 border-amber-200',
    'severe-shortage': 'bg-red-100 text-red-700 border-red-200',
  };

  const availabilityLabels = {
    'in-stock': 'In Stock',
    limited: 'Limited Supply',
    'severe-shortage': 'Severe Shortage',
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <Breadcrumbs items={[{ label: 'Alternatives', href: '/alternatives' }, { label: drug.name }]} />
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex items-start gap-4">
                <div className="rounded-none bg-emerald-100 p-3 text-emerald-600">
                  {drug.type === 'injection' ? <Syringe className="h-8 w-8" /> : <Pill className="h-8 w-8" />}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    {drug.name}
                  </h1>
                  <p className="mt-2 text-lg text-slate-600">
                    {drug.genericName} · {drug.manufacturer}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    FDA Approved: {new Date(drug.fdaApproved).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <div className="mt-4">
                    <LastUpdated date={new Date('2026-01-30')} />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className={`inline-flex items-center gap-2 rounded-none border px-4 py-2 ${availabilityColors[drug.availability]}`}>
                  {drug.availability === 'in-stock' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : drug.availability === 'limited' ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <span className="text-sm font-semibold">{availabilityLabels[drug.availability]}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-64 w-full rounded-none overflow-hidden shadow-lg">
                <ImagePlaceholder
                  src={`/images/drugs/${drug.id}-hero.webp`}
                  alt={`${drug.name} medication`}
                  width={600}
                  height={256}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickFactCard
              icon={<DollarSign className="h-5 w-5" />}
              label="Brand Price"
              value={drug.priceRange.brand}
            />
            {drug.priceRange.compounded && (
              <QuickFactCard
                icon={<DollarSign className="h-5 w-5" />}
                label="Compounded"
                value={drug.priceRange.compounded}
              />
            )}
            <QuickFactCard
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="Insurance"
              value={drug.insuranceCoverage.commercial}
            />
            <QuickFactCard
              icon={drug.type === 'injection' ? <Syringe className="h-5 w-5" /> : <Pill className="h-5 w-5" />}
              label="Type"
              value={drug.type === 'injection' ? 'Weekly Injection' : 'Oral Pill'}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-xl font-semibold text-slate-900">About {drug.name}</h2>
              <p className="mt-3 text-slate-600">{drug.description}</p>
              <p className="mt-3 text-slate-600">{drug.howItWorks}</p>
              <p className="mt-3 text-slate-600">
                <strong>Effectiveness:</strong> {drug.effectiveness}
              </p>
              <div className="mt-6 flex justify-center">
                <div className="relative h-40 w-full max-w-xl overflow-hidden rounded-none border border-slate-200 bg-slate-50 shadow-sm">
                  <ImagePlaceholder
                    src={`/images/inline/drug-lifestyle.webp`}
                    alt="Living well with GLP-1 - lifestyle and outcomes"
                    width={600}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Dosage */}
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Dosage & Administration</h2>
              <div className="mt-4 rounded-none border border-slate-200 bg-white p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Starting Dose</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{drug.dosage.starting}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Maintenance Dose</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{drug.dosage.maintenance}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Maximum Dose</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{drug.dosage.max}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Frequency</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{drug.dosage.frequency}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Side Effects */}
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Side Effects</h2>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-slate-700">Common Side Effects ({drug.sideEffects.frequency})</h3>
                  <ul className="mt-2 space-y-2">
                    {drug.sideEffects.common.map((effect, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600">
                        <span className="mt-1 text-slate-400">•</span>
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-700">Serious Side Effects</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Seek immediate medical attention if you experience any of these:
                  </p>
                  <ul className="mt-2 space-y-2">
                    {drug.sideEffects.serious.map((effect, i) => (
                      <li key={i} className="flex items-start gap-2 text-red-700">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Contraindications */}
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Who Should Not Take {drug.name}</h2>
              <ul className="mt-4 space-y-2">
                {drug.contraindications.map((contra, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <span>{contra}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Shortage Information */}
            {drug.availability !== 'in-stock' && (
              <section>
                <h2 className="text-xl font-semibold text-slate-900">Current Shortage Status</h2>
                <div className="mt-4 rounded-none border border-amber-200 bg-amber-50 p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <p className="font-semibold text-amber-900">
                        {availabilityLabels[drug.availability]}
                      </p>
                      {drug.shortageReason && (
                        <p className="mt-1 text-sm text-amber-800">{drug.shortageReason}</p>
                      )}
                      <p className="mt-3 text-sm text-amber-800">
                        <strong>Alternatives:</strong> Consider compounded {drug.genericName.toLowerCase()} or other GLP-1 medications. Use our{' '}
                        <Link href="/alternatives" className="font-medium underline hover:no-underline">
                          Alternatives Hub
                        </Link>{' '}
                        to compare options.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Pricing */}
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Pricing & Cost</h2>
              <div className="mt-4 rounded-none border border-slate-200 bg-white p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Brand Name Price</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{drug.priceRange.brand}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Without insurance or savings card. Actual price varies by pharmacy and location.
                    </p>
                  </div>
                  {drug.priceRange.compounded && (
                    <div>
                      <p className="text-sm font-medium text-slate-500">Compounded Alternative</p>
                      <p className="mt-1 text-2xl font-bold text-emerald-600">{drug.priceRange.compounded}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Compounded {drug.genericName.toLowerCase()} from licensed pharmacies. Often HSA/FSA eligible.
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-slate-500">With Insurance</p>
                    <p className="mt-1 text-xl font-semibold text-slate-900">{drug.priceRange.withInsurance}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Cost depends on your plan. {drug.insuranceCoverage.paRequired && 'Prior authorization may be required.'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 rounded-none bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Calculate Your Cost <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* Insurance Coverage */}
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Insurance Coverage</h2>
              <div className="mt-4 rounded-none border border-slate-200 bg-white p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Medicare Part D</span>
                    <span className={`text-sm font-semibold ${drug.insuranceCoverage.medicare ? 'text-green-600' : 'text-red-600'}`}>
                      {drug.insuranceCoverage.medicare ? 'Covered' : 'Not Covered'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Medicaid</span>
                    <span className={`text-sm font-semibold ${drug.insuranceCoverage.medicaid ? 'text-green-600' : 'text-slate-600'}`}>
                      {drug.insuranceCoverage.medicaid ? 'Covered' : 'Varies by State'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Commercial Insurance</span>
                    <span className="text-sm font-semibold text-slate-900">{drug.insuranceCoverage.commercial}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Prior Authorization Required</span>
                    <span className={`text-sm font-semibold ${drug.insuranceCoverage.paRequired ? 'text-amber-600' : 'text-green-600'}`}>
                      {drug.insuranceCoverage.paRequired ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {drug.hsaFsaEligible && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">HSA/FSA Eligible</span>
                      <span className="text-sm font-semibold text-green-600">Yes</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Drug Interactions */}
            {drug.drugInteractions && drug.drugInteractions.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-slate-900">Drug Interactions</h2>
                <div className="mt-4 rounded-none border border-amber-200 bg-amber-50 p-6">
                  <p className="mb-3 text-sm text-amber-900">
                    <strong>Important:</strong> Tell your doctor about all medications you are taking, including prescription, over-the-counter, and herbal supplements.
                  </p>
                  <ul className="space-y-2">
                    {drug.drugInteractions.map((interaction, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{interaction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Warnings */}
            {drug.warnings && drug.warnings.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-slate-900">Important Warnings</h2>
                <div className="mt-4 rounded-none border border-red-200 bg-red-50 p-6">
                  <ul className="space-y-3">
                    {drug.warnings.map((warning, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Storage & Administration */}
            {(drug.storage || drug.administration) && (
              <section>
                <h2 className="text-xl font-semibold text-slate-900">Storage & Administration</h2>
                <div className="mt-4 space-y-4">
                  {drug.storage && (
                    <div className="rounded-none border border-slate-200 bg-white p-6">
                      <h3 className="font-semibold text-slate-900">Storage Instructions</h3>
                      <p className="mt-2 text-sm text-slate-600">{drug.storage}</p>
                    </div>
                  )}
                  {drug.administration && (
                    <div className="rounded-none border border-slate-200 bg-white p-6">
                      <h3 className="font-semibold text-slate-900">How to Administer</h3>
                      <p className="mt-2 text-sm text-slate-600">{drug.administration}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Monitoring */}
            {drug.monitoring && (
              <section>
                <h2 className="text-xl font-semibold text-slate-900">What to Monitor</h2>
                <div className="mt-4 rounded-none border border-blue-200 bg-blue-50 p-6">
                  <p className="text-sm text-blue-900">{drug.monitoring}</p>
                </div>
              </section>
            )}

            {/* Alternatives */}
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Alternatives to {drug.name}</h2>
              <p className="mt-2 text-slate-600">
                If {drug.name} is not available, too expensive, or not covered by your insurance, consider these alternatives:
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {drug.alternatives.map((altId) => {
                  const altDrug = DRUGS[altId];
                  if (!altDrug) return null;
                  return (
                    <Link
                      key={altId}
                      href={`/drugs/${altId}`}
                      className="rounded-none border border-slate-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{altDrug.name}</p>
                          <p className="mt-1 text-sm text-slate-600">{altDrug.genericName}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-slate-400" />
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-4">
                <Link
                  href="/alternatives"
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Compare All Alternatives <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Real-Time Prices */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Real-Time Prices</h3>
              <p className="mt-1 text-sm text-slate-600">
                Compare prices from major Telehealth platforms offering {drug.genericName}.
              </p>
              <div className="mt-4">
                <TelehealthPriceGrid />
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-none border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/calculator" className="text-sm text-emerald-600 hover:underline">
                    Calculate Your Cost
                  </Link>
                </li>
                <li>
                  <Link href="/alternatives" className="text-sm text-emerald-600 hover:underline">
                    Compare Alternatives
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-emerald-600 hover:underline">
                    FAQ
                  </Link>
                </li>
                {drug.insuranceCoverage.paRequired && (
                  <li>
                    <Link href="/cost-insurance" className="text-sm text-emerald-600 hover:underline">
                      Insurance Appeal Templates
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function QuickFactCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-none border border-slate-200 bg-white p-4">
      <div className="mb-2 text-slate-400">{icon}</div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import RelatedPages from '@/components/RelatedPages';
import { getRelatedPagesFor } from '@/lib/related-pages-data';
import { Building2, CheckCircle2, AlertTriangle, XCircle, ExternalLink, MapPin } from 'lucide-react';
import { COMPOUNDING_LABS, getLabsByType, type LabType, type InspectionResult } from '@/lib/lab-data';
import LabInspectionRecord from '@/components/LabInspectionRecord';

export const metadata: Metadata = {
  title: 'Compounding Lab Transparency Database | 503A/503B FDA Inspection Records',
  description:
    'Transparency database of compounding laboratories used by Telehealth platforms. View FDA inspection records, 503A/503B status, and lab credentials.',
  keywords:
    'compounding lab transparency, 503A pharmacy, 503B pharmacy, FDA inspection records, semaglutide compounding lab',
  openGraph: {
    title: 'Compounding Lab Transparency Database',
    description: 'View FDA inspection records and credentials for compounding laboratories used by Telehealth platforms.',
  },
};

function getInspectionBadge(result: InspectionResult) {
  switch (result) {
    case 'satisfactory':
      return (
        <span className="inline-flex items-center gap-1 rounded-none bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700">
          <CheckCircle2 className="h-3 w-3" />
          Satisfactory
        </span>
      );
    case 'voluntary-action-indicated':
      return (
        <span className="inline-flex items-center gap-1 rounded-none bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
          <AlertTriangle className="h-3 w-3" />
          VAI
        </span>
      );
    case 'official-action-indicated':
      return (
        <span className="inline-flex items-center gap-1 rounded-none bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
          <XCircle className="h-3 w-3" />
          OAI
        </span>
      );
  }
}

export default function LabsPage() {
  const labs503A = getLabsByType('503A');
  const labs503B = getLabsByType('503B');

  return (
    <>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="container-page section-pad">
            <Breadcrumbs items={[{ label: 'Lab Transparency' }]} />
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Compounding Lab Transparency Database
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-slate-600">
                  View FDA inspection records, 503A/503B credentials, and lab information for compounding pharmacies used
                  by Telehealth platforms. Transparency builds trust.
                </p>
                <div className="mt-4">
                  <LastUpdated date={new Date('2026-01-30')} />
                </div>
              </div>
            <div className="hidden lg:block">
              <div className="relative h-64 w-full rounded-none overflow-hidden shadow-lg">
                <ImagePlaceholder
                  src="/images/banners/labs-hero-banner.webp"
                  alt="Compounding Lab Transparency Database"
                  width={600}
                  height={256}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-none border border-primary-200 bg-primary-50 px-4 py-2">
              <p className="text-sm font-semibold text-primary-900">{COMPOUNDING_LABS.length} Labs Listed</p>
              <p className="text-xs text-primary-700">
                {labs503A.length} 503A · {labs503B.length} 503B
              </p>
            </div>
            <div className="rounded-none border border-slate-200 bg-white px-4 py-2">
              <p className="text-sm font-semibold text-slate-900">Last Updated</p>
              <p className="text-xs text-slate-600">January 30, 2026</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page section-pad">
        {/* Info Section */}
        <section className="mb-12 rounded-none border border-primary-200 bg-primary-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-primary-900">Understanding Lab Types</h2>
          <div className="mb-6 flex justify-center">
            <div className="relative h-36 w-full max-w-2xl overflow-hidden rounded-none border border-primary-200 bg-white shadow-sm">
              <ImagePlaceholder
                src="/images/inline/labs-transparency.webp"
                alt="Lab transparency - FDA inspection and 503A/503B credentials"
                width={700}
                height={144}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-primary-800">503A Compounding Pharmacy</h3>
              <p className="text-sm text-primary-700">
                Patient-specific compounding. Regulated by state boards of pharmacy. Requires prescription for each
                patient.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-primary-800">503B Outsourcing Facility</h3>
              <p className="text-sm text-primary-700">
                Large-scale compounding. FDA registered and inspected. Can compound without patient-specific
                prescriptions.
              </p>
            </div>
          </div>
        </section>

        {/* 503B Labs */}
        {labs503B.length > 0 && (
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">503B Outsourcing Facilities ({labs503B.length})</h2>
            </div>
            <div className="space-y-4">
              {labs503B.map((lab) => (
                <LabCard key={lab.id} lab={lab} />
              ))}
            </div>
          </section>
        )}

        {/* 503A Labs */}
        {labs503A.length > 0 && (
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">503A Compounding Pharmacies ({labs503A.length})</h2>
            </div>
            <div className="space-y-4">
              {labs503A.map((lab) => (
                <LabCard key={lab.id} lab={lab} />
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="rounded-none border border-primary-200 bg-primary-50 p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-900">Find Labs by Platform</h2>
          <p className="mt-2 text-sm text-slate-700">
            View which labs are used by each Telehealth platform in our Alternatives comparison.
          </p>
          <div className="mt-6">
            <Link
              href="/alternatives"
              className="inline-flex items-center gap-2 rounded-none bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              View Alternatives
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
      </div>
      <RelatedPages pages={getRelatedPagesFor('labs')} />
    </>
  );
}

function LabCard({ lab }: { lab: typeof COMPOUNDING_LABS[0] }) {
  return (
    <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-slate-400" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{lab.name}</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="rounded-none bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                  {lab.type}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-600">
                  <MapPin className="h-3 w-3" />
                  {lab.state}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-slate-600">License Number</p>
              <p className="mt-1 text-sm text-slate-900">{lab.licenseNumber}</p>
            </div>
            {lab.fdaRegistrationNumber && (
              <div>
                <p className="text-xs font-medium text-slate-600">FDA Registration</p>
                <p className="mt-1 text-sm text-slate-900">{lab.fdaRegistrationNumber}</p>
              </div>
            )}
            {lab.address && (
              <div>
                <p className="text-xs font-medium text-slate-600">Address</p>
                <p className="mt-1 text-sm text-slate-900">{lab.address}</p>
              </div>
            )}
            {lab.phone && (
              <div>
                <p className="text-xs font-medium text-slate-600">Phone</p>
                <p className="mt-1 text-sm text-slate-900">{lab.phone}</p>
              </div>
            )}
          </div>

          {lab.platforms.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-slate-600">Used by Platforms</p>
              <div className="flex flex-wrap gap-2">
                {lab.platforms.map((platform) => (
                  <Link
                    key={platform}
                    href="/alternatives"
                    className="rounded-none bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                  >
                    {platform}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {lab.lastInspection && (
            <div className="mt-4">
              <LabInspectionRecord inspection={lab.lastInspection} />
            </div>
          )}

          {lab.notes && (
            <div className="mt-4 rounded-none border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-700">{lab.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

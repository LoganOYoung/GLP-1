import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import RelatedPages from '@/components/RelatedPages';
import { getRelatedPagesFor } from '@/lib/related-pages-data';
import DoseConverterEnhanced from '@/app/alternatives/DoseConverterEnhanced';

export const metadata: Metadata = {
  title: 'Dose Converter | Wegovy to Compounded Units, Tirzepatide Dose Chart 2026',
  description:
    'Convert GLP-1 doses: brand to compounded units, Wegovy/Ozempic/Zepbound/Mounjaro dose chart. Semaglutide and tirzepatide unit conversion for vials and pens.',
  keywords:
    'Wegovy to compounded dose chart, semaglutide units conversion, tirzepatide dose conversion, Ozempic compounded units, dose calculator GLP-1',
  openGraph: {
    title: 'GLP-1 Dose Converter 2026 | Brand to Compounded Units',
    description: 'Convert brand and compounded GLP-1 doses. Wegovy, Ozempic, Zepbound, Mounjaro dose charts.',
  },
};

export default function DoseConverterPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-page section-pad">
          <Breadcrumbs items={[{ label: 'Tools' }, { label: 'Dose Converter' }]} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Dose Converter
          </h1>
          <p className="mt-2 max-w-2xl text-base text-gray-600">
            Convert between brand-name doses (mg) and compounded vial units for semaglutide and tirzepatide. Use when switching from Wegovy/Ozempic/Zepbound/Mounjaro to compounded, or to match syringe markings.
          </p>
          <div className="mt-4">
            <LastUpdated date={new Date('2026-01-30')} />
          </div>
        </div>
      </section>

      <div className="container-page section-pad-tight">
        <DoseConverterEnhanced />
      </div>

      <section className="border-t border-gray-200 bg-gray-50">
        <div className="container-page section-pad">
          <RelatedPages pages={getRelatedPagesFor('doseConverter')} />
        </div>
      </section>
    </div>
  );
}

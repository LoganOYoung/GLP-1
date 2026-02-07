import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReportPriceForm from '@/components/crowdsource/ReportPriceForm';
import ReportSupplyForm from '@/components/crowdsource/ReportSupplyForm';
import CrowdsourceFeed from '@/components/crowdsource/CrowdsourceFeed';

export const metadata: Metadata = {
  title: 'Community Reports | Share Price & Supply',
  description:
    'Report GLP-1 prices you paid or where you got your medication. Help others with real, crowd-sourced price and supply updates. Rx Likewise.',
};

export default function ReportPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-page section-pad">
          <Breadcrumbs items={[{ label: 'Community Reports' }]} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Community Reports
          </h1>
          <p className="mt-2 max-w-2xl text-base text-gray-600">
            Share what you paid or where you got your GLP-1 medication. Your report helps others—like Waze for drugs. We show recent price and supply reports below.
          </p>
        </div>
      </section>

      <div className="container-page section-pad">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Report a price</h2>
            <p className="mt-1 text-sm text-gray-600">I paid $X at Y pharmacy/platform (insurance or cash).</p>
            <div className="mt-4 rounded-none border border-gray-200 bg-gray-50/50 p-5">
              <ReportPriceForm />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Report supply</h2>
            <p className="mt-1 text-sm text-gray-600">I got this drug at X pharmacy/location.</p>
            <div className="mt-4 rounded-none border border-gray-200 bg-gray-50/50 p-5">
              <ReportSupplyForm />
            </div>
          </div>
        </div>

        <section id="feed" className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-xl font-semibold text-gray-900">Recent community reports</h2>
          <p className="mt-1 text-sm text-gray-600">User-reported prices and supply. For reference only—verify with your pharmacy or insurer.</p>
          <div className="mt-4">
            <CrowdsourceFeed limit={15} showAllLink={false} />
          </div>
        </section>

        <p className="mt-8 text-center">
          <Link href="/" className="text-sm font-medium text-primary-600 underline hover:no-underline">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}

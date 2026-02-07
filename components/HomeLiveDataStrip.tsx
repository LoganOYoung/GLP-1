import Link from 'next/link';
import { DATA_AS_OF } from '@/lib/data-freshness';

/**
 * Hero 下方「实时数据看板」占位：传递数据驱动、专业感。
 * 当前为静态参考值；后续可接 API 替换为真实价格/申诉成功率。
 */
export default function HomeLiveDataStrip() {
  return (
    <section
      className="border-b border-gray-200 bg-slate-800 text-white"
      aria-label="GLP-1 data snapshot"
    >
      <div className="container-page py-4">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-8 sm:gap-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Typical out-of-pocket (US)
              </p>
              <p className="mt-0.5 text-lg font-semibold sm:text-xl">
                With insurance: <span className="text-primary-300">$0–$50</span>/mo · Compounded: <span className="text-secondary-300">$150–$350</span>/mo
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Appeal support
              </p>
              <p className="mt-0.5 text-lg font-semibold sm:text-xl">
                Free <Link href="/cost-insurance/appeals" className="text-primary-300 underline hover:no-underline">appeal letter template</Link> + insurer tips
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Data as of <strong className="text-slate-400">{DATA_AS_OF}</strong>. Verify with your pharmacy or insurer.
          </p>
        </div>
      </div>
    </section>
  );
}

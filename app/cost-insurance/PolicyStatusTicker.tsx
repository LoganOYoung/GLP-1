import Link from 'next/link';
import { getActiveStates, getPendingStates } from '@/app/trumprx/trumprx-data';

/**
 * Live status ticker: TrumpRx states + date. Gives "right now" timeliness.
 */
export default function PolicyStatusTicker() {
  const active = getActiveStates();
  const pending = getPendingStates();

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-3">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-gray-600">
        <span className="font-medium text-gray-900">
          TrumpRx: <span className="text-primary-600">{active.length} states active</span>
          {pending.length > 0 && (
            <span className="ml-1 text-gray-500">· {pending.length} pending</span>
          )}
        </span>
        <Link href="/trumprx" className="font-medium text-primary-600 underline hover:no-underline">
          State-by-state guide →
        </Link>
        <span className="text-gray-400">· Updated Jan 2026</span>
      </div>
    </div>
  );
}

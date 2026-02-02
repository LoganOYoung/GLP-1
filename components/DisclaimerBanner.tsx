/**
 * Shared disclaimer for medication/health content. Keeps copy in one place.
 * Use on alternatives, legitimacy, or other pages that need a prominent disclaimer.
 */
interface DisclaimerBannerProps {
  /** Optional extra line (e.g. compounded-specific). */
  extra?: string;
  className?: string;
}

const DEFAULT_LINE =
  'This page is informational only. Talk to your doctor before starting or switching any medication. We do not sell medications.';

export default function DisclaimerBanner({ extra, className = '' }: DisclaimerBannerProps) {
  return (
    <div
      className={`rounded-none border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-900 ${className}`}
      role="status"
    >
      {extra && <p className="font-medium">{extra}</p>}
      <p className={extra ? 'mt-1 text-amber-800' : ''}>{DEFAULT_LINE}</p>
    </div>
  );
}

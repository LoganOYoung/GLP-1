/**
 * Display prices for Cost & Insurance page (PriceSnapshotWithHSA, etc.).
 * Single source of truth for snapshot numbers.
 *
 * Future: Replace with API/CMS for "real-time data center" — e.g. fetch in
 * a server component and pass as props to PriceSnapshotWithHSA({ prices }).
 */
export const PRICE_SNAPSHOT = {
  brandRange: '$900–$1,400',
  compoundedBase: '$150–$350',
  compoundedAfterTax: '~$105–$245',
} as const;

/**
 * Telehealth Platform Price Data (2026)
 * Loaded from data/telehealth-platforms.json - update monthly; see docs/DATA-UPDATE-PROCESS.md
 */

import raw from '@/data/telehealth-platforms.json';

export interface TelehealthPlatform {
  id: string;
  name: string;
  type: 'compounded' | 'brand' | 'both';
  basePrice: number;
  consultationFee: number;
  shipping: number;
  membershipFee: number;
  totalMonthly: number;
  lastUpdated: string;
  legitScriptCertified: boolean;
  fdaRegistered: boolean;
  hsaFsaEligible: boolean;
  availability: 'in-stock' | 'limited' | 'waitlist';
  affiliateUrl: string;
  rating?: number;
  serviceArea: 'all-states' | string[];
  serviceAreaNote?: string;
}

export const TELEHEALTH_PLATFORMS: TelehealthPlatform[] = raw.platforms as TelehealthPlatform[];

/**
 * Format "X minutes ago" for real-time feel
 */
export function formatLastUpdated(isoString: string): string {
  const now = Date.now();
  const updated = new Date(isoString).getTime();
  const minutesAgo = Math.floor((now - updated) / 60000);
  if (minutesAgo < 1) return 'Just updated';
  if (minutesAgo === 1) return '1 minute ago';
  return `${minutesAgo} minutes ago`;
}

import type { MetadataRoute } from 'next';
import { DRUG_SLUGS } from '@/app/drugs/drug-data';

const SITE_URL = 'https://www.rxlikewise.com';

/** Static routes for the site (path without leading slash; '' = home). */
const STATIC_PATHS = [
  '',
  '/quiz',
  '/calculator',
  '/alternatives',
  '/cost-insurance',
  '/cost-insurance/appeals',
  '/comparison',
  '/legitimacy',
  '/legitimacy/shortage',
  '/labs',
  '/trumprx',
  '/tools/dose-converter',
  '/faq',
  '/about',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    entries.push({
      url: path ? `${SITE_URL}${path}` : SITE_URL,
      lastModified: now,
      changeFrequency: path === '' ? 'weekly' : 'weekly',
      priority: path === '' ? 1 : 0.8,
    });
  }

  for (const slug of DRUG_SLUGS) {
    entries.push({
      url: `${SITE_URL}/drugs/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  return entries;
}

/**
 * SEO Structured Data (JSON-LD) component for Rich Snippets (2026).
 * Outputs FAQPage and/or SoftwareApplication schemas per page; maps to visible content for E-E-A-T.
 *
 * Usage:
 * - FAQ page: <StructuredData type="faq" items={[{ question, answer }, ...]} dateModified="2026-01-30" />
 * - Calculator/tool: <StructuredData type="software-application" name="..." description="..." featureList={[...]} />
 * - Multiple schemas: <StructuredData type="multiple" schemas={[faqSchema, breadcrumbSchema]} />
 */

const SITE_URL = 'https://www.rxlikewise.com';

/** Minimal FAQ item for schema (question + answer). */
export interface FAQSchemaItem {
  question: string;
  answer: string;
}

/** FAQPage schema payload (Google Rich Results). */
export interface FAQPageSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: { '@type': 'Answer'; text: string };
  }>;
  dateModified?: string; // ISO 8601 for freshness
  url?: string;
}

/** SoftwareApplication schema payload (calculator / tools). */
export interface SoftwareApplicationSchema {
  '@context': 'https://schema.org';
  '@type': 'SoftwareApplication';
  name: string;
  applicationCategory: string;
  operatingSystem?: string;
  description: string;
  url?: string;
  featureList?: string[];
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  dateModified?: string;
}

/** Props: single schema type. */
export type StructuredDataProps =
  | {
      type: 'faq';
      /** FAQ items; must match visible Q&A on the page. */
      items: FAQSchemaItem[];
      /** Optional: last updated (ISO string) for freshness. */
      dateModified?: string;
      /** Optional: canonical URL of the page. */
      url?: string;
    }
  | {
      type: 'software-application';
      /** App/tool name (e.g. "2026 GLP-1 Cost Calculator"). */
      name: string;
      /** Short description for SERP. */
      description: string;
      /** e.g. "HealthApplication". */
      applicationCategory?: string;
      operatingSystem?: string;
      /** Features list for rich snippet. */
      featureList?: string[];
      /** Free tier. */
      offers?: { price: string; priceCurrency: string };
      dateModified?: string;
      url?: string;
    }
  | {
      type: 'multiple';
      /** Array of raw JSON-LD objects (any @type). */
      schemas: object[];
    };

function buildFAQPageSchema(
  items: FAQSchemaItem[],
  options?: { dateModified?: string; url?: string }
): FAQPageSchema {
  const schema: FAQPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer,
      },
    })),
  };
  if (options?.dateModified) schema.dateModified = options.dateModified;
  if (options?.url) schema.url = options.url;
  return schema;
}

function buildSoftwareApplicationSchema(props: {
  name: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  featureList?: string[];
  offers?: { price: string; priceCurrency: string };
  dateModified?: string;
  url?: string;
}): SoftwareApplicationSchema {
  const schema: SoftwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: props.name,
    applicationCategory: props.applicationCategory ?? 'HealthApplication',
    description: props.description,
  };
  if (props.operatingSystem) schema.operatingSystem = props.operatingSystem;
  if (props.featureList?.length) schema.featureList = props.featureList;
  if (props.offers)
    schema.offers = {
      '@type': 'Offer',
      price: props.offers.price,
      priceCurrency: props.offers.priceCurrency,
    };
  if (props.dateModified) schema.dateModified = props.dateModified;
  if (props.url) schema.url = props.url;
  return schema;
}

/**
 * Renders JSON-LD script(s) for the given schema type. Place in page/layout so
 * it maps to the visible content (same Q&A, same tool name/description) for Rich Snippets.
 */
export default function StructuredData(props: StructuredDataProps) {
  let schemas: object[] = [];

  if (props.type === 'faq') {
    schemas = [
      buildFAQPageSchema(props.items, {
        dateModified: props.dateModified,
        url: props.url ?? `${SITE_URL}/faq`,
      }),
    ];
  } else if (props.type === 'software-application') {
    schemas = [
      buildSoftwareApplicationSchema({
        name: props.name,
        description: props.description,
        applicationCategory: props.applicationCategory,
        operatingSystem: props.operatingSystem ?? 'Web Browser',
        featureList: props.featureList,
        offers: props.offers ?? { price: '0', priceCurrency: 'USD' },
        dateModified: props.dateModified,
        url: props.url ?? `${SITE_URL}/calculator`,
      }),
    ];
  } else {
    schemas = props.schemas;
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DRUGS, getDrugBySlug, DRUG_SLUGS } from '../drug-data';
import DrugInfoClient from './DrugInfoClient';

export async function generateStaticParams() {
  return DRUG_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const drug = getDrugBySlug(params.slug);
  if (!drug) {
    return {
      title: 'Drug Not Found',
    };
  }

  return {
    title: `${drug.name} | Side Effects, Dosage, Cost, Shortage & Alternatives 2026`,
    description: `${drug.name} (${drug.genericName}) information: side effects, dosage, cost ($${drug.priceRange.brand}), shortage status, and alternatives. ${drug.description}`,
    keywords: drug.seoKeywords.join(', '),
    openGraph: {
      title: `${drug.name} Guide 2026 | Side Effects, Cost, Alternatives`,
      description: `Complete guide to ${drug.name}: side effects, dosage, pricing, shortage status, and alternatives.`,
    },
  };
}

function buildDrugSchema(drug: typeof DRUGS[keyof typeof DRUGS]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Drug',
    name: drug.name,
    genericName: drug.genericName,
    brand: drug.brandNames,
    manufacturer: {
      '@type': 'Organization',
      name: drug.manufacturer,
    },
    indication: drug.indication,
    dosageForm: drug.type === 'injection' ? 'Injection' : 'Oral',
    activeIngredient: drug.activeIngredient,
    description: drug.description,
    code: {
      '@type': 'MedicalCode',
      codingSystem: 'FDA',
      codeValue: drug.id,
    },
  };
}

function buildBreadcrumbSchema(drug: typeof DRUGS[keyof typeof DRUGS]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://glp1guide.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Alternatives',
        item: 'https://glp1guide.com/alternatives',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: drug.name,
        item: `https://glp1guide.com/drugs/${drug.id}`,
      },
    ],
  };
}

function buildFAQSchema(drug: typeof DRUGS[keyof typeof DRUGS]) {
  const faqs = [
    {
      question: `What are the side effects of ${drug.name}?`,
      answer: `Common side effects of ${drug.name} include ${drug.sideEffects.common.slice(0, 3).join(', ')}. Serious side effects may include ${drug.sideEffects.serious.slice(0, 2).join(' and ')}.`,
    },
    {
      question: `How much does ${drug.name} cost?`,
      answer: `${drug.name} costs approximately ${drug.priceRange.brand} without insurance. With insurance, costs range from ${drug.priceRange.withInsurance}. Compounded alternatives are available for ${drug.priceRange.compounded || 'varying prices'}.`,
    },
    {
      question: `Is ${drug.name} covered by insurance?`,
      answer: `${drug.name} coverage varies by insurance type. Medicare: ${drug.insuranceCoverage.medicare ? 'Covered' : 'Not covered'}. Commercial insurance: ${drug.insuranceCoverage.commercial}. ${drug.insuranceCoverage.paRequired ? 'Prior authorization is typically required.' : ''}`,
    },
    {
      question: `What is the dosage for ${drug.name}?`,
      answer: `${drug.name} starting dose is ${drug.dosage.starting}. Maintenance dose is ${drug.dosage.maintenance}. Maximum dose is ${drug.dosage.max}. It is administered ${drug.dosage.frequency.toLowerCase()}.`,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function DrugPage({ params }: { params: { slug: string } }) {
  const drug = getDrugBySlug(params.slug);
  if (!drug) {
    notFound();
  }

  const drugSchema = buildDrugSchema(drug);
  const breadcrumbSchema = buildBreadcrumbSchema(drug);
  const faqSchema = buildFAQSchema(drug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(drugSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DrugInfoClient drug={drug} />
    </>
  );
}

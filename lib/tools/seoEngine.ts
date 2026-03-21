/**
 * SEO Engine - Advanced SEO optimization for tools, converters, and guides
 * Provides breadcrumbs, FAQ schemas, and structured data
 */

import type { Tool } from '@/data/tools'
import type { Converter } from '@/data/converters'

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface FAQItem {
  question: string
  answer: string
}

/**
 * Generate breadcrumb schema for tool pages
 */
export function generateToolBreadcrumbs(tool: Tool): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools' },
    { name: tool.category.charAt(0).toUpperCase() + tool.category.slice(1), url: `/tools?category=${tool.category}` },
    { name: tool.name, url: `/tools/${tool.slug}` }
  ]
}

/**
 * Generate breadcrumb schema for converter pages
 */
export function generateConverterBreadcrumbs(converter: Converter): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Converters', url: '/convert' },
    { name: converter.category.charAt(0).toUpperCase() + converter.category.slice(1), url: `/convert?category=${converter.category}` },
    { name: `${converter.from.toUpperCase()} to ${converter.to.toUpperCase()}`, url: `/convert/${converter.slug}` }
  ]
}

/**
 * Generate JSON-LD breadcrumb schema
 */
export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://iconvertnow.com${crumb.url}`
    }))
  }
}

/**
 * Generate FAQ schema for tool pages
 */
export function generateToolFAQSchema(tool: Tool): object {
  const faqs = getToolFAQs(tool.slug)
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

/**
 * Get FAQs for a specific tool
 */
export function getToolFAQs(toolSlug: string): FAQItem[] {
  const toolFAQs: Record<string, FAQItem[]> = {
    'bmi-calculator': [
      {
        question: 'What is BMI and why is it important?',
        answer: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. It helps assess health risks and is widely used in medical and fitness contexts.'
      },
      {
        question: 'How accurate is the BMI calculator?',
        answer: 'BMI is a general screening tool. It may not be accurate for athletes or very muscular individuals. Consult a healthcare professional for personalized assessment.'
      },
      {
        question: 'What are the BMI categories?',
        answer: 'Underweight: < 18.5, Normal: 18.5-24.9, Overweight: 25-29.9, Obese: 30+'
      }
    ],
    'json-to-csv': [
      {
        question: 'What is JSON to CSV conversion used for?',
        answer: 'Converting JSON data to CSV format is useful for importing data into spreadsheet applications, databases, or data analysis tools.'
      },
      {
        question: 'Does this tool support nested JSON?',
        answer: 'The tool handles basic JSON structures. Complex nested objects are flattened into CSV columns.'
      },
      {
        question: 'Is my data secure?',
        answer: 'Yes, all conversions happen locally in your browser. Data is never sent to any server.'
      }
    ],
    'uuid-generator': [
      {
        question: 'What is a UUID?',
        answer: 'A UUID (Universally Unique Identifier) is a 128-bit number used to identify information uniquely in distributed systems.'
      },
      {
        question: 'What version of UUID does this generate?',
        answer: 'This tool generates UUID v4, which is randomly generated and collision-resistant.'
      },
      {
        question: 'How many UUIDs can I generate at once?',
        answer: 'You can generate up to 1000 UUIDs in a single operation.'
      }
    ],
    'unit-converter': [
      {
        question: 'Which units are supported?',
        answer: 'We support length, weight, volume, temperature, area, and energy conversions with multiple unit options.'
      },
      {
        question: 'How accurate are the conversions?',
        answer: 'All conversions use standard conversion factors and are accurate to 6 decimal places.'
      }
    ],
    'password-strength-checker': [
      {
        question: 'What makes a password strong?',
        answer: 'A strong password contains at least 12 characters, includes uppercase and lowercase letters, numbers, and special characters.'
      },
      {
        question: 'Is my password stored?',
        answer: 'No, passwords are never stored or transmitted. The check happens entirely in your browser.'
      }
    ]
  }

  return toolFAQs[toolSlug] || [
    {
      question: 'How do I use this tool?',
      answer: 'Enter your input in the left panel and click Process. Results will appear in the right panel. You can copy or download the output.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, all processing happens in your browser. Data is never sent to any server.'
    }
  ]
}

/**
 * Generate FAQ schema for converter pages
 */
export function generateConverterFAQSchema(from: string, to: string): object {
  const faqs: FAQItem[] = [
    {
      question: `How do I convert ${from} to ${to}?`,
      answer: `Enter the ${from} value you want to convert, and the tool will instantly calculate the ${to} equivalent using standard conversion factors.`
    },
    {
      question: `How accurate is this ${from} to ${to} converter?`,
      answer: `Our converter uses standard conversion factors and provides results accurate to 6 decimal places.`
    },
    {
      question: `Can I convert large numbers?`,
      answer: `Yes, the converter can handle very large and very small numbers. Results are displayed with appropriate precision.`
    },
    {
      question: `Is there a conversion rate between ${from} and ${to}?`,
      answer: `Yes. The exact conversion rate depends on the specific units, but our tool uses the internationally accepted standard conversion factors.`
    }
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

/**
 * Generate tool schema (SoftwareApplication type)
 */
export function generateToolSchema(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: `https://iconvertnow.com/tools/${tool.slug}`,
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  }
}

/**
 * Generate converter schema
 */
export function generateConverterSchema(from: string, to: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${from.toUpperCase()} to ${to.toUpperCase()} Converter`,
    description: `Convert ${from} to ${to} online instantly`,
    url: `https://iconvertnow.com/convert/${slug}`,
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  }
}

/**
 * Generate organization schema for homepage
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'iConvertNow',
    url: 'https://iconvertnow.com',
    logo: 'https://iconvertnow.com/logo.png',
    description: 'Free online conversion tools for units, formats, and data',
    sameAs: [
      'https://twitter.com/iconvertnow',
      'https://facebook.com/iconvertnow'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@iconvertnow.com'
    }
  }
}

/**
 * Generate website schema with search action
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://iconvertnow.com',
    name: 'iConvertNow',
    description: 'Free online conversion tools',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://iconvertnow.com/search?q={search_term_string}'
      },
      query_input: 'required name=search_term_string'
    }
  }
}

/**
 * Generate aggregate rating schema (example)
 */
export function generateAggregateRatingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '2500',
    bestRating: '5',
    worstRating: '1'
  }
}

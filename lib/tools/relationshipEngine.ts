/**
 * Relationship Engine - Semantic linking between tools, converters, formats, and guides
 * Enables intelligent "related items" suggestions across the platform
 */

import { TOOLS } from '@/data/tools'
import { CONVERTERS } from '@/data/converters'
import { FORMATS } from '@/data/formats'
import { GUIDES } from '@/data/guides'

export interface RelatedItem {
  id: string
  title: string
  slug: string
  type: 'tool' | 'converter' | 'format' | 'guide'
  relevance: number
  reason: string
}

// Semantic relationships between tools, converters, formats, and guides
const toolRelationships: Record<string, string[]> = {
  'json-formatter': ['json-to-csv', 'json-validator', 'csv-to-json'],
  'json-to-csv': ['csv-to-json', 'json-formatter', 'json-validator'],
  'csv-to-json': ['json-to-csv', 'json-formatter'],
  'uuid-generator': ['random-string-generator', 'hash-generator'],
  'random-string-generator': ['uuid-generator', 'password-strength-checker'],
  'password-strength-checker': ['random-string-generator'],
  'jwt-decoder': ['base64-encode', 'base64-decode', 'hash-generator'],
  'base64-encode': ['base64-decode', 'url-encode', 'html-encode'],
  'base64-decode': ['base64-encode', 'url-decode', 'html-decode'],
  'url-encode': ['url-decode', 'base64-encode', 'html-encode'],
  'url-decode': ['url-encode', 'base64-decode'],
  'html-encode': ['html-decode', 'base64-encode', 'url-encode'],
  'html-decode': ['html-encode', 'base64-decode'],
  
  'camelcase-converter': ['kebabcase-converter', 'snakecase-converter', 'titlecase-converter'],
  'kebabcase-converter': ['camelcase-converter', 'snakecase-converter'],
  'snakecase-converter': ['camelcase-converter', 'kebabcase-converter'],
  'titlecase-converter': ['camelcase-converter'],
  'slug-generator': ['text-to-slug', 'kebabcase-converter'],
  'text-to-slug': ['slug-generator', 'kebabcase-converter'],
  
  'word-frequency-counter': ['reading-time-calculator', 'sentence-counter'],
  'reading-time-calculator': ['word-frequency-counter', 'sentence-counter'],
  'sentence-counter': ['word-frequency-counter', 'paragraph-counter'],
  'paragraph-counter': ['sentence-counter'],
  
  'bmi-calculator': ['bmr-calculator', 'body-fat-calculator', 'ideal-weight-calculator'],
  'bmr-calculator': ['bmi-calculator', 'calorie-calculator'],
  'body-fat-calculator': ['bmi-calculator', 'ideal-weight-calculator'],
  'ideal-weight-calculator': ['bmi-calculator', 'body-fat-calculator'],
  'calorie-calculator': ['bmr-calculator', 'water-intake-calculator'],
  'water-intake-calculator': ['calorie-calculator'],
  
  'compound-interest-calculator': ['simple-interest-calculator', 'investment-calculator'],
  'simple-interest-calculator': ['compound-interest-calculator', 'loan-calculator'],
  'profit-margin-calculator': ['markup-calculator', 'break-even-calculator'],
  'markup-calculator': ['profit-margin-calculator'],
  'break-even-calculator': ['profit-margin-calculator', 'sales-tax-calculator'],
  'gst-calculator': ['sales-tax-calculator', 'tip-calculator'],
  'sales-tax-calculator': ['gst-calculator', 'tip-calculator'],
  'tip-calculator': ['gst-calculator', 'sales-tax-calculator'],
  'mortgage-calculator': ['loan-calculator', 'investment-calculator'],
  'loan-calculator': ['mortgage-calculator', 'simple-interest-calculator'],
  'investment-calculator': ['compound-interest-calculator', 'savings-goal-calculator'],
  'savings-goal-calculator': ['investment-calculator'],
  
  'unit-converter': ['temperature-converter', 'weight-converter', 'length-converter'],
  'temperature-converter': ['unit-converter'],
  'weight-converter': ['unit-converter', 'length-converter'],
  'length-converter': ['unit-converter', 'weight-converter'],
  'area-converter': ['unit-converter'],
  'volume-converter': ['unit-converter'],
}

// Format-related tools
const formatToolRelationships: Record<string, string[]> = {
  'png': ['jpeg', 'webp', 'gif'],
  'jpeg': ['png', 'webp', 'svg'],
  'webp': ['png', 'jpeg', 'avif'],
  'gif': ['png', 'apng'],
  'svg': ['png', 'jpeg'],
  'json': ['csv', 'xml', 'yaml'],
  'csv': ['json', 'xml'],
  'xml': ['json', 'csv'],
}

/**
 * Get related tools for a given tool slug
 */
export function getRelatedTools(toolSlug: string, limit: number = 6): RelatedItem[] {
  const relatedSlugs = toolRelationships[toolSlug] || []
  
  const related = relatedSlugs
    .map(slug => {
      const tool = TOOLS.find(t => t.slug === slug)
      if (!tool) return null
      
      return {
        id: tool.id,
        title: tool.name,
        slug: tool.slug,
        type: 'tool' as const,
        relevance: 1,
        reason: 'Functionally related'
      }
    })
    .filter((item): item is RelatedItem => item !== null)
    .slice(0, limit)

  return related
}

/**
 * Get related tools for a format
 */
export function getRelatedToolsForFormat(formatSlug: string, limit: number = 5): RelatedItem[] {
  const converters = CONVERTERS.filter(c => 
    c.from === formatSlug || c.to === formatSlug
  )

  return converters
    .map(converter => ({
      id: converter.id,
      title: `${converter.from.toUpperCase()} to ${converter.to.toUpperCase()}`,
      slug: converter.slug,
      type: 'converter' as const,
      relevance: 1,
      reason: 'Format conversion'
    }))
    .slice(0, limit)
}

/**
 * Get related guides for a tool
 */
export function getRelatedGuides(toolSlug: string, limit: number = 3): RelatedItem[] {
  // Extract category from tool slug to find related guides
  const categories: Record<string, string[]> = {
    'calculator': ['health-tools-guide', 'financial-planning-guide'],
    'text': ['text-processing-guide', 'data-formatting-guide'],
    'developer': ['json-tools-guide', 'data-conversion-guide'],
    'image': ['image-formats-guide', 'color-theory-guide'],
  }

  const toolCategory = TOOLS.find(t => t.slug === toolSlug)?.category || 'general'
  const relatedGuideIds = categories[toolCategory] || []

  return GUIDES
    .filter(g => relatedGuideIds.includes(g.slug))
    .map(guide => ({
      id: guide.id,
      title: guide.title,
      slug: guide.slug,
      type: 'guide' as const,
      relevance: 1,
      reason: 'Related guide'
    }))
    .slice(0, limit)
}

/**
 * Get comprehensive related items for a tool
 */
export function getComprehensiveRelatedItems(toolSlug: string, limit: number = 10): RelatedItem[] {
  const relatedTools = getRelatedTools(toolSlug, 3)
  const relatedGuides = getRelatedGuides(toolSlug, 2)

  return [...relatedTools, ...relatedGuides].slice(0, limit)
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: string): RelatedItem[] {
  return TOOLS
    .filter(t => t.category === category)
    .map(tool => ({
      id: tool.id,
      title: tool.name,
      slug: tool.slug,
      type: 'tool' as const,
      relevance: 1,
      reason: `${category} tool`
    }))
}

/**
 * Get converters by category
 */
export function getConvertersByCategory(category: string): RelatedItem[] {
  return CONVERTERS
    .filter(c => c.category === category)
    .map(converter => ({
      id: converter.id,
      title: `${converter.from} to ${converter.to}`,
      slug: converter.slug,
      type: 'converter' as const,
      relevance: 1,
      reason: `${category} conversion`
    }))
}

/**
 * Search related items by keywords
 */
export function searchRelatedItems(query: string, limit: number = 6): RelatedItem[] {
  const lowerQuery = query.toLowerCase()
  const results: RelatedItem[] = []

  // Search tools
  TOOLS.filter(t => 
    t.name.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery)
  ).forEach(tool => {
    results.push({
      id: tool.id,
      title: tool.name,
      slug: tool.slug,
      type: 'tool',
      relevance: 1,
      reason: 'Matching tool'
    })
  })

  // Search converters
  CONVERTERS.filter(c =>
    c.from.toLowerCase().includes(lowerQuery) ||
    c.to.toLowerCase().includes(lowerQuery)
  ).forEach(converter => {
    results.push({
      id: converter.id,
      title: `${converter.from} to ${converter.to}`,
      slug: converter.slug,
      type: 'converter',
      relevance: 1,
      reason: 'Matching converter'
    })
  })

  // Search formats
  FORMATS.filter(f =>
    f.name.toLowerCase().includes(lowerQuery) ||
    f.description.toLowerCase().includes(lowerQuery)
  ).forEach(format => {
    results.push({
      id: format.slug,
      title: format.name,
      slug: format.slug,
      type: 'format',
      relevance: 1,
      reason: 'Matching format'
    })
  })

  return results.slice(0, limit)
}

/**
 * Get related tool slugs for a specific tool
 */
export function getRelatedTools(toolSlug: string): string[] {
  return toolRelationships[toolSlug] || []
}

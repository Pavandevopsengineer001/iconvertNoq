'use client'

import Link from 'next/link'
import { TOOLS, getToolBySlug } from '@/data/tools'
import { getRelatedTools } from '@/lib/tools/relationshipEngine'

interface RelatedToolsProps {
  toolSlug: string
  maxItems?: number
}

export function RelatedTools({ toolSlug, maxItems = 6 }: RelatedToolsProps) {
  const relatedSlugs = getRelatedTools(toolSlug)
  const relatedTools = relatedSlugs
    .map(slug => getToolBySlug(slug))
    .filter(Boolean)
    .slice(0, maxItems)

  if (relatedTools.length === 0) {
    return null
  }

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'calculator':
        return 'bg-blue-500/10 text-blue-600 border-blue-200'
      case 'developer':
        return 'bg-purple-500/10 text-purple-600 border-purple-200'
      case 'text':
        return 'bg-green-500/10 text-green-600 border-green-200'
      case 'image':
        return 'bg-orange-500/10 text-orange-600 border-orange-200'
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200'
    }
  }

  return (
    <section className="mt-12 pt-12 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.slug}`}
            className="group rounded-lg border bg-card p-4 hover:shadow-lg transition-all hover:translate-y-[-2px]"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="font-semibold group-hover:text-primary transition-colors flex-1 line-clamp-2">
                {tool.name}
              </h3>
              <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap border font-medium ${getCategoryColor(tool.category)}`}>
                {tool.category}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

'use client'

import React from 'react'
import { ArrowRight, Copy, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ToolLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  tabs?: { label: string; content: React.ReactNode }[]
  onCopy?: () => void
  onDownload?: () => void
  copiedText?: boolean
  showExplanation?: boolean
  explanation?: React.ReactNode
  howTo?: React.ReactNode
  faq?: React.ReactNode
  relatedTools?: React.ReactNode
}

export function ToolLayout({
  title,
  description,
  children,
  onCopy,
  onDownload,
  copiedText,
  showExplanation = true,
  explanation,
  howTo,
  faq,
  relatedTools,
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-12 md:py-16 border-b border-border/50">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        <div className="container-premium">
          <div className="max-w-4xl">
            <div className="badge-primary mb-4 w-fit">
              <span>Tool Documentation</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight text-balance">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Tool Area */}
      <div className="container-premium py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Tool Card */}
          <div className="card-premium p-8 space-y-6">
            <div>
              {children}
            </div>

            {/* Action Buttons */}
            {(onCopy || onDownload) && (
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                {onCopy && (
                  <Button
                    onClick={onCopy}
                    className="btn-outline group"
                  >
                    <Copy className="w-4 h-4 group-hover:text-primary" />
                    {copiedText ? 'Copied!' : 'Copy Output'}
                  </Button>
                )}
                {onDownload && (
                  <Button
                    onClick={onDownload}
                    className="btn-gradient"
                  >
                    <Download className="w-4 h-4" />
                    Download Result
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Explanation Section */}
          {showExplanation && explanation && (
            <section className="space-y-4">
              <h2 className="text-3xl font-bold">About This Tool</h2>
              <div className="card-premium p-6 space-y-4 prose prose-invert max-w-none">
                {explanation}
              </div>
            </section>
          )}

          {/* How-To Section */}
          {howTo && (
            <section className="space-y-4">
              <h2 className="text-3xl font-bold">How to Use</h2>
              <div className="card-premium p-6 space-y-4 prose prose-invert max-w-none">
                {howTo}
              </div>
            </section>
          )}

          {/* FAQ Section */}
          {faq && (
            <section className="space-y-4">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <div className="card-premium p-6 space-y-4">
                {faq}
              </div>
            </section>
          )}

          {/* Related Tools */}
          {relatedTools && (
            <section className="space-y-4">
              <h2 className="text-3xl font-bold">Related Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTools}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

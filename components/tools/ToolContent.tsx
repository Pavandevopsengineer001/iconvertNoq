'use client'

import { useState } from 'react'
import { Copy, Download, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ToolInput } from '@/components/tools/ToolInput'
import { ToolOutput } from '@/components/tools/ToolOutput'
import { RelatedTools } from '@/components/tools/RelatedTools'
import type { Tool } from '@/data/tools'
import { healthCalculations, financeCalculations } from '@/lib/tools/calculatorEngine'
import { caseConverters, textAnalyzers } from '@/lib/tools/textProcessor'
import { dataConverters, colorConverters } from '@/lib/tools/dataConverter'

interface ToolContentProps {
  tool: Tool
}

export default function ToolContent({ tool }: ToolContentProps) {
  const [input, setInput] = useState('')
  const [secondInput, setSecondInput] = useState('')
  const [thirdInput, setThirdInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const processInput = async () => {
    setLoading(true)
    setError('')
    setCopied(false)

    try {
      let result = ''

      // ===== CALCULATOR TOOLS - HEALTH =====
      if (tool.slug === 'bmi-calculator') {
        const calc = healthCalculations.bmi(parseFloat(input), parseFloat(secondInput))
        result = `BMI: ${calc.bmi}\nCategory: ${calc.category}`
      }
      else if (tool.slug === 'bmr-calculator') {
        const bmr = healthCalculations.bmr(parseFloat(input), parseFloat(secondInput), parseInt(thirdInput), 'male')
        result = `BMR: ${bmr} kcal/day`
      }
      else if (tool.slug === 'calorie-calculator') {
        const sedentary = healthCalculations.calorieNeeds(parseFloat(input), 'sedentary')
        const moderate = healthCalculations.calorieNeeds(parseFloat(input), 'moderate')
        result = `Sedentary: ${sedentary}\nModerate: ${moderate}`
      }
      else if (tool.slug === 'body-fat-calculator') {
        const bf = healthCalculations.bodyFat(parseFloat(input), parseFloat(secondInput), 0, parseFloat(thirdInput), 'male')
        result = `Body Fat: ${bf}%`
      }

      // ===== CALCULATOR TOOLS - FINANCE =====
      else if (tool.slug === 'compound-interest-calculator') {
        const calc = financeCalculations.compoundInterest(parseFloat(input), parseFloat(secondInput), parseInt(thirdInput))
        result = `Amount: $${calc.amount}\nInterest: $${calc.interest}`
      }
      else if (tool.slug === 'simple-interest-calculator') {
        const calc = financeCalculations.simpleInterest(parseFloat(input), parseFloat(secondInput), parseInt(thirdInput))
        result = `Interest: $${calc.interest}\nTotal: $${calc.total}`
      }
      else if (tool.slug === 'profit-margin-calculator') {
        const calc = financeCalculations.profitMargin(parseFloat(input), parseFloat(secondInput))
        result = `Profit: $${calc.profit}\nMargin: ${calc.margin}%`
      }

      // ===== TEXT TOOLS - CASE CONVERTERS =====
      else if (tool.slug === 'camelcase-converter') {
        result = caseConverters.toCamelCase(input)
      }
      else if (tool.slug === 'kebabcase-converter') {
        result = caseConverters.toKebabCase(input)
      }
      else if (tool.slug === 'snakecase-converter') {
        result = caseConverters.toSnakeCase(input)
      }
      else if (tool.slug === 'titlecase-converter') {
        result = caseConverters.toTitleCase(input)
      }

      // ===== TEXT TOOLS - ANALYZERS =====
      else if (tool.slug === 'word-frequency-counter') {
        result = textAnalyzers.wordFrequency(input)
      }
      else if (tool.slug === 'reading-time-calculator') {
        result = textAnalyzers.readingTime(input)
      }
      else if (tool.slug === 'sentence-counter') {
        const count = textAnalyzers.sentenceCount(input)
        result = `Total Sentences: ${count}`
      }

      // ===== DEVELOPER TOOLS - DATA CONVERSION =====
      else if (tool.slug === 'json-to-csv') {
        result = dataConverters.jsonToCsv(input)
      }
      else if (tool.slug === 'csv-to-json') {
        result = dataConverters.csvToJson(input)
      }

      // ===== DEVELOPER TOOLS - COLOR CONVERSION =====
      else if (tool.slug === 'color-converter') {
        try {
          const rgb = colorConverters.hexToRgb(input)
          result = `HEX: ${input}\nRGB: ${rgb}`
        } catch {
          result = colorConverters.rgbToHex(input)
        }
      }

      // ===== TOOLS WITH INLINE LOGIC =====
      else if (tool.slug === 'uuid-generator') {
        const count = parseInt(input) || 1
        const uuids = []
        for (let i = 0; i < count; i++) {
          const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0
            const v = c === 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
          })
          uuids.push(uuid)
        }
        result = uuids.join('\n')
      }
      else if (tool.slug === 'random-string-generator') {
        const length = parseInt(input) || 32
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
        let random = ''
        for (let i = 0; i < length; i++) {
          random += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        result = random
      }
      else if (tool.slug === 'lorem-ipsum-generator') {
        const paragraphs = parseInt(input) || 1
        const loremParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        result = Array(paragraphs).fill(loremParagraph).join('\n\n')
      }
      else if (tool.slug === 'text-to-slug') {
        const text = input.trim()
        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        result = slug
      }
      else if (tool.slug === 'jwt-decoder') {
        try {
          const parts = input.split('.')
          if (parts.length !== 3) throw new Error('Invalid JWT')
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
          result = JSON.stringify(payload, null, 2)
        } catch {
          throw new Error('Invalid JWT token')
        }
      }
      else if (tool.slug === 'hash-generator') {
        const simpleHash = (str: string) => {
          let hash = 0
          for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash = hash & hash
          }
          return Math.abs(hash).toString(16)
        }
        result = `Hash: ${simpleHash(input)}`
      }

      // ===== DEFAULT =====
      else {
        result = `${tool.name} is ready to use!`
      }

      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setOutput('')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (output) {
      const element = document.createElement('a')
      const file = new Blob([output], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `${tool.slug}-output.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  return (
    <ToolLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Input</label>
            <ToolInput
              value={input}
              onChange={setInput}
              placeholder="Enter text or numbers..."
              rows={8}
            />
          </div>

          {['bmi-calculator', 'bmr-calculator', 'compound-interest-calculator'].includes(tool.slug) && (
            <div>
              <label className="block text-sm font-medium mb-2">Second Input</label>
              <ToolInput
                value={secondInput}
                onChange={setSecondInput}
                placeholder="Enter second value..."
                rows={4}
              />
            </div>
          )}

          {['bmr-calculator', 'compound-interest-calculator', 'body-fat-calculator'].includes(tool.slug) && (
            <div>
              <label className="block text-sm font-medium mb-2">Third Input</label>
              <ToolInput
                value={thirdInput}
                onChange={setThirdInput}
                placeholder="Enter third value..."
                rows={4}
              />
            </div>
          )}

          <Button
            onClick={processInput}
            disabled={loading || !input}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Process'
            )}
          </Button>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Output</label>
            <ToolOutput value={output} />
          </div>

          {error && (
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {output && (
            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="flex-1"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex-1"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          )}
        </div>

        {/* Related Tools Section */}
        <div className="mt-8">
          <RelatedTools toolSlug={tool.slug} maxItems={6} />
        </div>
      </div>
    </ToolLayout>
  )
}

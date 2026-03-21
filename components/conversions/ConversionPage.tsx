'use client'

import { useState } from 'react'
import { Copy, ArrowRightLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { ConversionPair } from '@/data/conversionMatrix'

interface ConversionPageProps {
  conversion: ConversionPair
}

export default function ConversionPage({ conversion }: ConversionPageProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleConvert = () => {
    if (!input) return

    setLoading(true)
    try {
      const value = parseFloat(input)
      if (isNaN(value)) {
        setOutput('Please enter a valid number')
        return
      }

      let result: number
      const { from, to, factor, category } = conversion

      // Temperature has special handling (offset needed)
      if (category === 'temperature') {
        if (from === 'celsius' && to === 'fahrenheit') {
          result = (value * 9/5) + 32
        } else if (from === 'fahrenheit' && to === 'celsius') {
          result = (value - 32) * 5/9
        } else if (from === 'celsius' && to === 'kelvin') {
          result = value + 273.15
        } else if (from === 'kelvin' && to === 'celsius') {
          result = value - 273.15
        } else if (from === 'fahrenheit' && to === 'kelvin') {
          const celsius = (value - 32) * 5/9
          result = celsius + 273.15
        } else {
          result = value * factor
        }
      } else {
        result = value * factor
      }

      setOutput(result.toFixed(6).replace(/\.?0+$/, ''))
    } catch (error) {
      setOutput('Conversion error')
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

  const handleSwap = () => {
    setInput(output)
    setOutput(input)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-b from-primary/10 to-transparent p-8 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">{conversion.from.charAt(0).toUpperCase() + conversion.from.slice(1)} to {conversion.to.charAt(0).toUpperCase() + conversion.to.slice(1)}</h1>
        <p className="text-muted-foreground">{conversion.description}</p>
      </div>

      <div className="space-y-6">
        {/* Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">From ({conversion.from})</label>
          <Input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter value to convert"
            onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
            className="text-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleConvert} disabled={loading || !input} className="flex-1">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              'Convert'
            )}
          </Button>
          <Button onClick={handleSwap} variant="outline" size="icon">
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Output */}
        {output && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">To ({conversion.to})</label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-muted rounded-lg text-lg font-semibold">
                {output}
              </div>
              <Button onClick={handleCopy} variant="outline" size="icon">
                {copied ? 'Copied!' : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}

        {/* Conversion Info */}
        <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground space-y-2">
          <p><strong>Conversion Rate:</strong> 1 {conversion.from} = {conversion.factor} {conversion.to}</p>
          <p><strong>Category:</strong> {conversion.category}</p>
        </div>
      </div>
    </div>
  )
}

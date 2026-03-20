'use client'

import { useState } from 'react'
import { Copy, Download, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ToolInput } from '@/components/tools/ToolInput'
import { ToolOutput } from '@/components/tools/ToolOutput'
import type { Tool } from '@/data/tools'
import { healthCalculations, financeCalculations, conversionCalculations, timeCalculations, utilityCalculations } from '@/lib/tools/calculatorEngine'
import { caseConverters, textAnalyzers, textCheckers, textConverters, formatGenerators } from '@/lib/tools/textProcessor'
import { dataConverters, colorConverters, hashGenerators, jwtDecoder, codeFormatters } from '@/lib/tools/dataConverter'

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

      // CALCULATOR TOOLS - Health
      if (tool.slug === 'bmi-calculator') {
        const weight = parseFloat(input)
        const height = parseFloat(secondInput)
        if (!weight || !height) throw new Error('Please enter valid weight and height')
        const calc = healthCalculations.bmi(weight, height)
        result = `BMI: ${calc.bmi}\nCategory: ${calc.category}`
      }
      else if (tool.slug === 'bmr-calculator') {
        const weight = parseFloat(input)
        const height = parseFloat(secondInput)
        const age = parseInt(thirdInput)
        if (!weight || !height || !age) throw new Error('Please fill all fields')
        const bmr = healthCalculations.bmr(weight, height, age, 'male')
        result = `BMR: ${bmr} kcal/day\nDaily Calorie Needs (Moderate): ${(parseInt(bmr) * 1.55).toFixed(0)} kcal`
      }
      else if (tool.slug === 'calorie-calculator') {
        const bmr = parseFloat(input)
        if (!bmr) throw new Error('Please enter BMR value')
        result = `Sedentary: ${(bmr * 1.2).toFixed(0)} kcal\nLight: ${(bmr * 1.375).toFixed(0)} kcal\nModerate: ${(bmr * 1.55).toFixed(0)} kcal\nVery Active: ${(bmr * 1.725).toFixed(0)} kcal\nExtreme: ${(bmr * 1.9).toFixed(0)} kcal`
      }
      else if (tool.slug === 'body-fat-calculator') {
        const weight = parseFloat(input)
        const waist = parseFloat(secondInput)
        const neck = parseFloat(thirdInput)
        if (!weight || !waist || !neck) throw new Error('Please fill all fields')
        const bf = healthCalculations.bodyFat(weight, waist, neck, 70, 'male')
        result = `Body Fat: ${bf}%`
      }
      else if (tool.slug === 'ideal-weight-calculator') {
        const height = parseFloat(input)
        if (!height) throw new Error('Please enter height in inches')
        const calc = healthCalculations.idealWeight(height, 'male')
        result = `Male Range: ${calc.min} - ${calc.max} lbs\nFemale Range: ${healthCalculations.idealWeight(height, 'female').min} - ${healthCalculations.idealWeight(height, 'female').max} lbs`
      }
      else if (tool.slug === 'water-intake-calculator') {
        const weight = parseFloat(input)
        if (!weight) throw new Error('Please enter weight in pounds')
        const low = healthCalculations.waterIntake(weight, 'low')
        const mod = healthCalculations.waterIntake(weight, 'moderate')
        const high = healthCalculations.waterIntake(weight, 'high')
        result = `Low Activity: ${low} liters/day\nModerate Activity: ${mod} liters/day\nHigh Activity: ${high} liters/day`
      }
      else if (tool.slug === 'pregnancy-calculator') {
        const lastPeriod = new Date(input)
        const dueDate = new Date(lastPeriod.getTime() + 280 * 24 * 60 * 60 * 1000)
        const week = Math.floor((Date.now() - lastPeriod.getTime()) / (7 * 24 * 60 * 60 * 1000))
        result = `Week: ${week}\nDue Date: ${dueDate.toLocaleDateString()}`
      }

      // CALCULATOR TOOLS - Finance
      else if (tool.slug === 'compound-interest-calculator') {
        const principal = parseFloat(input)
        const rate = parseFloat(secondInput)
        const years = parseInt(thirdInput)
        if (!principal || !rate || !years) throw new Error('Please fill all fields')
        const calc = financeCalculations.compoundInterest(principal, rate, years)
        result = `Principal: $${principal.toFixed(2)}\nInterest: $${calc.interest}\nTotal Amount: $${calc.total}`
      }
      else if (tool.slug === 'simple-interest-calculator') {
        const principal = parseFloat(input)
        const rate = parseFloat(secondInput)
        const years = parseInt(thirdInput)
        if (!principal || !rate || !years) throw new Error('Please fill all fields')
        const calc = financeCalculations.simpleInterest(principal, rate, years)
        result = `Principal: $${principal.toFixed(2)}\nInterest: $${calc.interest}\nTotal Amount: $${calc.total}`
      }
      else if (tool.slug === 'profit-margin-calculator') {
        const revenue = parseFloat(input)
        const cost = parseFloat(secondInput)
        if (!revenue || !cost) throw new Error('Please enter revenue and cost')
        const calc = financeCalculations.profitMargin(revenue, cost)
        result = `Revenue: $${revenue.toFixed(2)}\nCost: $${cost.toFixed(2)}\nProfit: $${calc.profit}\nMargin: ${calc.margin}%`
      }
      else if (tool.slug === 'markup-calculator') {
        const cost = parseFloat(input)
        const sellPrice = parseFloat(secondInput)
        if (!cost || !sellPrice) throw new Error('Please enter cost and selling price')
        const markup = financeCalculations.markup(cost, sellPrice)
        result = `Cost: $${cost.toFixed(2)}\nSelling Price: $${sellPrice.toFixed(2)}\nMarkup: ${markup}%`
      }
      else if (tool.slug === 'gst-calculator') {
        const amount = parseFloat(input)
        const rate = parseFloat(secondInput || '18')
        if (!amount) throw new Error('Please enter amount')
        const calc = financeCalculations.gstCalculation(amount, rate)
        result = `Amount: $${amount.toFixed(2)}\nGST (${rate}%): $${calc.gst}\nTotal: $${calc.total}`
      }
      else if (tool.slug === 'sales-tax-calculator') {
        const amount = parseFloat(input)
        const taxRate = parseFloat(secondInput)
        if (!amount || !taxRate) throw new Error('Please enter amount and tax rate')
        const tax = (amount * taxRate) / 100
        result = `Amount: $${amount.toFixed(2)}\nTax (${taxRate}%): $${tax.toFixed(2)}\nTotal: $${(amount + tax).toFixed(2)}`
      }
      else if (tool.slug === 'tip-calculator') {
        const amount = parseFloat(input)
        const percentage = parseFloat(secondInput)
        if (!amount || !percentage) throw new Error('Please enter amount and tip percentage')
        const calc = utilityCalculations.tip(amount, percentage)
        result = `Bill: $${amount.toFixed(2)}\nTip (${percentage}%): $${calc.tip}\nTotal: $${calc.total}`
      }
      else if (tool.slug === 'break-even-calculator') {
        const fixed = parseFloat(input)
        const price = parseFloat(secondInput)
        const cost = parseFloat(thirdInput)
        if (!fixed || !price || !cost) throw new Error('Please fill all fields')
        const calc = utilityCalculations.breakEven(fixed, price, cost)
        result = `Break-Even Units: ${calc.units}\nBreak-Even Revenue: $${calc.amount}`
      }
      else if (tool.slug === 'mortgage-calculator') {
        const principal = parseFloat(input)
        const rate = parseFloat(secondInput)
        const years = parseInt(thirdInput)
        if (!principal || !rate || !years) throw new Error('Please fill all fields')
        const calc = financeCalculations.mortgage(principal, rate, years)
        result = `Monthly Payment: $${calc.monthlyPayment}\nTotal Payment: $${calc.totalPayment}\nTotal Interest: $${calc.totalInterest}`
      }
      else if (tool.slug === 'loan-calculator') {
        const principal = parseFloat(input)
        const rate = parseFloat(secondInput)
        const months = parseInt(thirdInput)
        if (!principal || !rate || !months) throw new Error('Please fill all fields')
        const calc = financeCalculations.loan(principal, rate, months)
        result = `Monthly Payment: $${calc.monthlyPayment}\nTotal Payment: $${calc.totalPayment}\nTotal Interest: $${calc.totalInterest}`
      }

      // CALCULATOR TOOLS - Conversions
      else if (tool.slug === 'temperature-converter') {
        const value = parseFloat(input)
        if (!value) throw new Error('Please enter a value')
        const fromC = conversionCalculations.temperature(value, 'C', 'F')
        const fromF = conversionCalculations.temperature(value, 'F', 'C')
        const fromK = conversionCalculations.temperature(value, 'K', 'C')
        result = `${value}°C = ${fromC}°F\n${value}°F = ${fromF}°C\n${value}K = ${fromK}°C`
      }
      else if (tool.slug === 'weight-converter') {
        const value = parseFloat(input)
        if (!value) throw new Error('Please enter a value')
        result = `${value} kg = ${conversionCalculations.weight(value, 'kg', 'lb')} lbs\n${value} lbs = ${conversionCalculations.weight(value, 'lb', 'kg')} kg\n${value} kg = ${conversionCalculations.weight(value, 'kg', 'g')} g`
      }
      else if (tool.slug === 'length-converter') {
        const value = parseFloat(input)
        if (!value) throw new Error('Please enter a value')
        result = `${value} m = ${conversionCalculations.length(value, 'm', 'ft')} ft\n${value} ft = ${conversionCalculations.length(value, 'ft', 'm')} m\n${value} km = ${conversionCalculations.length(value, 'km', 'mi')} mi`
      }
      else if (tool.slug === 'volume-converter') {
        const value = parseFloat(input)
        if (!value) throw new Error('Please enter a value')
        result = `${value} L = ${conversionCalculations.volume(value, 'L', 'gal')} gal\n${value} gal = ${conversionCalculations.volume(value, 'gal', 'L')} L\n${value} mL = ${conversionCalculations.volume(value, 'mL', 'fl_oz')} fl oz`
      }
      else if (tool.slug === 'unit-converter') {
        result = `Use Temperature/Weight/Length/Volume/Area converters for specific unit conversions`
      }

      // TEXT TOOLS - Converters
      else if (tool.slug === 'camelcase-converter') {
        if (!input.trim()) throw new Error('Please enter text')
        result = caseConverters.toCamelCase(input)
      }
      else if (tool.slug === 'kebabcase-converter') {
        if (!input.trim()) throw new Error('Please enter text')
        result = caseConverters.toKebabCase(input)
      }
      else if (tool.slug === 'snakecase-converter') {
        if (!input.trim()) throw new Error('Please enter text')
        result = caseConverters.toSnakeCase(input)
      }
      else if (tool.slug === 'titlecase-converter') {
        if (!input.trim()) throw new Error('Please enter text')
        result = caseConverters.toTitleCase(input)
      }
      else if (tool.slug === 'text-to-slug') {
        if (!input.trim()) throw new Error('Please enter text')
        result = textConverters.slugify(input)
      }
      else if (tool.slug === 'morse-code-converter') {
        if (!input.trim()) throw new Error('Please enter text')
        result = textConverters.toMorseCode(input)
      }
      else if (tool.slug === 'binary-text-converter') {
        if (!input.trim()) throw new Error('Please enter text')
        result = textConverters.toBinary(input)
      }
      else if (tool.slug === 'phonetic-alphabet') {
        if (!input.trim()) throw new Error('Please enter text')
        result = textConverters.toPhoneticAlphabet(input)
      }

      // TEXT TOOLS - Analyzers
      else if (tool.slug === 'word-frequency-counter') {
        if (!input.trim()) throw new Error('Please enter text')
        result = `Words: ${textAnalyzers.wordCount(input)}\n${textAnalyzers.wordFrequency(input)}`
      }
      else if (tool.slug === 'sentence-counter') {
        if (!input.trim()) throw new Error('Please enter text')
        result = `Sentences: ${textAnalyzers.sentenceCount(input)}`
      }
      else if (tool.slug === 'paragraph-counter') {
        if (!input.trim()) throw new Error('Please enter text')
        result = `Paragraphs: ${textAnalyzers.paragraphCount(input)}`
      }
      else if (tool.slug === 'reading-time-calculator') {
        if (!input.trim()) throw new Error('Please enter text')
        const time = textAnalyzers.readingTime(input)
        const words = textAnalyzers.wordCount(input)
        result = `Words: ${words}\n${time}`
      }

      // TEXT TOOLS - Checkers
      else if (tool.slug === 'palindrome-checker') {
        if (!input.trim()) throw new Error('Please enter text')
        const isPalin = textCheckers.isPalindrome(input)
        result = isPalin ? '✓ Yes, this is a palindrome!' : '✗ No, this is not a palindrome.'
      }
      else if (tool.slug === 'password-strength-checker') {
        if (!input.trim()) throw new Error('Please enter a password')
        const strength = textCheckers.passwordStrength(input)
        result = `Strength: ${strength.strength}\nScore: ${strength.score}/5\nLength: ${input.length} chars\nSuggestions: ${strength.suggestions.join(', ') || 'Password is strong!'}`
      }

      // DEVELOPER TOOLS
      else if (tool.slug === 'json-to-csv') {
        if (!input.trim()) throw new Error('Please enter JSON')
        result = dataConverters.jsonToCsv(input)
      }
      else if (tool.slug === 'csv-to-json') {
        if (!input.trim()) throw new Error('Please enter CSV')
        result = dataConverters.csvToJson(input)
      }
      else if (tool.slug === 'uuid-generator') {
        const count = parseInt(input) || 1
        const uuids = Array.from({ length: count }, () => formatGenerators.generateUUID()).join('\n')
        result = uuids
      }
      else if (tool.slug === 'random-string-generator') {
        const length = parseInt(input) || 16
        result = formatGenerators.generateRandomString(length)
      }
      else if (tool.slug === 'lorem-ipsum-generator') {
        const paragraphs = parseInt(input) || 3
        result = formatGenerators.generateLoremIpsum(Math.min(paragraphs, 10))
      }
      else if (tool.slug === 'color-converter') {
        if (!input.trim()) throw new Error('Please enter a color (HEX or RGB)')
        if (input.startsWith('#')) {
          try {
            const rgb = colorConverters.hexToRgb(input)
            const hsl = colorConverters.hexToHsl(input)
            result = `HEX: ${input}\nRGB: ${rgb}\nHSL: ${hsl}`
          } catch (e) {
            throw new Error('Invalid HEX color format')
          }
        } else {
          try {
            const hex = colorConverters.rgbToHex(input)
            result = `RGB: ${input}\nHEX: ${hex}`
          } catch (e) {
            throw new Error('Invalid RGB color format')
          }
        }
      }
      else if (tool.slug === 'hash-generator') {
        if (!input.trim()) throw new Error('Please enter text to hash')
        const md5 = hashGenerators.md5(input)
        const sha1 = hashGenerators.sha1(input)
        const sha256 = hashGenerators.sha256(input)
        result = `MD5: ${md5}\nSHA1: ${sha1}\nSHA256: ${sha256}`
      }
      else if (tool.slug === 'jwt-decoder') {
        if (!input.trim()) throw new Error('Please enter a JWT token')
        const decoded = jwtDecoder(input)
        if (decoded.valid) {
          result = `Header:\n${decoded.header}\n\nPayload:\n${decoded.payload}\n\nSignature:\n${decoded.signature}`
        } else {
          throw new Error(decoded.error || 'Invalid JWT format')
        }
      }

      else {
        // Coming Soon for unimplemented tools
        result = `${tool.name} is coming soon! We're implementing this tool to give you the best experience.`
      }

      setOutput(result)
    } catch (err) {
      setError(String(err))
      setOutput('')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([output], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${tool.slug}-output.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Determine inputs needed based on tool
  const getInputFields = () => {
    const multiInputTools: Record<string, { labels: string[]; placeholders: string[] }> = {
      'bmi-calculator': { labels: ['Weight (kg)', 'Height (cm)'], placeholders: ['70', '170'] },
      'bmr-calculator': { labels: ['Weight (kg)', 'Height (cm)', 'Age'], placeholders: ['70', '170', '30'] },
      'profit-margin-calculator': { labels: ['Revenue ($)', 'Cost ($)'], placeholders: ['1000', '600'] },
      'markup-calculator': { labels: ['Cost ($)', 'Selling Price ($)'], placeholders: ['100', '150'] },
      'tip-calculator': { labels: ['Bill Amount ($)', 'Tip Percentage (%)'], placeholders: ['100', '15'] },
      'gst-calculator': { labels: ['Amount ($)', 'GST Rate (%)'], placeholders: ['1000', '18'] },
      'sales-tax-calculator': { labels: ['Amount ($)', 'Tax Rate (%)'], placeholders: ['100', '8'] },
      'compound-interest-calculator': { labels: ['Principal ($)', 'Rate (%)', 'Years'], placeholders: ['1000', '5', '10'] },
      'simple-interest-calculator': { labels: ['Principal ($)', 'Rate (%)', 'Years'], placeholders: ['1000', '5', '10'] },
      'break-even-calculator': { labels: ['Fixed Costs ($)', 'Price per Unit ($)', 'Cost per Unit ($)'], placeholders: ['5000', '50', '20'] },
      'mortgage-calculator': { labels: ['Loan Amount ($)', 'Annual Rate (%)', 'Years'], placeholders: ['300000', '5', '30'] },
      'loan-calculator': { labels: ['Loan Amount ($)', 'Annual Rate (%)', 'Months'], placeholders: ['10000', '5', '60'] },
      'body-fat-calculator': { labels: ['Weight (lb)', 'Waist (in)', 'Neck (in)'], placeholders: ['200', '36', '16'] },
      'ideal-weight-calculator': { labels: ['Height (in)'], placeholders: ['70'] },
      'water-intake-calculator': { labels: ['Weight (lb)'], placeholders: ['180'] },
    }

    const tool_config = multiInputTools[tool.slug]
    if (!tool_config) {
      return (
        <ToolInput
          value={input}
          onChange={setInput}
          placeholder="Enter your input here..."
          label="Input"
          type="textarea"
        />
      )
    }

    return (
      <div className="space-y-4">
        <ToolInput
          value={input}
          onChange={setInput}
          placeholder={tool_config.placeholders[0]}
          label={tool_config.labels[0]}
          type="text"
        />
        {tool_config.labels[1] && (
          <ToolInput
            value={secondInput}
            onChange={setSecondInput}
            placeholder={tool_config.placeholders[1]}
            label={tool_config.labels[1]}
            type="text"
          />
        )}
        {tool_config.labels[2] && (
          <ToolInput
            value={thirdInput}
            onChange={setThirdInput}
            placeholder={tool_config.placeholders[2]}
            label={tool_config.labels[2]}
            type="text"
          />
        )}
      </div>
    )
  }

  return (
    <ToolLayout
      title={tool.name}
      description={tool.description}
      onCopy={output ? handleCopy : undefined}
      onDownload={output ? handleDownload : undefined}
      copiedText={copied}
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>{getInputFields()}</div>
          <div>
            <ToolOutput
              value={output}
              label="Output"
              isEmpty={!output && !loading}
              emptyMessage="Output will appear here..."
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <Button
          onClick={processInput}
          disabled={loading || (!input.trim() && !secondInput.trim())}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Convert / Process'
          )}
        </Button>
      </div>
    </ToolLayout>
  )
}

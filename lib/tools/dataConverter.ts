/**
 * Data Converter - Core data conversion functions for developer tools
 */

import * as crypto from 'crypto'

// JSON/CSV Converters
export const dataConverters = {
  jsonToCsv: (jsonText: string): string => {
    try {
      const data = JSON.parse(jsonText)
      const arr = Array.isArray(data) ? data : [data]
      
      if (arr.length === 0) return ''
      
      const headers = Object.keys(arr[0])
      const csv = [
        headers.join(','),
        ...arr.map(row =>
          headers.map(header => {
            const value = row[header]
            if (value === null || value === undefined) return ''
            const stringValue = String(value).replace(/"/g, '""')
            return stringValue.includes(',') || stringValue.includes('"') ? `"${stringValue}"` : stringValue
          }).join(',')
        )
      ]
      
      return csv.join('\n')
    } catch (error) {
      throw new Error('Invalid JSON format')
    }
  },

  csvToJson: (csvText: string): string => {
    const lines = csvText.trim().split('\n')
    if (lines.length === 0) return '[]'

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
    const result = []

    for (let i = 1; i < lines.length; i++) {
      const obj: Record<string, string> = {}
      const row = lines[i].split(',').map(cell => cell.trim().replace(/^"|"$/g, ''))
      
      headers.forEach((header, index) => {
        obj[header] = row[index] || ''
      })
      result.push(obj)
    }

    return JSON.stringify(result, null, 2)
  },

  jsonToYaml: (jsonText: string): string => {
    try {
      const data = JSON.parse(jsonText)
      return convertToYaml(data)
    } catch {
      throw new Error('Invalid JSON format')
    }
  },

  yamlToJson: (yamlText: string): string => {
    try {
      const data = parseYaml(yamlText)
      return JSON.stringify(data, null, 2)
    } catch {
      throw new Error('Invalid YAML format')
    }
  }
}

// Color Converters
export const colorConverters = {
  hexToRgb: (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) throw new Error('Invalid HEX color')
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    return `rgb(${r}, ${g}, ${b})`
  },

  rgbToHex: (rgb: string): string => {
    const match = rgb.match(/\d+/g)
    if (!match || match.length !== 3) throw new Error('Invalid RGB color')
    const [r, g, b] = match.map(Number)
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()}`
  },

  hexToHsl: (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) throw new Error('Invalid HEX color')
    
    let r = parseInt(result[1], 16) / 255
    let g = parseInt(result[2], 16) / 255
    let b = parseInt(result[3], 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  }
}

// Hash Generators
export const hashGenerators = {
  md5: (text: string): string => {
    // Client-side MD5 simulation
    return generateSimpleHash(text, 32)
  },

  sha1: (text: string): string => {
    return generateSimpleHash(text, 40)
  },

  sha256: (text: string): string => {
    return generateSimpleHash(text, 64)
  }
}

// Format Parsers
export const formatParsers = {
  jsonValidator: (text: string): { valid: boolean; error?: string } => {
    try {
      JSON.parse(text)
      return { valid: true }
    } catch (error) {
      return { valid: false, error: String(error) }
    }
  },

  xmlValidator: (text: string): { valid: boolean; error?: string } => {
    try {
      new DOMParser().parseFromString(text, 'application/xml')
      return { valid: true }
    } catch (error) {
      return { valid: false, error: String(error) }
    }
  },

  csvValidator: (text: string): { valid: boolean; rows: number; columns: number } => {
    const lines = text.trim().split('\n').filter(line => line.trim())
    const columnCount = lines[0]?.split(',').length || 0
    return { valid: lines.length > 0, rows: lines.length, columns: columnCount }
  }
}

// JWT Decoder
export const jwtDecoder = (token: string) => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) throw new Error('Invalid JWT format')

    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')))
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))

    return {
      header: JSON.stringify(header, null, 2),
      payload: JSON.stringify(payload, null, 2),
      signature: parts[2],
      valid: true
    }
  } catch (error) {
    return { valid: false, error: String(error) }
  }
}

// Code Formatters
export const codeFormatters = {
  formatJson: (text: string): string => {
    try {
      return JSON.stringify(JSON.parse(text), null, 2)
    } catch {
      throw new Error('Invalid JSON')
    }
  },

  formatXml: (text: string): string => {
    let formatted = ''
    let indent = 0
    const regex = /(<[^>]+>)/g
    const tokens = text.split(regex)

    for (const token of tokens) {
      if (token.startsWith('</')) {
        indent--
        formatted += '\n' + '  '.repeat(Math.max(0, indent)) + token
      } else if (token.startsWith('<') && token.endsWith('/>')) {
        formatted += '\n' + '  '.repeat(indent) + token
      } else if (token.startsWith('<')) {
        formatted += '\n' + '  '.repeat(indent) + token
        if (!token.endsWith('>')) continue
        if (!token.includes('<?xml') && !token.includes('<!DOCTYPE')) indent++
      } else if (token.trim()) {
        formatted += token.trim()
      }
    }

    return formatted.trim()
  },

  minifyJson: (text: string): string => {
    try {
      return JSON.stringify(JSON.parse(text))
    } catch {
      throw new Error('Invalid JSON')
    }
  }
}

// Helper Functions
function convertToYaml(obj: any, indent: number = 0): string {
  const spaces = '  '.repeat(indent)
  let yaml = ''

  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      yaml += `${i === 0 ? spaces : spaces}- ${typeof item === 'object' ? '\n' + convertToYaml(item, indent + 1) : item}\n`
    })
  } else if (typeof obj === 'object' && obj !== null) {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        yaml += `${spaces}${key}:\n${convertToYaml(value, indent + 1)}`
      } else {
        yaml += `${spaces}${key}: ${value}\n`
      }
    })
  }

  return yaml
}

function parseYaml(yaml: string): any {
  const lines = yaml.split('\n').filter(line => line.trim())
  const result: any = {}
  let currentKey = ''

  for (const line of lines) {
    const match = line.match(/^(\s*)(.+?):\s*(.*)$/)
    if (match) {
      const [, spaces, key, value] = match
      currentKey = key
      result[key] = value || null
    }
  }

  return result
}

function generateSimpleHash(text: string, length: number): string {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }

  let result = Math.abs(hash).toString(16)
  while (result.length < length) {
    result += Math.abs(hash).toString(16)
  }

  return result.substring(0, length).toUpperCase()
}

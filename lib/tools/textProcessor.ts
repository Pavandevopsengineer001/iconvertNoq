/**
 * Text Processor - Core text processing functions for text tools
 */

// Case Converters
export const caseConverters = {
  toCamelCase: (text: string) => {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase())
      .replace(/\s+/g, '')
  },

  toKebabCase: (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  },

  toSnakeCase: (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_')
      .trim()
  },

  toTitleCase: (text: string) => {
    return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase())
  },

  toPascalCase: (text: string) => {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => {
        if (/\s+/.test(match)) return ''
        return match.toUpperCase()
      })
  },

  toUpperCase: (text: string) => text.toUpperCase(),

  toLowerCase: (text: string) => text.toLowerCase(),

  toSentenceCase: (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }
}

// Text Analyzers
export const textAnalyzers = {
  wordCount: (text: string) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    return words.length
  },

  charCount: (text: string) => {
    return text.length
  },

  charCountNoSpaces: (text: string) => {
    return text.replace(/\s/g, '').length
  },

  sentenceCount: (text: string) => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    return sentences.length
  },

  paragraphCount: (text: string) => {
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0)
    return paragraphs.length
  },

  lineCount: (text: string) => {
    return text.split('\n').length
  },

  wordFrequency: (text: string) => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || []
    const frequency: Record<string, number> = {}
    
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1
    })

    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .map(([word, count]) => `${word}: ${count}`)
      .join('\n')
  },

  readingTime: (text: string) => {
    const words = text.trim().split(/\s+/).length
    const wordsPerMinute = 200
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }
}

// Text Checkers
export const textCheckers = {
  isPalindrome: (text: string) => {
    const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, '')
    return cleaned === cleaned.split('').reverse().join('')
  },

  passwordStrength: (password: string) => {
    let strength = 0
    const feedback: string[] = []

    if (password.length >= 8) strength++
    else feedback.push('At least 8 characters')

    if (password.length >= 12) strength++
    if (/[a-z]/.test(password)) strength++
    else feedback.push('Add lowercase letters')

    if (/[A-Z]/.test(password)) strength++
    else feedback.push('Add uppercase letters')

    if (/[0-9]/.test(password)) strength++
    else feedback.push('Add numbers')

    if (/[^a-zA-Z0-9]/.test(password)) strength++
    else feedback.push('Add special characters')

    const strengthLevels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
    return {
      strength: strengthLevels[strength],
      score: strength,
      suggestions: feedback
    }
  }
}

// Text Converters
export const textConverters = {
  toMorseCode: (text: string) => {
    const morseMap: Record<string, string> = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
      '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
      '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
      "'": '.----.',  '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
      '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
      '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
    }

    return text
      .toUpperCase()
      .split('')
      .map(char => morseMap[char] || char)
      .join(' ')
  },

  toBinary: (text: string) => {
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ')
  },

  toBase64: (text: string) => {
    return Buffer.from(text).toString('base64')
  },

  fromBase64: (text: string) => {
    try {
      return Buffer.from(text, 'base64').toString('utf-8')
    } catch {
      return 'Invalid Base64'
    }
  },

  toPhoneticAlphabet: (text: string) => {
    const phoneticMap: Record<string, string> = {
      'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
      'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
      'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
      'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
      'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
      'Z': 'Zulu'
    }

    return text
      .toUpperCase()
      .split('')
      .map(char => phoneticMap[char] || char)
      .join(' ')
  },

  slugify: (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }
}

// Format Generators
export const formatGenerators = {
  generateUUID: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },

  generateRandomString: (length: number = 16, chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },

  generateLoremIpsum: (paragraphs: number = 3) => {
    const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
      'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna',
      'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco',
      'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure']

    const result = []
    for (let p = 0; p < paragraphs; p++) {
      const sentenceCount = Math.floor(Math.random() * 4) + 3
      const sentences = []
      for (let s = 0; s < sentenceCount; s++) {
        const wordCount = Math.floor(Math.random() * 8) + 4
        const sentence = []
        for (let w = 0; w < wordCount; w++) {
          sentence.push(words[Math.floor(Math.random() * words.length)])
        }
        sentences.push(sentence.join(' ').charAt(0).toUpperCase() + sentence.join(' ').slice(1) + '.')
      }
      result.push(sentences.join(' '))
    }
    return result.join('\n\n')
  }
}

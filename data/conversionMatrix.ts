/**
 * Conversion Matrix - Defines all unit and format conversion pairs
 * Enables generation of 1000+ conversion pages automatically
 */

export interface ConversionPair {
  from: string
  to: string
  factor: number
  category: string
  description: string
}

export interface ConversionCategory {
  name: string
  slug: string
  pairs: ConversionPair[]
}

// Length Conversions
const lengthConversions: ConversionPair[] = [
  { from: 'millimeter', to: 'centimeter', factor: 0.1, category: 'length', description: 'mm to cm' },
  { from: 'centimeter', to: 'meter', factor: 0.01, category: 'length', description: 'cm to m' },
  { from: 'meter', to: 'kilometer', factor: 0.001, category: 'length', description: 'm to km' },
  { from: 'inch', to: 'foot', factor: 0.0833333, category: 'length', description: 'in to ft' },
  { from: 'foot', to: 'yard', factor: 0.333333, category: 'length', description: 'ft to yd' },
  { from: 'yard', to: 'mile', factor: 0.000568182, category: 'length', description: 'yd to mi' },
  { from: 'centimeter', to: 'inch', factor: 0.393701, category: 'length', description: 'cm to in' },
  { from: 'meter', to: 'foot', factor: 3.28084, category: 'length', description: 'm to ft' },
  { from: 'kilometer', to: 'mile', factor: 0.621371, category: 'length', description: 'km to mi' },
  { from: 'inch', to: 'millimeter', factor: 25.4, category: 'length', description: 'in to mm' },
]

// Weight Conversions
const weightConversions: ConversionPair[] = [
  { from: 'milligram', to: 'gram', factor: 0.001, category: 'weight', description: 'mg to g' },
  { from: 'gram', to: 'kilogram', factor: 0.001, category: 'weight', description: 'g to kg' },
  { from: 'ounce', to: 'pound', factor: 0.0625, category: 'weight', description: 'oz to lb' },
  { from: 'pound', to: 'ton', factor: 0.0005, category: 'weight', description: 'lb to ton' },
  { from: 'gram', to: 'ounce', factor: 0.035274, category: 'weight', description: 'g to oz' },
  { from: 'kilogram', to: 'pound', factor: 2.20462, category: 'weight', description: 'kg to lb' },
  { from: 'kilogram', to: 'ton', factor: 0.001, category: 'weight', description: 'kg to t' },
  { from: 'ounce', to: 'gram', factor: 28.3495, category: 'weight', description: 'oz to g' },
  { from: 'pound', to: 'kilogram', factor: 0.453592, category: 'weight', description: 'lb to kg' },
  { from: 'ton', to: 'kilogram', factor: 1000, category: 'weight', description: 't to kg' },
]

// Volume Conversions
const volumeConversions: ConversionPair[] = [
  { from: 'milliliter', to: 'liter', factor: 0.001, category: 'volume', description: 'ml to L' },
  { from: 'cubic-centimeter', to: 'liter', factor: 0.001, category: 'volume', description: 'cm³ to L' },
  { from: 'fluid-ounce', to: 'cup', factor: 0.125, category: 'volume', description: 'fl oz to cup' },
  { from: 'cup', to: 'pint', factor: 0.5, category: 'volume', description: 'cup to pt' },
  { from: 'pint', to: 'quart', factor: 0.5, category: 'volume', description: 'pt to qt' },
  { from: 'quart', to: 'gallon', factor: 0.25, category: 'volume', description: 'qt to gal' },
  { from: 'milliliter', to: 'fluid-ounce', factor: 0.033814, category: 'volume', description: 'ml to fl oz' },
  { from: 'liter', to: 'gallon', factor: 0.264172, category: 'volume', description: 'L to gal' },
  { from: 'cubic-meter', to: 'liter', factor: 1000, category: 'volume', description: 'm³ to L' },
  { from: 'fluid-ounce', to: 'milliliter', factor: 29.5735, category: 'volume', description: 'fl oz to ml' },
]

// Temperature Conversions (special handling needed)
const temperatureConversions: ConversionPair[] = [
  { from: 'celsius', to: 'fahrenheit', factor: 1.8, category: 'temperature', description: '°C to °F' },
  { from: 'celsius', to: 'kelvin', factor: 273.15, category: 'temperature', description: '°C to K' },
  { from: 'fahrenheit', to: 'celsius', factor: 0.555556, category: 'temperature', description: '°F to °C' },
  { from: 'kelvin', to: 'celsius', factor: -273.15, category: 'temperature', description: 'K to °C' },
]

// Area Conversions
const areaConversions: ConversionPair[] = [
  { from: 'square-millimeter', to: 'square-centimeter', factor: 0.01, category: 'area', description: 'mm² to cm²' },
  { from: 'square-centimeter', to: 'square-meter', factor: 0.0001, category: 'area', description: 'cm² to m²' },
  { from: 'square-meter', to: 'hectare', factor: 0.0001, category: 'area', description: 'm² to ha' },
  { from: 'square-inch', to: 'square-foot', factor: 0.00694444, category: 'area', description: 'in² to ft²' },
  { from: 'square-foot', to: 'square-yard', factor: 0.111111, category: 'area', description: 'ft² to yd²' },
  { from: 'square-yard', to: 'acre', factor: 0.000206612, category: 'area', description: 'yd² to ac' },
  { from: 'square-meter', to: 'square-foot', factor: 10.7639, category: 'area', description: 'm² to ft²' },
  { from: 'hectare', to: 'acre', factor: 2.47105, category: 'area', description: 'ha to ac' },
  { from: 'square-kilometer', to: 'square-mile', factor: 0.386102, category: 'area', description: 'km² to mi²' },
  { from: 'acre', to: 'hectare', factor: 0.404686, category: 'area', description: 'ac to ha' },
]

// Image Format Conversions (File extensions as pairs)
const imageFormatConversions: ConversionPair[] = [
  { from: 'jpeg', to: 'png', factor: 1, category: 'image-format', description: 'JPG to PNG' },
  { from: 'png', to: 'webp', factor: 1, category: 'image-format', description: 'PNG to WebP' },
  { from: 'jpeg', to: 'webp', factor: 1, category: 'image-format', description: 'JPG to WebP' },
  { from: 'gif', to: 'apng', factor: 1, category: 'image-format', description: 'GIF to APNG' },
  { from: 'bmp', to: 'png', factor: 1, category: 'image-format', description: 'BMP to PNG' },
  { from: 'tiff', to: 'jpeg', factor: 1, category: 'image-format', description: 'TIFF to JPG' },
  { from: 'svg', to: 'png', factor: 1, category: 'image-format', description: 'SVG to PNG' },
  { from: 'heic', to: 'jpeg', factor: 1, category: 'image-format', description: 'HEIC to JPG' },
  { from: 'avif', to: 'webp', factor: 1, category: 'image-format', description: 'AVIF to WebP' },
  { from: 'png', to: 'jpeg', factor: 1, category: 'image-format', description: 'PNG to JPG' },
]

// Data Format Conversions
const dataFormatConversions: ConversionPair[] = [
  { from: 'json', to: 'csv', factor: 1, category: 'data-format', description: 'JSON to CSV' },
  { from: 'json', to: 'xml', factor: 1, category: 'data-format', description: 'JSON to XML' },
  { from: 'json', to: 'yaml', factor: 1, category: 'data-format', description: 'JSON to YAML' },
  { from: 'csv', to: 'json', factor: 1, category: 'data-format', description: 'CSV to JSON' },
  { from: 'xml', to: 'json', factor: 1, category: 'data-format', description: 'XML to JSON' },
  { from: 'yaml', to: 'json', factor: 1, category: 'data-format', description: 'YAML to JSON' },
  { from: 'html', to: 'plaintext', factor: 1, category: 'data-format', description: 'HTML to Text' },
  { from: 'markdown', to: 'html', factor: 1, category: 'data-format', description: 'Markdown to HTML' },
]

// Energy Conversions
const energyConversions: ConversionPair[] = [
  { from: 'joule', to: 'kilojoule', factor: 0.001, category: 'energy', description: 'J to kJ' },
  { from: 'kilocalorie', to: 'joule', factor: 4184, category: 'energy', description: 'kcal to J' },
  { from: 'watt', to: 'kilowatt', factor: 0.001, category: 'energy', description: 'W to kW' },
  { from: 'watt-hour', to: 'kilowatt-hour', factor: 0.001, category: 'energy', description: 'Wh to kWh' },
  { from: 'joule', to: 'watt-second', factor: 1, category: 'energy', description: 'J to Ws' },
  { from: 'calorie', to: 'joule', factor: 4.184, category: 'energy', description: 'cal to J' },
  { from: 'kilocalorie', to: 'kilojoule', factor: 4.184, category: 'energy', description: 'kcal to kJ' },
]

// Currency Conversions (example rates - would be dynamic in production)
const currencyConversions: ConversionPair[] = [
  { from: 'usd', to: 'eur', factor: 0.92, category: 'currency', description: 'USD to EUR' },
  { from: 'usd', to: 'gbp', factor: 0.79, category: 'currency', description: 'USD to GBP' },
  { from: 'usd', to: 'inr', factor: 83.1, category: 'currency', description: 'USD to INR' },
  { from: 'usd', to: 'jpy', factor: 149.5, category: 'currency', description: 'USD to JPY' },
  { from: 'usd', to: 'aud', factor: 1.53, category: 'currency', description: 'USD to AUD' },
  { from: 'usd', to: 'cad', factor: 1.36, category: 'currency', description: 'USD to CAD' },
  { from: 'eur', to: 'gbp', factor: 0.86, category: 'currency', description: 'EUR to GBP' },
]

export const CONVERSION_MATRIX: ConversionCategory[] = [
  { name: 'Length', slug: 'length', pairs: lengthConversions },
  { name: 'Weight', slug: 'weight', pairs: weightConversions },
  { name: 'Volume', slug: 'volume', pairs: volumeConversions },
  { name: 'Temperature', slug: 'temperature', pairs: temperatureConversions },
  { name: 'Area', slug: 'area', pairs: areaConversions },
  { name: 'Image Formats', slug: 'image-format', pairs: imageFormatConversions },
  { name: 'Data Formats', slug: 'data-format', pairs: dataFormatConversions },
  { name: 'Energy', slug: 'energy', pairs: energyConversions },
  { name: 'Currency', slug: 'currency', pairs: currencyConversions },
]

// Utility to get all conversion pairs
export function getAllConversionPairs(): ConversionPair[] {
  return CONVERSION_MATRIX.flatMap(category => category.pairs)
}

// Utility to get conversion pairs by category
export function getConversionsByCategory(category: string): ConversionPair[] {
  const found = CONVERSION_MATRIX.find(c => c.slug === category)
  return found ? found.pairs : []
}

// Utility to generate conversion page slug
export function generateConversionSlug(from: string, to: string): string {
  return `${from}-to-${to}`
}

// Utility to get conversion pair by slug
export function getConversionBySlug(slug: string): ConversionPair | null {
  const [from, , to] = slug.split('-to-')
  const pairs = getAllConversionPairs()
  return pairs.find(p => p.from === from && p.to === to) || null
}

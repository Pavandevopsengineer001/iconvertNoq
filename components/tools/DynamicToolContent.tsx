'use client'

import { useState, useMemo } from 'react'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ToolInput } from '@/components/tools/ToolInput'
import { ToolOutput } from '@/components/tools/ToolOutput'
import { Button } from '@/components/ui/button'
import type { Tool } from '@/data/tools'
import { Copy } from 'lucide-react'

// Import all tool components
import JsonToCsvTool from '@/components/tools/implementations/JsonToCsvTool'
import CsvToJsonTool from '@/components/tools/implementations/CsvToJsonTool'
import JwtDecoderTool from '@/components/tools/implementations/JwtDecoderTool'
import CronGeneratorTool from '@/components/tools/implementations/CronGeneratorTool'
import HttpHeaderParserTool from '@/components/tools/implementations/HttpHeaderParserTool'
import UserAgentParserTool from '@/components/tools/implementations/UserAgentParserTool'
import ColorConverterTool from '@/components/tools/implementations/ColorConverterTool'
import CodeMinifierTool from '@/components/tools/implementations/CodeMinifierTool'
import CodeBeautifierTool from '@/components/tools/implementations/CodeBeautifierTool'
import UuidGeneratorTool from '@/components/tools/implementations/UuidGeneratorTool'
import HashGeneratorTool from '@/components/tools/implementations/HashGeneratorTool'
import RandomStringGeneratorTool from '@/components/tools/implementations/RandomStringGeneratorTool'
import LoremIpsumGeneratorTool from '@/components/tools/implementations/LoremIpsumGeneratorTool'
import TextToSlugTool from '@/components/tools/implementations/TextToSlugTool'

// Text Tools
import SentenceCounterTool from '@/components/tools/implementations/SentenceCounterTool'
import ParagraphCounterTool from '@/components/tools/implementations/ParagraphCounterTool'
import QuoteFinderTool from '@/components/tools/implementations/QuoteFinderTool'
import RhymeCheckerTool from '@/components/tools/implementations/RhymeCheckerTool'
import PlagiarismCheckerTool from '@/components/tools/implementations/PlagiarismCheckerTool'
import MarkdownPreviewTool from '@/components/tools/implementations/MarkdownPreviewTool'
import MarkdownToHtmlTool from '@/components/tools/implementations/MarkdownToHtmlTool'
import YamlParserTool from '@/components/tools/implementations/YamlParserTool'
import XmlFormatterTool from '@/components/tools/implementations/XmlFormatterTool'
import TomlParserTool from '@/components/tools/implementations/TomlParserTool'
import SlugGeneratorTool from '@/components/tools/implementations/SlugGeneratorTool'
import PhoneticAlphabetTool from '@/components/tools/implementations/PhoneticAlphabetTool'
import RegexBuilderTool from '@/components/tools/implementations/RegexBuilderTool'
import MorseCodeConverterTool from '@/components/tools/implementations/MorseCodeConverterTool'
import BinaryTextConverterTool from '@/components/tools/implementations/BinaryTextConverterTool'
import CamelCaseConverterTool from '@/components/tools/implementations/CamelCaseConverterTool'
import KebabCaseConverterTool from '@/components/tools/implementations/KebabCaseConverterTool'
import SnakeCaseConverterTool from '@/components/tools/implementations/SnakeCaseConverterTool'
import TitleCaseConverterTool from '@/components/tools/implementations/TitleCaseConverterTool'
import PalindromeCheckerTool from '@/components/tools/implementations/PalindromeCheckerTool'
import AnagramFinderTool from '@/components/tools/implementations/AnagramFinderTool'
import WordFrequencyCounterTool from '@/components/tools/implementations/WordFrequencyCounterTool'
import ReadingTimeCalculatorTool from '@/components/tools/implementations/ReadingTimeCalculatorTool'
import PasswordStrengthCheckerTool from '@/components/tools/implementations/PasswordStrengthCheckerTool'

// Image/Multimedia Tools
import QrCodeGeneratorTool from '@/components/tools/implementations/QrCodeGeneratorTool'
import BarcodeGeneratorTool from '@/components/tools/implementations/BarcodeGeneratorTool'
import ColorPaletteGeneratorTool from '@/components/tools/implementations/ColorPaletteGeneratorTool'
import GradientGeneratorTool from '@/components/tools/implementations/GradientGeneratorTool'
import EmojiPickerTool from '@/components/tools/implementations/EmojiPickerTool'
import FontPreviewTool from '@/components/tools/implementations/FontPreviewTool'
import CssFilterGeneratorTool from '@/components/tools/implementations/CssFilterGeneratorTool'
import SvgCompressorTool from '@/components/tools/implementations/SvgCompressorTool'
import ImageWatermarkTool from '@/components/tools/implementations/ImageWatermarkTool'
import ImageMetadataReaderTool from '@/components/tools/implementations/ImageMetadataReaderTool'
import ImageToAsciiArtTool from '@/components/tools/implementations/ImageToAsciiArtTool'
import SpriteSheetGeneratorTool from '@/components/tools/implementations/SpriteSheetGeneratorTool'
import AnimatedGifMakerTool from '@/components/tools/implementations/AnimatedGifMakerTool'
import ExifDataExtractorTool from '@/components/tools/implementations/ExifDataExtractorTool'

// Calculator Tools
import BmiCalculatorTool from '@/components/tools/implementations/BmiCalculatorTool'
import BmrCalculatorTool from '@/components/tools/implementations/BmrCalculatorTool'
import CalorieCalculatorTool from '@/components/tools/implementations/CalorieCalculatorTool'
import CompoundInterestCalculatorTool from '@/components/tools/implementations/CompoundInterestCalculatorTool'
import SimpleInterestCalculatorTool from '@/components/tools/implementations/SimpleInterestCalculatorTool'
import GstCalculatorTool from '@/components/tools/implementations/GstCalculatorTool'
import SalesTaxCalculatorTool from '@/components/tools/implementations/SalesTaxCalculatorTool'
import TipCalculatorTool from '@/components/tools/implementations/TipCalculatorTool'
import ProfitMarginCalculatorTool from '@/components/tools/implementations/ProfitMarginCalculatorTool'
import MarkupCalculatorTool from '@/components/tools/implementations/MarkupCalculatorTool'
import BreakEvenCalculatorTool from '@/components/tools/implementations/BreakEvenCalculatorTool'
import UnitPriceCalculatorTool from '@/components/tools/implementations/UnitPriceCalculatorTool'
import AverageCalculatorTool from '@/components/tools/implementations/AverageCalculatorTool'
import GradeCalculatorTool from '@/components/tools/implementations/GradeCalculatorTool'
import TimeDurationCalculatorTool from '@/components/tools/implementations/TimeDurationCalculatorTool'
import SpeedDistanceTimeCalculatorTool from '@/components/tools/implementations/SpeedDistanceTimeCalculatorTool'
import DaysBetweenCalculatorTool from '@/components/tools/implementations/DaysBetweenCalculatorTool'
import OvulationCalculatorTool from '@/components/tools/implementations/OvulationCalculatorTool'
import PregnancyCalculatorTool from '@/components/tools/implementations/PregnancyCalculatorTool'
import RetirementCalculatorTool from '@/components/tools/implementations/RetirementCalculatorTool'
import InflationCalculatorTool from '@/components/tools/implementations/InflationCalculatorTool'
import SalaryCalculatorTool from '@/components/tools/implementations/SalaryCalculatorTool'
import ElectricityCalculatorTool from '@/components/tools/implementations/ElectricityCalculatorTool'
import FuelConsumptionCalculatorTool from '@/components/tools/implementations/FuelConsumptionCalculatorTool'
import MortgageCalculatorTool from '@/components/tools/implementations/MortgageCalculatorTool'
import InvestmentCalculatorTool from '@/components/tools/implementations/InvestmentCalculatorTool'
import SavingsGoalCalculatorTool from '@/components/tools/implementations/SavingsGoalCalculatorTool'
import BodyFatCalculatorTool from '@/components/tools/implementations/BodyFatCalculatorTool'
import IdealWeightCalculatorTool from '@/components/tools/implementations/IdealWeightCalculatorTool'
import WaterIntakeCalculatorTool from '@/components/tools/implementations/WaterIntakeCalculatorTool'
import AgeInSecondsCalculatorTool from '@/components/tools/implementations/AgeInSecondsCalculatorTool'
import TimezoneConverterTool from '@/components/tools/implementations/TimezoneConverterTool'
import CountdownTimerTool from '@/components/tools/implementations/CountdownTimerTool'
import UnitConverterTool from '@/components/tools/implementations/UnitConverterTool'
import TemperatureConverterTool from '@/components/tools/implementations/TemperatureConverterTool'
import VolumeConverterTool from '@/components/tools/implementations/VolumeConverterTool'
import WeightConverterTool from '@/components/tools/implementations/WeightConverterTool'
import LengthConverterTool from '@/components/tools/implementations/LengthConverterTool'
import AreaConverterTool from '@/components/tools/implementations/AreaConverterTool'
import LoanCalculatorTool from '@/components/tools/implementations/LoanCalculatorTool'

// Placeholder component for tools that aren't implemented yet
function PlaceholderTool({ tool }: { tool: Tool }) {
  return (
    <ToolLayout tool={tool}>
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground mb-2">
            {tool.name} is being developed and will be available soon.
          </p>
          <p className="text-sm text-muted-foreground">
            {tool.description}
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}

interface DynamicToolContentProps {
  tool: Tool
}

export default function DynamicToolContent({ tool }: DynamicToolContentProps) {
  const renderTool = () => {
    switch (tool.slug) {
      // Developer Tools
      case 'json-to-csv':
        return <JsonToCsvTool />
      case 'csv-to-json':
        return <CsvToJsonTool />
      case 'jwt-decoder':
        return <JwtDecoderTool />
      case 'cron-generator':
        return <CronGeneratorTool />
      case 'http-header-parser':
        return <HttpHeaderParserTool />
      case 'user-agent-parser':
        return <UserAgentParserTool />
      case 'color-converter':
        return <ColorConverterTool />
      case 'code-minifier':
        return <CodeMinifierTool />
      case 'code-beautifier':
        return <CodeBeautifierTool />
      case 'uuid-generator':
        return <UuidGeneratorTool />
      case 'hash-generator':
        return <HashGeneratorTool />
      case 'random-string-generator':
        return <RandomStringGeneratorTool />
      case 'lorem-ipsum-generator':
        return <LoremIpsumGeneratorTool />
      case 'text-to-slug':
        return <TextToSlugTool />

      // Text Tools
      case 'sentence-counter':
        return <SentenceCounterTool />
      case 'paragraph-counter':
        return <ParagraphCounterTool />
      case 'quote-finder':
        return <QuoteFinderTool />
      case 'rhyme-checker':
        return <RhymeCheckerTool />
      case 'plagiarism-checker':
        return <PlagiarismCheckerTool />
      case 'markdown-preview':
        return <MarkdownPreviewTool />
      case 'markdown-to-html':
        return <MarkdownToHtmlTool />
      case 'yaml-parser':
        return <YamlParserTool />
      case 'xml-formatter':
        return <XmlFormatterTool />
      case 'toml-parser':
        return <TomlParserTool />
      case 'slug-generator':
        return <SlugGeneratorTool />
      case 'phonetic-alphabet':
        return <PhoneticAlphabetTool />
      case 'regex-builder':
        return <RegexBuilderTool />
      case 'morse-code-converter':
        return <MorseCodeConverterTool />
      case 'binary-text-converter':
        return <BinaryTextConverterTool />
      case 'camelcase-converter':
        return <CamelCaseConverterTool />
      case 'kebabcase-converter':
        return <KebabCaseConverterTool />
      case 'snakecase-converter':
        return <SnakeCaseConverterTool />
      case 'titlecase-converter':
        return <TitleCaseConverterTool />
      case 'palindrome-checker':
        return <PalindromeCheckerTool />
      case 'anagram-finder':
        return <AnagramFinderTool />
      case 'word-frequency-counter':
        return <WordFrequencyCounterTool />
      case 'reading-time-calculator':
        return <ReadingTimeCalculatorTool />
      case 'password-strength-checker':
        return <PasswordStrengthCheckerTool />

      // Image/Multimedia Tools
      case 'qr-code-generator':
        return <QrCodeGeneratorTool />
      case 'barcode-generator':
        return <BarcodeGeneratorTool />
      case 'color-palette-generator':
        return <ColorPaletteGeneratorTool />
      case 'gradient-generator':
        return <GradientGeneratorTool />
      case 'emoji-picker':
        return <EmojiPickerTool />
      case 'font-preview':
        return <FontPreviewTool />
      case 'css-filter-generator':
        return <CssFilterGeneratorTool />
      case 'svg-compressor':
        return <SvgCompressorTool />
      case 'image-watermark':
        return <ImageWatermarkTool />
      case 'image-metadata-reader':
        return <ImageMetadataReaderTool />
      case 'image-to-ascii-art':
        return <ImageToAsciiArtTool />
      case 'sprite-sheet-generator':
        return <SpriteSheetGeneratorTool />
      case 'animated-gif-maker':
        return <AnimatedGifMakerTool />
      case 'exif-data-extractor':
        return <ExifDataExtractorTool />

      // Calculator Tools
      case 'bmi-calculator':
        return <BmiCalculatorTool />
      case 'bmr-calculator':
        return <BmrCalculatorTool />
      case 'calorie-calculator':
        return <CalorieCalculatorTool />
      case 'compound-interest-calculator':
        return <CompoundInterestCalculatorTool />
      case 'simple-interest-calculator':
        return <SimpleInterestCalculatorTool />
      case 'gst-calculator':
        return <GstCalculatorTool />
      case 'sales-tax-calculator':
        return <SalesTaxCalculatorTool />
      case 'tip-calculator':
        return <TipCalculatorTool />
      case 'profit-margin-calculator':
        return <ProfitMarginCalculatorTool />
      case 'markup-calculator':
        return <MarkupCalculatorTool />
      case 'break-even-calculator':
        return <BreakEvenCalculatorTool />
      case 'unit-price-calculator':
        return <UnitPriceCalculatorTool />
      case 'average-calculator':
        return <AverageCalculatorTool />
      case 'grade-calculator':
        return <GradeCalculatorTool />
      case 'time-duration-calculator':
        return <TimeDurationCalculatorTool />
      case 'speed-distance-time-calculator':
        return <SpeedDistanceTimeCalculatorTool />
      case 'days-between-calculator':
        return <DaysBetweenCalculatorTool />
      case 'ovulation-calculator':
        return <OvulationCalculatorTool />
      case 'pregnancy-calculator':
        return <PregnancyCalculatorTool />
      case 'retirement-calculator':
        return <RetirementCalculatorTool />
      case 'inflation-calculator':
        return <InflationCalculatorTool />
      case 'salary-calculator':
        return <SalaryCalculatorTool />
      case 'electricity-calculator':
        return <ElectricityCalculatorTool />
      case 'fuel-consumption-calculator':
        return <FuelConsumptionCalculatorTool />
      case 'mortgage-calculator':
        return <MortgageCalculatorTool />
      case 'investment-calculator':
        return <InvestmentCalculatorTool />
      case 'savings-goal-calculator':
        return <SavingsGoalCalculatorTool />
      case 'body-fat-calculator':
        return <BodyFatCalculatorTool />
      case 'ideal-weight-calculator':
        return <IdealWeightCalculatorTool />
      case 'water-intake-calculator':
        return <WaterIntakeCalculatorTool />
      case 'age-in-seconds-calculator':
        return <AgeInSecondsCalculatorTool />
      case 'timezone-converter':
        return <TimezoneConverterTool />
      case 'countdown-timer':
        return <CountdownTimerTool />
      case 'unit-converter':
        return <UnitConverterTool />
      case 'temperature-converter':
        return <TemperatureConverterTool />
      case 'volume-converter':
        return <VolumeConverterTool />
      case 'weight-converter':
        return <WeightConverterTool />
      case 'length-converter':
        return <LengthConverterTool />
      case 'area-converter':
        return <AreaConverterTool />
      case 'loan-calculator':
        return <LoanCalculatorTool />

      default:
        return <PlaceholderTool tool={tool} />
    }
  }

  return renderTool()
}

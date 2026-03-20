/**
 * Calculator Engine - Core calculation functions for all calculator tools
 */

// Health Calculators
export const healthCalculations = {
  bmi: (weight: number, height: number, unit: 'kg' | 'lb' = 'kg') => {
    const weightKg = unit === 'lb' ? weight * 0.453592 : weight
    const heightM = unit === 'lb' ? height * 0.0254 : height / 100
    const bmi = weightKg / (heightM * heightM)
    return {
      bmi: bmi.toFixed(1),
      category: bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'
    }
  },

  bmr: (weight: number, height: number, age: number, gender: 'male' | 'female') => {
    if (gender === 'male') {
      return (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)).toFixed(0)
    } else {
      return (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)).toFixed(0)
    }
  },

  calorieNeeds: (bmr: number, activity: 'sedentary' | 'light' | 'moderate' | 'very' | 'extreme') => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extreme: 1.9
    }
    return (bmr * multipliers[activity]).toFixed(0)
  },

  bodyFat: (weight: number, waist: number, neck: number, height: number, gender: 'male' | 'female') => {
    if (gender === 'male') {
      const bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
      return bf.toFixed(1)
    } else {
      const bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + 0) - 0.22100 * Math.log10(neck) + 0.52305 * Math.log10(height)) - 450
      return bf.toFixed(1)
    }
  },

  idealWeight: (height: number, gender: 'male' | 'female') => {
    if (gender === 'male') {
      const min = 50 + 2.3 * ((height - 60))
      const max = 60 + 2.3 * ((height - 60))
      return { min: min.toFixed(1), max: max.toFixed(1) }
    } else {
      const min = 45.5 + 2.3 * ((height - 60))
      const max = 55.5 + 2.3 * ((height - 60))
      return { min: min.toFixed(1), max: max.toFixed(1) }
    }
  },

  waterIntake: (weight: number, activityLevel: 'low' | 'moderate' | 'high') => {
    const baseIntake = weight * 0.5
    const activityMultiplier = { low: 1, moderate: 1.25, high: 1.5 }
    const liters = baseIntake * activityMultiplier[activityLevel] / 29.5735
    return liters.toFixed(2)
  }
}

// Finance Calculators
export const financeCalculations = {
  compoundInterest: (principal: number, rate: number, years: number, compounds: number = 12) => {
    const amount = principal * Math.pow(1 + rate / 100 / compounds, compounds * years)
    const interest = amount - principal
    return {
      amount: amount.toFixed(2),
      interest: interest.toFixed(2),
      total: amount.toFixed(2)
    }
  },

  simpleInterest: (principal: number, rate: number, years: number) => {
    const interest = (principal * rate * years) / 100
    const total = principal + interest
    return {
      interest: interest.toFixed(2),
      total: total.toFixed(2)
    }
  },

  profitMargin: (revenue: number, cost: number) => {
    const profit = revenue - cost
    const margin = (profit / revenue) * 100
    return {
      profit: profit.toFixed(2),
      margin: margin.toFixed(2)
    }
  },

  markup: (cost: number, sellPrice: number) => {
    const markup = ((sellPrice - cost) / cost) * 100
    return markup.toFixed(2)
  },

  gstCalculation: (amount: number, gstRate: number) => {
    const gst = (amount * gstRate) / 100
    const total = amount + gst
    return {
      gst: gst.toFixed(2),
      total: total.toFixed(2)
    }
  },

  taxCalculation: (income: number, taxRate: number) => {
    const tax = (income * taxRate) / 100
    const netIncome = income - tax
    return {
      tax: tax.toFixed(2),
      netIncome: netIncome.toFixed(2)
    }
  },

  mortgage: (principal: number, annualRate: number, years: number) => {
    const monthlyRate = annualRate / 100 / 12
    const numPayments = years * 12
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    const totalPayment = monthlyPayment * numPayments
    const interest = totalPayment - principal
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: interest.toFixed(2)
    }
  },

  loan: (principal: number, annualRate: number, months: number) => {
    const monthlyRate = annualRate / 100 / 12
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - principal
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    }
  }
}

// Conversion Calculators
export const conversionCalculations = {
  temperature: (value: number, from: 'C' | 'F' | 'K', to: 'C' | 'F' | 'K') => {
    let celsius: number
    
    if (from === 'C') celsius = value
    else if (from === 'F') celsius = (value - 32) * 5 / 9
    else celsius = value - 273.15

    if (to === 'C') return celsius.toFixed(2)
    else if (to === 'F') return ((celsius * 9 / 5) + 32).toFixed(2)
    else return (celsius + 273.15).toFixed(2)
  },

  weight: (value: number, from: string, to: string) => {
    const conversions: Record<string, number> = {
      'kg': 1,
      'g': 0.001,
      'mg': 0.000001,
      'lb': 0.453592,
      'oz': 0.0283495,
      'stone': 6.35029
    }
    const valueInKg = value * conversions[from]
    return (valueInKg / conversions[to]).toFixed(6)
  },

  length: (value: number, from: string, to: string) => {
    const conversions: Record<string, number> = {
      'm': 1,
      'cm': 0.01,
      'mm': 0.001,
      'km': 1000,
      'ft': 0.3048,
      'in': 0.0254,
      'yd': 0.9144,
      'mi': 1609.34
    }
    const valueInMeters = value * conversions[from]
    return (valueInMeters / conversions[to]).toFixed(6)
  },

  volume: (value: number, from: string, to: string) => {
    const conversions: Record<string, number> = {
      'L': 1,
      'mL': 0.001,
      'gal': 3.78541,
      'qt': 0.946353,
      'pt': 0.473176,
      'cup': 0.236588,
      'fl_oz': 0.0295735,
      'm³': 1000
    }
    const valueInLiters = value * conversions[from]
    return (valueInLiters / conversions[to]).toFixed(6)
  },

  area: (value: number, from: string, to: string) => {
    const conversions: Record<string, number> = {
      'm²': 1,
      'cm²': 0.0001,
      'km²': 1000000,
      'ft²': 0.092903,
      'in²': 0.00064516,
      'yd²': 0.836127,
      'mi²': 2589988.11,
      'acre': 4046.86,
      'hectare': 10000
    }
    const valueInM2 = value * conversions[from]
    return (valueInM2 / conversions[to]).toFixed(6)
  }
}

// Time Calculators
export const timeCalculations = {
  ageInSeconds: (birthDate: Date) => {
    const now = new Date()
    const seconds = Math.floor((now.getTime() - birthDate.getTime()) / 1000)
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return {
      seconds: seconds.toLocaleString(),
      days,
      hours,
      minutes,
      seconds: secs
    }
  },

  daysBetween: (date1: Date, date2: Date) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    return daysDiff
  },

  timezoneConverter: (time: string, fromTz: string, toTz: string) => {
    // Simplified timezone conversion
    const timezoneOffsets: Record<string, number> = {
      'UTC': 0, 'EST': -5, 'CST': -6, 'MST': -7, 'PST': -8,
      'GMT': 0, 'CET': 1, 'IST': 5.5, 'JST': 9, 'AEST': 10
    }
    
    const [hours, minutes] = time.split(':').map(Number)
    const fromOffset = timezoneOffsets[fromTz] || 0
    const toOffset = timezoneOffsets[toTz] || 0
    const diff = toOffset - fromOffset
    
    const newHours = ((hours + Math.floor(diff)) % 24 + 24) % 24
    const newMinutes = minutes + ((diff % 1) * 60)
    
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`
  }
}

// Utility Calculations
export const utilityCalculations = {
  tip: (amount: number, tipPercentage: number) => {
    const tipAmount = (amount * tipPercentage) / 100
    const total = amount + tipAmount
    return {
      tip: tipAmount.toFixed(2),
      total: total.toFixed(2)
    }
  },

  breakEven: (fixedCosts: number, pricePerUnit: number, costPerUnit: number) => {
    const breakEvenUnits = fixedCosts / (pricePerUnit - costPerUnit)
    const breakEvenAmount = breakEvenUnits * pricePerUnit
    return {
      units: breakEvenUnits.toFixed(0),
      amount: breakEvenAmount.toFixed(2)
    }
  },

  unitPrice: (totalPrice: number, quantity: number) => {
    return (totalPrice / quantity).toFixed(6)
  },

  average: (numbers: number[]) => {
    const sum = numbers.reduce((a, b) => a + b, 0)
    return (sum / numbers.length).toFixed(6)
  }
}

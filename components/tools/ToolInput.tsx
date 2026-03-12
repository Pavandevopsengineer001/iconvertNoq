'use client'

import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

interface ToolInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  type?: 'text' | 'textarea'
  inputType?: 'number' | 'date' | 'text'
  rows?: number
}

export function ToolInput({
  value,
  onChange,
  placeholder = 'Enter your input here...',
  label,
  type = 'textarea',
  inputType = 'text',
  rows = 6,
}: ToolInputProps) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-300">{label}</label>}
      {type === 'textarea' ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="resize-none bg-background border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      ) : (
        <Input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-background border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      )}
    </div>
  )
}

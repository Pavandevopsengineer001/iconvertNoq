'use client'

import React from 'react'

interface ToolOutputProps {
  value: string | React.ReactNode
  label?: string
  isCode?: boolean
  isEmpty?: boolean
  emptyMessage?: string
}

export function ToolOutput({
  value,
  label = 'Output',
  isCode = true,
  isEmpty = false,
  emptyMessage = 'Output will appear here...',
}: ToolOutputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div
        className={`min-h-32 p-4 rounded-lg border border-border/50 bg-background/50 text-gray-300 break-words whitespace-pre-wrap ${
          isCode ? 'font-mono text-sm' : ''
        }`}
      >
        {isEmpty ? (
          <span className="text-gray-500">{emptyMessage}</span>
        ) : (
          value
        )}
      </div>
    </div>
  )
}

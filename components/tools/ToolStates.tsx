'use client'

import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'

export function LoadingState() {
  return (
    <div className="flex items-center justify-center p-8 text-center">
      <div className="space-y-3">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-sm text-muted-foreground">Processing your input...</p>
      </div>
    </div>
  )
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-red-900">Error</p>
        <p className="text-sm text-red-700 mt-1">{message}</p>
      </div>
    </div>
  )
}

export function EmptyState({ message = 'Enter input and click Process to get started' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center p-8 text-center bg-muted/30 rounded-lg min-h-48">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}

export function SuccessState() {
  return (
    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
      <CheckCircle2 className="h-5 w-5" />
      <p className="text-sm font-medium">Processed successfully!</p>
    </div>
  )
}

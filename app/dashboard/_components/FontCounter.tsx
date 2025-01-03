'use client'

import { Minus, Plus, Layers } from 'lucide-react'

interface FontCounterProps {
  value: number
  onChange: (value: number) => void
}

export function FontCounter({ value, onChange }: FontCounterProps) {
  return (
    <div className="flex-1 bg-gray-100 p-4 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Layers className="h-5 w-5" />
        <span className="font-medium">Personality</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          className="h-8 w-8 flex items-center justify-center rounded-md bg-white hover:bg-gray-50 transition-colors"
          disabled={value <= 1}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-4 text-center">{value}</span>
        <button
          onClick={() => onChange(Math.min(5, value + 1))}
          className="h-8 w-8 flex items-center justify-center rounded-md bg-white hover:bg-gray-50 transition-colors"
          disabled={value >= 5}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}


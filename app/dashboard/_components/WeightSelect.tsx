'use client'

import { ChevronRight, Scale } from 'lucide-react'

interface WeightSelectProps {
  value: string
  onChange: (value: string) => void
}

export function WeightSelect({ value, onChange }: WeightSelectProps) {
  const weights = ["Thin", "Light", "Regular", "Medium", "Bold"]
  
  return (
    <button
      onClick={() => {
        const currentIndex = weights.indexOf(value || weights[0])
        const nextIndex = (currentIndex + 1) % weights.length
        onChange(weights[nextIndex])
      }}
      className="flex-1 bg-gray-100 p-4 rounded-lg flex items-center justify-between group hover:bg-gray-200 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Scale className="h-5 w-5" />
        <span className="font-medium">Weight</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-600">{value || "Select"}</span>
        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </button>
  )
}


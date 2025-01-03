'use client'

import { ChevronRight, Layers } from 'lucide-react'

interface CategorySelectProps {
  value: string
  onChange: (value: string) => void
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  const categories = ["Serif", "Sans Serif", "Display", "Handwritten"]
  
  return (
    <button
      onClick={() => {
        const currentIndex = categories.indexOf(value || categories[0])
        const nextIndex = (currentIndex + 1) % categories.length
        onChange(categories[nextIndex])
      }}
      className="w-full bg-gray-100 p-4 rounded-lg flex items-center justify-between group hover:bg-gray-200 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Layers className="h-5 w-5" />
        <span className="font-medium">Category</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-600">{value || "Select"}</span>
        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </button>
  )
}


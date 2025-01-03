'use client'

import { Textarea } from "@/components/ui/textarea"
import { SquareXIcon as Squares2X2 } from 'lucide-react'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
}

export function PromptInput({ value, onChange }: PromptInputProps) {
  return (
    <div className="relative">
      <Textarea
        placeholder="Describe what you want to need"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[200px] resize-none bg-gray-100 border-0 rounded-lg text-base"
      />
      <div className="absolute bottom-3 right-3">
        <Squares2X2 className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  )
}


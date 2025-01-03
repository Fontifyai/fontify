'use client'

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from "framer-motion"

interface FontCustomizerProps {
  font: {
    fontFamily: string
    cssProperties: {
      fontSize: string
      fontWeight: number
      letterSpacing: string
      lineHeight: string
    }
  }
  onUpdate: (properties: any) => void
}

export function FontCustomizer({ font, onUpdate }: FontCustomizerProps) {
  const handleFontSizeChange = (value: number[]) => {
    onUpdate({ fontSize: `${value[0]}px` })
  }

  const handleLetterSpacingChange = (value: number[]) => {
    onUpdate({ letterSpacing: `${value[0]}em` })
  }

  const handleLineHeightChange = (value: number[]) => {
    onUpdate({ lineHeight: value[0].toString() })
  }

  const handleWeightChange = (value: string) => {
    onUpdate({ fontWeight: parseInt(value) })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-4 border rounded-lg mt-4"
    >
      <div className="space-y-2">
        <Label>Font Size</Label>
        <Slider
          defaultValue={[parseInt(font.cssProperties.fontSize)]}
          min={12}
          max={72}
          step={1}
          onValueChange={handleFontSizeChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Letter Spacing</Label>
        <Slider
          defaultValue={[parseFloat(font.cssProperties.letterSpacing)]}
          min={-0.1}
          max={0.5}
          step={0.01}
          onValueChange={handleLetterSpacingChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Line Height</Label>
        <Slider
          defaultValue={[parseFloat(font.cssProperties.lineHeight)]}
          min={1}
          max={2}
          step={0.1}
          onValueChange={handleLineHeightChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Font Weight</Label>
        <Select 
          value={font.cssProperties.fontWeight.toString()} 
          onValueChange={handleWeightChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select weight" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">Thin</SelectItem>
            <SelectItem value="300">Light</SelectItem>
            <SelectItem value="400">Regular</SelectItem>
            <SelectItem value="500">Medium</SelectItem>
            <SelectItem value="700">Bold</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  )
}


'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { PromptInput } from "./PromptInput"
import { CategorySelect } from "./CategorySelect"
import { WeightSelect } from "./WeightSelect"
import { FontCounter } from "./FontCounter"

interface GeneratedFont {
  fontFamily: string;
  cssProperties: {
    fontSize: string;
    fontWeight: number;
    letterSpacing: string;
    lineHeight: string;
    fontStyle: string;
    textTransform: string;
  };
}

export function FontGeneratorForm() {
  const [prompt, setPrompt] = useState("")
  const [category, setCategory] = useState("")
  const [weight, setWeight] = useState("")
  const [fontCount, setFontCount] = useState(4)
  const [generatedFonts, setGeneratedFonts] = useState<GeneratedFont[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt || !category || !weight) return
    
    setIsGenerating(true)
    try {
      const fonts = await Promise.all   (
        Array(fontCount).fill(null).map(async () => {
          const response = await fetch('/api/generate-font', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              prompt,
              style: category.toLowerCase().replace(' ', '-'),
              weight: weight.toLowerCase()
            }),
          })
          
          if (!response.ok) throw new Error('Failed to generate font')
          
          return await response.json()
        })
      )
      setGeneratedFonts(fonts)
    } catch (error) {
      console.error('Error generating fonts:', error)
    }
    setIsGenerating(false)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 p-4">
      <div>
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Generate Fonts</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <PromptInput value={prompt} onChange={setPrompt} />
            
            <CategorySelect value={category} onChange={setCategory} />
            
            <div className="flex gap-4">
              <WeightSelect value={weight} onChange={setWeight} />
              <FontCounter value={fontCount} onChange={setFontCount} />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gray-700 hover:bg-gray-800"
              disabled={isGenerating || !prompt || !category || !weight}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </Button>
          </form>
        </Card>
      </div>
      <div>
        <Card className="p-6 h-full">
          <AnimatePresence mode="wait">
            {!generatedFonts.length ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <Sparkles className="h-8 w-8 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Your Creations will be shown here</h2>
                <p className="text-muted-foreground">
                  Start creating amazing fonts with your words
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {generatedFonts.map((font, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div
                      style={{ 
                        fontFamily: font.fontFamily,
                        ...font.cssProperties
                      }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  )
}


import { NextResponse } from 'next/server'
import * as tf from '@tensorflow/tfjs'

// Initialize TensorFlow.js
tf.setBackend('cpu')

const BASE_FONTS = {
  'serif': 'Georgia, "Times New Roman", serif',
  'sans-serif': 'Arial, Helvetica, sans-serif',
  'display': 'Impact, Haettenschweiler, sans-serif',
  'handwritten': '"Comic Sans MS", cursive, sans-serif'
}

const WEIGHT_MAPPINGS = {
  'thin': 100,
  'light': 300,
  'regular': 400,
  'medium': 500,
  'bold': 700
}

async function generateFontParameters(prompt: string, style: string, weight: string) {
  // Create a simple model for demonstration
  const model = tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [64], units: 128, activation: 'relu' }),
      tf.layers.dense({ units: 64, activation: 'relu' }),
      tf.layers.dense({ units: 6, activation: 'tanh' })
    ]
  })

  // Convert prompt to tensor (simplified)
  const input = tf.randomNormal([1, 64])
  
  // Generate parameters
  const output = model.predict(input) as tf.Tensor
  const params = await output.array()
  
  // Cleanup
  model.dispose()
  input.dispose()
  output.dispose()
  
  return params[0]
}

export async function POST(req: Request) {
  try {
    const { prompt, style, weight } = await req.json()
    
    // Generate font parameters using TensorFlow.js
    const params = await generateFontParameters(prompt, style, weight)
    
    // Convert parameters to CSS properties
    const cssProperties = {
      fontSize: `${Math.abs(params[0] * 16 + 24)}px`,
      fontWeight: WEIGHT_MAPPINGS[weight as keyof typeof WEIGHT_MAPPINGS] || 400,
      letterSpacing: `${params[2] * 0.1}em`,
      lineHeight: Math.abs(params[3] * 0.5 + 1.5).toFixed(2),
      fontStyle: Math.abs(params[4]) > 0.5 ? 'italic' : 'normal',
      textTransform: Math.abs(params[5]) > 0.5 ? 'uppercase' : 'none'
    }
    
    // Select the base font family based on style
    const fontFamily = BASE_FONTS[style as keyof typeof BASE_FONTS] || BASE_FONTS['sans-serif']
    
    return NextResponse.json({
      fontFamily,
      cssProperties
    })
  } catch (error) {
    console.error('Error generating font:', error)
    return NextResponse.json({ error: 'Failed to generate font' }, { status: 500 })
  }
}


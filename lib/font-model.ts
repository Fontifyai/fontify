import * as tf from '@tensorflow/tfjs'

// Font style mappings for more accurate results
const STYLE_WEIGHTS = {
  'serif': [1, 0, 0, 0],
  'sans-serif': [0, 1, 0, 0],
  'display': [0, 0, 1, 0],
  'handwritten': [0, 0, 0, 1]
}

const WEIGHT_MAPPINGS = {
  'thin': 100,
  'light': 300,
  'regular': 400,
  'medium': 500,
  'bold': 700
}

// Enhanced model architecture
async function createEnhancedModel() {
  const model = tf.sequential()
  
  // Encoder layers
  model.add(tf.layers.dense({
    inputShape: [128],
    units: 256,
    activation: 'relu',
    kernelInitializer: 'glorotNormal'
  }))
  
  model.add(tf.layers.dropout({ rate: 0.2 }))
  
  // Style-specific layers
  model.add(tf.layers.dense({
    units: 128,
    activation: 'relu',
    kernelInitializer: 'glorotNormal'
  }))
  
  // Font parameter generation layers
  model.add(tf.layers.dense({
    units: 64,
    activation: 'relu',
    kernelInitializer: 'glorotNormal'
  }))
  
  // Output layer for font parameters
  model.add(tf.layers.dense({
    units: 8,
    activation: 'tanh',
    kernelInitializer: 'glorotNormal'
  }))
  
  return model
}

// Convert text to embedding
function textToEmbedding(text: string): tf.Tensor {
  const buffer = new tf.buffer([1, 128])
  const normalized = text.toLowerCase()
  
  for (let i = 0; i < Math.min(normalized.length, 128); i++) {
    buffer.set(normalized.charCodeAt(i) / 255, 0, i)
  }
  
  return buffer.toTensor()
}

// Combine style and text embeddings
function combineInputs(textEmbedding: tf.Tensor, styleVector: number[], weight: number): tf.Tensor {
  const combined = tf.concat([
    textEmbedding,
    tf.tensor2d([styleVector], [1, 4]),
    tf.tensor2d([[weight / 900]], [1, 1])
  ], 1)
  
  return combined
}

export async function generateFontParameters(
  prompt: string,
  style: string,
  weight: string
): Promise<{
  fontFamily: string,
  cssProperties: any
}> {
  await tf.ready()
  
  const model = await createEnhancedModel()
  const textEmbedding = textToEmbedding(prompt)
  const styleVector = STYLE_WEIGHTS[style as keyof typeof STYLE_WEIGHTS] || STYLE_WEIGHTS['sans-serif']
  const weightValue = WEIGHT_MAPPINGS[weight as keyof typeof WEIGHT_MAPPINGS] || 400
  
  const combined = combineInputs(textEmbedding, styleVector, weightValue)
  const prediction = model.predict(combined) as tf.Tensor
  const parameters = await prediction.array()
  
  // Cleanup
  model.dispose()
  textEmbedding.dispose()
  combined.dispose()
  prediction.dispose()
  
  // Map parameters to font properties more deterministically
  const [fontSize, letterSpacing, lineHeight, slant, contrast, width, xHeight, caps] = parameters[0]
  
  // Select appropriate font family based on style
  const fontFamilies = {
    'serif': 'Georgia, "Times New Roman", serif',
    'sans-serif': 'Inter, Arial, sans-serif',
    'display': 'Impact, Haettenschweiler, sans-serif',
    'handwritten': '"Comic Sans MS", cursive'
  }
  
  return {
    fontFamily: fontFamilies[style as keyof typeof fontFamilies] || fontFamilies['sans-serif'],
    cssProperties: {
      fontSize: `${Math.abs(fontSize * 16 + 24)}px`,
      fontWeight: weightValue,
      letterSpacing: `${letterSpacing * 0.1}em`,
      lineHeight: Math.abs(lineHeight * 0.5 + 1.5).toFixed(2),
      fontStyle: Math.abs(slant) > 0.5 ? 'italic' : 'normal',
      fontStretch: `${Math.abs(width * 50 + 100)}%`,
      fontVariationSettings: `'xhgt' ${Math.abs(xHeight * 100)}, 'CAPS' ${Math.abs(caps * 100)}`,
      fontOpticalSizing: 'auto'
    }
  }
}


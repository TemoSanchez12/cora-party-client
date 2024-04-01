interface ProductFont {
  id: string
  name: string
  sampleFontImage: SampleFontImage
}

export interface SampleFontImage {
  name: string
  url: string
  widht: number
  height: number
  mime: string
}

export default ProductFont

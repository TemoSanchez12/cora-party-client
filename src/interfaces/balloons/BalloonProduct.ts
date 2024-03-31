import Product from '../domain/Product'
import ProductFonts from '../domain/ProductFont'
import ProductColor from '../domain/ProductColor'

interface BalloonProduct extends Product {
  requiredTexts: string[]
  minimumPremiumTime: number
  colors?: ProductColor[]
  requiredColors?: string[]
  fonts?: ProductFonts[]
}

export default BalloonProduct

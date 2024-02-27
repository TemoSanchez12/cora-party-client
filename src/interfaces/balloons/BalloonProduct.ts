import Product from '../domain/Product'
import ProductFonts from '../domain/ProductFonts'
import BalloonColor from './BalloonColor'

interface BalloonProduct extends Product {
  requiredTexts: string[]
  minimumPremiumTime: number
  colors?: BalloonColor[]
  fonts?: ProductFonts[]
}

export default BalloonProduct

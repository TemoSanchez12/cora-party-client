import Product from '../Product'
import ProductFonts from '../ProductFonts'
import BalloonColor from './BalloonColor'
import ProductCategory from '../ProductCategory'

interface BalloonProduct extends Product {
  requiredTexts: string[]
  minimumPremiumTime: number
  categories?: ProductCategory[]
  colors?: BalloonColor[]
  fonts?: ProductFonts[]
}

export default BalloonProduct

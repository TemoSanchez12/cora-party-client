import Product from '../domain/Product'
import ProductFonts from '../domain/ProductFonts'
import BalloonColor from './BalloonColor'
import ProductCategory from '../domain/ProductCategory'

interface BalloonProduct extends Product {
  requiredTexts: string[]
  minimumPremiumTime: number
  categories?: ProductCategory[]
  colors?: BalloonColor[]
  fonts?: ProductFonts[]
}

export default BalloonProduct

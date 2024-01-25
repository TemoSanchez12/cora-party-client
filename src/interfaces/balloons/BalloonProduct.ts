import ComplementProduct from '../ComplementProduct'
import Product from '../Product'
import ProductFonts from '../ProductFonts'
import BalloonColor from './BalloonColor'
import BalloonCategories from './BalloonCategories'

interface BalloonProduct extends Product {
  requiredTexts: string[]
  minimumPremiumTime: number
  categories?: BalloonCategories[]
  colors?: BalloonColor[]
  fonts?: ProductFonts[]
  complements?: ComplementProduct[]
}

export default BalloonProduct

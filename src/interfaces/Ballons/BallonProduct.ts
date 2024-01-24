import ComplementProduct from '../ComplementProduct'
import Product from '../Product'
import ProductFonts from '../ProductFonts'
import BallonColor from './BallonColor'

interface BallonProduct extends Product {
  categories: BallonCategories[]
  colors: BallonColor[]
  fonts: ProductFonts[]
  complements: ComplementProduct[]
}

export default BallonProduct

import ImageProduct from './ImageProduct'
import ComplementProduct from './ComplementProduct'
import ProductCategory from '../domain/ProductCategory'
import ProductColor from './ProductColor'
import ProductFont from './ProductFont'

export enum ProductTypes {
  Balloon,
  Flower,
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: ImageProduct[]
  minimumTime: number
  premiumTime: number
  isActive: boolean
  isFeatured: boolean
  slug?: string
  complements?: ComplementProduct[]
  categoriesBalloon?: ProductCategory[]
  categoriesFlower?: ProductCategory[]
  requiredTexts: string[]
  minimumPremiumTime: number
  colors?: ProductColor[]
  requiredColors?: string[]
  fonts?: ProductFont[]
  show: boolean
  type: ProductTypes
  showTextTypes: boolean
  variants: ProductVariant
  productSizes: ProductSize[]
  fontColors: ProductColor[]
}

interface ProductVariant {
  id: string
  name: string
  image: ImageProduct
  product: Product
}

interface ProductSize {
  id: string
  name: string
  size: string
  product: Product
}

export default Product

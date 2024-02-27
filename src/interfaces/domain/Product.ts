import ImageProduct from './ImageProduct'
import ComplementProduct from './ComplementProduct'
import ProductCategory from '../domain/ProductCategory'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: ImageProduct[]
  minimumTime: number
  isActive: boolean
  isFeatured: boolean
  slug?: string
  complements?: ComplementProduct[]
  categories?: ProductCategory[]
}

export default Product

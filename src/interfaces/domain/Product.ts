import ImageProduct from './ImageProduct'
import ComplementProduct from './ComplementProduct'

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
}

export default Product

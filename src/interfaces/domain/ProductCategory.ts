import ImageProduct from './ImageProduct'
import { ProductTypes } from './Product'

interface ProductCategory {
  id: string
  type: ProductTypes
  name: string
  slug: string
  cover: ImageProduct
  featured: boolean
}

export default ProductCategory

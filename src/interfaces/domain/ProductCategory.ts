import ImageProduct from './ImageProduct'
import { ProductTypes } from './Product'

interface ProductCategory {
  id: string
  name: string
  slug: string
  cover: ImageProduct
  type: ProductTypes
  featured: boolean
}

export default ProductCategory

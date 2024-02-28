import ImageProduct from './ImageProduct'

interface ProductCategory {
  id: string
  name: string
  slug: string
  cover: ImageProduct
  featured: boolean
}

export default ProductCategory

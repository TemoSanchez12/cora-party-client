import ImageProduct from './ImageProduct'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: ImageProduct
  minimumTime: number
  isActive: boolean
  isFeatured: boolean
  slug?: string
}

export default Product

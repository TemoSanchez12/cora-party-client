import ImageProduct from './ImageProduct'

interface ComplementProduct {
  id: string
  name: string
  description: string
  price: number
  images: ImageProduct[]
  isActive: boolean
  slug: string
}

export default ComplementProduct

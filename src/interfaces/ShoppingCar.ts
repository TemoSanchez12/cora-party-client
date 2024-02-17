import ComplementProduct from './ComplementProduct'
import Product from './Product'

export interface ShoppingCar {
  balloons: ProductWrapper[]
  flowers: ProductWrapper[]
  totalPrice: number
}

export interface ProductWrapper {
  product: Product
  type: string
  quantity: number
  total: number
}

export interface ComplementWrapper {
  complement: ComplementProduct
  forProductId: string
  productType: string
}

import ComplementProduct from '../domain/ComplementProduct'
import Product from '../domain/Product'

export interface ShoppingCar {
  products: ProductWrapper[]
  totalPrice: number
}

export interface ProductWrapper {
  product: Product
  quantity: number
  total: number
}

export interface ComplementWrapper {
  complement: ComplementProduct
  forProductId: string
}

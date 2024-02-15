import Product from './Product'

export interface ShoppingCar {
  balloons: ProductWrapper[]
  flowers: ProductWrapper[]
  totalPrice: number
  shippingCost: number
}

export interface ProductWrapper {
  product: Product
  type: string
  quantity: number
  total: number
}

import Product from '@/interfaces/Product'
import { ProductWrapper } from '@/interfaces/ShoppingCar'
import { ShoppingCar } from '@/interfaces/ShoppingCar'
import { ComplementWrapper } from '@/interfaces/ShoppingCar'

const calculateComplementTotalPrices = (product: Product): number => {
  let total = 0

  product.complements?.forEach(complement => {
    total += complement.price
  })

  return total
}

const calculateTotal = (shoppingCar: ShoppingCar): number => {
  let total = 0

  shoppingCar.balloons.forEach(balloon => {
    total += balloon.total + calculateComplementTotalPrices(balloon.product)
  })

  shoppingCar.flowers.forEach(flower => {
    total += flower.total + calculateComplementTotalPrices(flower.product)
  })

  return total
}

export const addProduct = (
  state: ShoppingCar,
  payload: ProductWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = { ...state }

  switch (payload.type) {
    case 'balloon':
      payload.total = payload.product.price * payload.quantity
      stateUpdated.balloons = [...state.balloons, payload]
      break
    case 'flower':
      payload.total = payload.product.price * payload.quantity
      stateUpdated.flowers = [...state.flowers, payload]
      break
  }

  stateUpdated.totalPrice = calculateTotal(state)
  return stateUpdated
}

export const addComplement = (
  state: ShoppingCar,
  payload: ComplementWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = { ...state }

  switch (payload.productType) {
    case 'balloon':
      const product = state.balloons.find(
        product => product.product.id === payload.forProductId
      )
      product?.product.complements?.push()
      break
    case 'flower':
      break
  }

  stateUpdated.totalPrice = calculateTotal(state)

  return {} as ShoppingCar
}

export const removeProduct = (state: ShoppingCar, payload: any): ShoppingCar =>
  ({} as ShoppingCar)

export const removeComplement = (
  state: ShoppingCar,
  payload: any
): ShoppingCar => ({} as ShoppingCar)

export const updateQuantityProduct = (
  state: ShoppingCar,
  payload: any
): ShoppingCar => ({} as ShoppingCar)

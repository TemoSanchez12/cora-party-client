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
  console.log('Agregando producto')
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
      const ballonProduct = state.balloons.find(
        product => product.product.id === payload.forProductId
      )
      ballonProduct?.product.complements?.push(payload.complement)
      break
    case 'flower':
      const flowerProduct = state.balloons.find(
        product => product.product.id === payload.forProductId
      )
      flowerProduct?.product.complements?.push(payload.complement)
      break
  }

  stateUpdated.totalPrice = calculateTotal(state)

  return stateUpdated
}

export const removeProduct = (
  state: ShoppingCar,
  payload: ProductWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = { ...state }

  switch (payload.type) {
    case 'balloon':
      stateUpdated.balloons = state.balloons.filter(
        balloon => balloon.product.id != payload.product.id
      )
      break
    case 'flower':
      stateUpdated.flowers = state.balloons.filter(
        flower => flower.product.id != payload.product.id
      )
      break
  }

  stateUpdated.totalPrice = calculateTotal(state)
  return stateUpdated
}

export const removeComplement = (
  state: ShoppingCar,
  payload: ComplementWrapper
): ShoppingCar => {
  const stateUpdated = { ...state }

  switch (payload.productType) {
    case 'balloon':
      const ballonProduct = stateUpdated.balloons.find(
        product => product.product.id === payload.forProductId
      )

      const updatedComplementsBalloons =
        ballonProduct?.product.complements?.filter(
          complement => complement.id !== payload.complement.id
        )

      if (ballonProduct)
        ballonProduct.product.complements = updatedComplementsBalloons

      break
    case 'flower':
      const flowerProduct = stateUpdated.balloons.find(
        product => product.product.id === payload.forProductId
      )

      const updatedComplementsFlowers =
        flowerProduct?.product.complements?.filter(
          complement => complement.id !== payload.complement.id
        )

      if (flowerProduct)
        flowerProduct.product.complements = updatedComplementsFlowers
      break
  }

  return stateUpdated
}

export const updateQuantityProduct = (
  state: ShoppingCar,
  payload: ProductWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = { ...state }

  switch (payload.type) {
    case 'balloon':
      const productBalloon = stateUpdated.balloons.find(
        balloon => balloon.product.id == payload.product.id
      )

      if (productBalloon) {
        productBalloon.quantity = payload.quantity
        productBalloon.total =
          productBalloon.quantity * productBalloon.product.price
      }

      break
    case 'flower':
      const productFlower = stateUpdated.balloons.find(
        balloon => balloon.product.id == payload.product.id
      )

      if (productFlower) {
        productFlower.quantity = payload.quantity
        productFlower.total =
          productFlower.quantity * productFlower.product.price
      }
      break
  }

  stateUpdated.totalPrice = calculateTotal(state)
  return stateUpdated
}

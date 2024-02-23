'use client'

import Product from '@/interfaces/domain/Product'
import { ProductWrapper } from '@/interfaces/shopping/ShoppingCar'
import { ShoppingCar } from '@/interfaces/shopping/ShoppingCar'
import { ComplementWrapper } from '@/interfaces/shopping/ShoppingCar'

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

const checkProductInShoppingCar = (
  productList: ProductWrapper[],
  prod: ProductWrapper
) => {
  return productList.find(product => product.product.id == prod.product.id)
}

const checkComplementInProduct = (product: Product, complementId: string) =>
  product.complements?.find(complement => complement.id == complementId)

export const addProduct = (
  state: ShoppingCar,
  payload: ProductWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = {
    balloons: [...state.balloons],
    flowers: [...state.flowers],
    totalPrice: state.totalPrice,
  }

  switch (payload.type) {
    case 'balloon':
      if (!checkProductInShoppingCar(stateUpdated.balloons, payload)) {
        payload.total = payload.product.price * payload.quantity
        stateUpdated.balloons = [...state.balloons, payload]
      }
      break
    case 'flower':
      if (!checkProductInShoppingCar(stateUpdated.flowers, payload)) {
        payload.total = payload.product.price * payload.quantity
        stateUpdated.flowers = [...state.flowers, payload]
      }
      break
  }

  stateUpdated.totalPrice = calculateTotal(stateUpdated)
  return stateUpdated
}

export const addComplement = (
  state: ShoppingCar,
  payload: ComplementWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = {
    balloons: [...state.balloons],
    flowers: [...state.flowers],
    totalPrice: state.totalPrice,
  }

  switch (payload.productType) {
    case 'balloon':
      const ballonProduct = state.balloons.find(
        product => product.product.id === payload.forProductId
      )

      if (!ballonProduct) {
        return stateUpdated
      }

      if (!ballonProduct.product.complements) {
        ballonProduct.product.complements = []
      }

      if (
        !checkComplementInProduct(ballonProduct.product, payload.complement.id)
      ) {
        ballonProduct?.product.complements.push(payload.complement)
      }
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
  const stateUpdated: ShoppingCar = {
    balloons: [...state.balloons],
    flowers: [...state.flowers],
    totalPrice: state.totalPrice,
  }

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

  stateUpdated.totalPrice = calculateTotal(stateUpdated)
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
  stateUpdated.totalPrice = calculateTotal(stateUpdated)
  return stateUpdated
}

export const updateQuantityProduct = (
  state: ShoppingCar,
  payload: ProductWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = {
    balloons: [...state.balloons],
    flowers: [...state.flowers],
    totalPrice: state.totalPrice,
  }

  if (payload.quantity <= 0) {
    return removeProduct(stateUpdated, payload)
  }

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
      const productFlower = stateUpdated.flowers.find(
        flower => flower.product.id == payload.product.id
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

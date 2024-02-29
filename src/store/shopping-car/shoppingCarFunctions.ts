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

  shoppingCar.products.forEach(product => {
    total += product.total + calculateComplementTotalPrices(product.product)
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
    products: [...state.products],
    totalPrice: state.totalPrice,
  }

  if (!checkProductInShoppingCar(stateUpdated.products, payload)) {
    payload.total = payload.product.price * payload.quantity
    stateUpdated.products = [...state.products, payload]
  }

  stateUpdated.totalPrice = calculateTotal(stateUpdated)
  return stateUpdated
}

export const addComplement = (
  state: ShoppingCar,
  payload: ComplementWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = {
    products: [...state.products],
    totalPrice: state.totalPrice,
  }

  const product = state.products.find(
    product => product.product.id === payload.forProductId
  )

  if (!product) {
    return stateUpdated
  }

  if (!product.product.complements) {
    product.product.complements = []
  }

  if (!checkComplementInProduct(product.product, payload.complement.id)) {
    product?.product.complements.push(payload.complement)
  }

  stateUpdated.totalPrice = calculateTotal(state)

  return stateUpdated
}

export const removeProduct = (
  state: ShoppingCar,
  payload: ProductWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = {
    products: [...state.products],
    totalPrice: state.totalPrice,
  }

  stateUpdated.products = state.products.filter(
    balloon => balloon.product.id != payload.product.id
  )

  stateUpdated.totalPrice = calculateTotal(stateUpdated)
  return stateUpdated
}

export const removeComplement = (
  state: ShoppingCar,
  payload: ComplementWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = {
    products: [...state.products],
    totalPrice: state.totalPrice,
  }

  const product = stateUpdated.products.find(
    product => product.product.id === payload.forProductId
  )

  const updatedComplementsBalloons = product?.product.complements?.filter(
    complement => complement.id !== payload.complement.id
  )

  if (product) product.product.complements = updatedComplementsBalloons

  stateUpdated.totalPrice = calculateTotal(stateUpdated)
  return stateUpdated
}

export const updateQuantityProduct = (
  state: ShoppingCar,
  payload: ProductWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = {
    products: [...state.products],
    totalPrice: state.totalPrice,
  }

  if (payload.quantity <= 0) {
    return removeProduct(stateUpdated, payload)
  }

  const product = stateUpdated.products.find(
    balloon => balloon.product.id == payload.product.id
  )

  if (product) {
    product.quantity = payload.quantity

    product.total = product.quantity * product.product.price
  }

  stateUpdated.totalPrice = calculateTotal(state)
  return stateUpdated
}

'use client'

import Product from '@/interfaces/domain/Product'
import { ProductWrapper } from '@/interfaces/shopping/ShoppingCar'
import { ShoppingCar } from '@/interfaces/shopping/ShoppingCar'
import { ComplementWrapper } from '@/interfaces/shopping/ShoppingCar'

import { useContext } from 'react'
import OrderSpecsContext, { OrderSpecsAction } from '../order-specs/order-specs'

const calculateTotalProducts = (shoppingCar: ShoppingCar): number => {
  let totalProducts = 0

  for (const productWrapper of shoppingCar.products) {
    totalProducts += productWrapper.quantity
    totalProducts += productWrapper.product.complements?.length || 0
  }

  return totalProducts
}

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
    totalProducts: state.totalProducts,
    shippingPrice: state.shippingPrice,
  }

  if (!checkProductInShoppingCar(stateUpdated.products, payload)) {
    payload.total = payload.product.price * payload.quantity
    stateUpdated.products = [...state.products, payload]
  }

  stateUpdated.totalPrice = calculateTotal(stateUpdated)
  stateUpdated.totalProducts = calculateTotalProducts(stateUpdated)

  return stateUpdated
}

export const addComplement = (
  state: ShoppingCar,
  payload: ComplementWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = {
    products: [...state.products],
    totalPrice: state.totalPrice,
    totalProducts: state.totalProducts,
    shippingPrice: state.shippingPrice,
  }

  const productWrapper = state.products.find(
    product => product.product.id === payload.forProductId
  )

  if (!productWrapper) {
    return stateUpdated
  }

  if (!productWrapper.product.complements) {
    productWrapper.product.complements = []
  }

  if (
    !checkComplementInProduct(productWrapper.product, payload.complement.id)
  ) {
    productWrapper?.product.complements.push(payload.complement)
  }

  stateUpdated.totalPrice = calculateTotal(state)
  stateUpdated.totalProducts = calculateTotalProducts(stateUpdated)
  return stateUpdated
}

export const removeProduct = (
  state: ShoppingCar,
  payload: ProductWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = {
    products: [...state.products],
    totalPrice: state.totalPrice,
    totalProducts: state.totalProducts,
    shippingPrice: state.shippingPrice,
  }

  stateUpdated.products = state.products.filter(
    productWrapper => productWrapper.product.id != payload.product.id
  )

  if (stateUpdated.products.length == 0) {
    localStorage.removeItem('shopping-car')
  }

  stateUpdated.totalPrice = calculateTotal(stateUpdated)
  stateUpdated.totalProducts = calculateTotalProducts(stateUpdated)

  return stateUpdated
}

export const removeComplement = (
  state: ShoppingCar,
  payload: ComplementWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = {
    products: [...state.products],
    totalPrice: state.totalPrice,
    totalProducts: state.totalProducts,
    shippingPrice: state.shippingPrice,
  }

  const productWrapper = stateUpdated.products.find(
    product => product.product.id === payload.forProductId
  )

  const updatedComplementsProduct = productWrapper?.product.complements?.filter(
    complement => complement.id !== payload.complement.id
  )

  if (productWrapper)
    productWrapper.product.complements = updatedComplementsProduct

  stateUpdated.totalPrice = calculateTotal(stateUpdated)
  stateUpdated.totalProducts = calculateTotalProducts(stateUpdated)
  return stateUpdated
}

export const updateQuantityProduct = (
  state: ShoppingCar,
  payload: ProductWrapper
): ShoppingCar => {
  const stateUpdated: ShoppingCar = {
    products: [...state.products],
    totalPrice: state.totalPrice,
    totalProducts: state.totalProducts,
    shippingPrice: state.shippingPrice,
  }

  if (payload.quantity <= 0) {
    return removeProduct(stateUpdated, payload)
  }

  const productWrapper = stateUpdated.products.find(
    balloon => balloon.product.id == payload.product.id
  )

  if (productWrapper) {
    productWrapper.quantity = payload.quantity
    productWrapper.total =
      productWrapper.quantity * productWrapper.product.price
  }

  stateUpdated.totalPrice = calculateTotal(state)
  stateUpdated.totalProducts = calculateTotalProducts(stateUpdated)
  return stateUpdated
}

export const setShoppingCar = (state: ShoppingCar, payload: ShoppingCar) => {
  return payload
}

export const setShippingPrice = (state: ShoppingCar, payload: number) => {
  const stateUpdated: ShoppingCar = {
    products: [...state.products],
    totalPrice: state.totalPrice,
    totalProducts: state.totalProducts,
    shippingPrice: payload,
  }

  return stateUpdated
}

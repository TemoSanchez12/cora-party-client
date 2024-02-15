import { ProductWrapper } from '@/interfaces/ShoppingCar'
import { ShoppingCar } from '@/interfaces/ShoppingCar'

type productTypes = {
  balloon: string
  flower: string
  [key: string]: string
}

const productType: productTypes = {
  balloon: 'balloon',
  flower: 'flower',
}

export const addProduct = (
  state: ShoppingCar,
  payload: ProductWrapper
): ShoppingCar => {
  return {} as ShoppingCar
}

export const addComplement = (state: ShoppingCar, payload: any): ShoppingCar =>
  ({} as ShoppingCar)

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

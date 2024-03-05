'use client'

import React, { useReducer } from 'react'

// Import interfaces
import { ShoppingCar } from '../../interfaces/shopping/ShoppingCar'

// Import action functions
import {
  addComplement,
  addProduct,
  removeProduct,
  removeComplement,
  updateQuantityProduct,
  setShoppingCar,
} from './shoppingCarFunctions'

// Shopping car actions
export enum ShoppingCarAction {
  ADD_PRODUCT = 'ADD_PRODUCT',
  ADD_COMPLEMENT = 'ADD_COMPLEMENT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
  REMOVE_COMPLEMENT = 'REMOVE_COMPLEMENT',
  UPDATE_QUANTITY_PRODUCT = 'UPDATE_QUANTITY_PRODUCT',
  SET_SHOPPING_CAR = 'SET_SHOPPING_CAR',
}

// Shopping car functions dictionary
const shoppingCarFunctions: Record<
  ShoppingCarAction,
  (state: ShoppingCar, payload: any) => ShoppingCar
> = {
  [ShoppingCarAction.ADD_PRODUCT]: addProduct,
  [ShoppingCarAction.ADD_COMPLEMENT]: addComplement,
  [ShoppingCarAction.REMOVE_PRODUCT]: removeProduct,
  [ShoppingCarAction.REMOVE_COMPLEMENT]: removeComplement,
  [ShoppingCarAction.UPDATE_QUANTITY_PRODUCT]: updateQuantityProduct,
  [ShoppingCarAction.SET_SHOPPING_CAR]: setShoppingCar,
}

// Function reducer
const shoppingCarReducer = (
  state: ShoppingCar,
  action: { type: ShoppingCarAction; payload?: any }
): ShoppingCar => shoppingCarFunctions[action.type](state, action.payload)

// Create shopping car context
const ShoppingCarContext = React.createContext({
  shoppingCarState: {} as ShoppingCar,
  dispatchShoppingCarAction: {} as React.Dispatch<{
    type: ShoppingCarAction
    payload?: any
  }>,
})

// Create shopping car provider
export const ShoppingCarContextProvider = ({ children }: any) => {
  const [shoppingCarStateReducer, dispatchShoppingCarActionReducer] =
    useReducer(shoppingCarReducer, {
      products: [],
      totalPrice: 0,
      totalProducts: 0,
    })

  return (
    <ShoppingCarContext.Provider
      value={{
        shoppingCarState: shoppingCarStateReducer,
        dispatchShoppingCarAction: dispatchShoppingCarActionReducer,
      }}
    >
      {children}
    </ShoppingCarContext.Provider>
  )
}

export default ShoppingCarContext

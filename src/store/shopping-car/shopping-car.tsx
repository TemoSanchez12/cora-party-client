'use client'

import React, { useReducer } from 'react'

// Import interfaces
import { ShoppingCar } from '../../interfaces/ShoppingCar'

// Import action functions
import {
  addComplement,
  addProduct,
  removeProduct,
  removeComplement,
  updateQuantityProduct,
} from './shoppingCarFunctions'

// Shopping car actions
export enum ShoppingCarAction {
  ADD_PRODUCT = 'ADD_PRODUCT',
  ADD_COMPLEMENT = 'ADD_COMPLEMENT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
  REMOVE_COMPLEMENT = 'REMOVE_COMPLEMENT',
  UPDATE_QUANTITY_PRODUCT = 'UPDATE_QUANTITY_PRODUCT',
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
  const [shoppingCarState, dispatchShoppingCarAction] = useReducer(
    shoppingCarReducer,
    {
      balloons: [],
      flowers: [],
      totalPrice: 0,
    }
  )

  const shoppingCarProviderValue = {
    shoppingCarState,
    dispatchShoppingCarAction,
  }

  return (
    <ShoppingCarContext.Provider value={shoppingCarProviderValue}>
      {children}
    </ShoppingCarContext.Provider>
  )
}

export default ShoppingCarContext

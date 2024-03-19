'use client'

import React, { useReducer } from 'react'

// import interfaces
import OrderSpecs from '@/interfaces/orderSpecs/OrderSpecs'

// import action functions
import {
  addProductSpecs,
  updateProductSpecs,
  removeProductSpecs,
  setOrderSpecs,
} from './orderSpecsFunctions'

// order specs actions

export enum OrderSpecsAction {
  ADD_PRODUCT_SPECS = 'ADD_PRODUCT_SPEC',
  UPDATE_PRODUCT_SPECS = 'CHANGE_PRODUCT_SPEC',
  REMOVE_PRODUCT_SPECS = 'REMOVE_PRODUCT_SPEC',
  SET_ORDER_SPECS = 'SET_ORDER_SPECS',
}

const orderSpecsFunctions: Record<
  OrderSpecsAction,
  (state: OrderSpecs, payload: any) => OrderSpecs
> = {
  [OrderSpecsAction.ADD_PRODUCT_SPECS]: addProductSpecs,
  [OrderSpecsAction.UPDATE_PRODUCT_SPECS]: updateProductSpecs,
  [OrderSpecsAction.REMOVE_PRODUCT_SPECS]: removeProductSpecs,
  [OrderSpecsAction.SET_ORDER_SPECS]: setOrderSpecs,
}

// order specs reducer
const orderSpecsReducer = (
  state: OrderSpecs,
  action: { type: OrderSpecsAction; payload?: any }
): OrderSpecs => orderSpecsFunctions[action.type](state, action.payload)

// Create order specs reducer
const OrderSpecsContext = React.createContext({
  orderSpecsState: {} as OrderSpecs,
  dispatchOrderSpecsAction: {} as React.Dispatch<{
    type: OrderSpecsAction
    payload?: any
  }>,
})

// Create order specs provider
export const OrderSpecsContextProvider = ({ children }: any) => {
  const [orderSpecsStateReducer, dispatchOrderSpecsActionReducer] = useReducer(
    orderSpecsReducer,
    {
      productSpecs: [],
    }
  )

  return (
    <OrderSpecsContext.Provider
      value={{
        orderSpecsState: orderSpecsStateReducer,
        dispatchOrderSpecsAction: dispatchOrderSpecsActionReducer,
      }}
    >
      {children}
    </OrderSpecsContext.Provider>
  )
}

export default OrderSpecsContext

// import React, { useReducer } from 'react'

// // Import interfaces
// import { ShoppingCar } from '../../interfaces/ShoppingCar'

// // Import action functions
// import {
//   addComplement,
//   addProduct,
//   removeProduct,
//   removeComplement,
//   updateQuantityProduct,
// } from './shoppingCarFunctions'

// // Shopping car actions
// export enum ShoppingCarAction {
//   ADD_PRODUCT = 'ADD_PRODUCT',
//   ADD_COMPLEMENT = 'ADD_COMPLEMENT',
//   REMOVE_PRODUCT = 'REMOVE_PRODUCT',
//   REMOVE_COMPLEMENT = 'REMOVE_COMPLEMENT',
//   UPDATE_QUANTITY_PRODUCT = 'UPDATE_QUANTITY_PRODUCT',
// }

// // Shopping car functions dictionary
// const shoppingCarFunctions: Record<
//   ShoppingCarAction,
//   (state: ShoppingCar, payload: any) => ShoppingCar
// > = {
//   ADD_PRODUCT: addProduct,
//   ADD_COMPLEMENT: addComplement,
//   REMOVE_COMPLEMENT: removeProduct,
//   REMOVE_PRODUCT: removeComplement,
//   UPDATE_QUANTITY_PRODUCT: updateQuantityProduct,
// }

// // Function reducer
// const shoppingCarReducer = (
//   state: ShoppingCar,
//   action: { type: ShoppingCarAction; payload?: any }
// ): ShoppingCar => shoppingCarFunctions[action.type](state, action.payload)

// // Create shopping car context
// const ShoppingCarContext = React.createContext({
//   shoppingCarState: {} as ShoppingCar,
//   dispatchShoppingCarAction: {} as React.Dispatch<{
//     type: ShoppingCarAction
//     payload?: any
//   }>,
// })

// export default ShoppingCarContext

// // Create shopping car provider
// export const ShoppingCarContextProvider = ({ children }: any) => {
//   const [shoppingCarState, dispatchShoppingCarAction] = useReducer(
//     shoppingCarReducer,
//     {
//       balloons: [],
//       flowers: [],
//       totalPrice: 0,
//     }
//   )

//   const shoppingCarProviderValue = {
//     shoppingCarState,
//     dispatchShoppingCarAction,
//   }

//   return (
//     <ShoppingCarContext.Provider value={shoppingCarProviderValue}>
//       {children}
//     </ShoppingCarContext.Provider>
//   )
// }

import React, { useReducer, createContext, Dispatch } from 'react'
import { ShoppingCar } from '../../interfaces/ShoppingCar'
import {
  addComplement,
  addProduct,
  removeProduct,
  removeComplement,
  updateQuantityProduct,
} from './shoppingCarFunctions'

export enum ShoppingCarAction {
  ADD_PRODUCT = 'ADD_PRODUCT',
  ADD_COMPLEMENT = 'ADD_COMPLEMENT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
  REMOVE_COMPLEMENT = 'REMOVE_COMPLEMENT',
  UPDATE_QUANTITY_PRODUCT = 'UPDATE_QUANTITY_PRODUCT',
}

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

const shoppingCarReducer = (
  state: ShoppingCar,
  action: { type: ShoppingCarAction; payload?: any }
): ShoppingCar => shoppingCarFunctions[action.type](state, action.payload)

const ShoppingCarContext = createContext<{
  shoppingCarState: ShoppingCar
  dispatchShoppingCarAction: Dispatch<{
    type: ShoppingCarAction
    payload?: any
  }>
}>({
  shoppingCarState: {
    balloons: [],
    flowers: [],
    totalPrice: 0,
  },
  dispatchShoppingCarAction: () => {},
})

export default ShoppingCarContext

export const ShoppingCarContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [shoppingCarState, dispatchShoppingCarAction] = useReducer(
    shoppingCarReducer,
    {
      balloons: [],
      flowers: [],
      totalPrice: 0,
    } as ShoppingCar // Asigna el tipo ShoppingCar al estado inicial
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

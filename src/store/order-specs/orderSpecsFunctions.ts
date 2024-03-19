import OrderSpecs, { ProductSpecs } from '@/interfaces/orderSpecs/OrderSpecs'

const checkProductSpecsAdded = (
  state: OrderSpecs,
  productSpecs: ProductSpecs
) => {
  const productSpecsAdded = state.productSpecs.find(
    prodSpec => prodSpec.id == productSpecs.id
  )

  return !!productSpecsAdded
}

export const addProductSpecs = (state: OrderSpecs, payload: ProductSpecs) => {
  const stateUpdated = { productSpecs: [...state.productSpecs] }

  if (checkProductSpecsAdded(stateUpdated, payload)) {
    return stateUpdated
  }

  stateUpdated.productSpecs.push(payload)

  return stateUpdated
}

export const updateProductSpecs = (
  state: OrderSpecs,
  payload: ProductSpecs
) => {
  return state
}

export const removeProductSpecs = (
  state: OrderSpecs,
  payload: ProductSpecs
) => {
  const stateUpdated = { productSpecs: [...state.productSpecs] }

  const productUpdated = state.productSpecs.filter(
    specs => specs.id !== payload.id
  )

  stateUpdated.productSpecs = productUpdated

  return stateUpdated
}

export const setOrderSpecs = (state: OrderSpecs, payload: OrderSpecs) => payload

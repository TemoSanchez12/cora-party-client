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
  const stateUpdated = { productSpecs: [...state.productSpecs] }

  const productSpecsToAdd = stateUpdated.productSpecs.find(
    prodSpec => prodSpec.id == payload.id
  )

  if (!productSpecsToAdd) return stateUpdated

  const specToModify = productSpecsToAdd.specs.find(
    spec => spec.name == payload.specs[0].name
  )

  if (specToModify) {
    specToModify.value = payload.specs[0].value
  } else {
    productSpecsToAdd.specs.push(payload.specs[0])
  }

  return stateUpdated
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

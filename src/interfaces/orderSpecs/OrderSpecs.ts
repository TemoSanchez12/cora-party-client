interface OrderSpecs {
  productSpecs: ProductSpecs[]
}

export interface ProductSpecs {
  id: string
  name: string
  specs: { string: string }[]
}

export default OrderSpecs

interface OrderSpecs {
  productSpecs: ProductSpecs[]
}

export interface ProductSpecs {
  id: string
  name: string
  specs: { name: string; value: string }[]
}

export default OrderSpecs

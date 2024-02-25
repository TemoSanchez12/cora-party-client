interface ShippingAddress {
  street: string
  interiorNumber: string
  exteriorNumber?: string
  avenue: string
  postalCode: string
  city: string
  references?: string
}

export default ShippingAddress

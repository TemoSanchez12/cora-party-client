'use client'

import { useState } from 'react'

import ShippingAddress from '@/interfaces/shipping/ShippingAddress'

import ShippingAddressForm from './ShippingAddressForm'
import GeneralInfoForm from './GeneralInfoForm'

const FormsContainer = () => {
  const [shippingAddress, setShippingAddress] = useState<
    ShippingAddress | null | undefined
  >()

  return (
    <div className='p-10'>
      <ShippingAddressForm
        setShippingAddress={setShippingAddress}
        shippingAddress={shippingAddress}
      />
      <GeneralInfoForm shippingAddress={shippingAddress} />
    </div>
  )
}

export default FormsContainer

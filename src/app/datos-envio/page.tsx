import MainLayout from '@/layouts/MainLayout'

import ShippingAddressForm from '@/components/Shipping/ShippingAddressForm'

const PaymentMethodPage = () => {
  return (
    <MainLayout>
      <div>
        <div>
          <ShippingAddressForm />
        </div>
      </div>
    </MainLayout>
  )
}

export default PaymentMethodPage

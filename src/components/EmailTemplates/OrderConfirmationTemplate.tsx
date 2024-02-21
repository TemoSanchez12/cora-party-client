import GeneralInfo from '@/interfaces/shipping/GeneralInfo'
import ShippingAddress from '@/interfaces/shipping/ShippingAddress'
import { ShoppingCar } from '@/interfaces/shopping/ShoppingCar'

interface OrderConfirmationTemplateProps {
  shoppingCar: ShoppingCar
  generalInfo: GeneralInfo
  shippingAddress: ShippingAddress
}

const OrderConfirmationTemplate = ({
  shoppingCar,
  generalInfo,
  shippingAddress,
}: OrderConfirmationTemplateProps) => {
  return (
    <div>
      <p>
        Este es un mensaje de confirmacion para la orden de{' '}
        {generalInfo.recipientName}
      </p>
    </div>
  )
}

export default OrderConfirmationTemplate

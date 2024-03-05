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
      <p
        style={{
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: '#ccc',
        }}
      >
        Este es un mensaje de confirmacion para la orden de{' '}
        {generalInfo.recipientName}
        {shoppingCar.products.map(product => (
          <li key={product.product.id}>{product.product.name}</li>
        ))}
      </p>
    </div>
  )
}

export default OrderConfirmationTemplate

import ShippingAddress from '../shipping/ShippingAddress'
import GeneralInfo from '../shipping/GeneralInfo'
import { ShoppingCar } from '../shopping/ShoppingCar'

interface OrderConfirmationRequest {
  clientEmail: string
  shoppingCar: ShoppingCar
  generalInfo: GeneralInfo
  shippingAddress: ShippingAddress
}

export default OrderConfirmationRequest

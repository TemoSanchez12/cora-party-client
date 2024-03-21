import ShippingAddress from '../shipping/ShippingAddress'
import GeneralInfo from '../shipping/GeneralInfo'
import { ShoppingCar } from '../shopping/ShoppingCar'
import OrderSpecs from '../orderSpecs/OrderSpecs'

interface OrderNoticeRequest {
  clientEmail: string
  shoppingCar: ShoppingCar
  generalInfo: GeneralInfo
  shippingAddress: ShippingAddress
  orderSpecs: OrderSpecs
}

export default OrderNoticeRequest

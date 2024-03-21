import OrderConfirmationTemplate from '@/components/EmailTemplates/OrderConfirmationTemplate'
import OrderNoticeRequest from '@/interfaces/mailing/OrderNoticeRequest'

const noticeOrderSellerBuilder = (request: OrderNoticeRequest): any => {
  return {
    receivers: [request.clientEmail],
    subject: 'Confirmacion de pedido CoraParty',
    react: OrderConfirmationTemplate({
      shoppingCar: request.shoppingCar,
      generalInfo: request.generalInfo,
      shippingAddress: request.shippingAddress,
      orderSpecs: request.orderSpecs,
      senderEmail: request.clientEmail,
    }),
  }
}

export default noticeOrderSellerBuilder

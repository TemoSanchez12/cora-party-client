import OrderConfirmationSellerTemplate from '@/components/EmailTemplates/OrderConfirmationSellerTemplate'
import OrderConfirmationCustomerTemplate from '@/components/EmailTemplates/OrderConfirmationCustomerTemplate'
import OrderNoticeRequest from '@/interfaces/mailing/OrderNoticeRequest'

export const noticeOrderSellerBuilder = (request: OrderNoticeRequest): any => {
  return {
    receivers: process.env.SELLER_EMAIL,
    subject: 'Confirmacion de pedido CoraParty',
    react: OrderConfirmationSellerTemplate({

      shoppingCar: request.shoppingCar,
      generalInfo: request.generalInfo,
      shippingAddress: request.shippingAddress,
      orderSpecs: request.orderSpecs,
      senderEmail: request.clientEmail,
    }),
  }
}

export const noticeOrderCustomerBuilder = (
  request: OrderNoticeRequest
): any => {
  return {
    receivers: [request.clientEmail],
    subject: 'Confirmacion de pedido CoraParty',
    react: OrderConfirmationCustomerTemplate({
      shoppingCar: request.shoppingCar,
      generalInfo: request.generalInfo,
      shippingAddress: request.shippingAddress,
      orderSpecs: request.orderSpecs,
      senderEmail: request.clientEmail,
    }),
  }
}

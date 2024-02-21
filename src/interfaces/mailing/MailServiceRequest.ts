import OrderConfirmationRequest from './OrderConfirmationRequest'
import OrderNoticeRequest from './OrderNoticeRequest'
import MailTypes from './MailTypes'

interface MailServieRequest {
  type: MailTypes
  payload: OrderConfirmationRequest | OrderNoticeRequest
}

export default MailServieRequest

import OrderConfirmationRequest from './OrderConfirmationRequest'
import OrderNoticeRequest from './OrderNoticeRequest'
import MailTypes from './MailTypes'
import OrderConfirmationTemplate from '@/components/EmailTemplates/OrderConfirmationTemplate'

interface MailServieRequest {
  type: MailTypes
  payload: OrderNoticeRequest | OrderConfirmationRequest
}

export default MailServieRequest

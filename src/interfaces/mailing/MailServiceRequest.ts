import OrderNoticeRequest from './OrderNoticeRequest'
import MailTypes from './MailTypes'
import EmailTypes from './MailTypes'
import ContactEmailRequest from './ContactEmailRequest'

interface MailServieRequest {
  type: MailTypes
  payload: OrderNoticeRequest | ContactEmailRequest
}

export default MailServieRequest

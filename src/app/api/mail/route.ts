import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import MailServiceRequest from '@/interfaces/mailing/MailServiceRequest'
import MailTypes from '@/interfaces/mailing/MailTypes'
import {
  noticeOrderSellerBuilder,
  noticeOrderCustomerBuilder,
} from '@/utils/emailBuilders/noticeOrderSellerBuilder'
import ContactEmailTemplate from '@/components/EmailTemplates/ContactEmailTemplate'

import ContactEmailRequest from '@/interfaces/mailing/ContactEmailRequest'
import OrderNoticeRequest from '@/interfaces/mailing/OrderNoticeRequest'

type MailServiceResponse = {
  success: boolean
  message: string
}
const resend = new Resend(process.env.RESEND_KEY)

export const POST = async (req: NextRequest) => {
  try {
    const clonedRequest = req.clone()

    const mailRequest: MailServiceRequest = JSON.parse(
      await clonedRequest.text()
    )

    console.log(mailRequest)

    if (mailRequest.type == MailTypes.contactMail) {
      const payloadInfo: ContactEmailRequest =
        mailRequest.payload as ContactEmailRequest

      console.log(payloadInfo)

      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_NOTIFICATION_SENDER || '',
        to: process.env.APPALACH_MAIL || 'batemo4912@gmail.com',
        subject: `${payloadInfo.name} quiere contactar con Cora Party`,
        react: ContactEmailTemplate({ contactInfo: payloadInfo }),
      })

      if (error) {
        throw new Error(`Failed to send contact email: ${error}`)
      }
    }

    if (mailRequest.type == MailTypes.noticeOrder) {
      const payloadInfo: OrderNoticeRequest =
        mailRequest.payload as OrderNoticeRequest
      const emailSellerOptions = noticeOrderSellerBuilder(payloadInfo)
      const emailCustomerOptions = noticeOrderCustomerBuilder(payloadInfo)

      const { data: dataSeller, error: errorSeller } = await resend.emails.send(
        {
          from: process.env.EMAIL_NOTIFICATION_SENDER || '',
          to: emailSellerOptions.receivers,
          subject: emailSellerOptions.subject,
          react: emailSellerOptions.react,
        }
      )

      const { data: dataCustomer, error: errorCustomer } =
        await resend.emails.send({
          from: process.env.EMAIL_NOTIFICATION_SENDER || '',
          to: emailCustomerOptions.receivers,
          subject: emailCustomerOptions.subject,
          react: emailCustomerOptions.react,
        })
    }

    return NextResponse.json<MailServiceResponse>({
      success: true,
      message: '',
    })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json<MailServiceResponse>({
      success: false,
      message: 'Something went wrong while sending mail. ' + err.message,
    })
  }
}

export const dynamic = 'force-dynamic'

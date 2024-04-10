import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import MailServiceRequest from '@/interfaces/mailing/MailServiceRequest'
import MailTypes from '@/interfaces/mailing/MailTypes'
import {
  noticeOrderSellerBuilder,
  noticeOrderCustomerBuilder,
} from '@/utils/emailBuilders/noticeOrderSellerBuilder'

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

    if (mailRequest.type == MailTypes.noticeOrder) {
      const emailSellerOptions = noticeOrderSellerBuilder(mailRequest.payload)
      const emailCustomerOptions = noticeOrderCustomerBuilder(
        mailRequest.payload
      )

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

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import MailServieRequest from '@/interfaces/mailing/MailServiceRequest'
import MailTypes from '@/interfaces/mailing/MailTypes'
import noticeOrderBuilder from '@/utils/emailBuilders/noticeOrderBuilder'

type MailServiceResponse = {
  success: boolean
  message: string
}
const resend = new Resend(process.env.RESEND_KEY)

export const POST = async (req: NextRequest) => {
  try {
    const mailRequest: MailServieRequest = JSON.parse(await req.json())

    if (mailRequest.type == MailTypes.noticeOrder) {
      const emailOptions = noticeOrderBuilder(mailRequest.payload)

      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_NOTIFICATION_SENDER,
        to: emailOptions.receivers,
        subject: emailOptions.subject,
        react: emailOptions.react,
      })

      console.log('aqui la data ' + data)
      console.log('aqui el error ' + error)
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

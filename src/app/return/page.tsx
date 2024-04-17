'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import MailTypes from '@/interfaces/mailing/MailTypes'
import MailServieRequest from '@/interfaces/mailing/MailServiceRequest'
import { ShoppingCar } from '@/interfaces/shopping/ShoppingCar'
import MainLayout from '@/layouts/MainLayout'

import { Montserrat } from 'next/font/google'
import ShippingAddress from '@/interfaces/shipping/ShippingAddress'
import GeneralInfo from '@/interfaces/shipping/GeneralInfo'
import OrderSpecs from '@/interfaces/orderSpecs/OrderSpecs'
import ItemsList from '@/components/Shopping/ItemsList'

const montserrat = Montserrat({
  weight: ['400', '600', '800'],
  subsets: ['latin'],
})

export default function Return() {
  const router = useRouter()
  const [shoppingCar, setShoppingCar] = useState<ShoppingCar>()
  const [status, setStatus] = useState(null)
  const [customerEmail, setCustomerEmail] = useState('')

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sessionId = urlParams.get('session_id')

    if (!sessionId) router.push('/')

    const fetchSessionId = async () => {
      try {
        const response: any = await fetch(
          `/api/checkout?session_id=${sessionId}`
        ).then(res => (res.ok ? res.json() : Promise.reject()))

        if (response.statusCode == 404) router.push('/')

        setStatus(response.status)
        setCustomerEmail(response.customer_email)
      } catch (err) {
        router.replace('/')
      }
    }
    fetchSessionId()
  }, [router])

  const handleSendConfirmationMails = useCallback(
    async (mailRequest: MailServieRequest) => {
      try {
        const response = await fetch('/api/mail', {
          method: 'POST',
          body: JSON.stringify(mailRequest),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (err) {
        router.replace('/')
      }
    },
    [router]
  )

  useEffect(() => {
    const shoppingCar: ShoppingCar = JSON.parse(
      localStorage.getItem('shopping-car') || '{}'
    )

    const shippingAddress: ShippingAddress = JSON.parse(
      localStorage.getItem('shipping-address') || '{}'
    )

    const generalInfo: GeneralInfo = JSON.parse(
      localStorage.getItem('general-info') || '{}'
    )

    const orderSpecs: OrderSpecs = JSON.parse(
      localStorage.getItem('order-specs') || '{}'
    )

    try {
      const mailRequest: MailServieRequest = {
        type: MailTypes.noticeOrder,
        payload: {
          shoppingCar,
          clientEmail: customerEmail,
          generalInfo,
          orderSpecs,
          shippingAddress,
        },
      }

      setShoppingCar(shoppingCar)
      handleSendConfirmationMails(mailRequest)
    } catch (err) {
      console.log(err)
    }

    localStorage.clear()
  }, [status, customerEmail, handleSendConfirmationMails])

  if (status === 'open') {
    return router.replace('/')
  }

  if (status === 'complete') {
    return (
      <MainLayout>
        <section
          id='success'
          className={`${montserrat.className} w-full max-w-xl mx-auto my-28`}
        >
          <div className='text-center'>
            <h1 className='text-2xl mb-10 text-slate-600 font-bold'>
              ¡Gracias por tu compra!
            </h1>
            <p className='text-slate-500'>
              Apreciamos tu decisión de comprar con nosotros. Se ha enviado un
              correo electrónico de confirmación a la dirección {customerEmail}.
            </p>
            <p className='mt-4 text-slate-500'>
              Si tienes alguna pregunta sobre tu pedido, no dudes en{' '}
              <a href='mailto:soporte@tudominio.com'>contactarnos</a>.
            </p>
          </div>
          <div className='mt-10'>
            <p className='mb-4 text-xl text-slate-500 text-center'>
              Detalles de compra
            </p>
            {shoppingCar && shoppingCar.products && (
              <ItemsList shoppingCar={shoppingCar} />
            )}
          </div>

          <Link
            href='/'
            className='mx-auto mt-5 block bg-slate-600 text-center text-xl text-white py-2 rounded-md'
          >
            Seguir comprando
          </Link>
        </section>
      </MainLayout>
    )
  }

  return null
}

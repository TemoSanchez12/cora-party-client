'use client'

import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import MailTypes from '@/interfaces/mailing/MailTypes'
import MailServieRequest from '@/interfaces/mailing/MailServiceRequest'
import { ShoppingCar } from '@/interfaces/shopping/ShoppingCar'

export default function Return() {
  const [status, setStatus] = useState(null)
  const [customerEmail, setCustomerEmail] = useState('')

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sessionId = urlParams.get('session_id')

    fetch(`/api/checkout?session_id=${sessionId}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setStatus(data.status)
        setCustomerEmail(data.customer_email)
      })
  }, [])

  const handleSendConfirmationMails = async (
    mailRequest: MailServieRequest
  ) => {
    const response = await fetch('http://localhost:3000/api/mail', {
      method: 'POST',
      body: JSON.stringify(mailRequest),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  useEffect(() => {
    const shoppingCar: ShoppingCar = JSON.parse(
      localStorage.getItem('shoppingCar') || ''
    )

    const mailRequest: MailServieRequest = {
      type: MailTypes.noticeOrder,
      payload: {
        shoppingCar: shoppingCar,
        clientEmail: 'temosanchez4912@gmail.com',
        generalInfo: {
          deliveryTime: '4 de la manana',
          receiverPhone: '4921443840',
          recipientName: 'Anaydeli Moreno Rosales',
          senderPhone: '4921443840',
        },
        shippingAddress: {
          avenue: 'Villas del Monasterio',
          city: 'Guadalupe',
          interiorNumber: '135',
          exteriorNumber: undefined,
          postalCode: '98613',
          references: '',
          street: 'Villas del Monasterio',
        },
      },
    }

    handleSendConfirmationMails(mailRequest)
  }, [status])

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section id='success'>
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}. If you have any questions, please email{' '}
          <a href='mailto:orders@example.com'>orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null
}

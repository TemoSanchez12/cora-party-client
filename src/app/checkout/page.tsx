'use client'

import React, { useEffect, useState } from 'react'
import MainLayout from '@/layouts/MainLayout'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import Skeleton from 'react-loading-skeleton'

const stripePromise = loadStripe(
  process.env.STRIPE_PUBLISHABLE_KEY ??
    'pk_test_51HUBEBF1eVbDbUowaN1i8OITjiy9uSjTn63ug1DzWzJZ2JurygTfCvPq3byySvsaliZJgg6hALlWLWYShzzGuM950003Nj1kme'
)

export default function App() {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    const shoppingCar = localStorage.getItem('shopping-car')

    fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shoppingCar),
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret)
      })
  }, [])

  return (
    <MainLayout>
      <div id='checkout' className='my-28'>
        {clientSecret ? (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        ) : (
          <div className='my-28 md:flex max-w-[880px] gap-8 mx-auto'>
            <div className='md:w-1/2'>
              <Skeleton height={700} />
            </div>
            <div className='md:w-1/2'>
              <Skeleton height={700} />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe(
  process.env.STRIPE_PUBLISHABLE_KEY ??
    'pk_test_51HUBEBF1eVbDbUowaN1i8OITjiy9uSjTn63ug1DzWzJZ2JurygTfCvPq3byySvsaliZJgg6hALlWLWYShzzGuM950003Nj1kme'
)

export default function App() {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    fetch('/api/checkout', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret)
      })
  }, [])

  return (
    <div id='checkout'>
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}

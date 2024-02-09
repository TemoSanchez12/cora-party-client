import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'

export const POST = async (req: NextRequest) => {
  try {
    // Create Checkout Sessions from body params.
    const stripe = new Stripe(process.env.STRIPE_KEY ?? '')
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price_data: {
            currency: 'MXN',
            unit_amount: 2000,
            product_data: {
              name: 'Globo de prueba 1',
              description: 'Esto es una prueba',
              images: ['https://placehold.co/600x400'],
            },
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'MXN',
            unit_amount: 3000,
            product_data: {
              name: 'Globo de prueba 2',
              description: 'Esto es una prueba',
              images: ['https://placehold.co/600x400'],
            },
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'MXN',
            unit_amount: 3000,
            product_data: {
              name: 'Globo de prueba 3',
              description: 'Esto es una prueba',
              images: ['https://placehold.co/600x400'],
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${process.env.BASE_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.json({ clientSecret: session.client_secret })
    // res.send({clientSecret: session.client_secret});
  } catch (err: any) {
    return NextResponse.json({ error: err.message })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY ?? '')

    const urlRequest = new URL(req.url)
    const session_id = urlRequest.searchParams.get('session_id')

    const session = await stripe.checkout.sessions.retrieve(session_id ?? '')

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email,
    })
  } catch (err: any) {
    return NextResponse.json(err.message)
  }
}

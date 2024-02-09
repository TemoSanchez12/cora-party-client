import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'

export const POST = async (req: NextRequest) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY ?? '')
    const data = await req.json()

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      currency: 'MXN',
      line_items: [
        {
          price_data: {
            currency: 'MXN',
            unit_amount: 2000,
            product_data: {
              name: 'Globo de prueba',
              description: 'Esto es una prueba',
              images: ['https://placehold.co/600x400'],
            },
          },
          quantity: 1,
        },
      ],
      success_url: process.env.BASE_URL + '/resumen-de-compra',
    })

    console.log(session)

    return NextResponse.json(data)
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ message: 'Something went wrong' })
  }
}

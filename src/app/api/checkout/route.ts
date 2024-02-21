import { ShoppingCar } from '@/interfaces/ShoppingCar'
import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'
import Product from '@/interfaces/Product'

const mapProductForStripe = (product: Product, quantity) => ({
  price_data: {
    currency: 'MXN',
    unit_amount: product.price * 100,
    product_data: {
      name: product.name,
      description: product.description,
      images: product.images.map(
        image => `${process.env.STRAPI_URL}${image.formats.thumbnail.url}`
      ),
    },
  },
  quantity,
})

export const POST = async (req: NextRequest) => {
  try {
    const shoppingCar: ShoppingCar = JSON.parse(await req.json()) as ShoppingCar
    const line_items = []

    shoppingCar.balloons.map(balloon => {
      line_items.push(mapProductForStripe(balloon.product, balloon.quantity))

      balloon.product.complements.map(complement => {
        line_items.push(mapProductForStripe(complement, 1))
      })
    })

    // Create Checkout Sessions from body params.
    const stripe = new Stripe(process.env.STRIPE_KEY ?? '')
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items,
      mode: 'payment',
      return_url: `${process.env.BASE_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.json({ clientSecret: session.client_secret })
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

import { ShoppingCar } from '@/interfaces/shopping/ShoppingCar'
import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'
import Product from '@/interfaces/domain/Product'
import ComplementProduct from '@/interfaces/domain/ComplementProduct'
import { getProductById } from '@/retrivers/products'
import { getComplementById } from '@/retrivers/complements'

const mapProductForStripe = (
  product: Product | ComplementProduct,
  quantity: number
) => ({
  price_data: {
    currency: 'MXN',
    unit_amount: product.price * 100,
    product_data: {
      name: product.name,
      description: product.description,
      images: product.images.map(image => image.url),
    },
  },
  quantity,
})

export const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  try {
    const clonedRequest = req.clone()
    const shoppingCar: ShoppingCar = JSON.parse(
      await clonedRequest.json()
    ) as ShoppingCar

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    for (const productWrapper of shoppingCar.products) {
      const serverProduct = await getProductById(productWrapper.product.id)

      line_items.push(
        mapProductForStripe(serverProduct, productWrapper.quantity)
      )

      if (productWrapper.product.complements) {
        for (const complement of productWrapper.product.complements) {
          const complementServer = await getComplementById(complement.id)
          line_items.push(mapProductForStripe(complementServer, 1))
        }
      }
    }

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
    console.log(err)
    return NextResponse.json({ error: err.message })
  }
}

export const GET = async (req: NextRequest) => {
  const urlRequest = new URL(req.url)
  const searchParams = req.nextUrl.searchParams
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY ?? '')
    const session_id = urlRequest.searchParams.get('session_id')

    const session = await stripe.checkout.sessions.retrieve(session_id ?? '')

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email,
    })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json(err)
  }
}

export const dynamic = 'force-dynamic'

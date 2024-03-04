// import dependencies
import { NextResponse } from 'next/server'

// import grahql client
import client from '@/apollo-client'

// import queries
import { getShippingPriceQuery } from '@/queries/shippingPrice'

// import mapper

interface ShippingPriceResponse {
  success: boolean
  data?: number
  message: string
}

const handleGetShippingPrice = async () => {
  const { data } = await client.query({
    query: getShippingPriceQuery(),
  })

  return data.costoEnvio.data.attributes.Precio
}

export const GET = async () => {
  try {
    return NextResponse.json<ShippingPriceResponse>({
      success: true,
      data: await handleGetShippingPrice(),
      message: '',
    })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json<ShippingPriceResponse>({
      success: false,
      message: 'An error occurred while processing the request.' + err.message,
    })
  }
}

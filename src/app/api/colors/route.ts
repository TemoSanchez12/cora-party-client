// Import dependecies
import { NextResponse, NextRequest } from 'next/server'

// Import graphql client
import client from '@/apollo-client'

// Import mappers
import {
  mapColorsForProduct,
  mapResponseToProductColors,
} from '@/utils/mappers/products/colorsMapper'

// Import queries
import {
  getAllColorsQuery,
  getBalloonColorsQuery,
} from '@/queries/productQueries'

// Import interfaces
import ProductColor from '@/interfaces/domain/ProductColor'

interface BallonColorsResponse {
  success: boolean
  data: ProductColor[]
  message: string
}

const handleGetAllColors = async () => {
  const data = await client.query({
    query: getAllColorsQuery(),
  })
  return mapResponseToProductColors(data)
}

const handleGetColorsForBallon = async (id: string) => {
  const data = await client.query({
    query: getBalloonColorsQuery(parseInt(id)),
  })
  return mapColorsForProduct(data)
}

export const GET = async (req: NextRequest) => {
  const urlRequest = new URL(req.url)
  const searchParams = req.nextUrl.searchParams

  try {
    const productId = urlRequest.searchParams.get('productId')

    let response: ProductColor[]

    if (productId) {
      response = await handleGetColorsForBallon(productId)
    } else {
      response = await handleGetAllColors()
    }

    return NextResponse.json<BallonColorsResponse>({
      success: true,
      data: response,
      message: 'Request successful. Retrieved ballon colors successfully.',
    })
  } catch (err) {
    console.log(err)
    return NextResponse.json({
      success: false,
      message: 'An error occurred while processing the request.',
    })
  }
}

export const dynamic = 'force-dynamic'

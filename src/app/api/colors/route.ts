// Import dependecies
import { NextResponse, NextRequest } from 'next/server'

// Import graphql client
import client from '@/apollo-client'

// Import mappers
import {
  mapColorsForBallon,
  mapResponseToBallonColors,
} from '@/utils/mappers/balloons/colorsMapper'

// Import queries
import {
  getAllColorsQuery,
  getBalloonColorsQuery,
} from '@/queries/balloonQueries'

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
  return mapResponseToBallonColors(data)
}

const handleGetColorsForBallon = async (id: string) => {
  const data = await client.query({
    query: getBalloonColorsQuery(parseInt(id)),
  })
  return mapColorsForBallon(data)
}

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
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
    return NextResponse.json({
      success: false,
      message: 'An error occurred while processing the request.',
    })
  }
}

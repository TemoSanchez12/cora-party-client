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
import BallonColor from '@/interfaces/balloons/BalloonColor'

interface BallonColorsResponse {
  success: boolean
  data: BallonColor[]
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
    const ballonId = urlRequest.searchParams.get('ballonId')

    let response: BallonColor[]

    if (ballonId) {
      response = await handleGetColorsForBallon(ballonId)
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

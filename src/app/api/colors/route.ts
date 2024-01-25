import { NextResponse, NextRequest } from 'next/server'
import client from '@/apollo-client'

import {
  mapColorsForBallon,
  mapResponseToBallonColors,
} from '@/utils/mappers/balloons/colorsMapper'

import {
  getAllColorsQuery,
  getColorsForBallonQuery,
} from '@/constants/queries/ballonQueries'

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
    query: getColorsForBallonQuery(parseInt(id)),
  })
  return mapColorsForBallon(data)
}

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
    const ballonId = urlRequest.searchParams.get('ballonId')

    let response: BallonColor[]

    if (!ballonId) {
      response = await handleGetAllColors()
    } else {
      response = await handleGetColorsForBallon(ballonId)
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

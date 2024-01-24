import { NextResponse, NextRequest } from 'next/server'
import client from '@/apollo-client'
import {
  mapColorsForBallon,
  mapResponseToBallonColors,
} from '@/utils/mappers/balllons/colorsMapper'

import {
  getAllColorsQuery,
  getColorsForBallonQuery,
} from '@/constants/queries/ballonQueries'

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
    const id = urlRequest.searchParams.get('ballonId')

    let data
    let response

    if (!id) {
      data = await client.query({
        query: getAllColorsQuery(),
      })
      response = mapResponseToBallonColors(data)
    } else {
      data = await client.query({
        query: getColorsForBallonQuery(parseInt(id)),
      })
      response = mapColorsForBallon(data)
    }

    return NextResponse.json({ success: true, data: response })
  } catch (err) {
    return NextResponse.json({ message: 'paso error' })
  }
}

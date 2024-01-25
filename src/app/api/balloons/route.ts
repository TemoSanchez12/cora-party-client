import { NextResponse, NextRequest } from 'next/server'

// Import graphql client
import client from '@/apollo-client'

// Import intefaces
import BalloonProduct from '@/interfaces/balloons/BalloonProduct'

//Import queries
import {
  getAllBallonsWithoutRelationsQuery,
  getBallonDetailsWithoutRealtionsQuery,
} from '@/constants/queries/ballonQueries'

//Import mappers
import { mapBalloonToDefinition } from '@/utils/mappers/balloons/balloonMapper'

const handleGetAllBallonsAvailable = async () => {
  const data = await client.query({
    query: getAllBallonsWithoutRelationsQuery(),
  })

  return data
}

const handleGetBallonById = async (id: string) => {
  const data = await client.query({
    query: getBallonDetailsWithoutRealtionsQuery(parseInt(id)),
  })
  return mapBalloonToDefinition(data)
}

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
    const balloonId = urlRequest.searchParams.get('balloonId')

    let response: BalloonProduct[]

    if (!balloonId) {
      response = []
    } else {
      response = [await handleGetBallonById(balloonId)]
      console.log(response)
    }

    return NextResponse.json({
      success: true,
      data: response,
      message: 'Request successful. Retrieved ballon successfully.',
    })
  } catch (err) {
    console.log(err)
    return NextResponse.json({
      success: false,
      message: 'An error occurred while processing the request.',
    })
  }
}

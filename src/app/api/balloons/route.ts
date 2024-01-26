import { NextResponse, NextRequest } from 'next/server'

// Import graphql client
import client from '@/apollo-client'

// Import intefaces
import BalloonProduct from '@/interfaces/balloons/BalloonProduct'

//Import queries
import {
  getAllBalloonsQuery,
  getBalloonByIdQuery,
} from '@/constants/queries/balloonQueries'

//Import mappers
import {
  mapBalloonToDefinition,
  mapAllBalloons,
} from '@/utils/mappers/balloons/balloonMapper'

const handleGelAllBalloons = async () => {
  const data = await client.query({
    query: getAllBalloonsQuery(),
  })

  return mapAllBalloons(data)
}

const handleGetBalloonById = async (id: string) => {
  const data = await client.query({
    query: getBalloonByIdQuery(parseInt(id)),
  })
  return mapBalloonToDefinition(data)
}

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
    const balloonId = urlRequest.searchParams.get('balloonId')

    let response: BalloonProduct[]

    if (balloonId) {
      response = [await handleGetBalloonById(balloonId)]
    } else {
      response = await handleGelAllBalloons()
    }

    return NextResponse.json({
      success: true,
      data: response,
      message: 'Request successful. Retrieved ballon successfully.',
    })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({
      success: false,
      message: `An error occurred while processing the request. ${err.message}`,
    })
  }
}

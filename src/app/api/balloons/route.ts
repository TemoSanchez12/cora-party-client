import { NextResponse, NextRequest } from 'next/server'

// Import graphql client
import client from '@/apollo-client'

// Import intefaces
import BalloonProduct from '@/interfaces/balloons/BalloonProduct'

//Import queries
import {
  getAllBalloonsQuery,
  getBalloonByIdQuery,
  getBalloonBySlugQuery,
} from '@/queries/balloonQueries'

//Import mappers
import {
  mapBalloonToDefinition,
  mapAllBalloonsToDefinition,
} from '@/utils/mappers/balloons/balloonMapper'

const handleGelAllBalloons = async () => {
  const data = await client.query({
    query: getAllBalloonsQuery(),
  })

  return mapAllBalloonsToDefinition(data)
}

const handleGetBalloonBySlug = async (slug: string) => {
  const data = await client.query({
    query: getBalloonBySlugQuery(slug),
  })

  return mapBalloonToDefinition(data.data.globos.data[0])
}

const handleGetBalloonById = async (id: string) => {
  const data = await client.query({
    query: getBalloonByIdQuery(parseInt(id)),
  })

  return mapBalloonToDefinition(data.data.globo.data)
}

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
    const balloonId = urlRequest.searchParams.get('productId')
    const balloonSlug = urlRequest.searchParams.get('slug')

    let response: BalloonProduct[]

    if (balloonId) {
      response = [await handleGetBalloonById(balloonId)]
    } else if (balloonSlug) {
      response = [await handleGetBalloonBySlug(balloonSlug)]
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

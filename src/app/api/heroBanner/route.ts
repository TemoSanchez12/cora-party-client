// import dependencies
import { NextResponse } from 'next/server'

// import graphql client
import client from '@/apollo-client'

// import queries
import { getHeroBannerQuery } from '@/queries/heroBanner'

// import mapper
import { mapBannerHeroMapper } from '@/utils/mappers/domain/bannerHeroMapper'

// import interfaces
import HeroBanner from '@/interfaces/domain/HeroBanner'

interface HeroBannerResponse {
  success: boolean
  data?: HeroBanner
  message: string
}

const handleGetBannerImage = async () => {
  const { data } = await client.query({
    query: getHeroBannerQuery(),
  })

  return mapBannerHeroMapper(data)
}

export const GET = async () => {
  try {
    const response = await handleGetBannerImage()
    return NextResponse.json<HeroBannerResponse>({
      message: '',
      success: true,
      data: response,
    })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json<HeroBannerResponse>({
      success: false,
      message: 'An error occurred while processing the request.' + err.message,
    })
  }
}

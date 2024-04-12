import client from '@/apollo-client'
import HeroBanner from '@/interfaces/domain/HeroBanner'

import { getHeroBannerQuery } from '@/queries/heroBanner'
import { mapBannerHeroMapper } from '@/utils/mappers/domain/bannerHeroMapper'

export const getHeroBanner = async (): Promise<HeroBanner> => {
  const { data } = await client.query({
    query: getHeroBannerQuery(),
  })

  return mapBannerHeroMapper(data)
}

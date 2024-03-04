// import interfaces
import HeroBanner from '@/interfaces/domain/HeroBanner'

// Import mapper
import mapResponseImage from '../images/imageMapper'

export const mapBannerHeroMapper = (data: any) => {
  const { attributes } = data.heroBanner.data

  const heroBanner: HeroBanner = {
    link: attributes.Enlace,
    image: mapResponseImage(attributes.Imagen_Banner.data),
  }

  return heroBanner
}

// Import dependecies
import { ApolloQueryResult } from '@apollo/client'

// Import interfaces
import ImageProduct from '@/interfaces/ImageProduct'
import BalloonProduct from '@/interfaces/balloons/BalloonProduct'

// Map image object response to ImageFormat type
const mapImageFormats = (formats: any) => {
  let mappedFormats: any = {}

  Object.keys(formats).forEach(key => {
    const value = formats[key]
    mappedFormats[key] = value
  })

  return mappedFormats
}

// Map total image response to ImageProduct type
const mapResponseBallonImage = (data: any): ImageProduct => {
  const { name, formats } = data.attributes

  const imageProduct: ImageProduct = {
    name,
    formats: mapImageFormats(formats),
  }

  return imageProduct
}

// Maps balloon response to BallonProduct
export const mapBalloonToDefinition = (
  response: ApolloQueryResult<any>
): BalloonProduct => {
  if (
    !response ||
    !response.data ||
    !response.data.globo ||
    !response.data.globo.data
  ) {
    throw new Error(
      'Error mapping product data: Unable to retrieve required information.'
    )
  }
  const { id, attributes } = response.data.globo.data
  const {
    Nombre,
    Descripcion,
    Precio,
    Textos_Requeridos,
    Tiempo_Minimo_Preparacion,
    Tiempo_Minimo_Premium,
    Activo,
    Destacado,
    Slug,
    Imagenes,
  } = attributes

  const requiredTexts = Textos_Requeridos.split(',').map((text: string) =>
    text.trim()
  )

  const images = Imagenes.data.map((image: any) =>
    mapResponseBallonImage(image)
  )

  const ballonProduct: BalloonProduct = {
    id: id,
    name: Nombre,
    description: Descripcion,
    price: Precio,
    requiredTexts,
    minimumTime: Tiempo_Minimo_Preparacion,
    minimumPremiumTime: Tiempo_Minimo_Premium,
    isActive: Activo,
    isFeatured: Destacado,
    slug: Slug,
    images,
  }

  return ballonProduct
}

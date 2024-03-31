// Import dependecies
import { ApolloQueryResult } from '@apollo/client'

// Import interfaces
import BalloonProduct from '@/interfaces/balloons/BalloonProduct'

// Import Mappers
import mapResponseImage from '../images/imageMapper'
import { mapCategoriesToDefinition } from '../categories/categoriesMapper'

const mapSingleBalloon = (data: any) => {
  const { id, attributes } = data
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
    Categorias_Globo,
    Colores_Requeridos,
  } = attributes

  const requiredTexts = Textos_Requeridos.split(',').map((text: string) =>
    text.trim()
  )

  const requiredColors = Colores_Requeridos?.split(',').map((text: string) =>
    text.trim()
  )

  const images = Imagenes.data.map((image: any) => mapResponseImage(image))

  const ballonProduct: BalloonProduct = {
    id: 'globos-' + id,
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
    // categories: mapCategoriesToDefinition(Categorias_Globo.data),
    requiredColors,
  }

  return ballonProduct
}

// Maps balloon response to BallonProduct
export const mapBalloonToDefinition = (
  data: ApolloQueryResult<any>
): BalloonProduct => {
  if (!data) {
    throw new Error(
      'Error mapping product data: Unable to retrieve required information.'
    )
  }
  return mapSingleBalloon(data)
}

export const mapAllBalloonsToDefinition = (
  response: ApolloQueryResult<any>
): BalloonProduct[] => {
  if (
    !response ||
    !response.data ||
    !response.data.globos ||
    !response.data.globos.data
  ) {
    throw new Error(
      'Error mapping product data: Unable to retrieve required information.'
    )
  }

  return response.data.globos.data.map((data: any) => mapSingleBalloon(data))
}

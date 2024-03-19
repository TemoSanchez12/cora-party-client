import BallonColor from '@/interfaces/domain/ProductColor'
import { ApolloQueryResult } from '@apollo/client'

export const mapResponseToBallonColors = (
  response: ApolloQueryResult<any>
): BallonColor[] => {
  if (
    !response ||
    !response.data ||
    !response.data.colores ||
    !response.data.colores.data
  ) {
    return []
  }

  return response.data.colores.data.map((item: any) => {
    const { id, attributes } = item
    const { Nombre, Codigo_Hexadecimal } = attributes

    return {
      id,
      name: Nombre,
      hexCode: Codigo_Hexadecimal,
    }
  })
}

export const mapColorsForBallon = (
  response: ApolloQueryResult<any>
): BallonColor[] => {
  const colorsData = response.data.globo.data.attributes.Colores.data
  const ballonColors: BallonColor[] = colorsData.map((color: any) => ({
    id: color.id,
    name: color.attributes.Nombre,
    hexCode: color.attributes.Codigo_Hexadecimal,
  }))

  return ballonColors
}

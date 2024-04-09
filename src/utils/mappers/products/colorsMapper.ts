import ProductColor from '@/interfaces/domain/ProductColor'
import { ApolloQueryResult } from '@apollo/client'

export const mapResponseToProductColors = (
  response: ApolloQueryResult<any>
): ProductColor[] => {
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

export const mapColorsForProduct = (
  response: ApolloQueryResult<any>
): ProductColor[] => {
  const colorsData = response.data.producto.data.attributes.Colores.data
  const productColors: ProductColor[] = colorsData.map((color: any) => ({
    id: color.id,
    name: color.attributes.Nombre,
    hexCode: color.attributes.Codigo_Hexadecimal,
  }))

  return productColors
}

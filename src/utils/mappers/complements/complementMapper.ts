// Import dependencies
import { ApolloQueryResult } from '@apollo/client'
import ImageProduct from '@/interfaces/ImageProduct'

// Import interfaces
import ComplementProduct from '@/interfaces/ComplementProduct'

const mapImageFormats = (formats: any) => {
  let mappedFormats: any = {}

  Object.keys(formats).forEach(key => {
    const value = formats[key]
    mappedFormats[key] = value
  })

  return mappedFormats
}

const mapResponseBallonImage = (data: any): ImageProduct => {
  const { name, formats } = data.attributes

  const imageProduct: ImageProduct = {
    name,
    formats: mapImageFormats(formats),
  }

  return imageProduct
}

export const mapListComplements = (data: any): ComplementProduct[] => {
  const { data: complements } = data.Complementos

  return complements.map((complement: any) => {
    const {
      Nombre: name,
      Descripcion: description,
      Precio: price,
      Activo: isActive,
      Fotos: images,
    } = complement.attributes

    const imagesMapped = images.data.map(mapResponseBallonImage)

    console.log(imagesMapped)
  })
}

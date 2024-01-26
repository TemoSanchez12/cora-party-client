// Import interfaces
import ComplementProduct from '@/interfaces/ComplementProduct'

// Import mapper
import mapResponseImage from '../images/imageMapper'

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

    const imagesMapped = images.data.map(mapResponseImage)

    const complementProduct: ComplementProduct = {
      name,
      description,
      price,
      isActive,
      minimumTime: 0,
      isFeatured: false,
      id: '1',
      images: imagesMapped,
    }

    return complementProduct
  })
}

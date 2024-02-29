// Import interfaces
import ComplementProduct from '@/interfaces/domain/ComplementProduct'

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
      id: 'complement-' + complement.id,
      name,
      description,
      price,
      isActive,
      minimumTime: 0,
      isFeatured: false,
      images: imagesMapped,
    }

    return complementProduct
  })
}

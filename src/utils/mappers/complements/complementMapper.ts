// Import interfaces
import ComplementProduct from '@/interfaces/domain/ComplementProduct'

// Import mapper
import mapResponseImage from '../images/imageMapper'

export const mapListComplements = (data: any): ComplementProduct[] => {
  const { data: complements } = data.Complementos

  return complements.map(mapComplement)
}

export const mapComplement = (complement: any) => {
  const {
    Nombre: name,
    Descripcion: description,
    Precio: price,
    Activo: isActive,
    Fotos: images,
    Slug: slug,
  } = complement.attributes

  const imagesMapped = images.data.map(mapResponseImage)

  const complementProduct: ComplementProduct = {
    id: complement.id,
    name,
    description,
    price,
    isActive,
    images: imagesMapped,
    slug,
  }

  return complementProduct
}

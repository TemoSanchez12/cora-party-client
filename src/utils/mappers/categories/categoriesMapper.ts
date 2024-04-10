// Import interfaces
import ProductCategory from '@/interfaces/domain/ProductCategory'

// Import mappers
import mapResponseImage from '../images/imageMapper'
import { ProductTypes } from '@/interfaces/domain/Product'

export const mapCategoriesToDefinition = (
  data: any,
  type: ProductTypes
): ProductCategory[] =>
  data.map(
    (category: any): ProductCategory => ({
      id: category.id,
      name: category.attributes.Nombre,
      slug: category.attributes.Slug,
      cover: mapResponseImage(category.attributes.Cover.data),
      featured: category.attributes.Destacado,
      type,
    })
  )

export const mapCategoryToDefinition = (
  data: any,
  type: ProductTypes
): ProductCategory => ({
  id: data.id,
  name: data.attributes.Nombre,
  slug: data.attributes.Slug,
  type,
  cover: mapResponseImage(data.attributes.Cover.data),
  featured: data.attributes.Destacado,
})

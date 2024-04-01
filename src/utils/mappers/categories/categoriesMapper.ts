// Import interfaces
import ProductCategory from '@/interfaces/domain/ProductCategory'

// Import mappers
import mapResponseImage from '../images/imageMapper'

export const mapCategoriesToDefinition = (data: any): ProductCategory[] =>
  data.map(
    (category: any): ProductCategory => ({
      id: category.id,
      name: category.attributes.Nombre,
      slug: category.attributes.Slug,
      cover: mapResponseImage(category.attributes.Cover.data),
      featured: category.attributes.Destacado,
    })
  )

export const mapCategoryToDefinition = (data: any): ProductCategory => ({
  id: data.id,
  name: data.attributes.Nombre,
  slug: data.attributes.Slug,
  cover: mapResponseImage(data.attributes.Cover.data),
  featured: data.attributes.Destacado,
})

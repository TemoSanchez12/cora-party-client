// Import interfaces
import ProductCategory from '@/interfaces/domain/ProductCategory'

export const mapCategoryToDefinition = (data: any): ProductCategory[] => [
  ...data.map(
    (category: any): ProductCategory => ({
      id: category.id,
      name: category.attributes.Nombre,
      slug: category.attributes.Slug,
    })
  ),
]

// import dependencies
import { ApolloQueryResult } from '@apollo/client'

// Import interfaces
import ProductCategory from '@/interfaces/ProductCategory'

export const mapCategoryToDefinition = (data: any): ProductCategory[] =>
  data.map(
    (category: any): ProductCategory => ({
      id: category.id,
      name: category.attributes.Nombre,
      slug: category.attributes.Slug,
    })
  )

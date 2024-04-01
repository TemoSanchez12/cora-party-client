import client from '@/apollo-client'
import ProductCategory from '@/interfaces/domain/ProductCategory'
import { ProductTypes } from '@/interfaces/domain/Product'

import {
  getCategoriesForProductQuery,
  getCategoryForTypeQuery,
  getCategoryBySlugQuery,
} from '@/queries/categoriesQueries'
import {
  mapCategoriesToDefinition,
  mapCategoryToDefinition,
} from '@/utils/mappers/categories/categoriesMapper'

type typesForCategoryTypes = {
  balloon: string
  flower: string
  [key: string]: string
}

const typesForCategoryTypes: typesForCategoryTypes = {
  balloon: 'globo',
  flower: 'arregloFlores',
}

const queryCategoryMap: typesForCategoryTypes = {
  balloon: 'Categorias_Globo',
  flower: 'Categorias_Flores',
}

const responseCategoryTypeMap = {
  [ProductTypes.Balloon]: 'categoriasGlobos',
  [ProductTypes.Flower]: 'categoriasFlores',
}

const productTypes = {
  [ProductTypes.Balloon]: 'balloon',
  [ProductTypes.Flower]: 'flower',
}

export const getCategoriesByProduct = async (
  id: number,
  type: ProductTypes
): Promise<ProductCategory[]> => {
  const { data } = await client.query({
    query: getCategoriesForProductQuery(id, productTypes[type]),
  })

  const categoryType = typesForCategoryTypes[type]
  const categoryTypeName = queryCategoryMap[type]

  return mapCategoriesToDefinition(
    data[categoryType].data.attributes[categoryTypeName].data
  )
}

export const getCategoryBySlug = async (
  type: ProductTypes,
  slug: string
): Promise<ProductCategory> => {
  const { data } = await client.query({
    query: getCategoryBySlugQuery(productTypes[type], slug),
  })

  const categoryType = responseCategoryTypeMap[type]

  return mapCategoryToDefinition(data[categoryType].data[0])
}

export const getCategoryForType = async (
  type: ProductTypes
): Promise<ProductCategory[]> => {
  const { data } = await client.query({
    query: getCategoryForTypeQuery(productTypes[type]),
  })

  const categoryType = responseCategoryTypeMap[type]

  return mapCategoriesToDefinition(data[categoryType].data)
}

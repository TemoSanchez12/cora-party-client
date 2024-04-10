// import dependencies
import { NextResponse, NextRequest } from 'next/server'

// import graphql client
import client from '@/apollo-client'

// import mappers
import {
  mapCategoriesToDefinition,
  mapCategoryToDefinition,
} from '@/utils/mappers/categories/categoriesMapper'

// import queries
import {
  getCategoriesForProductQuery,
  getCategoryForTypeQuery,
  getCategoryBySlugQuery,
} from '@/queries/categoriesQueries'

// Import interfaces
import ProductCategory from '@/interfaces/domain/ProductCategory'
import { ProductTypes } from '@/interfaces/domain/Product'

type typesForCategoryTypes = {
  balloon: string
  flower: string
  [key: string]: string
}

type typesForCategoryMapTypes = {
  balloon: ProductTypes.Balloon
  flower: ProductTypes.Flower
  [key: string]: ProductTypes
}

const typesForCategoryMapTypes: typesForCategoryMapTypes = {
  balloon: ProductTypes.Balloon,
  flower: ProductTypes.Flower,
}

const typesForCategoryTypes: typesForCategoryTypes = {
  balloon: 'globo',
  flower: 'arregloFlores',
}

const queryCategoryMap: typesForCategoryTypes = {
  balloon: 'Categorias_Globo',
  flower: 'Categorias_Flores',
}

const responseCategoryTypeMap: typesForCategoryTypes = {
  balloon: 'categoriasGlobos',
  flower: 'categoriasFlores',
}

interface CategoriesResponse {
  success: boolean
  data?: ProductCategory[]
  message: string
}

const handleGetCategoryForProduct = async (id: string, type: string) => {
  const { data } = await client.query({
    query: getCategoriesForProductQuery(parseInt(id), type),
  })

  const categoryType = typesForCategoryTypes[type]
  const categoryTypeName = queryCategoryMap[type]

  return mapCategoriesToDefinition(
    data[categoryType].data.attributes[categoryTypeName].data,
    typesForCategoryMapTypes[type]
  )
}

const handleGetCategoryForType = async (type: string) => {
  const { data } = await client.query({
    query: getCategoryForTypeQuery(type),
  })

  const categoryType = responseCategoryTypeMap[type]

  return mapCategoriesToDefinition(
    data[categoryType].data,
    typesForCategoryMapTypes[type]
  )
}

const handleGetCategoryBySlug = async (type: string, slug: string) => {
  const { data } = await client.query({
    query: getCategoryBySlugQuery(type, slug),
  })

  const categoryType = responseCategoryTypeMap[type]

  return mapCategoryToDefinition(
    data[categoryType].data[0],
    typesForCategoryMapTypes[type]
  )
}

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
    const type: string = urlRequest.searchParams.get('type') || 'balloon'
    const productId = urlRequest.searchParams.get('productId')
    const slug = urlRequest.searchParams.get('slug')

    let response: ProductCategory[] = []

    if (productId) {
      response = await handleGetCategoryForProduct(productId, type)
    } else if (slug) {
      response = [await handleGetCategoryBySlug(type, slug)]
    } else {
      response = await handleGetCategoryForType(type)
    }

    return NextResponse.json<CategoriesResponse>({
      success: true,
      data: response,
      message: '',
    })
  } catch (err: any) {
    console.log(err)

    return NextResponse.json<CategoriesResponse>({
      success: false,
      message: 'An error occurred while processing the request.' + err.message,
    })
  }
}

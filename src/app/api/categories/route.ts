// import dependencies
import { NextResponse, NextRequest } from 'next/server'

// import graphql client
import client from '@/apollo-client'

// import mappers

// import queries
import {
  getCategoriesForProductQuery,
  getCategoryForTypeQuery,
} from '@/queries/categoriesQueries'

// Import interfaces
import ProductCategory from '@/interfaces/ProductCategory'
import { mapCategoryToDefinition } from '@/utils/mappers/categories/categoriesMapper'

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

  return mapCategoryToDefinition(
    data[categoryType].data.attributes[categoryTypeName].data
  )
}

const handleGetCategoryForType = async (type: string) => {
  const { data } = await client.query({
    query: getCategoryForTypeQuery(type),
  })
  const categoryType = responseCategoryTypeMap[type]

  return mapCategoryToDefinition(data[categoryType].data)
}

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
    const type: string = urlRequest.searchParams.get('type') || 'balloon'
    const productId = urlRequest.searchParams.get('productId')

    let response: ProductCategory[] = []

    if (productId) {
      response = await handleGetCategoryForProduct(productId, type)
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

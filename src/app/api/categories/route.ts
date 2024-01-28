// import dependencies
import { NextResponse, NextRequest } from 'next/server'

// import graphql client
import client from '@/apollo-client'

// import mappers

// import queries
import { getCategoriesForProduct } from '@/constants/queries/categoriesQueries'

// Import interfaces
import ProductCategory from '@/interfaces/ProductCategory'

interface CategoriesResponse {
  success: boolean
  data?: ProductCategory[]
  message: string
}

const handleGetCategoryForProduct = async (id: string, type: string) => {
  const data = await client.query({
    query: getCategoriesForProduct(parseInt(id), type),
  })

  return
}

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
    const type: string = urlRequest.searchParams.get('type') || 'balloon'
    const productId = urlRequest.searchParams.get('productId')

    let response: ProductCategory[]

    if (productId) {
      response = await handleGetCategoryForProduct(productId, type)
    } else {
    }
  } catch (err: any) {
    console.log(err)

    return NextResponse.json<CategoriesResponse>({
      success: true,
      message: 'An error occurred while processing the request.' + err.message,
    })
  }
}

import { NextResponse, NextRequest } from 'next/server'

// Import graphql client
import client from '@/apollo-client'

// Import intefaces
import Product, { ProductTypes } from '@/interfaces/domain/Product'

//Import queries
import {
  getProductsByTypeQuery,
  getProductsByIdQuery,
  getAllProductsQuery,
} from '@/queries/productQueries'

//Import mappers
import { mapProductsToDefinition } from '@/utils/mappers/products/productMapper'

type typesForProducts = {
  balloon: ProductTypes.Balloon
  flower: ProductTypes.Flower
  [key: string]: ProductTypes
}

const typesForCategoryTypes: typesForProducts = {
  balloon: ProductTypes.Balloon,
  flower: ProductTypes.Flower,
}

const handleGetProductByType = async (type: string) => {
  const productType: ProductTypes = typesForCategoryTypes[type]

  const data = await client.query({
    query: getProductsByTypeQuery(productType),
  })

  const products: Product[] = mapProductsToDefinition(data)

  return products
}

const handleGetProductById = async (id: string) => {
  const data = await client.query({
    query: getProductsByIdQuery(id),
  })

  const products: Product[] = mapProductsToDefinition(data)

  return products
}

const handleGetAllProducts = async () => {
  const data = await client.query({
    query: getAllProductsQuery(),
  })

  const products: Product[] = mapProductsToDefinition(data)

  return products
}

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
    const productId = urlRequest.searchParams.get('productId')
    const productType = urlRequest.searchParams.get('productId')

    let response: Product[] = []

    if (productId) {
      response = await handleGetProductById(productId)
    } else if (productType) {
      response = await handleGetProductByType(productType)
    } else {
      response = await handleGetAllProducts()
    }

    return NextResponse.json({
      success: true,
      data: response,
      message: 'Request successful. Retrieved ballon successfully.',
    })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({
      success: false,
      message: `An error occurred while processing the request. ${err.message}`,
    })
  }
}

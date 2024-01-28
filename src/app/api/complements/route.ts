// Import dependecies
import { NextResponse, NextRequest } from 'next/server'

// Import graphql client
import client from '@/apollo-client'

// Import mapperes
import { mapListComplements } from '@/utils/mappers/complements/complementMapper'

// Import queries
import { getComplementForProduct } from '@/queries/complementQueries'

// Import interfaces
import ComplementProduct from '@/interfaces/ComplementProduct'

type typesForComplementsTypes = {
  balloon: string
  flower: string
  [key: string]: string
}

const typesForComplements: typesForComplementsTypes = {
  balloon: 'globo',
  flower: 'arregloFlores',
}

interface ProductComplementResponse {
  success: boolean
  data?: ComplementProduct[]
  message: string
}

const handleGetComplementsById = async (id: string, type: string) => {
  const data = await client.query({
    query: getComplementForProduct(parseInt(id), type),
  })
  return mapListComplements(data.data[type].data.attributes)
}

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
    const type: string = urlRequest.searchParams.get('type') || 'balloon'
    const productId = urlRequest.searchParams.get('productId')

    let response: ComplementProduct[]

    if (productId) {
      response = await handleGetComplementsById(
        productId ?? '1',
        typesForComplements[type]
      )
    } else {
      throw new Error(
        'Error: Please provide a valid ID to fetch related complements.'
      )
    }

    return NextResponse.json<ProductComplementResponse>({
      success: true,
      data: response,
      message:
        'Request successful. Retrieved complements for products successfully.',
    })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json<ProductComplementResponse>({
      success: false,
      message: 'An error occurred while processing the request.' + err.message,
    })
  }
}

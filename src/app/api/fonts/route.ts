// Import dependencies
import { NextRequest, NextResponse } from 'next/server'

// Import graphql client
import client from '@/apollo-client'
import ProductFonts from '@/interfaces/ProductFonts'

// Import queries
import { getFontsQuery } from '@/constants/queries/fontQueries'

// Import mappers

type typesForFontsTypes = {
  balloon: string
  flower: string
  [key: string]: string
}

const typesForFonts: typesForFontsTypes = {
  balloon: 'globo',
  flower: 'arregloFlores',
}

interface FontProductResponse {
  success: boolean
  data?: ProductFonts[]
  message: string
}

const handleGetFontsById = async (id: string, type: string) => {
  const data = await client.query({
    query: getFontsQuery(parseInt(id), type),
  })

  return mapFontToDefinition(data)
}

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
    const type: string = urlRequest.searchParams.get('type') || 'globo'
    const productId = urlRequest.searchParams.get('productId')

    let response: ProductFonts[]

    if (productId) {
      response = await handleGetFontsById(productId ?? '1', typesForFonts[type])
    }

    return NextResponse.json<FontProductResponse>({
      success: true,
      message: '',
    })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json<FontProductResponse>({
      success: false,
      message: '',
    })
  }
}

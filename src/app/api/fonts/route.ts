// Import dependencies
import { NextRequest, NextResponse } from 'next/server'

// Import graphql client
import client from '@/apollo-client'
import ProductFonts from '@/interfaces/domain/ProductFont'

// Import queries
import { getFontsQuery } from '@/queries/fontQueries'

// Import mappers
import { mapFontToDefiniton } from '@/utils/mappers/fonts/fontsMapper'

type typesForFontsTypes = {
  globos: string
  flores: string
  [key: string]: string
}

const typesForFonts: typesForFontsTypes = {
  globos: 'globo',
  flores: 'arregloFlores',
}

interface FontProductResponse {
  success: boolean
  data?: ProductFonts[]
  message: string
}

const handleGetFontsById = async (id: string) => {
  const { data } = await client.query({
    query: getFontsQuery(parseInt(id)),
  })

  return mapFontToDefiniton(data.producto.data.attributes.Fuentes.data)
}

export const GET = async (req: NextRequest) => {
  const urlRequest = new URL(req.url)
  const searchParams = req.nextUrl.searchParams

  try {
    const productId = urlRequest.searchParams.get('productId')

    let response: ProductFonts[] = []

    if (productId) {
      response = await handleGetFontsById(productId ?? '1')
    }

    return NextResponse.json<FontProductResponse>({
      success: true,
      data: response,
      message: '',
    })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json<FontProductResponse>({
      success: false,
      message: 'An error occurred while processing the request.' + err.message,
    })
  }
}

export const dynamic = 'force-dynamic'

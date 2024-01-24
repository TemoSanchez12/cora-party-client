import { NextResponse, NextRequest } from 'next/server'
import client from '@apollo/client'

export const GET = async (req: NextRequest) => {
  try {
    const urlRequest = new URL(req.url)
    const ballonId = urlRequest.searchParams.get('ballonId')

    let response
  } catch (err) {}
}

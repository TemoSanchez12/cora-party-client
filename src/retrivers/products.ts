import client from '@/apollo-client'
import Product, { ProductTypes } from '@/interfaces/domain/Product'
import { getProductsByTypeQuery } from '@/queries/productQueries'

export const getProductsByType = async (
  productType: ProductTypes
): Promise<Product[]> => {

  const data = await client.query({
    query: getProductsByTypeQuery(productType),
  })

  console.log(data)

  const products = 

  return []
}

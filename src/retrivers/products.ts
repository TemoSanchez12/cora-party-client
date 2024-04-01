import client from '@/apollo-client'
import Product, { ProductTypes } from '@/interfaces/domain/Product'
import { getProductsByTypeQuery } from '@/queries/productQueries'
import { mapProductsToDefinition } from '@/utils/mappers/products/productMapper'

export const getProductsByType = async (
  productType: ProductTypes
): Promise<Product[]> => {
  const data = await client.query({
    query: getProductsByTypeQuery(productType),
  })

  console.log(data)

  const products: Product[] = mapProductsToDefinition(data, productType)

  return products
}

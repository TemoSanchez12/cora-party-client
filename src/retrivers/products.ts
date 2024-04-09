import client from '@/apollo-client'
import Product, { ProductTypes } from '@/interfaces/domain/Product'
import {
  getProductsByIdQuery,
  getProductsByTypeQuery,
} from '@/queries/productQueries'
import {
  mapProduct,
  mapProductsToDefinition,
} from '@/utils/mappers/products/productMapper'

export const getProductsByType = async (
  productType: ProductTypes
): Promise<Product[]> => {
  const data = await client.query({
    query: getProductsByTypeQuery(productType),
  })

  const products: Product[] = mapProductsToDefinition(data)

  return products
}

export const getProductById = async (productId: string): Promise<Product> => {
  const { data } = await client.query({
    query: getProductsByIdQuery(productId),
  })

  const product: Product = mapProduct(data.producto.data)

  return product
}

import { ProductTypes } from '@/interfaces/domain/Product'

const routeTypes = {
  [ProductTypes.Balloon]: 'globos',
  [ProductTypes.Flower]: 'flores',
}

type typesForProducts = {
  globos: ProductTypes.Balloon
  flores: ProductTypes.Flower
  [key: string]: ProductTypes
}

const productTypes: typesForProducts = {
  globos: ProductTypes.Balloon,
  flores: ProductTypes.Flower,
}

export const productTypeToUrlParam = (productType: ProductTypes): string => {
  return routeTypes[productType]
}

export const stringToProductType = (productType: string): ProductTypes => {
  return productTypes[productType]
}

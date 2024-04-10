import { ProductTypes } from '@/interfaces/domain/Product'

const routeTypes = {
  [ProductTypes.Balloon]: 'globos',
  [ProductTypes.Flower]: 'flores',
}

export const productTypeToUrlParam = (productType: ProductTypes): string => {
  return routeTypes[productType]
}

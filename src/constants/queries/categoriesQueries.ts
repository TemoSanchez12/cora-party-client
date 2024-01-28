import { gql } from '@apollo/client'

type typesForCategoriesTypes = {
  balloon: string
  flower: string
  [key: string]: string
}

const typesForCategories: typesForCategoriesTypes = {
  balloon: 'globo',
  flower: 'arregloFlores',
}

const parameterForCategoryQueryType: typesForCategoriesTypes = {
  balloon: 'Categorias_Globo',
  flower: 'Categorias_Flores',
}

export const getCategoriesForProduct = (productId: number, type: string) => {
  return gql`
  {
    ${typesForCategories[type]}  (id: ${productId}) {
      data {
        attributes {
          ${parameterForCategoryQueryType[type]} {
            data {
              id
              attributes {
                Nombre
                Slug
              }
            }
          }
        }
      }
    }
  }
  `
}

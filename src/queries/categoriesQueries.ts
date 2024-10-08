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

const paramForCategoryTypeQuery: typesForCategoriesTypes = {
  balloon: 'categoriasGlobos',
  flower: 'categoriasFlores',
}

export const getCategoriesForProductQuery = (
  productId: number,
  type: string
) => {
  return gql`
  {
    ${typesForCategories[type]}  (id: ${productId}) {
      data {
        id
        attributes {
          ${parameterForCategoryQueryType[type]} {
            data {
              id
              attributes {
                Nombre
                Slug
                Destacado
                Cover {
                  data {
                    id
                    attributes {
                      name
                      formats
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `
}

export const getCategoryForTypeQuery = (type: string) => gql`
  {
    ${paramForCategoryTypeQuery[type]} {
      data {
        id
        attributes {
          Nombre
          Slug
          Destacado
          Cover {
            data {
              id
              attributes {
                name
                formats
                url
              }
            }
          }
        }
      }
    }
  }
`

export const getCategoryBySlugQuery = (type: string, slug: string) => gql`
  {
    ${paramForCategoryTypeQuery[type]} (filters: {Slug: {eq: "${slug}"}}) {
      data {
        id
        attributes {
          Nombre
          Slug
          Destacado
          Cover {
            data {
              id
              attributes {
                name
                formats
                url
              }
            }
          }
        }
      }
    }
  }
  `

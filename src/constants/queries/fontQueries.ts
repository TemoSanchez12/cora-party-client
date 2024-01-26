import { gql } from '@apollo/client'

export const getFontsQuery = (productId: number, type: string) => gql`
  {
    ${type} (id: ${productId}) {
      data {
        attributes {
          Fuentes {
            data {
              id
              attributes {
                Nombre
                Ejemplo_Fuente {
                  data {
                    attributes {
                      name
                      formats
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

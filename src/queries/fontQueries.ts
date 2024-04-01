import { gql } from '@apollo/client'

export const getFontsQuery = (productId: number) => gql`
  {
    producto (id: ${productId}) {
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

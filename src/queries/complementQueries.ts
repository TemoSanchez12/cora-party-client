import { gql } from '@apollo/client'

export const getComplementForProduct = (productId: number) => gql`
  {
    producto (id: ${productId}) {
      data {
        id
        attributes {
          Complementos {
            data {
              id
              attributes {
                Nombre
                Descripcion
                Precio
                Activo
                Fotos {
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

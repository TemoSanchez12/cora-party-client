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

export const getComplementByIdQuery = (complementId: string) => gql`
  {
    complemento(id: ${complementId}) {
      data {
        attributes {
          Nombre
          Descripcion
          Precio
          Activo
          Fotos {
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

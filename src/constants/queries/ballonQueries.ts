import { gql } from '@apollo/client'

export const getAllColorsQuery = () => gql`
  {
    colores {
      data {
        id
        attributes {
          Nombre
          Codigo_Hexadecimal
        }
      }
    }
  }
`

export const getColorsForBallonQuery = (ballonId: number) => gql`{
  globo (id: ${ballonId}) {
    data {
      attributes {
        Colores {
          data {
            id
            attributes {
              Nombre
              Codigo_Hexadecimal
            }
          }
        }
      }
    }
  } 
}
`

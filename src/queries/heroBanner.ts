import { gql } from '@apollo/client'

export const getHeroBannerQuery = () => gql`
  {
    heroBanner {
      data {
        attributes {
          Enlace
          Imagen_Banner {
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
`

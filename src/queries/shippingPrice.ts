import { gql } from '@apollo/client'

export const getShippingPriceQuery = () => gql`
  {
    costoEnvio {
      data {
        attributes {
          Precio
        }
      }
    }
  }
`

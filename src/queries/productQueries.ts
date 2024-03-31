import { ProductTypes } from '@/interfaces/domain/Product'
import { gql } from '@apollo/client'

type productTypesType = {
  [key in ProductTypes]: string
}

const productTypes: productTypesType = {
  [ProductTypes.Balloon]: 'Globo',
  [ProductTypes.Flower]: 'Flores',
}

export const getProductsByTypeQuery = (productType: ProductTypes) => gql`
  # Write your query or mutation here
  {
    productos(filters: { Tipo_Producto: { eq: "${productTypes[productType]}" } }) {
      data {
        id
        attributes {
          Nombre
          Descripcion
          Precio
          Slug
          Tiempo_Minimo_Preparacion
          Tiempo_Minimo_Premium
          Textos_Requeridos
          Colores_Requeridos
          Imagenes {
            data {
              id
              attributes {
                name
                formats
                url
              }
            }
          }
          Activo
          Mostrar
          Categorias_Globos {
            data {
              id
              attributes {
                Nombre
                Slug
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
          Categorias_Flores {
            data {
              id
              attributes {
                Nombre
                Slug
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
          Complementos {
            data {
              id
              attributes {
                Nombre
                Descripcion
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
                Precio
                Activo
                Slug
              }
            }
          }
          Colores {
            data {
              id
              attributes {
                Nombre
                Codigo_Hexadecimal
              }
            }
          }
          Fuentes {
            data {
              id
              attributes {
                Nombre
                Ejemplo_Fuente {
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
          Destacado
          Variantes_Producto {
            data {
              id
            }
          }
          Tipo_Producto
          Colores_Fuente {
            data {
              id
              attributes {
                Nombre
                Codigo_Hexadecimal
              }
            }
          }
          Mostrar_Tipos_Texto
          Tamanos {
            data {
              id
              attributes {
                Nombre
                Tamano
                Producto {
                  data {
                    id
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

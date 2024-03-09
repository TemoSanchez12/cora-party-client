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

export const getBalloonColorsQuery = (balloonId: number) => gql`{
  globo (id: ${balloonId}) {
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

export const getAllBalloonsQuery = () => gql`
  {
    globos {
      data {
        id
        attributes {
          Nombre
          Descripcion
          Precio
          Textos_Requeridos
          Tiempo_Minimo_Preparacion
          Tiempo_Minimo_Premium
          Activo
          Destacado
          Slug
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
          Categorias_Globo {
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

export const getBalloonByIdQuery = (ballonId: number) => gql`
  {
    globo(id: ${ballonId}) {
      data {
        id
        attributes {
          Nombre
          Descripcion
          Precio
          Textos_Requeridos
          Tiempo_Minimo_Preparacion
          Tiempo_Minimo_Premium
          Activo
          Destacado
          Colores_Requeridos
          Slug
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
          Categorias_Globo {
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

export const getBalloonBySlugQuery = (balloonSlug: string) => gql`
{
  globos(filters: {Slug: {eq: "${balloonSlug}"}}) {
    data {
      id
      attributes {
        Nombre
        Descripcion
        Precio
        Textos_Requeridos
        Colores_Requeridos
        Tiempo_Minimo_Preparacion
        Tiempo_Minimo_Premium
        Activo
        Destacado
        Slug
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
        Categorias_Globo {
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
}`

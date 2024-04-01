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
          Variantes_Producto {
            data {
              id
              attributes {
                Nombre
                Producto {
                  data {
                    id
                    attributes {
                      Nombre
                      Slug
                    }
                  }
                }
                Image {
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
                    attributes {
                        Slug
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

export const getProductsByIdQuery = (productId: string) => gql`
  {
    producto (id: ${productId}) {
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
          Variantes_Producto {
            data {
              id
              attributes {
                Nombre
                Producto {
                  data {
                    id
                    attributes {
                      Nombre
                      Slug
                    }
                  }
                }
                Image {
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
                    attributes {
                        Slug
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

export const getAllProductsQuery = () => gql`
  {
    productos(filters: { Mostrar: { eq: true } }) {
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
          Variantes_Producto {
            data {
              id
              attributes {
                Nombre
                Producto {
                  data {
                    id
                    attributes {
                      Nombre
                      Slug
                    }
                  }
                }
                Image {
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
                    attributes {
                      Slug
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

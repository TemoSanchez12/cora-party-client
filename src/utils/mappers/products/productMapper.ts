import Product, { ProductTypes } from '@/interfaces/domain/Product'
import ImageProduct from '@/interfaces/domain/ImageProduct'
import ProductCategory from '@/interfaces/domain/ProductCategory'
import ProductColor from '@/interfaces/domain/ProductColor'
import ProductFont from '@/interfaces/domain/ProductFont'
import { ProductVariant } from '@/interfaces/domain/Product'
import { ProductSize } from '@/interfaces/domain/Product'

// Import Mappers
import mapResponseImage from '../images/imageMapper'
import { mapSampleImageFont } from '../fonts/fontsMapper'

const mapVariant = (data: any): ProductVariant => {
  return {
    id: data.id,
    name: data.attributes.Nombre,
    image: mapResponseImage(data.attributes.Image.data),
    product: {
      id: data.attributes.Producto.data.id,
      slug: data.attributes.Producto.data.attributes.Slug,
      name: data.attributes.Producto.data.attributes.Nombre,
    },
  }
}

const mapCategory = (data: any): ProductCategory => {
  return {
    id: data.id,
    name: data.attributes.Nombre,
    slug: data.attributes.Slug,
    featured: data.attributes.Destacado,
    cover: mapResponseImage(data.attributes.Cover.data),
  }
}

const mapColor = (data: any): ProductColor => {
  return {
    id: data.id,
    name: data.attributes.Nombre,
    hexCode: data.attributes.Codigo_Hexadecimal,
  }
}

const mapFont = (data: any): ProductFont => {
  return {
    id: data.id,
    name: data.attributes.Nombre,
    sampleFontImage: mapSampleImageFont(data.attributes.Ejemplo_Fuente.data),
  }
}

const mapSize = (data: any): ProductSize => {
  return {
    id: data.id,
    name: data.attributes.Nombre,
    size: data.attributes.Tamano,
    product: {
      id: data.attributes.Producto.data.id,
      slug: data.attributes.Producto.data.attributes.Slug,
      name: data.attributes.Producto.data.attributes.Nombre,
    },
  }
}
export const mapProduct = (data: any): Product => {
  const {
    id,
    attributes: {
      Nombre,
      Descripcion,
      Precio,
      Slug,
      Tiempo_Minimo_Preparacion,
      Tiempo_Minimo_Premium,
      Textos_Requeridos,
      Colores_Requeridos,
      Imagenes,
      Activo,
      Mostrar,
      Categorias_Globos,
      Categorias_Flores,
      Colores,
      Fuentes,
      Destacado,
      Variantes_Producto,
      Colores_Fuente,
      Mostrar_Tipos_Texto,
      Tamanos,
    },
  } = data

  const images: ImageProduct[] = Imagenes.data.map((imageData: any) =>
    mapResponseImage(imageData)
  )

  const categories: ProductCategory[] = [
    ...Categorias_Globos.data.map((categoryData: any) =>
      mapCategory(categoryData)
    ),
    ...Categorias_Flores.data.map((categoryData: any) =>
      mapCategory(categoryData)
    ),
  ]

  const colors: ProductColor[] = Colores.data.map((colorData: any) =>
    mapColor(colorData)
  )

  const fonts: ProductFont[] = Fuentes.data.map((fontData: any) =>
    mapFont(fontData)
  )

  const variants: ProductVariant[] = Variantes_Producto.data.map(
    (variantData: any) => mapVariant(variantData)
  )

  const sizes: ProductSize[] = Tamanos.data.map((sizeData: any) =>
    mapSize(sizeData)
  )

  const requiredTexts: string[] = Textos_Requeridos.split(',').map(
    (text: string) => text.trim()
  )

  const requiredColors: string[] = Colores_Requeridos?.split(',').map(
    (text: string) => text.trim()
  )

  return {
    id,
    name: Nombre,
    description: Descripcion,
    price: Precio,
    images,
    minimumTime: Tiempo_Minimo_Preparacion,
    premiumTime: Tiempo_Minimo_Premium,
    isActive: Activo,
    isFeatured: Destacado,
    slug: Slug,
    categories,
    requiredTexts,
    minimumPremiumTime: Tiempo_Minimo_Premium,
    colors,
    requiredColors,
    fonts,
    show: Mostrar,
    type: ProductTypes.Balloon, // Assuming default product type as Balloon
    showTextTypes: Mostrar_Tipos_Texto,
    variants,
    productSizes: sizes,
    fontColors: Colores_Fuente.data.map((colorData: any) =>
      mapColor(colorData)
    ),
  }
}

export const mapProductsToDefinition = ({ data }: any): Product[] => {
  if (!data || !data.productos || !data.productos.data) {
    throw new Error(
      'Error mapping product data: Unable to retrieve required information.'
    )
  }

  return data.productos.data.map((productData: any) => mapProduct(productData))
}

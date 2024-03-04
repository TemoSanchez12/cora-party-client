import ImageProduct from '@/interfaces/domain/ImageProduct'

// Map image object response to ImageFormat type
const mapImageFormats = (formats: any) => {
  let mappedFormats: any = {}

  Object.keys(formats).forEach(key => {
    const value = { ...formats[key] }
    value.url = process.env.STRAPI_URL + value.url

    mappedFormats[key] = value
  })

  return mappedFormats
}

// Map total image response to ImageProduct type
const mapResponseImage = (data: any): ImageProduct => {
  const { name, formats } = data.attributes

  const imageProduct: ImageProduct = {
    name,
    formats: mapImageFormats(formats),
  }

  return imageProduct
}

export default mapResponseImage

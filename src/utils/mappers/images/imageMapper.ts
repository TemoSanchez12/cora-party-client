import ImageProduct from '@/interfaces/domain/ImageProduct'

// Map image object response to ImageFormat type
const mapImageFormats = (formats: any) => {
  let mappedFormats: any = {}

  Object.keys(formats).forEach(key => {
    const value = formats[key]
    mappedFormats[key] = value
  })

  return mappedFormats
}

// Map total image response to ImageProduct type
const mapResponseImage = (data: any): ImageProduct => {
  console.log('aqui mero ---->' + JSON.stringify(data))
  const { name, formats } = data.attributes

  const imageProduct: ImageProduct = {
    name,
    formats: mapImageFormats(formats),
  }

  return imageProduct
}

export default mapResponseImage

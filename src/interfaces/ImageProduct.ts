interface ImageProduct {
  name: string
  formats: ImageFormats
}

interface ImageFormats {
  extension: string
  url: string
  mime: string
  width: number
  height: number
}

export default ImageProduct

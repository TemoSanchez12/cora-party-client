interface ImageProduct {
  name: string
  formats: {
    large?: ImageFormat
    small?: ImageFormat
    medium?: ImageFormat
    thumbnail?: ImageFormat
  }
  url: string
}

export interface ImageFormat {
  extension: string
  url: string
  mime: string
  width: number
  height: number
}

export default ImageProduct

// Import interface
import ProductFonts, { SampleFontImage } from '@/interfaces/domain/ProductFonts'

const mapSampleImageFont = (font: any): SampleFontImage => ({
  url: `${process.env.STRAPI_URL}${font.url}`,
  height: font.height,
  mime: font.mime,
  name: font.name,
  widht: font.widht,
})

export const mapFontToDefiniton = (data: any): ProductFonts[] =>
  data.map((font: any) => {
    const { id, attributes } = font

    return {
      id,
      name: attributes.Nombre,
      sampleFontImage: mapSampleImageFont(
        attributes.Ejemplo_Fuente.data.attributes.formats.thumbnail
      ),
    }
  })

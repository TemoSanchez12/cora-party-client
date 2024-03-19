import Product from '@/interfaces/domain/Product'
import ProductFonts from '@/interfaces/domain/ProductFonts'
import { useState, useEffect } from 'react'

interface ProductFontPickerProps {
  product: Product
}

const ProductFontPicker = ({ product }: ProductFontPickerProps) => {
  const [type, id] = product.id.split('-')
  const [fonts, setFonts] = useState<ProductFonts[]>()
  const [selectedFont, setSelectedFont] = useState<string>('')

  useEffect(() => {
    const fetchFonts = async () => {
      const response = await fetch(
        `/api/fonts?type=${type}&productId=${id}`
      ).then(res => (res.ok ? res.json() : Promise.reject()))

      const fontsResponse = response.data

      setFonts(fontsResponse)
    }

    fetchFonts()
  }, [id, type])

  const handleFontSelect = (fontId: string) => {
    setSelectedFont(fontId)
  }

  return (
    <div className=''>
      <p className='text-sm text-gray-600 font-bold mb-4'>
        Seleccione una fuente:
      </p>
      <ul className='pl-2'>
        {fonts &&
          fonts.map(font => (
            <li key={font.id} className='flex items-center mb-2'>
              <input
                type='radio'
                id={font.name}
                name='font'
                value={font.name}
                checked={selectedFont === font.name}
                onChange={() => handleFontSelect(font.name)}
                className='mr-2 cursor-pointer'
              />
              <label htmlFor={font.id} className='cursor-pointer'>
                {font.name}
              </label>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ProductFontPicker

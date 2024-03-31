import Product from '@/interfaces/domain/Product'
import ProductFonts from '@/interfaces/domain/ProductFont'
import { useState, useEffect, useContext } from 'react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'

const montserrat = Montserrat({ weight: ['400', '800'], subsets: ['latin'] })

import OrderSpecsContext, {
  OrderSpecsAction,
} from '@/store/order-specs/order-specs'
import { ProductSpecs } from '@/interfaces/orderSpecs/OrderSpecs'

interface ProductFontPickerProps {
  product: Product
}

const ProductFontPicker = ({ product }: ProductFontPickerProps) => {
  const [type, id] = product.id.split('-')
  const [fonts, setFonts] = useState<ProductFonts[]>()
  const { dispatchOrderSpecsAction, orderSpecsState } =
    useContext(OrderSpecsContext)
  const [selectedFont, setSelectedFont] = useState<string>('')

  useEffect(() => {
    const fetchFonts = async () => {
      const response = await fetch(
        `/api/fonts?type=${type}&productId=${id}`
      ).then(res => (res.ok ? res.json() : Promise.reject()))

      const fontsResponse = response.data

      setFonts(fontsResponse)

      const productSpec = orderSpecsState.productSpecs.find(
        spec => spec.id === product.id
      )
      if (productSpec) {
        const fontSpec = productSpec.specs.find(
          spec => spec.name === 'Fuente para textos'
        )
        if (fontSpec) {
          setSelectedFont(fontSpec.value)
        }
      }
    }

    fetchFonts()
  }, [id, type, product.id, orderSpecsState])

  const handleFontSelect = (fontId: string) => {
    const fontSelected = fonts?.find(font => font.id == fontId)

    if (!fontSelected) return
    setSelectedFont(fontSelected.name)

    const productSpec: ProductSpecs = {
      id: product.id,
      name: product.name,
      specs: [
        {
          name: 'Fuente para textos',
          value: fontSelected.name || 'Esta roto',
        },
      ],
    }

    dispatchOrderSpecsAction({
      type: OrderSpecsAction.UPDATE_PRODUCT_SPECS,
      payload: productSpec,
    })
  }

  return (
    <div className={montserrat.className}>
      <p className='text-sm text-gray-600 font-bold mb-4'>
        Seleccione una fuente:
      </p>

      <ul className='pl-2'>
        {fonts &&
          fonts.map(font => (
            <li key={font.id} className='flex  mb-2 items-center'>
              <input
                type='radio'
                id={font.name}
                name='font'
                value={font.name}
                checked={selectedFont === font.name}
                onChange={() => handleFontSelect(font.id)}
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

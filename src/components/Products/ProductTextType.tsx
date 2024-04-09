import { useState, useEffect, useContext } from 'react'
import ProductFonts from '@/interfaces/domain/ProductFont'
import ProductColor from '@/interfaces/domain/ProductColor'
import { Montserrat } from 'next/font/google'
import { OrderSpecsAction } from '@/store/order-specs/order-specs'
import { ProductSpecs } from '@/interfaces/orderSpecs/OrderSpecs'
import OrderSpecsContext from '@/store/order-specs/order-specs'
import Product from '@/interfaces/domain/Product'

const montserrat = Montserrat({
  weight: ['400', '800'],
  subsets: ['latin'],
})

interface ProducTextTypeProps {
  product: Product
}

const ProducTextType = ({ product }: ProducTextTypeProps) => {
  const [fonts, setFonts] = useState<ProductFonts[]>([])
  const [fontColors, setFontColors] = useState<ProductColor[]>([])
  const { dispatchOrderSpecsAction, orderSpecsState } =
    useContext(OrderSpecsContext)
  const [selectedFont, setSelectedFont] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedType, setSelectedType] = useState<'Vinilo' | 'A mano'>(
    'Vinilo'
  )

  useEffect(() => {
    const fetchFonts = async () => {
      const response = await fetch(`/api/fonts?productId=${product.id}`).then(
        res => (res.ok ? res.json() : Promise.reject())
      )

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

    const fetchFontColors = async () => {
      // Aquí se debe cambiar por la llamada correcta para obtener los colores de texto
      // Replace `/api/colors` with the correct API endpoint
      const response = await fetch(`/api/colors?productId=${product.id}`).then(
        res => (res.ok ? res.json() : Promise.reject())
      )

      const colorsResponse = response.data

      setFontColors(colorsResponse)
    }

    fetchFonts()
    fetchFontColors()
  }, [product.id, orderSpecsState])

  const handleFontSelect = (fontId: string) => {
    const fontSelected = fonts.find(font => font.id === fontId)

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

  const handleColorSelect = (colorId: string) => {
    const colorSelected = fontColors.find(color => color.id === colorId)

    if (!colorSelected) return
    setSelectedColor(colorSelected.name)

    const productSpec: ProductSpecs = {
      id: product.id,
      name: product.name,
      specs: [
        {
          name: 'Color del texto',
          value: colorSelected.name || '000000',
        },
      ],
    }

    dispatchOrderSpecsAction({
      type: OrderSpecsAction.UPDATE_PRODUCT_SPECS,
      payload: productSpec,
    })
  }

  const handleTypeSelect = (type: 'Vinilo' | 'A mano') => {
    setSelectedType(type)
    dispatchOrderSpecsAction({
      type: OrderSpecsAction.UPDATE_PRODUCT_SPECS,
      payload: {
        id: product.id,
        name: product.name,
        specs: [{ name: 'Tipo de texto', value: type }],
      },
    })
    if (type === 'A mano') {
      setSelectedFont('')
      setSelectedColor('')
      dispatchOrderSpecsAction({
        type: OrderSpecsAction.UPDATE_PRODUCT_SPECS,
        payload: {
          id: product.id,
          name: product.name,
          specs: [
            { name: 'Fuente para textos', value: '' },
            { name: 'Color del texto', value: '' },
          ],
        },
      })
    }
  }

  return (
    <div className={montserrat.className}>
      <p className='text-sm text-gray-600 font-bold mb-4'>
        Seleccione una opción:
      </p>

      <ul className='pl-2'>
        <li key='Vinilo' className='flex  mb-2 items-center'>
          <input
            type='radio'
            id='vinilo'
            name='type'
            value='Vinilo'
            checked={selectedType === 'Vinilo'}
            onChange={() => handleTypeSelect('Vinilo')}
            className='mr-2 cursor-pointer'
          />
          <label htmlFor='vinilo' className='cursor-pointer'>
            Vinilo
          </label>
        </li>
        <li key='A mano' className='flex  mb-2 items-center'>
          <input
            type='radio'
            id='a-mano'
            name='type'
            value='A mano'
            checked={selectedType === 'A mano'}
            onChange={() => handleTypeSelect('A mano')}
            className='mr-2 cursor-pointer'
          />
          <label htmlFor='a-mano' className='cursor-pointer'>
            A mano
          </label>
        </li>
      </ul>

      {selectedType === 'Vinilo' && (
        <>
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

          <p className='text-sm text-gray-600 font-bold mb-4'>
            Seleccione un color para el texto:
          </p>
          <ul className='pl-2'>
            {fontColors &&
              fontColors.map(color => (
                <li key={color.id} className='flex  mb-2 items-center'>
                  <div
                    className='w-8 h-8 rounded-full cursor-pointer'
                    style={{ backgroundColor: `#${color.hexCode}` }}
                    onClick={() => handleColorSelect(color.id)}
                  ></div>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default ProducTextType

import { useState, useEffect } from 'react'
import ProductColor from '@/interfaces/domain/ProductColor'
import { Montserrat } from 'next/font/google'
import Product from '@/interfaces/domain/Product'

import OrderSpecsContext, {
  OrderSpecsAction,
} from '@/store/order-specs/order-specs'
import { useContext } from 'react'
import { ProductSpecs } from '@/interfaces/orderSpecs/OrderSpecs'

const montserrat = Montserrat({
  weight: ['400', '800', '600'],
  subsets: ['latin'],
})

interface ProductColorsPickerProps {
  product: Product
}

const ProductColorsPicker = ({ product }: ProductColorsPickerProps) => {
  const { dispatchOrderSpecsAction, orderSpecsState } =
    useContext(OrderSpecsContext)

  const [colors, setColors] = useState<ProductColor[]>([])
  const [selectedColors, setSelectedColors] = useState<{
    [key: string]: string
  }>({})

  useEffect(() => {
    const fetchColor = async () => {
      const response = await fetch(`/api/colors?productId=${product.id}`).then(
        res => (res.ok ? res.json() : Promise.reject())
      )

      const colors: ProductColor[] = response.data

      setColors(colors)
    }

    const productSpec = orderSpecsState.productSpecs.find(
      spec => spec.id === product.id
    )
    if (productSpec) {
      productSpec.specs.forEach(spec => {
        setSelectedColors(prevState => ({
          ...prevState,
          [spec.name]: spec.value,
        }))
      })
    }

    fetchColor()
  }, [orderSpecsState, product.id])

  const handleColorSelect = (requiredColor: string, colorValue: string) => {
    setSelectedColors(prevState => ({
      ...prevState,
      [requiredColor]: colorValue,
    }))
    const productSpec: ProductSpecs = {
      id: product.id,
      name: product.name,
      specs: [{ name: requiredColor, value: colorValue }],
    }
    dispatchOrderSpecsAction({
      type: OrderSpecsAction.UPDATE_PRODUCT_SPECS,
      payload: productSpec,
    })
  }

  return (
    <div className={`${montserrat.className}`}>
      <p className='text-sm text-slate-600 font-bold mb-4'>
        Seleccione los colores para
      </p>
      <ul className='pl-2'>
        {product.requiredColors &&
          product.requiredColors.map((requiredColor: string) => (
            <li key={requiredColor} className=''>
              <div className='mb-2 mt-4'>
                <p className='font-semibold text-slate-600 text-sm capitalize'>
                  {requiredColor} : {selectedColors[requiredColor]}
                </p>
              </div>
              <select
                value={selectedColors[requiredColor]}
                onChange={e => handleColorSelect(requiredColor, e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
              >
                <option value=''>Seleccione un color</option>
                {colors.map(color => (
                  <option key={color.id} value={color.name}>
                    {color.name}{' '}
                  </option>
                ))}
              </select>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ProductColorsPicker

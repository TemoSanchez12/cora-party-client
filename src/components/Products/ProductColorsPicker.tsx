import { useState, useEffect } from 'react'
import ProductColor from '@/interfaces/domain/ProductColor'
import BalloonProduct from '@/interfaces/balloons/BalloonProduct'
import { Montserrat } from 'next/font/google'

import OrderSpecsContext, {
  OrderSpecsAction,
} from '@/store/order-specs/order-specs'
import { useContext } from 'react'
import { ProductSpecs } from '@/interfaces/orderSpecs/OrderSpecs'

const montserrat = Montserrat({
  weight: ['400', '800', '600'],
  subsets: ['latin'],
})

interface BalloonColorsPickerProps {
  product: BalloonProduct
}

const BalloonColorsPicker = ({ product }: BalloonColorsPickerProps) => {
  const { dispatchOrderSpecsAction } = useContext(OrderSpecsContext)

  console.log(JSON.stringify(product) + ' aqui mero desde colores')

  const id = product.id.split('-')[1]
  const [colors, setColors] = useState<ProductColor[]>([])
  const [selectedColors, setSelectedColors] = useState<{
    [key: string]: string
  }>({})

  useEffect(() => {
    const fetchColor = async () => {
      const response = await fetch(`/api/colors?productId=${id}`).then(res =>
        res.ok ? res.json() : Promise.reject()
      )

      const colors: ProductColor[] = response.data

      setColors(colors)
    }

    fetchColor()
  }, [id])

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
          product.requiredColors.map(requiredColor => (
            <li key={requiredColor} className=''>
              <div className='mb-2 mt-4'>
                <p className='font-semibold text-slate-600 text-sm capitalize'>
                  {requiredColor} : {selectedColors[requiredColor]}
                </p>
              </div>
              <ul className='flex gap-2'>
                {colors.map(color => (
                  <li key={color.id}>
                    <div
                      className='w-8 border border-slate-500 h-8 rounded-full cursor-pointer'
                      style={{ backgroundColor: `#${color.hexCode}` }}
                      onClick={() =>
                        handleColorSelect(requiredColor, color.name)
                      }
                    ></div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BalloonColorsPicker

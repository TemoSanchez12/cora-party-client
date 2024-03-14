import { useState, useEffect } from 'react'
import ProductColor from '@/interfaces/domain/ProductColor'
import BalloonProduct from '@/interfaces/balloons/BalloonProduct'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['400', '800', '600'],
  subsets: ['latin'],
})

interface BalloonColorsPickerProps {
  product: BalloonProduct
}

const BalloonColorsPicker = ({ product }: BalloonColorsPickerProps) => {
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
  }

  return (
    <div className={`${montserrat.className} mt-10`}>
      <p className='text-sm text-slate-600 font-bold'>
        Seleccione los colores para
      </p>
      <ul className='pl-2 mt-2'>
        {product.requiredColors &&
          product.requiredColors.map(requiredColor => (
            <li key={requiredColor} className=''>
              <div className='mb-2 mt-4'>
                <p className='font-semibold text-slate-600 text-sm'>
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

'use client'

// import dependencies
import { useContext, useEffect, useState } from 'react'

// import context
import ShoppingCarContext from '@/store/shopping-car/shopping-car'

// import components
import ShoppingCarIcon from '../Icons/ShoppingCar'

const ShoppingCarButton = () => {
  const [animateNumber, setAnimateNumber] = useState(false)
  const { shoppingCarState } = useContext(ShoppingCarContext)

  useEffect(() => {
    console.log('entro')
    // Activa la animación cuando cambie el número de productos
    setAnimateNumber(true)

    // Desactiva la animación después de un corto tiempo para que pueda volver a activarse
    const timeoutId = setTimeout(() => {
      setAnimateNumber(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [shoppingCarState.totalProducts])

  return (
    <div className='relative'>
      <div
        className={`w-5 h-5 bg-red-600 rounded-full flex justify-center items-center absolute -top-3 -right-3 duration-300 ease-in-out ${
          shoppingCarState.totalProducts <= 0 && 'translate-y-3 opacity-0'
        } ${animateNumber && '-translate-y-2'}`}
      >
        <span className='text-white translate-y-[-1px]'>
          {shoppingCarState.totalProducts}
        </span>
      </div>

      <ShoppingCarIcon color='#000' />
    </div>
  )
}

export default ShoppingCarButton

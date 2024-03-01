'use client'

// import dependencies
import {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

// import context
import ShoppingCarContext from '@/store/shopping-car/shopping-car'

// import components
import ShoppingCarIcon from '../Icons/ShoppingCar'

interface ShoppingCarButtonProps {
  isShoppingCarOpen: boolean
  setIsShoppingCarOpen: Dispatch<SetStateAction<boolean>>
}

const ShoppingCarButton = ({
  isShoppingCarOpen,
  setIsShoppingCarOpen,
}: ShoppingCarButtonProps) => {
  const [animateNumber, setAnimateNumber] = useState(false)
  const { shoppingCarState } = useContext(ShoppingCarContext)

  useEffect(() => {
    // Activa la animación cuando cambie el número de productos
    setAnimateNumber(true)

    // Desactiva la animación después de un corto tiempo para que pueda volver a activarse
    const timeoutId = setTimeout(() => {
      setAnimateNumber(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [shoppingCarState.totalProducts])

  return (
    <div
      onClick={() => setIsShoppingCarOpen(prev => !prev)}
      className='relative'
    >
      {isShoppingCarOpen && (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-slate-400 opacity-40'></div>
      )}

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

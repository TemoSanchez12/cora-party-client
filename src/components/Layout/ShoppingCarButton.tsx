'use client'

// import dependencies
import { useContext } from 'react'

// import context
import ShoppingCarContext from '@/store/shopping-car/shopping-car'

// import components
import ShoppingCarIcon from '../Icons/ShoppingCar'

const ShoppingCarButton = () => {
  const { shoppingCarState } = useContext(ShoppingCarContext)

  return (
    <div className='relative'>
      {shoppingCarState.products?.length > 0 && (
        <div className='w-5 h-5 bg-red-600 rounded-full flex justify-center items-center absolute -top-3 -right-3'>
          <span className='text-white translate-x-[-1px] translate-y-[-1px]'>
            {shoppingCarState.totalProducts}
          </span>
        </div>
      )}
      <ShoppingCarIcon color='#000' />
    </div>
  )
}

export default ShoppingCarButton

'use client'

// import dependencies
import { useContext } from 'react'
import ShoppingCarContext from '@/store/shopping-car/shopping-car'
import ShoppingCarItem from './ShoppingCarItem'

interface ShoppingCarProps {
  isOpenShoppingCar: boolean
}

const ShoppingCar = ({ isOpenShoppingCar }: ShoppingCarProps) => {
  const { shoppingCarState } = useContext(ShoppingCarContext)

  return (
    <div
      className={`px-6 py-2 bg-white absolute h-shopping-car-heigh w-full right-0 bottom-0 translate-y-full lg:w-1/2 2xl:w-1/3 lg:max-w-96 duration-300 ${
        !isOpenShoppingCar && 'translate-x-full'
      }`}
    >
      <div>
        <ul className='flex flex-col gap-6'>
          {shoppingCarState.products.map(productWrapper => (
            <ShoppingCarItem
              key={productWrapper.product.id}
              productWrapper={productWrapper}
            />
          ))}
        </ul>
      </div>

      <div>Total: {shoppingCarState.totalPrice}</div>
    </div>
  )
}

export default ShoppingCar

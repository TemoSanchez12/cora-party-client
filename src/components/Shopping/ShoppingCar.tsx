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
      className={`px-2 py-2 bg-white absolute h-shopping-car-heigh w-full right-0 bottom-0 translate-y-full sm:w-2/3 md:w-1/2 xl:w-1/3 2xl:max-w-[450px] duration-300 flex flex-col justify-between ${
        !isOpenShoppingCar && 'translate-x-full'
      }`}
    >
      <div>
        <ul className='flex flex-col gap-6 py-10 border-t-2 border-slate-500'>
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

'use client'

import { useContext } from 'react'
import ShoppingCarContext from '@/store/shopping-car/shopping-car'

const ShoppingCar = () => {
  const shoppingCarContext = useContext(ShoppingCarContext)

  return (
    <div className='px-6 py-2 rounded-lg bg-slate-300'>
      <div>Lista de compras</div>

      <div>
        {shoppingCarContext.shoppingCarState.balloons.map(balloon => (
          <li key={balloon.product.id + balloon.type}>
            {balloon.product.name}
            cantidad {balloon.quantity}
          </li>
        ))}
      </div>
    </div>
  )
}

export default ShoppingCar

'use client'

import { useContext } from 'react'
import ShoppingCarContext from '@/store/shopping-car/shopping-car'

const ShoppingCar = () => {
  const shoppingCarContext = useContext(ShoppingCarContext)

  return (
    <div>
      <div>Lista de compras</div>

      <div>
        {shoppingCarContext.shoppingCarState.balloons.map(balloon => (
          <li key={balloon.product.id + balloon.type}>
            {balloon.product.name}
            imprimiendo algo
          </li>
        ))}
      </div>
    </div>
  )
}

export default ShoppingCar

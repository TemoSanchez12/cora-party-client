import ComplementProduct from '@/interfaces/domain/ComplementProduct'
import Product from '@/interfaces/domain/Product'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import ShoppingCarContext, {
  ShoppingCarAction,
} from '@/store/shopping-car/shopping-car'

interface ComplementProps {
  product: Product
}

const Complements = ({ product }: ComplementProps) => {
  const [complements, setComplements] = useState<ComplementProduct[]>()
  const shoppingCar = useContext(ShoppingCarContext)

  const handleAddComplement = (complement: ComplementProduct) => {
    shoppingCar.dispatchShoppingCarAction({
      type: ShoppingCarAction.ADD_COMPLEMENT,
      payload: {
        complement,
        forProductId: product.id,
      },
    })
  }

  return (
    <ul className='ml-5 rounded-lg bg-pink-100 p-4 gap-2 flex-col flex'>
      <div className='p-2 rounded-md bg-blue-200'>Complements:</div>
      {complements &&
        complements.map(complement => (
          <li key={product.id + complement.id}>
            {complement.name} ${complement.price}
            <button
              className='ml-3 p-2 rounded-md bg-red-300'
              onClick={() => handleAddComplement(complement)}
            >
              Agregar
            </button>
          </li>
        ))}
    </ul>
  )
}

export default Complements

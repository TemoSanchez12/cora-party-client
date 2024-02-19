'use client'

import Product from '@/interfaces/Product'
import { useContext } from 'react'
import ShoppingCarContext, {
  ShoppingCarAction,
} from '@/store/shopping-car/shopping-car'
import { ComplementWrapper, ProductWrapper } from '@/interfaces/ShoppingCar'

const ShoppingCar = () => {
  const shoppingCarContext = useContext(ShoppingCarContext)

  const handleEditQuantityCar = (product: Product, value: number) => {
    shoppingCarContext.dispatchShoppingCarAction({
      type: ShoppingCarAction.UPDATE_QUANTITY_PRODUCT,
      payload: {
        product,
        quantity: value,
        total: 0,
        type: 'balloon',
      },
    })
  }
  const handleRemoveProduct = (product: ProductWrapper) => {
    shoppingCarContext.dispatchShoppingCarAction({
      type: ShoppingCarAction.REMOVE_PRODUCT,
      payload: product,
    })
  }

  const handleRemoveComplement = (complement, productId) => {
    const wrapper: ComplementWrapper = {
      complement,
      forProductId: productId,
      productType: 'balloon',
    }

    shoppingCarContext.dispatchShoppingCarAction({
      type: ShoppingCarAction.REMOVE_COMPLEMENT,
      payload: wrapper,
    })
  }

  return (
    <div className='px-6 py-2 rounded-lg bg-slate-300'>
      <div>Lista de compras</div>

      <div>
        {shoppingCarContext.shoppingCarState.balloons.map(balloon => (
          <li
            key={balloon.product.id + balloon.type}
            className='flex gap-2 items-center'
          >
            {balloon.product.name}
            cantidad {balloon.quantity}
            <button
              className='p-2 bg-yellow-300'
              onClick={handleEditQuantityCar.bind(
                null,
                balloon.product,
                balloon.quantity + 1
              )}
            >
              +
            </button>
            <button
              className='p-2 bg-yellow-300'
              onClick={handleEditQuantityCar.bind(
                null,
                balloon.product,
                balloon.quantity - 1
              )}
            >
              -
            </button>
            <p>${balloon.total}</p>
            <button
              className='px-2 py-1 rounded-md bg-red-400'
              onClick={handleRemoveProduct.bind(null, balloon)}
            >
              Remover
            </button>
            <ul className='ml-5 rounded-lg bg-pink-100 p-4 gap-2 flex-col flex'>
              <div className='p-2 rounded-md bg-blue-200'>Complements:</div>
              {balloon.product.complements &&
                balloon.product.complements.map(complement => (
                  <li key={balloon.product.id + complement.id}>
                    {complement.name} ${complement.price}
                    <button
                      onClick={() =>
                        handleRemoveComplement(complement, balloon.product.id)
                      }
                      className='bg-red-200 p-2 ml-2 rounded-lg'
                    >
                      Remover
                    </button>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </div>
      <div>Total: {shoppingCarContext.shoppingCarState.totalPrice}</div>
    </div>
  )
}

export default ShoppingCar

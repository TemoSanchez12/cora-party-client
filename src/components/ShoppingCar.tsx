'use client'

import Product from '@/interfaces/domain/Product'
import { useContext } from 'react'
import ShoppingCarContext, {
  ShoppingCarAction,
} from '@/store/shopping-car/shopping-car'
import {
  ComplementWrapper,
  ProductWrapper,
} from '@/interfaces/shopping/ShoppingCar'
import ComplementProduct from '@/interfaces/domain/ComplementProduct'

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

  const handleRemoveComplement = (
    complement: ComplementProduct,
    productId: string
  ) => {
    const wrapper: ComplementWrapper = {
      complement,
      forProductId: productId,
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
        {shoppingCarContext.shoppingCarState.products.map(productWrapper => (
          <li
            key={productWrapper.product.id}
            className='flex gap-2 items-center flex-col'
          >
            <div>
              {productWrapper.product.name}
              cantidad {productWrapper.quantity}
              <button
                className='p-2 bg-yellow-300'
                onClick={handleEditQuantityCar.bind(
                  null,
                  productWrapper.product,
                  productWrapper.quantity + 1
                )}
              >
                +
              </button>
              <button
                className='p-2 bg-yellow-300'
                onClick={handleEditQuantityCar.bind(
                  null,
                  productWrapper.product,
                  productWrapper.quantity - 1
                )}
              >
                -
              </button>
              <p>${productWrapper.total}</p>
              <button
                className='px-2 py-1 rounded-md bg-red-400'
                onClick={handleRemoveProduct.bind(null, productWrapper)}
              >
                Remover
              </button>
            </div>
            <ul className='ml-5 rounded-lg bg-pink-100 p-4 gap-2 flex-col flex'>
              <div className='p-2 rounded-md bg-blue-200'>Complements:</div>
              {productWrapper.product.complements &&
                productWrapper.product.complements.map(complement => (
                  <li key={productWrapper.product.id + complement.id}>
                    {complement.name} ${complement.price}
                    <button
                      onClick={() =>
                        handleRemoveComplement(
                          complement,
                          productWrapper.product.id
                        )
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

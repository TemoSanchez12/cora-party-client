'use client'

// import dependencies
import { useContext, useEffect, useState } from 'react'

import ShoppingCarContext, {
  ShoppingCarAction,
} from '@/store/shopping-car/shopping-car'

import OrderSpecsContext, {
  OrderSpecsAction,
} from '@/store/order-specs/order-specs'

import ShoppingCarItem from './ShoppingCarItem'

import { Poppins } from 'next/font/google'
import Link from 'next/link'
import OrderSpecs from '@/interfaces/orderSpecs/OrderSpecs'

const poppins = Poppins({ weight: ['400', '600'], subsets: ['latin'] })

interface ShoppingCarProps {
  isOpenShoppingCar: boolean
}

const ShoppingCar = ({ isOpenShoppingCar }: ShoppingCarProps) => {
  const [shippingPrice, setShippingPrice] = useState(0)
  const { shoppingCarState, dispatchShoppingCarAction } =
    useContext(ShoppingCarContext)

  const { orderSpecsState, dispatchOrderSpecsAction } =
    useContext(OrderSpecsContext)

  useEffect(() => {
    const fetchShippingPrice = async () => {
      const response = await fetch('/api/shipping-price').then(res =>
        res.ok ? res.json() : Promise.reject()
      )

      setShippingPrice(response.data)
    }

    fetchShippingPrice()
  }, [])

  // Save shopping car state to local storage when it changes
  useEffect(() => {
    const savedShoppingCarState = localStorage.getItem('shopping-car')

    if (!savedShoppingCarState || shoppingCarState.products.length != 0) {
      localStorage.setItem('shopping-car', JSON.stringify(shoppingCarState))
    }
  }, [shoppingCarState])

  useEffect(() => {
    const savedShoppingCarState = localStorage.getItem('shopping-car')
    if (savedShoppingCarState) {
      dispatchShoppingCarAction({
        type: ShoppingCarAction.SET_SHOPPING_CAR,
        payload: JSON.parse(savedShoppingCarState),
      })
    }
  }, [dispatchShoppingCarAction])

  useEffect(() => {
    const savedOrderSpecsState: OrderSpecs = JSON.parse(
      localStorage.getItem('order-specs') || '{}'
    )

    if (!savedOrderSpecsState || orderSpecsState.productSpecs.length != 0) {
      localStorage.setItem('order-specs', JSON.stringify(orderSpecsState))
    }
  }, [orderSpecsState, shoppingCarState])

  useEffect(() => {
    const savedOrderSpecsState = localStorage.getItem('order-specs')
    if (savedOrderSpecsState) {
      dispatchOrderSpecsAction({
        type: OrderSpecsAction.SET_ORDER_SPECS,
        payload: JSON.parse(savedOrderSpecsState),
      })
    }
  }, [dispatchOrderSpecsAction])

  return (
    <div
      className={`px-2 py-2 bg-white absolute h-shopping-car-heigh w-full right-0 bottom-0 translate-y-full sm:w-2/3 md:w-1/2 xl:w-1/3 2xl:max-w-[450px] duration-300 flex flex-col justify-between shadow-2xl ${
        !isOpenShoppingCar && 'translate-x-full'
      }`}
    >
      <div
        className={`flex flex-col h-full ${
          shoppingCarState.products.length > 0
            ? 'justify-between'
            : 'justify-center'
        }`}
      >
        {shoppingCarState.products.length > 0 ? (
          <>
            <ul className='flex flex-col gap-6 py-10 border-t-2 border-slate-500 overflow-y-scroll no-scrollbar'>
              {shoppingCarState.products.map(productWrapper => (
                <ShoppingCarItem
                  key={productWrapper.product.id}
                  productWrapper={productWrapper}
                />
              ))}
            </ul>
            <div>
              <div className={`${poppins.className} flex flex-col gap-4`}>
                <p className='flex justify-between text-slate-500 text-sm border-b border-slate-400 p-2 border-t'>
                  Subtotal:{' '}
                  <span className='text-slate-700'>
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                    }).format(shoppingCarState.totalPrice)}
                  </span>
                </p>
                <p className='flex justify-between text-slate-500 text-sm border-b border-slate-400 p-2 pt-0'>
                  Costo de envio:{' '}
                  <span className='text-slate-700'>
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                    }).format(shippingPrice)}
                  </span>
                </p>
                <p className='flex justify-between text-slate-500 text-sm border-b border-slate-400 p-2 pt-0'>
                  Total:{' '}
                  <span className='text-slate-700'>
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                    }).format(shoppingCarState.totalPrice + shippingPrice)}
                  </span>
                </p>
              </div>

              <Link
                href='/datos-envio'
                className={`bg-slate-500 p-3 text-xl my-4 w-full text-center text-white rounded-lg flex justify-center ${poppins.className}`}
              >
                Proceder al pago
              </Link>
            </div>
          </>
        ) : (
          <p className='text-center text-xl text-slate-600'>
            No hay productos agregados en el carrito
          </p>
        )}
      </div>
    </div>
  )
}

export default ShoppingCar

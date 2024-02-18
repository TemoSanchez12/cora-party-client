'use client'

import Product from '@/interfaces/Product'
import { ProductWrapper } from '@/interfaces/ShoppingCar'
import { useState, useEffect, useContext } from 'react'
import ShoppingCarContext, {
  ShoppingCarAction,
} from '@/store/shopping-car/shopping-car'

const ShoppingCarTest = () => {
  const shoppingCarContext = useContext(ShoppingCarContext)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/balloons').then(data =>
          data.ok ? data.json() : Promise.reject()
        )

        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleAddProductToCar = (product: Product) => {
    const productWrapper: ProductWrapper = {
      product,
      quantity: 1,
      total: 0,
      type: 'balloon',
    }

    shoppingCarContext.dispatchShoppingCarAction({
      type: ShoppingCarAction.ADD_PRODUCT,
      payload: productWrapper,
    })
  }

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

  return (
    <div className='mt-10 p-5 bg-slate-200 rounded-lg'>
      <p>Prueba de shopping car</p>
      <hr />

      <ul className='gap-2 flex flex-col mt-10'>
        {products.map(product => (
          <li
            className='p-2 bg-slate-400 rounded-md gap-2 flex'
            key={product.id}
          >
            {product.name}
            <button
              className='bg-red-400 p-2'
              onClick={() => handleAddProductToCar(product)}
            >
              Agregar
            </button>

            <button
              className='p-2 bg-yellow-300'
              onClick={handleEditQuantityCar.bind(null, product, 1)}
            >
              +
            </button>

            <button
              className='p-2 bg-yellow-300'
              onClick={handleEditQuantityCar.bind(null, product, -1)}
            >
              -
            </button>
          </li>
        ))}
      </ul>

      <hr />
    </div>
  )
}

export default ShoppingCarTest

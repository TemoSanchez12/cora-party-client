'use client'

import Product from '@/interfaces/domain/Product'
import { ProductWrapper } from '@/interfaces/shopping/ShoppingCar'
import { useState, useEffect, useContext } from 'react'
import Complements from './Complement'
import ShoppingCarContext, {
  ShoppingCarAction,
} from '@/store/shopping-car/shopping-car'
import CheckoutButton from './CheckoutButton'

const ShoppingCarTest = () => {
  const shoppingCarContext = useContext(ShoppingCarContext)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/balloons', { method: 'GET' }).then(
          data => (data.ok ? data.json() : Promise.reject())
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
    }

    shoppingCarContext.dispatchShoppingCarAction({
      type: ShoppingCarAction.ADD_PRODUCT,
      payload: productWrapper,
    })
  }

  return (
    <div className='mt-10 p-5 bg-slate-200 rounded-lg'>
      <p>Prueba de shopping car</p>
      <hr />

      <ul className='gap-2 flex flex-col mt-10'>
        {products.map(product => (
          <li
            className='p-2 bg-slate-400 rounded-md gap-2 flex items-center flex-col'
            key={product.id}
          >
            {product.name}

            <p>Price: ${product.price}</p>
            <button
              className='bg-red-400 p-2'
              onClick={() => handleAddProductToCar(product)}
            >
              Agregar
            </button>

            <Complements product={product} />
          </li>
        ))}
      </ul>

      <hr />

      <CheckoutButton />
    </div>
  )
}

export default ShoppingCarTest

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/balloons').then(
          data => (data.ok ? data.json() : Promise.reject())
        )

        setProducts(response.data) // Asumiendo que la respuesta es un array de productos
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <p>Prueba de shopping car</p>

      <hr />

      <ul>
        {products.map(product => (
          <li key={product.id} onClick={() => handleAddProductToCar(product)}>
            {product.name}
          </li>
        ))}
      </ul>

      <hr />
    </>
  )
}

export default ShoppingCarTest

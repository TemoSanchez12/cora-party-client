'use client'
// import type { Metadata } from 'next'
import { useState, useEffect, useContext } from 'react'
import ShoppingCarContext, {
  ShoppingCarAction,
} from '@/store/shopping-car/shopping-car'

import MainLayout from '../layouts/layout'
import Product from '@/interfaces/Product'
import { ProductWrapper } from '@/interfaces/ShoppingCar'
import ShoppingCar from '@/components/ShoppingCar'

// export const metadata: Metadata = {
//   title: 'Cora Party - Tu Tienda de Globos, Flores y Arreglos Decorativos',
//   description:
//     '¡Descubre la magia de la celebración con Cora Party! Encuentra una amplia selección de globos, flores y arreglos decorativos para hacer de tus eventos momentos inolvidables. Desde elegantes arreglos florales hasta divertidos globos temáticos, en Cora Party tenemos la combinación perfecta para cada ocasión. Celebra con estilo y crea recuerdos inolvidables con nuestros productos de alta calidad. ¡Haz de cada evento una fiesta inolvidable con Cora Party!',
// }

export default function Home() {
  const shoppingCarContext = useContext(ShoppingCarContext)
  const [products, setProducts] = useState<Product[]>([])

  const handleAddProductToCar = (product: Product) => {
    const productWrapper: ProductWrapper = {
      product,
      quantity: 1,
      total: 0,
      type: 'balloon',
    }
    console.log(shoppingCarContext)
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
    <MainLayout>
      <div className='text-red-400'>hola</div>

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

      <ShoppingCar />
    </MainLayout>
  )
}

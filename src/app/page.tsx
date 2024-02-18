// Imports next
import type { Metadata } from 'next'

// Import components
import MainLayout from '../layouts/layout'
import ShoppingCar from '@/components/ShoppingCar'
import ShoppingCarTest from '@/components/TestShoppingCar'

// Import context provider
import { ShoppingCarContextProvider } from '@/store/shopping-car/shopping-car'

export const metadata: Metadata = {
  title: 'Cora Party - Tu Tienda de Globos, Flores y Arreglos Decorativos',
  description:
    '¡Descubre la magia de la celebración con Cora Party! Encuentra una amplia selección de globos, flores y arreglos decorativos para hacer de tus eventos momentos inolvidables. Desde elegantes arreglos florales hasta divertidos globos temáticos, en Cora Party tenemos la combinación perfecta para cada ocasión. Celebra con estilo y crea recuerdos inolvidables con nuestros productos de alta calidad. ¡Haz de cada evento una fiesta inolvidable con Cora Party!',
}

export default function Home() {
  return (
    <ShoppingCarContextProvider>
      <MainLayout>
        <ShoppingCarTest />
        <ShoppingCar />
      </MainLayout>
    </ShoppingCarContextProvider>
  )
}

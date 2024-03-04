// Imports next
import type { Metadata } from 'next'

// import fonts
import { Montserrat } from 'next/font/google'

// Import components
import MainLayout from '../layouts/MainLayout'
import Hero from '@/components/Layout/Hero/Hero'
import BalloonProduct from '@/interfaces/balloons/BalloonProduct'
import ProductCard from '@/components/Products/ProductCard'

const montserrat = Montserrat({ weight: ['400'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cora Party - Tu Tienda de Globos, Flores y Arreglos Decorativos',
  description:
    '¡Descubre la magia de la celebración con Cora Party! Encuentra una amplia selección de globos, flores y arreglos decorativos para hacer de tus eventos momentos inolvidables. Desde elegantes arreglos florales hasta divertidos globos temáticos, en Cora Party tenemos la combinación perfecta para cada ocasión. Celebra con estilo y crea recuerdos inolvidables con nuestros productos de alta calidad. ¡Haz de cada evento una fiesta inolvidable con Cora Party!',
}

export default async function Home() {
  const response = await fetch(process.env.BASE_URL + '/api/balloons').then(
    res => (res.ok ? res.json() : Promise.reject())
  )
  const balloonsFeatured: BalloonProduct[] = response.data.filter(
    (balloon: BalloonProduct) => balloon.isFeatured
  )

  return (
    <MainLayout>
      <Hero />
      <div
        className={`${montserrat.className} flex flex-col items-center my-10`}
      >
        <h4 className='text-3xl'>wow happens here</h4>
        <div>
          <ul>
            {balloonsFeatured.map(balloon => (
              <li key={balloon.id}>
                <ProductCard />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  )
}

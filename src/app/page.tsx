// Imports next
import type { Metadata } from 'next'

// import dependencies
import Link from 'next/link'

// import fonts
import { Montserrat } from 'next/font/google'

// Import components
import MainLayout from '../layouts/MainLayout'
import Hero from '@/components/Layout/Hero/Hero'
import BalloonProduct from '@/interfaces/balloons/BalloonProduct'
import SimpleProductList from '@/components/Products/ProductList'
import { getProductsByType } from '@/retrivers/products'
import { ProductTypes } from '@/interfaces/domain/Product'

const montserrat = Montserrat({ weight: ['500'], subsets: ['latin'] })

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
    (balloon: BalloonProduct) => balloon.isFeatured && balloon.isActive
  )

  const productsByType = getProductsByType(ProductTypes.Balloon)

  return (
    <MainLayout>
      <Hero />
      <section className='w-global-container mx-auto'>
        <div
          className={`${montserrat.className} flex flex-col items-center mt-32 mb-20 `}
        >
          <h4 className='text-3xl text-slate-600 font-medium w-full text-center'>
            Nuestros productos{' '}
            <span className='text-dark-blue'>destacados</span>
          </h4>

          <div className='mt-20'>
            <div className='flex justify-end mb-10'>
              <Link
                href='/globos'
                className={`${montserrat.className} border-b-2 border-dark-blue text-slate-600`}
              >
                Ver todos los globos
              </Link>
            </div>
            <SimpleProductList products={balloonsFeatured} />
          </div>
        </div>

        <div
          className={`${montserrat.className} flex flex-col items-center mb-32`}
        >
          <div className=''>
            <div className='flex justify-end mb-10'>
              <Link
                href='/flores'
                className={`${montserrat.className} border-b-2 border-dark-blue text-slate-600`}
              >
                Ver todas las flores
              </Link>
            </div>
            <SimpleProductList products={balloonsFeatured} />
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

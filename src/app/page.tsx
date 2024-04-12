// Imports next
import type { Metadata } from 'next'

// import dependencies
import Link from 'next/link'

// import fonts
import { Montserrat } from 'next/font/google'

// Import components
import MainLayout from '../layouts/MainLayout'
import Hero from '@/components/Layout/Hero/Hero'
import SimpleProductList from '@/components/Products/ProductList'
import { getProductsByType } from '@/retrivers/products'
import { ProductTypes } from '@/interfaces/domain/Product'

import { getCategoryForType } from '@/retrivers/categories'
import FeaturedCategoriesList from '@/components/Categories/FeaturedCategoriesList'
import TextCategoryList from '@/components/Categories/TextCategoryList'

const montserrat = Montserrat({ weight: ['500'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cora Party - Tu Tienda de Globos, Flores y Arreglos Decorativos',
  description:
    '¡Descubre la magia de la celebración con Cora Party! Encuentra una amplia selección de globos, flores y arreglos decorativos para hacer de tus eventos momentos inolvidables. Desde elegantes arreglos florales hasta divertidos globos temáticos, en Cora Party tenemos la combinación perfecta para cada ocasión. Celebra con estilo y crea recuerdos inolvidables con nuestros productos de alta calidad. ¡Haz de cada evento una fiesta inolvidable con Cora Party!',
}

export default async function Home() {
  const balloonCategories = await getCategoryForType(ProductTypes.Balloon)

  const flowersCategories = await getCategoryForType(ProductTypes.Flower)

  const balloonsFeatured = (
    await getProductsByType(ProductTypes.Balloon)
  ).filter(balloon => balloon.isFeatured)

  const flowersFeatured = (await getProductsByType(ProductTypes.Flower)).filter(
    flower => flower.isFeatured
  )

  return (
    <MainLayout>
      <Hero />
      <div>
        <TextCategoryList categories={balloonCategories} />
      </div>

      <div
        className={`${montserrat.className} flex flex-col items-center mt-32 mb-20 `}
      >
        <div>
          <h1 className='text-3xl mb-10 text-slate-600 font-medium w-full text-center'>
            Nuestras categorias en{' '}
            <span className='text-dark-blue'>Globos mas Top</span>
          </h1>
          <FeaturedCategoriesList
            categories={balloonCategories.filter(category => category.featured)}
            type='globos'
          />
        </div>
        <h4 className='text-3xl mt-20 text-slate-600 font-medium w-full text-center'>
          Nuestros productos <span className='text-dark-blue'>destacados</span>
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

          <div>
            <SimpleProductList products={balloonsFeatured} />
          </div>
        </div>
      </div>

      <section className='w-global-container mx-auto'>
        <div
          className={`${montserrat.className} flex flex-col items-center mb-32`}
        >
          <div className='mb-20'>
            <h1 className='text-3xl mb-10 text-slate-600 font-medium w-full text-center'>
              Nuestras mejores categorias en{' '}
              <span className='text-dark-blue'>Flores</span>
            </h1>
            <FeaturedCategoriesList
              categories={flowersCategories.filter(
                category => category.featured
              )}
              type='globos'
            />
          </div>
          <div className=''>
            <div className='flex justify-end mb-10'>
              <Link
                href='/flores'
                className={`${montserrat.className} border-b-2 border-dark-blue text-slate-600`}
              >
                Ver todas las flores
              </Link>
            </div>
            <SimpleProductList products={flowersFeatured} />
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export const revalidate = 3600

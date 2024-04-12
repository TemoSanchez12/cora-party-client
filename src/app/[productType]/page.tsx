import MainLayout from '@/layouts/MainLayout'

import FeaturedCategoriesList from '@/components/Categories/FeaturedCategoriesList'

import { Montserrat } from 'next/font/google'

import SimpleProductList from '@/components/Products/ProductList'
import Product, { ProductTypes } from '@/interfaces/domain/Product'
import SimpleCategoriesList from '@/components/Categories/SimpleCategoriesList'
import { getProductsByType } from '@/retrivers/products'
import { getCategoryForType } from '@/retrivers/categories'
import { stringToProductType } from '@/utils/productTypes/productTypes'

const montserrat = Montserrat({
  weight: ['400', '500'],
  subsets: ['latin'],
})

const ProductTypePage = async ({ params }: any) => {
  const productFeatured = (
    await getProductsByType(stringToProductType(params.productType))
  ).filter((product: Product) => product.isFeatured)

  const categories = await getCategoryForType(
    stringToProductType(params.productType)
  )

  const featuredCategories = categories.filter(category => category.featured)
  const simpleCategories = categories.filter(category => !category.featured)

  return (
    <MainLayout>
      <div className='mx-auto w-global-container'>
        <h4 className='text-3xl text-slate-600 font-medium w-full text-center mt-10 '>
          Explora nuestras{' '}
          <span className='text-dark-blue capitalize'>
            categorias en {params.productType}
          </span>
        </h4>

        <div className='py-10 mt-10'>
          <p
            className={`${montserrat.className} text-center  text-slate-600 mb-5 border-b border-slate-400 px-10 mx-auto font-medium`}
          >
            Nuestras categorias mas top
          </p>
          {featuredCategories && (
            <FeaturedCategoriesList
              categories={featuredCategories}
              type={params.productType}
            />
          )}
        </div>

        <div className='py-10'>
          <p
            className={`${montserrat.className} text-center  text-slate-600 mb-5 border-b border-slate-400 px-10 mx-auto font-medium`}
          >
            Siempre confiables
          </p>
          {simpleCategories && (
            <SimpleCategoriesList
              categories={simpleCategories}
              type={params.productType}
            />
          )}
        </div>

        <div
          className={`${montserrat.className} flex flex-col items-center mt-32 mb-20 `}
        >
          <h4 className='text-xl text-slate-600 font-medium w-full text-center'>
            Nuestros productos{' '}
            <span className='text-dark-blue'>destacados</span>
          </h4>

          <div className='mt-4'>
            <div className='flex justify-end mb-10'></div>
            <SimpleProductList products={productFeatured} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default ProductTypePage

export const revalidate = 3600

'use client'

// import dependencies
import { useEffect, useState } from 'react'

// import interfaces
import Product from '@/interfaces/domain/Product'

// import layout
import MainLayout from '@/layouts/MainLayout'

// import componentes
import ProductDetail from '@/components/Products/ProductDetail'
import Skeleton from 'react-loading-skeleton'

const ProductDetailPage = ({ params }: any) => {
  const [product, setProduct] = useState<Product | undefined>(undefined)

  useEffect(() => {
    const fetchProduct = async () => {
      const productResponse = await fetch(
        `/api/products?slug=${params.productSlug}`
      ).then(res => (res.ok ? res.json() : Promise.reject()))

      const product: Product = productResponse.data[0]
      setProduct(product)
    }

    fetchProduct()
  }, [params.productSlug, params.productType])

  return (
    <MainLayout>
      {product ? (
        <ProductDetail product={product} />
      ) : (
        <ProductDetailPageSkeleton />
      )}
    </MainLayout>
  )
}

const ProductDetailPageSkeleton = () => {
  return (
    <div className='w-global-container mx-auto my-12'>
      <div className='w-full'>
        <Skeleton />
      </div>
      <div className='md:flex md:gap-4 lg:gap-10'>
        <div className='w-full flex gap-2 mt-2 md:w-1/2'>
          <div className='w-2/12'>
            <div>
              <Skeleton className='h-28' />
            </div>

            <div>
              <Skeleton className='h-28' />
            </div>

            <div>
              <Skeleton className='h-28' />
            </div>
          </div>

          <div className='w-10/12'>
            <Skeleton className='h-96 md:h-128' />
          </div>
        </div>

        <div className='md:w-1/2 mt-4 md:mt-0'>
          <div className='w-full'>
            <Skeleton height={30} />
          </div>

          <div className='w-full mt-4'>
            <Skeleton height={40} />
          </div>

          <div className='w-1/2 mx-auto mt-8'>
            <Skeleton height={70} />
          </div>

          <div className='w-1/2 mt-20'>
            <Skeleton height={20} count={2} />
          </div>

          <div className='w-1/2 mt-20'>
            <div className='flex gap-4'>
              <Skeleton className='w-28 h-44' />
              <Skeleton className='w-28 h-44' />
              <Skeleton className='w-28 h-44' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage

export const dynamic = 'force-dynamic'

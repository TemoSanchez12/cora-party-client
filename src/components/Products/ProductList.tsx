import Product from '@/interfaces/domain/Product'

import ProductCard from './ProductCard'
import Skeleton from 'react-loading-skeleton'

interface SimpleProductListProps {
  products: Product[]
}

const SimpleProductList = ({ products }: SimpleProductListProps) => {
  if (products.length == 0) {
    return <SimpleProductListSkeleton />
  }

  return (
    <ul className='flex flex-wrap gap-20 gap-y-10 w-full mx-auto justify-center'>
      {products.map(product => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

const SimpleProductListSkeleton = () => {
  return (
    <ul className='flex flex-wrap gap-20 w-full mx-auto justify-center'>
      <li>
        <div>
          <div className='w-56'>
            <Skeleton height={320} />

            <div className='mt-4'>
              <Skeleton count={2} />
            </div>
          </div>
        </div>
      </li>

      <li>
        <div>
          <div className='w-56'>
            <Skeleton height={320} />

            <div className='mt-4'>
              <Skeleton count={2} />
            </div>
          </div>
        </div>
      </li>

      <li>
        <div>
          <div className='w-56'>
            <Skeleton height={320} />

            <div className='mt-4'>
              <Skeleton count={2} />
            </div>
          </div>
        </div>
      </li>
    </ul>
  )
}

export default SimpleProductList

import Image from 'next/image'
import Link from 'next/link'

import Product, { ProductSize } from '@/interfaces/domain/Product'
import { productTypeToUrlParam } from '@/utils/productTypes/productTypes'

interface ProductSizesProps {
  product: Product
}

const ProductSizes = ({ product }: ProductSizesProps) => {
  const type = productTypeToUrlParam(product.type)
  return (
    <div className='mt-12'>
      <h3 className='text-xs mb-2 text-slate-600'>Diferentes tamanos</h3>

      <ul className='flex gap-4'>
        {product.variants &&
          product.productSizes.map((size: ProductSize) => (
            <li key={size.id}>
              <Link
                href={`/${type}/${
                  product.categories
                    ? product.categories[0].slug
                    : 'sin-categoria'
                }/${size.product.slug}`}
              >
                <div className='text-center'>
                  <h4 className='text-base text-slate-600 mt-1 truncate'>
                    {size.size}
                  </h4>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ProductSizes

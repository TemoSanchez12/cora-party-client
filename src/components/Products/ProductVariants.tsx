import Image from 'next/image'
import Link from 'next/link'

import Product, { ProductVariant } from '@/interfaces/domain/Product'
import { ProductTypes } from '@/interfaces/domain/Product'
import { productTypeToUrlParam } from '@/utils/productTypes/productTypes'

interface ProductVariantsProps {
  product: Product
}

const ProductVariants = ({ product }: ProductVariantsProps) => {
  const type = productTypeToUrlParam(product.type)
  return (
    <div className='mt-12'>
      <h3 className='text-xs mb-2 text-slate-600'>Mas opciones</h3>

      <ul className='flex gap-4'>
        {product.variants &&
          product.variants.map((variant: ProductVariant) => (
            <li key={variant.id}>
              <Link
                href={`/${type}/${
                  product.categories
                    ? product.categories[0].slug
                    : 'sin-categoria'
                }/${variant.product.slug}`}
              >
                <div className='w-28 text-center'>
                  <div className='w-full'>
                    <Image
                      className='w-full h-44 object-cover'
                      src={variant.image.url}
                      alt={variant.name}
                      width={96}
                      height={176}
                    />
                  </div>
                  <h4 className='text-xs text-slate-500 mt-1 truncate'>
                    {variant.name}
                  </h4>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ProductVariants

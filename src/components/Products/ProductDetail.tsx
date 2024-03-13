import Product from '@/interfaces/domain/Product'
import ProductDetailImages from './ProductDetailImages'

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['800', '400'],
  subsets: ['latin'],
})

interface ProductDetailProps {
  product: Product
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <section className='w-global-container mx-auto my-12'>
      <div>
        <ProductDetailImages product={product} />

        <div className='mt-4 flex items-center'>
          <h2 className={`${montserrat.className} font-bold text-slate-700`}>
            {product.name}
          </h2>

          <span
            className={`${montserrat.className} font-bold ml-2 text-lg text-slate-600`}
          >
            {new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(product.price)}
          </span>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail

import Image from 'next/image'

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ weight: ['400', '600'], subsets: ['latin'] })

import { ProductWrapper } from '@/interfaces/shopping/ShoppingCar'

interface ProductItemProps {
  productWrapper: ProductWrapper
}

const ProductItem = ({ productWrapper }: ProductItemProps) => {
  return (
    <li
      key={productWrapper.product.id}
      className='flex flex-col gap-2 shadow-xl p-2 rounded-xl justify-between border border-gray-100'
    >
      <div className='flex gap-4'>
        <div className='h-44 w-1/3 rounded-lg overflow-hidden'>
          <Image
            className='object-cover w-full h-full'
            src={productWrapper.product.images[0].formats.thumbnail?.url || ''}
            width={200}
            height={300}
            alt={productWrapper.product.name}
          />
        </div>

        <div className='w-2/3 h-full py-2'>
          <div className='flex items-center justify-between border-b-2 border-slate-400 mb-2 pb-2'>
            <p className={`${montserrat.className} text-md`}>
              {productWrapper.product.name}
            </p>
            <span
              className={`${montserrat.className} font-semibold ml-2 text-sm`}
            >
              {new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(productWrapper.total)}
            </span>
          </div>

          <div className=''>
            <p
              className={`ml-2 mt-2 text-gray-600 font-semibold ${montserrat.className}`}
            >
              {productWrapper.product.complements &&
              productWrapper.product.complements.length > 0
                ? 'Complementos :'
                : 'Sin complementos'}
            </p>
            {productWrapper.product.complements &&
              productWrapper.product.complements.length > 0 && (
                <ul
                  className={`rounded-lg ml-2 gap-2 flex-col flex ${montserrat.className}`}
                >
                  {productWrapper.product.complements &&
                    productWrapper.product.complements.map(complement => (
                      <li
                        key={productWrapper.product.id + complement.id}
                        className='flex gap-2 '
                      >
                        <div className='h-12 w-10'>
                          <Image
                            className='object-cover w-full h-full'
                            src={
                              complement.images[0].formats.thumbnail?.url || ''
                            }
                            width={40}
                            height={60}
                            alt={complement.name}
                          />
                        </div>
                        <div className='w-full'>
                          <div className='text-xs text-gray-500 flex items-center justify-between gap-1 w-full'>
                            <span>{complement.name}</span>
                          </div>

                          <div>
                            <span className='text-black text-sm font-semibold'>
                              {new Intl.NumberFormat('es-MX', {
                                style: 'currency',
                                currency: 'MXN',
                              }).format(complement.price)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default ProductItem

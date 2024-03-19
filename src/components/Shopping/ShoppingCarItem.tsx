// Import dependencies
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

// import interfaces
import { ProductWrapper } from '@/interfaces/shopping/ShoppingCar'
import Product from '@/interfaces/domain/Product'
import ComplementProduct from '@/interfaces/domain/ComplementProduct'
import { ComplementWrapper } from '@/interfaces/shopping/ShoppingCar'

// import context
import ShoppingCarContext, {
  ShoppingCarAction,
} from '@/store/shopping-car/shopping-car'

import OrderSpecsContext, {
  OrderSpecsAction,
} from '@/store/order-specs/order-specs'

// import font
import { Montserrat, Poppins } from 'next/font/google'

// import components
import TrashEmptyIcon from '../Icons/TrashEmptyIcon'
import { ProductSpecs } from '@/interfaces/orderSpecs/OrderSpecs'

const montserrat = Montserrat({ weight: ['400', '600'], subsets: ['latin'] })
const poppins = Poppins({ weight: ['400', '600'], subsets: ['latin'] })

interface ShoppingCarItemProps {
  productWrapper: ProductWrapper
}

const ShoppingCarItem = ({ productWrapper }: ShoppingCarItemProps) => {
  const [complementsTotal, setComplementsTotal] = useState(0)
  const { dispatchShoppingCarAction } = useContext(ShoppingCarContext)
  const { dispatchOrderSpecsAction } = useContext(OrderSpecsContext)

  const removeProductSpec = (product: Product) => {
    const productSpecs: ProductSpecs = {
      id: product.id,
      name: product.name,
      specs: [],
    }

    dispatchOrderSpecsAction({
      type: OrderSpecsAction.REMOVE_PRODUCT_SPECS,
      payload: productSpecs,
    })
  }

  const handleEditQuantityCar = (product: Product, value: number) => {
    dispatchShoppingCarAction({
      type: ShoppingCarAction.UPDATE_QUANTITY_PRODUCT,
      payload: {
        product,
        quantity: value,
        total: 0,
        type: 'balloon',
      },
    })

    if (value <= 0) {
      removeProductSpec(product)
    }
  }

  const handleRemoveProduct = (productWrapper: ProductWrapper) => {
    dispatchShoppingCarAction({
      type: ShoppingCarAction.REMOVE_PRODUCT,
      payload: productWrapper,
    })

    removeProductSpec(productWrapper.product)
  }

  const handleRemoveComplement = (
    complement: ComplementProduct,
    productId: string
  ) => {
    const wrapper: ComplementWrapper = {
      complement,
      forProductId: productId,
    }

    dispatchShoppingCarAction({
      type: ShoppingCarAction.REMOVE_COMPLEMENT,
      payload: wrapper,
    })
  }

  useEffect(() => {
    let totalComplement = 0
    productWrapper.product.complements?.forEach(complement => {
      totalComplement += complement.price
    })
    setComplementsTotal(totalComplement)
  }, [
    productWrapper.product.complements,
    productWrapper.product.complements?.length,
  ])

  return (
    <li
      key={productWrapper.product.id}
      className='flex flex-col gap-2 shadow-xl p-2 rounded-xl justify-between border border-gray-100'
    >
      <div className='flex gap-2'>
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

          <div className='flex gap-8 mb-2 items-center mt-4'>
            <div className=' border border-gray-400 rounded-md shadow-sm'>
              <button
                className={`${montserrat.className} py-1 px-2 border-r border-gray-400`}
                onClick={handleEditQuantityCar.bind(
                  null,
                  productWrapper.product,
                  productWrapper.quantity - 1
                )}
              >
                -
              </button>
              <span className={`${montserrat.className} py-1 px-2`}>
                {productWrapper.quantity}
              </span>
              <button
                className={`${montserrat.className} py-1 px-2 border-l border-gray-400`}
                onClick={handleEditQuantityCar.bind(
                  null,
                  productWrapper.product,
                  productWrapper.quantity + 1
                )}
              >
                +
              </button>
            </div>

            <button
              className='flex text-gray-400 gap-1'
              onClick={handleRemoveProduct.bind(null, productWrapper)}
            >
              <TrashEmptyIcon color='rgb(156 163 175 / var(--tw-text-opacity))' />{' '}
              Remove
            </button>
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
                            <button
                              onClick={() =>
                                handleRemoveComplement(
                                  complement,
                                  productWrapper.product.id
                                )
                              }
                            >
                              <TrashEmptyIcon color='rgb(248, 113, 113)' />
                            </button>
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

      <div className='flex justify-end'>
        <p
          className={`text-slate-600 ${poppins.className} border border-slate-500 rounded-xl py-1 px-4`}
        >
          Total:{' '}
          <span className='text-slate-900 font-medium'>
            {new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(productWrapper.total + complementsTotal)}
          </span>
        </p>
      </div>
    </li>
  )
}

export default ShoppingCarItem

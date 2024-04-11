import Product from '@/interfaces/domain/Product'
import ProductDetailImages from './ProductDetailImages'
import React, { useState, useContext, useEffect } from 'react'

import ShoppingCarContext, {
  ShoppingCarAction,
} from '@/store/shopping-car/shopping-car'

import OrderSpecsContext, {
  OrderSpecsAction,
} from '@/store/order-specs/order-specs'

import { ProductSpecs } from '@/interfaces/orderSpecs/OrderSpecs'

import { ProductWrapper } from '@/interfaces/shopping/ShoppingCar'

import ShippingDatePicker from './ShippingDatePicker'

import { Montserrat } from 'next/font/google'
import ComplementProductsPicker from './ComplementProducts'
import Link from 'next/link'
import ProductDetails from './ProductDetails'
import ProductVariants from './ProductVariants'
import ProductSizes from './ProductSizes'
import { productTypeToUrlParam } from '@/utils/productTypes/productTypes'

const montserrat = Montserrat({
  weight: ['800', '400', '500'],
  subsets: ['latin'],
})

interface ProductDetailProps {
  product: Product
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const type = productTypeToUrlParam(product.type)

  const { dispatchShoppingCarAction, shoppingCarState } =
    useContext(ShoppingCarContext)

  const { dispatchOrderSpecsAction } = useContext(OrderSpecsContext)

  const [selectedDate, setSelectedDate] = useState<Date>()
  const [productAdded, setProductAdded] = useState(false)

  useEffect(() => {
    const productSpec: ProductSpecs = {
      id: product.id,
      name: product.name,
      specs: [
        { name: 'Fecha de entrega', value: selectedDate?.toDateString() || '' },
      ],
    }
    dispatchOrderSpecsAction({
      type: OrderSpecsAction.UPDATE_PRODUCT_SPECS,
      payload: productSpec,
    })
  }, [selectedDate, dispatchOrderSpecsAction, product.id, product.name])

  const handleAddProductToCar = (product: Product) => {
    const productWrapper: ProductWrapper = {
      product,
      quantity: 1,
      total: 0,
    }

    dispatchShoppingCarAction({
      type: ShoppingCarAction.ADD_PRODUCT,
      payload: productWrapper,
    })

    const productSpecs: ProductSpecs = {
      id: product.id,
      name: product.name,
      specs: [],
    }

    dispatchOrderSpecsAction({
      type: OrderSpecsAction.ADD_PRODUCT_SPECS,
      payload: productSpecs,
    })
  }

  useEffect(() => {
    const productInShoppingcar: ProductWrapper | undefined =
      shoppingCarState.products.find(
        (prod: ProductWrapper) => product.id === prod.product.id
      )

    setProductAdded(!!productInShoppingcar)
  }, [shoppingCarState.products, product.id])

  return (
    <section
      className={`${montserrat.className} w-global-container mx-auto my-12`}
    >
      <ul className='mb-4 flex gap-4'>
        {product.categories &&
          product.categories.map(category => (
            <li
              key={category.slug}
              className='text-slate-600 border-b border-slate-500'
            >
              <Link href={`/${type}/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
      </ul>

      <div className='md:flex md:gap-4 lg:gap-10'>
        <ProductDetailImages product={product} />
        <div className='md:w-1/2'>
          <div className='mt-4 flex items-center border-b-2 border-slate-400 pb-2 justify-between'>
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

          <div className='w-full text-center mt-2 mb-8'>
            <button
              className='bg-slate-700 text-white py-3 px-2 rounded-lg w-full font-medium flex justify-center'
              disabled={productAdded}
              onClick={() => handleAddProductToCar(product)}
            >
              {productAdded ? 'Producto agregado' : 'Agregar producto'}
            </button>
          </div>

          <ShippingDatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <div>
            <ProductSizes product={product} />
          </div>

          <div>
            <ProductVariants product={product} />
          </div>

          <ComplementProductsPicker product={product} />
        </div>
      </div>

      <div>
        <ProductDetails product={product} />
      </div>

      <div className='mt-16'>
        <p>{product.description}</p>
      </div>
    </section>
  )
}

export default ProductDetail

'use client'

import { useContext, useEffect, useState } from 'react'

import Image from 'next/image'
import Product from '@/interfaces/domain/Product'
import { ProductWrapper } from '@/interfaces/shopping/ShoppingCar'

import { ShoppingCarAction } from '@/store/shopping-car/shopping-car'
import ShoppingCarContext from '@/store/shopping-car/shopping-car'

import { Montserrat, Poppins } from 'next/font/google'
import Link from 'next/link'

const montserrat = Montserrat({
  weight: ['900', '300', '400'],
  subsets: ['latin'],
})

const poppins = Poppins({ weight: ['300'], subsets: ['latin'] })

interface ProductCardProps {
  product: Product
}

type typesForCategoryTypes = {
  balloon: string
  flower: string
  [key: string]: string
}

const typesForCategoryTypes: typesForCategoryTypes = {
  balloon: 'globos',
  flower: 'flores',
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [type, id] = product.id.split('-')
  const [productAdded, setProductAdded] = useState(false)
  const shoppingCarContext = useContext(ShoppingCarContext)

  const handleAddProductToCar = (product: Product) => {
    const productWrapper: ProductWrapper = {
      product,
      quantity: 1,
      total: 0,
    }

    shoppingCarContext.dispatchShoppingCarAction({
      type: ShoppingCarAction.ADD_PRODUCT,
      payload: productWrapper,
    })
  }

  useEffect(() => {
    const productInShoppingcar: ProductWrapper | undefined =
      shoppingCarContext.shoppingCarState.products.find(
        (prod: ProductWrapper) => product.id === prod.product.id
      )

    setProductAdded(!!productInShoppingcar)
  }, [shoppingCarContext.shoppingCarState.products, product.id])

  return (
    <div className='w-40 h-full flex flex-col'>
      <div>
        <div className='w-36 h-52 relative md:w-44 md:h-64'>
          <Image
            src={product.images[0].formats.medium?.url || ''}
            alt={product.name}
            width={140}
            height={200}
            className='object-cover w-full h-full'
          />
          <div className='w-16 h-16 rounded-full bg-white absolute flex border border-slate-100 justify-center items-center top-0 right-0 translate-x-1/3 shadow-2xl'>
            <span
              className={`${poppins.className} font-black text-xs text-slate-700 `}
            >
              {new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
              }).format(product.price)}
            </span>
          </div>

          <div
            className='p-1 absolute bottom-0 w-full pb-0'
            style={{
              background:
                'linear-gradient(0deg, rgba(0,0,0,.8) 0%, rgba(0,0,0,0) 100%)',
            }}
          >
            <span
              className={`text-white font-light text-xs ${poppins.className}`}
            >
              <Link
                href={`/${type}/${
                  product.categories
                    ? product.categories[0].slug
                    : 'sin-categoria'
                }/${product.slug}`}
              >
                ver más
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div
        className={`${montserrat.className} font-normal text-sm md:text-sm mt-2 flex flex-col justify-between h-full`}
      >
        <p>{product.name}</p>
        <button
          className='text-dark-blue mt-1 text-left'
          onClick={() => handleAddProductToCar(product)}
        >
          {!productAdded ? 'Agregar al carrito' : 'Producto agregado'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard

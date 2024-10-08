'use client'

import { useEffect, useState, useContext } from 'react'
import ShoppingCarContext, {
  ShoppingCarAction,
} from '@/store/shopping-car/shopping-car'

import Image from 'next/image'

import Product from '@/interfaces/domain/Product'
import ComplementProduct from '@/interfaces/domain/ComplementProduct'
import PlusIcon from '../Icons/PlusIcon'
import CheckIcon from '../Icons/CheckIcon'
import Skeleton from 'react-loading-skeleton'

interface ComplementProductsPickerProps {
  product: Product
}

const ComplementProductsPicker = ({
  product,
}: ComplementProductsPickerProps) => {
  const [complements, setComplements] = useState<ComplementProduct[]>([])
  const { dispatchShoppingCarAction, shoppingCarState } =
    useContext(ShoppingCarContext)

  useEffect(() => {
    const fetchComplements = async () => {
      const response = await fetch(
        `/api/complements?productId=${product.id}`
      ).then(res => (res.ok ? res.json() : Promise.reject()))

      const complements: ComplementProduct[] = response.data

      setComplements(complements)
    }

    fetchComplements()
  }, [product.id])

  const handleAddComplement = (complement: ComplementProduct) => {
    dispatchShoppingCarAction({
      type: ShoppingCarAction.ADD_COMPLEMENT,
      payload: {
        complement,
        forProductId: product.id,
      },
    })
  }

  return (
    <div className='mt-12'>
      <h3 className='text-xs mb-2 text-slate-600'>
        Complementa tu pedido (opcional)
      </h3>

      <ul className='flex gap-4'>
        {complements ? (
          complements.map(complement => (
            <li key={complement.id}>
              <div className='w-28 text-center'>
                <div className='w-full'>
                  <Image
                    className='w-full h-44 object-cover'
                    src={complement.images[0].url}
                    alt={complement.name}
                    width={96}
                    height={176}
                  />
                </div>
                <h4 className='text-xs text-slate-500 mt-1 truncate'>
                  {complement.name}
                </h4>

                <div className='flex items-center gap-2 justify-between'>
                  <span className='font-bold text-sm text-slate-600'>
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                    }).format(complement.price)}
                  </span>
                  <button
                    className='text-xs text-slate-500  rounded-full bg-slate-400'
                    onClick={() => handleAddComplement(complement)}
                  >
                    {shoppingCarState.products
                      .find(prod => prod.product.id == product.id)
                      ?.product.complements?.find(
                        compl => compl.id == complement.id
                      ) ? (
                      <CheckIcon color='white' height='20' width='20' />
                    ) : (
                      <PlusIcon color='white' height='20' width='20' />
                    )}
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div>
            <div className='w-1/2 mt-20'>
              <div className='flex gap-4'>
                <Skeleton className='w-28 h-44' />
                <Skeleton className='w-28 h-44' />
                <Skeleton className='w-28 h-44' />
              </div>
            </div>
          </div>
        )}
      </ul>
    </div>
  )
}

export default ComplementProductsPicker

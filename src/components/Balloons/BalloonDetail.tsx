'use client'

import BalloonProduct from '@/interfaces/balloons/BalloonProduct'
import Product from '@/interfaces/domain/Product'
import { useState, useEffect } from 'react'
import ProductColorsPicker from '../Products/ProductColorsPicker'
import RequiredTextsPicker from '../Products/ProductRequiredTexts'
import ProductFontPicker from '../Products/ProductFontPicker'

interface BalloonDetailProps {
  product: Product
}

const BalloonDetail = ({ product }: BalloonDetailProps) => {
  const [type, id] = product.id.split('-')
  const [balloon, setBalloon] = useState<BalloonProduct>()

  useEffect(() => {
    const fetchBalloon = async () => {
      const response = await fetch(`/api/balloons?productId=${id}`).then(res =>
        res.ok ? res.json() : Promise.reject()
      )

      const balloon: BalloonProduct = response.data[0]
      setBalloon(balloon)
    }

    fetchBalloon()
  }, [id])

  return (
    <div className='flex flex-col sm:flex-row sm:justify-center mt-16 sm:flex-wrap gap-20'>
      {balloon?.requiredColors && (
        <div>
          && <ProductColorsPicker product={balloon} />
        </div>
      )}

      {balloon?.requiredTexts && (
        <div>
          <RequiredTextsPicker requiredTexts={balloon.requiredTexts} />
        </div>
      )}

      <div>{<ProductFontPicker product={product} />}</div>

      <div>
        <p>{product.description}</p>
      </div>
    </div>
  )
}

export default BalloonDetail

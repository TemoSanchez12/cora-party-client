'use client'

import BalloonProduct from '@/interfaces/balloons/BalloonProduct'
import Product from '@/interfaces/domain/Product'
import { useState, useEffect } from 'react'
import ProductColorsPicker from '../Products/ProductColorsPicker'

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
    <div>
      {balloon?.requiredColors && <ProductColorsPicker product={balloon} />}
      <div></div>
    </div>
  )
}

export default BalloonDetail

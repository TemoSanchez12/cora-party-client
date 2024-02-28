'use client'

import Product from '@/interfaces/domain/Product'

interface BalloonDetailProps {
  product: Product
}

const BalloonDetail = ({ product }: BalloonDetailProps) => {
  return (
    <div>
      <p>{product.name}</p>
    </div>
  )
}

export default BalloonDetail

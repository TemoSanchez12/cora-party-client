'use client'

import Product from '@/interfaces/domain/Product'
import ProductColorsPicker from './ProductColorsPicker'
import RequiredTextsPicker from './ProductRequiredTexts'
import ProductFontPicker from './ProductFontPicker'

interface BalloonDetailProps {
  product: Product
}

const ProductDetails = ({ product }: BalloonDetailProps) => {
  return (
    <div className='flex flex-col sm:flex-row sm:justify-center mt-16 sm:flex-wrap gap-20'>
      {product.requiredColors && (
        <div>
          <ProductColorsPicker product={product} />
        </div>
      )}

      {product.requiredTexts && (
        <div>
          <RequiredTextsPicker
            product={product}
            requiredTexts={product.requiredTexts}
          />
        </div>
      )}

      <div>{<ProductFontPicker product={product} />}</div>

      <div>
        <p>{product.description}</p>
      </div>
    </div>
  )
}

export default ProductDetails

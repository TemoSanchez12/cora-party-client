'use client'

import Product from '@/interfaces/domain/Product'
import ProductColorsPicker from './ProductColorsPicker'
import RequiredTextsPicker from './ProductRequiredTexts'
import ProductFontPicker from './ProductFontPicker'
import ProductTextType from './ProductTextType'

interface ProductDetailsProps {
  product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
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

      {product.showTextTypes && <ProductTextType product={product} />}
    </div>
  )
}

export default ProductDetails

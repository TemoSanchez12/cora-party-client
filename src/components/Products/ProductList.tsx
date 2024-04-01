import Product from '@/interfaces/domain/Product'

import ProductCard from './ProductCard'

interface SimpleProductListProps {
  products: Product[]
}

const SimpleProductList = ({ products }: SimpleProductListProps) => {
  console.log(products)
  return (
    <ul className='flex flex-wrap gap-20 gap-y-10 w-full mx-auto justify-center'>
      {products.map(product => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

export default SimpleProductList

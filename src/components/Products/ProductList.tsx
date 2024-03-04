import Product from '@/interfaces/domain/Product'

import ProductCard from './ProductCard'

interface SimpleProductListProps {
  products: Product[]
}

const SimpleProductList = ({ products }: SimpleProductListProps) => {
  return (
    <ul className='flex flex-wrap gap-5 gap-y-10 w-full md:gap-20 lg:gap-32'>
      {products.map(product => (
        <li key={product.id} className='mx-auto'>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

export default SimpleProductList

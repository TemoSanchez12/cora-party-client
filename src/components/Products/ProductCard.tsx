import Product from '@/interfaces/domain/Product'

const ProductCard = (product: Product) => {
  return <div>{product.name}</div>
}

export default ProductCard

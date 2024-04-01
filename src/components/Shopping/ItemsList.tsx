import { ShoppingCar } from '@/interfaces/shopping/ShoppingCar'
import ProductItem from './ProductItem'

interface ItemsListProps {
  shoppingCar: ShoppingCar
}

const ItemsList = ({ shoppingCar }: ItemsListProps) => {
  return (
    <div>
      <ul className='flex flex-col gap-10 my-10'>
        {shoppingCar &&
          shoppingCar.products.map(productWrapper => (
            <ProductItem
              productWrapper={productWrapper}
              key={productWrapper.product.id}
            />
          ))}
      </ul>
    </div>
  )
}

export default ItemsList

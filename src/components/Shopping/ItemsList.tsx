import { ShoppingCar } from '@/interfaces/shopping/ShoppingCar'
import ProductItem from './ProductItem'

interface ItemsListProps {
  shoppingCar: ShoppingCar
}

const ItemsList = ({ shoppingCar }: ItemsListProps) => {
  console.log(shoppingCar)

  return (
    <div>
      <ul>
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

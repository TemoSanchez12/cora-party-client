import { RedirectType, redirect } from 'next/navigation'
import { useContext } from 'react'
import ShoppingCarContext from '@/store/shopping-car/shopping-car'
import Link from 'next/link'

const CheckoutButton = () => {
  const shoppingCar = useContext(ShoppingCarContext)

  const handleCheckout = () => {
    const shoppingCarItems = shoppingCar.shoppingCarState
    localStorage.setItem('shoppingCar', JSON.stringify(shoppingCarItems))
  }

  return (
    <button
      onClick={handleCheckout}
      className='px-2 py-1 rounded-md bg-green-300 mt-3 flex'
    >
      <Link href='/checkout'>Checkout</Link>
    </button>
  )
}

export default CheckoutButton

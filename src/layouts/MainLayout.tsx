import '../styles/globals.css'
import Navbar from '@/components/Layout/Navbar/Navbar'
import Footer from '@/components/Layout/Navbar/Footer'

// Import context provider
import { ShoppingCarContextProvider } from '@/store/shopping-car/shopping-car'
import { OrderSpecsContextProvider } from '@/store/order-specs/order-specs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OrderSpecsContextProvider>
      <ShoppingCarContextProvider>
        <Navbar />
        {children}
        <Footer />
      </ShoppingCarContextProvider>
    </OrderSpecsContextProvider>
  )
}

import '../styles/globals.css'
import Navbar from '@/components/Layout/Navbar/Navbar'
import Footer from '@/components/Layout/Navbar/Footer'

// Import context provider
import { ShoppingCarContextProvider } from '@/store/shopping-car/shopping-car'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='pt-[120px]'>
        <ShoppingCarContextProvider>
          <Navbar />
          {children}
          <Footer />
        </ShoppingCarContextProvider>
      </body>
    </html>
  )
}

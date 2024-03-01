import '../styles/globals.css'
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'

// Import context provider
import { ShoppingCarContextProvider } from '@/store/shopping-car/shopping-car'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='bg-slate-500 pt-[120px]'>
        <ShoppingCarContextProvider>
          <Navbar />
          {children}
          <Footer />
        </ShoppingCarContextProvider>
      </body>
    </html>
  )
}

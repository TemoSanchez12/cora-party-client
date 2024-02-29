import Navbar from '@/components/Layout/Navbar'
import '../styles/globals.css'
// Import context provider
import { ShoppingCarContextProvider } from '@/store/shopping-car/shopping-car'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='bg-slate-500'>
        <ShoppingCarContextProvider>
          <Navbar />
          {children}
        </ShoppingCarContextProvider>
      </body>
    </html>
  )
}

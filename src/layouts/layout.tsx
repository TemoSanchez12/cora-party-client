import '../styles/globals.css'
import { ShoppingCarContextProvider } from '@/store/shopping-car/shopping-car'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <ShoppingCarContextProvider>
        <body className='bg-slate-500'>{children}</body>
      </ShoppingCarContextProvider>
    </html>
  )
}

import 'react-loading-skeleton/dist/skeleton.css'

export const metadata = {
  title: 'Cora Party - Globos, flores y mas',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='pt-[120px]'>
        <div id='modal'></div>
        {children}
      </body>
    </html>
  )
}

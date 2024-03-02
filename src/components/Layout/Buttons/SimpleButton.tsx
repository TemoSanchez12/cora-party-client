import Link from 'next/link'

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ weight: '400', subsets: ['latin'] })

interface SimpleButtonProps {
  text: string
  href: string
}

const SimpleButton = ({ text, href }: SimpleButtonProps) => {
  return (
    <button
      className={`${montserrat.className} border border-dark-blue rounded-lg py-1 px-2`}
    >
      <Link className='text-dark-blue' href={href}>
        {text}
      </Link>
    </button>
  )
}

export default SimpleButton

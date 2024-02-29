// import dependencies
import Link from 'next/link'

// import font
import { Montserrat } from 'next/font/google'

// import contants
import Routes from '@/constans/routes'
import NavigationLink from './NavigationLink'

const montserrat = Montserrat({ weight: ['400', '600'], subsets: ['cyrillic'] })

interface NavigationLinksProps {
  isMenuOpen: boolean
  isMobile: boolean
}

const NavigationLinks = ({ isMenuOpen, isMobile }: NavigationLinksProps) => {
  const links = []

  for (const key in Routes) {
    links.push(
      <NavigationLink
        key={Routes[key].route}
        isMobile={isMobile}
        nameRoute={Routes[key].name}
        route={Routes[key].route}
      />
    )
  }

  return (
    <nav
      className={`${
        isMobile
          ? 'md:hidden absolute bottom-0 right-0 bg-white w-full duration-300'
          : 'hidden md:block'
      }  gap-4 items-center z-10  ${
        isMenuOpen && isMobile && 'translate-y-full'
      }`}
    >
      <ul
        className={`${
          isMobile ? 'w-10/12 mx-auto flex flex-col gap-3 pb-6' : ' flex gap-6'
        } ${montserrat.className}`}
      >
        {links}
      </ul>
    </nav>
  )
}

export default NavigationLinks

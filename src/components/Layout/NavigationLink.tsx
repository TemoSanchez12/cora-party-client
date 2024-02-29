import Link from 'next/link'

import ArrowTopRightIcon from '../Icons/ArrowToprRightIcon'

interface NavigationLinkProps {
  route: string
  nameRoute: string
  isMobile: boolean
}

const productRoutes: string[] = ['/globos', '/flores']

const NavigationLink = ({
  route,
  isMobile,
  nameRoute,
}: NavigationLinkProps) => {
  return (
    <li
      className={`py-1 ${
        productRoutes.includes(route) && 'text-dark-blue font-semibold'
      }`}
    >
      <Link
        href={route}
        className={`flex justify-between ${
          isMobile && 'border-b-2 border-dark-blue pb-1 px-3'
        }`}
      >
        <span>{nameRoute}</span>
        {isMobile && <ArrowTopRightIcon color='#5287c3' />}
      </Link>
    </li>
  )
}

export default NavigationLink

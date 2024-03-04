import Link from 'next/link'

interface FooterNavLinkProps {
  route: string
  nameRoute: string
}

const FooterNavLink = ({ route, nameRoute }: FooterNavLinkProps) => {
  return (
    <li className=''>
      <Link href={route} className=''>
        <span>{nameRoute}</span>
      </Link>
    </li>
  )
}

export default FooterNavLink

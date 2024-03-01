import Image from 'next/image'

import FooterNavLink from './FooterNavLink'
import isotipo from '../../../public/images/domain/logotipo-cora-isotipo.png'
import { Inter } from 'next/font/google'

import { InfoFooterRoutes } from '@/constans/routes'

const inter = Inter({ weight: ['300', '600'], subsets: ['latin'] })

const Footer = () => {
  const infoLinks = []

  for (const key in InfoFooterRoutes) {
    infoLinks.push(
      <FooterNavLink
        key={InfoFooterRoutes[key].route}
        nameRoute={InfoFooterRoutes[key].name}
        route={InfoFooterRoutes[key].route}
      />
    )
  }

  return (
    <>
      <footer className='bg-black py-12 px-12'>
        <div className='flex md:flex-row flex-col-reverse items-center gap-9 justify-between'>
          <div className='max-w-40 w-full'>
            <Image
              src={isotipo}
              alt='Cora Party - Expertos en decoracion y regalos'
            />
          </div>

          <div
            className={`text-white text-center md:text-left ${inter.className}`}
          >
            <h4 className='font-semibold text-xl'>Informacion</h4>
            <ul className='flex flex-col gap-2 font-light'>{infoLinks}</ul>
          </div>

          <div
            className={`text-white text-center md:text-left ${inter.className}`}
          >
            <h4 className='font-semibold text-xl'>Contacto</h4>
            <ul className='flex flex-col gap-2 font-light'>
              <li>WhatsApp 492 105 7860</li>
              <li>Tel 492 870 6966</li>
              <li>Email hola@cora.com</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

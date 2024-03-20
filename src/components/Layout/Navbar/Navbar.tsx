'use client'

// Import dependencies
import { useState } from 'react'
import Image from 'next/image'

// Import componets
import logo from '../../../../public/images/domain/logotipo-cora-party.png'
import FacebookIcon from '../../Icons/FacebookIcon'
import InstagramIcon from '../../Icons/InstagramIcon'
import BurgerMenuButton from './BurgerMenuButton'
import ShoppingCarButton from '../../Shopping/ShoppingCarButton'
import NavigationLinks from './NavigationLinks'
import ShoppingCar from '../../Shopping/ShoppingCar'
import Link from 'next/link'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShoppingCarOpen, setShoppingCarOpen] = useState(false)

  return (
    <div className='bg-white w-full fixed top-0 z-10'>
      <div className='relative z-20 bg-white'>
        <div className='bg-black py-2 flex justify-end px-6'>
          <div className='flex gap-4 h-6'>
            <InstagramIcon />
            <FacebookIcon />
            <FacebookIcon />
          </div>
        </div>

        <div className='w-global-container mx-auto h-20 flex items-center justify-between'>
          <div className='w-24'>
            <Link href='/'>
              <Image
                src={logo}
                alt='Cora Party - Especialistas en decoraciones y regalos'
              />
            </Link>
          </div>

          <div className='flex items-center gap-6'>
            <NavigationLinks isMenuOpen={isMenuOpen} isMobile={false} />
            <ShoppingCarButton
              isShoppingCarOpen={isShoppingCarOpen}
              setIsShoppingCarOpen={setShoppingCarOpen}
            />
            <BurgerMenuButton
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </div>
      </div>
      <NavigationLinks isMenuOpen={isMenuOpen} isMobile={true} />
      <ShoppingCar isOpenShoppingCar={isShoppingCarOpen} />
    </div>
  )
}

export default Navbar

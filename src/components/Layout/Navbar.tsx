'use client'

// Import dependencies
import Image from 'next/image'
import { useState } from 'react'

// Import componets
import logo from '../../../public/images/domain/logotipo-cora-party.png'
import FacebookIcon from '../Icons/FacebookIcon'
import InstagramIcon from '../Icons/InstagramIcon'
import BurgerMenuButton from './BurgerMenuButton'
import ShoppingCarButton from './ShoppingCarButton'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className='bg-white w-full'>
      <div className='bg-black py-2 flex justify-end px-6'>
        <div className='flex gap-4 h-6'>
          <InstagramIcon />
          <FacebookIcon />
          <FacebookIcon />
        </div>
      </div>

      <div className='w-global-container mx-auto h-20 flex items-center justify-between'>
        <div className='w-24'>
          <Image
            src={logo}
            alt='Cora Party - Especialistas en decoraciones y regalos'
          />
        </div>

        <div className='flex items-center gap-4'>
          <nav></nav>
          <ShoppingCarButton />
          <BurgerMenuButton
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>
    </div>
  )
}

export default Navbar

import { Dispatch, SetStateAction } from 'react'

interface BurgerMenuButtonProps {
  isMenuOpen: boolean
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

const BurgerMenuButton = ({
  isMenuOpen,
  setIsMenuOpen,
}: BurgerMenuButtonProps) => {
  const handleBurgerMenuClick = () => {
    setIsMenuOpen(prev => !prev)
  }

  return (
    <div
      className='md:hidden flex flex-col gap-3 cursor-pointer'
      onClick={handleBurgerMenuClick}
    >
      <div
        className={`h-1 w-8 rounded-full bg-dark-blue transition duration-500 ease-in-out ${
          isMenuOpen ? 'rotate-45 translate-y-2' : ''
        }`}
      ></div>

      <div
        className={`h-1 w-8 rounded-full bg-dark-blue transition duration-500 ease-in-out ${
          isMenuOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      ></div>
    </div>
  )
}

export default BurgerMenuButton

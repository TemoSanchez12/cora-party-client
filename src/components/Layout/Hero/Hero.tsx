import Link from 'next/link'
import Image from 'next/image'
import HeroBanner from '@/interfaces/domain/HeroBanner'
import { getHeroBanner } from '@/retrivers/heroBanner'

const Hero = async () => {
  const heroBanner: HeroBanner = await getHeroBanner()

  return (
    <header className=''>
      <Link href={heroBanner.link}>
        <Image
          src={heroBanner.image.formats.large?.url || ''}
          alt=''
          className='object-cover w-full'
          quality={100}
          width={1600}
          height={569}
          priority={true}
        />
      </Link>
    </header>
  )
}

export default Hero

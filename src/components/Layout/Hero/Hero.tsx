import Link from 'next/link'
import Image from 'next/image'
import HeroBanner from '@/interfaces/domain/HeroBanner'

const Hero = async () => {
  const response = await fetch(process.env.BASE_URL + '/api/heroBanner').then(
    res => {
      return res.ok ? res.json() : Promise.reject()
    }
  )

  const heroBanner: HeroBanner = response.data

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

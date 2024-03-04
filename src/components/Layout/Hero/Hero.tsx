import Link from 'next/link'
import Image from 'next/image'
import HeroBanner from '@/interfaces/domain/HeroBanner'

const Hero = async () => {
  const response = await fetch(process.env.BASE_URL + '/api/heroBanner').then(
    res => (res.ok ? res.json() : Promise.reject())
  )

  const heroBanner: HeroBanner = response.data

  return (
    <header className='aspect-video relative'>
      <Link href={heroBanner.link}>
        <Image
          src={heroBanner.image.formats.large?.url || ''}
          alt=''
          fill={true}
          className='object-cover'
        />
      </Link>
    </header>
  )
}

export default Hero

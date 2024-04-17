import Image from 'next/image'

import MainLayout from '@/layouts/MainLayout'
import logoLab from '../../../public/images/domain/boxes.jpg'

import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['400', '500', '800'], subsets: ['latin'] })

const AboutUsPage = () => {
  return (
    <MainLayout>
      <div className={poppins.className}>
        <div className='mt-28 w-global-container mx-auto'>
          <h3 className='text-3xl text-center'>Sobre nosotros</h3>
        </div>

        <div className='w-global-container mx-auto mb-40 mt-20 flex flex-col gap-8 md:flex-row max-w-[800px] items-center'>
          <div className='md:w-1/2'>
            <h4 className='text-lg mb-2 text-slate-700'>Nuestra misión</h4>
            <p className='text-slate-600'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              amet perferendis quasi beatae sunt consequatur aspernatur vel
              ullam officia? Consectetur sequi ratione dicta quidem non.
              Molestiae nihil eos ipsum consequuntur
            </p>
            <p className='text-slate-600 mt-5'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              amet perferendis quasi beatae sunt consequatur aspernatur vel
              ullam officia? Consectetur sequi ratione dicta quidem non.
              Molestiae nihil eos ipsum consequuntur
            </p>
          </div>

          <div className='grid grid-cols-2 grid-rows-2 gap-4 md:w-1/2'>
            <div className='h-48'>
              <Image
                className='w-full h-full object-cover'
                src={logoLab}
                alt=''
                width={700}
                height={800}
              />
            </div>
            <div className='h-48'>
              <Image
                className='w-full h-full object-cover'
                src={logoLab}
                alt=''
                width={700}
                height={800}
              />
            </div>
            <div className='col-span-2 row-start-2 h-48'>
              <Image
                className='w-full h-full object-cover'
                src={logoLab}
                alt=''
                width={700}
                height={800}
              />
            </div>
          </div>
        </div>

        <div className='mx-auto my-20 py-20' style={{ background: '#6882A9' }}>
          <div>
            <h4 className='text-center text-xl text-white'>
              Trabajamos con los mejores
            </h4>

            <div className='flex justify-center gap-8 mt-16 flex-wrap w-global-container mx-auto'>
              <div className='w-28 aspect-square'>
                <Image
                  src={logoLab}
                  className='w-full h-full object-cover object-center rounded-xl'
                  alt='Farmacia especializada Zacatecas'
                  width={300}
                  height={300}
                />
              </div>
              <div className='w-28 aspect-square'>
                <Image
                  src={logoLab}
                  className='w-full h-full object-cover object-center rounded-xl'
                  alt='Farmacia especializada Zacatecas'
                  width={300}
                  height={300}
                />
              </div>
              <div className='w-28 aspect-square'>
                <Image
                  src={logoLab}
                  className='w-full h-full object-cover object-center rounded-xl'
                  alt='Farmacia especializada Zacatecas'
                  width={300}
                  height={300}
                />
              </div>
              <div className='w-28 aspect-square'>
                <Image
                  src={logoLab}
                  className='w-full h-full object-cover object-center rounded-xl'
                  alt='Farmacia especializada Zacatecas'
                  width={300}
                  height={300}
                />
              </div>
              <div className='w-28 aspect-square'>
                <Image
                  src={logoLab}
                  className='w-full h-full object-cover object-center rounded-xl'
                  alt='Farmacia especializada Zacatecas'
                  width={300}
                  height={300}
                />
              </div>
              <div className='w-28 aspect-square'>
                <Image
                  src={logoLab}
                  className='w-full h-full object-cover object-center rounded-xl'
                  alt='Farmacia especializada Zacatecas'
                  width={300}
                  height={300}
                />
              </div>
              <div className='w-28 aspect-square'>
                <Image
                  src={logoLab}
                  className='w-full h-full object-cover object-center rounded-xl'
                  alt='Farmacia especializada Zacatecas'
                  width={300}
                  height={300}
                />
              </div>
              <div className='w-28 aspect-square'>
                <Image
                  src={logoLab}
                  className='w-full h-full object-cover object-center rounded-xl'
                  alt='Farmacia especializada Zacatecas'
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='w-global-container mx-auto mb-40 mt-20 flex flex-col gap-8 md:flex-row max-w-[800px] items-center'>
          <div className='md:w-1/2'>
            <h4 className='text-lg mb-2 text-slate-700'>Nuestra misión</h4>
            <p className='text-slate-600'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              amet perferendis quasi beatae sunt consequatur aspernatur vel
              ullam officia? Consectetur sequi ratione dicta quidem non.
              Molestiae nihil eos ipsum consequuntur
            </p>
            <p className='text-slate-600 mt-5'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              amet perferendis quasi beatae sunt consequatur aspernatur vel
              ullam officia? Consectetur sequi ratione dicta quidem non.
              Molestiae nihil eos ipsum consequuntur
            </p>
          </div>

          <div className='md:w-1/2'>
            <div className='h-48'>
              <Image
                className='w-full h-full object-cover'
                src={logoLab}
                alt=''
                width={700}
                height={800}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AboutUsPage

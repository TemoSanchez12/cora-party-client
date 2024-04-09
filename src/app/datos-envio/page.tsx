import MainLayout from '@/layouts/MainLayout'

import boxesImage from '../../../public/images/domain/boxes.jpg'

import Image from 'next/image'

import { Montserrat } from 'next/font/google'
import FormsContainer from '@/components/Shipping/FormsContainer'
const montserrat = Montserrat({ weight: ['400', '600'], subsets: ['latin'] })

const PaymentMethodPage = () => {
  return (
    <MainLayout>
      <div>
        <div>
          {' '}
          <div
            className={`${montserrat.className} w-global-container mx-auto p-10 rounded-xl shadow-xl my-10 lg:flex lg:justify-center items-center lg:gap-10 mb-40 mt-20`}
          >
            <div className='h-64 md:h-96 rounded-t-xl lg:rounded-b-xl overflow-hidden lg:h-full lg:w-1/2'>
              <Image
                className='object-cover h-full w-full object-bottom'
                src={boxesImage}
                alt='Confimar datos de envio Cora Party'
                width={700}
                height={500}
                priority
              />
            </div>

            <div>
              <FormsContainer />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PaymentMethodPage

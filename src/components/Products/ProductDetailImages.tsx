import Product from '@/interfaces/domain/Product'
import Image from 'next/image'

import { useState } from 'react'

interface ProductDetailImagesProps {
  product: Product
}

const ProductDetailImages = ({ product }: ProductDetailImagesProps) => {
  const [activeImage, setActiveImage] = useState(product.images[0])

  return (
    <div className='flex gap-2 h-96'>
      <div className='w-2/12 h-full'>
        <ul className='h-96 overflow-scroll w-full flex flex-col gap-2'>
          {product.images.map(image => (
            <li
              key={image.url}
              className='list-none w-full h-20'
              onClick={() => setActiveImage(image)}
            >
              <Image
                src={image.url}
                alt={image.name}
                width={80}
                height={160}
                className='h-full w-full object-cover'
              />
            </li>
          ))}
        </ul>
      </div>
      <div className='w-10/12 h-full'>
        <Image
          className='w-full h-full object-cover'
          src={activeImage.url}
          alt={activeImage.name}
          height={700}
          width={500}
        />
      </div>
    </div>
  )
}

export default ProductDetailImages

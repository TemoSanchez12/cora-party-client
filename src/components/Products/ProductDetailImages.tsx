import Product from '@/interfaces/domain/Product'
import Image from 'next/image'

import { useState } from 'react'

interface ProductDetailImagesProps {
  product: Product
}

const ProductDetailImages = ({ product }: ProductDetailImagesProps) => {
  const [activeImage, setActiveImage] = useState(product.images[0])

  return (
    <div className='flex gap-2 md:w-1/2 justify-center h-96 md:h-128'>
      <div className='w-2/12 h-full'>
        <ul className='overflow-y-scroll w-full h-full no-scrollbar'>
          {product.images.map(image => (
            <li
              key={image.url}
              className='list-none w-full h-28 aspect-product-image mb-2'
              onClick={() => setActiveImage(image)}
            >
              <Image
                className='object-cover cursor-pointer w-full h-full'
                src={image.url}
                alt={image.name}
                width={80}
                height={160}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className='w-10/12 aspect-product-image h-full'>
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

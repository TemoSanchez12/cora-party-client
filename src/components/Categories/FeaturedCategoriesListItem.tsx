import ProductCategory from '@/interfaces/domain/ProductCategory'
import Image from 'next/image'
import Link from 'next/link'

import { Poppins } from 'next/font/google'
import { productTypeToUrlParam } from '@/utils/productTypes/productTypes'

const poppins = Poppins({ weight: '500', subsets: ['latin'] })

interface FeaturedCategoriesListItemProps {
  category: ProductCategory
}

const FeaturedCategoriesListItem = ({
  category,
}: FeaturedCategoriesListItemProps) => {
  return (
    <Link href={`/${productTypeToUrlParam(category.type)}/${category.slug}`}>
      <div className=''>
        <div className='w-56 aspect-square'>
          <Image
            className='w-full h-full object-cover rounded-md'
            src={category.cover.formats.small?.url || ''}
            alt={category.name}
            width={200}
            height={200}
          />
        </div>
        <h3
          className={`${poppins.className} font-medium text-lg text-center mt-5 text-slate-600`}
        >
          {category.name}
        </h3>
      </div>
    </Link>
  )
}

export default FeaturedCategoriesListItem

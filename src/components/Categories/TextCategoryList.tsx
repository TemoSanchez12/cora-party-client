import Link from 'next/link'

import ProductCategory from '@/interfaces/domain/ProductCategory'
import { productTypeToUrlParam } from '@/utils/productTypes/productTypes'

interface TextCategoryListProps {
  categories: ProductCategory[]
}

const TextCategoryList = ({ categories }: TextCategoryListProps) => {
  return (
    <div className='w-full py-10 bg-slate-100 rounded-b-lg'>
      <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-5 w-global-container mx-auto flex-wrap'>
        {categories.map(category => (
          <li
            key={category.id}
            className='w-full py-2 px-4 rounded-lg border-slate-200 border bg-white text-center'
          >
            <Link
              href={`/${productTypeToUrlParam(category.type)}/${category.slug}`}
              className='w-full text-center text-slate-600'
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TextCategoryList

import ProductCategory from '@/interfaces/domain/ProductCategory'
import FeaturedCategoriesListItem from './FeaturedCategoriesListItem'

interface SimpleCategoriesListProps {
  categories: ProductCategory[]
  type: string
}

const SimpleCategoriesList = ({
  categories,
  type,
}: SimpleCategoriesListProps) => {
  return (
    <ul className='mx-auto flex justify-center gap-10 flex-wrap'>
      {categories &&
        categories.map(category => (
          <li key={category.id}>
            <FeaturedCategoriesListItem category={category} />
          </li>
        ))}
    </ul>
  )
}

export default SimpleCategoriesList

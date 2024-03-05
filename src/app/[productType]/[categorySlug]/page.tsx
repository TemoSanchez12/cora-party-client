import Link from 'next/link'

import Product from '@/interfaces/domain/Product'
import ProductCategory from '@/interfaces/domain/ProductCategory'

import MainLayout from '@/layouts/MainLayout'

interface ProductResponse {
  success: boolean
  data?: Product[]
  message: string
}

interface CategoriesResponse {
  success: boolean
  data?: ProductCategory[]
  message: string
}

type typesForProducts = {
  globos: string
  flores: string
  [key: string]: string
}

const productTypes: typesForProducts = {
  globos: 'balloons',
  flores: 'flower',
}

const CategoryPage = async ({ params }: any) => {
  const response: ProductResponse = await fetch(
    process.env.BASE_URL + '/api/' + productTypes[params.productType],
    {
      cache: 'no-cache',
    }
  ).then(res => (res.ok ? res.json() : Promise.reject()))

  const products = response.data?.filter((product: Product) => {
    for (const category of product.categories || []) {
      if (category.slug == params.categorySlug) {
        return true
      }
    }
  })

  return (
    <MainLayout>
      <div>
        <h1 className='bg-red-500 '>
          Se mostraran productos para la categoria de {params.categorySlug}
        </h1>

        {products &&
          products.map((product: Product) => (
            <li key={product.id}>
              <Link
                href={`/${params.productType}/${params.categorySlug}/${product.slug}?id=balloon-1`}
              >
                {product.name}
              </Link>
            </li>
          ))}
      </div>
    </MainLayout>
  )
}

// export async function generateStaticParams() {
//   const balloonResponse: CategoriesResponse = await fetch(
//     process.env.BASE_URL + '/api/categories?balloons',
//     { cache: 'no-cache' }
//   ).then(res => res.json())

//   const flowerResponse: CategoriesResponse = await fetch(
//     process.env.BASE_URL + '/api/categories?balloons',
//     { cache: 'no-cache' }
//   ).then(res => res.json())

//   const mappedSlug: string[] = []

//   for (const balloon of balloonResponse.data || []) {
//     mappedSlug.push(balloon.slug)
//   }

//   for (const flower of flowerResponse.data || []) {
//     mappedSlug.push(flower.slug)
//   }

//   return mappedSlug
// }

export default CategoryPage

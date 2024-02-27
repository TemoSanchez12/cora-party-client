import BalloonProduct from '@/interfaces/balloons/BalloonProduct'
import ProductCategory from '@/interfaces/domain/ProductCategory'

import MainLayout from '@/layouts/layout'

interface BalloonsResponse {
  success: boolean
  data?: BalloonProduct[]
  message: string
}

interface CategoriesResponse {
  success: boolean
  data?: ProductCategory[]
  message: string
}

const BalloonsPageCategory = async ({ params }: any) => {
  const response: BalloonsResponse = await fetch(
    'http://localhost:3000/api/balloons',
    {
      cache: 'no-cache',
    }
  ).then(res => (res.ok ? res.json() : Promise.reject()))

  const products = response.data?.filter((product: BalloonProduct) => {
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
          products.map((product: BalloonProduct) => (
            <li key={product.id}>{product.name}</li>
          ))}
      </div>
    </MainLayout>
  )
}

export async function generateStaticParams() {
  const response: CategoriesResponse = await fetch(
    process.env.BASE_URL + '/api/categories?balloons',
    { cache: 'no-cache' }
  ).then(res => res.json())

  return response.data?.map((category: ProductCategory) => category.slug)
}

export default BalloonsPageCategory

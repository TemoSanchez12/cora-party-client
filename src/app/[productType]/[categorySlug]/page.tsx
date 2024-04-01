'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

import Product from '@/interfaces/domain/Product'
import ProductCategory from '@/interfaces/domain/ProductCategory'
import SimpleProductList from '@/components/Products/ProductList'

import { Montserrat } from 'next/font/google'

import MainLayout from '@/layouts/MainLayout'

interface ProductResponse {
  success: boolean
  data?: Product[]
  message: string
}

interface CategoryResponse {
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
  flores: 'flowers',
}

const categoryType: typesForProducts = {
  globos: 'balloon',
  flores: 'flower',
}

const montserrat = Montserrat({ weight: ['500'], subsets: ['latin'] })

const CategoryPage = ({ params }: any) => {
  const { productType, categorySlug } = params

  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<ProductCategory>()

  useEffect(() => {
    const fetchProducts = async () => {
      const response: ProductResponse = await fetch('/api/products', {
        cache: 'no-cache',
      }).then(res => (res.ok ? res.json() : Promise.reject()))

      const products = response.data?.filter((product: Product) => {
        for (const category of product.categories || []) {
          if (category.slug == categorySlug) {
            return true
          }
        }
      })

      setProducts(products ?? [])
    }

    fetchProducts()
  }, [productType, categorySlug])

  useEffect(() => {
    const fetchCategory = async () => {
      const response: CategoryResponse = await fetch(
        `/api/categories?type=${categoryType[productType]}&slug=${categorySlug}`
      ).then(res => (res.ok ? res.json() : Promise.reject()))

      const category: ProductCategory = response.data
        ? response.data[0]
        : ({} as ProductCategory)

      setCategory(category)
    }

    fetchCategory()
  }, [categorySlug, productType])

  return (
    <MainLayout>
      <div className='w-full h-96'>
        {category && (
          <Image
            className='w-full h-full object-cover'
            src={category?.cover.formats.medium?.url ?? ''}
            alt={category?.name ?? ''}
            width={1920}
            height={1080}
            priority={true}
          />
        )}
      </div>
      <div>
        <h1 className='text-3xl text-slate-600 font-medium w-full text-center mt-36'>
          Los mejores {productType} para {category && category.name}
          <span className='text-dark-blue'>{}</span>
        </h1>

        <div
          className={`${montserrat.className} flex flex-col items-center mb-32 w-global-container mx-auto mt-16`}
        >
          <SimpleProductList products={products} />
        </div>
      </div>
    </MainLayout>
  )
}

export default CategoryPage

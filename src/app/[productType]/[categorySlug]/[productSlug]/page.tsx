'use client'

// import dependencies
import { useEffect, useState } from 'react'

// import interfaces
import Product from '@/interfaces/domain/Product'

// import layout
import MainLayout from '@/layouts/MainLayout'

// import componentes
import BalloonDetail from '@/components/Balloons/BalloonDetail'

type typesForProducts = {
  globos: string
  flores: string
  [key: string]: string
}

const productTypes: typesForProducts = {
  globos: 'balloons',
  flores: 'flower',
}

const ProductDetailPage = ({ params }: any) => {
  const [product, setProduct] = useState<Product | undefined>(undefined)

  useEffect(() => {
    const fetchProduct = async () => {
      const productResponse = await fetch(
        `/api/${productTypes[params.productType]}?slug=${params.productSlug}`
      ).then(res => (res.ok ? res.json() : Promise.reject()))

      const product: Product = productResponse.data[0]
      setProduct(product)
    }

    fetchProduct()
  }, [params.productSlug, params.productType])

  return (
    <MainLayout>
      {product ? <BalloonDetail product={product} /> : <div>Loading...</div>}
    </MainLayout>
  )
}

export default ProductDetailPage

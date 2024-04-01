'use client'

// import dependencies
import { useEffect, useState } from 'react'

// import interfaces
import Product from '@/interfaces/domain/Product'

// import layout
import MainLayout from '@/layouts/MainLayout'

// import componentes
import ProductDetail from '@/components/Products/ProductDetail'

const ProductDetailPage = ({ params }: any) => {
  const [product, setProduct] = useState<Product | undefined>(undefined)

  useEffect(() => {
    const fetchProduct = async () => {
      const productResponse = await fetch(
        `/api/products?slug=${params.productSlug}`
      ).then(res => (res.ok ? res.json() : Promise.reject()))

      const product: Product = productResponse.data[0]
      setProduct(product)
    }

    fetchProduct()
  }, [params.productSlug, params.productType])

  return (
    <MainLayout>
      {product ? <ProductDetail product={product} /> : <div>Loading...</div>}
    </MainLayout>
  )
}

export default ProductDetailPage

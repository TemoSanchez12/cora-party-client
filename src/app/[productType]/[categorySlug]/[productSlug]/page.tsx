'use client'

import { useEffect, useState } from 'react'

import MainLayout from '@/layouts/MainLayout'

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
  const [product, setProduct] = useState(undefined)

  useEffect(() => {
    const fetchProduct = async () => {
      const productResponse = await fetch(
        `/api/${productTypes[params.productType]}?slug=${params.productSlug}`
      ).then(res => (res.ok ? res.json() : Promise.reject()))
      console.log('aqui mero')
      console.log(productResponse)
    }

    fetchProduct()
  }, [])

  return (
    <MainLayout>
      <div>
        <p>
          Hola desde pagina de detalle imprimiendo product slug{' '}
          {params.productSlug}
        </p>
      </div>
    </MainLayout>
  )
}

export default ProductDetailPage

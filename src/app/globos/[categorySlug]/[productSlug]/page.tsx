'use client'

import { useRouter } from 'next/router'

const ProductDetailPage = () => {
  const router = useRouter()
  const { productSlug } = router.query

  return (
    <div>
      <p>Hola desde pagina de detalle {productSlug}</p>
    </div>
  )
}

export default ProductDetailPage

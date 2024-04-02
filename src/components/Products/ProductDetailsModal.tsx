import Product from '@/interfaces/domain/Product'
import Modal from '../Layout/Modal/Modal'
import ComplementProductsPicker from './ComplementProducts'
import ProductDetails from './ProductDetails'

interface ProductDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

const ProductDetailsModal = ({
  isOpen,
  onClose,
  product,
}: ProductDetailsModalProps) => {
  const [type, id] = product.id.split('-')

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className='flex flex-col items-center'>
        <div className='mt-4'>
          <ProductDetails product={product} />
        </div>
        <div className='flex flex-col items-center'>
          <ComplementProductsPicker product={product} />
        </div>
      </div>
    </Modal>
  )
}

export default ProductDetailsModal

import Product from '@/interfaces/domain/Product'
import Modal from '../Layout/Modal/Modal'
import ComplementProductsPicker from './ComplementProducts'
import ProductFontPicker from './ProductFontPicker'
import BalloonProduct from '@/interfaces/balloons/BalloonProduct'

interface ProductDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | BalloonProduct
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
        <ComplementProductsPicker product={product} />
      </div>
    </Modal>
  )
}

export default ProductDetailsModal

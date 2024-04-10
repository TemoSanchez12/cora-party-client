import Product from '@/interfaces/domain/Product'
import FormatTextIcon from '../Icons/FormatTextIcon'
import IconProps from '@/interfaces/domain/IconProps'
import ColorBucketIcon from '../Icons/ColorBucketIcon'

interface CustomIconIndicatorProps {
  product: Product
}

const iconProps: IconProps = {
  color: '#aaa',
  width: '24',
  height: '24',
}

const CustomIconIndicator = ({ product }: CustomIconIndicatorProps) => {
  return (
    <div className='mt-1 flex gap-1'>
      {product.requiredTexts.length > 0 && <FormatTextIcon {...iconProps} />}
      {product.requiredColors && product.requiredColors.length > 0 && (
        <ColorBucketIcon {...iconProps} />
      )}
    </div>
  )
}

export default CustomIconIndicator

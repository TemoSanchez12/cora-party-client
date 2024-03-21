import ComplementProduct from '@/interfaces/domain/ComplementProduct'
import OrderSpecs from '@/interfaces/orderSpecs/OrderSpecs'
import GeneralInfo from '@/interfaces/shipping/GeneralInfo'
import ShippingAddress from '@/interfaces/shipping/ShippingAddress'
import { ShoppingCar } from '@/interfaces/shopping/ShoppingCar'
import Product from '@/interfaces/domain/Product'

export interface OrderConfirmationTemplateProps {
  shoppingCar: ShoppingCar
  generalInfo: GeneralInfo
  shippingAddress: ShippingAddress
  orderSpecs: OrderSpecs
  senderEmail: string
}
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
    padding: '10px',
    // textAlign: 'center',
    borderRadius: '8px 8px 0 0',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '20px',
  },
  product: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  total: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
}

const OrderConfirmationTemplate = ({
  shoppingCar,
  generalInfo,
  shippingAddress,
  orderSpecs,
  senderEmail,
}: OrderConfirmationTemplateProps) => {
  const calculateTotalWithComplements = (product: Product) => {
    let total = product.price // Inicializamos con el precio base del producto
    if (product.complements) {
      product.complements.forEach((complement: ComplementProduct) => {
        total += complement.price // Sumamos el precio de cada complemento
      })
    }
    return total
  }

  const filteredProductSpecs = orderSpecs.productSpecs.filter(spec =>
    shoppingCar.products.some(product => product.product.id === spec.id)
  )

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Nueva Orden de Compra</h2>
      </div>

      <div style={styles.section}>
        <h3>Detalles del Pedido:</h3>
        {shoppingCar.products.map(productWrapper => (
          <div key={productWrapper.product.id} style={styles.product}>
            <p>{productWrapper.product.name}</p>
            <p>Cantidad: {productWrapper.quantity}</p>
            <p>Precio Unitario: ${productWrapper.product.price.toFixed(2)}</p>

            <div>
              <ul style={{ paddingLeft: '30px' }}>
                {productWrapper.product.complements &&
                  productWrapper.product.complements.map(complement => (
                    <li key={productWrapper.product.id + complement.id}>
                      <p>
                        {complement.name} - ${complement.price.toFixed(2)}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>

            <p>
              Total: $
              {calculateTotalWithComplements(productWrapper.product).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h3>Información del Comprador:</h3>
        <p>Nombre: {generalInfo.senderName}</p>
        <p>Teléfono: {generalInfo.senderName}</p>
      </div>

      <div style={styles.section}>
        <h3>Información de la persona que recibe:</h3>
        <p>Nombre: {generalInfo.recipientName}</p>
        <p>Teléfono: {generalInfo.receiverPhone}</p>
      </div>

      <div style={styles.section}>
        <h3>Dirección de Envío:</h3>
        <p>
          Calle: {shippingAddress.street}{' '}
          {shippingAddress.exteriorNumber &&
            `Ext. ${shippingAddress.exteriorNumber}`}{' '}
          {shippingAddress.interiorNumber}
        </p>
        <p>Avenida: {shippingAddress.avenue}</p>
        <p>Código Postal: {shippingAddress.postalCode}</p>
        <p>Ciudad: {shippingAddress.city}</p>
        {shippingAddress.references && (
          <p>Referencias: {shippingAddress.references}</p>
        )}
      </div>
      <div style={styles.section}>
        <h3>Detalles Adicionales del Pedido:</h3>
        {filteredProductSpecs.map(productSpec => (
          <div key={productSpec.id} style={styles.product}>
            <p>{productSpec.name}</p>
            <ul>
              {productSpec.specs.map(spec => (
                <li key={spec.name}>
                  {spec.name}: {spec.value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={styles.total}>
        <h3>Total:</h3>
        <p>Subtotal: ${shoppingCar.totalPrice.toFixed(2)}</p>
        {/* <p>Costo de Envío: ${shippingPrice.toFixed(2)}</p> */}
        <p>Total a Pagar: ${shoppingCar.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default OrderConfirmationTemplate

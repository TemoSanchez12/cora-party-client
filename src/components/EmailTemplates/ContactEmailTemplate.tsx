import ContactEmailRequest from '@/interfaces/mailing/ContactEmailRequest'

interface ContactEmailTemplateProps {
  contactInfo: ContactEmailRequest
}

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  info: {
    marginBottom: '20px',
  },
  message: {
    borderTop: '1px solid #ccc',
    paddingTop: '20px',
  },
}

const ContactEmailTemplate = ({ contactInfo }: ContactEmailTemplateProps) => {
  const { name, email, phone, message } = contactInfo

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>¡Nuevo mensaje de contacto!</h2>
      <div style={styles.info}>
        <p>
          <strong>Nombre:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Teléfono:</strong> {phone}
        </p>
      </div>
      <div style={styles.message}>
        <p>
          <strong>Mensaje:</strong>
        </p>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ContactEmailTemplate

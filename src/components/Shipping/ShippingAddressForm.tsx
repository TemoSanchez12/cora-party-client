'use client'

import ShippingAddress from '@/interfaces/shipping/ShippingAddress'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const shippingAddressSchema = Yup.object().shape({
  street: Yup.string()
    .min(2, 'Nombre de calle demasiado corto')
    .max(100, 'Nombre de calle demasiado largo')
    .required('El nombre de la calle es requerido'),
  interiorNumber: Yup.string()
    .matches(/^\d+$/, 'El número de la dirección debe contener solo dígitos.')
    .required('El número de la dirección es obligatorio.'),
  exteriorNumber: Yup.string().matches(
    /^\d+$/,
    'El número de la dirección debe contener solo dígitos.'
  ),
  avenue: Yup.string()
    .min(2, 'El nombre de la colonia es demasiado corto')
    .max(100, 'El nombre de la colonia es demasiado largo'),
  postalCode: Yup.string()
    .matches(/^\d{5}$/, 'El código postal debe ser un número de 5 dígitos.')
    .required('El código postal es obligatorio.'),
  city: Yup.string()
    .min(3, 'El nombre de la ciudad es demasiado corto')
    .max(100, 'El nombre de la ciudad es demasiado largo')
    .required('El nombre de la ciudad es requerido'),
  refernces: Yup.string().max(200, 'Numero de caracteres maximo alcanzado'),
})

const ShippingAddressForm = () => {
  const handleSubmitShippingAddressForm = (values: ShippingAddress) => {
    localStorage.setItem('shipping-address', JSON.stringify(values))
  }

  return (
    <div>
      <h1>Formulario para direccion de envio</h1>

      <Formik
        initialValues={{
          street: '',
          interiorNumber: '',
          exteriorNumber: '',
          avenue: '',
          postalCode: '',
          city: '',
          references: '',
        }}
        validationSchema={shippingAddressSchema}
        onSubmit={handleSubmitShippingAddressForm}
      >
        {({ errors, touched }) => (
          <Form className='flex-col gap-3'>
            <div className='p-10 rounded-md bg-slate-200'>
              Calle
              <Field name='street' />
              {errors.street && touched.street && <div>{errors.street}</div>}
            </div>
            <div className='p-10 rounded-md bg-slate-200'>
              Numero interior
              <Field name='interiorNumber' />
              {errors.interiorNumber && touched.interiorNumber && (
                <div>{errors.interiorNumber}</div>
              )}
            </div>
            <div className='p-10 rounded-md bg-slate-200'>
              Numero exterior
              <Field name='exteriorNumber' />
              {errors.exteriorNumber && touched.exteriorNumber && (
                <div>{errors.exteriorNumber}</div>
              )}
            </div>
            <div className='p-10 rounded-md bg-slate-200'>
              Colonia o avenida
              <Field name='avenue' />
              {errors.avenue && touched.avenue && <div>{errors.avenue}</div>}
            </div>
            <div className='p-10 rounded-md bg-slate-200'>
              Codigo Postal
              <Field name='postalCode' />
              {errors.postalCode && touched.postalCode && (
                <div>{errors.postalCode}</div>
              )}
            </div>
            <div className='p-10 rounded-md bg-slate-200'>
              Ciudad
              <Field name='city' />
              {errors.city && touched.city && <div>{errors.city}</div>}
            </div>
            <div className='p-10 rounded-md bg-slate-200'>
              Referencias
              <Field name='references' />
              {errors.references && touched.references && (
                <div>{errors.references}</div>
              )}
            </div>
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ShippingAddressForm

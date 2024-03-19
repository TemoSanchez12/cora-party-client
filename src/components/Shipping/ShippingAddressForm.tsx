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
    .max(100, 'El nombre de la colonia es demasiado largo')
    .required('El nombre de la colonia es requerido'),
  postalCode: Yup.string()
    .matches(/^\d{5}$/, 'El código postal debe ser un número de 5 dígitos.')
    .required('El código postal es obligatorio.'),
  city: Yup.string()
    .min(3, 'El nombre de la ciudad es demasiado corto')
    .max(100, 'El nombre de la ciudad es demasiado largo')
    .required('El nombre de la ciudad es requerido'),
  refernces: Yup.string().max(200, 'Numero de caracteres maximo alcanzado'),
})

const CustomInput = ({
  label,
  name,
  className,
  fieldProps,
  error,
  touched,
}: any) => {
  return (
    <div
      className={`rounded-lg bg-gray-100 p-4 shadow-lg text-xs ${className}`}
    >
      <div className='flex gap-1 w-full flex-col'>
        <label className='text-slate-500' htmlFor={name}>
          {label}
        </label>
        <Field
          as={`${fieldProps.textArea ? 'textarea' : 'input'}`}
          className='px-2 py-1 focus:outline-none  w-full bg-transparent border-b-2 border-slate-400'
          name={name}
          {...fieldProps}
        />
      </div>
      {error && touched && <div className='text-red-400 mt-1'>{error}</div>}
    </div>
  )
}

const ShippingAddressForm = () => {
  const handleSubmitShippingAddressForm = (values: ShippingAddress) => {
    localStorage.setItem('shipping-address', JSON.stringify(values))
  }

  return (
    <div className='w-global-container mx-auto py-10 rounded-xl shadow-xl my-10'>
      <h1 className='text-slate-600 text-lg text-center mb-4'>
        Formulario para dirección de envío
      </h1>

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
          <Form className='flex flex-col gap-4 w-global-container mx-auto'>
            <CustomInput
              label='Calle'
              name='street'
              className='w-full'
              fieldProps={{}}
              error={errors.street}
              touched={touched.street}
            />
            <div className='flex gap-4'>
              <CustomInput
                label='Numero interior'
                name='interiorNumber'
                className='w-full'
                fieldProps={{}}
                error={errors.interiorNumber}
                touched={touched.interiorNumber}
              />
              <CustomInput
                label='Numero exterior'
                name='exteriorNumber'
                className='w-full'
                fieldProps={{}}
                error={errors.exteriorNumber}
                touched={touched.exteriorNumber}
              />
            </div>
            <CustomInput
              label='Colonia o avenida'
              name='avenue'
              className='w-full'
              fieldProps={{}}
              error={errors.avenue}
              touched={touched.avenue}
            />
            <div className='flex gap-4'>
              <CustomInput
                label='Codigo Postal'
                name='postalCode'
                className='w-full'
                fieldProps={{}}
                error={errors.postalCode}
                touched={touched.postalCode}
              />
              <CustomInput
                label='Ciudad'
                name='city'
                className='w-full'
                fieldProps={{}}
                error={errors.city}
                touched={touched.city}
              />
            </div>
            <CustomInput
              label='Referencias'
              name='references'
              className='w-full'
              fieldProps={{ textArea: true }}
              error={errors.references}
              touched={touched.references}
            />
            <button
              type='submit'
              className='bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 text-xs'
            >
              Confirmar dirección de envío
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ShippingAddressForm

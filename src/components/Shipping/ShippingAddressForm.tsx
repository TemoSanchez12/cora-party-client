'use client'

import { useState, Dispatch, SetStateAction } from 'react'

import ShippingAddress from '@/interfaces/shipping/ShippingAddress'

import { Formik, Form } from 'formik'

import * as Yup from 'yup'

import CustomInput from './CustomInput'
import Modal from '../Layout/Modal/Modal'

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

interface ShippingAddressFormProps {
  shippingAddress: ShippingAddress | null | undefined
  setShippingAddress: Dispatch<
    SetStateAction<ShippingAddress | null | undefined>
  >
}

const ShippingAddressForm = ({
  setShippingAddress,
  shippingAddress,
}: ShippingAddressFormProps) => {
  const [showShippingAddressForm, setShowShippingAddressForm] = useState(false)

  const handleSubmitShippingAddressForm = (values: any) => {
    const shippingAddress: ShippingAddress = {
      avenue: values.avenue,
      city: values.city,
      interiorNumber: values.interiorNumber,
      postalCode: values.postalCode,
      street: values.street,
      exteriorNumber: values.exteriorNumber,
      references: values.references,
    }

    setShippingAddress(shippingAddress)
    setShowShippingAddressForm(false)

    localStorage.setItem('shipping-address', JSON.stringify(shippingAddress))
  }

  return (
    <>
      <h1 className='text-slate-600 text-lg text-center my-4'>
        Detalles de envío
      </h1>
      <div className='rounded-lg bg-gray-100 p-4 shadow-lg text-xs md:text-base'>
        {shippingAddress ? (
          <div className='flex flex-col gap-2 text-slate-500'>
            <p>
              <span className='text-slate-600 font-bold'>Calle:</span>{' '}
              {shippingAddress.street}
            </p>
            <p>
              <span className='text-slate-600 font-bold'>Numero:</span> #
              {shippingAddress.exteriorNumber}
            </p>
            <p>
              <span className='text-slate-600 font-bold'>Codigo Postal:</span>{' '}
              {shippingAddress.postalCode}
            </p>

            <button
              className='mt-4'
              onClick={() => setShowShippingAddressForm(true)}
            >
              Cambiar dirección de envio
            </button>
          </div>
        ) : (
          <div
            onClick={() => setShowShippingAddressForm(true)}
            className='cursor-pointer text-slate-600'
          >
            Agregar dirección de envío
          </div>
        )}
      </div>
      <Modal
        isOpen={showShippingAddressForm}
        onClose={() => setShowShippingAddressForm(false)}
      >
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
            <Form className='flex flex-col gap-4 mx-auto'>
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
                textarea={true}
                fieldProps={{}}
                error={errors.references}
                touched={touched.references}
              />
              <button
                type='submit'
                className='w-full mt-5 bg-slate-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-slate-700 transition-colors duration-300'
              >
                Confirmar dirección de envío
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default ShippingAddressForm

'use client'

import ShippingAddress from '@/interfaces/shipping/ShippingAddress'
import { useRouter } from 'next/navigation'

import { Formik, Form, Field } from 'formik'
import Image from 'next/image'
import * as Yup from 'yup'
import boxesImage from '../../../public/images/domain/boxes.jpg'

import { Montserrat } from 'next/font/google'
import GeneralInfo from '@/interfaces/shipping/GeneralInfo'

const montserrat = Montserrat({ weight: ['400', '600'], subsets: ['latin'] })

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
  recipientName: Yup.string()
    .min(3, 'El nombre del destinatario es demasiado corto')
    .max(100, 'El nombre del destinatario es demasiado largo')
    .required('El nombre del destinatario es requerido'),
  senderName: Yup.string()
    .min(3, 'Nombre es demasiado corto')
    .max(100, 'Nombre es demasiado largo')
    .required('Nombre es requerido'),
  senderPhone: Yup.string()
    .matches(/^[0-9]+$/, 'El número de teléfono debe contener solo números')
    .min(7, 'El número de teléfono es demasiado corto')
    .max(15, 'El número de teléfono es demasiado largo')
    .required('El número de teléfono es requerido'),
  receiverPhone: Yup.string()
    .matches(/^[0-9]+$/, 'El número de teléfono debe contener solo números')
    .min(7, 'El número de teléfono es demasiado corto')
    .max(15, 'El número de teléfono es demasiado largo')
    .required('El número de teléfono es requerido'),
})

const CustomInput = ({
  label,
  name,
  className,
  fieldProps,
  error,
  touched,
  textarea,
}: any) => {
  return (
    <div
      className={`rounded-lg bg-gray-100 p-4 shadow-lg text-xs md:text-base ${className}`}
    >
      <div className='flex gap-1 w-full flex-col'>
        <label className='text-slate-500' htmlFor={name}>
          {label}
        </label>
        <Field
          as={`${textarea ? 'textarea' : 'input'}`}
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
  const router = useRouter()

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

    const generalInfo: GeneralInfo = {
      receiverPhone: values.receiverPhone,
      recipientName: values.recipientName,
      senderPhone: values.senderPhone,
      senderName: values.senderName,
    }

    localStorage.setItem('general-info', JSON.stringify(generalInfo))
    localStorage.setItem('shipping-address', JSON.stringify(shippingAddress))

    router.push('/checkout')
  }

  return (
    <div
      className={`${montserrat.className} w-global-container mx-auto pb-10 rounded-xl shadow-xl my-10 lg:flex lg:justify-center items-center lg:gap-10 mb-40 mt-20`}
    >
      <div className='h-64 md:h-96 rounded-t-xl lg:rounded-b-xl overflow-hidden lg:h-full lg:w-1/2'>
        <Image
          className='object-cover h-full w-full object-bottom'
          src={boxesImage}
          alt='Confimar datos de envio Cora Party'
          width={700}
          height={500}
          priority
        />
      </div>

      <div>
        <h1 className='text-slate-600 text-lg text-center my-4'>
          Detalles de envío
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
            recipientName: '',
            senderPhone: '',
            receiverPhone: '',
            senderName: '',
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
                textarea={true}
                fieldProps={{}}
                error={errors.references}
                touched={touched.references}
              />

              <h2 className='text-center text-slate-600'>
                Información general
              </h2>

              <div>
                <CustomInput
                  label='Tu nombre'
                  name='senderName'
                  className='w-full'
                  fieldProps={{}}
                  error={errors.senderName}
                  touched={touched.senderName}
                />
                <CustomInput
                  label='Nombre de quien recibe'
                  name='recipientName'
                  className='w-full'
                  fieldProps={{}}
                  error={errors.recipientName}
                  touched={touched.recipientName}
                />
              </div>

              <div className='flex gap-4'>
                <CustomInput
                  label='Tu telefono'
                  name='senderPhone'
                  className='w-full'
                  fieldProps={{}}
                  error={errors.senderPhone}
                  touched={touched.senderPhone}
                />
                <CustomInput
                  label='Telefono de quien recibe'
                  name='receiverPhone'
                  className='w-full'
                  fieldProps={{}}
                  error={errors.receiverPhone}
                  touched={touched.receiverPhone}
                />
              </div>

              <button
                type='submit'
                className='bg-slate-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-slate-700 transition-colors duration-300'
              >
                Confirmar dirección de envío
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ShippingAddressForm

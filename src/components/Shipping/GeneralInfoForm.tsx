'use client'

import GeneralInfo from '@/interfaces/shipping/GeneralInfo'
import { useRouter } from 'next/navigation'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomInput from './CustomInput'
import ShippingAddress from '@/interfaces/shipping/ShippingAddress'

const generalInfoSchema = Yup.object().shape({
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

interface GeneralInfoFormProps {
  shippingAddress: ShippingAddress | null | undefined
}

const GeneralInfoForm = ({ shippingAddress }: GeneralInfoFormProps) => {
  const router = useRouter()

  const handleSubmitGeneralInfoForm = (values: any) => {
    const generalInfo: GeneralInfo = {
      receiverPhone: values.receiverPhone,
      recipientName: values.recipientName,
      senderPhone: values.senderPhone,
      senderName: values.senderName,
    }

    localStorage.setItem('general-info', JSON.stringify(generalInfo))

    router.push('/checkout')
  }

  return (
    <div>
      <h2 className='text-center text-slate-600 text-lg mt-6 mb-2'>
        Información general
      </h2>

      <Formik
        initialValues={{
          recipientName: '',
          senderPhone: '',
          receiverPhone: '',
          senderName: '',
        }}
        validationSchema={generalInfoSchema}
        onSubmit={handleSubmitGeneralInfoForm}
      >
        {({ errors, touched }) => (
          <Form className='flex flex-col gap-4 mx-auto'>
            <div className='flex flex-col gap-4'>
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
              disabled={!shippingAddress}
              className='w-full mt-5 bg-slate-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-slate-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Continuar al pago
            </button>
            {!shippingAddress && (
              <p className='text-center text-red-400'>
                Agrega dirección de envío para continuar
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default GeneralInfoForm

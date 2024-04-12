'use client'

import MainLayout from '@/layouts/MainLayout'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Montserrat, Lora } from 'next/font/google'
import EmailTypes from '@/interfaces/mailing/MailTypes'
import ContactEmailRequest from '@/interfaces/mailing/ContactEmailRequest'

const montserrat = Montserrat({ weight: ['500', '800'], subsets: ['latin'] })
const lora = Lora({ weight: ['400'], subsets: ['latin'] })

const ContactForm = () => {
  const [showNotification, setShowNotification] = useState(false)

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    message: '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nombre es requerido'),
    email: Yup.string()
      .email('Correo electronico invalido')
      .required('Correo electronico requerido'),
    phone: Yup.string().required('Telefono es requerido'),
    message: Yup.string().required('Mensaje es requerido'),
  })

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const contactRequestData: ContactEmailRequest = {
      email: values.email,
      message: values.message,
      name: values.name,
      phone: values.phone,
    }

    const mailRequest = {
      type: EmailTypes.contactMail,
      payload: contactRequestData,
    }

    const response = await fetch('/api/mail', {
      body: JSON.stringify(mailRequest),
      method: 'POST',
    }).then(res => (res.ok ? res.json() : Promise.reject()))

    resetForm()

    if (response.success) setShowNotification(true)
  }

  return (
    <MainLayout>
      <div
        className={`${montserrat.className} my-28 w-global-container mx-auto p-10`}
      >
        <div className='mb-10'>
          <h2 className={`${lora.className} text-5xl text-dark-blue`}>
            Contacta Cora Party
          </h2>

          <p className='p-3 text-slate-600'>
            No dudes en ponerte en contacto con nosotros; nos comunicaremos
            contigo a la mayor brevedad posible.
          </p>
        </div>

        <div className='md:flex gap-20'>
          <div className='md:w-1/2 rounded-lg'>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className='space-y-4'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-slate-600'
                    >
                      Nombre
                    </label>
                    <Field
                      type='text'
                      id='name'
                      name='name'
                      className='mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-primary-purple focus:border-primary-purple'
                    />
                    <ErrorMessage
                      name='name'
                      component='div'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-slate-600'
                    >
                      Correo electronico
                    </label>
                    <Field
                      type='email'
                      id='email'
                      name='email'
                      className='mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-primary-purple focus:border-primary-purple'
                    />
                    <ErrorMessage
                      name='email'
                      component='div'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-slate-600'
                    >
                      Telefono
                    </label>
                    <Field
                      type='text'
                      id='phone'
                      name='phone'
                      className='mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-primary-purple focus:border-primary-purple'
                    />
                    <ErrorMessage
                      name='phone'
                      component='div'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-slate-600'
                    >
                      Mensaje
                    </label>
                    <Field
                      as='textarea'
                      id='message'
                      name='message'
                      rows='4'
                      className='mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-primary-purple focus:border-primary-purple'
                    />
                    <ErrorMessage
                      name='message'
                      component='div'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>
                  <button
                    type='submit'
                    disabled={showNotification}
                    className={`${
                      showNotification
                        ? 'bg-green-400 border-green-400'
                        : 'border-light-yellow bg-primary-purple'
                    } w-full bg-slate-400 py-2 px-4 rounded-md border-2 text-white hover:bg-slate-500 transition-all duration-500`}
                  >
                    {showNotification ? 'Nos pondremos en contacto' : 'Enviar'}
                    {showNotification}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <section className='mt-12 text-slate-500 flex flex-col gap-8 md:w-1/2'>
            <div>
              <h4 className=''>Horas de apertura</h4>
              <div className='pl-4'>
                <p>Lunes - Sabado</p>
                <p>9am - 5pm</p>
                <p>Fines de semana</p>
                <p>9am - 3pm</p>
              </div>
            </div>
            <div>
              <h4 className=''>Dirección</h4>
              <div className='pl-4'>
                <p>Calle Santa Isabel</p>
                <p>Villas del Monasterio</p>
                <p>Código Postal 98613</p>
              </div>
            </div>
            <div>
              <h4 className=''>Soporte</h4>
              <div className='pl-4'>
                <p>hello@cora.com</p>
                <p>492 144 38 40</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  )
}

export default ContactForm

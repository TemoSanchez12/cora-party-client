import { Field } from 'formik'

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

export default CustomInput

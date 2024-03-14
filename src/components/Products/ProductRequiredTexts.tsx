import { useState } from 'react'

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['400', '800', '600'],
  subsets: ['latin'],
})

interface RequiredTextsPickerProps {
  requiredTexts: string[]
}

const RequiredTextsPicker = ({ requiredTexts }: RequiredTextsPickerProps) => {
  const [textInputs, setTextInputs] = useState<{ [key: string]: string }>({})

  const handleTextChange = (requiredText: string, newText: string) => {
    setTextInputs(prevState => ({
      ...prevState,
      [requiredText]: newText,
    }))
  }

  return (
    <div className={`${montserrat.className}`}>
      <p className='text-sm text-gray-600 font-bold mb-4'>
        Ingrese los textos requeridos:
      </p>
      <ul className='pl-2'>
        {requiredTexts.map(requiredText => (
          <li key={requiredText} className=''>
            <div className='mb-4'>
              <p className='font-semibold text-slate-600 text-sm'>
                {requiredText}
              </p>
              <input
                type='text'
                className='border border-gray-300 rounded-md px-2 py-1 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={textInputs[requiredText] || ''}
                onChange={e => handleTextChange(requiredText, e.target.value)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RequiredTextsPicker

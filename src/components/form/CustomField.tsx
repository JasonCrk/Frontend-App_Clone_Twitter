import { FC } from 'react'

import { Field } from 'formik'

interface CustomFieldProps {
  error: string | undefined
  name: string
  label: string
  placeholder: string
  type: string
}

export const CustomField: FC<CustomFieldProps> = ({
  error,
  name,
  type,
  placeholder,
  label,
}) => {
  return (
    <div className='w-full'>
      <label htmlFor={name} className={`${error && 'text-red-500'} block mb-1`}>
        {label}
      </label>
      <Field
        id={name}
        type={type}
        name={name}
        className={`${
          error ? 'border-red-500 placeholder-red-500' : 'border-gray-400'
        } relative block w-full appearance-none rounded-md border-2 transition-[border-color] px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 bg-black text-white text-lg mb-1`}
        placeholder={placeholder}
      />
      {error && <div className='text-red-500'>{error}</div>}
    </div>
  )
}

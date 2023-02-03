import { FC, useState } from 'react'

import { Field } from 'formik'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface PasswordFieldProps {
  error: string | undefined
  label: string
  name: string
}

export const PasswordField: FC<PasswordFieldProps> = ({
  error,
  name,
  label,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className='relative w-full'>
      <label htmlFor={name} className={`${error && 'text-red-500'} block mb-1`}>
        {label}
      </label>

      <Field
        id={name}
        type={showPassword ? 'text' : 'password'}
        name={name}
        className={`${
          error ? 'placeholder-red-500 border-red-500' : 'border-gray-400'
        } relative block w-full appearance-none rounded-md border-2 transition-[border-color] px-3 py-2 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 bg-black text-white text-lg pr-11 mb-1`}
        placeholder='Enter your password'
      />

      {error && <div className='text-red-500'>{error}</div>}

      <button
        className={`${
          error && 'text-red-500'
        } absolute top-9 right-1.5 p-2 text-lg hover:bg-opacity-10 hover:bg-white transition-[background] rounded-full`}
        type='button'
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </button>
    </div>
  )
}

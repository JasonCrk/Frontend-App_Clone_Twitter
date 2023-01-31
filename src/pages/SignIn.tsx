import { FC, useEffect, useState } from 'react'

import { redirect } from 'react-router-dom'

import { useMutation } from 'react-query'

import { LoginData } from '../interfaces/Auth'
import { signIn } from '../services/authService'

import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useAuthStore } from '../store/authStore'

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Is required'),
  password: Yup.string().required('Is required'),
})

export const SignInPage: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { mutate: signInMutation } = useMutation({
    mutationKey: 'signIn',
    mutationFn: signIn,
  })

  const isAuth = useAuthStore(state => state.isAuth)
  const token = useAuthStore(state => state.token)

  useEffect(() => {
    if (!isAuth || !token) {
      redirect('/explore')
    }
  }, [])

  const initialValues: LoginData = {
    email: '',
    password: '',
  }

  return (
    <>
      <h1 className='text-3xl font-bold text-center mb-4 font-title'>
        Sign in to Twitter
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={(
          signInData: LoginData,
          { setSubmitting }: FormikHelpers<LoginData>
        ) => {
          signInMutation(signInData, {
            onSuccess(data) {
              window.localStorage.setItem(
                'accessToken_twitter',
                data.accessToken
              )
              setSubmitting(false)
              redirect('/home')
            },
            onError(error) {
              console.log(error)
              setSubmitting(false)
            },
          })
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className='font-paragraph'>
            <div className='w-96 mb-4'>
              <label
                htmlFor='email'
                className={`${errors.email && 'text-red-500'} block mb-1`}
              >
                Email
              </label>
              <Field
                id='email'
                type='email'
                name='email'
                className={`${
                  errors.email
                    ? 'border-red-500 placeholder-red-500'
                    : 'border-gray-400'
                } relative block w-full appearance-none rounded-md border-2 transition-[border-color] px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 bg-black text-white text-lg mb-1`}
                placeholder='Enter your email'
              />
              {errors.email && touched.email && (
                <div className='text-red-500'>{errors.email}</div>
              )}
            </div>

            <div className='w-full mb-4 relative'>
              <label
                htmlFor='password'
                className={`${errors.password && 'text-red-500'} block mb-1`}
              >
                Password
              </label>
              <Field
                id='id'
                type={showPassword ? 'text' : 'password'}
                name='password'
                className={`${
                  errors.password
                    ? 'placeholder-red-500 border-red-500'
                    : 'border-gray-400'
                } relative block w-full appearance-none rounded-md border-2 transition-[border-color] px-3 py-2 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 bg-black text-white text-lg pr-11 mb-1`}
                placeholder='Enter your password'
              />
              {errors.password && touched.password && (
                <div className='text-red-500'>{errors.password}</div>
              )}
              <button
                className={`${
                  errors.password && 'text-red-500'
                } absolute top-9 right-1.5 p-2 text-lg hover:bg-opacity-10 hover:bg-white transition-[background] rounded-full`}
                type='button'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='disabled:bg-opacity-20 bg-white py-2 rounded-full w-full text-black font-bold text-lg'
            >
              login
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

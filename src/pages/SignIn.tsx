import { FC, useEffect } from 'react'

import { Link, redirect, useNavigate } from 'react-router-dom'

import { useMutation } from 'react-query'

import { useAuthStore } from '../store/authStore'

import { ISignInResponse, LoginData } from '../interfaces/Auth'
import { signIn } from '../services/authService'
import { AxiosError } from 'axios'

import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { toast } from 'react-toastify'

import { CustomField } from '../components/form/CustomField'
import { PasswordField } from '../components/form/PasswordField'

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Is required'),
  password: Yup.string().required('Is required'),
})

export const SignInPage: FC = () => {
  const navigate = useNavigate()

  const isAuth = useAuthStore(state => state.isAuth)
  const token = useAuthStore(state => state.token)

  const { mutate: signInMutation } = useMutation<ISignInResponse, AxiosError<{ error: string }>, LoginData>({
    mutationKey: 'signIn',
    mutationFn: signIn,
  })

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
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl font-bold text-center'>Sign in to Twitter</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={(
          signInData: LoginData,
          { setSubmitting }: FormikHelpers<LoginData>
        ) => {
          signInMutation(signInData, {
            onSuccess({ accessToken }) {
              localStorage.setItem('accessToken_twitter', accessToken)
              navigate('/home')
            },
            onError(error) {
              toast.error(error.response?.data.error, {
                  position: 'bottom-center'
              })
            },
            onSettled() {
              setSubmitting(false)
              console.clear()
            }
          })
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form className='flex flex-col gap-4 w-96'>
            <CustomField
              placeholder='Enter your email'
              label='Email'
              error={errors.email}
              name='email'
              type='email'
            />

            <PasswordField
              error={errors.password}
              name='password'
              label='Password'
            />

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
      <Link
        to='/auth/signUp'
        className='self-center text-lg text-blue-500 hover:underline hover:underline-offset-2 hover:text-blue-400 transition-colors'
      >
        Create account
      </Link>
    </div>
  )
}

import { FC, useEffect } from 'react'

import { Link, redirect, useNavigate } from 'react-router-dom'

import { useMutation } from 'react-query'

import { useAuthStore } from '../store/authStore'

import { SignUpData } from '../interfaces/Auth'
import { signUp } from '../services/authService'

import { CustomField } from '../components/form/CustomField'
import { PasswordField } from '../components/form/PasswordField'

import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { toast } from 'react-toastify'

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().min(3).max(100).required('Is required'),
  lastName: Yup.string().min(3).max(100).required('Is required'),
  username: Yup.string().min(3).max(25).required('Is required'),
  email: Yup.string().email('Invalid email').required('Is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Invalid password (min 1 capital letter, min 1 number and 8 characteres)'
    )
    .required('Is required'),
})

export const SignUpPage: FC = () => {
  const navigate = useNavigate()

  const isAuth = useAuthStore(state => state.isAuth)
  const token = useAuthStore(state => state.token)

  useEffect(() => {
    if (!isAuth || !token) {
      redirect('/explore')
    }
  }, [])

  const { mutate: signInMutation } = useMutation({
    mutationKey: 'signUp',
    mutationFn: signUp,
  })

  const initialValues: SignUpData = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl font-bold text-center'>Sign up to Twitter</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={(
          signUpData: SignUpData,
          { setSubmitting }: FormikHelpers<SignUpData>
        ) => {
          signInMutation(signUpData, {
            onSuccess: () => {
              setSubmitting(false)
              navigate('/auth/signIn')
              toast.success('Account has been created', {
                position: 'bottom-center',
              })
            },
            onError: error => {
              console.log(error)
              setSubmitting(false)
            },
          })
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form className='flex flex-col gap-2 w-96'>
            <CustomField
              placeholder='Enter your first name'
              label='First name'
              error={errors.firstName}
              name='firstName'
              type='text'
            />

            <CustomField
              placeholder='Enter your last name'
              label='Last name'
              error={errors.lastName}
              name='lastName'
              type='text'
            />

            <CustomField
              placeholder='Enter your username'
              label='Username'
              error={errors.username}
              name='username'
              type='text'
            />

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
              className='disabled:bg-opacity-20 self-center bg-white py-2 rounded-full w-full text-black font-bold text-lg'
            >
              Create account
            </button>
          </Form>
        )}
      </Formik>

      <Link
        to='/auth/signIn'
        className='self-center text-lg text-blue-500 hover:underline hover:underline-offset-2 hover:text-blue-400 transition-colors'
      >
        Login
      </Link>
    </div>
  )
}

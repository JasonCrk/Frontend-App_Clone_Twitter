import { FC, useState } from 'react'

import { useAuthStore } from '../store/authStore'

import { useMutation, useQueryClient } from 'react-query'

import { AccountInitialValues, AccountInProfile } from '../interfaces/Account'
import { updateProfile } from '../services/userService'

import { Formik, FormikHelpers, Form } from 'formik'
import * as Yup from 'yup'

import { Modal } from './Modal'
import { Bar } from './Bar'
import { CustomField } from './form/CustomField'
import { CustomTextarea } from './form/CustomTextarea'

import { AiOutlineClose } from 'react-icons/ai'
import { MdAddPhotoAlternate } from 'react-icons/md'

import { toast } from 'react-toastify'

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required(),
  bibliography: Yup.string()
    .max(160, 'Máximo 160 caracteres')
    .notRequired()
    .nullable(),
  location: Yup.string()
    .max(30, 'Máximo 30 caracteres')
    .notRequired()
    .nullable(),
  website: Yup.string()
    .url('Url no valida')
    .max(100, 'Máximo 100 caracteres')
    .notRequired()
    .nullable(),
})

interface State {
  isOpen: boolean
  previewAvatar: string
  previewHeader: string
}

interface ModalEditProfileProps {
  profile: AccountInProfile
}

export const ModalEditProfile: FC<ModalEditProfileProps> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState<State['isOpen']>(false)

  const [previewAvatar, setPreviewAvatar] = useState<State['previewAvatar']>(
    profile.avatar
  )
  const [previewHeader, setPreviewHeader] = useState<State['previewHeader']>(
    profile.header
  )

  const { mutate: updateProfileMutation } = useMutation({
    mutationFn: updateProfile,
  })

  const queryClient = useQueryClient()

  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)

  const initialValues: AccountInitialValues = {
    bibliography: profile.bibliography || '',
    website: profile.website || '',
    location: profile.location || '',
    firstName: profile.user.firstName,
    avatar: null,
    header: null,
  }

  const handleOnSubmit = (
    value: AccountInitialValues,
    actions: FormikHelpers<AccountInitialValues>
  ) => {
    const accountFormData = new FormData()

    const token = useAuthStore.getState().token!

    accountFormData.append('firstName', value.firstName)

    if (value.avatar) accountFormData.append('avatar', value.avatar)
    if (value.header) accountFormData.append('header', value.header)

    if (value.website !== initialValues.website)
      accountFormData.append('website', value.website)

    if (value.bibliography !== initialValues.bibliography)
      accountFormData.append('bibliography', value.bibliography)

    if (value.location !== initialValues.location)
      accountFormData.append('location', value.location)

    updateProfileMutation(
      {
        accountId: profile.id,
        accessToken: token,
        accountData: accountFormData,
      },
      {
        onSuccess: ({ message }) => {
          actions.setSubmitting(false)
          toast.success(message, {
            position: 'bottom-center',
          })

          queryClient.invalidateQueries('profile')
          handleCloseModal()
        },
        onError: error => {
          actions.setSubmitting(false)
          console.log(error)
        },
      }
    )
  }

  return (
    <>
      <div className='flex justify-end mx-4 mt-4 mb-6'>
        <button
          onClick={() => handleOpenModal()}
          className='border border-slate-500 rounded-full bg-transparent px-4 py-2 hover:bg-neutral-800 font-bold text-sm transition-colors'
        >
          Edit profile
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        closeModal={handleCloseModal}
        center
        styles={
          'w-full max-w-lg max-h-[40rem] transform overflow-y-scroll rounded-2xl bg-black align-middle transition-all shadow-neutral-800 shadow-border relative text-white'
        }
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          {({ setFieldValue, isSubmitting, errors }) => (
            <Form>
              <Bar styles='flex justify-between p-3'>
                <div className='flex gap-2 items-center'>
                  <button
                    type='button'
                    className='p-2 rounded-full text-xl hover:bg-neutral-800'
                    onClick={() => handleCloseModal()}
                  >
                    <AiOutlineClose />
                  </button>
                  <h2 className='font-bold'>Edit profile</h2>
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='disabled:opacity-20 px-4 py-1 font-bold rounded-full bg-white text-black'
                >
                  save
                </button>
              </Bar>

              <div className='relative'>
                <div className='relative mb-14'>
                  <img
                    src={previewHeader}
                    alt=''
                    className='w-full h-40 object-cover'
                  />
                  <label
                    htmlFor='header'
                    className='absolute inset-0 m-auto bg-neutral-900/60 hover:bg-neutral-700/60 hover:transition-colors rounded-full w-fit h-fit p-2 text-2xl cursor-pointer'
                  >
                    <MdAddPhotoAlternate />
                  </label>
                  <input
                    id='header'
                    name='header'
                    className='hidden'
                    type='file'
                    accept='image/png, image/jpeg'
                    onChange={e => {
                      setFieldValue('header', e.currentTarget.files![0])
                      setPreviewHeader(
                        URL.createObjectURL(e.currentTarget.files![0])
                      )
                    }}
                  />
                </div>

                <div className='absolute top-28 left-5'>
                  <div className='relative'>
                    <img
                      src={previewAvatar}
                      alt=''
                      className='w-28 h-28 rounded-full border-black border-4 object-cover'
                    />
                    <label
                      htmlFor='avatar'
                      className='absolute inset-0 m-auto bg-neutral-900/60 hover:bg-neutral-700/60 hover:transition-colors rounded-full w-fit h-fit p-2 text-2xl cursor-pointer'
                    >
                      <MdAddPhotoAlternate />
                    </label>
                    <input
                      id='avatar'
                      name='avatar'
                      className='hidden'
                      type='file'
                      accept='image/png, image/jpeg'
                      onChange={e => {
                        setFieldValue('avatar', e.currentTarget.files![0])
                        setPreviewAvatar(
                          URL.createObjectURL(e.currentTarget.files![0])
                        )
                      }}
                    />
                  </div>
                </div>

                <div className='flex flex-col gap-3 p-4'>
                  <CustomField
                    placeholder='Enter your name'
                    label='Name'
                    error={errors.firstName}
                    name='firstName'
                    type='text'
                  />
                  <CustomTextarea
                    placeholder='Enter your bibliography'
                    label='Bibliography'
                    error={errors.bibliography}
                    name='bibliography'
                  />
                  <CustomField
                    placeholder='Enter your location'
                    label='Location'
                    error={errors.location}
                    name='location'
                    type='text'
                  />
                  <CustomField
                    placeholder='Enter your website'
                    label='Website'
                    error={errors.website}
                    name='website'
                    type='url'
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

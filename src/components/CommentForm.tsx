import { FC, useState } from 'react'

import { shallow } from 'zustand/shallow'
import { useAuthStore } from '../store/authStore'

import { useMutation, useQueryClient } from 'react-query'

import { CommentInitialValue } from '../interfaces/Comment'
import { createComment } from '../services/commentService'

import { FileButton } from './form/FileButton'
import { PreviewSelectedImages } from './PreviewSelectedImages'

import { BsImage } from 'react-icons/bs'
import { AiOutlineGif } from 'react-icons/ai'

import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { toast } from 'react-toastify'

import { fileListToFilesUrl } from '../utils/actionsFileList'

const schemaFormValidate = Yup.object().shape({
  content: Yup.string().max(255, 'max 255 characters').required('Is required'),
})

interface CommentFormProps {
  focus?: boolean
  placeholder: string
  initialValue: CommentInitialValue
  afterSend?: () => void
  getCommentFormData: (value: CommentInitialValue) => FormData
}

interface CommentFormState {
  isFocusContent: boolean
  selectedImages: string[]
  selectedFileImages: File[]
}

export const CommentForm: FC<CommentFormProps> = ({
  focus,
  afterSend,
  placeholder,
  initialValue,
  getCommentFormData,
}) => {
  const [isFocusContent, setIsFocusContent] = useState<
    CommentFormState['isFocusContent']
  >(focus || false)

  const [selectedImages, setSelectedImages] = useState<
    CommentFormState['selectedImages']
  >([])

  const [selectedFileImages, setSelectedFileImages] = useState<
    CommentFormState['selectedFileImages']
  >([])

  const { user, token } = useAuthStore(
    state => ({
      user: state.user,
      token: state.token!,
    }),
    shallow
  )

  const queryClient = useQueryClient()

  const { mutate: createCommentMutation } = useMutation({
    mutationFn: createComment,
  })

  const handleChangeImage = (images: FileList | null) => {
    const exceedsEstablished = images!.length + selectedImages.length > 4

    if (exceedsEstablished) {
      toast.warning('only 4 images allowed', {
        position: 'bottom-center',
      })
      return
    }

    if (images) {
      for (const image of images) {
        setSelectedFileImages(prevImages => [...prevImages, image])
      }
    }

    const imageUrls = fileListToFilesUrl(images)

    imageUrls.forEach(imageUrl => {
      setSelectedImages(prevImages => [...prevImages, imageUrl])
    })
  }

  const handleSubmit = async (
    value: CommentInitialValue,
    { setSubmitting }: FormikHelpers<CommentInitialValue>
  ) => {
    setSubmitting(true)

    if (selectedFileImages && selectedFileImages.length > 4) {
      toast.warning('Only 4 images allowed', {
        position: 'bottom-center',
      })

      setSubmitting(false)
      return
    }

    const commentFormData = getCommentFormData(value)

    commentFormData.append('content', value.content)

    if (selectedFileImages) {
      for (const image of selectedFileImages) {
        commentFormData.append('images', image)
      }
    }

    createCommentMutation(
      { accessToken: token!, commentData: commentFormData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('tweetComments')
          queryClient.invalidateQueries('commentComments')
          queryClient.invalidateQueries('tweets')

          if (afterSend) afterSend()
          setSubmitting(false)
        },
        onError: error => {
          console.log(error)
        },
      }
    )
  }

  return (
    <div className={`pt-6 pb-1 grid grid-cols-[auto_1fr] gap-3`}>
      <img
        className='w-11 h-11 object-cover rounded-full'
        src={user?.account.avatar}
        alt=''
      />
      <Formik
        initialValues={initialValue}
        validationSchema={schemaFormValidate}
        onSubmit={handleSubmit}
      >
        {({
          setFieldValue,
          isSubmitting,
          handleChange,
          handleSubmit,
          handleBlur,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col w-full items-start gap-2'>
              <div
                className={`${
                  isFocusContent ? 'h-fit' : 'flex gap-2 h-11'
                } w-full`}
              >
                <textarea
                  name='content'
                  placeholder={placeholder}
                  className={`commentScroll w-full focus:outline-none bg-transparent placeholder:text-neutral-600 resize-none border-b-2 transition-colors ${
                    isFocusContent ? 'text-xl' : 'text-2xl'
                  } ${
                    errors.content
                      ? 'border-red-500'
                      : 'focus:border-blue-600 border-neutral-500'
                  }`}
                  onFocus={() => setIsFocusContent(true)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={3}
                ></textarea>

                <p className='text-red-500'>{errors.content}</p>

                {!isFocusContent && (
                  <button
                    disabled
                    type='button'
                    className='bg-blue-600 disabled:opacity-20 px-5 rounded-full font-bold'
                  >
                    Reply
                  </button>
                )}
              </div>

              {isFocusContent && (
                <>
                  {selectedImages.length > 0 && (
                    <PreviewSelectedImages
                      selectedImages={selectedImages}
                      setFilesImage={setSelectedImages}
                      setSelectedFileImages={setSelectedFileImages}
                    />
                  )}
                  <div className='flex justify-between w-full'>
                    <div className='flex flex-row items-center justify-start'>
                      <FileButton
                        id='images'
                        name='images'
                        Icon={BsImage}
                        multipleSelect
                        accept='image/png, image/jpeg'
                        onChange={e => {
                          handleChangeImage(e.currentTarget.files)
                          setFieldValue('images', e.currentTarget.files)
                        }}
                      />

                      <FileButton
                        id='gifs'
                        name='images'
                        Icon={AiOutlineGif}
                        multipleSelect
                        accept='image/gif'
                        onChange={e => {
                          handleChangeImage(e.currentTarget.files)
                          setFieldValue('images', e.currentTarget.files)
                        }}
                      />
                    </div>
                    <button
                      type='submit'
                      className='bg-blue-600 px-5 py-2 rounded-full font-bold hover:transition-colors disabled:opacity-20'
                      disabled={
                        isSubmitting || !!errors.content || !isFocusContent
                      }
                    >
                      Reply
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

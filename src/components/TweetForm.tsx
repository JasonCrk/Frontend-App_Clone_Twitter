import { FC, useState } from 'react'

import { useAuthStore } from '../store/authStore'

import { TweetInitialValue } from '../interfaces/Tweet'

import { TweetMentionForForm } from './TweetMentionForForm'
import { FileButton } from './form/FileButton'

import { BsImage } from 'react-icons/bs'
import { AiOutlineGif } from 'react-icons/ai'
import { HiOutlineHashtag } from 'react-icons/hi'

import { Formik } from 'formik'
import * as Yup from 'yup'

const schemaFormValidate = Yup.object().shape({
  content: Yup.string().max(255, 'max 255 characters').required('Is required'),
  hashtags: Yup.string()
    .max(100, 'max 100 characters')
    .notRequired()
    .nullable(),
})

interface TweetFormProps {
  placeholder: string
  handleSubmit: (value: any, actions: any) => void
  mention?: string
}

export const TweetForm: FC<TweetFormProps> = ({
  placeholder,
  handleSubmit,
  mention,
}) => {
  const [isFocusContent, setIsFocusContent] = useState(false)
  const [isFocusHashtags, setIsFocusHashtags] = useState(false)

  const user = useAuthStore(state => state.user)

  const initialValue: TweetInitialValue = {
    content: '',
    hashtags: '',
    mention,
    images: [],
  }

  return (
    <div className='p-4 grid grid-cols-[auto_1fr] gap-3'>
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
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col w-full items-start ${
              mention ? 'gap-4' : 'gap-2'
            }`}
          >
            <div
              className={`${
                isFocusContent || mention ? 'h-fit' : 'flex gap-2 h-11'
              } w-full`}
            >
              <textarea
                name='content'
                placeholder={placeholder}
                className={`commentScroll w-full focus:outline-none bg-transparent placeholder:text-neutral-600 resize-none transition-colors ${
                  isFocusContent || mention ? 'text-xl' : 'text-2xl'
                } ${errors.content && 'placeholder:text-neutral-700'}`}
                onFocus={() => setIsFocusContent(true)}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
              ></textarea>
            </div>

            {mention && <TweetMentionForForm tweetId={mention} />}

            <div className='flex justify-between w-full'>
              <div className='flex flex-row items-center justify-start'>
                <FileButton
                  id='images'
                  name='images'
                  Icon={BsImage}
                  multipleSelect
                  accept='image/png, image/jpeg'
                  onChange={e => setFieldValue('images', e.currentTarget.files)}
                />

                <FileButton
                  id='gifs'
                  name='images'
                  Icon={AiOutlineGif}
                  multipleSelect
                  accept='image/gif'
                  onChange={e => setFieldValue('images', e.currentTarget.files)}
                />

                <button
                  className='p-2 rounded-full text-lg text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 transition-[background] cursor-pointer'
                  type='button'
                  onClick={() => setIsFocusHashtags(prev => !prev)}
                >
                  <HiOutlineHashtag />
                </button>
                <input
                  id='hashtags'
                  name='hashtags'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-black outline-none px-2 py-1 border-b border-blue-500 placeholder:text-neutral-600 w-full ${
                    isFocusHashtags ? 'inline-block' : 'hidden'
                  }`}
                  placeholder='separate with ","'
                  type='text'
                />
              </div>

              <button
                type='submit'
                className='bg-blue-600 px-5 py-2 rounded-full font-bold hover:transition-colors disabled:opacity-20'
                disabled={
                  isSubmitting ||
                  !!errors.content ||
                  !!errors.hashtags ||
                  !isFocusContent
                }
              >
                Reply
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

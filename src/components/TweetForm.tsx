import { FC, useState } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { TweetInitialValue } from '../interfaces/Tweet'

import { BsImage } from 'react-icons/bs'
import { AiOutlineGif } from 'react-icons/ai'

const initialValue: TweetInitialValue = {
  content: '',
  images: [],
}

const schemaFormValidate = Yup.object().shape({
  content: Yup.string().max(255, 'max 255 characters').required(),
})

interface TweetFormProps {
  avatar: string
  placeholder: string
  isHomeForm?: boolean
  handleSubmit: (value: any, actions: any) => void
}

const TweetForm: FC<TweetFormProps> = ({
  avatar,
  isHomeForm,
  placeholder,
  handleSubmit,
}) => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <div
      className={`${isHomeForm && 'px-4'} py-4 grid grid-cols-[auto_1fr] gap-3`}
    >
      <img className='w-11 h-11 rounded-full' src={avatar} alt='' />
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
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 w-full items-start'>
              <div
                className={`${!isFocus ? 'flex gap-2 h-11' : 'h-fit'} w-full`}
              >
                <textarea
                  name='content'
                  placeholder={placeholder}
                  className={`commentScroll w-full focus:outline-none bg-transparent placeholder:text-neutral-600 resize-none border-b-2 focus:border-blue-600 border-neutral-500 transition-colors ${
                    isFocus ? 'text-xl' : 'text-2xl'
                  }`}
                  onFocus={() => setIsFocus(true)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={isHomeForm ? 4 : 3}
                ></textarea>
                {!isFocus && (
                  <button
                    disabled
                    type='button'
                    className='disabled:bg-blue-400 bg-blue-600 disabled:opacity-30 px-5 rounded-full font-bold'
                  >
                    Reply
                  </button>
                )}
              </div>

              {isFocus && (
                <div className='flex justify-between w-full'>
                  <div className='flex flex-row items-center justify-start'>
                    <label
                      htmlFor='images'
                      className='p-2 rounded-full text-lg text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 transition-[background] cursor-pointer'
                    >
                      <BsImage />
                    </label>
                    <input
                      id='images'
                      name='images'
                      className='hidden'
                      multiple
                      type='file'
                      accept='image/png, image/jpeg'
                      onChange={e =>
                        setFieldValue('images', e.currentTarget.files)
                      }
                    />
                    <label
                      htmlFor='gifs'
                      className='p-2 rounded-full text-lg text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 transition-[background] cursor-pointer'
                    >
                      <AiOutlineGif />
                    </label>
                    <input
                      id='gifs'
                      name='images'
                      multiple
                      className='hidden'
                      type='file'
                      accept='image/gif'
                      onChange={e =>
                        setFieldValue('images', e.currentTarget.files)
                      }
                    />
                  </div>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='bg-blue-600 px-5 py-2 rounded-full font-bold hover:bg-blue-500 hover:transition-colors disabled:bg-opacity-20'
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default TweetForm

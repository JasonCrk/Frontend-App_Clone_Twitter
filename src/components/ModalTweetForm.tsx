import { FC, Fragment, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { TweetForm } from './TweetForm'
import { TweetInitialValue } from '../interfaces/Tweet'
import { FormikHelpers } from 'formik'
import { createTweet } from '../services/tweetService'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { RiQuillPenLine } from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai'
import { useAuthStore } from '../store/authStore'

export const ModalTweetForm: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const token = useAuthStore(state => state.token!)

  const queryClient = useQueryClient()

  const { mutate: createTweetMutation } = useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      queryClient.invalidateQueries('tweets')
      queryClient.invalidateQueries('mostFollowed')
    },
    onError: () => {
      toast.error('There was an error trying to create the tweet')
    },
  })

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const sendTweet = (
    value: TweetInitialValue,
    actions: FormikHelpers<TweetInitialValue>
  ) => {
    const formTweet = new FormData()

    formTweet.append('content', value.content)

    if (value.hashtags) {
      formTweet.append('hashtags', value.hashtags)
    }

    for (const image of value.images) {
      formTweet.append('images', image)
    }

    createTweetMutation({ tweetData: formTweet, accessToken: token! })

    actions.setSubmitting(false)
    actions.resetForm()

    handleCloseModal()
  }

  return (
    <>
      <button
        className='py-3 rounded-full lg:w-full bg-blue-500 text-lg font-bold max-lg:p-4'
        onClick={() => handleOpenModal()}
      >
        <span className='max-lg:hidden'>Tweet</span>
        <RiQuillPenLine className='lg:hidden text-3xl' />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' onClose={handleCloseModal} className='relative z-10'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-60' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-start justify-center pt-8'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel
                  className={
                    'w-full max-w-lg transform overflow-hidden rounded-2xl bg-black pt-10 px-4 pb-2 text-left align-middle transition-all shadow-neutral-800 shadow-border relative text-white'
                  }
                >
                  <button
                    className='absolute p-2 rounded-full top-2 left-2 text-xl hover:bg-neutral-800'
                    onClick={() => handleCloseModal()}
                  >
                    <AiOutlineClose />
                  </button>
                  <TweetForm
                    handleSubmit={sendTweet}
                    placeholder="What's happening?"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

import { FC, useContext } from 'react'

import { useAuthStore } from '../store/authStore'

import { createTweetContext } from '../context/CreateTweetProvider'

import { useMutation, useQueryClient } from 'react-query'

import { TweetInitialValue } from '../interfaces/Tweet'
import { createTweet } from '../services/tweetService'

import { Dialog } from '@headlessui/react'

import { Modal } from './Modal'
import { TweetForm } from './TweetForm'

import { AiOutlineClose } from 'react-icons/ai'

import { FormikHelpers } from 'formik'

import { toast } from 'react-toastify'

export const ModalTweetForm: FC = () => {
  const token = useAuthStore(state => state.token!)

  const { isOpen, handleClose, mentionTweet } = useContext(createTweetContext)

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

  const sendTweet = (
    value: TweetInitialValue,
    actions: FormikHelpers<TweetInitialValue>
  ) => {
    const formTweet = new FormData()

    formTweet.append('content', value.content)

    if (value.mention) formTweet.append('mention', value.mention)

    if (value.hashtags) formTweet.append('hashtags', value.hashtags)

    value.images.forEach(image => {
      formTweet.append('images', image)
    })

    createTweetMutation({ tweetData: formTweet, accessToken: token! })

    actions.setSubmitting(false)
    actions.resetForm()

    handleClose()
  }

  return (
    <Modal isOpen={isOpen} closeModal={handleClose}>
      <Dialog.Panel
        className={
          'w-full max-w-lg transform overflow-hidden rounded-2xl bg-black pt-10 pb-2 text-left align-middle transition-all shadow-neutral-800 shadow-border relative text-white'
        }
      >
        <button
          className='absolute p-2 rounded-full top-2 left-2 text-xl hover:bg-neutral-800'
          onClick={() => handleClose()}
        >
          <AiOutlineClose />
        </button>

        <TweetForm
          handleSubmit={sendTweet}
          placeholder="What's happening?"
          mention={mentionTweet}
        />
      </Dialog.Panel>
    </Modal>
  )
}

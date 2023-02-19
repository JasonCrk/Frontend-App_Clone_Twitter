import { FC, useContext } from 'react'

import { createTweetContext } from '../context/CreateTweetProvider'

import { useQueryClient } from 'react-query'

import { Dialog } from '@headlessui/react'

import { Modal } from './Modal'
import { TweetForm } from './TweetForm'

import { AiOutlineClose } from 'react-icons/ai'

export const ModalTweetForm: FC = () => {
  const { isOpenCreateTweet, handleCloseCreateTweet, mentionTweet } = useContext(createTweetContext)

  const queryClient = useQueryClient()

  const handleCreateTweet = () => {
    queryClient.invalidateQueries('tweets')
    queryClient.invalidateQueries('trendTweetsList')
    queryClient.invalidateQueries('userTweets')
    queryClient.invalidateQueries('mediaTweets')

    handleCloseCreateTweet()
  }

  return (
    <Modal isOpen={isOpenCreateTweet} closeModal={handleCloseCreateTweet}>
      <Dialog.Panel
        className={
          'w-full max-w-lg transform overflow-hidden rounded-2xl bg-black pt-10 pb-2 text-left align-middle transition-all shadow-neutral-800 shadow-border relative text-white'
        }
      >
        <button
          className='absolute p-2 rounded-full top-2 left-2 text-xl hover:bg-neutral-800'
          onClick={() => handleCloseCreateTweet()}
        >
          <AiOutlineClose />
        </button>

        <TweetForm onComplete={handleCreateTweet} mention={mentionTweet} />
      </Dialog.Panel>
    </Modal>
  )
}

import { FC, useContext } from 'react'

import { createTweetContext } from '../context/CreateTweetProvider'

import { useQueryClient } from 'react-query'

import { Modal } from './Modal'
import { TweetForm } from './TweetForm'

export const ModalTweetForm: FC = () => {
  const { isOpenCreateTweet, handleCloseCreateTweet, mentionTweet } =
    useContext(createTweetContext)

  const queryClient = useQueryClient()

  const handleCreateTweet = () => {
    queryClient.invalidateQueries('tweets')
    queryClient.invalidateQueries('trendTweetsList')
    queryClient.invalidateQueries('userTweets')
    queryClient.invalidateQueries('mediaTweets')

    handleCloseCreateTweet()
  }

  return (
    <Modal
      isOpen={isOpenCreateTweet}
      closeModal={handleCloseCreateTweet}
      styles={
        'w-full max-w-lg transform overflow-hidden rounded-2xl bg-black pt-10 pb-2 text-left align-middle transition-all shadow-neutral-800 shadow-border relative text-white'
      }
    >
      <TweetForm onComplete={handleCreateTweet} mention={mentionTweet} />
    </Modal>
  )
}

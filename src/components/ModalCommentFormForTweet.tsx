import { FC, useContext } from 'react'

import { createCommentForTweetContext } from '../context/CreateCommentForTweetProvider'
import { CommentFormForTweet } from './CommentFormForTweet'

import { Modal } from './Modal'
import { TweetItemById } from './TweetItemById'

export const ModalCommentFormForTweet: FC = () => {
  const {
    isOpenCreateCommentForTweet,
    handleCloseCreateCommentForTweet,
    tweetId,
  } = useContext(createCommentForTweetContext)

  return (
    <Modal
      isOpen={isOpenCreateCommentForTweet}
      closeModal={handleCloseCreateCommentForTweet}
      styles={
        'w-full max-w-lg transform overflow-hidden rounded-2xl bg-black pt-10 pb-2 text-left align-middle transition-all shadow-neutral-800 shadow-border relative text-white'
      }
    >
      <TweetItemById tweetId={tweetId} hideActions noLink />
      <div className='px-5'>
        <CommentFormForTweet
          tweetId={tweetId}
          autoFocus
          afterSend={() => {
            handleCloseCreateCommentForTweet()
          }}
        />
      </div>
    </Modal>
  )
}

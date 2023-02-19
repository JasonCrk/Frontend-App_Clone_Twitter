import type { FC } from 'react'

import { CommentInitialValue } from '../interfaces/Comment'

import { CommentForm } from './CommentForm'

interface CommentFormForTweetProps {
  tweetId: string
  autoFocus?: boolean
  afterSend?: () => void
}

export const CommentFormForTweet: FC<CommentFormForTweetProps> = ({
  tweetId,
  autoFocus,
  afterSend,
}) => {
  const commentFormData = (value: CommentInitialValue) => {
    const commentFormData = new FormData()
    commentFormData.append('postId', value.postId!)

    return commentFormData
  }

  const commentInitialValue: CommentInitialValue = {
    content: '',
    postId: tweetId,
    images: [],
  }

  return (
    <CommentForm
      focus={autoFocus}
      afterSend={afterSend}
      placeholder='Tweet you reply'
      initialValue={commentInitialValue}
      getCommentFormData={commentFormData}
    />
  )
}

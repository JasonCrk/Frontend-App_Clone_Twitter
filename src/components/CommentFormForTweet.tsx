import type { FC } from 'react'

import { CommentInitialValue } from '../interfaces/Comment'

import { CommentForm } from './CommentForm'

interface CommentFormForTweetProps {
  tweetId: string
}

export const CommentFormForTweet: FC<CommentFormForTweetProps> = ({
  tweetId,
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
      placeholder='Tweet you reply'
      initialValue={commentInitialValue}
      getCommentFormData={commentFormData}
    />
  )
}

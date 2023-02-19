import type { FC } from 'react'

import { CommentInitialValue } from '../interfaces/Comment'

import { CommentForm } from './CommentForm'

interface CommentFormForCommentProps {
  commentId: string
  autoFocus?: boolean
  afterSend?: () => void
}

export const CommentFormForComment: FC<CommentFormForCommentProps> = ({
  commentId,
  autoFocus,
  afterSend,
}) => {
  const commentFormData = (value: CommentInitialValue) => {
    const commentFormData = new FormData()
    commentFormData.append('commentId', value.commentId!)

    return commentFormData
  }

  const commentInitialValue: CommentInitialValue = {
    content: '',
    commentId,
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

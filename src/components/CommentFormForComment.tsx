import type { FC } from 'react'

import { CommentInitialValue } from '../interfaces/Comment'

import { CommentForm } from './CommentForm'

interface CommentFormForCommentProps {
  commentId: string
}

export const CommentFormForComment: FC<CommentFormForCommentProps> = ({
  commentId,
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
      placeholder='Tweet you reply'
      initialValue={commentInitialValue}
      getCommentFormData={commentFormData}
    />
  )
}

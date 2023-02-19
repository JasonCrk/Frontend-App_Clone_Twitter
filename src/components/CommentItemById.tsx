import type { FC } from 'react'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { Comment } from '../interfaces/Comment'
import { getCommentById } from '../services/commentService'

import Spinner from './Spinner'
import { CommentItem } from './CommentItem'

interface CommentItemByIdProps {
  commentId: string
  noLink?: boolean
  hideActions?: boolean
}

export const CommentItemById: FC<CommentItemByIdProps> = ({
  commentId,
  noLink,
  hideActions,
}) => {
  const {
    data: comment,
    isLoading,
    error,
  } = useQuery<Comment, AxiosError>(['commentPatern', commentId], () =>
    getCommentById(commentId)
  )

  if (isLoading)
    return (
      <div className='flex justify-center py-5'>
        <Spinner />
      </div>
    )

  if (error)
    return <div className='text-center text-lg text-red-600'>Hubo un error</div>

  return (
    <CommentItem
      commentData={comment!}
      showConnectionBottom
      noLink={noLink}
      hideActions={hideActions}
    />
  )
}

import { FC, useContext } from 'react'

import { createCommentForCommentContext } from '../context/CreateCommentForCommentProvider'
import { CommentFormForComment } from './CommentFormForComment'
import { CommentItemById } from './CommentItemById'

import { Modal } from './Modal'

export const ModalCommentFormForComment: FC = () => {
  const {
    isOpenCreateCommentForComment,
    handleCloseCreateCommentForComment,
    commentId,
  } = useContext(createCommentForCommentContext)

  return (
    <Modal
      isOpen={isOpenCreateCommentForComment}
      closeModal={handleCloseCreateCommentForComment}
      styles={
        'w-full max-w-lg transform overflow-hidden rounded-2xl bg-black pt-10 pb-2 text-left align-middle transition-all shadow-neutral-800 shadow-border relative text-white'
      }
    >
      <CommentItemById commentId={commentId} noLink hideActions />
      <div className='px-5'>
        <CommentFormForComment
          commentId={commentId}
          autoFocus
          afterSend={() => {
            handleCloseCreateCommentForComment()
          }}
        />
      </div>
    </Modal>
  )
}

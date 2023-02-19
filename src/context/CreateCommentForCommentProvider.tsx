import { FC, useState, createContext, ReactNode } from 'react'

interface CreateCommentForCommentState {
  commentId: string
  isOpenCreateCommentForComment: boolean
  handleOpenCreateCommentForComment: (commentId: string) => void
  handleCloseCreateCommentForComment: () => void
}

interface CreateCommentForCommentProviderProps {
  children: ReactNode
}

export const createCommentForCommentContext =
  createContext<CreateCommentForCommentState>({
    commentId: '',
    isOpenCreateCommentForComment: false,
    handleCloseCreateCommentForComment: () => {},
    handleOpenCreateCommentForComment: () => {},
  })

const CreateCommentForCommentProvider: FC<
  CreateCommentForCommentProviderProps
> = ({ children }) => {
  const [isOpen, setIsOpen] =
    useState<CreateCommentForCommentState['isOpenCreateCommentForComment']>(
      false
    )

  const [commentId, setCommentId] =
    useState<CreateCommentForCommentState['commentId']>('')

  const handleOpen: CreateCommentForCommentState['handleOpenCreateCommentForComment'] =
    commentIdValue => {
      setCommentId(commentIdValue)
      setIsOpen(true)
    }

  const handleClose: CreateCommentForCommentState['handleCloseCreateCommentForComment'] =
    () => {
      setIsOpen(false)
    }

  return (
    <createCommentForCommentContext.Provider
      value={{
        commentId,
        isOpenCreateCommentForComment: isOpen,
        handleCloseCreateCommentForComment: handleClose,
        handleOpenCreateCommentForComment: handleOpen,
      }}
    >
      {children}
    </createCommentForCommentContext.Provider>
  )
}

export default CreateCommentForCommentProvider

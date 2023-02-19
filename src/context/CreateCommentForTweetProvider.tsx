import { createContext, FC, useState, ReactNode } from 'react'

interface CreateCommentForTweetState {
  isOpenCreateCommentForTweet: boolean
  handleOpenCreateCommentForTweet: (tweetId: string) => void
  handleCloseCreateCommentForTweet: () => void
  tweetId: string
}

interface CreateCommentForTweetProviderProps {
  children: ReactNode
}

export const createCommentForTweetContext =
  createContext<CreateCommentForTweetState>({
    isOpenCreateCommentForTweet: false,
    tweetId: '',
    handleOpenCreateCommentForTweet: () => {},
    handleCloseCreateCommentForTweet: () => {},
  })

const CreateCommentForTweetProvider: FC<CreateCommentForTweetProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] =
    useState<CreateCommentForTweetState['isOpenCreateCommentForTweet']>(false)
  const [tweetId, setTweetId] =
    useState<CreateCommentForTweetState['tweetId']>('')

  const handleOpen: CreateCommentForTweetState['handleOpenCreateCommentForTweet'] =
    tweetIdValue => {
      setTweetId(tweetIdValue)
      setIsOpen(true)
    }

  const handleClose: CreateCommentForTweetState['handleCloseCreateCommentForTweet'] =
    () => {
      setIsOpen(false)
    }

  return (
    <createCommentForTweetContext.Provider
      value={{
        isOpenCreateCommentForTweet: isOpen,
        tweetId,
        handleOpenCreateCommentForTweet: handleOpen,
        handleCloseCreateCommentForTweet: handleClose,
      }}
    >
      {children}
    </createCommentForTweetContext.Provider>
  )
}

export default CreateCommentForTweetProvider

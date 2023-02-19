import { FC, createContext, ReactNode, useState } from 'react'

interface CreateTweetContextState {
  isOpenCreateTweet: boolean
  mentionTweet?: string
  handleOpenCreateTweet: (tweetId?: string) => void
  handleCloseCreateTweet: () => void
}

interface CreateTweetProviderProps {
  children: ReactNode
}

export const createTweetContext = createContext<CreateTweetContextState>({
  isOpenCreateTweet: false,
  mentionTweet: '',
  handleOpenCreateTweet: () => {},
  handleCloseCreateTweet: () => {},
})

const CreateTweetProvider: FC<CreateTweetProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] =
    useState<CreateTweetContextState['isOpenCreateTweet']>(false)

  const [mentionTweet, setMentionTweet] =
    useState<CreateTweetContextState['mentionTweet']>(undefined)

  const handleOpen: CreateTweetContextState['handleOpenCreateTweet'] = (
    tweetId?: string
  ) => {
    setMentionTweet(tweetId)
    setIsOpen(true)
  }

  const handleClose: CreateTweetContextState['handleCloseCreateTweet'] = () => {
    setMentionTweet(undefined)
    setIsOpen(false)
  }

  return (
    <createTweetContext.Provider
      value={{
        isOpenCreateTweet: isOpen,
        mentionTweet,
        handleOpenCreateTweet: handleOpen,
        handleCloseCreateTweet: handleClose,
      }}
    >
      {children}
    </createTweetContext.Provider>
  )
}

export default CreateTweetProvider

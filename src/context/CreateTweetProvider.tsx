import { FC, createContext, ReactNode, useState } from 'react'

interface createTweetContextState {
  isOpen: boolean
  mentionTweet?: string
  handleOpen: (tweetId?: string) => void
  handleClose: () => void
}

interface CreateTweetProviderProps {
  children: ReactNode
}

export const createTweetContext = createContext<createTweetContextState>({
  isOpen: false,
  mentionTweet: '',
  handleOpen: () => {},
  handleClose: () => {},
})

const CreateTweetProvider: FC<CreateTweetProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<createTweetContextState['isOpen']>(false)

  const [mentionTweet, setMentionTweet] =
    useState<createTweetContextState['mentionTweet']>(undefined)

  const handleOpen: createTweetContextState['handleOpen'] = (
    tweetId?: string
  ) => {
    setMentionTweet(tweetId)
    setIsOpen(true)
  }

  const handleClose: createTweetContextState['handleClose'] = () => {
    setMentionTweet(undefined)
    setIsOpen(false)
  }

  return (
    <createTweetContext.Provider
      value={{
        isOpen,
        mentionTweet,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </createTweetContext.Provider>
  )
}

export default CreateTweetProvider

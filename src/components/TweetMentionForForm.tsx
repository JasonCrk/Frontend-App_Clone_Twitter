import { FC } from 'react'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { Tweet } from '../interfaces/Tweet'
import { getTweetById } from '../services/tweetService'

import Spinner from './Spinner'
import { TweetMentionItem } from './TweetMentionItem'

interface TweetMentionForFormProps {
  tweetId: string
}

export const TweetMentionForForm: FC<TweetMentionForFormProps> = ({
  tweetId,
}) => {
  const {
    data: tweet,
    isLoading,
    error,
  } = useQuery<Tweet, AxiosError>(['tweetMention', tweetId], () =>
    getTweetById(tweetId)
  )

  if (isLoading)
    return (
      <div className='flex justify-center'>
        <Spinner />
      </div>
    )

  if (error || !tweet)
    return <div className='text-center text-xl text-red-600'>Hubo un error</div>

  return <TweetMentionItem tweet={tweet} />
}

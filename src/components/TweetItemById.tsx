import { FC } from 'react'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { Tweet } from '../interfaces/Tweet'
import { getTweetById } from '../services/tweetService'

import Spinner from './Spinner'
import TweetItem from './TweetItem'

interface TweetItemByIdProps {
  tweetId: string
  hideActions?: boolean
  noLink?: boolean
}

export const TweetItemById: FC<TweetItemByIdProps> = ({
  tweetId,
  hideActions,
  noLink,
}) => {
  const {
    data: tweet,
    isLoading,
    error,
  } = useQuery<Tweet, AxiosError>(['tweetPatern', tweetId], () =>
    getTweetById(tweetId)
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
    <TweetItem
      tweetData={tweet!}
      showConnection
      noLink={noLink}
      hideActions={hideActions}
    />
  )
}

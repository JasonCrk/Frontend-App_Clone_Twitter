import type { FC } from 'react'

import { useParams } from 'react-router-dom'

import { AxiosError } from 'axios'
import { useQuery } from 'react-query'

import { Tweet } from '../interfaces/Tweet'
import { getUserTweets } from '../services/tweetService'

import TweetItem from './TweetItem'
import Spinner from './Spinner'

export const UserTweets: FC = () => {
  const { username } = useParams() as { username: string }

  const {
    data: tweets,
    isLoading,
    error,
  } = useQuery<Tweet[], AxiosError>(['userTweets', username], () =>
    getUserTweets(username)
  )

  if (isLoading)
    return (
      <div className='flex justify-center'>
        <Spinner />
      </div>
    )

  if (error)
    return (
      <div className='text-center text-lg text-red-500 pt-4'>Hubo un error</div>
    )

  if (tweets?.length === 0)
    return (
      <h6 className='text-center mt-4 font-bold text-lg'>
        No hay ningún Tweet
      </h6>
    )

  return (
    <div className='divide-y divide-outline-layout'>
      {tweets?.map(tweet => (
        <TweetItem key={tweet.id} tweetData={tweet} />
      ))}
    </div>
  )
}

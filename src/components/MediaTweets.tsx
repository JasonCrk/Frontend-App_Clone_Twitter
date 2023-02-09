import type { FC } from 'react'

import { useParams } from 'react-router-dom'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { Tweet } from '../interfaces/Tweet'
import { getMediaTweets } from '../services/tweetService'

import Spinner from './Spinner'
import TweetItem from './TweetItem'

export const MediaTweets: FC = () => {
  const { username } = useParams() as { username: string }

  const {
    data: tweets,
    isLoading,
    error,
  } = useQuery<Tweet[], AxiosError>(['mediaTweets', username], () =>
    getMediaTweets(username)
  )

  if (isLoading)
    return (
      <div className='flex justify-center'>
        <Spinner />
      </div>
    )

  if (error)
    return <div className='text-center text-xl text-red-600'>Hubo un error</div>

  return (
    <div className='divide-y divide-outline-layout'>
      {tweets!.map(tweet => (
        <TweetItem key={tweet.id} {...tweet} />
      ))}
    </div>
  )
}

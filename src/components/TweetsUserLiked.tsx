import type { FC } from 'react'

import { useParams } from 'react-router-dom'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { Tweet } from '../interfaces/Tweet'
import { getLikedTweets } from '../services/tweetService'

import TweetItem from './TweetItem'
import Spinner from './Spinner'

export const TweetsUserLiked: FC = () => {
  const { username } = useParams() as { username: string }

  const {
    data: tweets,
    isLoading,
    error,
  } = useQuery<Tweet[], AxiosError>(['userLikedTweets', username], () =>
    getLikedTweets(username)
  )

  if (isLoading)
    return (
      <div className='flex justify-center pt-10'>
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
      {tweets!.map(tweet => (
        <TweetItem key={tweet.id} tweetData={tweet} />
      ))}
    </div>
  )
}

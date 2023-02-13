import type { FC } from 'react'

import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { Tweet } from '../interfaces/Tweet'
import { AxiosError } from 'axios'
import { getLikedTweets } from '../services/tweetService'

import TweetItem from './TweetItem'
import Spinner from './Spinner'

export const TweetsUserLiked: FC = () => {
  const { username } = useParams()

  const {
    data: tweets,
    isLoading,
    error,
  } = useQuery<Tweet[], AxiosError>(['userLikedTweets', username], () =>
    getLikedTweets(username!)
  )

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      ) : error ? (
        <div className='text-center text-red-500'>Hubo un error</div>
      ) : tweets ? (
        <div className='divide-y divide-outline-layout'>
          {tweets.length === 0 ? (
            <h6 className='text-center mt-4 font-bold text-lg'>
              No hay ningun Tweet
            </h6>
          ) : (
            tweets.map(tweet => <TweetItem key={tweet.id} tweetData={tweet} />)
          )}
        </div>
      ) : null}
    </>
  )
}

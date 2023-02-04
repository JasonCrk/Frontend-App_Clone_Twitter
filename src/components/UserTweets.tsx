import { FC } from 'react'

import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { Tweet } from '../interfaces/Tweet'
import { AxiosError } from 'axios'
import { getUserTweets } from '../services/tweetService'

import TweetItem from './TweetItem'
import Spinner from './Spinner'

export const UserTweets: FC = () => {
  const { username } = useParams()

  const {
    data: tweets,
    isLoading,
    error,
  } = useQuery<Tweet[], AxiosError>(['userTweets', username], () =>
    getUserTweets(username!)
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
        <div>
          {tweets.map(tweet => (
            <TweetItem key={tweet.id} {...tweet} />
          ))}
        </div>
      ) : null}
    </>
  )
}

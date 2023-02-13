import type { FC } from 'react'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { Tweet } from '../interfaces/Tweet'
import { getAllTweets } from '../services/tweetService'

import { Bar } from '../components/Bar'
import { InputSearch } from '../components/InputSearch'
import TrendTweetsList from '../components/TrendTweetsList'
import TweetItem from '../components/TweetItem'
import Spinner from '../components/Spinner'

export const ExplorePage: FC = () => {
  const { data: tweets, isLoading } = useQuery<Tweet[], AxiosError>(
    'tweets',
    getAllTweets
  )

  return (
    <>
      <Bar styles='px-4 py-2'>
        <InputSearch searchBar />
      </Bar>
      <div>
        <h6 className='px-4 py-3 text-xl font-extrabold'>Trends for you</h6>
        <TrendTweetsList />
      </div>

      {isLoading ? (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      ) : tweets ? (
        <div className='divide-y divide-outline-layout border-t border-outline-layout'>
          {tweets.map(tweet => (
            <TweetItem key={tweet.id} tweetData={tweet} />
          ))}
        </div>
      ) : null}
    </>
  )
}

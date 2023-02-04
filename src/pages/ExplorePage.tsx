import type { FC } from 'react'

import TrendTweetsList from '../components/TrendTweetsList'
import TweetItem from '../components/TweetItem'
import Spinner from '../components/Spinner'
import { Bar } from '../components/Bar'

import { BsSearch } from 'react-icons/bs'
import { Tweet } from '../interfaces/Tweet'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { getAllTweets } from '../services/tweetService'

export const ExplorePage: FC = () => {
  const { data: tweets, isLoading } = useQuery<Tweet[], AxiosError>(
    'tweets',
    getAllTweets
  )

  return (
    <>
      <Bar styles='px-4 py-2'>
        <label className='relative'>
          <input
            type='text'
            className='peer/search pr-4 pl-12 py-3 placeholder:text-zinc-500 focus:outline-none focus:bg-transparent border border-transparent focus:border-blue-500 rounded-full w-full bg-zinc-900'
            placeholder='Search Twitter'
          />
          <BsSearch className='absolute top-0.5 left-4 text-lg text-zinc-500 peer-focus/search:text-blue-600' />
        </label>
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
        <div className='divide-y divide-neutral-500 border-t border-neutral-500'>
          {tweets.map(tweet => (
            <TweetItem key={tweet.id} {...tweet} />
          ))}
        </div>
      ) : null}
    </>
  )
}

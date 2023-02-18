import type { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { TrendTweets } from '../interfaces/Tweet'
import { getTrendTweetsLargeList } from '../services/tweetService'

import Spinner from '../components/Spinner'
import TrendTweetsItem from '../components/TrendTweetItem'
import { Bar } from '../components/Bar'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export const TrendsPage: FC = () => {
  const navigate = useNavigate()

  const {
    data: trends,
    isLoading,
    error,
  } = useQuery<TrendTweets, AxiosError>(
    'trendTweetsLargeList',
    getTrendTweetsLargeList
  )

  if (isLoading)
    return (
      <div className='flex justify-center pt-10'>
        <Spinner />
      </div>
    )

  if (error) return <div className='text-red-500 text-center text-xl py-6'>Hubo un error</div>

  return (
    <>
      <Bar styles='py-3 px-4 flex gap-6 text-xl items-center'>
        <button
          onClick={() => navigate(-1)}
          className='p-2 hover:bg-neutral-800 rounded-full transition-colors'
        >
          <AiOutlineArrowLeft />
        </button>
        <p className='font-bold'>Trends</p>
      </Bar>
      {trends && Object.keys(trends).length === 0 ? (
        <div className='pt-3 pb-6 text-center text-lg text-blue-200'>
          No trends :(
        </div>
      ) : (
        Object.keys(trends!).map((hashtag, index) => (
          <TrendTweetsItem
            key={index}
            hashtag={hashtag}
            countTweets={trends![hashtag]}
          />
        ))
      )}
    </>
  )
}

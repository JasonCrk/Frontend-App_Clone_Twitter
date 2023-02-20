import { FC } from 'react'

import { Link } from 'react-router-dom'

import { useQuery } from 'react-query'

import { TrendTweets } from '../interfaces/Tweet'

import { getTrendTweetsList } from '../services/tweetService'

import TrendTweetsItem from './TrendTweetItem'
import Spinner from './Spinner'

const TrendTweetsList: FC = () => {
  const {
    data: trends,
    isLoading,
    error,
  } = useQuery<TrendTweets>('trendTweetsList', getTrendTweetsList)

  if (isLoading)
    return (
      <div className='flex justify-center pt-3 pb-6'>
        <Spinner />
      </div>
    )

  if (error)
    return <div className='text-red-500 text-center text-lg'>Hubo un error</div>

  if (trends && Object.keys(trends).length === 0)
    return (
      <div className='pt-3 pb-6 text-center text-lg text-blue-200'>
        No trends :(
      </div>
    )

  return (
    <>
      {Object.keys(trends!).map((hashtag, index) => (
        <TrendTweetsItem
          key={index}
          hashtag={hashtag}
          countTweets={trends![hashtag]}
        />
      ))}

      <Link to={'/trends'}>
        <div className='py-3 px-4 w-full hover:bg-white/5 hover:transition-colors text-sky-500'>
          Show More
        </div>
      </Link>
    </>
  )
}

export default TrendTweetsList

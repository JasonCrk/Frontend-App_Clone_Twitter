import { FC, useContext } from 'react'

import { useProtect } from '../hooks/useProtect'

import { createTweetContext } from '../context/CreateTweetProvider'

import { useQuery, useQueryClient } from 'react-query'

import { getAllTweets } from '../services/tweetService'

import { Bar } from '../components/Bar'
import { TweetForm } from '../components/TweetForm'
import TweetItem from '../components/TweetItem'
import Spinner from '../components/Spinner'

export const HomePage: FC = () => {
  const { user, isLoadingAuth } = useProtect()
  const { isOpen } = useContext(createTweetContext)

  const queryClient = useQueryClient()

  const { data: tweets, isLoading, error } = useQuery('tweets', getAllTweets)

  const handleCreateTweet = () => {
    queryClient.invalidateQueries('tweets')
    queryClient.invalidateQueries('trendTweetsList')
  }

  return (
    <>
      <Bar styles='text-xl py-3 px-4 font-bold'>Home</Bar>

      {isLoadingAuth ? (
        <div className='flex justify-center pt-10'>
          <Spinner />
        </div>
      ) : user && !isOpen ? (
        <TweetForm onComplete={handleCreateTweet} />
      ) : null}

      {isLoading ? (
        <div className='flex justify-center pt-10'>
          <Spinner />
        </div>
      ) : error ? (
        <div>Error</div>
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

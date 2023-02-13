import type { FC } from 'react'

import { useProtect } from '../hooks/useProtect'

import { useQuery, useMutation, useQueryClient } from 'react-query'

import { TweetInitialValue } from '../interfaces/Tweet'
import { createTweet, getAllTweets } from '../services/tweetService'

import { Bar } from '../components/Bar'
import { TweetForm } from '../components/TweetForm'
import TweetItem from '../components/TweetItem'
import Spinner from '../components/Spinner'

import { FormikHelpers } from 'formik'

import { toast } from 'react-toastify'

export const HomePage: FC = () => {
  const { user, isLoadingAuth, token } = useProtect()

  const queryClient = useQueryClient()

  const { data: tweets, isLoading, error } = useQuery('tweets', getAllTweets)

  const { mutate: createTweetMutation } = useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      queryClient.invalidateQueries('tweets')
    },
    onError: () => {
      toast.error('There was an error trying to create the tweet')
    },
  })

  const sendTweet = (
    value: TweetInitialValue,
    { resetForm, setSubmitting }: FormikHelpers<TweetInitialValue>
  ) => {
    const formTweet = new FormData()

    formTweet.append('content', value.content)

    if (value.hashtags) {
      formTweet.append('hashtags', value.hashtags)
    }

    value.images.forEach(image => {
      formTweet.append('images', image)
    })

    resetForm()

    createTweetMutation({ tweetData: formTweet, accessToken: token! })

    setSubmitting(false)
  }

  return (
    <>
      <Bar styles='text-xl py-3 px-4 font-bold'>Home</Bar>

      {isLoadingAuth ? (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      ) : user ? (
        <TweetForm handleSubmit={sendTweet} placeholder="What's happening?" />
      ) : null}

      {isLoading ? (
        <div className='flex justify-center'>
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

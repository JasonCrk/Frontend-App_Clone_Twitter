import { FC } from 'react'

import { useAuthStore } from '../store/authStore'

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
  const queryClient = useQueryClient()

  const user = useAuthStore(state => state.user)
  const isLoadingAuth = useAuthStore(state => state.loading)
  const token = useAuthStore(state => state.token!)

  const { data: tweets, isLoading, error } = useQuery('tweets', getAllTweets)

  const showAlertError = (message: string) => {
    toast.error(message)
  }

  const { mutate: createTweetMutation } = useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      queryClient.invalidateQueries('tweets')
    },
    onError: () => {
      showAlertError('Hubo un error al intentar publicar el Tweet')
    },
  })

  const sendTweet = (
    value: TweetInitialValue,
    actions: FormikHelpers<TweetInitialValue>
  ) => {
    const formTweet = new FormData()

    formTweet.append('content', value.content)

    for (const image of value.images) {
      formTweet.append('images', image)
    }

    createTweetMutation({ tweetData: formTweet, accessToken: token })

    actions.setSubmitting(false)
  }

  return (
    <>
      <Bar styles='text-xl py-3 px-4 font-bold'>Home</Bar>

      {isLoadingAuth ? (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      ) : user ? (
        <TweetForm
          handleSubmit={sendTweet}
          avatar={user!.account.avatar}
          placeholder="What's happening?"
          isHomeForm
        />
      ) : null}

      {isLoading ? (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      ) : error ? (
        <div>Error</div>
      ) : tweets ? (
        tweets.map(tweet => <TweetItem key={tweet.id} {...tweet} />)
      ) : null}
    </>
  )
}

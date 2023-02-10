import { FC, useEffect } from 'react'

import { redirect, Link, useParams, useNavigate } from 'react-router-dom'

import { useQueryClient, useMutation, useQuery } from 'react-query'

import { useAuthStore } from '../store/authStore'

import { Tweet, TweetInitialValue } from '../interfaces/Tweet'
import { getTweetById, likeTweet } from '../services/tweetService'

import { Bar } from '../components/Bar'
import { TweetForm } from '../components/TweetForm'
import { TweetMenu } from '../components/TweetMenu'

import Spinner from '../components/Spinner'

import { BsFillPatchCheckFill } from 'react-icons/bs'
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineArrowLeft,
} from 'react-icons/ai'

import { formatDateTime } from '../utils/formatDate'

import { FormikHelpers } from 'formik'

import { AxiosError } from 'axios'

export const DetailTweetPage: FC = () => {
  const { tweetId } = useParams()
  const navigate = useNavigate()

  const { data: tweet, isLoading } = useQuery<Tweet, AxiosError>('tweet', () =>
    getTweetById(tweetId as string)
  )

  const queryClient = useQueryClient()

  const isAuth = useAuthStore(state => state.isAuth)
  const userAuth = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token)

  const { mutate: likeTweetMutation } = useMutation({
    mutationFn: likeTweet,
    onSuccess: () => {
      queryClient.invalidateQueries('tweet')
    },
  })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const sendCommentTweet = (
    value: TweetInitialValue,
    actions: FormikHelpers<TweetInitialValue>
  ) => {
    console.log(value)
    actions.setSubmitting(false)
  }

  const likeCheck = (): boolean => {
    const userLike = tweet?.likes.find(user => user.id === userAuth?.id)
    return Boolean(userLike)
  }

  const handleLikeTweet = () => {
    if (isAuth) return redirect('/auth/signIn')

    likeTweetMutation({ tweetId: tweet!.id, accessToken: token! })
  }

  const handleDeleteTweet = () => {
    navigate('/home')
  }

  if (isLoading)
    return (
      <>
        <Bar styles='py-3 px-4 flex gap-6 text-xl items-center'>
          <Link
            to={'/home'}
            className='p-2 hover:bg-neutral-800 rounded-full transition-colors'
          >
            <AiOutlineArrowLeft />
          </Link>
          <p className='font-bold'>Tweet</p>
        </Bar>
        <div className='flex justify-center pt-10'>
          <Spinner />
        </div>
      </>
    )

  return (
    <>
      <Bar styles='py-3 px-4 flex gap-6 text-xl items-center'>
        <Link
          to={'/home'}
          className='p-2 hover:bg-neutral-800 rounded-full transition-colors'
        >
          <AiOutlineArrowLeft />
        </Link>
        <p className='font-bold'>Tweet</p>
      </Bar>
      <div className='p-4 relative'>
        <TweetMenu
          tweetId={tweet!.id}
          username={tweet!.user.username}
          actionDeleteTweet={handleDeleteTweet}
        />
        <Link to={`/${tweet?.user.username}`} className='flex gap-3 mb-4 w-fit'>
          <img
            src={tweet!.user.account.avatar}
            alt={tweet!.user.username}
            className='rounded-full w-12'
          />
          <div className='flex flex-col gap-1 justify-center'>
            <div className='flex gap-1 text-lg leading-4'>
              <span className='hover:underline font-bold'>
                {tweet?.user.username}
              </span>
              {tweet?.user.account.verify && (
                <BsFillPatchCheckFill className='text-blue-500' />
              )}
            </div>
            <div className='text-neutral-500'>@{tweet?.user.username}</div>
          </div>
        </Link>
        <div>
          <p className='mb-2'>{tweet?.content}</p>
          {tweet?.images.length === 1 ? (
            <img
              src={tweet.images[0].imageUrl}
              key={tweet.images[0].id}
              alt=''
              className='rounded-2xl w-full mb-4'
              width={1080}
              height={900}
            />
          ) : tweet?.images.length === 2 ? (
            <div className='grid grid-cols-2 mb-4 rounded-2xl'>
              {tweet.images.map(image => (
                <img
                  src={image.imageUrl}
                  key={image.id}
                  alt=''
                  className='h-96 w-full mb-4 object-cover'
                  width={1080}
                  height={900}
                />
              ))}
            </div>
          ) : null}
          <div className='pb-3 border-b border-neutral-600 flex gap-4 text-neutral-500'>
            <span>{formatDateTime(tweet!.createdAt)}</span>
            <p>
              <span className='text-white'>{tweet?.comments.length}</span> Quote
              Tweets
            </p>
            <p>
              <span className='text-white'>{tweet?.likes.length}</span> Likes
            </p>
          </div>
          <div className='flex justify-around py-1 items-center gap-6 border-b border-neutral-600 text-2xl'>
            <button
              className={`${
                likeCheck() && 'text-pink-600'
              } hover:bg-pink-600 hover:bg-opacity-10 hover:text-pink-600 hover:transition-[background] p-2 rounded-full`}
              onClick={() => handleLikeTweet()}
            >
              {likeCheck() ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <button className='p-2 hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500 hover:transition-[background] rounded-full'>
              <AiOutlineComment />
            </button>
          </div>
          <TweetForm
            handleSubmit={sendCommentTweet}
            placeholder='Tweet your reply'
          />
        </div>
      </div>

      {/*
      {tweet?.comments.length === 0 ? (
        <div className='pb-4 text-center font-bold text-xl'>
          NO HAY COMENTARIOS
        </div>
      ) : (
        tweet?.comments.map(comment => (
          <CommentItem key={comment.id} {...comment} />
        ))
      )}
      */}
    </>
  )
}

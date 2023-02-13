import { FC, useEffect } from 'react'

import { redirect, Link, useParams, useNavigate } from 'react-router-dom'

import { useQueryClient, useMutation, useQuery } from 'react-query'

import { useAuthStore } from '../store/authStore'

import { AxiosError } from 'axios'
import { Tweet } from '../interfaces/Tweet'
import { getTweetById, likeTweet } from '../services/tweetService'

import { Bar } from '../components/Bar'
import { TweetMenu } from '../components/TweetMenu'

import Spinner from '../components/Spinner'
import { GridImages } from '../components/GridImages'
import { TweetMentionItem } from '../components/TweetMentionItem'
import { CommentForm } from '../components/CommentForm'
import { CommentsListForTweet } from '../components/CommentsListForTweet'

import { BsFillPatchCheckFill } from 'react-icons/bs'
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineArrowLeft,
} from 'react-icons/ai'

import { formatDateTime } from '../utils/formatDate'

export const DetailTweetPage: FC = () => {
  const { tweetId } = useParams() as { tweetId: string }
  const navigate = useNavigate()

  const { data: tweet, isLoading } = useQuery<Tweet, AxiosError>(
    ['tweet', tweetId],
    () => getTweetById(tweetId)
  )

  const queryClient = useQueryClient()

  const isAuth = useAuthStore(state => state.isAuth)
  const userAuth = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token!)

  const { mutate: likeTweetMutation } = useMutation({
    mutationFn: likeTweet,
    onSuccess: () => {
      queryClient.invalidateQueries('tweet')
    },
    onError: error => {
      console.log(error)
    },
  })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const likeCheck = (): boolean => {
    const userLike = tweet?.likes.find(user => user.id === userAuth?.id)
    return Boolean(userLike)
  }

  const handleLikeTweet = () => {
    if (isAuth) return redirect('/auth/signIn')

    likeTweetMutation({ tweetId: tweet!.id, accessToken: token })
  }

  const handleDeleteTweet = () => {
    navigate('/home')
  }

  if (isLoading)
    return (
      <>
        <Bar styles='py-3 px-4 flex gap-6 text-xl items-center'>
          <button
            onClick={() => window.history.back()}
            className='p-2 hover:bg-neutral-800 rounded-full transition-colors'
          >
            <AiOutlineArrowLeft />
          </button>
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
        <button
          onClick={() => window.history.back()}
          className='p-2 hover:bg-neutral-800 rounded-full transition-colors'
        >
          <AiOutlineArrowLeft />
        </button>
        <p className='font-bold'>Tweet</p>
      </Bar>
      <div className='p-4 relative border-b border-b-outline-layout'>
        <TweetMenu
          tweetId={tweet!.id}
          username={tweet!.user.username}
          actionDeleteTweet={handleDeleteTweet}
        />
        <Link to={`/${tweet?.user.username}`} className='flex gap-3 mb-4 w-fit'>
          <img
            src={tweet!.user.account.avatar}
            alt={tweet!.user.username}
            className='rounded-full w-12 h-12 object-cover'
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

          {tweet!.images.length > 0 && <GridImages images={tweet!.images} />}

          {tweet?.mention && <TweetMentionItem tweet={tweet.mention} isLink />}

          <div className='py-3 border-b border-neutral-600 flex gap-4 text-neutral-500'>
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

          <CommentForm placeholder='Tweet you reply' tweetId={tweet!.id} />
        </div>
      </div>

      <CommentsListForTweet tweetId={tweet!.id} />
    </>
  )
}

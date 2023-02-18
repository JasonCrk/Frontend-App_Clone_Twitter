import type { FC } from 'react'

import { useParams, useNavigate, Link, redirect } from 'react-router-dom'

import { useAuthStore } from '../store/authStore'

import { useQuery, useMutation, useQueryClient } from 'react-query'

import { AxiosError } from 'axios'
import { Comment } from '../interfaces/Comment'
import { getCommentById, likeComment } from '../services/commentService'

import Spinner from '../components/Spinner'
import { Bar } from '../components/Bar'
import { TweetItemById } from '../components/TweetItemById'
import { GridImages } from '../components/GridImages'
import { CommentsListForComment } from '../components/CommentsListForComment'
import { CommentFormForComment } from '../components/CommentFormForComment'

import {
  AiFillHeart,
  AiOutlineArrowLeft,
  AiOutlineComment,
  AiOutlineHeart,
} from 'react-icons/ai'
import { BsFillPatchCheckFill } from 'react-icons/bs'

import { formatDateTime } from '../utils/formatDate'

export const DetailCommentPage: FC = () => {
  const { tweetId, commentId } = useParams() as {
    tweetId: string
    commentId: string
  }

  const isAuth = useAuthStore(state => state.isAuth)
  const userAuth = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token!)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    data: comment,
    isLoading,
    error,
  } = useQuery<Comment, AxiosError>(['comment', commentId], () =>
    getCommentById(commentId)
  )

  const { mutate: likeCommentMutation } = useMutation({
    mutationFn: likeComment,
    onSuccess: () => {
      queryClient.invalidateQueries('comment')
    },
    onError: error => {
      console.log(error)
    },
  })

  const checkLiked = (): boolean => {
    if (!isAuth) return false
    const userLike = comment?.likes.find(user => user.id === userAuth?.id)
    return Boolean(userLike)
  }

  const handleLikeComment = () => {
    if (!isAuth) return redirect('/auth/signIn')
    likeCommentMutation({ commentId: comment!.id, accessToken: token })
  }

  return (
    <>
      <Bar styles='py-3 px-4 flex gap-6 text-xl items-center'>
        <button
          onClick={() => navigate(-1)}
          className='p-2 hover:bg-neutral-800 rounded-full transition-colors'
        >
          <AiOutlineArrowLeft />
        </button>
        <p className='font-bold'>Tweet</p>
      </Bar>

      <TweetItemById tweetId={tweetId} />

      {isLoading ? (
        <div className='flex justify-center pt-10'>
          <Spinner />
        </div>
      ) : error ? (
        <div className='text-center text-lg text-red-600'>Hubo un error</div>
      ) : comment ? (
        <>
          <div className='p-4 relative border-b border-b-outline-layout'>
            <div className='absolute top-0 left-[2.45rem] w-[2px] h-3 bg-outline-layout' />
            <Link
              to={`/${comment.user.username}`}
              className='flex gap-3 mb-4 w-fit'
            >
              <img
                src={comment.user.account.avatar}
                alt={comment.user.username}
                className='rounded-full w-12 h-12 object-cover'
              />
              <div className='flex flex-col gap-1 justify-center'>
                <div className='flex gap-1 text-lg leading-4'>
                  <span className='hover:underline font-bold'>
                    {comment.user.username}
                  </span>
                  {comment.user.account.verify && (
                    <BsFillPatchCheckFill className='text-blue-500' />
                  )}
                </div>
                <div className='text-neutral-500'>@{comment.user.username}</div>
              </div>
            </Link>

            <p className='text-gray-500'>
              Replying to{' '}
              <Link
                to={`/${comment.post!.user.username}`}
                className='text-blue-500 hover:underline'
              >
                @{comment.post!.user.username}
              </Link>
            </p>

            <div>
              <p className='mb-2'>{comment.content}</p>

              {comment.images.length > 0 && (
                <GridImages images={comment.images} />
              )}

              <div className='py-3 border-b border-neutral-600 flex gap-4 text-neutral-500'>
                <span>{formatDateTime(comment.createdAt)}</span>
                <p>
                  <span className='text-white'>{comment.comments.length}</span>{' '}
                  Quote Tweets
                </p>
                <p>
                  <span className='text-white'>{comment.likes.length}</span>{' '}
                  Likes
                </p>
              </div>

              <div className='flex justify-around py-1 items-center gap-6 border-b border-neutral-600 text-2xl'>
                <button
                  className={`${checkLiked() && 'text-pink-600'} hover:bg-pink-600 hover:bg-opacity-10 hover:text-pink-600 hover:transition-[background] p-2 rounded-full`}
                  onClick={() => handleLikeComment()}
                >
                  {checkLiked() ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>
                <button className='p-2 hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500 hover:transition-[background] rounded-full'>
                  <AiOutlineComment />
                </button>
              </div>

              <CommentFormForComment commentId={comment.id} />
            </div>
          </div>

          <CommentsListForComment commentId={comment.id} />
        </>
      ) : null}
    </>
  )
}

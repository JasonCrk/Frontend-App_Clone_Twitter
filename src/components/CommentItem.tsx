import type { FC } from 'react'

import { Link, redirect, useNavigate } from 'react-router-dom'

import { useAuthStore } from '../store/authStore'

import { Comment } from '../interfaces/Comment'

import { GridImages } from './GridImages'

import { BsFillPatchCheckFill } from 'react-icons/bs'
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'

import { formatTimezone } from '../utils/formatDate'
import { likeComment } from '../services/commentService'
import { useMutation, useQueryClient } from 'react-query'

interface CommentItemProps {
  commentData: Comment
  showConnectionTop?: boolean
  showConnectionBottom?: boolean
}

export const CommentItem: FC<CommentItemProps> = ({
  commentData,
  showConnectionTop,
  showConnectionBottom,
}) => {
  const {
    content,
    user,
    createdAt,
    id,
    images,
    likes,
    comments,
    post,
    comment,
  } = commentData

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const isAuth = useAuthStore(state => state.isAuth)
  const userAuth = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token!)

  const { mutate: likeCommentMutation } = useMutation({
    mutationFn: likeComment,
    onSuccess: () => {
      queryClient.invalidateQueries('tweetComments')
    },
    onError: error => {
      console.log(error)
    },
  })

  const replyingUser = post?.user.username || comment?.user.username
  const urlNavigateComment = post?.id
    ? `/tweets/${post.id}/comments/${id}`
    : `/comments/${comment?.id}/comments/${id}`

  const checkLiked = (): boolean => {
    if (!isAuth) return false
    const userLike = likes.find(user => user.id === userAuth?.id)
    return Boolean(userLike)
  }

  const handleLikeComment = () => {
    if (!isAuth) return redirect('/auth/signIn')
    likeCommentMutation({ commentId: id, accessToken: token })
  }

  return (
    <div className='px-4 pt-4 grid grid-cols-tweet gap-4 border-outline-layout relative hover:bg-white/5 hover:transition-colors'>
      {showConnectionTop && (
        <div className='absolute top-0 left-[2.45rem] w-[2px] h-3 bg-outline-layout' />
      )}

      <div className='flex flex-col items-center'>
        <Link to={`/${user.username}`} className='h-fit'>
          <img
            src={user.account.avatar}
            alt={user.username}
            className='rounded-full w-12 h-12 object-cover'
          />
        </Link>

        {showConnectionBottom && (
          <div className='w-[2px] h-full bg-outline-layout' />
        )}
      </div>

      <div className='pb-2'>
        <div
          className='cursor-pointer'
          onClick={() => navigate(urlNavigateComment)}
        >
          <Link
            to={`/${user.username}`}
            className='flex gap-1 items-center w-fit'
          >
            <span className='font-bold hover:underline'>{user.username}</span>
            {user.account.verify && (
              <BsFillPatchCheckFill className='text-blue-500' />
            )}
            <span className='text-gray-500'>-</span>
            <span className='text-gray-500 hover:underline'>
              {formatTimezone(createdAt)}
            </span>
          </Link>

          <p className='text-gray-500'>
            Replying to{' '}
            <Link
              to={`/${replyingUser}`}
              className='text-blue-500 hover:underline'
            >
              @{replyingUser}
            </Link>
          </p>

          <p className='mb-2'>{content}</p>

          {images.length > 0 && <GridImages images={images} />}
        </div>

        <div className='flex justify-start gap-8 mt-2'>
          <button
            className={`${
              checkLiked() && 'text-pink-600'
            } flex group items-center gap-2 text-lg relative`}
            onClick={() => handleLikeComment()}
          >
            {checkLiked() ? (
              <AiFillHeart
                className={`p-1.5 text-3xl group-hover:bg-pink-600 group-hover:bg-opacity-80 group-hover:transition-colors rounded-full group-hover:text-white`}
              />
            ) : (
              <AiOutlineHeart
                className={`p-1.5 text-3xl group-hover:bg-pink-600 group-hover:bg-opacity-80 group-hover:transition-[background] rounded-full`}
              />
            )}

            <span
              className={`group-hover:text-pink-600 group-hover:transition-colors`}
            >
              {likes.length}
            </span>
          </button>

          <button className='flex group items-center gap-2 text-lg relative'>
            <AiOutlineComment className='p-1.5 text-3xl group-hover:bg-blue-500 group-hover:bg-opacity-80 group-hover:transition-[background] rounded-full' />
            <span className='group-hover:text-blue-500 group-hover:transition-colors'>
              {comments.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

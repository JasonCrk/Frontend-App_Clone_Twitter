import type { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useAuthStore } from '../store/authStore'

import { Comment } from '../interfaces/Comment'

import { GridImages } from './GridImages'

import { BsFillPatchCheckFill } from 'react-icons/bs'
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'

import { formatTimezone } from '../utils/formatDate'

interface CommentItemProps {
  showConnection?: boolean
  commentData: Comment
}

export const CommentItem: FC<CommentItemProps> = ({
  commentData,
  showConnection,
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

  const isAuth = useAuthStore(state => state.isAuth)
  const userAuth = useAuthStore(state => state.user)

  const replyingUser = post?.user.username || comment?.user.username

  const checkLiked = (): boolean => {
    if (!isAuth) return false
    const userLike = likes.find(user => user.id === userAuth?.id)
    return Boolean(userLike)
  }

  return (
    <div className='p-4 grid grid-cols-tweet gap-4 border-outline-layout relative hover:bg-white/5 hover:transition-colors'>
      {showConnection && (
        <div className='absolute top-0 left-10 w-[2px] h-3 bg-outline-layout' />
      )}

      <Link to={`/${user.username}`} className='h-fit'>
        <img
          src={user.account.avatar}
          alt={user.username}
          className='rounded-full w-12 h-12 object-cover'
        />
      </Link>
      <div>
        <div
          className='cursor-pointer'
          onClick={() => navigate(`/tweets/${id}`)}
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

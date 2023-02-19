import { FC, useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useAuthStore } from '../store/authStore'

import { createCommentForTweetContext } from '../context/CreateCommentForTweetProvider'

import { useMutation, useQueryClient } from 'react-query'

import { Tweet } from '../interfaces/Tweet'
import { likeTweet } from '../services/tweetService'

import { TweetMenu } from './TweetMenu'
import { FilterTag } from './FilterTag'
import { GridImages } from './GridImages'
import { TweetMentionItem } from './TweetMentionItem'

import { BsFillPatchCheckFill } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'

import { formatTimezone } from '../utils/formatDate'

interface TweetItemProps {
  tweetData: Tweet
  hideActions?: boolean
  noLink?: boolean
  showConnection?: boolean
}

const TweetItem: FC<TweetItemProps> = ({
  tweetData,
  noLink,
  showConnection,
  hideActions,
}) => {
  const {
    id,
    content,
    user,
    images,
    createdAt,
    likes,
    mention,
    comments,
    hashtags,
  } = tweetData

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const userAuth = useAuthStore(state => state.user)
  const isAuth = useAuthStore(state => state.isAuth)
  const token = useAuthStore(state => state.token)

  const { handleOpenCreateCommentForTweet } = useContext(
    createCommentForTweetContext
  )

  const { mutate: likeTweetMutation } = useMutation({
    mutationFn: likeTweet,
    onSuccess: () => {
      queryClient.invalidateQueries('tweets')
      queryClient.invalidateQueries('userTweets')
    },
  })

  const tweetHashtags = hashtags?.split(',')

  const likeCheck = (): boolean => {
    const userLike = likes.find(user => user.id === userAuth?.id)
    return Boolean(userLike)
  }

  const handleLikeTweet = () => {
    if (!isAuth) return navigate('/auth/signIn')
    likeTweetMutation({ tweetId: id, accessToken: token! })
  }

  const handleShowCreateCommentModal = () => {
    if (!isAuth) return navigate('/auth/signIn')
    handleOpenCreateCommentForTweet(id)
  }

  const handleDeleteTweet = () => {
    queryClient.invalidateQueries('tweets')
    queryClient.invalidateQueries('trendTweetsList')
  }

  return (
    <div
      className={`px-4 pt-4 grid grid-cols-tweet gap-4 border-neutral-500 relative ${
        !noLink && 'hover:bg-white/5 hover:transition-colors'
      }`}
    >
      {!hideActions && (
        <TweetMenu
          username={user.username}
          tweetId={id}
          actionDeleteTweet={handleDeleteTweet}
        />
      )}

      <div className='flex flex-col items-center'>
        <Link to={`/${user.username}`}>
          <img
            src={user.account.avatar}
            alt={user.username}
            className='rounded-full w-12 h-12 object-cover'
          />
        </Link>

        {showConnection && <div className='w-[2px] h-full bg-outline-layout' />}
      </div>

      <div className={!hideActions ? 'pb-4' : ''}>
        <div
          className={!noLink ? 'cursor-pointer' : ''}
          onClick={() => {
            if (noLink) return
            navigate(`/tweets/${id}`)
          }}
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

          <p className='mb-2'>{content}</p>

          {images.length > 0 && <GridImages images={images} />}
        </div>

        {mention && <TweetMentionItem tweet={mention} isLink />}

        {tweetHashtags && !hideActions && (
          <div className='flex flex-wrap mt-2'>
            {tweetHashtags.map(hashtag => (
              <FilterTag key={hashtag} tag={hashtag.trim()} />
            ))}
          </div>
        )}

        {!hideActions && (
          <div className='flex justify-start gap-8 mt-2'>
            <button
              className={`${
                likeCheck() && 'text-pink-600'
              } flex group items-center gap-2 text-lg relative`}
              onClick={() => handleLikeTweet()}
            >
              {likeCheck() ? (
                <AiFillHeart
                  className={`${
                    likeCheck() && 'group-hover:text-white'
                  } p-1.5 text-3xl group-hover:bg-pink-600 group-hover:bg-opacity-80 group-hover:transition-colors rounded-full`}
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

            <button
              className='flex group items-center gap-2 text-lg relative'
              onClick={() => handleShowCreateCommentModal()}
            >
              <AiOutlineComment className='p-1.5 text-3xl group-hover:bg-blue-500 group-hover:bg-opacity-80 group-hover:transition-[background] rounded-full' />
              <span className='group-hover:text-blue-500 group-hover:transition-colors'>
                {comments.length}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TweetItem

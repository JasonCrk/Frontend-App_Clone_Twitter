import { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useMutation, useQueryClient } from 'react-query'

import { useAuthStore } from '../store/authStore'

import { Tweet } from '../interfaces/Tweet'
import { likeTweet } from '../services/tweetService'

import { TweetMenu } from './TweetMenu'
import { FilterTag } from './FilterTag'
import { GridImages } from './GridImages'

import { BsFillPatchCheckFill } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'

import { formatTimezone } from '../utils/formatDate'
import { TweetMentionItem } from './TweetMentionItem'

const TweetItem: FC<Tweet> = ({
  id,
  content,
  user,
  images,
  createdAt,
  likes,
  mention,
  comments,
  hashtags,
}) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const userAuth = useAuthStore(state => state.user)
  const isAuth = useAuthStore(state => state.isAuth)
  const token = useAuthStore(state => state.token)

  const tweetHashtags = hashtags?.split(',')

  const { mutate: likeTweetMutation } = useMutation({
    mutationFn: likeTweet,
    onSuccess: () => {
      queryClient.invalidateQueries('tweets')
      queryClient.invalidateQueries('userTweets')
    },
  })

  const likeCheck = (): boolean => {
    const userLike = likes.find(user => user.id === userAuth?.id)
    return Boolean(userLike)
  }

  const handleLikeTweet = () => {
    if (!isAuth) return navigate('/auth/signIn')
    likeTweetMutation({ tweetId: id, accessToken: token! })
  }

  const handleDeleteTweet = () => {
    queryClient.invalidateQueries('tweets')
    queryClient.invalidateQueries('trendTweetsList')
  }

  return (
    <div className='p-4 grid grid-cols-tweet gap-4 border-neutral-500 relative hover:bg-white/5 hover:transition-colors'>
      <TweetMenu
        username={user.username}
        tweetId={id}
        actionDeleteTweet={handleDeleteTweet}
      />
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

          <p className='mb-2'>{content}</p>

          {images.length > 0 && <GridImages images={images} />}
        </div>

        {mention && <TweetMentionItem tweet={mention} isLink />}

        {tweetHashtags && (
          <div className='flex flex-wrap mt-2'>
            {tweetHashtags.map(hashtag => (
              <FilterTag key={hashtag} tag={hashtag.trim()} />
            ))}
          </div>
        )}

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

export default TweetItem

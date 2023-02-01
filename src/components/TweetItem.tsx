import { FC, Fragment } from 'react'

import { Link, redirect, useNavigate } from 'react-router-dom'

import { useMutation, useQueryClient } from 'react-query'

import { useAuthStore } from '../store/authStore'

import { Tweet } from '../interfaces/Tweet'
import { deleteTweet, likeTweet } from '../services/tweetService'

import MenuOption from './MenuOption'
import { Menu, Transition } from '@headlessui/react'

import { formatTimezone } from '../utils/formatDate'

import { BsFillPatchCheckFill, BsFillTrashFill } from 'react-icons/bs'
import { SlOptions } from 'react-icons/sl'

import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'

const TweetItem: FC<Tweet> = ({
  id,
  content,
  user,
  images,
  createdAt,
  likes,
  comments,
}) => {
  const userAuth = useAuthStore(state => state.user)
  const isAuth = useAuthStore(state => state.isAuth)
  const token = useAuthStore(state => state.token)

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { mutate: likeTweetMutation } = useMutation({
    mutationFn: likeTweet,
    onSuccess: () => {
      queryClient.invalidateQueries('tweets')
      queryClient.invalidateQueries('userTweets')
    },
  })

  const { mutate: deleteTweetMutation } = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => {
      queryClient.invalidateQueries('tweets')
    },
  })

  const likeCheck = (): boolean => {
    const userLike = likes.find(user => user.id === userAuth?.id)
    return Boolean(userLike)
  }

  const handleLikeTweet = () => {
    if (!isAuth) return redirect('/auth/signIn')

    likeTweetMutation({ tweetId: id, accessToken: token! })
  }

  const handleDeleteTweet = () => {
    if (!isAuth || user.username !== userAuth?.username)
      return redirect('/auth/signIn')

    deleteTweetMutation({ tweetId: id, accessToken: token! })
  }

  return (
    <div className='p-4 grid grid-cols-tweet gap-4 border-y-[1px] border-gray-600 relative'>
      <Menu as='div' className='absolute top-2 right-2'>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items
            className={
              'absolute top-10 right-2 overflow-hidden shadow-white shadow-border py-1.5 z-10 w-fit rounded-md bg-black'
            }
          >
            {isAuth && user.username === userAuth?.username && (
              <MenuOption
                Icon={BsFillTrashFill}
                onClick={() => handleDeleteTweet()}
              >
                Eliminar
              </MenuOption>
            )}
          </Menu.Items>
        </Transition>
        <Menu.Button className='p-2.5 hover:bg-blue-500/20 transition-colors rounded-full'>
          <SlOptions />
        </Menu.Button>
      </Menu>
      <Link to={`/${user.username}`} className='h-fit'>
        <img
          src={user.account.avatar}
          alt={user.username}
          className='rounded-full w-12'
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
          {images.length === 1 ? (
            <img
              src={images[0].imageUrl}
              key={images[0].id}
              alt=''
              className='rounded-2xl w-full mb-4'
            />
          ) : images.length === 2 ? (
            <div className='grid grid-cols-2 mb-4 rounded-2xl'>
              {images.map(image => (
                <img
                  src={image.imageUrl}
                  key={image.id}
                  alt=''
                  className='h-96 w-full mb-4 object-cover'
                />
              ))}
            </div>
          ) : null}
        </div>
        <div className='flex justify-start gap-8'>
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

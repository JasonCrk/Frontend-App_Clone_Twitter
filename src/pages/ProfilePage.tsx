import type { FC } from 'react'

import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useNavigate,
} from 'react-router-dom'

import { useAuthStore } from '../store/authStore'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { AccountInProfile } from '../interfaces/Account'
import { getProfileByUsername } from '../services/accountService'

import { Tab } from '@headlessui/react'

import { Bar } from '../components/Bar'
import { ModalEditProfile } from '../components/ModalEditProfile'
import Spinner from '../components/Spinner'

import { AiOutlineArrowLeft, AiOutlineLink } from 'react-icons/ai'
import { BsCalendar3, BsFillPatchCheckFill } from 'react-icons/bs'
import { HiLocationMarker } from 'react-icons/hi'
import { TbBallon } from 'react-icons/tb'

import { formatBirthday, formatJoinAccount } from '../utils/formatDate'

const tabsCategories = [
  {
    name: 'Tweets',
    path: '',
  },
  {
    name: 'Media',
    path: '/media',
  },
  {
    name: 'Likes',
    path: '/likes',
  },
]

export const ProfilePage: FC = () => {
  const isAuth = useAuthStore(state => state.isAuth)
  const user = useAuthStore(state => state.user)

  const { username } = useParams() as { username: string }
  const location = useLocation()
  const navigate = useNavigate()

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<AccountInProfile, AxiosError>(['profile', username], () =>
    getProfileByUsername(username)
  )

  const tabSelected = (path: string): boolean =>
    location.pathname === `/${username + path}`

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center mt-10'>
          <Spinner />
        </div>
      ) : error ? (
        <div className='text-center text-red-600 text-xl'>Hubo un error</div>
      ) : profile ? (
        <div>
          <Bar styles='flex gap-6 px-4 items-center py-1'>
            <button
              onClick={() => navigate(-1)}
              className='p-3 hover:bg-neutral-800 rounded-full transition-colors text-lg'
            >
              <AiOutlineArrowLeft />
            </button>

            <div>
              <p className='text-xl font-bold flex items-center gap-2'>
                <span>{profile.user.firstName}</span>

                {profile.verify && (
                  <BsFillPatchCheckFill className='text-blue-500' />
                )}
              </p>

              <p className='text-neutral-500 text-sm'>
                {profile.user.posts.length} Tweets
              </p>
            </div>
          </Bar>
          <div className='relative'>
            <img
              src={profile.header}
              alt=''
              className='w-full h-48 object-cover'
            />

            <img
              src={profile.avatar}
              alt=''
              className='w-32 h-32 object-cover rounded-full absolute top-32 left-5 border-black border-4'
            />

            <div>
              {isAuth && user?.id === profile.user.id ? (
                <ModalEditProfile profile={profile} />
              ) : (
                <div className='h-[38px] mx-4 mt-4 mb-6 w-full' />
              )}

              <div className='m-4'>
                <p className='text-xl font-bold'>{profile.user.firstName}</p>
                <p className='text-neutral-500'>@{profile.user.username}</p>

                {profile.bibliography && (
                  <p className='py-1'>{profile.bibliography}</p>
                )}

                <div className='flex justify-start items-center flex-wrap gap-x-4 gap-y-1 py-2'>
                  {profile.website && (
                    <Link
                      to={profile.website}
                      className='flex gap-1 items-center'
                    >
                      <AiOutlineLink className='text-neutral-500' />{' '}
                      <span className='text-blue-500 hover:underline'>
                        {profile.website}
                      </span>
                    </Link>
                  )}

                  {profile.location && (
                    <span className='flex gap-1 items-center text-neutral-500'>
                      <HiLocationMarker />
                      <span>{profile.location}</span>
                    </span>
                  )}

                  {profile.birthday && (
                    <span className='flex gap-1 items-center text-neutral-500'>
                      <TbBallon /> {formatBirthday(profile.birthday)}
                    </span>
                  )}

                  <span className='flex gap-1 items-center text-neutral-500'>
                    <BsCalendar3 /> {formatJoinAccount(profile.createdAt)}
                  </span>
                </div>

                <div className='flex gap-4 items-center'>
                  <Link
                    to={`/${username}/f/following`}
                    className='hover:underline'
                  >
                    <span className='font-bold'>
                      {profile.followings.length}{' '}
                    </span>
                    <span className='text-neutral-500'>Following</span>
                  </Link>

                  <Link
                    to={`/${username}/f/followers`}
                    className='hover:underline'
                  >
                    <span className='font-bold'>
                      {profile.user.followers.length}{' '}
                    </span>
                    <span className='text-neutral-500'>Followers</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <Tab.Group>
              <Tab.List className='flex justify-around'>
                {tabsCategories.map(({ name, path }) => (
                  <Tab
                    key={name}
                    to={`/${username}` + path}
                    as={Link}
                    className={`w-full hover:bg-neutral-700/40 hover:transition-[background] py-3 text-center`}
                  >
                    <span
                      className={`${
                        tabSelected(path)
                          ? 'border-b-4 border-blue-500 font-bold'
                          : 'text-neutral-500'
                      } py-3 text-lg`}
                    >
                      {name}
                    </span>
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>

            <div className='border-t border-outline-layout'>
              <Outlet />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

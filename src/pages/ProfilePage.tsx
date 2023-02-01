import type { FC } from 'react'

import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom'

import { useQuery } from 'react-query'

import { AccountInProfile } from '../interfaces/Account'

import { AxiosError } from 'axios'
import { getProfileByUsername } from '../services/accountService'

import { Tab } from '@headlessui/react'

import { Bar } from '../components/Bar'
import Spinner from '../components/Spinner'

import { AiOutlineArrowLeft, AiOutlineLink } from 'react-icons/ai'
import { BsCalendar3, BsFillPatchCheckFill } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
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
  const { username } = useParams()
  const location = useLocation()

  const { data: profile, isLoading } = useQuery<AccountInProfile, AxiosError>(
    'profile',
    () => getProfileByUsername(username as string),
    {
      refetchOnWindowFocus: false,
    }
  )

  const tabSelected = (path: string): boolean => {
    return location.pathname === `/${username + path}`
  }

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center mt-10'>
          <Spinner />
        </div>
      ) : profile ? (
        <>
          <Bar styles='flex gap-6 px-4 items-center py-1'>
            <NavLink
              to={'/home'}
              className='p-3 hover:bg-neutral-800 rounded-full transition-colors text-lg'
            >
              <AiOutlineArrowLeft />
            </NavLink>
            <div>
              <p className='text-xl font-bold flex items-center gap-2'>
                {profile.user.firstName}
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
              className='w-32 h-32 rounded-full absolute top-32 left-5 border-black border-4'
            />
            <div>
              <div className='flex justify-end mx-4 mt-4 mb-6'>
                <button className='border border-slate-500 rounded-full bg-transparent px-4 py-2 hover:bg-neutral-800 font-bold text-sm transition-colors'>
                  Edit profile
                </button>
              </div>
              <div className='m-4'>
                <p className='text-xl font-bold'>{profile.user.firstName}</p>
                <p className='text-neutral-500'>@{profile.user.username}</p>
                {profile.bibliography && (
                  <p className='py-1'>{profile.bibliography}</p>
                )}

                <div className='flex justify-start items-center flex-wrap gap-4 py-2'>
                  {profile.website && (
                    <NavLink
                      to='https://emerzon.com'
                      className='flex gap-1 items-center'
                    >
                      <AiOutlineLink className='text-neutral-500' />{' '}
                      <span className='text-blue-500'>{profile.website}</span>
                    </NavLink>
                  )}
                  {profile.location && (
                    <span className='flex gap-1 items-center text-neutral-500'>
                      <CiLocationOn /> hello Location
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
                  <NavLink
                    to={`/${username}/followings`}
                    className='hover:underline'
                  >
                    <span className='font-bold'>
                      {profile.followings.length}{' '}
                    </span>
                    <span className='text-neutral-500'>Following</span>
                  </NavLink>
                  <NavLink
                    to={`/${username}/followers`}
                    className='hover:underline'
                  >
                    <span className='font-bold'>
                      {profile.user.followers.length}{' '}
                    </span>
                    <span className='text-neutral-500'>Followers</span>
                  </NavLink>
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
                    as={NavLink}
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
            <Outlet />
          </div>
        </>
      ) : null}
    </>
  )
}

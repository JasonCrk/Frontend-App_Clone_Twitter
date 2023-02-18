import type { FC } from 'react'

import { NavLink, useParams, useLocation, Outlet, useNavigate } from 'react-router-dom'

import { Tab } from '@headlessui/react'

import { Bar } from '../components/Bar'

import { AiOutlineArrowLeft } from 'react-icons/ai'

const tabsFollowAccounts = [
  {
    name: 'Followers',
    path: (username: string) => `/${username}/f/followers`,
  },
  {
    name: 'Following',
    path: (username: string) => `/${username}/f/following`,
  },
]

export const FollowPage: FC = () => {
  const { username } = useParams() as { username: string }
  const location = useLocation()
  const navigate = useNavigate()

  const activeLink = (path: string) => location.pathname === path

  return (
    <>
      <Bar styles='border-b border-outline-layout'>
        <div className='flex gap-2 p-2'>
          <button
            onClick={() => navigate(-1)}
            className='p-3 hover:bg-neutral-800 rounded-full transition-colors text-lg'
          >
            <AiOutlineArrowLeft />
          </button>
          <p className='text-xl font-bold flex items-center gap-2'>
            {username}
          </p>
        </div>
        <div className='w-full'>
          <Tab.Group>
            <Tab.List className='flex justify-around'>
              {tabsFollowAccounts.map(({ name, path }) => (
                <Tab
                  key={name}
                  to={path(username)}
                  as={NavLink}
                  className={`w-full hover:bg-neutral-700/40 hover:transition-[background] py-3 text-center`}
                >
                  <span
                    className={`${activeLink(path(username))
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
        </div>
      </Bar>
      <Outlet />
    </>
  )
}

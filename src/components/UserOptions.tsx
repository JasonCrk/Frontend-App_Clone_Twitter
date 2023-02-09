import { FC, Fragment } from 'react'

import { redirect } from 'react-router-dom'

import { useAuthStore } from '../store/authStore'

import { UserAuth } from '../interfaces/User'

import MenuOption from './MenuOption'

import { Menu, Transition } from '@headlessui/react'

import { HiOutlineLogout } from 'react-icons/hi'
import { SlOptions } from 'react-icons/sl'

interface UserOptionsProps {
  user: UserAuth
}

const UserOptions: FC<UserOptionsProps> = ({ user }) => {
  const { setIsAuth, setUser } = useAuthStore()

  const handleLogOut = () => {
    redirect('/explore')
    setIsAuth(false)
    setUser(null)
    window.localStorage.removeItem('accessToken_twitter')
  }

  return (
    <Menu as='div' className='w-full'>
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
            'absolute bottom-24 rounded-md max-lg:rounded-2xl overflow-hidden shadow-neutral-400 shadow-border max-lg:w-16 bg-black py-1.5 z-10'
          }
        >
          <MenuOption Icon={HiOutlineLogout} onClick={() => handleLogOut()}>
            Log out @{user.username}
          </MenuOption>
        </Menu.Items>
      </Transition>
      <Menu.Button className='w-full'>
        <div className='hover:bg-white hover:bg-opacity-10 max-sm:content-start transition-[background] p-3 rounded-full mb-4 grid grid-cols-[auto_1fr_auto] max-lg:grid-cols-1 gap-2 lg:w-full'>
          <img
            src={user.account.avatar}
            className='rounded-full w-11 h-11 object-cover'
            alt='avatar'
          />
          <div className='flex flex-col items-start justify-center max-lg:hidden h-full'>
            <p
              className='font-bold text-[1.1rem] leading-4 truncate w-32 text-start'
              title={user.firstName}
            >
              {user.firstName}
            </p>
            <p className='opacity-40 text-base'>@{user.username}</p>
          </div>
          <div className='flex items-center max-lg:hidden'>
            <SlOptions />
          </div>
        </div>
      </Menu.Button>
    </Menu>
  )
}

export default UserOptions

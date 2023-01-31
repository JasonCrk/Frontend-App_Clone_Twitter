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
            'absolute bottom-24 left-2 rounded-md max-lg:rounded-2xl overflow-hidden shadow-white shadow-border max-lg:w-16 bg-black py-1.5 z-10 w-fit'
          }
        >
          <MenuOption Icon={HiOutlineLogout} onClick={() => handleLogOut()}>
            Log out @JasonCrk
          </MenuOption>
        </Menu.Items>
      </Transition>
      <Menu.Button className='w-full'>
        <div className='hover:bg-white hover:bg-opacity-10 max-sm:content-start transition-[background] p-3 rounded-full mb-4 grid grid-cols-[auto_1fr_auto] max-lg:grid-cols-1 gap-2 lg:w-full'>
          <img
            src={user.account.avatar}
            className='rounded-full'
            alt='avatar'
          />
          <div className='flex flex-col items-start justify-center max-lg:hidden'>
            <p className='font-bold text-[1.2rem] leading-4'>{user.username}</p>
            <p className='opacity-40'>@{user.username}</p>
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

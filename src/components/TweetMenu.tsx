import { FC, Fragment } from 'react'

import { shallow } from 'zustand/shallow'
import { useAuthStore } from '../store/authStore'

import { useMutation } from 'react-query'

import { deleteTweet } from '../services/tweetService'

import { toast } from 'react-toastify'

import { Menu, Transition } from '@headlessui/react'

import MenuOption from './MenuOption'

import { SlOptions } from 'react-icons/sl'
import { BsFillTrashFill } from 'react-icons/bs'

interface TweetMenuProps {
  actionDeleteTweet: () => void
  tweetId: string
  username: string
}

export const TweetMenu: FC<TweetMenuProps> = ({
  username,
  tweetId,
  actionDeleteTweet,
}) => {
  const { userAuth, isAuth, token } = useAuthStore(
    state => ({
      userAuth: state.user,
      isAuth: state.isAuth,
      token: state.token,
    }),
    shallow
  )

  const { mutate: deleteTweetMutation } = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => {
      actionDeleteTweet()
      toast.success('Tweet has been deleted')
    },
  })

  const handleDeleteTweet = () => {
    deleteTweetMutation({ tweetId, accessToken: token! })
  }

  return (
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
            'absolute top-10 right-2 overflow-hidden shadow-menu-b shadow-border py-1.5 z-10 w-fit rounded-md bg-black'
          }
        >
          {isAuth && username === userAuth?.username && (
            <>
              <MenuOption
                Icon={BsFillTrashFill}
                onClick={() => handleDeleteTweet()}
              >
                Delete
              </MenuOption>
            </>
          )}
        </Menu.Items>
      </Transition>
      <Menu.Button className='p-2.5 hover:bg-blue-500/20 transition-colors rounded-full'>
        <SlOptions />
      </Menu.Button>
    </Menu>
  )
}

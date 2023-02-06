import { FC } from 'react'

import { useAuthStore } from '../store/authStore'

import LinkNavbar from './LinkNavbar'
import UserOptions from './UserOptions'

import {
  BsTwitter,
  BsPersonFill,
  BsPerson as BsPersonOutline,
} from 'react-icons/bs'

import {
  HiBell,
  HiOutlineBell,
  HiHashtag,
  HiOutlineHashtag,
} from 'react-icons/hi'

import { RiHome7Fill, RiHome7Line } from 'react-icons/ri'

import Spinner from './Spinner'
import { ModalTweetForm } from './ModalTweetForm'

const VerticalNavbar: FC = () => {
  const user = useAuthStore(state => state.user)
  const isAuth = useAuthStore(state => state.isAuth)
  const loading = useAuthStore(state => state.loading)

  return (
    <div className='text-white h-screen flex flex-col items-baseline justify-between sticky top-0 md:pr-4 max-md:px-2'>
      {loading ? (
        <div className='flex justify-center mt-10 w-full'>
          <Spinner />
        </div>
      ) : (
        <>
          <div className='flex flex-col items-start max-lg:items-center gap-3 justify-center w-full'>
            <button className='p-3 inline-flex rounded-full hover:bg-slate-900 transition-[background] text-3xl max-md:self-center'>
              <BsTwitter />
            </button>

            {isAuth && (
              <LinkNavbar
                path='/home'
                name='Home'
                IconOutline={RiHome7Line}
                IconFill={RiHome7Fill}
              />
            )}

            <LinkNavbar
              path='/explore'
              name='Explore'
              IconOutline={HiOutlineHashtag}
              IconFill={HiHashtag}
            />

            {isAuth && (
              <>
                <LinkNavbar
                  path='/notifications'
                  name='Notifications'
                  IconOutline={HiOutlineBell}
                  IconFill={HiBell}
                />
                <LinkNavbar
                  path={`/${user?.username}`}
                  name='Profile'
                  IconOutline={BsPersonOutline}
                  IconFill={BsPersonFill}
                />
                <ModalTweetForm />
              </>
            )}
          </div>

          {isAuth && <UserOptions user={user!} />}
        </>
      )}
    </div>
  )
}

export default VerticalNavbar

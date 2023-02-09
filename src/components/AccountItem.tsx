import type { FC } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import { useAuthStore } from '../store/authStore'

import { useMutation, useQueryClient } from 'react-query'

import { AccountInItem } from '../interfaces/Account'
import { followAccount } from '../services/accountService'

interface AccountItemProps extends AccountInItem {
  showBtnFollow?: boolean
  hoverLight?: boolean
}

const AccountItem: FC<AccountItemProps> = ({
  avatar,
  user,
  bibliography,
  showBtnFollow,
  hoverLight,
}) => {
  const userAuth = useAuthStore(state => state.user)
  const isAuth = useAuthStore(state => state.isAuth)
  const token = useAuthStore(state => state.token!)

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const isNotMyAccount = user.username !== userAuth?.username

  const isFollowingAccount = (): boolean => {
    const userFollowing = user.followers.find(
      follower => follower.id === userAuth?.account.id
    )
    return Boolean(userFollowing)
  }

  const { mutate: followAccountMutation } = useMutation({
    mutationFn: followAccount,
    onSuccess: () => {
      queryClient.invalidateQueries('mostFollowed')
      queryClient.invalidateQueries('profile')
    },
    onError: error => {
      console.log(error)
    },
  })

  const handleFollow = () => {
    if (!isAuth) return navigate('/auth/signIn')

    followAccountMutation({ userFollowId: user.id, accessToken: token })
  }

  return (
    <div className='relative'>
      <NavLink
        to={`/${user.username}`}
        className={`py-3 px-4 w-full  hover:transition-colors flex flex-row items-center justify-between ${
          hoverLight ? 'hover:bg-white/5' : 'hover:bg-neutral-900'
        }`}
      >
        <div className='flex items-center gap-2'>
          <img
            src={avatar}
            alt=''
            className='w-12 h-12 object-cover rounded-full'
          />
          <div>
            <p
              className={`font-bold hover:underline truncate ${
                isNotMyAccount && 'max-lg:w-14 max-xl:w-20'
              }`}
              title={user.firstName}
            >
              {user.firstName}
            </p>
            <p
              className={`text-sm text-neutral-400 truncate ${
                isNotMyAccount && 'max-lg:w-14 max-xl:w-20'
              }`}
              title={user.username}
            >
              @{user.username}
            </p>
            {bibliography && <p className=''>{bibliography}</p>}
          </div>
        </div>
      </NavLink>

      {isNotMyAccount && showBtnFollow && (
        <button
          className={`absolute top-5 right-4 py-2 px-5 rounded-full text-sm font-bold ${
            isFollowingAccount()
              ? 'bg-transparent border border-white text-white group hover:border-red-600'
              : 'text-black bg-white hover:bg-neutral-100'
          }`}
          onClick={() => handleFollow()}
        >
          {isFollowingAccount() ? (
            <>
              <span className='group-hover:hidden'>Following</span>
              <span className='hidden group-hover:block text-red-600 px-[2px]'>
                Unfollow
              </span>
            </>
          ) : (
            'Follow'
          )}
        </button>
      )}
    </div>
  )
}

export default AccountItem

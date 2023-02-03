import { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { AccountInItem } from '../interfaces/Account'
import { useAuthStore } from '../store/authStore'

const AccountItem: FC<AccountInItem> = ({ avatar, user, bibliography }) => {
  const authUser = useAuthStore(state => state.user)

  const isMyAccount = user.username !== authUser?.username

  return (
    <NavLink to={`/${user.username}`}>
      <div className='py-3 px-4 w-full hover:bg-white/5 hover:transition-colors flex flex-row items-center justify-between'>
        <div className='flex items-center gap-2'>
          <img src={avatar} alt='' className='w-12 rounded-full' />
          <div>
            <p className='font-bold hover:underline max-lg:w-20 max-xl:w-24 truncate'>
              {user.firstName}
            </p>
            <p className='text-sm text-neutral-400 max-lg:w-20 max-xl:w-24 truncate'>
              @{user.username}
            </p>
            {bibliography && <p className=''>{bibliography}</p>}
          </div>
        </div>
        {isMyAccount && (
          <button className='text-black bg-white py-2 px-5 rounded-full text-sm font-bold hover:bg-neutral-100'>
            Follow
          </button>
        )}
      </div>
    </NavLink>
  )
}

export default AccountItem

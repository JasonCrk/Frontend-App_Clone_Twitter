import type { FC } from 'react'

import { useQuery } from 'react-query'
import { getMostFollowedUsers } from '../services/accountService'

import AccountItem from './AccountItem'
import Spinner from './Spinner'

const MostFollowedList: FC = () => {
  const {
    data: accounts,
    isLoading,
    error,
  } = useQuery('mostFollowed', () => getMostFollowedUsers())

  if (isLoading)
    return (
      <div className='flex justify-center my-6'>
        <Spinner />
      </div>
    )

  if (error)
    return (
      <div className='text-lg text-center text-red-500 my-6'>Hubo un error</div>
    )

  if (accounts?.length === 0)
    return <div className='text-center text-lg text-sky-500 my-6'>No users</div>

  return (
    <div>
      {accounts?.map(account => (
        <AccountItem key={account.id} showBtnFollow hoverLight {...account} />
      ))}
    </div>
  )
}

export default MostFollowedList

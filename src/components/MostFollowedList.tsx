import { FC } from 'react'

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
      <div className='flex justify-center mt-4'>
        <Spinner />
      </div>
    )

  if (error)
    return <div className='text-lg text-center text-red-500'>Hubo un error</div>

  return (
    <div>
      {accounts?.length === 0 ? (
        <div className='text-center text-sky-500'>no users</div>
      ) : (
        accounts?.map(account => <AccountItem key={account.id} {...account} />)
      )}
    </div>
  )
}

export default MostFollowedList

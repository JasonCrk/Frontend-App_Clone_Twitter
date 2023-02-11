import { FC, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { AccountInItem } from '../interfaces/Account'
import { getUserFollowing } from '../services/accountService'

import Spinner from '../components/Spinner'
import AccountItem from '../components/AccountItem'

export const UserFollowingPage: FC = () => {
  const { username } = useParams() as { username: string }

  const {
    data: accounts,
    isLoading,
    error,
  } = useQuery<AccountInItem[], AxiosError>(['userFollowing', username], () =>
    getUserFollowing(username)
  )

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  if (isLoading)
    return (
      <div className='flex justify-center'>
        <Spinner />
      </div>
    )

  if (error)
    return (
      <div className='text-center text-red-600 text-xl'>
        There was a mistake
      </div>
    )

  if (accounts?.length === 0)
    return (
      <div className='text-center text-xl font-bold mt-6'>
        You don&apos;t follow anymore
      </div>
    )

  return (
    <div className='divide-y divide-outline-layout'>
      {accounts?.map(account => (
        <AccountItem key={account.id} {...account} showBtnFollow />
      ))}
    </div>
  )
}

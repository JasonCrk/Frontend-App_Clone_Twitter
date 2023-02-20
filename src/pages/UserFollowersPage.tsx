import { FC, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { AccountInItem } from '../interfaces/Account'
import { getUserFollowers } from '../services/accountService'

import Spinner from '../components/Spinner'
import AccountItem from '../components/AccountItem'

export const UserFollowersPage: FC = () => {
  const { username } = useParams() as { username: string }

  const {
    data: accounts,
    isLoading,
    error,
  } = useQuery<AccountInItem[], AxiosError>(['userFollowers', username], () =>
    getUserFollowers(username)
  )

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  if (isLoading)
    return (
      <div className='flex justify-center pt-6'>
        <Spinner />
      </div>
    )

  if (error)
    return (
      <div className='text-center text-red-600 text-xl py-6'>
        There was a mistake
      </div>
    )

  if (accounts?.length === 0)
    return (
      <div className='text-center text-xl font-bold mt-6'>
        You don&apos;t have followers
      </div>
    )

  return (
    <div className='divide-y divide-outline-layout'>
      {accounts?.map(account => (
        <AccountItem key={account.id} {...account} />
      ))}
    </div>
  )
}

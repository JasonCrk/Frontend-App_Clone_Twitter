import axios from 'axios'

import {
  AccountInItem,
  IProfileResponse,
  IAccountsListResponse,
  AccountInProfile,
  Account,
} from '../interfaces/Account'

const API_TWITTER_ACCOUNT_BASE = 'http://localhost:4000/api/account'

const accountApi = axios.create({
  baseURL: API_TWITTER_ACCOUNT_BASE,
})

export const searchAccounts = async (
  query: string
): Promise<AccountInItem[]> => {
  const response = await accountApi.get<IAccountsListResponse>('/search', {
    params: {
      query,
      limit: 10,
    },
  })
  return response.data.accounts
}

export const getProfileByUsername = async (
  username: string
): Promise<AccountInProfile> => {
  const response = await accountApi.get<IProfileResponse>(`/${username}`)
  return response.data.profile
}

export const getUserFollowers = async (
  userId: string
): Promise<AccountInItem[]> => {
  const response = await accountApi.get<IAccountsListResponse>(
    `/${userId}/followers`,
    {
      params: {
        limit: 3,
      },
    }
  )
  return response.data.accounts
}

export const getMostFollowedUsers = async (
  limit?: number
): Promise<AccountInItem[]> => {
  const response = await accountApi.get<IAccountsListResponse>(
    `/most_followed`,
    {
      params: {
        limit,
      },
    }
  )
  return response.data.accounts
}

export const followAccount = async ({
  userFollowId,
  accessToken,
}: {
  userFollowId: string
  accessToken: string
}): Promise<Account> => {
  const response = await accountApi.post<{ account: Account }>(
    '/follow',
    {
      userFollowId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  return response.data.account
}

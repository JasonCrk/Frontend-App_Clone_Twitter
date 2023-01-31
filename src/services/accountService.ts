import axios from 'axios'

import {
  AccountInItem,
  IProfileResponse,
  IAccountsListResponse,
  AccountInProfile,
} from '../interfaces/Account'

const API_TWITTER_ACCOUNT_BASE = 'http://localhost:4000/api/account'

const accountApi = axios.create({
  baseURL: API_TWITTER_ACCOUNT_BASE,
})

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
    `/${userId}/followers?limit=3`
  )
  return response.data.accounts
}

export const getMostFollowedUsers = async (
  limit?: number
): Promise<AccountInItem[]> => {
  const response = await accountApi.get<IAccountsListResponse>(
    `/most_followed${limit ? '?limit=' + limit : ''}`
  )
  return response.data.accounts
}

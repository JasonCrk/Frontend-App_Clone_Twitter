import { UserInProfile } from './User'

export interface Account {
  id: string
  avatar: string
  header: string
  website: string
  bibliography: string
  location: string
  birthday: Date
  createdAt: Date
  updatedAt: Date
  verify: boolean
}

export interface AccountInItem {
  id: string
  avatar: string
  verify: boolean
  bibliography?: string
  user: {
    followers: Array<{ id: string }>
    id: string
    username: string
    firstName: string
  }
}

export interface AccountInTweet {
  id: string
  avatar: string
  verify: boolean
}

export interface AccountInProfile extends Omit<Account, 'updatedAt'> {
  user: UserInProfile
  followings: Array<{ id: string }>
}

export interface IProfileResponse {
  profile: AccountInProfile
}

export interface IAccountsListResponse {
  accounts: AccountInItem[]
}

import { Account, AccountInTweet } from './Account'

export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  password: string
  email: string
  account: Account
}

export interface UserUsername {
  user: {
    username: string
  }
}

export interface UserInComment {
  id: string
  firstName: string
  username: string
  account: AccountInTweet
}

export interface UserInTweet {
  id: string
  username: string
  account: AccountInTweet
}

export interface UserAuth extends Omit<User, 'password' | 'account'> {
  account: {
    id: string
    avatar: string
  }
}

export interface UserInProfile {
  id: string
  username: string
  firstName: string
  lastName: string
  posts: Array<{ id: string }>
  followers: Array<{ id: string }>
}

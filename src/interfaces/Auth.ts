import { UserAuth } from './User'

export interface LoginData {
  email: string
  password: string
}

export interface IVerifyLoggedResponse {
  user: UserAuth
}

export interface ISignInResponse {
  accessToken: string
}

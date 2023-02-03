import { UserAuth } from './User'

export interface LoginData {
  email: string
  password: string
}

export interface SignUpData {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

export interface UserReponse extends Omit<SignUpData, 'password'> {
  id: string
}

export interface IVerifyLoggedResponse {
  user: UserAuth
}

export interface ISignInResponse {
  accessToken: string
}

export interface ISignUpResponse {
  user: UserReponse
}

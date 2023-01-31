import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { UserAuth } from '../interfaces/User'

interface AuthState {
  isAuth: boolean
  token: string | null
  loading: boolean
  user: UserAuth | null
}

interface AuthActions {
  setIsAuth: (value: boolean) => void
  setToken: (token: string) => void
  setLoading: (loading: boolean) => void
  setUser: (user: UserAuth | null) => void
}

export const useAuthStore = create(
  devtools<AuthState & AuthActions>(set => ({
    isAuth: false,
    token: null,
    user: null,
    loading: true,
    setIsAuth: value =>
      set(state => ({
        ...state,
        isAuth: value,
      })),
    setToken: accessToken =>
      set(state => ({
        ...state,
        token: accessToken,
      })),
    setUser: userData =>
      set(state => ({
        ...state,
        user: userData,
      })),
    setLoading: value =>
      set(state => ({
        ...state,
        loading: value,
      })),
  }))
)

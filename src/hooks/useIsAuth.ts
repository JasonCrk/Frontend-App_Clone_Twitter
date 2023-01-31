import { LoaderFunction } from 'react-router-dom'
import { verifyLogged } from '../services/authService'

import { useAuthStore } from '../store/authStore'

export const useIsAuth: LoaderFunction = async () => {
  const setIsAuth = useAuthStore.getState().setIsAuth
  const setLoading = useAuthStore.getState().setLoading
  const setToken = useAuthStore.getState().setToken
  const setUser = useAuthStore.getState().setUser

  const token = localStorage.getItem('accessToken_twitter')

  if (!token) {
    setIsAuth(false)
    setLoading(false)
    return null
  }

  try {
    const { user } = await verifyLogged(token)
    setIsAuth(true)
    setToken(token)
    setUser(user)
    setLoading(false)
  } catch (error) {
    setIsAuth(false)
    setLoading(false)
  }

  return null
}
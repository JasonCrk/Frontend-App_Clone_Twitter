import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '../store/authStore'

export const useProtect = () => {
  const navigate = useNavigate()

  const { user, isLoadingAuth, token, isAuth } = useAuthStore(state => ({
    user: state.user,
    isLoadingAuth: state.loading,
    token: state.token,
    isAuth: state.isAuth,
  }))

  useEffect(() => {
    if (!isAuth || !token) {
      navigate('/explore')
    }
  }, [])

  return {
    user,
    isLoadingAuth,
    token,
    isAuth,
  }
}

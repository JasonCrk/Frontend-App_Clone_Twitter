import { LoaderFunction, redirect } from 'react-router-dom'

import { useAuthStore } from '../store/authStore'

export const useProtectRoute: LoaderFunction = () => {
  const isAuth = useAuthStore.getState().isAuth
  const token = useAuthStore.getState().token

  if (!isAuth || !token) {
    return redirect('/explore')
  }

  return null
}
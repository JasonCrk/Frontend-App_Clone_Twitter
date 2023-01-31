import { createBrowserRouter, redirect } from 'react-router-dom'

import { MainLayout } from '../components/layouts/MainLayout'
import { AuthLayout } from '../components/layouts/AuthLayout'

import { ErrorPage } from '../pages/ErrorPage'

import { SignInPage } from '../pages/SignIn'
import { SignUpPage } from '../pages/SignUp'

import { HomePage } from '../pages/HomePage'
import { ExplorePage } from '../pages/ExplorePage'
import { ProfilePage } from '../pages/ProfilePage'
import { UserTweets } from '../components/UserTweets'
import { TweetsUserLiked } from '../components/TweetsUserLiked'
import { MediaTweets } from '../components/MediaTweets'
import { TrendsPage } from '../pages/TrendsPage'
import { useAuthStore } from '../store/authStore'
import { useIsAuth } from '../hooks/useIsAuth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    loader: useIsAuth,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: () => {
          return redirect('/explore')
        },
      },
      {
        path: 'home',
        loader: () => {
          const isAuth = useAuthStore.getState().isAuth

          if (!isAuth) {
            redirect('/explore')
            return null
          }

          return null
        },
        element: <HomePage />,
      },
      {
        path: 'explore',
        element: <ExplorePage />,
      },
      {
        path: 'trends',
        element: <TrendsPage />,
      },
      {
        path: ':username',
        element: <ProfilePage />,
        children: [
          {
            index: true,
            element: <UserTweets />,
          },
          {
            path: 'likes',
            element: <TweetsUserLiked />,
          },
          {
            path: 'media',
            element: <MediaTweets />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signIn',
        element: <SignInPage />,
      },
      {
        path: 'signUp',
        element: <SignUpPage />,
      },
    ],
  },
])

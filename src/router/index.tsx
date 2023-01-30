import { createBrowserRouter } from 'react-router-dom'

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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
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

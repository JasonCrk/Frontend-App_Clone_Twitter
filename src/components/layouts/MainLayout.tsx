import { FC } from 'react'

import { Outlet } from 'react-router-dom'

import VerticalNavbar from '../VerticalNavbar'
import VerticalSearchTweets from '../VerticalSearchTweets'

export const MainLayout: FC = () => {
  return (
    <div className='bg-black'>
      <div className='container mx-auto sm:px-0 md:px-0 lg:px-10 xl:px-30 2xl:px-40 w-full'>
        <main className='grid max-sm:grid-cols-sm sm:grid-cols-sm max-md:grid-cols-md md:grid-cols-md lg:grid-cols-md xl:grid-cols-md 2xl:grid-cols-lg divide-x divide-neutral-600 max-md:border-r max-md:border-neutral-600 w-full'>
          <VerticalNavbar />
          <div className='flex flex-col text-white'>
            <Outlet />
          </div>
          <VerticalSearchTweets />
        </main>
      </div>
    </div>
  )
}

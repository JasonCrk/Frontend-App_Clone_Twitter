import { FC } from 'react'

import { useLocation } from 'react-router-dom'

import { BsSearch } from 'react-icons/bs'

import TrendTweetsList from './TrendTweetsList'
import MostFollowedList from './MostFollowedList'

const VerticalSearchTweets: FC = () => {
  const location = useLocation()

  const noExplorePage = location.pathname !== '/explore'

  return (
    <div className='text-white max-md:hidden pl-8 pt-2 w-full sticky top-0 left-0'>
      {noExplorePage && (
        <>
          <label className='relative'>
            <input
              type='text'
              className='peer/search pr-4 pl-12 py-3 placeholder:text-zinc-500 focus:outline-none focus:bg-transparent border border-transparent focus:border-blue-500 rounded-full w-full bg-zinc-900 mb-4'
              placeholder='Search Twitter'
            />
            <BsSearch className='absolute top-0.5 left-4 text-lg text-zinc-500 peer-focus/search:text-blue-600' />
          </label>
          <div className='bg-zinc-900 rounded-2xl w-full overflow-hidden mb-3'>
            <h6 className='px-4 py-3 text-xl font-extrabold'>Trends for you</h6>
            <TrendTweetsList />
          </div>
        </>
      )}

      <div className='bg-zinc-900 rounded-2xl w-full overflow-hidden mt-1'>
        <h6 className='px-4 py-3 text-xl font-extrabold'>Who to follow</h6>
        <MostFollowedList />
      </div>
    </div>
  )
}

export default VerticalSearchTweets

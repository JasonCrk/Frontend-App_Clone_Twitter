import { FC } from 'react'

import { useLocation } from 'react-router-dom'

import { InputSearch } from './InputSearch'
import TrendTweetsList from './TrendTweetsList'
import MostFollowedList from './MostFollowedList'

const VerticalSearchTweets: FC = () => {
  const location = useLocation()

  const noExplorePage = location.pathname !== '/explore'
  const noSearchPage = location.pathname !== '/search'
  const noTrendsPage = location.pathname !== '/trends'

  return (
    <div className='text-white max-md:hidden pl-8 pt-2 w-full sticky top-0 left-0'>
      {noExplorePage && (
        <>
          {noSearchPage && <InputSearch />}

          {noTrendsPage && (
            <div className='bg-zinc-900 rounded-2xl w-full overflow-hidden mb-3'>
              <h6 className='px-4 py-3 text-xl font-extrabold'>
                Trends for you
              </h6>
              <TrendTweetsList />
            </div>
          )}
        </>
      )}

      <div className='bg-zinc-900 rounded-2xl w-full overflow-hidden mt-1 mb-6'>
        <h6 className='px-4 py-3 text-xl font-extrabold'>Who to follow</h6>
        <MostFollowedList />
      </div>
    </div>
  )
}

export default VerticalSearchTweets

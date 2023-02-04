import { FC } from 'react'

import { NavLink, useLoaderData, useLocation } from 'react-router-dom'

import { AxiosError } from 'axios'
import { useQuery } from 'react-query'

import { AccountInItem } from '../interfaces/Account'
import { ISearchTweetsParams, Tweet } from '../interfaces/Tweet'
import { searchTweetsOrAccounts } from '../services/tweetService'

import { Tab } from '@headlessui/react'

import { Bar } from '../components/Bar'
import Spinner from '../components/Spinner'
import AccountItem from '../components/AccountItem'
import TweetItem from '../components/TweetItem'

import { BsSearch } from 'react-icons/bs'

const tabsFilters = [
  {
    name: 'Top',
    path: (query: string) => `/search?q=${query}`,
  },
  {
    name: 'Latest',
    path: (query: string) => `/search?q=${query}&f=live`,
  },
  {
    name: 'People',
    path: (query: string) => `/search?q=${query}&f=user`,
  },
]

export const SearchPage: FC = () => {
  const queries = useLoaderData() as ISearchTweetsParams
  const location = useLocation()

  const filterSelected = (path: string): boolean =>
    location.pathname + location.search === path

  const { data, isLoading, error } = useQuery<
    Tweet[] | AccountInItem[],
    AxiosError
  >({
    queryKey: ['search', queries],
    queryFn: () => searchTweetsOrAccounts(queries),
    enabled: Boolean(queries.query || queries.find),
  })

  return (
    <>
      <Bar styles=''>
        <div className='px-4 py-2'>
          <label className='relative'>
            <input
              type='text'
              className='peer/search pr-4 pl-12 py-3 placeholder:text-zinc-500 focus:outline-none focus:bg-transparent border border-transparent focus:border-blue-500 rounded-full w-full bg-zinc-900'
              placeholder='Search Twitter'
            />
            <BsSearch className='absolute top-0.5 left-4 text-lg text-zinc-500 peer-focus/search:text-blue-600' />
          </label>
        </div>

        <div className='w-full mt-1'>
          <Tab.Group>
            <Tab.List className='flex justify-around'>
              {tabsFilters.map(({ name, path }) => (
                <Tab
                  key={name}
                  to={path(queries.query)}
                  as={NavLink}
                  className={`w-full hover:bg-neutral-700/40 hover:transition-[background] py-3 text-center`}
                >
                  <span
                    className={`${
                      filterSelected(path(queries.query))
                        ? 'border-b-4 border-blue-500 font-bold'
                        : 'text-neutral-500'
                    } py-3 text-lg`}
                  >
                    {name}
                  </span>
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
      </Bar>

      {isLoading ? (
        <div className='flex justify-center mt-4'>
          <Spinner />
        </div>
      ) : error ? (
        <div className='text-red-500 text-center mt-4'>Hubo un error</div>
      ) : data?.length === 0 ? (
        <div className='text-center text-lg font-bold pt-4 border-t border-neutral-500'>
          No hay resultados
        </div>
      ) : (
        <div>
          {queries.find === 'user'
            ? (data as AccountInItem[]).map(account => (
                <AccountItem key={account.id} {...account} />
              ))
            : (data as Tweet[]).map(tweet => (
                <TweetItem key={tweet.id} {...tweet} />
              ))}
        </div>
      )}
    </>
  )
}

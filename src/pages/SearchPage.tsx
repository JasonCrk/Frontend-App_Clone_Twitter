import type { FC } from 'react'

import { NavLink, useLoaderData, useLocation } from 'react-router-dom'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { AccountInItem } from '../interfaces/Account'
import { ISearchTweetsParams, Tweet } from '../interfaces/Tweet'
import { searchTweetsOrAccounts } from '../services/tweetService'

import { Tab } from '@headlessui/react'

import { Bar } from '../components/Bar'
import { InputSearch } from '../components/InputSearch'
import Spinner from '../components/Spinner'
import AccountItem from '../components/AccountItem'
import TweetItem from '../components/TweetItem'

export const SearchPage: FC = () => {
  const queries = useLoaderData() as ISearchTweetsParams
  const location = useLocation()

  const tabsFilters = [
    {
      name: 'Top',
      path: `/search?q=${queries.query}`,
    },
    {
      name: 'Latest',
      path: `/search?q=${queries.query}&f=live`,
    },
    {
      name: 'People',
      path: `/search?q=${queries.query}&f=user`,
    },
  ]

  const locationSearch = `?q=${queries.query}${
    queries.find ? '&f=' + queries.find : ''
  }`

  const filterSelected = (path: string): boolean =>
    location.pathname + locationSearch === path

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
      <Bar styles='border-b border-neutral-500'>
        <div className='px-4 py-2'>
          <InputSearch query={queries.query} searchBar />
        </div>

        <div className='w-full'>
          <Tab.Group>
            <Tab.List className='flex justify-around'>
              {tabsFilters.map(({ name, path }) => (
                <Tab
                  key={name}
                  to={path}
                  as={NavLink}
                  className={`w-full hover:bg-neutral-700/40 hover:transition-[background] py-3 text-center`}
                >
                  <span
                    className={`${
                      filterSelected(path)
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
        <div className='flex justify-center mt-6'>
          <Spinner />
        </div>
      ) : error ? (
        <div className='text-red-500 text-center text-lg mt-6'>
          Hubo un error
        </div>
      ) : data?.length === 0 ? (
        <div className='text-center text-lg font-bold pt-6'>
          No hay resultados
        </div>
      ) : (
        <div className='divide-y divide-neutral-500'>
          {queries.find === 'user'
            ? (data as AccountInItem[]).map(account => (
                <AccountItem key={account.id} {...account} />
              ))
            : (data as Tweet[]).map(tweet => (
                <TweetItem key={tweet.id} tweetData={tweet} />
              ))}
        </div>
      )}
    </>
  )
}

import { FC, Fragment, useState } from 'react'

import { Link } from 'react-router-dom'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { AccountInItem } from '../interfaces/Account'
import { searchAccounts } from '../services/accountService'

import { Combobox, Transition } from '@headlessui/react'

import { BsSearch } from 'react-icons/bs'
import Spinner from './Spinner'
import AccountItem from './AccountItem'

interface InputSearchProps {
  query?: string
  searchBar?: boolean
}

export const InputSearch: FC<InputSearchProps> = ({ query, searchBar }) => {
  const [queryValue, setQueryValue] = useState(query || '')

  const {
    data: accounts,
    error,
    isLoading,
  } = useQuery<AccountInItem[], AxiosError>(
    ['search', queryValue],
    () => searchAccounts(queryValue),
    {
      enabled: queryValue.length > 0,
      staleTime: 10 * 1000,
    }
  )

  return (
    <Combobox>
      <div className='relative'>
        <Combobox.Input
          className={`peer/search pr-4 pl-12 py-3 placeholder:text-zinc-500 focus:outline-none focus:bg-transparent border border-transparent focus:border-blue-500 rounded-full w-full bg-zinc-900 ${
            searchBar ? 'mb-1' : 'mb-4'
          }`}
          onChange={e => setQueryValue(e.target.value)}
          placeholder='Search Twitter'
        />
        <BsSearch className='absolute top-4 left-4 text-lg text-zinc-500 peer-focus/search:text-blue-600' />
      </div>

      <Transition
        as={Fragment}
        leave='transition ease-in duration-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        afterLeave={() => setQueryValue(queryValue)}
      >
        <Combobox.Options
          className={`absolute rounded-md overflow-auto bg-black shadow-neutral-400 shadow-border ${
            searchBar
              ? 'max-sm:w-[92%] sm:w-[94%] md:w-[91%] lg:w-[92%] xl:w-[94%] mt-2'
              : 'md:w-[90.5%] 2xl:w-[92%]'
          }`}
        >
          {queryValue === '' ? (
            <div className='text-center py-2'>Ingrese un valor</div>
          ) : (
            <>
              <Combobox.Option
                as={Link}
                to={`/search?q=${queryValue}`}
                value=''
              >
                <div className='w-full px-6 py-5 hover:bg-neutral-900 flex flex-row gap-5 items-center'>
                  <BsSearch className='text-2xl' />
                  <span className='text-lg'>
                    Search for {`"${queryValue}"`}
                  </span>
                </div>
              </Combobox.Option>

              {isLoading ? (
                <div className='flex justify-center'>
                  <Spinner />
                </div>
              ) : error ? (
                <div className='text-red-500 text-center'>Hubo un error</div>
              ) : accounts ? (
                <>
                  {accounts.map(account => (
                    <Combobox.Option
                      as={'div'}
                      key={account.id}
                      className='w-full'
                      value=''
                    >
                      <AccountItem {...account} />
                    </Combobox.Option>
                  ))}
                </>
              ) : null}
            </>
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  )
}

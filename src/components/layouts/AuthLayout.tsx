import type { FC } from 'react'

import { NavLink, Outlet } from 'react-router-dom'

import { AiOutlineClose } from 'react-icons/ai'

export const AuthLayout: FC = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='relative p-8 shadow-white shadow-border rounded-md'>
        <NavLink to={'/'}>
          <button className='absolute top-4 left-3 rounded-full text-white text-2xl'>
            <AiOutlineClose />
          </button>
        </NavLink>
        <Outlet />
      </div>
    </div>
  )
}

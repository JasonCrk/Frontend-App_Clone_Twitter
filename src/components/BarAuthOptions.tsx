import { FC } from 'react'
import { Link } from 'react-router-dom'

export const BarAuthOptions: FC = () => {
  return (
    <div className='bg-sky-500 py-4 w-full flex justify-center fixed z-20 top-[89vh]'>
      <div className='flex justify-between items-center container mx-auto md:px-28 xl:px-52 2xl:px-60'>
        <div className='text-white'>
          <p className='text-2xl font-bold'>Don’t miss what’s happening</p>
          <p className='text-lg'>People on Twitter are the first to know.</p>
        </div>
        <div className='flex gap-4'>
          <Link
            to={'/auth/signIn'}
            className='text-white border border-white hover:bg-white/10 hover:transition-colors py-2 font-bold px-4 rounded-full'
          >
            Log in
          </Link>
          <Link
            to={'/auth/signUp'}
            className='bg-white py-2 hover:bg-neutral-100 hover:transition-colors font-bold px-4 rounded-full'
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

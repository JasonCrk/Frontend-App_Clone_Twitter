import { FC } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { IconType } from 'react-icons'

interface LinkNavbarProps {
  name: string
  path: string
  IconFill: IconType
  IconOutline: IconType
}

const LinkNavbar: FC<LinkNavbarProps> = ({
  name,
  path,
  IconOutline,
  IconFill,
}) => {
  const location = useLocation()
  const isActive = location?.pathname === path

  return (
    <Link to={path} className='w-full max-lg:flex max-lg:justify-center group'>
      <div className='inline-flex px-4 py-3 max-lg:p-4 rounded-full gap-2 text-3xl group-hover:bg-neutral-900 group-hover:transition-colors'>
        {isActive ? <IconFill /> : <IconOutline />}
        <span className={`text-xl max-lg:hidden ${isActive && 'font-bold'}`}>
          {name}
        </span>
      </div>
    </Link>
  )
}

export default LinkNavbar

import { FC, ReactNode } from 'react'

import { Menu } from '@headlessui/react'

import { IconType } from 'react-icons'

interface MenuOptionProps {
  Icon: IconType
  children: ReactNode
  [property: string]: any
}

const MenuOption: FC<MenuOptionProps> = ({ Icon, children, ...others }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`px-4 py-2 group flex items-center truncate justify-start max-lg:justify-center max-lg:px-5 transition-[background] lg:gap-1 font-bold w-full ${
            active ? 'bg-neutral-900' : 'bg-black'
          }`}
          {...others}
        >
          <Icon className='text-2xl max-lg:text-3xl' />
          <span className='max-lg:hidden'>{children}</span>
        </button>
      )}
    </Menu.Item>
  )
}

export default MenuOption

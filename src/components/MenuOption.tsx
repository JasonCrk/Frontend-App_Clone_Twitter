import { FC } from 'react'

import { Menu } from '@headlessui/react'

import { IconType } from 'react-icons'

interface MenuOptionProps {
  Icon: IconType
  children: string
  [property: string]: any
}

const MenuOption: FC<MenuOptionProps> = ({ Icon, children, ...others }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`px-5 py-3 w-fit group flex items-center justify-start max-lg:justify-center transition-[background] lg:gap-2 font-bol font-bold ${
            active ? 'bg-gray-900' : 'bg-black'
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

import { FC, ChangeEventHandler } from 'react'

import { IconType } from 'react-icons'

interface FileButtonProps {
  onChange: ChangeEventHandler<HTMLInputElement>
  name: string
  id: string
  accept: string
  Icon: IconType
  multipleSelect?: boolean
}

export const FileButton: FC<FileButtonProps> = ({
  onChange,
  name,
  id,
  accept,
  Icon,
  multipleSelect,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className='p-2 rounded-full text-lg text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 transition-[background] cursor-pointer'
      >
        <Icon />
      </label>
      <input
        id={id}
        name={name}
        multiple={multipleSelect}
        className='hidden'
        type='file'
        accept={accept}
        onChange={onChange}
      />
    </>
  )
}

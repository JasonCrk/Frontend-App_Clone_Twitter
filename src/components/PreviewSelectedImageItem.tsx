import type { FC } from 'react'

import { AiOutlineClose } from 'react-icons/ai'

interface PreviewSelectedImageItemProps {
  imageUrl: string
  index: number
  stylesImage?: string
  stylesDiv?: string
  handleDeleteImage: (url: string, indexFile: number) => void
}

export const PreviewSelectedImageItem: FC<PreviewSelectedImageItemProps> = ({
  imageUrl,
  index,
  stylesImage,
  stylesDiv,
  handleDeleteImage,
}) => {
  return (
    <div className={`relative w-full ${stylesDiv}`}>
      <button
        type='button'
        onClick={() => handleDeleteImage(imageUrl, index)}
        className='absolute bg-neutral-700/50 top-3 left-3 p-2 rounded-full hover:bg-neutral-700/90 hover:text-white'
      >
        <AiOutlineClose />
      </button>

      <img
        src={imageUrl}
        alt=''
        className={`w-full h-full rounded-xl ${stylesImage}`}
      />
    </div>
  )
}

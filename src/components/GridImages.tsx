import type { FC } from 'react'

import { Image } from '../interfaces/Image'

interface GridImagesProps {
  images: Image[]
  isMention?: boolean
}

export const GridImages: FC<GridImagesProps> = ({ images, isMention }) => {
  if (images.length === 1)
    return (
      <img
        src={images[0].imageUrl}
        key={images[0].id}
        alt=''
        className={`w-full ${isMention ? 'rounded-b-2xl' : 'mb-4 rounded-2xl'}`}
      />
    )

  if (images.length === 2)
    return (
      <div
        className={`grid grid-cols-2 gap-1 h-96 overflow-hidden ${isMention ? 'rounded-b-2xl' : 'mb-4 rounded-2xl'
          }`}
      >
        {images.map(image => (
          <img
            src={image.imageUrl}
            key={image.id}
            alt=''
            className='h-full w-full object-cover'
          />
        ))}
      </div>
    )

  if (images.length === 3) return <div className='grid grid-cols-2 grid-rows-2 gap-1 h-96 mb-4 rounded-2xl overflow-hidden'>
    {images.map((image, index) => (
      <img
        src={image.imageUrl}
        key={image.id}
        alt=''
        className={`h-full w-full object-cover ${index === 0 && 'row-span-2'}`}
      />
    ))}
  </div>

  return <div className='grid grid-cols-2 grid-rows-2 gap-1 h-96 mb-4 rounded-2xl overflow-hidden'>
    {images.map(image => (
      <img
        src={image.imageUrl}
        key={image.id}
        alt=''
        className='h-full w-full object-cover'
      />
    ))}
  </div>
}

import { FC } from 'react'

import { ImageTweet } from '../interfaces/ImageTweet'

interface GridImagesProps {
  images: ImageTweet[]
}

export const GridImages: FC<GridImagesProps> = ({ images }) => {
  if (images.length === 1)
    return (
      <img
        src={images[0].imageUrl}
        key={images[0].id}
        alt=''
        className='rounded-2xl w-full mb-4'
      />
    )

  if (images.length === 2)
    return (
      <div className='grid grid-cols-2 mb-4 gap-px rounded-2xl'>
        {images.map(image => (
          <img
            src={image.imageUrl}
            key={image.id}
            alt=''
            className='h-96 w-full mb-4 object-cover'
          />
        ))}
      </div>
    )

  if (images.length === 3) return <div>3 Image</div>

  if (images.length === 4) return <div>4 Image</div>

  return <div>Hay más de 4 images</div>
}

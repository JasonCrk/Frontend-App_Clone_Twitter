import type { Dispatch, FC, SetStateAction } from 'react'

import { AiOutlineClose } from 'react-icons/ai'

interface PreviewSelectedImagesProps {
  selectedImages: string[]
  setSelectedFileImages: Dispatch<SetStateAction<File[]>>
  setFilesImage: Dispatch<SetStateAction<string[]>>
}

export const PreviewSelectedImages: FC<PreviewSelectedImagesProps> = ({
  selectedImages,
  setFilesImage,
  setSelectedFileImages,
}) => {
  const handleDeleteImage = (url: string, indexFile: number) => {
    setFilesImage(selectImages =>
      selectImages.filter(imageUrl => imageUrl !== url)
    )
    setSelectedFileImages(fileImages => {
      const images = [...fileImages]
      images.splice(indexFile, 1)
      return images
    })
  }

  return (
    <div>
      {selectedImages.map((imageUrl, index) => (
        <div key={imageUrl} className='relative'>
          <button
            type='button'
            onClick={() => handleDeleteImage(imageUrl, index)}
            className='absolute bg-neutral-700/50 top-3 left-3 p-2 rounded-full hover:bg-neutral-700/90 hover:text-white'
          >
            <AiOutlineClose />
          </button>

          <img src={imageUrl} alt='' className='w-full rounded-xl' />
        </div>
      ))}
    </div>
  )
}

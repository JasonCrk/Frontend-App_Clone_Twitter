import type { Dispatch, FC, SetStateAction } from 'react'

import { PreviewSelectedImageItem } from './PreviewSelectedImageItem'

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

  if (selectedImages.length === 1)
    return (
      <PreviewSelectedImageItem
        index={0}
        imageUrl={selectedImages[0]}
        handleDeleteImage={handleDeleteImage}
      />
    )

  if (selectedImages.length === 2)
    return (
      <div className='grid grid-cols-2 gap-2'>
        {selectedImages.map((imageUrl, index) => (
          <PreviewSelectedImageItem
            key={index}
            index={index}
            imageUrl={imageUrl}
            handleDeleteImage={handleDeleteImage}
            stylesImage='object-cover object-center'
          />
        ))}
      </div>
    )

  if (selectedImages.length === 3)
    return (
      <div className='grid grid-cols-2 grid-rows-2 gap-2'>
        {selectedImages.map((imageUrl, index) => (
          <PreviewSelectedImageItem
            key={index}
            index={index}
            imageUrl={imageUrl}
            handleDeleteImage={handleDeleteImage}
            stylesDiv={index === 0 ? 'row-span-2' : ''}
            stylesImage={index === 0 ? 'object-cover' : ''}
          />
        ))}
      </div>
    )

  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-2'>
      {selectedImages.map((imageUrl, index) => (
        <PreviewSelectedImageItem
          key={index}
          index={index}
          imageUrl={imageUrl}
          handleDeleteImage={handleDeleteImage}
          stylesImage={'object-cover'}
        />
      ))}
    </div>
  )
}

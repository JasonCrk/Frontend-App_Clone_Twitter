import { FC } from 'react'

import { Link } from 'react-router-dom'

interface FilterTagProps {
  tag: string
}

export const FilterTag: FC<FilterTagProps> = ({ tag }) => {
  return (
    <Link
      to={`/search?hashtag=${tag}`}
      className='hover:bg-blue-500 hover:text-white text-blue-500 rounded-md px-2 py-1 text-sm transition-colors'
    >
      #{tag}
    </Link>
  )
}

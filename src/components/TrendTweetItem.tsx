import { FC } from 'react'
import { Link } from 'react-router-dom'

interface TrendTweetsItemProps {
  hashtag: string
  countTweets: number
}

const TrendTweetsItem: FC<TrendTweetsItemProps> = ({
  hashtag,
  countTweets,
}) => {
  return (
    <Link to={`/search?q=${hashtag}`}>
      <div className='py-3 px-4 w-full hover:bg-white/5 hover:transition-colors'>
        <p className='text-xs text-neutral-500'>Trending</p>
        <p className='font-bold'>{hashtag}</p>
        <p className='text-xs text-neutral-500'>{countTweets} Tweets</p>
      </div>
    </Link>
  )
}

export default TrendTweetsItem

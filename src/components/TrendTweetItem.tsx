import { FC } from 'react'
import { Link } from 'react-router-dom'

import { TrendTweet } from '../interfaces/Tweet'

const TrendTweetsItem: FC<TrendTweet> = ({ hashtag, countTweets }) => {
  return (
    <Link to={'/'}>
      <div className='py-3 px-4 w-full hover:bg-white/5 hover:transition-colors'>
        <p className='text-xs text-neutral-500'>Trending</p>
        <p className='font-bold'>{hashtag}</p>
        <p className='text-xs text-neutral-500'>{countTweets} Tweets</p>
      </div>
    </Link>
  )
}

export default TrendTweetsItem

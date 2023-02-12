import { FC } from 'react'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { Tweet } from '../interfaces/Tweet'
import { formatTimezone } from '../utils/formatDate'
import { FilterTag } from './FilterTag'
import { GridImages } from './GridImages'

interface TweetMentionItemProps {
  tweet: Tweet
}

export const TweetMentionItem: FC<TweetMentionItemProps> = ({ tweet }) => {
  const tweetHashtags = (hashtags: string | null) => hashtags?.split(',')

  return (
    <div className='border border-outline-layout rounded-2xl w-full'>
      <div className='p-3'>
        <div className='flex gap-1 items-center'>
          <img
            className='w-6 h-6 object-cover rounded-full'
            src={tweet.user.account.avatar}
          />
          <span className='font-bold'>{tweet.user.username}</span>
          {tweet.user.account.verify && (
            <BsFillPatchCheckFill className='text-blue-500' />
          )}
          <span className='text-gray-500'>-</span>
          <span className='text-gray-500'>
            {formatTimezone(tweet.createdAt)}
          </span>
        </div>

        <p className='py-1'>{tweet.content}</p>

        {tweetHashtags(tweet.hashtags) && (
          <div className='flex flex-wrap mb-2'>
            {tweetHashtags(tweet.hashtags)!.map(hashtag => (
              <FilterTag key={hashtag} tag={hashtag.trim()} />
            ))}
          </div>
        )}
      </div>

      {tweet.images.length > 0 && (
        <GridImages images={tweet.images} isMention />
      )}
    </div>
  )
}

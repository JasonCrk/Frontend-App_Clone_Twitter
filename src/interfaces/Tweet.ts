import { UserInTweet } from './User'
import { Image } from './Image'

export interface CountInTweet {
  id: string
}

export interface Tweet {
  id: string
  content: string
  hashtags: string | null
  user: UserInTweet
  createdAt: Date
  updatedAt: Date
  mention: Tweet | null
  images: Image[]
  likes: CountInTweet[]
  comments: CountInTweet[]
}

export interface ITweetsResponse {
  posts: Tweet[]
}

export interface ITweetResponse {
  post: Tweet
}

export interface ISearchTweetsParams {
  query: string
  find: string | undefined
}

export interface TweetInitialValue {
  content: string
  hashtags: string
  mention?: string
  images: any[]
}

export interface TrendTweets {
  [hashtag: string]: number
}

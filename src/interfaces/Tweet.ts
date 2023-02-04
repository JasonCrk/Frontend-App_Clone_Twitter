import { UserInTweet } from './User'
import { ImageTweet } from './ImageTweet'

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
  mention: Tweet
  images: ImageTweet[]
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
  images: any[]
}

export interface TrendTweet {
  hashtag: string
  countTweets: number
}

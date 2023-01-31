import axios from 'axios'

import {
  ITweetResponse,
  ITweetsResponse,
  TrendTweet,
  Tweet,
} from '../interfaces/Tweet'

const API_TWITTER_TWEETS_BASE = 'http://localhost:4000/api/posts'

const tweetsApi = axios.create({
  baseURL: API_TWITTER_TWEETS_BASE,
})

export const getAllTweets = async (): Promise<Tweet[]> => {
  const result = await tweetsApi.get<ITweetsResponse>('')
  return result.data.posts
}

export const getTweetById = async (tweetId: string): Promise<Tweet> => {
  const result = await tweetsApi.get<ITweetResponse>(`/${tweetId}`)
  return result.data.post
}

export const createTweet = async ({
  tweetData,
  accessToken,
}: {
  tweetData: FormData
  accessToken: string
}): Promise<{ message: string }> => {
  const result = await tweetsApi.post('', tweetData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return result.data
}

export const likeTweet = async ({
  tweetId,
  accessToken,
}: {
  tweetId: string
  accessToken: string
}): Promise<ITweetResponse> => {
  const result = await tweetsApi.post<ITweetResponse>(
    '/like',
    { postId: tweetId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  return result.data
}

export const getUserTweets = async (username: string): Promise<Tweet[]> => {
  const result = await tweetsApi.get<ITweetsResponse>(`/user/${username}`)
  return result.data.posts
}

export const getLikedTweets = async (username: string): Promise<Tweet[]> => {
  const result = await tweetsApi.get<ITweetsResponse>(`/user/${username}/liked`)
  return result.data.posts
}

export const getTrendTweetsList = async (): Promise<TrendTweet[]> => {
  const result = await tweetsApi.get<{ trends: TrendTweet[] }>('/trends')
  return result.data.trends
}

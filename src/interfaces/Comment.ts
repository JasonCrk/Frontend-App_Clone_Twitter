import { Image } from './Image'
import { UserInComment } from './User'

export interface Comment {
  id: string
  content: string
  images: Image[]
  likes: Array<{ id: string }>
  comments: Array<{ id: string }>
  comment?: {
    id: string
    user: {
      username: string
    }
    post: {
      id: string
    } | null
    comment: {
      id: string
    } | null
  } | null
  post?: {
    id: string,
    user: {
      username: string
    }
  } | null
  user: UserInComment
  createdAt: Date
}

export interface CommentInitialValue {
  content: string
  postId?: string
  commentId?: string
  images: any[]
}

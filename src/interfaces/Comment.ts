import { Image } from './Image'
import { UserInComment, UserUsername } from './User'

export interface Comment {
  id: string
  content: string
  images: Image[]
  likes: Array<{ id: string }>
  comments: Array<{ id: string }>
  comment?: UserUsername | null
  post?: UserUsername | null
  user: UserInComment
  createdAt: Date
}

export interface CommentInitialValue {
  content: string
  postId?: string
  commentId?: string
  images: any[]
}

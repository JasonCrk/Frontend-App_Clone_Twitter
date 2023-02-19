import { FC, Fragment } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import { shallow } from 'zustand/shallow'
import { useAuthStore } from '../store/authStore'

import { useMutation, useQueryClient } from 'react-query'

import { Comment } from '../interfaces/Comment'
import { deleteComment } from '../services/commentService'

import { Menu, Transition } from '@headlessui/react'

import MenuOption from './MenuOption'

import { toast } from 'react-toastify'

import { BsFillTrashFill } from 'react-icons/bs'
import { SlOptions } from 'react-icons/sl'

interface CommentMenuProps {
  commentData: Comment
}

export const CommentMenu: FC<CommentMenuProps> = ({ commentData }) => {
  const { id, user, post, comment } = commentData

  const queryClient = useQueryClient()

  const location = useLocation()
  const navigate = useNavigate()

  const { userAuth, isAuth, token } = useAuthStore(
    state => ({
      userAuth: state.user,
      isAuth: state.isAuth,
      token: state.token!,
    }),
    shallow
  )

  const pathNavigateIfDeleted = post?.id
    ? `/tweets/${post.id}`
    : comment?.comment?.id
    ? `/comments/${comment?.comment?.id}/comments/${comment.id}`
    : `/tweets/${comment?.post?.id}/comments/${comment?.id}`

  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: deleteComment,
    onSuccess: result => {
      if (pathNavigateIfDeleted !== location.pathname) {
        navigate(pathNavigateIfDeleted)
        toast.success(result.message)
        return
      }

      queryClient.invalidateQueries('tweetComments')
      queryClient.invalidateQueries('commentComments')

      toast.success(result.message)
    },
    onError: error => {
      console.log(error)
    },
  })

  const handleDeleteComment = () => {
    deleteCommentMutation({ commentId: id, accessToken: token })
  }

  return (
    <Menu as='div' className='absolute top-2 right-2'>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          className={
            'absolute top-10 right-2 overflow-hidden shadow-menu-b shadow-border py-1.5 z-10 w-fit rounded-md bg-black'
          }
        >
          {isAuth && (
            <>
              {user.username === userAuth?.username && (
                <MenuOption
                  Icon={BsFillTrashFill}
                  onClick={() => handleDeleteComment()}
                >
                  Delete
                </MenuOption>
              )}
            </>
          )}
        </Menu.Items>
      </Transition>
      <Menu.Button className='p-2.5 hover:bg-blue-500/20 transition-colors rounded-full'>
        <SlOptions />
      </Menu.Button>
    </Menu>
  )
}

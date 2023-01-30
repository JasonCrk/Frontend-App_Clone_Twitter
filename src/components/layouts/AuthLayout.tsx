import type { FC } from 'react'

import { Outlet } from 'react-router-dom'

export const AuthLayout: FC = () => {
  return (
    <div>
      <h1>AuthLayout</h1>
      <Outlet />
    </div>
  )
}

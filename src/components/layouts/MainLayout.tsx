import { FC } from 'react'

import { Outlet } from 'react-router-dom'

export const MainLayout: FC = () => {
  return (
    <div>
      <h1>Layout</h1>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

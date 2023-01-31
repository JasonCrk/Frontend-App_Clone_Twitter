import { FC } from 'react'

import { useRouteError } from 'react-router-dom'

export const ErrorPage: FC = () => {
  const error = useRouteError()
  console.log(error)

  return <div>hello</div>
}

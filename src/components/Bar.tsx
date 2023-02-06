import { FC, ReactNode } from 'react'

interface BarProps {
  children: ReactNode
  styles: string
}

export const Bar: FC<BarProps> = ({ children, styles }) => {
  return (
    <div
      className={`sticky top-0 w-full bg-black bg-opacity-10 backdrop-blur-md z-10 ${styles}`}
    >
      {children}
    </div>
  )
}

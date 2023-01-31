import { FC, ReactNode } from 'react'

interface BarProps {
  children: ReactNode
  styles: string
}

const Bar: FC<BarProps> = ({ children, styles }) => {
  return (
    <div
      className={`sticky top-0 w-full bg-black bg-opacity-10 backdrop-blur-md z-20 ${styles}`}
    >
      {children}
    </div>
  )
}

export default Bar

import ReactDOM from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'
import { router } from './router'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { ToastContainer } from 'react-toastify'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer
      theme='dark'
      position='bottom-left'
      autoClose={5000}
      pauseOnHover
    />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

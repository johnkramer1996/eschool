import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const root = document.getElementById('root') as HTMLElement

const queryClient = new QueryClient()

createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={appRouter()} />
    <ToastContainer />
  </QueryClientProvider>
)

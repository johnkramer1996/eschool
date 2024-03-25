import { ErrorPage, MainPage, NotFoundPage, SchoolboyPage } from 'pages'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { BaseLayout } from './layouts/baseLayout'

export const appRouter = () => {
  return createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: PATH_PAGE.root,
          element: <MainPage />,
        },
        {
          path: PATH_PAGE.root,
          element: <MainPage />,
        },
        {
          path: PATH_PAGE.schoolboys.root,
          element: <MainPage />,
        },
        {
          path: PATH_PAGE.schoolboys.schoolboy(':schoolBoyId'),
          element: <SchoolboyPage />,
        },
        { path: PATH_PAGE[404], element: <NotFoundPage /> },
        { path: PATH_PAGE.error, element: <ErrorPage /> },
        { path: '*', element: <Navigate to={PATH_PAGE[404]} replace /> },
      ],
    },
  ])
}

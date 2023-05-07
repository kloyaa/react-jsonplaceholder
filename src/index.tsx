import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  RouterProvider,
} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { JsonPlaceholderClient } from './utils'

const Users = React.lazy(() => import('./pages/users.page'))
const UserDetails = React.lazy(() => import('./pages/user-details.page'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Users />,
  },
  {
    path: '/:id',
    element: <UserDetails />,
    loader: async (req: LoaderFunctionArgs) => {
      return await JsonPlaceholderClient.get(`/users/${req.params.id}`)
    },
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

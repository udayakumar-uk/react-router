import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Root, {Loader as rootLoader, Action as rootAction} from './routes/root.jsx'
import Contact, {Loader as contactLoader, Action as contactAction,} from './routes/contact.jsx'
import EditContact, {Action as editAction} from './routes/edit.jsx'
import {Action as destroyAction} from './routes/destroy.jsx'
import IndexRoot from './routes/index.jsx'
import ErrorPage from './error-page.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <Root />,
  errorElement: <ErrorPage />,
  loader: rootLoader,
  action: rootAction,
  children:[
    {
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <IndexRoot />,
        },
        {
          path: '/contacts/:contactId',
          element: <Contact />,
          loader: contactLoader,
          action: contactAction
        },
        {
          path: '/contacts/:contactId/edit',
          element: <EditContact />,
          loader: contactLoader,
          action: editAction,
        },
        {
          path: "contacts/:contactId/destroy",
          action: destroyAction,
          // errorElement: <div>Oops! There was an error.</div>,
        },
      ]
    }
  ]
  
},{
  path: '/about',
  element: <h2>About content</h2>
}

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

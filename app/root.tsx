import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react'
import styles from '~/tailwind.css?url'
import { LinksFunction, MetaFunction } from '@remix-run/node'
import { FC, ReactNode } from 'react'
import { Sidebar } from '~/components/Sidebar'

export const meta: MetaFunction = () => [
  { title: 'Remix Recipes' },
  { name: 'description', content: 'Welcome to Remix Recipes app!' },
]

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <Meta />
        <Links />
      </head>
      <body className='md:flex md:h-screen bg-background'>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

const App = () => (
  <>
    <Sidebar />
    <div className='p-4 w-full md:w-[calc(100%-4rem)]'>
      <Outlet />
    </div>
  </>
)

export const ErrorBoundary = () => {
  const error = useRouteError()

  return (
    <html lang='en'>
      <head>
        <title>Whoops!</title>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div className='p-4'>
          <h1 className='text-2xl pb-3'>Whoops!</h1>
          <p>You&apos;re seeing this page because an unexpected error occurred.</p>
          {error instanceof Error && <p className='my-4 font-bold'>{error.message}</p>}
          <Link
            to='/'
            className='text-primary'
          >
            Take me Home
          </Link>
        </div>
      </body>
    </html>
  )
}

export default App

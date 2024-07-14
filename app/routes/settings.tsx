import { json, Link, Outlet, useLoaderData } from '@remix-run/react'

export const loader = () => {
  return json({ message: 'Hello, there!' })
}

const SettingsPage = () => {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Settings</h1>
      <p>This is the discover page</p>
      <p>Message form the loader: {data.message}</p>
      <nav>
        <Link to='app'>App</Link>
        <Link to='profile'>Profile</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export const ErrorBoundary = () => <div>Something went wrong!</div>

export default SettingsPage

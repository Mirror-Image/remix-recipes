import { useRouteError } from '@remix-run/react'

export const ErrorBoundary = () => {
  const error = useRouteError()

  if (error instanceof Error) {
    return (
      <div className='bg-red-200 border-2 border-red-600 rounded-md p-4'>
        <h1>Whoops, something went wrong.</h1>
        <p>{error.message}</p>
      </div>
    )
  }

  return <div>An unexpected error occurred.</div>
}

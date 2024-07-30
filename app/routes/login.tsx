import classNames from 'classnames'
import { Button, ErrorMessage } from '~/components/ui'
import { ActionFunction, LoaderFunction } from '@remix-run/node'
import { validateForm } from '~/utils'
import { loginFormSchema } from '~/routes/login/formSchema'
import { json, useActionData } from '@remix-run/react'
import { getUser } from '~/models/user.server'
import { sessionCookie } from '~/cookies'
import { commitSession, getSession } from '~/sessions'

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie')
  const session = await getSession(cookieHeader)

  console.log('Session data:', session.data)

  return null
}

export const action: ActionFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie')
  const session = await getSession(cookieHeader)
  const formData = await request.formData()

  return validateForm(
    formData,
    loginFormSchema,
    async ({ email }) => {
      const user = await getUser(email)

      if (!user) {
        return json(
          { errors: { email: 'User with email does not exist' } },
          {status: 401 }
        )
      }

      session.set('userId', user.id)

      return json({ user }, {
        headers: {
          'Set-Cookie': await commitSession(session),
        }
      })
    }
  )
}

const Login = () => {
  const actionData = useActionData()

  return (
    <div className='text-center mt-3'>
      <h1 className='text-3xl mb-8'>
        Remix Recipes
      </h1>
      <form method='post' className='mx-auto md:w-1/3'>
        <div className='text-left pb-4'>
          <input
            type='email'
            name='email'
            placeholder='Email Address'
            autoComplete='off'
            defaultValue={actionData?.email}
            className={classNames(
              'w-full outline-none border-2 border-gray-200',
              'focus:border-primary rounded-md p-2'
            )}
          />
          <ErrorMessage>
            {actionData?.errors?.email}
          </ErrorMessage>
        </div>
        <Button
          variant='primary'
          className='w-1/3 mx-auto'
        >
          Log In
        </Button>
      </form>
    </div>
  )
}

export default Login

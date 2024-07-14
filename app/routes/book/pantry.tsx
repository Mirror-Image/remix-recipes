import { Form, json, useLoaderData, useNavigation, useSearchParams } from '@remix-run/react'
import { createShelf, deleteShelf, getAllShelves } from '~/models/pantry-shelf.server'
import classNames from 'classnames'
import { PlusIcon, SearchIcon } from '~/assets/icons'
import { ActionFunction, ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Button } from '~/components/ui'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q')

  const shelves = await getAllShelves(query)

  return json({ shelves })
}

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  switch (formData.get('_action')) {
    case 'createShelf':
      return createShelf({ name: 'New Shelf' })
    case 'deleteShelf': {
      const shelfId = formData.get('shelfId')

      if (typeof shelfId === 'string') {
        return deleteShelf(shelfId)
      }
      return json({ error: { shelfId: 'Shelf ID must be a string' } })
    }
    default:
      return null
  }
}

const PantryBookTab = () => {
  const data = useLoaderData<typeof loader>()
  const [searchParams] = useSearchParams()
  const navigation = useNavigation()

  const isSearching = navigation.formData?.has('q')
  const isCreatingShelf = navigation.formData?.get('_action') === 'createShelf'

  return (
    <div>
      <Form
        className={classNames(
          'flex border-2 border-gray-300 rounded-md',
          'focus-within:border-primary md:w-80',
          {
            'animate-pulse': isSearching,
          },
        )}
      >
        <button
          type='submit'
          className='px-2 mr-1'
        >
          <SearchIcon />
        </button>
        <input
          type='text'
          name='q'
          defaultValue={searchParams.get('q') ?? ''}
          autoComplete='off'
          placeholder='Search Shelves...'
          className='w-full py-3 px-2 outline-none'
        />
      </Form>

      <Form method='post'>
        <Button
          variant='primary'
          name='_action'
          value='createShelf'
          className={classNames('mt-4 w-full md:w-fit', {
            'bg-primary-light': isCreatingShelf,
          })}
        >
          <PlusIcon />
          <span className='pl-2'>{isCreatingShelf ? 'Creating Shelf' : 'Create Shelf'}</span>
        </Button>
      </Form>

      <ul
        className={classNames(
          'flex gap-8 overflow-x-auto mt-4 pb-4',
          'snap-x snap-mandatory md:snap-none',
        )}
      >
        {data.shelves.map(shelf => (
          <li
            key={shelf.id}
            className={classNames(
              'border-2 border-primary rounded-md p-4 mb:h-fit',
              'w-[calc(100vw-2rem)] flex-none snap-center',
              'md:w-96',
              'flex flex-col justify-between',
            )}
          >
            <div>
              <h1 className='text-2xl font-extrabold mb-2'>{shelf.name}</h1>
              <ul>
                {shelf.items.map(item => (
                  <li
                    className='py-2'
                    key={item.id}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <Form
              method='post'
              className='pt-8'
            >
              <input
                type='hidden'
                value={shelf.id}
                name='shelfId'
              />
              <Button
                variant='delete'
                name='_action'
                value='deleteShelf'
                className='w-full'
              >
                Delete Shelf
              </Button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PantryBookTab

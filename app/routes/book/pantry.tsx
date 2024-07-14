import { json, useLoaderData } from '@remix-run/react'
import { createShelf, deleteShelf, getAllShelves } from '~/models/pantry-shelf.server'
import classNames from 'classnames'
import { ActionFunction, ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { CreateShelf, SearchShelf, ShelfItem } from './components'

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

      if (typeof shelfId !== 'string') {
        return json({ error: { shelfId: 'Shelf ID must be a string' } })
      }
      return deleteShelf(shelfId)
    }
    default:
      return null
  }
}

const PantryBookTab = () => {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <SearchShelf />
      <CreateShelf />
      <ul
        className={classNames(
          'flex gap-8 overflow-x-auto mt-4 pb-4',
          'snap-x snap-mandatory md:snap-none',
        )}
      >
        {data.shelves.map(({ id, name, items }) => (
          <ShelfItem
            key={id}
            name={name}
            items={items}
            id={id}
          />
        ))}
      </ul>
    </div>
  )
}

export default PantryBookTab

import { json } from '@remix-run/react'
import {
  createShelf,
  deleteShelf,
  getAllShelves,
  saveShelfName,
} from '~/models/pantry-shelf.server'
import { ActionFunction, ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { CreateShelf, SearchShelf, Shelves } from './components'
import {
  CREATE_SHELF_ACTION_KEY,
  DELETE_SHELF_ACTION_KEY,
  SAVE_SHELF_NAME_ACTION_KEY,
  SHELF_ID_KEY,
  SHELF_NAME_KEY,
} from '~/routes/book/constants'
import { ACTION_KEY, QUERY_PARAM_KEY } from '~/constants/general'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const query = url.searchParams.get(QUERY_PARAM_KEY)

  const shelves = await getAllShelves(query)

  return json({ shelves })
}

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  switch (formData.get(ACTION_KEY)) {
    case CREATE_SHELF_ACTION_KEY:
      return createShelf({ name: 'New Shelf' })
    case DELETE_SHELF_ACTION_KEY: {
      const shelfId = formData.get(SHELF_ID_KEY)

      if (typeof shelfId !== 'string') {
        return json({ error: { shelfId: 'Shelf ID must be a string' } })
      }
      return deleteShelf(shelfId)
    }
    case SAVE_SHELF_NAME_ACTION_KEY: {
      const shelfId = formData.get(SHELF_ID_KEY)
      const shelfName = formData.get(SHELF_NAME_KEY)
      const errors: Record<string, string> = {}

      if (typeof shelfId === 'string' && typeof shelfName === 'string' && shelfName) {
        return saveShelfName(shelfId, shelfName)
      }

      if (typeof shelfName !== 'string') {
        errors[SHELF_NAME_KEY] = 'Shelf name must be a string'
      }

      if (!shelfName) {
        errors[SHELF_NAME_KEY] = 'Shelf cannot be blank'
      }

      if (typeof shelfId !== 'string') {
        errors[SHELF_ID_KEY] = 'Shelf ID must be a string'
      }

      return json({ errors })
    }
    default:
      return null
  }
}

const PantryBookTab = () => (
  <div>
    <SearchShelf />
    <CreateShelf />
    <Shelves />
  </div>
)

export default PantryBookTab

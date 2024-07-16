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
  CREATE_SHELF_ITEM_ACTION_KEY,
  DELETE_SHELF_ACTION_KEY,
  DELETE_SHELF_ITEM_ACTION_KEY,
  SAVE_SHELF_NAME_ACTION_KEY,
} from '~/routes/book/constants'
import { ACTION_KEY, QUERY_PARAM_KEY } from '~/constants/general'
import {
  createShelfItemSchema,
  deleteShelfItemSchema,
  deleteShelfSchema,
  saveShelfSchema,
} from '~/routes/book/formSchema'
import { validateForm } from '~/utils'
import { createShelfItem, deleteShelfItem } from '~/models/pantry-item.server'

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
    case DELETE_SHELF_ACTION_KEY:
      return validateForm(formData, deleteShelfSchema, data => deleteShelf(data.shelfId))
    case SAVE_SHELF_NAME_ACTION_KEY:
      return validateForm(formData, saveShelfSchema, data =>
        saveShelfName(data.shelfId, data.shelfName),
      )
    case CREATE_SHELF_ITEM_ACTION_KEY:
      return validateForm(formData, createShelfItemSchema, data =>
        createShelfItem(data.shelfId, data.itemName),
      )
    case DELETE_SHELF_ITEM_ACTION_KEY:
      return validateForm(formData, deleteShelfItemSchema, data => deleteShelfItem(data.itemId))
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

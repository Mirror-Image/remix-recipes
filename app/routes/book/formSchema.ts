import { z } from 'zod'
import { SHELF_ID_KEY, SHELF_NAME_KEY } from '~/routes/book/constants'

export const saveShelfSchema = z.object({
  [SHELF_ID_KEY]: z.string(),
  [SHELF_NAME_KEY]: z.string().min(1, 'Shelf Name cannot be blank'),
})

export const deleteShelfSchema = z.object({
  [SHELF_ID_KEY]: z.string(),
})

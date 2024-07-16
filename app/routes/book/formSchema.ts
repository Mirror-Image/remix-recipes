import { z } from 'zod'
import {
  SHELF_ID_KEY,
  SHELF_ITEM_ID_KEY,
  SHELF_ITEM_NAME_KEY,
  SHELF_NAME_KEY,
} from '~/routes/book/constants'

export const saveShelfSchema = z.object({
  [SHELF_ID_KEY]: z.string(),
  [SHELF_NAME_KEY]: z.string().min(1, 'Shelf Name cannot be blank'),
})

export const deleteShelfSchema = z.object({
  [SHELF_ID_KEY]: z.string(),
})

export const createShelfItemSchema = z.object({
  [SHELF_ID_KEY]: z.string(),
  [SHELF_ITEM_NAME_KEY]: z.string().min(1, 'Item Name cannot be blank'),
})

export const deleteShelfItemSchema = z.object({
  [SHELF_ITEM_ID_KEY]: z.string(),
})

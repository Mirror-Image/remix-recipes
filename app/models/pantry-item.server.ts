import db from '~/db.server'
import { handleDelete } from '~/utils/model'

export const createShelfItem = (shelfId: string, name: string) => {
  return db.pantryItem.create({
    data: { shelfId, name },
  })
}

export const deleteShelfItem = (id: string) => {
  return handleDelete(() =>
    db.pantryItem.delete({
      where: {
        id: id,
      },
    }),
  )
}
